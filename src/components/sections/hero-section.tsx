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
      className="relative flex min-h-[620px] items-center overflow-hidden bg-brand-ivory py-16 md:min-h-[720px] md:py-24"
    >
      {/* background botanical — div CSS não é candidato a LCP */}
      <div
        className="absolute inset-0 opacity-15"
        style={{ backgroundImage: 'url(/background/background2.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
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
        <div className="relative z-10 grid items-center gap-10 md:grid-cols-2 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
          {/* coluna texto — fade-up escalonado */}
          <div className="space-y-8">
            <p
              className="text-sm font-medium uppercase tracking-widest text-muted-foreground motion-safe:animate-fade-up"
              style={{ animationDelay: '0ms' }}
            >
              {siteConfig.role}
            </p>

            <h1
              id="hero-heading"
              className="font-serif text-3xl font-bold leading-tight tracking-tight text-brand-forest motion-safe:animate-rise md:text-[3.25rem] lg:text-[4.25rem]"
            >
              Um espaço seguro para cuidar de você
            </h1>

            <p
              className="text-lg leading-8 text-muted-foreground motion-safe:animate-fade-up md:text-xl"
              style={{ animationDelay: '300ms' }}
            >
              {siteConfig.description}
            </p>

            <div
              className="flex flex-col gap-4 sm:flex-row motion-safe:animate-fade-up"
              style={{ animationDelay: '450ms' }}
            >
              <WhatsAppButton
                label="Agendar Primeira Consulta"
                message="Olá, gostaria de agendar uma primeira consulta."
                className="flex-1 justify-center whitespace-nowrap"
              />
              <Link
                href="/servicos"
                className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-lg border-2 border-brand-forest/65 bg-brand-ivory/90 px-7 py-3.5 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-sand focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Conhecer os Serviços
              </Link>
            </div>
          </div>

          {/* coluna ilustração — float suave */}
          <div className="relative hidden justify-center md:flex md:justify-end">
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
              sizes="(max-width: 1023px) 480px, 704px"
              className="relative z-10 w-full max-w-[30rem] motion-safe:animate-float lg:max-w-[44rem] [filter:contrast(1.15)_brightness(0.93)_sepia(0.12)_saturate(1.05)]"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
