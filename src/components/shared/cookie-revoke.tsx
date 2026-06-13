'use client';

import { useConsent } from './consent-context';

export function CookieRevoke() {
  const { revoke } = useConsent();

  return (
    <button
      onClick={revoke}
      className="rounded-sm underline-offset-2 hover:text-brand-ivory hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-leaf"
    >
      Gerenciar cookies
    </button>
  );
}
