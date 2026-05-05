export const services = [
  {
    id: 'psicoterapia-adultos',
    title: 'Psicoterapia para adultos',
    description:
      'Espaço de escuta e reflexão para adultos que desejam compreender melhor suas questões emocionais e pessoais.',
    icon: 'user',
  },
  {
    id: 'transicoes-vida',
    title: 'Transições de vida',
    description:
      'Apoio em momentos de mudança, tomada de decisão e reorganização pessoal ou profissional.',
    icon: 'compass',
  },
  {
    id: 'relacionamentos',
    title: 'Relacionamentos',
    description:
      'Compreensão de padrões relacionais, vínculos e dificuldades nas relações interpessoais.',
    icon: 'users',
  },
  {
    id: 'saude-emocional',
    title: 'Saúde emocional',
    description:
      'Apoio em quadros de ansiedade, depressão, estresse e outros sofrimentos emocionais.',
    icon: 'heart',
  },
] as const;

export type Service = (typeof services)[number];
