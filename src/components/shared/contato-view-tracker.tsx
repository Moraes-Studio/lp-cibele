'use client';

import { useEffect } from 'react';
import { gtagConversion, ADS_CONVERSIONS } from '@/lib/gtag';

export function ContatoViewTracker() {
  useEffect(() => {
    gtagConversion(ADS_CONVERSIONS.contatoView);
  }, []);
  return null;
}
