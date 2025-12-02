import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// This API generates the certificate image and stores it in Supabase Storage
// Called once when certificate is created, then the stored image is used everywhere

export async function POST(request: NextRequest) {
  try {
    const { certificateId } = await request.json();
    
    if (!certificateId) {
      return NextResponse.json({ error: 'Certificate ID required' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    );

    // Fetch certificate data
    const { data: cert, error: certError } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', certificateId)
      .single();

    if (certError || !cert) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    // Check if image already exists
    if (cert.image_url) {
      return NextResponse.json({ 
        success: true, 
        imageUrl: cert.image_url,
        message: 'Certificate image already exists'
      });
    }

    // Fetch user profile for avatar and organization
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('avatar_url, organization')
      .eq('user_id', cert.user_id)
      .single();

    // Generate the certificate image using the OG image API
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://courses.wearewacky.com';
    const imageApiUrl = new URL(`${baseUrl}/api/certificate-image`);
    imageApiUrl.searchParams.set('id', certificateId);

    // Fetch the generated image
    const imageResponse = await fetch(imageApiUrl.toString());
    
    if (!imageResponse.ok) {
      throw new Error(`Failed to generate image: ${imageResponse.statusText}`);
    }

    const imageBlob = await imageResponse.blob();
    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

    // Generate filename with short cert ID
    const shortCertId = `AI-${certificateId.replace(/-/g, '').slice(0, 8).toUpperCase()}`;
    const fileName = `${shortCertId}.png`;
    const filePath = `certificates/${fileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('certificates')
      .upload(filePath, imageBuffer, {
        contentType: 'image/png',
        upsert: true // Overwrite if exists
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get the public URL
    const { data: publicUrlData } = supabase
      .storage
      .from('certificates')
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    // Update certificate record with image URL
    const { error: updateError } = await supabase
      .from('certificates')
      .update({ image_url: imageUrl })
      .eq('id', certificateId);

    if (updateError) {
      console.error('Update error:', updateError);
      // Don't fail - image is uploaded, just couldn't update DB
    }

    return NextResponse.json({ 
      success: true, 
      imageUrl,
      message: 'Certificate image generated and stored'
    });

  } catch (error) {
    console.error('Certificate image generation error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to generate certificate image' 
    }, { status: 500 });
  }
}

