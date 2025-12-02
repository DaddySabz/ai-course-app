import { ImageResponse } from 'next/og';
 
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
              padding: '60px 80px',
            }}
          >
            {/* Logo */}
            <div style={{ fontSize: 20, fontWeight: 'bold', color: '#B8CEB8', marginBottom: 16 }}>
              Wacky Works Digital
            </div>

            <div style={{ fontSize: 56, fontWeight: 900, color: '#2D2520', marginBottom: 8, fontStyle: 'italic' }}>
              Certificate of Completion
            </div>

            <div style={{ fontSize: 22, color: '#5A534E', marginBottom: 24 }}>
              This certifies that
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: '#2D2520',
                textAlign: 'center',
                marginBottom: 24,
              }}
            >
              {name}
            </div>

            <div style={{ fontSize: 22, color: '#5A534E', marginBottom: 8 }}>
              has successfully completed the
            </div>

            <div style={{ fontSize: 42, fontWeight: 900, color: '#B8CEB8', marginBottom: 16, fontStyle: 'italic' }}>
              Introduction to AI
            </div>

            <div style={{ fontSize: 18, color: '#5A534E', textAlign: 'center', maxWidth: 700, marginBottom: 40 }}>
              course and demonstrated dedication and commitment to mastering AI fundamentals
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                borderTop: '2px solid rgba(122, 115, 110, 0.2)',
                paddingTop: 24,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 12, color: '#7A736E', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>Completion Date</span>
                <span style={{ fontSize: 18, color: '#2D2520', fontWeight: 'bold' }}>{date}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#7A736E', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>Verified</span>
                <span style={{ fontSize: 18, color: '#B8CEB8', fontWeight: 'bold' }}>✓ WeAreWacky.com</span>
              </div>
              
              {shortCertId && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: 12, color: '#7A736E', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>Certificate ID</span>
                  <span style={{ fontSize: 18, color: '#2D2520', fontWeight: 'bold' }}>{shortCertId}</span>
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
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
