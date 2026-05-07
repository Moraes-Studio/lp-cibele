import { z } from 'zod';

function convertEmptyStringToUndefined(rawValue: unknown): unknown {
  return rawValue === '' ? undefined : rawValue;
}

const optionalUrlField = z.preprocess(
  convertEmptyStringToUndefined,
  z.url().optional()
);

const optionalEmailField = z.preprocess(
  convertEmptyStringToUndefined,
  z.email().optional()
);

const optionalStringField = z.preprocess(
  convertEmptyStringToUndefined,
  z.string().optional()
);

const environmentSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_WHATSAPP_NUMBER: optionalStringField,
  NEXT_PUBLIC_INSTAGRAM_URL: optionalUrlField,
  NEXT_PUBLIC_LINKEDIN_URL: optionalUrlField,
  NEXT_PUBLIC_CRP: optionalStringField,
  NEXT_PUBLIC_EMAIL: optionalEmailField,
});

const validationResult = environmentSchema.safeParse(process.env);

if (!validationResult.success) {
  console.error('❌ Invalid environment variables:', z.flattenError(validationResult.error));
  throw new Error('Invalid environment variables');
}

export const env = validationResult.data;
