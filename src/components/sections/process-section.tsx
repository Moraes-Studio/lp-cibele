import { PageContainer } from '@/components/shared/page-container';
import { SectionHeading } from '@/components/shared/section-heading';

const steps = [
  {
    number: '01',
    title: 'Primeiro contato',
    description:
      'Começamos com uma conversa inicial para entender o que te trouxe até aqui e esclarecer como funciona o processo.',
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

export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="bg-white py-14 md:py-20"
    >
      <PageContainer>
        <div className="space-y-12">
          <SectionHeading
            id="process-heading"
            eyebrow="Como funciona"
            title="Um processo de escuta e reflexão"
            description="A psicoterapia é um espaço construído juntos, no seu ritmo, respeitando sua história e suas necessidades."
          />

          <ol className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number} className="space-y-3">
                <span
                  className="font-serif text-4xl font-semibold text-brand-sand"
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
