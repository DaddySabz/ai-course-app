import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
 
    // ?name=User%20Name&date=Nov%2021,%202025
    const hasName = searchParams.has('name');
    const name = hasName
      ? searchParams.get('name')?.slice(0, 100)
      : 'AI Course Learner';
      
    const date = searchParams.get('date') || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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
            backgroundColor: '#F5F1ED', // Warm background
            backgroundImage: 'radial-gradient(at 40% 20%, rgba(232, 216, 200, 0.3) 0px, transparent 50%)',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Certificate Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              height: '85%',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: 30,
              border: '2px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '-10px 10px 30px rgba(180, 160, 145, 0.2), 10px -10px 30px rgba(255, 255, 255, 0.8)',
              position: 'relative',
              padding: '40px',
            }}
          >
            {/* Logo Placeholder - Text for now */}
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#B8A8D4', marginBottom: 20 }}>
              Wacky Works Digital
            </div>

            <div style={{ fontSize: 48, fontWeight: 900, color: '#2D2520', marginBottom: 10 }}>
              Certificate of Completion
            </div>

            <div style={{ fontSize: 24, color: '#5A534E', marginBottom: 30 }}>
              This certifies that
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: '#2D2520',
                textAlign: 'center',
                marginBottom: 10,
                padding: '0 20px',
                backgroundImage: 'linear-gradient(90deg, #2D2520, #4A433E)',
                backgroundClip: 'text',
              }}
            >
              {name}
            </div>

            <div style={{ fontSize: 24, color: '#5A534E', marginTop: 30, marginBottom: 10 }}>
              has successfully completed the
            </div>

            <div style={{ fontSize: 42, fontWeight: 900, color: '#B8CEB8', marginBottom: 20 }}>
              Introduction to AI
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 40,
                borderTop: '2px solid rgba(122, 115, 110, 0.2)',
                paddingTop: 20,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 16, color: '#7A736E', fontWeight: 'bold', textTransform: 'uppercase' }}>Completion Date</span>
                <span style={{ fontSize: 20, color: '#2D2520', fontWeight: 'bold' }}>{date}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: 16, color: '#7A736E', fontWeight: 'bold', textTransform: 'uppercase' }}>Verified</span>
                <span style={{ fontSize: 20, color: '#2D2520', fontWeight: 'bold' }}>WeAreWacky.com</span>
              </div>
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
