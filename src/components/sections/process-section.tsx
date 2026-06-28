import { PageContainer } from '@/components/shared/page-container';
import { SectionHeading } from '@/components/shared/section-heading';

const steps = [
  {
    number: '01',
    title: 'Primeiro contato',
    description:
      'Começamos com uma conversa para entender o que te trouxe até aqui e como funciona o processo.',
  },
  {
    number: '02',
    title: 'Sessões regulares',
    description:
      'Encontros semanais com duração de 50 minutos, em ambiente seguro e confidencial, presencial ou online.',
  },
  {
    number: '03',
    title: 'Construção conjunta',
    description:
      'Ao longo do processo, você vai desenvolvendo mais autoconhecimento, recursos internos e clareza sobre si mesmo.',
  },
] as const;

export function ProcessSection({ bg = 'white' }: { bg?: 'white' | 'ivory' }) {
  return (
    <section
      aria-labelledby="process-heading"
      className={bg === 'ivory' ? 'bg-brand-ivory py-14 md:py-20' : 'bg-white py-14 md:py-20'}
    >
      <PageContainer>
        <div className="space-y-12">
          <SectionHeading
            id="process-heading"
            eyebrow="Como funciona"
            title="Um processo de escuta e reflexão"
            description="A psicoterapia é um espaço construído juntos, no seu ritmo, respeitando sua história e suas necessidades."
            accent
          />

          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step) => (
              <li key={step.number} className="space-y-4 border-l-2 border-brand-leaf/50 pl-5 md:border-l-0 md:border-t-2 md:pl-0 md:pt-5">
                <span
                  className="font-serif text-5xl font-semibold text-brand-sage-strong"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </PageContainer>
    </section>
  );
}
