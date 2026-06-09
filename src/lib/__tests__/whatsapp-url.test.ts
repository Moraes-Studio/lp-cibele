import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl } from '@/components/shared/whatsapp-button';

describe('buildWhatsAppUrl', () => {
  describe('returns null for invalid phone inputs', () => {
    it('returns null for empty string', () => {
      expect(buildWhatsAppUrl('')).toBeNull();
    });

    it('returns null when phone has only non-digit chars', () => {
      expect(buildWhatsAppUrl('(+) - ')).toBeNull();
    });

    it('returns null for string with only spaces', () => {
      expect(buildWhatsAppUrl('   ')).toBeNull();
    });
  });

  describe('builds correct wa.me URL', () => {
    it('strips non-digits and builds base URL', () => {
      expect(buildWhatsAppUrl('+55 11 99999-9999')).toBe('https://wa.me/5511999999999');
    });

    it('returns base URL without query param when no message passed', () => {
      expect(buildWhatsAppUrl('5511999999999')).toBe('https://wa.me/5511999999999');
    });

    it('returns base URL when message is empty string (falsy)', () => {
      expect(buildWhatsAppUrl('5511999999999', '')).toBe('https://wa.me/5511999999999');
    });

    it('appends encoded message as text query param', () => {
      const result = buildWhatsAppUrl('5511999999999', 'Olá!');
      expect(result).toBe('https://wa.me/5511999999999?text=Ol%C3%A1!');
    });

    it('URL-encodes special chars in message', () => {
      const message = 'Hello & World / Test';
      const result = buildWhatsAppUrl('11999999999', message);
      expect(result).toBe(`https://wa.me/11999999999?text=${encodeURIComponent(message)}`);
    });

    it('handles landline format (11) 3456-7890', () => {
      expect(buildWhatsAppUrl('(11) 3456-7890')).toBe('https://wa.me/1134567890');
    });

    it('handles format with country code +55', () => {
      expect(buildWhatsAppUrl('+5511999999999')).toBe('https://wa.me/5511999999999');
    });

    it('encodes multi-line message correctly', () => {
      const result = buildWhatsAppUrl('11999999999', 'Linha 1\nLinha 2');
      expect(result).toContain(encodeURIComponent('Linha 1\nLinha 2'));
    });

    it('encodes asterisks used in WhatsApp bold formatting', () => {
      const result = buildWhatsAppUrl('11999999999', '*Nome:* Ana Silva');
      expect(result).toContain(encodeURIComponent('*Nome:* Ana Silva'));
    });
  });
});
