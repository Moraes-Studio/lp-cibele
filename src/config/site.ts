export const siteConfig = {
  name: 'Cibele Rosa',
  role: 'Psicologia Clínica para Adultos',
  description:
    'Atendimento em psicologia clínica para adultos com foco em saúde emocional, autoconhecimento, transições de vida e fortalecimento interno.',
  crp: process.env.NEXT_PUBLIC_CRP ?? '',
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
  email: process.env.NEXT_PUBLIC_EMAIL ?? '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cibelepsicologia.com.br',
} as const;
