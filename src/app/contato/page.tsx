import type { Metadata } from 'next';
import { ContactSection } from '@/components/sections/contact-section';

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com a Cibele Rosa para agendar uma conversa inicial sobre atendimento psicológico para adultos.',
  alternates: {
    canonical: '/contato',
  },
};

export default function ContatoPage() {
  return <ContactSection />;
}
