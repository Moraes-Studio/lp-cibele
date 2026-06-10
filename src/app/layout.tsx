import '@/config/env';
import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SkipLink } from '@/components/shared/skip-link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JsonLd } from '@/components/shared/json-ld';
import { CookieConsent } from '@/components/shared/cookie-consent';
import { siteConfig } from '@/config/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'optional',
  preload: true,
});

export const viewport: Viewport = {
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'psicóloga em São Paulo',
    'psicóloga online',
    'psicoterapia para adultos',
    'terapia online',
    'psicologia clínica São Paulo',
    'terapia para ansiedade São Paulo',
    'saúde emocional',
    'autoconhecimento',
    'terapia para transições de vida',
    'psicóloga presencial e online SP',
    'agendar consulta psicóloga',
    'saúde mental São Paulo',
    'psicoterapia adultos SP',
    'equilíbrio emocional',
    'fortalecimento emocional',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: `${siteConfig.name} Psicologia`,
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: 'Psicóloga Clínica',
  description: siteConfig.description,
  url: siteConfig.url,
  ...(siteConfig.email && { email: siteConfig.email }),
  ...(siteConfig.phone && { telephone: `+${siteConfig.phone}` }),
  areaServed: [
    { '@type': 'City', name: 'São Paulo', containedIn: 'Brasil' },
    { '@type': 'Country', name: 'Brasil' },
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceType: 'Atendimento online e presencial',
    availableLanguage: { '@type': 'Language', name: 'Portuguese' },
  },
  knowsAbout: [
    'Psicoterapia para adultos',
    'Saúde emocional',
    'Ansiedade',
    'Autoconhecimento',
    'Transições de vida',
    'Relacionamentos',
    'Depressão',
    'Burnout',
    'Desenvolvimento pessoal',
    'Fortalecimento emocional',
  ],
  ...(siteConfig.crp && {
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: siteConfig.crp,
      recognizedBy: {
        '@type': 'Organization',
        name: 'Conselho Regional de Psicologia de São Paulo (CRP-SP)',
      },
    },
  }),
  sameAs: [siteConfig.instagram, siteConfig.linkedin].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`} style={{ backgroundColor: '#F6F1EB' }}>
      <body style={{ backgroundColor: '#F6F1EB' }}>
        <div
          className="pointer-events-none fixed inset-0 z-[5] opacity-[0.025]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
            mixBlendMode: 'soft-light',
          }}
          aria-hidden="true"
        />
        <CookieConsent />
        <JsonLd data={personSchema} />
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
