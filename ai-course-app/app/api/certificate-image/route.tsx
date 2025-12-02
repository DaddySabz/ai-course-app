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
              padding: '60px 100px',
            }}
          >
            {/* Wacky Works Digital Logo Text */}
            <div style={{ 
              fontSize: 24, 
              fontWeight: 'bold', 
              color: '#B8CEB8', 
              marginBottom: 16,
              letterSpacing: 1
            }}>
              Wacky Works Digital
            </div>

            {/* Title */}
            <div style={{ 
              fontSize: 64, 
              fontWeight: 900, 
              color: '#2D2520', 
              marginBottom: 8, 
              fontStyle: 'italic',
              letterSpacing: 1
            }}>
              Certificate of Completion
            </div>

            {/* This certifies that */}
            <div style={{ fontSize: 24, color: '#5A534E', marginBottom: 24, fontWeight: 600 }}>
              This certifies that
            </div>

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
                  width={100}
                  height={100}
                  style={{
                    borderRadius: 50,
                    border: '4px solid rgba(184, 206, 184, 0.4)',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  border: '4px solid rgba(184, 206, 184, 0.4)',
                  background: 'linear-gradient(135deg, rgba(184, 206, 184, 0.3), rgba(184, 168, 212, 0.3))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#2D2520',
                }}>
                  {initial}
                </div>
              )}
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: '#2D2520',
                textAlign: 'center',
                marginBottom: 8,
                letterSpacing: -1,
              }}
            >
              {name}
            </div>

            {/* Organization */}
            {organization && (
              <div style={{ fontSize: 24, color: '#5A534E', marginBottom: 24 }}>
                {organization}
              </div>
            )}

            {/* has successfully completed the */}
            <div style={{ 
              fontSize: 24, 
              color: '#5A534E', 
              marginBottom: 8, 
              marginTop: organization ? 0 : 24,
              fontWeight: 500
            }}>
              has successfully completed the
            </div>

            {/* Course Name */}
            <div style={{ 
              fontSize: 48, 
              fontWeight: 900, 
              color: '#2D2520', 
              marginBottom: 16,
              letterSpacing: -1
            }}>
              Introduction to AI
            </div>

            {/* Description */}
            <div style={{ 
              fontSize: 20, 
              color: '#5A534E', 
              textAlign: 'center', 
              maxWidth: 800, 
              marginBottom: 40,
              fontWeight: 500
            }}>
              course and demonstrated dedication and commitment to mastering AI fundamentals
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                borderTop: '2px solid rgba(122, 115, 110, 0.2)',
                paddingTop: 24,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ 
                  fontSize: 12, 
                  color: '#7A736E', 
                  fontWeight: 'bold', 
                  textTransform: 'uppercase', 
                  letterSpacing: 2,
                  marginBottom: 4
                }}>Completion Date</span>
                <span style={{ fontSize: 20, color: '#2D2520', fontWeight: 'bold' }}>{date}</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '8px 20px',
                backgroundColor: 'rgba(184, 206, 184, 0.2)',
                borderRadius: 50,
                border: '1px solid rgba(184, 206, 184, 0.3)'
              }}>
                <span style={{ fontSize: 18, color: '#6B8E6B', fontWeight: 'bold' }}>✓ Verified Certificate</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ 
                  fontSize: 12, 
                  color: '#7A736E', 
                  fontWeight: 'bold', 
                  textTransform: 'uppercase', 
                  letterSpacing: 2,
                  marginBottom: 4
                }}>Certificate ID</span>
                <span style={{ fontSize: 20, color: '#2D2520', fontWeight: 'bold' }}>{shortCertId}</span>
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
