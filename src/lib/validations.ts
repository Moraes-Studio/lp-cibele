import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome com pelo menos 2 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.'),
  email: z
    .string()
    .trim()
    .email('Informe um e-mail válido.')
    .max(150, 'O e-mail deve ter no máximo 150 caracteres.'),
  phone: z
    .string()
    .trim()
    .min(8, 'Informe um telefone ou WhatsApp válido.')
    .max(20, 'O telefone deve ter no máximo 20 caracteres.'),
  message: z
    .string()
    .trim()
    .min(10, 'Escreva uma mensagem com pelo menos 10 caracteres.')
    .max(1000, 'A mensagem deve ter no máximo 1000 caracteres.'),
  company: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
