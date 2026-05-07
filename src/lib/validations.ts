import { z } from 'zod';

const PHONE_REGEX = /^[\d\s\(\)\-\+]{8,20}$/;

// Rejects strings that are pure repetition (aaaaaaa, 1111111)
function isNotRepetitive(value: string): boolean {
  return !/^(.)\1{4,}$/.test(value.replace(/\s/g, ''));
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome com pelo menos 2 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.')
    .refine(isNotRepetitive, 'Informe um nome válido.'),

  email: z
    .string()
    .trim()
    .email('Informe um e-mail válido.')
    .max(150, 'O e-mail deve ter no máximo 150 caracteres.'),

  phone: z
    .string()
    .trim()
    .min(8, 'Informe um telefone ou WhatsApp válido.')
    .max(20, 'O telefone deve ter no máximo 20 caracteres.')
    .regex(PHONE_REGEX, 'Use apenas números, espaços, hífen ou parênteses.'),

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
