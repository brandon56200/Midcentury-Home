import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2563eb', // blue-600
          fontWeight: 900,
          borderRadius: '8px',
          fontFamily: 'sans-serif',
          letterSpacing: '0.02em',
          paddingLeft: '3px',
          textShadow: '0.5px 0 #2563eb, -0.5px 0 #2563eb',
        }}
      >
        H.
      </div>
    ),
    {
      ...size,
    }
  );
}
