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

    const date = cert.completion_date 
      ? new Date(cert.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Format certificate ID as short version (AI-XXXXXXXX)
    const shortCertId = `AI-${certificateId.replace(/-/g, '').slice(0, 8).toUpperCase()}`;

    // Fetch user profile for avatar, organization, and display_name
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('avatar_url, organization, display_name')
      .eq('user_id', cert.user_id)
      .single();

    // Use profile display_name if available, otherwise fall back to cert.user_name
    const name = profile?.display_name || cert.user_name || 'AI Learner';
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
            justifyContent: 'space-between',
            backgroundColor: '#f5f3f0',
            fontFamily: 'Georgia, serif',
            padding: '70px 100px',
          }}
        >
          {/* TOP SECTION */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Title - elegant, uppercase */}
            <div style={{ 
              fontSize: 28, 
              fontWeight: 600, 
              color: '#7A736E', 
              marginBottom: 16, 
              fontStyle: 'italic',
              letterSpacing: 6,
              textTransform: 'uppercase'
            }}>
              Certificate of Completion
            </div>

            {/* This certifies that */}
            <div style={{ fontSize: 24, color: '#5A534E', fontWeight: 500 }}>
              This certifies that
            </div>
          </div>

          {/* MIDDLE SECTION - the hero area */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Profile Picture or Initials */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 24,
            }}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  width={220}
                  height={220}
                  style={{
                    borderRadius: 110,
                    border: '6px solid rgba(184, 206, 184, 0.5)',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div style={{
                  width: 220,
                  height: 220,
                  borderRadius: 110,
                  border: '6px solid rgba(184, 206, 184, 0.5)',
                  background: 'linear-gradient(135deg, rgba(184, 206, 184, 0.4), rgba(184, 168, 212, 0.4))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 100,
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
                marginBottom: 8,
                letterSpacing: -2,
              }}
            >
              {name}
            </div>

            {/* Organization */}
            {organization && (
              <div style={{ fontSize: 36, color: '#5A534E', fontWeight: 500 }}>
                {organization}
              </div>
            )}
          </div>

          {/* BOTTOM SECTION */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* has successfully completed the */}
            <div style={{ 
              fontSize: 24, 
              color: '#5A534E', 
              marginBottom: 12, 
              fontWeight: 500
            }}>
              has successfully completed the
            </div>

            {/* Course Name - second biggest */}
            <div style={{ 
              fontSize: 58, 
              fontWeight: 900, 
              color: '#2D2520', 
              marginBottom: 14,
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
              fontWeight: 500,
              lineHeight: 1.4
            }}>
              30-day course covering AI fundamentals, prompt engineering, and real-world applications
            </div>
          </div>

          {/* Footer - date and ID */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              borderTop: '3px solid rgba(122, 115, 110, 0.2)',
              paddingTop: 24,
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
