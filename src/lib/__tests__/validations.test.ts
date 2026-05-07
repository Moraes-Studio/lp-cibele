import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { contactFormSchema } from '../validations';

faker.seed(7);

const BASE = {
  name: faker.person.fullName(),
  email: 'usuario@email.com.br',
  phone: '(11) 98765-4321',
  message: faker.lorem.sentence(15),
  company: '',
};

type ValidationCase = {
  name: string;
  override: Partial<typeof BASE>;
};

describe('contactFormSchema', () => {
  describe('Success — valid data passes', () => {
    const successCases: ValidationCase[] = [
      { name: 'complete valid form', override: {} },
      { name: 'phone with +55 prefix', override: { phone: '+55 11 98765-4321' } },
      { name: 'message at minimum length', override: { message: 'Olá, preciso de ajuda.' } },
      { name: 'name with first and last name', override: { name: 'Ana Lima' } },
      { name: 'name with three parts', override: { name: 'Ana Paula Lima' } },
      { name: 'email with .com.br domain', override: { email: 'nome@provedor.com.br' } },
      { name: 'phone with 10 digits (landline)', override: { phone: '(11) 3456-7890' } },
      { name: 'company field omitted (no honeypot)', override: { company: undefined } },
      { name: 'company field empty string', override: { company: '' } },
    ];

    it.each(successCases)('$name', ({ override }) => {
      const result = contactFormSchema.safeParse({ ...BASE, ...override });
      expect(result.success).toBe(true);
    });
  });

  describe('Validation Errors — invalid data is rejected', () => {
    describe('name field', () => {
      const nameCases: ValidationCase[] = [
        { name: 'empty name', override: { name: '' } },
        { name: 'name too short (2 chars)', override: { name: 'AB' } },
        { name: 'name without surname', override: { name: 'Cibele' } },
        { name: 'name with single-char parts', override: { name: 'A B' } },
        { name: 'name over 100 chars', override: { name: 'Ana Lima '.repeat(12) } },
        { name: 'repetitive name (aaaaaaa)', override: { name: 'aaaaaaa' } },
      ];

      it.each(nameCases)('rejects $name', ({ override }) => {
        const result = contactFormSchema.safeParse({ ...BASE, ...override });
        expect(result.success).toBe(false);
      });
    });

    describe('email field', () => {
      const emailCases: ValidationCase[] = [
        { name: 'empty email', override: { email: '' } },
        { name: 'email without @', override: { email: 'notanemail' } },
        { name: 'email without domain', override: { email: 'user@' } },
        { name: 'email without TLD', override: { email: 'user@domain' } },
        { name: 'email with incomplete TLD (1 char)', override: { email: 'user@domain.c' } },
        { name: 'email over 150 chars', override: { email: `${'a'.repeat(145)}@b.com` } },
      ];

      it.each(emailCases)('rejects $email', ({ override }) => {
        const result = contactFormSchema.safeParse({ ...BASE, ...override });
        expect(result.success).toBe(false);
      });
    });

    describe('phone field', () => {
      const phoneCases: ValidationCase[] = [
        { name: 'empty phone', override: { phone: '' } },
        { name: 'phone too short (3 digits)', override: { phone: '123' } },
        { name: 'phone with 9 digits only (no DDD)', override: { phone: '987654321' } },
        { name: 'phone over 20 chars', override: { phone: '1'.repeat(21) } },
        { name: 'phone with letters', override: { phone: 'abc-def-ghij' } },
        { name: 'phone with special chars', override: { phone: '99999@9999!' } },
      ];

      it.each(phoneCases)('rejects $name', ({ override }) => {
        const result = contactFormSchema.safeParse({ ...BASE, ...override });
        expect(result.success).toBe(false);
      });
    });

    describe('message field', () => {
      const messageCases: ValidationCase[] = [
        { name: 'empty message', override: { message: '' } },
        { name: 'message too short (5 chars)', override: { message: 'Olá.' } },
        { name: 'message over 1000 chars', override: { message: 'Lorem ipsum dolor sit amet. '.repeat(36) } },
        { name: 'repetitive message (bbbbbbb)', override: { message: 'bbbbbbbbbbb' } },
      ];

      it.each(messageCases)('rejects $name', ({ override }) => {
        const result = contactFormSchema.safeParse({ ...BASE, ...override });
        expect(result.success).toBe(false);
      });
    });

    describe('honeypot field', () => {
      it('rejects when company field is filled (bot detection)', () => {
        const result = contactFormSchema.safeParse({
          ...BASE,
          company: 'Acme Corp',
        });
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Error messages are user-friendly', () => {
    it('name too short has a readable message', () => {
      const result = contactFormSchema.safeParse({ ...BASE, name: 'AB' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const message = result.error.issues[0].message;
        expect(message).toMatch(/3 caracteres/);
      }
    });

    it('name without surname has a readable message', () => {
      const result = contactFormSchema.safeParse({ ...BASE, name: 'Cibele' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const message = result.error.issues[0].message;
        expect(message).toMatch(/nome completo/);
      }
    });

    it('phone without DDD has a readable message', () => {
      const result = contactFormSchema.safeParse({ ...BASE, phone: '987654321' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const message = result.error.issues[0].message;
        expect(message).toMatch(/DDD/);
      }
    });

    it('invalid email has a readable message', () => {
      const result = contactFormSchema.safeParse({ ...BASE, email: 'bad' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const message = result.error.issues[0].message;
        expect(message).toMatch(/e-mail/i);
      }
    });
  });
});
