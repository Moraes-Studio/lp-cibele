import { ImageResponse } from 'next/og';

export const alt = 'Cibele Rosa | Psicologia Clínica para Adultos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  let interBold: ArrayBuffer | undefined;
  let interRegular: ArrayBuffer | undefined;

  try {
    [interBold, interRegular] = await Promise.all([
      fetch('https://fonts.bunny.net/inter/files/inter-latin-700-normal.woff').then((r) =>
        r.arrayBuffer(),
      ),
      fetch('https://fonts.bunny.net/inter/files/inter-latin-400-normal.woff').then((r) =>
        r.arrayBuffer(),
      ),
    ]);
  } catch {
    // fonts carregam no build — fallback para Noto Sans do Satori
  }

  const fonts = [
    ...(interBold
      ? [{ name: 'Inter', data: interBold, weight: 700 as const, style: 'normal' as const }]
      : []),
    ...(interRegular
      ? [{ name: 'Inter', data: interRegular, weight: 400 as const, style: 'normal' as const }]
      : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          background: '#F6F1EB',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Barra terracotta esquerda */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 8,
            height: '100%',
            background: '#C17B5C',
          }}
        />

        {/* Painel verde direito */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 340,
            height: '100%',
            background: '#2D4A3E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Folha decorativa */}
          <div
            style={{
              width: 130,
              height: 170,
              background: '#F6F1EB',
              borderRadius: '50% 4% 50% 4%',
              opacity: 0.09,
            }}
          />
        </div>

        {/* Conteúdo principal */}
        <div
          style={{
            paddingLeft: 88,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            maxWidth: 840,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontSize: 20,
              color: '#7A9E87',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              marginBottom: 28,
            }}
          >
            Psicologia Clínica
          </div>

          {/* Nome */}
          <div
            style={{
              fontSize: 100,
              color: '#2D4A3E',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: 32,
            }}
          >
            Cibele Rosa
          </div>

          {/* Divisor terracotta */}
          <div
            style={{
              width: 72,
              height: 4,
              background: '#C17B5C',
              borderRadius: 2,
              marginBottom: 32,
            }}
          />

          {/* Subtítulo */}
          <div
            style={{
              fontSize: 30,
              color: '#5C7268',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Atendimento psicológico para adultos
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
