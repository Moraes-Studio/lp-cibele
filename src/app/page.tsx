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
  title: `${siteConfig.name} | ${siteConfig.role}`,
  description: siteConfig.description,
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
      <ProcessSection />
      <CtaSection />
      <WhatsAppButton variant="floating" />
    </>
  );
}
