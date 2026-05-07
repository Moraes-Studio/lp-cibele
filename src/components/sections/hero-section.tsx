import Image from 'next/image';
import Link from 'next/link';
import { PageContainer } from '@/components/shared/page-container';
import { WhatsAppButton } from '@/components/shared/whatsapp-button';
import { siteConfig } from '@/config/site';

function Sparkle({ className, size = 12, color = '#C98F86', opacity = 0.55 }: {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-brand-ivory py-16 md:py-20"
    >
      {/* background botanical — next/image com priority para ser candidato a LCP */}
      <Image
        src="/background/background2.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        quality={80}
        sizes="100vw"
        className="object-cover object-center opacity-15"
        aria-hidden="true"
      />

      {/* glow principal — atrás da ilustração, lado direito */}
      <div
        className="absolute right-0 top-0 h-full w-[68%] opacity-[0.40] blur-[56px]"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 88% 50%, #E7C1B5 0%, #EDD5CA 55%, transparent 82%)',
        }}
        aria-hidden="true"
      />

      {/* blob quente inferior direito */}
      <div
        className="absolute bottom-[-10%] right-[2%] h-[55%] w-[42%] rounded-full opacity-22 blur-3xl"
        style={{ background: '#DDA89B' }}
        aria-hidden="true"
      />

      {/* blob quente superior direito */}
      <div
        className="absolute right-[6%] top-[-8%] h-[45%] w-[40%] rounded-full opacity-[0.12] blur-[80px]"
        style={{ background: '#C98F86' }}
        aria-hidden="true"
      />

      {/* blush suave lado esquerdo — equilíbrio sutil */}
      <div
        className="absolute left-0 top-[30%] h-[40%] w-[25%] rounded-full opacity-12 blur-3xl"
        style={{ background: '#EDD5CA' }}
        aria-hidden="true"
      />

      <PageContainer>
        <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
          {/* coluna texto */}
          <div className="space-y-8">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {siteConfig.role}
            </p>

            <h1
              id="hero-heading"
              className="font-serif text-4xl font-bold leading-tight tracking-tight text-brand-forest md:text-5xl lg:text-6xl"
            >
              Um espaço seguro para cuidar de você
            </h1>

            <p className="text-lg leading-8 text-muted-foreground md:text-xl">
              {siteConfig.description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <WhatsAppButton
                label="Agendar Primeira Consulta"
                message="Olá, gostaria de agendar uma primeira consulta."
              />
              <Link
                href="/servicos"
                className="btn-hero-secondary inline-flex items-center justify-center rounded-lg border border-brand-forest/40 bg-brand-ivory/80 px-7 py-3.5 text-sm font-medium text-brand-forest focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Conhecer os Serviços
              </Link>
            </div>
          </div>

          {/* coluna ilustração + sparkles decorativos */}
          <div className="relative flex justify-center md:justify-end">
            {/* sparkles dourado-rosé ao redor da ilustração */}
            <Sparkle className="absolute left-[8%] top-[8%]"  size={14} color="#C98F86" opacity={0.60} />
            <Sparkle className="absolute right-[4%] top-[18%]" size={10} color="#DDA89B" opacity={0.50} />
            <Sparkle className="absolute left-[2%] top-[45%]"  size={8}  color="#E7C1B5" opacity={0.45} />
            <Sparkle className="absolute bottom-[20%] right-[6%]" size={12} color="#C98F86" opacity={0.40} />
            <Sparkle className="absolute bottom-[8%]  left-[18%]" size={7}  color="#DDA89B" opacity={0.35} />

            <Image
              src="/ilustracao/ilustracaohero.webp"
              alt="Ilustração de mulher em paz, com plantas ao redor"
              width={560}
              height={560}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 352px, (max-width: 1024px) 480px, 560px"
              className="relative z-10 w-full max-w-[22rem] md:max-w-[30rem] lg:max-w-[36rem] [filter:contrast(1.15)_brightness(0.93)_sepia(0.12)_saturate(1.05)]"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
