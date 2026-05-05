import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SkipLink } from '@/components/shared/skip-link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cibelepsicologia.com.br'
  ),
  title: {
    default: 'Cibele Rosa | Psicologia Clínica para Adultos',
    template: '%s | Cibele Rosa Psicologia',
  },
  description:
    'Atendimento em psicologia clínica para adultos com foco em saúde emocional, autoconhecimento, transições de vida e fortalecimento interno.',
  keywords: [
    'psicologia clínica',
    'psicoterapia para adultos',
    'terapia online',
    'saúde mental',
    'autoconhecimento',
  ],
  authors: [{ name: 'Cibele Rosa' }],
  creator: 'Cibele Rosa',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Cibele Rosa Psicologia',
    title: 'Cibele Rosa | Psicologia Clínica para Adultos',
    description:
      'Atendimento em psicologia clínica para adultos com foco em saúde emocional, autoconhecimento, transições de vida e fortalecimento interno.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cibele Rosa Psicologia Clínica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cibele Rosa | Psicologia Clínica para Adultos',
    description:
      'Atendimento em psicologia clínica para adultos com foco em saúde emocional, autoconhecimento, transições de vida e fortalecimento interno.',
    images: ['/og-image.png'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body>
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
