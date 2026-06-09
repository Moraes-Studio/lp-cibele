import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared/page-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { ServiceEditorialSection } from '@/components/sections/service-editorial-section';
import { ProcessSection } from '@/components/sections/process-section';
import { CtaSection } from '@/components/sections/cta-section';
import { WhatsAppButton } from '@/components/shared/whatsapp-button';
import { JsonLd } from '@/components/shared/json-ld';
import { services } from '@/constants/services';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Psicoterapia para Adultos em São Paulo e Online',
  description:
    'Psicoterapia para adultos em São Paulo e online. Ansiedade, burnout, relacionamentos e transições de vida. Atendimento humanizado. CRP 06/45117.',
  keywords: [
    'psicoterapia individual adultos São Paulo',
    'terapia para ansiedade São Paulo',
    'terapia para burnout SP',
    'psicóloga para autoestima São Paulo',
    'terapia para relacionamentos adultos',
    'terapia para transições de vida SP',
    'psicóloga para depressão São Paulo',
    'terapia para autoconhecimento',
    'saúde emocional psicoterapia',
    'equilíbrio emocional terapia SP',
    'terapia online adultos Brasil',
    'acompanhamento psicológico humanizado',
    'fortalecimento emocional psicóloga',
    'crise existencial terapia São Paulo',
  ],
  alternates: {
    canonical: '/servicos',
  },
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Psicoterapia',
  provider: {
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: [
    { '@type': 'City', name: 'São Paulo' },
    { '@type': 'Country', name: 'Brasil' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços de Psicologia Clínica',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
      },
    })),
  },
};

export default function ServicosPage() {
  return (
    <>
      <JsonLd data={servicesSchema} />
      <section
        aria-labelledby="servicos-heading"
        className="bg-brand-ivory py-14 md:py-24"
      >
        <PageContainer>
          <div className="mx-auto max-w-2xl space-y-10 text-center">
            <SectionHeading
              id="servicos-heading"
              eyebrow="Áreas de atuação"
              title="Serviços oferecidos"
              description="Um espaço de escuta e cuidado pensado para adultos que buscam compreender melhor a si mesmos, suas relações e seus caminhos."
              align="center"
              level={1}
              accent
            />
            <WhatsAppButton label="Agendar conversa inicial" />
          </div>
        </PageContainer>
      </section>

      {services.map((service, index) =>
        service.paragraphs ? (
          <ServiceEditorialSection
            key={service.id}
            id={service.id}
            title={service.title}
            paragraphs={service.paragraphs}
            imageSrc={service.imageSrc}
            imageAlt={service.imageAlt}
            imagePosition={service.imagePosition ?? 'left'}
            decorativeVariant={service.decorativeVariant}
            sectionBg={service.sectionBg}
            isFirst={index === 0}
          />
        ) : null
      )}

      <ProcessSection />
      <CtaSection />
      <WhatsAppButton variant="floating" />
    </>
  );
}
