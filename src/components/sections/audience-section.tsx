import { Check } from 'lucide-react';
import { PageContainer } from '@/components/shared/page-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { audienceItems } from '@/constants/audience';

export function AudienceSection() {
  return (
    <section
      aria-labelledby="audience-heading"
      className="bg-brand-sand/40 py-14 md:py-20"
    >
      <PageContainer>
        <div className="mx-auto max-w-2xl space-y-10">
          <SectionHeading
            id="audience-heading"
            eyebrow="Para quem é"
            title="Você pode estar pronto para dar este passo"
            description="A psicoterapia é para quem deseja se conhecer melhor, atravessar momentos difíceis com apoio ou construir uma relação mais saudável consigo mesmo e com os outros."
            align="center"
          />

          <ul className="grid gap-3 sm:grid-cols-2" role="list">
            {audienceItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border/40 bg-white/70 px-4 py-3.5 shadow-[var(--shadow-sm)]"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-forest/15 text-brand-forest"
                  aria-hidden="true"
                >
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-6 text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </section>
  );
}
