import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared/page-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { ServiceCard } from '@/components/shared/service-card';
import { ProcessSection } from '@/components/sections/process-section';
import { CtaSection } from '@/components/sections/cta-section';
import { WhatsAppButton } from '@/components/shared/whatsapp-button';
import { services } from '@/constants/services';

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Conheça as áreas de atuação da Cibele Rosa: psicoterapia para adultos, saúde emocional, transições de vida e relacionamentos.',
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

      <section
        aria-labelledby="servicos-cards-heading"
        className="bg-white py-14 md:py-20"
      >
        <PageContainer>
          <div className="space-y-12">
            <SectionHeading
              id="servicos-cards-heading"
              eyebrow="O que atendo"
              title="Áreas de foco"
              description="Cada processo terapêutico é único. As áreas abaixo representam os principais temas trabalhados no atendimento."
              accent
            />

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
              {services.map((service) => (
                <li key={service.id}>
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    iconBgClass={service.iconBgClass}
                  />
                </li>
              ))}
            </ul>
          </div>
        </PageContainer>
      </section>

      <ProcessSection />
      <CtaSection />
      <WhatsAppButton variant="floating" />
    </>
  );
}
