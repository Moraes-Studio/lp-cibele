import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared/page-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { ServiceEditorialSection } from '@/components/sections/service-editorial-section';
import { ProcessSection } from '@/components/sections/process-section';
import { CtaSection } from '@/components/sections/cta-section';
import { WhatsAppButton } from '@/components/shared/whatsapp-button';
import { services } from '@/constants/services';

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Psicoterapia para adultos, suporte em transições de vida, relacionamentos e saúde emocional. Acompanhamento psicológico humanizado, com escuta, acolhimento e equilíbrio emocional. Atendimento presencial e online.',
  keywords: [
    'psicoterapia para adultos',
    'saúde emocional',
    'transições de vida',
    'relacionamentos',
    'ansiedade',
    'autoconhecimento',
    'equilíbrio emocional',
    'acompanhamento psicológico',
    'terapia online',
    'psicóloga',
  ],
  alternates: {
    canonical: '/servicos',
  },
};

export default function ServicosPage() {
  return (
    <>
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
