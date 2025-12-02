import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';
 
export const runtime = 'edge';
 
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
 
    // ?name=User%20Name&date=Nov%2021,%202025&id=ae600a08-xxxx
    const hasName = searchParams.has('name');
    const name = hasName
      ? searchParams.get('name')?.slice(0, 100)
      : 'AI Course Learner';
      
    const date = searchParams.get('date') || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Format certificate ID as short version (AI-XXXXXXXX)
    const certId = searchParams.get('id');
    const shortCertId = certId 
      ? `AI-${certId.replace(/-/g, '').slice(0, 8).toUpperCase()}`
      : null;

    // Try to fetch profile data if we have a certificate ID
    let avatarUrl: string | null = null;
    let organization: string | null = null;
    
    if (certId) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SECRET_KEY!
        );
        
        // Get certificate to find user_id
        const { data: cert } = await supabase
          .from('certificates')
          .select('user_id')
          .eq('id', certId)
          .single();
        
        if (cert?.user_id) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('avatar_url, organization')
            .eq('user_id', cert.user_id)
            .single();
          
          avatarUrl = profile?.avatar_url || null;
          organization = profile?.organization || null;
        }
      } catch (e) {
        // Ignore errors, just use defaults
      }
    }

    // Get first letter for initials fallback
    const initial = name?.charAt(0).toUpperCase() || 'U';

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
              padding: '40px 60px',
            }}
          >
            {/* Wacky Works Digital Logo Text */}
            <div style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: '#B8CEB8', 
              marginBottom: 12,
              letterSpacing: 1
            }}>
              Wacky Works Digital
            </div>

            {/* Title */}
            <div style={{ 
              fontSize: 48, 
              fontWeight: 900, 
              color: '#2D2520', 
              marginBottom: 6, 
              fontStyle: 'italic',
              letterSpacing: 1
            }}>
              Certificate of Completion
            </div>

            {/* This certifies that */}
            <div style={{ fontSize: 18, color: '#5A534E', marginBottom: 16, fontWeight: 600 }}>
              This certifies that
            </div>

            {/* Profile Picture or Initials */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  width={70}
                  height={70}
                  style={{
                    borderRadius: 35,
                    border: '3px solid rgba(184, 206, 184, 0.4)',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  border: '3px solid rgba(184, 206, 184, 0.4)',
                  background: 'linear-gradient(135deg, rgba(184, 206, 184, 0.3), rgba(184, 168, 212, 0.3))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
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
                fontSize: 42,
                fontWeight: 900,
                color: '#2D2520',
                textAlign: 'center',
                marginBottom: 4,
                letterSpacing: -1,
              }}
            >
              {name}
            </div>

            {/* Organization */}
            {organization && (
              <div style={{ fontSize: 18, color: '#5A534E', marginBottom: 16 }}>
                {organization}
              </div>
            )}

            {/* has successfully completed the */}
            <div style={{ 
              fontSize: 18, 
              color: '#5A534E', 
              marginBottom: 6, 
              marginTop: organization ? 0 : 16,
              fontWeight: 500
            }}>
              has successfully completed the
            </div>

            {/* Course Name */}
            <div style={{ 
              fontSize: 36, 
              fontWeight: 900, 
              color: '#2D2520', 
              marginBottom: 10,
              letterSpacing: -1
            }}>
              Introduction to AI
            </div>

            {/* Description */}
            <div style={{ 
              fontSize: 14, 
              color: '#5A534E', 
              textAlign: 'center', 
              maxWidth: 600, 
              marginBottom: 24,
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
                paddingTop: 16,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ 
                  fontSize: 10, 
                  color: '#7A736E', 
                  fontWeight: 'bold', 
                  textTransform: 'uppercase', 
                  letterSpacing: 1,
                  marginBottom: 2
                }}>Completion Date</span>
                <span style={{ fontSize: 16, color: '#2D2520', fontWeight: 'bold' }}>{date}</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '6px 16px',
                backgroundColor: 'rgba(184, 206, 184, 0.2)',
                borderRadius: 50,
                border: '1px solid rgba(184, 206, 184, 0.3)'
              }}>
                <span style={{ fontSize: 14, color: '#6B8E6B', fontWeight: 'bold' }}>✓ Verified Certificate</span>
              </div>
              
              {shortCertId && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ 
                    fontSize: 10, 
                    color: '#7A736E', 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase', 
                    letterSpacing: 1,
                    marginBottom: 2
                  }}>Certificate ID</span>
                  <span style={{ fontSize: 16, color: '#2D2520', fontWeight: 'bold' }}>{shortCertId}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`OG image generation error: ${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
