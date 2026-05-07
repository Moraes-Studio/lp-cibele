import Image from 'next/image';
import { UserRound } from 'lucide-react';
import { PageContainer } from '@/components/shared/page-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { siteConfig } from '@/config/site';

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative bg-white py-14 md:py-20"
    >
      <div className="absolute inset-0 overflow-hidden opacity-15" aria-hidden="true">
        <Image
          src="/background/background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <PageContainer>
        <div className="relative z-10 grid gap-12 md:grid-cols-2 md:items-center">
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
            className="relative flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-sand via-brand-ivory to-brand-sand/60 shadow-[0_4px_32px_rgba(47,74,63,0.08)] md:mx-auto"
            aria-hidden="true"
          >
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
              <Image src="/background/background.png" alt="" fill sizes="512px" className="object-cover object-center" />
            </div>
            <UserRound className="relative z-10 h-28 w-28 text-brand-sage/40" strokeWidth={0.75} />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
