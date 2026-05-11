'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden">

      {/* imagem como fundo */}
      <Image
        src="/error/error404.webp"
        alt="Ilustração de uma pessoa caminhando em um novo caminho — algo deu errado"
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

      {/* gradient + botões na base */}
      <div className="relative z-10 flex flex-col items-center pb-12">
        <div
          className="absolute inset-x-0 bottom-0 h-48 -z-10"
          style={{ background: 'linear-gradient(to top, rgba(246,241,235,0.88) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        <p className="mb-4 text-sm text-muted-foreground">
          Algo inesperado aconteceu. Tente novamente ou volte ao início.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-forest px-6 py-3 text-sm font-semibold text-brand-ivory shadow-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest focus-visible:ring-offset-2"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-forest/60 bg-brand-ivory/80 px-6 py-3 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest focus-visible:ring-offset-2"
          >
            Voltar ao início
          </Link>
        </div>
      </div>

    </div>
  );
}
