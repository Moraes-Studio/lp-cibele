# lp-cibele — Site Institucional Cibele Rosa Psicologia

Projeto desenvolvido pela **Moraes Studio** para **Cibele Rosa Psicologia Clínica**.

Site institucional de captação de contato para uma psicóloga clínica, com foco em conversão via WhatsApp. Sem área do paciente, sem e-commerce.

---

## Stack

| Tecnologia | Versão | Função |
|---|---|---|
| Next.js | 16 | Framework principal (App Router) |
| React | 19 | UI |
| TypeScript | 5 (strict) | Tipagem |
| Tailwind CSS | 4 | Estilização |
| shadcn/ui | latest | Componentes base |
| React Hook Form | 7 | Gerenciamento de formulário |
| Zod | 4 | Validação de schema |
| Playwright | 1.59 | Testes E2E |
| Vitest | 4 | Testes unitários |
| Faker | 10 | Dados de teste |

---

## Estrutura de pastas

```
src/
├── app/                  # Pages (App Router)
│   ├── page.tsx          # Home (/)
│   ├── servicos/         # Serviços (/servicos)
│   ├── contato/          # Contato (/contato)
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/           # Header, Footer, MobileMenu, NavLinks
│   ├── sections/         # HeroSection, AboutSection, ContactSection, ...
│   ├── shared/           # WhatsAppButton, ServiceCard, SectionHeading, ...
│   └── ui/               # Componentes shadcn/ui
├── config/
│   ├── site.ts           # siteConfig — dados centralizados da cliente
│   ├── env.ts            # Validação de variáveis de ambiente com Zod
│   └── navigation.ts     # Links de navegação
├── constants/            # services.ts, audience.ts
├── lib/
│   ├── sanitize.ts       # Detecção e bloqueio de XSS, SQL injection, scripts
│   ├── validations.ts    # Schema Zod do formulário de contato
│   ├── contact-rate-limit.ts  # Rate limit client-side via localStorage
│   ├── logger.ts
│   └── utils.ts
└── types/
e2e/                      # Specs Playwright
src/lib/__tests__/        # Testes unitários Vitest
```

---

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz com as seguintes variáveis:

```bash
# Público
NEXT_PUBLIC_SITE_URL=https://cibelepsicologia.com.br
NEXT_PUBLIC_WHATSAPP_NUMBER=5511900000000
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/cibelerosa.psi
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/cibelerosapsicologa
NEXT_PUBLIC_CRP=CRP 06/000000
NEXT_PUBLIC_EMAIL=contato@cibelepsicologia.com.br
```

Para testes, existe o arquivo `.env.test` com valores seguros.

---

## Comandos

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Testes unitários (Vitest)
npm run test

# Testes unitários em modo watch
npm run test:watch

# Testes E2E (Playwright) — requer servidor rodando
npm run test:e2e

# Lint
npm run lint

# Typecheck
npm run typecheck
```

---

## Segurança do formulário de contato

O formulário de contato implementa múltiplas camadas de proteção:

| Camada | Implementação |
|---|---|
| Validação de schema | Zod com limites rigorosos de tamanho, formato e conteúdo |
| Sanitização de input | Bloqueio de XSS, SQL injection, `javascript:`, event handlers, null bytes |
| Honeypot anti-bot | Campo `company` invisível — preenchido por bots, ignorado por humanos |
| Rate limit | localStorage — 3 minutos de cooldown por dispositivo |
| Encoding da URL | `encodeURIComponent` em todo conteúdo antes de montar a URL do WhatsApp |

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Home — Hero, Sobre, Serviços preview, Processo, Público, CTA |
| `/servicos` | Página de Serviços detalhada |
| `/contato` | Formulário de contato + links diretos |

---

## Acessibilidade

- WCAG 2.1 AA verificado via axe-core nos testes E2E
- Skip link presente em todas as páginas
- Landmarks semânticos: `header`, `main`, `footer`, `nav`
- `aria-label` em todos os elementos interativos
- `prefers-reduced-motion` respeitado nas animações

---

## Status do projeto

| Task | Descrição | Status |
|---|---|---|
| TASK-001 | Setup — Next.js, Tailwind 4, shadcn/ui, estrutura base | ✅ Concluída |
| TASK-002 | Layout global — Header, Footer, navegação | ✅ Concluída |
| TASK-003 | Páginas Home e Serviços | ✅ Concluída |
| TASK-004 | Performance e acessibilidade — LCP, WebP, WCAG AA | ✅ Concluída |
| TASK-005 | Formulário de contato + segurança + testes | ✅ Concluída |
| TASK-006 | Deploy — Vercel, domínio, variáveis de produção | 📋 Pendente |

---

## Cliente

**Cibele Rosa Psicologia Clínica**
Atendimento em psicologia clínica para adultos.

---

## Desenvolvido por

**Moraes Studio**
