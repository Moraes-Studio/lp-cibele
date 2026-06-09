import { describe, it, expect } from 'vitest';

// Mirrors the escaping logic in src/components/shared/json-ld.tsx.
// If json-ld.tsx changes its escaping strategy, update this too.
function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

describe('JSON-LD XSS escaping', () => {
  it('leaves safe data unchanged (no angle brackets emitted)', () => {
    const result = safeJsonLd({ name: 'Cibele Rosa', type: 'Person' });
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
    expect(result).toContain('"Cibele Rosa"');
  });

  it('escapes < as \\u003c', () => {
    const result = safeJsonLd({ val: '<b>' });
    expect(result).toContain('\\u003c');
    expect(result).not.toContain('<');
  });

  it('escapes > as \\u003e', () => {
    const result = safeJsonLd({ val: '<b>' });
    expect(result).toContain('\\u003e');
    expect(result).not.toContain('>');
  });

  it('blocks </script> injection attempt — script tag cannot close inline JSON block', () => {
    const result = safeJsonLd({ url: 'foo</script><script>alert(1)</script>' });
    expect(result).not.toContain('</script>');
    expect(result).not.toContain('<script>');
    expect(result).toContain('\\u003c/script\\u003e');
  });

  it('works on deeply nested objects', () => {
    const result = safeJsonLd({ a: { b: { c: '<malicious>' } } });
    expect(result).not.toContain('<malicious>');
    expect(result).toContain('\\u003cmalicious\\u003e');
  });

  it('works on arrays of strings', () => {
    const result = safeJsonLd({ tags: ['<one>', 'two', '<three>'] });
    expect(result).not.toContain('<one>');
    expect(result).toContain('\\u003cone\\u003e');
    expect(result).toContain('"two"');
  });

  it('produces valid JSON after escaping', () => {
    const data = { name: 'Cibele <Rosa>', url: 'https://example.com/path?a=1&b=<2>' };
    const result = safeJsonLd(data);
    expect(() => JSON.parse(result)).not.toThrow();
  });

  it('empty object produces empty JSON object', () => {
    expect(safeJsonLd({})).toBe('{}');
  });
});
