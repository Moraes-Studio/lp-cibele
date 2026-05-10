import type { ServiceIconName } from '@/components/shared/service-card';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  iconBgClass: string;
  paragraphs?: [string, string];
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  decorativeVariant?: 'rose' | 'sage';
  sectionBg?: 'white' | 'ivory';
}

export const services: ServiceItem[] = [
  {
    id: 'psicoterapia-adultos',
    title: 'Psicoterapia para Adultos',
    description:
      'Espaço de escuta e reflexão para adultos que desejam compreender melhor suas questões emocionais e pessoais.',
    icon: 'user',
    iconBgClass: 'bg-card-psicoterapia/35',
    paragraphs: [
      'A psicoterapia é um espaço de escuta, acolhimento e desenvolvimento emocional, construído com respeito à individualidade, à história e ao momento de vida de cada pessoa. Cada processo terapêutico acontece de forma única, considerando as experiências, necessidades e objetivos de quem busca acompanhamento psicológico.',
      'Ao longo do processo, é possível compreender melhor pensamentos, emoções e comportamentos, favorecendo maior autoconhecimento, equilíbrio emocional e formas mais saudáveis de lidar com os desafios da vida cotidiana. O acompanhamento terapêutico também pode contribuir para o fortalecimento emocional, qualidade de vida e construção de relações mais conscientes consigo e com os outros.',
    ],
    imageSrc: '/servico-ilustracao/psicoterapia-para-adultos.webp',
    imageAlt: 'Ilustração representando escuta e acolhimento terapêutico',
    imagePosition: 'left',
    sectionBg: 'white',
  },
  {
    id: 'transicoes-vida',
    title: 'Transições de Vida',
    description:
      'Apoio em momentos de mudança, tomada de decisão e reorganização pessoal ou profissional.',
    icon: 'compass',
    iconBgClass: 'bg-card-transicoes/35',
    paragraphs: [
      'Mudanças fazem parte da vida, mas nem sempre são vividas de maneira simples. Transições como mudanças profissionais, aposentadoria, maternidade, perdas, separações ou novos ciclos podem despertar inseguranças, dúvidas, ansiedade e sobrecarga emocional.',
      'A psicoterapia oferece um espaço seguro para acolher e elaborar essas experiências com mais clareza e equilíbrio emocional. O acompanhamento psicológico auxilia no fortalecimento interno diante das transformações, favorecendo maior compreensão sobre sentimentos, adaptação às mudanças e construção de novos caminhos com mais segurança e confiança.',
    ],
    imageSrc: '/servico-ilustracao/transicao.webp',
    imageAlt: 'Ilustração representando transições e novos caminhos de vida',
    imagePosition: 'right',
    sectionBg: 'ivory',
  },
  {
    id: 'relacionamentos',
    title: 'Relacionamentos',
    description:
      'Compreensão de padrões relacionais, vínculos e dificuldades nas relações interpessoais.',
    icon: 'users',
    iconBgClass: 'bg-card-relacionamentos/35',
    paragraphs: [
      'Os relacionamentos exercem grande influência sobre a saúde emocional e o bem-estar psicológico. Questões afetivas, familiares, sociais ou profissionais podem gerar conflitos, dificuldades de comunicação, sofrimento emocional e padrões relacionais que impactam diferentes áreas da vida.',
      'O processo terapêutico proporciona um espaço de escuta e reflexão sobre vínculos, emoções e formas de se relacionar consigo e com os outros. A psicoterapia auxilia na compreensão de padrões emocionais, fortalecimento da autoestima e construção de relações mais saudáveis, respeitosas e equilibradas.',
    ],
    imageSrc: '/servico-ilustracao/relacionamento.webp',
    imageAlt: 'Ilustração representando vínculos e relacionamentos saudáveis',
    imagePosition: 'left',
    sectionBg: 'white',
  },
  {
    id: 'saude-emocional',
    title: 'Saúde Emocional',
    description:
      'Apoio em quadros de ansiedade, depressão, estresse e outros sofrimentos emocionais.',
    icon: 'heart',
    iconBgClass: 'bg-card-saude/35',
    paragraphs: [
      'Cuidar da saúde emocional é essencial para viver com mais equilíbrio, qualidade de vida e bem-estar. Situações de ansiedade, estresse, tristeza persistente, sobrecarga emocional ou dificuldades no enfrentamento das demandas cotidianas podem impactar a rotina, os relacionamentos e a forma como a pessoa se percebe.',
      'A psicoterapia oferece acolhimento e suporte emocional para compreender essas experiências de maneira mais saudável e consciente. O acompanhamento psicológico contribui para o desenvolvimento do autoconhecimento, fortalecimento emocional e construção de recursos internos para lidar com os desafios da vida de forma mais leve e equilibrada.',
    ],
    imageSrc: '/servico-ilustracao/saude-emocional.webp',
    imageAlt: 'Ilustração representando equilíbrio e saúde emocional',
    imagePosition: 'right',
    decorativeVariant: 'sage',
    sectionBg: 'ivory',
  },
];

export type Service = ServiceItem;
