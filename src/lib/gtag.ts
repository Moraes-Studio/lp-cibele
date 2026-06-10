export const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID ?? '';

export const ADS_CONVERSIONS = {
  whatsapp: process.env.NEXT_PUBLIC_GADS_WHATSAPP ?? '',
  form: process.env.NEXT_PUBLIC_GADS_FORM ?? '',
  contatoView: process.env.NEXT_PUBLIC_GADS_CONTATO_VIEW ?? '',
} as const;

type GTagFn = (command: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    gtag: GTagFn;
    dataLayer: unknown[];
  }
}

export const CONSENT_KEY = 'cookie_consent';

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

export function gtagConversion(sendTo: string) {
  if (!sendTo || !hasConsent() || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', { send_to: sendTo });
}
