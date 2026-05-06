import Link from 'next/link';
import { PageContainer } from '@/components/shared/page-container';
import { WhatsAppButton } from '@/components/shared/whatsapp-button';
import { siteConfig } from '@/config/site';

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-brand-ivory py-20 md:py-28 lg:py-36"
    >
      <PageContainer>
        <div className="mx-auto max-w-2xl space-y-8">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-sage">
            {siteConfig.role}
          </p>

          <h1
            id="hero-heading"
            className="font-serif text-4xl font-semibold leading-tight tracking-tight text-brand-forest md:text-5xl lg:text-6xl"
          >
            Um espaço seguro para cuidar de você
          </h1>

          <p className="text-lg leading-8 text-muted-foreground md:text-xl">
            {siteConfig.description}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <WhatsAppButton label="Agendar uma conversa" />
            <Link
              href="/servicos"
              className="inline-flex items-center justify-center rounded-md border border-brand-forest/20 px-6 py-3 text-sm font-medium text-brand-forest transition-colors hover:bg-brand-sand focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Conhecer os serviços
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
