import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { sanitizeField, sanitizeAll } from '../sanitize';

faker.seed(42);

type SanitizeCase = {
  name: string;
  input: string;
};

const SAFE_INPUTS: SanitizeCase[] = [
  { name: 'plain name', input: faker.person.fullName() },
  { name: 'plain email', input: faker.internet.email() },
  { name: 'plain message', input: faker.lorem.sentence(10) },
  { name: 'phone with spaces and dashes', input: '(11) 99999-9999' },
  { name: 'message with newlines', input: 'Olá,\nGostaria de agendar.' },
  { name: 'message with accents', input: 'Estou passando por uma transição difícil.' },
  { name: 'empty string', input: '' },
];

const THREAT_INPUTS: SanitizeCase[] = [
  { name: 'script tag', input: '<script>alert("xss")</script>' },
  { name: 'script tag uppercase', input: '<SCRIPT>alert(1)</SCRIPT>' },
  { name: 'img onerror', input: '<img src=x onerror=alert(1)>' },
  { name: 'iframe embed', input: '<iframe src="evil.com"></iframe>' },
  { name: 'javascript protocol', input: 'javascript:alert(1)' },
  { name: 'javascript protocol with whitespace before colon', input: 'javascript :alert(1)' },
  { name: 'vbscript protocol', input: 'vbscript:msgbox(1)' },
  { name: 'inline onclick handler', input: 'click me onclick=alert(1)' },
  { name: 'inline onerror handler', input: 'test onerror=bad()' },
  { name: 'eval call', input: 'eval(atob("YWxlcnQoMSk="))' },
  { name: 'expression css', input: 'width:expression(alert(1))' },
  { name: 'SQL UNION SELECT', input: "' UNION SELECT * FROM users --" },
  { name: 'SQL DROP TABLE', input: "; DROP TABLE contacts;" },
  { name: 'SQL OR 1=1', input: "' OR '1'='1" },
  { name: 'SQL INSERT INTO', input: "INSERT INTO users VALUES ('hack')" },
  { name: 'SQL DELETE FROM', input: "DELETE FROM contacts WHERE 1=1" },
  { name: 'null byte', input: 'hello\x00world' },
  { name: 'path traversal', input: '../../etc/passwd' },
  { name: 'encoded script tag', input: '%3cscript%3ealert(1)%3c/script%3e' },
  { name: 'HTML entity attack', input: '&#60;script&#62;alert(1)&#60;/script&#62;' },
  { name: 'data URI html', input: 'data:text/html,<script>alert(1)</script>' },
  { name: 'object tag', input: '<object data="evil.swf"></object>' },
  { name: 'embed tag', input: '<embed src="evil.swf">' },
  { name: 'link tag', input: '<link rel="stylesheet" href="evil.css">' },
  { name: 'meta refresh', input: '<meta http-equiv="refresh" content="0;url=evil">' },
];

describe('sanitizeField', () => {
  describe('Success — safe inputs pass through', () => {
    it.each(SAFE_INPUTS)('allows $name', ({ input }) => {
      const result = sanitizeField(input);
      expect(result.ok).toBe(true);
    });
  });

  describe('Threat Detection — malicious inputs are blocked', () => {
    it.each(THREAT_INPUTS)('blocks $name', ({ input }) => {
      const result = sanitizeField(input);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.reason).toBeTruthy();
      }
    });
  });
});

describe('sanitizeField — edge cases', () => {
  it('allows name with accented characters (João Silva)', () => {
    expect(sanitizeField('João Silva').ok).toBe(true);
  });

  it('allows input with just whitespace — trims to empty, no threat', () => {
    const result = sanitizeField('   ');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('');
  });

  it('allows < alone with no closing > (incomplete tag, not an HTML tag)', () => {
    expect(sanitizeField('preço < custo').ok).toBe(true);
  });

  it('blocks literal unicode-escape attack (backslash-u003c in input)', () => {
    const result = sanitizeField('\\u003cscript\\u003e');
    expect(result.ok).toBe(false);
  });

  it('blocks hex-entity attack (&#x3C;)', () => {
    expect(sanitizeField('&#x3C;script&#x3E;').ok).toBe(false);
  });

  it('returns trimmed value for safe input with surrounding whitespace', () => {
    const result = sanitizeField('  Ana Lima  ');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('Ana Lima');
  });
});

describe('sanitizeAll', () => {
  it('returns ok:true and empty values for empty record', () => {
    const result = sanitizeAll({});
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values).toEqual({});
  });

  it('returns sanitized values when all fields are safe', () => {
    faker.seed(100);
    const fields = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: '(11) 98765-4321',
      message: faker.lorem.sentence(12),
    };

    const result = sanitizeAll(fields);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.name).toBe(fields.name.trim());
    }
  });

  it('blocks all fields when any single field contains a threat', () => {
    const fields = {
      name: 'Maria Silva',
      email: 'maria@email.com',
      phone: '11999999999',
      message: '<script>document.cookie</script>',
    };

    const result = sanitizeAll(fields);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBeTruthy();
    }
  });
});
