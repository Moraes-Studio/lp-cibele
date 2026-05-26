import type { Metadata } from 'next';
import { ContactSection } from '@/components/sections/contact-section';

export const metadata: Metadata = {
  title: 'Agendar Consulta | Cibele Rosa Psicóloga São Paulo',
  description:
    'Agende sua conversa inicial com a psicóloga Cibele Rosa. Atendimento presencial em São Paulo e online para todo o Brasil. Resposta rápida via WhatsApp. CRP 06/45117.',
  keywords: [
    'agendar consulta psicóloga São Paulo',
    'marcar terapia SP',
    'primeira consulta psicóloga online',
    'psicóloga presencial e online São Paulo',
    'contato psicóloga SP',
    'quanto custa sessão de terapia SP',
    'psicóloga WhatsApp São Paulo',
    'agendar psicoterapia adultos',
  ],
  alternates: {
    canonical: '/contato',
  },
};

export default function ContatoPage() {
  return <ContactSection />;
}
