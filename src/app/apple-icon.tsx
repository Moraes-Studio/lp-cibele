import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#2D4A3E',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Leaf body */}
        <div
          style={{
            position: 'absolute',
            width: 78,
            height: 98,
            background: '#F6F1EB',
            borderRadius: '48% 4% 48% 4%',
            opacity: 0.92,
          }}
        />
        {/* Leaf vein */}
        <div
          style={{
            position: 'absolute',
            width: 2,
            height: 70,
            background: '#C17B5C',
            borderRadius: 2,
            opacity: 0.65,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
