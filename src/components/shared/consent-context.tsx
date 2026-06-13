'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { CONSENT_KEY } from '@/lib/gtag';

type ConsentValue = 'accepted' | 'rejected' | null;

interface ConsentContextType {
  consent: ConsentValue;
  accept: () => void;
  reject: () => void;
  revoke: () => void;
}

const ConsentContext = createContext<ConsentContextType | null>(null);

function getStoredConsent(): ConsentValue {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(CONSENT_KEY);
  return v === 'accepted' || v === 'rejected' ? (v as ConsentValue) : null;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentValue>(getStoredConsent);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setConsent('rejected');
  };

  const revoke = () => {
    localStorage.removeItem(CONSENT_KEY);
    setConsent(null);
  };

  return (
    <ConsentContext.Provider value={{ consent, accept, reject, revoke }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}
