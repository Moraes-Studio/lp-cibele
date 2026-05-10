import Image from 'next/image';
import { PageContainer } from '@/components/shared/page-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { siteConfig } from '@/config/site';

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative bg-brand-ivory py-16 md:py-24"
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
        <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:gap-14 lg:gap-16">

          {/* article — texto; primeiro no DOM → topo no mobile */}
          <article className="w-full shrink-0 md:w-1/2 lg:pr-4">
            <div className="space-y-6">
              <SectionHeading
                id="about-heading"
                eyebrow="Sobre mim"
                title={siteConfig.name}
              />
              <div className="space-y-4 text-base leading-7 text-muted-foreground md:text-lg">
                <p>
                  Sou psicóloga clínica com mais de 20 anos de experiência, especializada em
                  Terapia Cognitivo-Comportamental (TCC). Minha atuação é pautada em escuta
                  acolhedora, ética e humanizada, respeitando a individualidade, o ritmo e as
                  necessidades de cada paciente.
                </p>
                <p>
                  Ao longo da minha trajetória, atuei em programas de promoção da saúde mental e
                  suporte psicológico vinculados a grandes instituições financeiras, hospitalares e
                  organizações de alcance nacional. Essa experiência ampliou o contato com diversas
                  demandas emocionais, ocupacionais e organizacionais, envolvendo acolhimento
                  psicológico, intervenções breves e elaboração de documentos técnicos.
                </p>
                <p>
                  Acredito na psicoterapia como um espaço de escuta, reflexão e desenvolvimento
                  emocional, capaz de favorecer maior equilíbrio psicológico e qualidade de vida.
                </p>
              </div>
              {siteConfig.crp && (
                <p className="text-sm font-medium text-muted-foreground">{siteConfig.crp}</p>
              )}
            </div>
          </article>

          {/* aside — foto da psicóloga */}
          <aside className="w-full shrink-0 md:w-1/2">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[22rem] overflow-hidden rounded-3xl ring-1 ring-brand-forest/[0.08] shadow-[0_8px_40px_rgba(31,64,52,0.14),0_2px_10px_rgba(31,64,52,0.06)]">
              <Image
                src="/psicologa/cibele.webp"
                alt="Cibele Rosa, psicóloga clínica"
                fill
                sizes="(max-width: 768px) 100vw, 352px"
                className="object-cover object-[50%_12%]"
                priority
              />
            </div>
          </aside>

        </div>
      </PageContainer>
    </section>
  );
}
