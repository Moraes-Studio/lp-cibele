import { z } from 'zod';

const PHONE_ALLOWED_CHARS_REGEX = /^[+\d\s()\-]+$/;
const MINIMUM_PHONE_DIGITS = 10;

function hasMinimumDigits(value: string): boolean {
  return (value.match(/\d/g) ?? []).length >= MINIMUM_PHONE_DIGITS;
}

function isNotRepetitive(value: string): boolean {
  return !/^(.)\1{4,}$/.test(value.replace(/\s/g, ''));
}

function hasFullName(value: string): boolean {
  const parts = value.trim().split(/\s+/);
  return parts.length >= 2 && parts[0].length >= 2 && parts[parts.length - 1].length >= 2;
}

function hasValidEmailDomain(value: string): boolean {
  return /\.[a-z]{2,}$/i.test(value);
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Informe seu nome com pelo menos 3 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.')
    .refine(hasFullName, 'Informe seu nome completo (nome e sobrenome).')
    .refine(isNotRepetitive, 'Informe um nome válido.'),

  email: z
    .string()
    .trim()
    .email('Informe um e-mail válido.')
    .max(150, 'O e-mail deve ter no máximo 150 caracteres.')
    .refine(hasValidEmailDomain, 'Informe um e-mail com domínio válido (ex: nome@email.com).'),

  phone: z
    .string()
    .trim()
    .min(10, 'Informe um telefone ou WhatsApp com DDD.')
    .max(20, 'O telefone deve ter no máximo 20 caracteres.')
    .regex(PHONE_ALLOWED_CHARS_REGEX, 'Use apenas números, espaços, hífen ou parênteses.')
    .refine(hasMinimumDigits, 'O telefone deve ter pelo menos 10 dígitos (com DDD).'),

  message: z
    .string()
    .trim()
    .min(10, 'Escreva uma mensagem com pelo menos 10 caracteres.')
    .max(1000, 'A mensagem deve ter no máximo 1000 caracteres.')
    .refine(isNotRepetitive, 'Escreva uma mensagem válida.'),

  // Honeypot — must be empty; bots fill it, humans don't see it
  company: z.string().max(0, '').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
