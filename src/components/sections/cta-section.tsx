import { PageContainer } from '@/components/shared/page-container';
import { WhatsAppButton } from '@/components/shared/whatsapp-button';

export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative bg-brand-forest py-14 md:py-20"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 invert"
        style={{ backgroundImage: "url('/background/background-svg.svg')" }}
        aria-hidden="true"
      />
      <PageContainer>
        <div className="relative z-10 mx-auto max-w-2xl space-y-8 text-center">
          <h2
            id="cta-heading"
            className="font-serif text-3xl font-semibold leading-tight text-brand-ivory md:text-4xl"
          >
            Pronto para dar o primeiro passo?
          </h2>
          <p className="text-base leading-7 text-brand-leaf">
            Entre em contato pelo WhatsApp para agendarmos uma conversa inicial. Sem compromisso,
            com toda a atenção que você merece.
          </p>
          <WhatsAppButton
            label="Falar pelo WhatsApp"
            className="bg-brand-ivory text-brand-forest hover:bg-brand-sand"
          />
        </div>
      </PageContainer>
    </section>
  );
}
