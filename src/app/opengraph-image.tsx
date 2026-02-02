import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'white',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '24px',
            }}
          >
            <span
              style={{
                color: '#2563eb', // blue-600
                fontSize: '48px',
                fontWeight: 'bold',
                letterSpacing: '-0.05em',
              }}
            >
              H.
            </span>
          </div>
          <h1
            style={{
              fontSize: '84px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Harmoniq<span style={{ color: '#2563eb' }}>.</span>
          </h1>
        </div>
        
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: '18px',
              textTransform: 'uppercase',
              letterSpacing: '0.4em',
              color: '#64748b', // slate-500
              fontWeight: '500',
              margin: 0,
            }}
          >
            Midcentury Labs
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
