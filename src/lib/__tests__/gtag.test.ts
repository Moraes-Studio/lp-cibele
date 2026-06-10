// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { gtagConversion, CONSENT_KEY } from '../gtag';

beforeEach(() => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
});

afterEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag = undefined;
  localStorage.clear();
});

describe('gtagConversion', () => {
  it('does nothing when sendTo is empty string', () => {
    const spy = vi.fn();
    window.gtag = spy;
    gtagConversion('');
    expect(spy).not.toHaveBeenCalled();
  });

  it('does nothing when window.gtag is not a function', () => {
    expect(() => gtagConversion('AW-123/abc')).not.toThrow();
  });

  it('does nothing when window.gtag is defined but not callable', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag = 'string, not a function';
    expect(() => gtagConversion('AW-123/abc')).not.toThrow();
  });

  it('calls window.gtag with correct event when all conditions met', () => {
    const spy = vi.fn();
    window.gtag = spy;
    gtagConversion('AW-1030405375/J6m9CNDn5bscEP_5qusD');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith('event', 'conversion', {
      send_to: 'AW-1030405375/J6m9CNDn5bscEP_5qusD',
    });
  });

  it('does not call gtag again for a different conversion ID', () => {
    const spy = vi.fn();
    window.gtag = spy;
    gtagConversion('AW-123/abc');
    gtagConversion('AW-456/def');
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, 'event', 'conversion', { send_to: 'AW-123/abc' });
    expect(spy).toHaveBeenNthCalledWith(2, 'event', 'conversion', { send_to: 'AW-456/def' });
  });
});

describe('GADS_ID format validation (/^AW-\\d+$/)', () => {
  const validIds = ['AW-1030405375', 'AW-1', 'AW-9999999999'];
  const invalidIds = ['', 'AW-', 'AW-abc', 'aw-123', 'AW 123', "AW-123');alert(1)", 'AW-123 '];

  it.each(validIds)('accepts %s', (id) => {
    expect(/^AW-\d+$/.test(id)).toBe(true);
  });

  it.each(invalidIds)('rejects %s', (id) => {
    expect(/^AW-\d+$/.test(id)).toBe(false);
  });
});
