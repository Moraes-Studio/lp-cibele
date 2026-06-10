'use client';

import { useState } from 'react';
import Script from 'next/script';
import { GADS_ID, CONSENT_KEY } from '@/lib/gtag';

type ConsentValue = 'accepted' | 'rejected' | null;

function getStoredConsent(): ConsentValue {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(CONSENT_KEY);
  return v === 'accepted' || v === 'rejected' ? (v as ConsentValue) : null;
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue>(getStoredConsent);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setConsent('rejected');
  };

  const gadsActive = consent === 'accepted' && /^AW-\d+$/.test(GADS_ID);

  return (
    <>
      {gadsActive && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
            strategy="lazyOnload"
          />
          <Script id="google-ads-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GADS_ID)});`}
          </Script>
        </>
      )}

      {consent === null && (
        <div
          role="dialog"
          aria-label="Aviso de cookies"
          aria-modal="false"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-sage/20 bg-brand-ivory px-4 py-4 shadow-lg md:px-8"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-brand-charcoal/80">
              Usamos cookies para medir o desempenho de anúncios e melhorar sua experiência.{' '}
              <a
                href="/privacidade"
                className="underline underline-offset-2 hover:text-brand-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage"
              >
                Política de Privacidade
              </a>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={reject}
                className="rounded-md border border-brand-charcoal/30 px-4 py-2 text-sm text-brand-charcoal/70 transition-colors hover:border-brand-charcoal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage"
              >
                Rejeitar
              </button>
              <button
                onClick={accept}
                className="rounded-md bg-brand-sage px-4 py-2 text-sm text-white transition-colors hover:bg-brand-sage/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage focus-visible:ring-offset-2"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
