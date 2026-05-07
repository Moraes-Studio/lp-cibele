import type { ServiceIconName } from '@/components/shared/service-card';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  iconBgClass: string;
}

export const services: ServiceItem[] = [
  {
    id: 'psicoterapia-adultos',
    title: 'Psicoterapia para adultos',
    description:
      'Espaço de escuta e reflexão para adultos que desejam compreender melhor suas questões emocionais e pessoais.',
    icon: 'user',
    iconBgClass: 'bg-card-psicoterapia/40',
  },
  {
    id: 'transicoes-vida',
    title: 'Transições de vida',
    description:
      'Apoio em momentos de mudança, tomada de decisão e reorganização pessoal ou profissional.',
    icon: 'compass',
    iconBgClass: 'bg-card-transicoes/25',
  },
  {
    id: 'relacionamentos',
    title: 'Relacionamentos',
    description:
      'Compreensão de padrões relacionais, vínculos e dificuldades nas relações interpessoais.',
    icon: 'users',
    iconBgClass: 'bg-card-relacionamentos',
  },
  {
    id: 'saude-emocional',
    title: 'Saúde emocional',
    description:
      'Apoio em quadros de ansiedade, depressão, estresse e outros sofrimentos emocionais.',
    icon: 'heart',
    iconBgClass: 'bg-card-saude',
  },
];

export type Service = ServiceItem;
