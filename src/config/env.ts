import { z } from 'zod';

const envSchema = z.object({
  // Server-side only
  RESEND_API_KEY: z.string().min(1),
  CONTACT_EMAIL_TO: z.string().email(),
  CONTACT_EMAIL_FROM: z.string().email(),

  // Public
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().optional(),
  NEXT_PUBLIC_INSTAGRAM_URL: z.string().url().optional(),
  NEXT_PUBLIC_LINKEDIN_URL: z.string().url().optional(),
  NEXT_PUBLIC_CRP: z.string().optional(),
  NEXT_PUBLIC_EMAIL: z.string().email().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.flatten());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
