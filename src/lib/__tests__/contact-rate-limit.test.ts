// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  checkContactRateLimit,
  recordContactSent,
  formatCooldownMessage,
} from '../contact-rate-limit';

const STORAGE_KEY = 'contact_last_sent';
const COOLDOWN_MS = 3 * 60 * 1000;

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  localStorage.clear();
});

describe('checkContactRateLimit', () => {
  describe('Success — submission is allowed', () => {
    it('allows when localStorage has no entry', () => {
      const result = checkContactRateLimit();
      expect(result.allowed).toBe(true);
    });

    it('allows when cooldown has fully elapsed', () => {
      localStorage.setItem(STORAGE_KEY, String(Date.now() - COOLDOWN_MS - 1));
      const result = checkContactRateLimit();
      expect(result.allowed).toBe(true);
    });

    it('allows when stored timestamp is corrupted (NaN)', () => {
      localStorage.setItem(STORAGE_KEY, 'not-a-number');
      const result = checkContactRateLimit();
      expect(result.allowed).toBe(true);
    });
  });

  describe('Rate Limited — submission is blocked', () => {
    it('blocks immediately after recordContactSent', () => {
      recordContactSent();
      const result = checkContactRateLimit();
      expect(result.allowed).toBe(false);
    });

    it('blocks when 1 minute has passed (still within cooldown)', () => {
      localStorage.setItem(STORAGE_KEY, String(Date.now() - 60_000));
      const result = checkContactRateLimit();
      expect(result.allowed).toBe(false);
    });

    it('provides correct remainingMs when blocked', () => {
      const oneMinuteAgo = Date.now() - 60_000;
      localStorage.setItem(STORAGE_KEY, String(oneMinuteAgo));

      const result = checkContactRateLimit();
      expect(result.allowed).toBe(false);

      if (!result.allowed) {
        const expectedRemaining = COOLDOWN_MS - 60_000;
        expect(result.remainingMs).toBeCloseTo(expectedRemaining, -2);
      }
    });
  });
});

describe('checkContactRateLimit — boundary and storage edge cases', () => {
  it('allows when elapsed is exactly equal to COOLDOWN_MS (boundary)', () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now() - COOLDOWN_MS));
    const result = checkContactRateLimit();
    expect(result.allowed).toBe(true);
  });

  it('allows when localStorage.getItem throws (unavailable storage)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => {
      throw new Error('storage unavailable');
    });
    expect(() => checkContactRateLimit()).not.toThrow();
    expect(checkContactRateLimit().allowed).toBe(true);
  });

  it('blocks when 1 ms before cooldown expires (still within window)', () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now() - COOLDOWN_MS + 1));
    expect(checkContactRateLimit().allowed).toBe(false);
  });
});

describe('recordContactSent', () => {
  it('writes current timestamp to localStorage', () => {
    const before = Date.now();
    recordContactSent();
    const after = Date.now();

    const stored = parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10);
    expect(stored).toBeGreaterThanOrEqual(before);
    expect(stored).toBeLessThanOrEqual(after);
  });

  it('overwrites a previous entry', () => {
    localStorage.setItem(STORAGE_KEY, '12345');
    recordContactSent();
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).not.toBe('12345');
  });
});

describe('formatCooldownMessage', () => {
  describe('Success — correct human-readable messages', () => {
    const messageCases = [
      { name: '30 seconds remaining', remainingMs: 30_000, expected: /30 segundos/ },
      { name: '59 seconds remaining', remainingMs: 59_000, expected: /59 segundos/ },
      { name: 'exactly 60 seconds (1 minute)', remainingMs: 60_000, expected: /1 minuto/ },
      { name: '2 minutes remaining', remainingMs: 120_000, expected: /2 minutos/ },
      { name: '3 minutes remaining (full cooldown)', remainingMs: COOLDOWN_MS, expected: /3 minutos/ },
    ];

    it.each(messageCases)('$name', ({ remainingMs, expected }) => {
      const message = formatCooldownMessage(remainingMs);
      expect(message).toMatch(expected);
    });
  });

  it('handles 0ms gracefully (0 seconds)', () => {
    const message = formatCooldownMessage(0);
    expect(message).toMatch(/0 segundos/);
  });

  it('handles 1ms — rounds up to 1 second', () => {
    const message = formatCooldownMessage(1);
    expect(message).toMatch(/1 segundos/);
  });

  it('handles 59999ms — rounds up to 60 seconds → 1 minuto', () => {
    const message = formatCooldownMessage(59_999);
    expect(message).toMatch(/1 minuto\b/);
  });

  it('uses singular "minuto" for exactly 1 minute', () => {
    const message = formatCooldownMessage(60_000);
    expect(message).toMatch(/1 minuto\b/);
    expect(message).not.toMatch(/minutos/);
  });
});
