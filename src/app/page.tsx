import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { AudienceSection } from '@/components/sections/audience-section';
import { ProcessSection } from '@/components/sections/process-section';
import { ServicesPreviewSection } from '@/components/sections/services-preview-section';
import { CtaSection } from '@/components/sections/cta-section';
import { WhatsAppButton } from '@/components/shared/whatsapp-button';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} | Psicóloga em São Paulo e Online`,
  description:
    'Psicóloga clínica em São Paulo (CRP 06/45117). Atendimento presencial e online para adultos. Foco em saúde emocional, autoconhecimento e transições de vida. Agende sua conversa inicial.',
  keywords: [
    'psicóloga em São Paulo',
    'psicóloga online',
    'terapia online adultos',
    'psicologia clínica São Paulo',
    'psicoterapia presencial SP',
    'saúde emocional adultos',
    'autoconhecimento terapia',
    'terapia para ansiedade São Paulo',
    'transições de vida psicóloga',
    'agendar consulta psicóloga SP',
  ],
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesPreviewSection />
      <AudienceSection />
      <ProcessSection bg="ivory" />
      <CtaSection />
      <WhatsAppButton variant="floating" />
    </>
  );
}
