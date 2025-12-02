import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const certificateId = searchParams.get('id');
    
    if (!certificateId) {
      return new Response('Certificate ID required', { status: 400 });
    }

    // Fetch certificate data from Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    );

    const { data: cert, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', certificateId)
      .single();

    if (error || !cert) {
      return new Response('Certificate not found', { status: 404 });
    }

    const name = cert.user_name || 'AI Learner';
    const date = cert.completion_date 
      ? new Date(cert.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Format certificate ID as short version (AI-XXXXXXXX)
    const shortCertId = `AI-${certificateId.replace(/-/g, '').slice(0, 8).toUpperCase()}`;

    // Fetch user profile for avatar and organization
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('avatar_url, organization')
      .eq('user_id', cert.user_id)
      .single();

    const organization = profile?.organization || null;

    // Generate high-resolution certificate image (A4 landscape ratio)
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f3f0',
            fontFamily: 'Georgia, serif',
          }}
        >
          {/* Certificate Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              padding: '80px 120px',
            }}
          >
            {/* Logo */}
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#B8CEB8', marginBottom: 24 }}>
              Wacky Works Digital
            </div>

            <div style={{ fontSize: 72, fontWeight: 900, color: '#2D2520', marginBottom: 12, fontStyle: 'italic' }}>
              Certificate of Completion
            </div>

            <div style={{ fontSize: 28, color: '#5A534E', marginBottom: 32 }}>
              This certifies that
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: '#2D2520',
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              {name}
            </div>

            {/* Organization */}
            {organization && (
              <div style={{ fontSize: 28, color: '#5A534E', marginBottom: 32 }}>
                {organization}
              </div>
            )}

            <div style={{ fontSize: 28, color: '#5A534E', marginBottom: 12, marginTop: organization ? 0 : 32 }}>
              has successfully completed the
            </div>

            <div style={{ fontSize: 56, fontWeight: 900, color: '#B8CEB8', marginBottom: 24, fontStyle: 'italic' }}>
              Introduction to AI
            </div>

            <div style={{ fontSize: 24, color: '#5A534E', textAlign: 'center', maxWidth: 900, marginBottom: 60 }}>
              course and demonstrated dedication and commitment to mastering AI fundamentals
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                borderTop: '3px solid rgba(122, 115, 110, 0.2)',
                paddingTop: 32,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 16, color: '#7A736E', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }}>Completion Date</span>
                <span style={{ fontSize: 24, color: '#2D2520', fontWeight: 'bold' }}>{date}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 16, color: '#7A736E', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }}>Verified</span>
                <span style={{ fontSize: 24, color: '#B8CEB8', fontWeight: 'bold' }}>✓ WeAreWacky.com</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: 16, color: '#7A736E', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }}>Certificate ID</span>
                <span style={{ fontSize: 24, color: '#2D2520', fontWeight: 'bold' }}>{shortCertId}</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        // High resolution for print quality (A4 landscape ratio: 297mm x 210mm = 1.414:1)
        width: 2100,
        height: 1485,
      },
    );
  } catch (e: any) {
    console.log(`Certificate image generation error: ${e.message}`);
    return new Response(`Failed to generate certificate image: ${e.message}`, {
      status: 500,
    });
  }
}

