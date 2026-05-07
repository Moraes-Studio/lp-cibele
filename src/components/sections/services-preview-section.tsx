import Link from 'next/link';
import { PageContainer } from '@/components/shared/page-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { ServiceCard } from '@/components/shared/service-card';
import { services } from '@/constants/services';

export function ServicesPreviewSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="bg-brand-ivory py-14 md:py-20"
    >
      <PageContainer>
        <div className="space-y-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="services-heading"
              eyebrow="Áreas de atuação"
              title="Serviços oferecidos"
              description="Atendimento focado nas necessidades emocionais e relacionais de adultos."
            />
            <Link
              href="/servicos"
              className="shrink-0 text-sm font-medium text-brand-forest underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Ver todos os serviços
            </Link>
          </div>

          <ul
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
          >
            {services.map((service) => (
              <li key={service.id} className="h-full">
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
  );
}
