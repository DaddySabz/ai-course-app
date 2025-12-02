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
    const avatarUrl = profile?.avatar_url || null;
    
    // Get first letter for initials fallback
    const initial = name.charAt(0).toUpperCase();

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
            justifyContent: 'flex-start',
            backgroundColor: '#f5f3f0',
            fontFamily: 'Georgia, serif',
            padding: '50px 100px 60px',
          }}
        >
          {/* TOP SECTION - moved up */}
          {/* Title - smaller, elegant, uppercase */}
          <div style={{ 
            fontSize: 28, 
            fontWeight: 600, 
            color: '#7A736E', 
            marginBottom: 12, 
            fontStyle: 'italic',
            letterSpacing: 6,
            textTransform: 'uppercase'
          }}>
            Certificate of Completion
          </div>

          {/* This certifies that */}
          <div style={{ fontSize: 24, color: '#5A534E', marginBottom: 30, fontWeight: 500 }}>
            This certifies that
          </div>

          {/* MIDDLE SECTION - the hero area with more space */}
          {/* Profile Picture or Initials - EVEN BIGGER */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                width={240}
                height={240}
                style={{
                  borderRadius: 120,
                  border: '6px solid rgba(184, 206, 184, 0.5)',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div style={{
                width: 240,
                height: 240,
                borderRadius: 120,
                border: '6px solid rgba(184, 206, 184, 0.5)',
                background: 'linear-gradient(135deg, rgba(184, 206, 184, 0.4), rgba(184, 168, 212, 0.4))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 110,
                fontWeight: 900,
                color: '#2D2520',
              }}>
                {initial}
              </div>
            )}
          </div>

          {/* Name - THE HERO, biggest text */}
          <div
            style={{
              fontSize: 86,
              fontWeight: 900,
              color: '#2D2520',
              textAlign: 'center',
              marginBottom: 12,
              letterSpacing: -2,
            }}
          >
            {name}
          </div>

          {/* Organization - bigger */}
          {organization && (
            <div style={{ fontSize: 38, color: '#5A534E', marginBottom: 50, fontWeight: 500 }}>
              {organization}
            </div>
          )}

          {/* BOTTOM SECTION - moved down */}
          {/* has successfully completed the */}
          <div style={{ 
            fontSize: 24, 
            color: '#5A534E', 
            marginBottom: 12, 
            marginTop: organization ? 20 : 60,
            fontWeight: 500
          }}>
            has successfully completed the
          </div>

          {/* Course Name - second biggest */}
          <div style={{ 
            fontSize: 58, 
            fontWeight: 900, 
            color: '#2D2520', 
            marginBottom: 16,
            letterSpacing: -1
          }}>
            Introduction to AI
          </div>

          {/* Description */}
          <div style={{ 
            fontSize: 22, 
            color: '#5A534E', 
            textAlign: 'center', 
            maxWidth: 900, 
            marginBottom: 50,
            fontWeight: 500,
            lineHeight: 1.5
          }}>
            30-day course covering AI fundamentals, prompt engineering, and real-world applications
          </div>

          {/* Footer - just date and ID */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              borderTop: '3px solid rgba(122, 115, 110, 0.2)',
              paddingTop: 30,
              marginTop: 'auto',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ 
                fontSize: 14, 
                color: '#7A736E', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                letterSpacing: 3,
                marginBottom: 6
              }}>Issued</span>
              <span style={{ fontSize: 24, color: '#2D2520', fontWeight: 'bold' }}>{date}</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ 
                fontSize: 14, 
                color: '#7A736E', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                letterSpacing: 3,
                marginBottom: 6
              }}>Certificate ID</span>
              <span style={{ fontSize: 24, color: '#2D2520', fontWeight: 'bold' }}>{shortCertId}</span>
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
