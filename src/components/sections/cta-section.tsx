import { PageContainer } from '@/components/shared/page-container';
import { WhatsAppButton } from '@/components/shared/whatsapp-button';

export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-brand-forest py-20 md:py-28"
    >
      <PageContainer>
        <div className="mx-auto max-w-xl space-y-8 text-center">
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
