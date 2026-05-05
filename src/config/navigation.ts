export const navigation = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Contato', href: '/contato' },
] as const;

export type NavItem = (typeof navigation)[number];
