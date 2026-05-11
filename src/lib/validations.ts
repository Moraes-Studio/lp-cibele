import { z } from 'zod';

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

/**
 * Valida número de telefone brasileiro.
 * Aceita: 10-11 dígitos (local) ou 12-13 dígitos (com código do país 55).
 * Rejeita sequências longas como 555119999999999 (15 dígitos).
 */
export function isBrazilianPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');

  // Com código do país (55): 12 dígitos (fixo) ou 13 (celular)
  if (digits.length >= 12) {
    if (!digits.startsWith('55')) return false;
    if (digits.length > 13) return false;
  }

  // Número local: 10 (fixo com DDD) ou 11 (celular com DDD)
  const local = digits.startsWith('55') && digits.length >= 12
    ? digits.slice(2)
    : digits;

  if (local.length !== 10 && local.length !== 11) return false;

  // DDD: 11–99
  const ddd = Number(local.slice(0, 2));
  if (ddd < 11 || ddd > 99) return false;

  // Celular (11 dígitos): terceiro dígito deve ser 9
  if (local.length === 11 && local[2] !== '9') return false;

  return true;
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Informe seu nome para continuarmos.')
    .max(100, 'Nome muito longo — pode abreviar?')
    .refine(hasFullName, 'Pode incluir seu sobrenome também?')
    .refine(isNotRepetitive, 'Parece que o nome não está correto.'),

  email: z
    .string()
    .trim()
    .email('Digite um e-mail válido para contato.')
    .max(150, 'O e-mail parece muito longo.')
    .refine(hasValidEmailDomain, 'O e-mail parece incompleto. Ex: nome@email.com.'),

  phone: z
    .string()
    .trim()
    .min(1, 'Informe seu WhatsApp ou telefone com DDD.')
    .refine(isBrazilianPhone, 'Digite um número com DDD. Ex: (11) 99999-9999.'),

  message: z
    .string()
    .trim()
    .min(10, 'Conte um pouco mais sobre o que está buscando.')
    .max(1000, 'Mensagem um pouco longa — tente resumir.')
    .refine(isNotRepetitive, 'Escreva uma mensagem para continuarmos.'),

  // Honeypot — must be empty; bots fill it, humans don't see it
  company: z.string().max(0, '').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
