'use client';

import { CONSENT_KEY } from '@/lib/gtag';

export function CookieRevoke() {
  const revoke = () => {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  };

  return (
    <button
      onClick={revoke}
      className="rounded-sm underline-offset-2 hover:text-brand-ivory hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-leaf"
    >
      Gerenciar cookies
    </button>
  );
}
