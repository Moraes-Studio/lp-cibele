import { PageContainer } from '@/components/shared/page-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { siteConfig } from '@/config/site';

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="bg-white py-20 md:py-28"
    >
      <PageContainer>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <SectionHeading
              id="about-heading"
              eyebrow="Sobre mim"
              title={siteConfig.name}
              description="Sou psicóloga clínica com formação voltada ao atendimento de adultos. Acredito que o processo terapêutico é um espaço de escuta, reflexão e transformação — um lugar onde cada pessoa pode se encontrar com mais clareza sobre si mesma e sobre suas relações."
            />
            {siteConfig.crp && (
              <p className="text-sm font-medium text-brand-sage">{siteConfig.crp}</p>
            )}
          </div>

          <div
            className="flex aspect-square w-full max-w-sm items-center justify-center rounded-2xl bg-brand-sand text-brand-sage md:mx-auto"
            aria-hidden="true"
          >
            <span className="text-sm text-brand-sage">Foto em breve</span>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
