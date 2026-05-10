import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: '404 — Página não encontrada',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden">

      {/* imagem como fundo */}
      <Image
        src="/error/error404.webp"
        alt="Ilustração de uma pessoa caminhando em um novo caminho — página não encontrada"
        fill
        priority
        className="object-cover object-center"
      />

      {/* nav mínima */}
      <div className="relative z-10 flex h-16 shrink-0 items-center px-6 sm:px-10">
        <Link
          href="/"
          className="font-serif text-lg font-semibold text-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest focus-visible:ring-offset-2 rounded-sm"
        >
          {siteConfig.name}
        </Link>
      </div>

      {/* espaçador */}
      <div className="flex-1" />

      {/* gradient + botão na base */}
      <div className="relative z-10 flex flex-col items-center pb-12">
        <div
          className="absolute inset-x-0 bottom-0 h-48 -z-10"
          style={{ background: 'linear-gradient(to top, rgba(246,241,235,0.88) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        <p className="mb-4 text-sm text-muted-foreground">
          A página que você procura não existe mais.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-forest px-6 py-3 text-sm font-semibold text-brand-ivory shadow-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest focus-visible:ring-offset-2"
        >
          Voltar ao início
        </Link>
      </div>

    </div>
  );
}
