# SDD Técnico — Site Cibele Rosa Psicologia Clínica

## 1. Identificação do projeto

**Nome do projeto:** Site institucional Cibele Rosa Psicologia Clínica
**Tipo:** Site institucional responsivo
**Objetivo principal:** Captação de contato para primeira conversa terapêutica
**Stack principal:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
**Deploy sugerido:** Vercel
**Data:** 05/05/2026
**Versão:** 2.1

---

## 2. Objetivo do documento

Este documento define o desenho técnico do site da **Cibele Rosa — Psicologia Clínica para Adultos**.

Ele deve servir como guia para desenvolvimento manual ou assistido por IA, contendo padrões de arquitetura, organização de código, componentes, acessibilidade, segurança, validação, SEO e critérios de qualidade.

A IA ou desenvolvedor que utilizar este documento deve seguir as decisões técnicas aqui descritas, evitando criar estruturas desnecessárias ou fugir do escopo do projeto.

---

## 3. Resumo do produto

O site será uma aplicação web institucional com foco em apresentar a profissional, seus serviços e facilitar o contato com potenciais pacientes.

O objetivo não é vender produto, realizar pagamento ou criar uma loja online. O objetivo correto é **conversão para contato**, principalmente por WhatsApp e formulário.

---

## 4. Escopo funcional

### 4.1 Páginas obrigatórias

```txt
/
/servicos
/contato
```

### 4.2 Funcionalidades obrigatórias

* Página Home com apresentação da profissional.
* Página Serviços com descrição das principais demandas atendidas.
* Página Contato com formulário e botão de WhatsApp.
* Header responsivo.
* Footer com dados profissionais.
* Botão flutuante de WhatsApp.
* Links para redes sociais.
* Formulário validado client-side e server-side.
* SEO básico por página.
* Acessibilidade robusta (WCAG 2.1 AA).
* Layout responsivo mobile-first.

### 4.3 Fora do escopo inicial

* Loja online.
* Checkout.
* Pagamento.
* Login.
* Área do paciente.
* Blog.
* CMS.
* Agenda integrada.
* Prontuário.
* Banco de dados próprio.

---

## 5. Stack técnica definida

### 5.1 Core

* **Next.js 15+** com App Router.
* **React 19+**.
* **TypeScript 5+** com strict mode.
* **Tailwind CSS 4+**.
* **shadcn/ui** (componentes acessíveis).

### 5.2 Formulários e validação

* **React Hook Form** para controle do formulário.
* **Zod** para schemas de validação.

### 5.3 UI e ícones

* **shadcn/ui** para componentes acessíveis.
* **Lucide React** para ícones.

### 5.4 Email

* **Resend** para envio de emails (obrigatório).

### 5.5 Qualidade de código

* ESLint.
* Prettier.
* TypeScript strict mode.
* Organização por feature/componentes.

### 5.6 Deploy

* Vercel (obrigatório).

---

## 6. Princípios arquiteturais

O projeto deve seguir os seguintes princípios:

* Simplicidade antes de complexidade.
* Componentes pequenos e reutilizáveis.
* Separação clara entre layout, seções, componentes de UI e regras de validação.
* Código tipado.
* Nenhum dado sensível hardcoded, exceto placeholders temporários durante desenvolvimento.
* Acessibilidade desde a primeira implementação.
* SEO configurado por página.
* Baixa dependência externa.
* Evitar overengineering.

---

## 7. Estrutura de pastas padrão

A estrutura recomendada é:

```txt
src/
  app/
    layout.tsx
    page.tsx
    globals.css

    api/
      contact/
        route.ts

    servicos/
      page.tsx

    contato/
      page.tsx

  components/
    layout/
      header.tsx
      footer.tsx
      mobile-menu.tsx

    sections/
      hero-section.tsx
      about-section.tsx
      audience-section.tsx
      services-preview-section.tsx
      process-section.tsx
      contact-section.tsx
      cta-section.tsx

    shared/
      whatsapp-button.tsx
      section-heading.tsx
      skip-link.tsx
      page-container.tsx

    ui/
      button.tsx
      card.tsx
      input.tsx
      textarea.tsx
      label.tsx
      form.tsx
      sheet.tsx

  config/
    site.ts
    navigation.ts
    env.ts

  constants/
    services.ts
    audience.ts

  lib/
    utils.ts
    validations.ts
    logger.ts
    rate-limit.ts

  types/
    contact.ts

public/
  logo-horizontal.svg
  logo-circular.svg
  logo-simbolo.svg
  favicon.ico
  icon.png
  apple-icon.png
  og-image.png
```

---

## 8. Padrão de responsabilidade por pasta

### 8.1 `app/`

Responsável por rotas, layouts e metadados.

Regras:

* Cada rota deve ter seu próprio `page.tsx`.
* Metadados devem ser definidos por página quando necessário.
* O `layout.tsx` deve conter estrutura global, fonte, skip link, header, main e footer.
* Não colocar regras complexas dentro de páginas.

### 8.2 `app/api/`

Rotas de API do Next.js.

Regras:

* Usar apenas para endpoints server-side.
* Validar dados com Zod.
* Aplicar rate limiting.
* Nunca expor detalhes técnicos ao client.

### 8.3 `components/layout/`

Componentes estruturais globais.

Exemplos:

* Header.
* Footer.
* Menu mobile.

### 8.4 `components/sections/`

Seções específicas de páginas.

Exemplos:

* Hero da Home.
* Seção sobre.
* Seção de serviços.
* Seção de contato.

### 8.5 `components/shared/`

Componentes reutilizáveis do projeto.

Exemplos:

* Botão de WhatsApp.
* Título de seção.
* Container padrão.
* Skip link.

### 8.6 `components/ui/`

Componentes gerados ou adaptados do shadcn/ui.

Regra:

* Não misturar lógica de negócio em componentes `ui`.
* Componentes `ui` devem ser genéricos.

### 8.7 `config/`

Configurações estáticas do site.

Exemplos:

* Nome do site.
* Descrição.
* Links.
* WhatsApp.
* E-mail.
* Redes sociais.
* Variáveis de ambiente validadas.

### 8.8 `constants/`

Listas de conteúdo reutilizáveis.

Exemplos:

* Serviços.
* Público-alvo.
* Diferenciais.

### 8.9 `lib/`

Funções utilitárias e validações.

Exemplos:

* `cn` para composição de classes.
* Schemas Zod.
* Logger centralizado.
* Rate limiting.
* Analytics.

### 8.10 `types/`

Tipos TypeScript compartilhados.

---

## 9. Padrões de código

### 9.1 TypeScript

Regras obrigatórias:

* Usar TypeScript em todos os arquivos React.
* Evitar `any`.
* Preferir `type` para tipos simples.
* Preferir `interface` apenas quando houver extensão clara.
* Tipar props explicitamente.
* Usar `readonly` em arrays constantes quando fizer sentido.

Exemplo:

```ts
type ServiceCardProps = {
  title: string;
  description: string;
};
```

### 9.2 Componentes React

Regras:

* Um componente por arquivo.
* Nome de arquivo em kebab-case.
* Nome do componente em PascalCase.
* Componentes devem ser pequenos e focados.
* Evitar lógica pesada dentro do JSX.
* Evitar props genéricas demais.
* Não criar abstrações antes da necessidade.

Exemplo:

```txt
service-card.tsx -> ServiceCard
hero-section.tsx -> HeroSection
```

### 9.3 Server Components e Client Components

Padrão:

* Usar Server Components por padrão.
* Usar Client Components somente quando necessário.

Client Components devem ser usados para:

* Formulário com React Hook Form.
* Menu mobile interativo.
* Componentes com estado.

Todo arquivo Client Component deve conter:

```ts
'use client';
```

### 9.4 Imports

Ordem sugerida:

1. Imports externos.
2. Imports de componentes.
3. Imports de configurações/constants.
4. Imports de utils/types.

Evitar imports relativos longos quando alias estiver configurado.

Preferir:

```ts
import { Button } from '@/components/ui/button';
```

Evitar:

```ts
import { Button } from '../../../components/ui/button';
```

---

## 10. Padrão visual com Tailwind

### 10.1 Regras gerais

* Usar Tailwind CSS como padrão de estilização.
* Evitar CSS customizado desnecessário.
* Usar classes consistentes para espaçamento.
* Manter layout limpo e respirável.
* Evitar animações exageradas.
* Não depender apenas de cor para indicar estado.

### 10.2 Container padrão

Criar componente `PageContainer` ou usar padrão:

```tsx
<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
  {children}
</div>
```

### 10.3 Espaçamento de seções

Padrão recomendado:

```txt
py-16 md:py-24
```

### 10.4 Títulos

Padrão sugerido:

```txt
text-3xl font-semibold tracking-tight md:text-5xl
```

### 10.5 Texto comum

Padrão sugerido:

```txt
text-base leading-7 text-muted-foreground md:text-lg
```

### 10.6 Botões

* Botões devem ter altura confortável.
* Área clicável adequada (mínimo 44px x 44px).
* Texto claro.
* Estado de foco visível.

---

## 11. shadcn/ui

### 11.1 Componentes iniciais necessários

Instalar inicialmente:

```txt
button
card
input
textarea
label
form
sheet
```

### 11.2 Uso esperado

* `Button`: CTAs e ações.
* `Card`: blocos de serviços e público-alvo.
* `Input`: campos de texto.
* `Textarea`: mensagem.
* `Label`: label acessível para campos.
* `Form`: integração com React Hook Form.
* `Sheet`: menu mobile.

### 11.3 Regras

* Não alterar componentes base sem necessidade.
* Customizações devem ser feitas via props/className.
* Manter acessibilidade original dos componentes.

---

## 12. Direção visual e identidade da marca

A identidade visual do site deve seguir a arte de referência apresentada para a marca **Cibele Psicologia**.

A linguagem visual deve ser:

* Minimalista.
* Orgânica.
* Acolhedora.
* Profissional.
* Leve.
* Sóbria.
* Humanizada.
* Associada a cuidado emocional, equilíbrio e bem-estar.

### 12.1 Logo e marca

A marca possui uma estética delicada, com símbolo de rosto humano em linha fina integrado a elementos naturais/folhas.

#### Uso principal

* Logo horizontal no Header.
* Símbolo isolado no favicon.
* Versão circular em áreas institucionais ou rodapé.

#### Regras de aplicação

* Manter respiro ao redor da logo.
* Não distorcer proporção.
* Não aplicar sobre fundos com baixo contraste.
* Preferir fundo claro/off-white.
* Usar versão reduzida em mobile, se necessário.

#### Variações previstas

```txt
logo-horizontal.svg
logo-circular.svg
logo-simbolo.svg
favicon.ico
```

### 12.2 Paleta de cores

A paleta deve ser baseada nos tons da referência visual.

#### Cores principais

```txt
Verde escuro: #2F4A3F
Verde médio:  #6D846F
Verde claro:  #A7B89A
Bege claro:   #F2E8DA
Off-white:    #FAF7F2
```

#### Sensações desejadas

```txt
Acolhimento
Equilíbrio
Confiança
Leveza
Bem-estar
```

#### Uso recomendado

* `#FAF7F2`: fundo principal do site.
* `#F2E8DA`: blocos suaves, cards especiais e fundos decorativos.
* `#2F4A3F`: títulos, botões principais, ícones importantes e footer escuro.
* `#6D846F`: textos de apoio, bordas ativas e elementos secundários.
* `#A7B89A`: detalhes, badges, ilustrações e estados suaves.

#### Cuidados de acessibilidade

* Não usar verde claro com texto branco.
* Para texto principal, preferir `#2F4A3F` ou grafite escuro.
* Garantir contraste em botões.
* Cards claros devem ter borda ou sombra muito sutil.

### 12.3 Tokens sugeridos para Tailwind

O tema do Tailwind/shadcn deve ser adaptado para refletir a identidade da marca.

Sugestão inicial de tokens:

```ts
const colors = {
  brand: {
    forest: '#2F4A3F',
    sage: '#6D846F',
    leaf: '#A7B89A',
    sand: '#F2E8DA',
    ivory: '#FAF7F2',
  },
};
```

No shadcn/ui, mapear preferencialmente:

```txt
background -> #FAF7F2
foreground -> #2F4A3F
primary -> #2F4A3F
primary-foreground -> #FAF7F2
secondary -> #F2E8DA
secondary-foreground -> #2F4A3F
muted -> #F2E8DA
muted-foreground -> #6D846F
border -> rgba(47, 74, 63, 0.16)
ring -> #6D846F
```

### 12.4 Tipografia

A referência visual usa uma combinação elegante:

* **Playfair Display** para títulos.
* **Inter** para textos, botões, formulários e informações.

#### Regras

* Títulos principais devem usar Playfair Display.
* Textos longos devem usar Inter.
* Não usar muitas variações de peso.
* Priorizar legibilidade.
* Evitar textos longos em fonte serifada.

#### Configuração sugerida com Next Font

```ts
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});
```

Uso sugerido:

```txt
font-serif -> Playfair Display
font-sans -> Inter
```

### 12.5 Ícones e ilustrações

A referência visual possui ícones lineares, delicados e circulares para cards.

#### Ícones de serviços sugeridos

* Ansiedade.
* Depressão.
* TOC.
* Relacionamentos.
* Autoestima.
* Luto.
* Estresse.
* Terapia online.

#### Ícones de benefícios/diferenciais

* Acolhimento e empatia.
* Sigilo e ética profissional.
* Abordagem personalizada.
* Crescimento e equilíbrio.
* Atendimento humanizado.
* Terapia online com segurança.

#### Regras para ícones

* Usar traço fino.
* Manter estilo consistente.
* Preferir ícones em verde escuro.
* Usar fundo circular bege claro quando aplicado em cards.
* Não misturar estilos 3D, coloridos ou muito comerciais.

### 12.6 Hero visual

A Home deve ter uma seção hero com composição leve e acolhedora.

#### Direção da ilustração

* Mulher em linha fina.
* Elementos naturais e folhas.
* Formas orgânicas suaves ao fundo.
* Tons verdes e bege.
* Pouco ruído visual.

#### Texto base do Hero

```txt
Cuidar da mente é transformar sua vida por inteiro.
```

Texto de apoio:

```txt
A psicoterapia é um caminho de autoconhecimento, equilíbrio e escolhas mais conscientes.
```

CTA principal:

```txt
Agendar conversa
```

### 12.7 Componentes UI com base na arte

#### Botão primário

Visual:

* Fundo verde escuro.
* Texto off-white.
* Cantos arredondados.
* Ícone de seta opcional.
* Hover com verde médio.

Classe base sugerida:

```txt
bg-[#2F4A3F] text-[#FAF7F2] hover:bg-[#243B32]
```

#### Botão secundário

Visual:

* Fundo transparente ou off-white.
* Borda verde suave.
* Texto verde escuro.

Classe base sugerida:

```txt
border border-[#2F4A3F]/20 text-[#2F4A3F] hover:bg-[#F2E8DA]
```

#### Cards

Visual:

* Fundo claro.
* Borda suave.
* Sombra discreta.
* Cantos arredondados.
* Bastante respiro interno.

Classe base sugerida:

```txt
rounded-2xl border border-[#2F4A3F]/10 bg-white/70 shadow-sm
```

#### Inputs

Visual:

* Fundo claro.
* Borda suave.
* Foco bem visível.
* Label sempre aparente.

### 12.8 Elementos decorativos

Podem ser usados com moderação:

* Folhas lineares.
* Círculos orgânicos.
* Linhas curvas suaves.
* Pequenos pontos decorativos.
* Texturas leves em bege.

Regras:

* Elementos decorativos não podem prejudicar leitura.
* Não devem ser essenciais para compreensão.
* Devem ter `aria-hidden="true"` quando forem puramente visuais.
* Devem respeitar contraste e não poluir o layout.

### 12.9 Tom de voz da marca

A referência define o tom como:

```txt
Acolhedor, empático e respeitoso.
Linguagem leve, humana e acessível.
Foco no cuidado, no vínculo e no bem-estar emocional.
```

#### Responsabilidade da marca

A marca deve transmitir:

* Acolhimento.
* Confiança.
* Sensibilidade.
* Modernidade.
* Ética.

#### Regras de escrita

Evitar:

```txt
Promessas de cura.
Pressão para agendar.
Linguagem alarmista.
Excesso de termos técnicos.
Frases comerciais agressivas.
```

Preferir:

```txt
Agende uma primeira conversa.
Entre em contato para entender se este atendimento faz sentido para você.
Um espaço de escuta, cuidado e reflexão.
```

### 12.10 Aplicação visual por seção

#### Header

* Fundo off-white com leve transparência.
* Logo horizontal à esquerda.
* Menu em verde escuro.
* CTA primário discreto.

#### Home / Hero

* Fundo off-white.
* Texto à esquerda.
* Ilustração à direita.
* Formas orgânicas suaves.

#### Cards de serviços

* Ícones circulares em bege.
* Título curto.
* Texto objetivo.
* Grid responsivo.

#### CTA final

* Fundo verde escuro.
* Texto claro.
* Imagem/decorativo vegetal sutil.
* Botão claro ou bege.

#### Footer

* Fundo verde escuro.
* Texto off-white.
* Logo clara ou versão monocromática.
* CRP, contato e redes sociais.

---

## 13. Configuração central do site

Criar arquivo:

```txt
src/config/site.ts
```

Conteúdo sugerido:

```ts
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
```

Regra:

* Dados de contato devem ficar centralizados nesse arquivo.
* Não espalhar telefone, e-mail e redes sociais pelo código.
* Variáveis de ambiente devem ser lidas aqui e apenas aqui.

---

## 14. Conteúdos estáticos

### 14.1 Serviços

Arquivo:

```txt
src/constants/services.ts
```

Exemplo:

```ts
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

export type Service = typeof services[number];
```

### 14.2 Público-alvo

Arquivo:

```txt
src/constants/audience.ts
```

Exemplo:

```ts
export const audienceItems = [
  'Adultos em sofrimento emocional.',
  'Pessoas em momentos de transição.',
  'Profissionais sob alta exigência emocional.',
  'Pessoas em busca de autoconhecimento.',
  'Indivíduos em processo de tomada de decisão.',
  'Pessoas que buscam compreender padrões relacionais.',
] as const;

export type AudienceItem = typeof audienceItems[number];
```

---

## 15. Formulário de contato

O formulário de contato será implementado de forma robusta, segura e acessível.

### 15.1 Decisão técnica obrigatória

O envio do formulário será feito usando **API Route do Next.js**.

Rota prevista:

```txt
POST /api/contact
```

Fluxo obrigatório:

```txt
Usuário preenche formulário
  ↓
Client valida com React Hook Form + Zod
  ↓
Botão entra em estado loading e bloqueia novo envio
  ↓
Requisição POST /api/contact
  ↓
Server valida novamente com Zod
  ↓
Server aplica proteção anti-spam/rate limit
  ↓
Server envia e-mail via Resend
  ↓
Usuário recebe feedback genérico e acolhedor
```

### 15.2 Campos

* Nome (obrigatório).
* E-mail (obrigatório).
* WhatsApp (obrigatório).
* Mensagem (obrigatória).
* Company (honeypot - oculto).

### 15.3 Schema Zod

Arquivo:

```txt
src/lib/validations.ts
```

Schema obrigatório:

```ts
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
```

Observação:

* O campo `company` será usado como honeypot anti-spam.
* Esse campo não deve aparecer visualmente para usuários reais.

### 15.4 UX do formulário para público sensível

O formulário deve considerar que parte do público pode estar ansioso, vulnerável ou com dificuldade de concentração.

Regras obrigatórias:

* Mensagens de erro claras, curtas e respeitosas.
* Não culpar o usuário pelo erro.
* Labels sempre visíveis.
* Não usar apenas placeholder como label.
* Campos obrigatórios indicados de forma clara.
* Botão com estado de envio.
* Botão desabilitado durante envio.
* Campos desabilitados durante envio para evitar múltiplos cliques.
* Feedback de sucesso ou erro.
* Não apagar os dados se ocorrer erro de envio.
* Mensagem de sucesso calma e objetiva.

Textos de estado:

```txt
Estado normal: Enviar mensagem
Estado loading: Enviando mensagem...
Estado enviado: Mensagem enviada
```

Mensagem de sucesso:

```txt
Sua mensagem foi enviada com sucesso. Em breve entraremos em contato.
```

Mensagem de erro para usuário:

```txt
Não foi possível enviar sua mensagem agora. Tente novamente em alguns minutos ou fale pelo WhatsApp.
```

### 15.5 Prevenção contra múltiplos envios

Para evitar cliques repetidos:

* Usar `isSubmitting` do React Hook Form.
* Desabilitar botão após o primeiro clique.
* Exibir loading claro.
* Bloquear novo envio até resposta da API.
* Após sucesso, manter botão desabilitado ou limpar formulário e mostrar mensagem clara.
* No server, aplicar proteção contra múltiplas requisições em curto período.

### 15.6 Segurança do formulário

Obrigatório:

* Validação client-side com Zod.
* Validação server-side com Zod.
* Honeypot anti-spam.
* Rate limit no endpoint `/api/contact`.
* Sanitização básica dos campos antes do envio do e-mail.
* Não salvar dados em banco na primeira versão.
* Não solicitar dados clínicos sensíveis.
* Não expor detalhes técnicos em resposta para o usuário.

### 15.7 Serviço de envio de e-mail

Serviço obrigatório:

```txt
Resend
```

Variáveis de ambiente esperadas:

```txt
RESEND_API_KEY=
CONTACT_EMAIL_TO=
CONTACT_EMAIL_FROM=
```

Regra:

* Nenhuma chave deve estar no front-end.
* Nenhuma variável sensível deve usar prefixo `NEXT_PUBLIC_`.

---

## 16. Implementação da API Route de contato

### 16.1 Localização

```txt
src/app/api/contact/route.ts
```

### 16.2 Estrutura obrigatória

```ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
    const identifier = request.ip ?? 'anonymous';
    const { success } = await rateLimit(identifier);

    if (!success) {
      logger.warn('contact_form_rate_limited', { identifier });
      return NextResponse.json(
        { error: 'Muitas tentativas. Aguarde alguns minutos.' },
        { status: 429 }
      );
    }

    // 2. Parse body
    const body = await request.json();

    // 3. Honeypot check
    if (body.company) {
      logger.warn('contact_form_honeypot_triggered', { company: body.company });
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 4. Validate with Zod
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      logger.info('contact_form_validation_failed', {
        errors: validationResult.error.flatten()
      });
      return NextResponse.json(
        { error: 'Dados inválidos. Verifique os campos.' },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 5. Send email via Resend
    const emailResult = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM!,
      to: process.env.CONTACT_EMAIL_TO!,
      subject: `Novo contato de ${data.name}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <p><strong>WhatsApp:</strong> ${data.phone}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (emailResult.error) {
      logger.error('contact_form_email_send_failed', {
        error: emailResult.error
      });
      return NextResponse.json(
        { error: 'Erro ao enviar mensagem. Tente novamente.' },
        { status: 500 }
      );
    }

    logger.info('contact_form_submit_success', {
      name: data.name,
      emailId: emailResult.data?.id,
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    logger.error('contact_form_unexpected_error', { error });
    return NextResponse.json(
      { error: 'Erro inesperado. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
```

### 16.3 Rate Limiting

Arquivo:

```txt
src/lib/rate-limit.ts
```

Implementação sugerida:

```ts
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<{ success: boolean }>((resolve) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1]);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        resolve({ success: !isRateLimited });
      }),
  };
}

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minuto
  uniqueTokenPerInterval: 500,
});

export async function rateLimit(identifier: string) {
  return limiter.check(3, identifier); // 3 requisições por minuto
}
```

---

## 17. Segurança

### 17.1 Regras gerais

* Não armazenar dados sensíveis sem necessidade.
* Não coletar informações clínicas detalhadas no formulário.
* Não solicitar diagnóstico, CPF, endereço ou dados médicos pelo site.
* Não expor variáveis sensíveis no client.
* Usar HTTPS em produção.
* Evitar dependências desnecessárias.
* Manter pacotes atualizados.
* Validar toda entrada do usuário no client e no server.
* Nunca confiar apenas na validação do navegador.

### 17.2 Variáveis de ambiente

Usar `.env.local` para dados sensíveis.

Variáveis esperadas:

```txt
# Resend (server-side only)
RESEND_API_KEY=
CONTACT_EMAIL_TO=contato@cibelepsicologia.com.br
CONTACT_EMAIL_FROM=noreply@cibelepsicologia.com.br

# Public (client-side)
NEXT_PUBLIC_SITE_URL=https://cibelepsicologia.com.br
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/cibelerosa.psi
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_CRP=CRP 06/123456
NEXT_PUBLIC_EMAIL=contato@cibelepsicologia.com.br
```

Regras:

* Variáveis com prefixo `NEXT_PUBLIC_` ficam públicas no navegador.
* Nunca colocar API keys privadas com `NEXT_PUBLIC_`.
* `RESEND_API_KEY` deve existir apenas no server.
* WhatsApp, Instagram e LinkedIn podem vir de env pública.
* Dados sensíveis devem ser lidos apenas em server-side code.

### 17.3 Configuração segura de ambiente

Criar módulo central para leitura e validação de variáveis.

Arquivo obrigatório:

```txt
src/config/env.ts
```

Implementação:

```ts
import { z } from 'zod';

// z.preprocess trata strings vazias (LINKEDIN_URL=) como undefined
const optionalUrl = z.preprocess(
  (v) => (v === '' ? undefined : v),
  z.string().url().optional()
);

const optionalEmail = z.preprocess(
  (v) => (v === '' ? undefined : v),
  z.string().email().optional()
);

const optionalStr = z.preprocess(
  (v) => (v === '' ? undefined : v),
  z.string().optional()
);

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_EMAIL_TO: z.string().email(),
  CONTACT_EMAIL_FROM: z.string().email(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_WHATSAPP_NUMBER: optionalStr,
  NEXT_PUBLIC_INSTAGRAM_URL: optionalUrl,
  NEXT_PUBLIC_LINKEDIN_URL: optionalUrl,
  NEXT_PUBLIC_CRP: optionalStr,
  NEXT_PUBLIC_EMAIL: optionalEmail,
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten());
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
```

Regras:

* Evitar acessar `process.env` espalhado pelo projeto.
* Centralizar leitura de variáveis em `env.ts`.
* Validar variáveis obrigatórias com Zod.
* Falhar de forma controlada em desenvolvimento se env obrigatória estiver ausente.
* Em produção, evitar expor detalhes técnicos.

### 17.4 Logs e tratamento de erros

O sistema deve possuir padrão claro de erro.

Para o usuário:

* Sempre exibir mensagens genéricas, seguras e acolhedoras.
* Nunca exibir stack trace.
* Nunca exibir nome de serviço externo.
* Nunca exibir detalhes internos do erro.

Mensagem padrão para usuário:

```txt
Não foi possível concluir esta ação agora. Tente novamente em alguns minutos.
```

Para o sistema:

* Criar função central de log.
* Logs devem registrar contexto técnico suficiente para depuração.
* Logs não devem registrar dados clínicos sensíveis.
* Logs não devem registrar secrets, tokens ou API keys.

Arquivo obrigatório:

```txt
src/lib/logger.ts
```

Implementação:

```ts
type LogLevel = 'info' | 'warn' | 'error';

type LogPayload = {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: unknown;
};

function log(payload: LogPayload) {
  const timestamp = new Date().toISOString();
  const { level, message, context, error } = payload;

  const logData = {
    timestamp,
    level,
    message,
    ...(context && { context }),
    ...(error && { error: String(error) }),
  };

  if (level === 'error') {
    console.error(JSON.stringify(logData));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(logData));
  } else {
    console.log(JSON.stringify(logData));
  }
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) =>
    log({ level: 'info', message, context }),

  warn: (message: string, context?: Record<string, unknown>) =>
    log({ level: 'warn', message, context }),

  error: (message: string, context?: Record<string, unknown>, error?: unknown) =>
    log({ level: 'error', message, context, error }),
};
```

Eventos sugeridos:

```txt
contact_form_validation_failed
contact_form_rate_limited
contact_form_honeypot_triggered
contact_form_email_send_failed
contact_form_submit_success
contact_form_unexpected_error
```

### 17.5 Formulário e privacidade

O formulário deve coletar apenas dados necessários para contato:

* Nome.
* E-mail.
* WhatsApp.
* Mensagem.

Texto obrigatório próximo ao formulário:

```txt
Evite compartilhar informações sensíveis ou detalhes clínicos neste formulário. Use este canal apenas para solicitar contato ou tirar dúvidas iniciais.
```

### 17.6 LGPD

O site deve possuir política de privacidade simples explicando:

* Quais dados são coletados.
* Para qual finalidade.
* Como o contato será realizado.
* Que os dados não serão vendidos.
* Como solicitar remoção dos dados.

---

## 18. Acessibilidade, neurodiversidade e cuidado emocional

A acessibilidade é requisito obrigatório e deve ser tratada como parte central da experiência do site.

Como o site é voltado à psicologia clínica para adultos, o design deve acolher diferentes públicos, incluindo pessoas com dislexia, autismo, TDAH, ansiedade, depressão, baixa visão, idosos, pessoas em sofrimento emocional e pessoas com sobrecarga cognitiva.

O objetivo é que o site seja calmo, claro, previsível e seguro para navegação.

### 18.1 Regras gerais obrigatórias

* Usar HTML semântico.
* Ter um único `h1` por página.
* Manter ordem correta de headings.
* Usar `main`, `header`, `footer`, `nav` e `section` corretamente.
* Usar skip link.
* Todos os botões e links devem funcionar por teclado.
* Foco visível obrigatório.
* Inputs com labels associados.
* Erros de formulário associados aos campos.
* Imagens com `alt` adequado.
* Não usar texto em imagem como informação principal.
* Contraste adequado (WCAG AA mínimo).
* Não usar animações fortes.
* Respeitar `prefers-reduced-motion`.
* Não usar carrossel automático.
* Não usar popup invasivo.
* Não usar som automático.
* Não usar elementos piscando.

### 18.2 Acessibilidade para pessoas com dislexia

O site deve facilitar leitura e compreensão.

Regras obrigatórias:

* Usar fonte legível para textos longos, preferencialmente Inter.
* Evitar blocos extensos de texto.
* Usar parágrafos curtos.
* Usar espaçamento confortável entre linhas.
* Usar largura de texto controlada.
* Evitar alinhamento justificado.
* Usar alinhamento à esquerda para textos longos.
* Evitar excesso de itálico.
* Evitar textos totalmente em caixa alta.
* Evitar fundos com textura atrás de textos importantes.
* Garantir contraste suficiente.
* Usar títulos claros e previsíveis.
* Dividir conteúdo em seções curtas.
* Usar listas quando facilitar compreensão.

Padrões recomendados:

```txt
line-height: entre 1.6 e 1.8 para textos longos
max-width de texto: entre 60 e 75 caracteres por linha
font-size base: mínimo 16px, preferencialmente 18px em blocos de leitura
```

Regra visual:

```txt
Textos longos devem usar Inter, nunca Playfair Display.
Playfair Display deve ficar restrita a títulos curtos.
```

### 18.3 Acessibilidade para pessoas autistas

O site deve ser previsível, calmo e sem excesso de estímulo visual.

Regras obrigatórias:

* Navegação consistente em todas as páginas.
* Layout previsível.
* CTAs claros e sem ambiguidade.
* Evitar animações desnecessárias.
* Evitar transições rápidas.
* Evitar excesso de elementos decorativos perto de textos importantes.
* Não usar pop-ups automáticos.
* Não usar banners agressivos.
* Não mudar conteúdo automaticamente.
* Evitar carrosséis.
* Evitar linguagem abstrata demais em instruções funcionais.
* Formulário deve explicar claramente o que acontece após o envio.

Texto recomendado perto do formulário:

```txt
Ao enviar sua mensagem, entraremos em contato para responder sua solicitação ou combinar uma primeira conversa.
```

### 18.4 Acessibilidade para pessoas com TDAH

O site deve reduzir distrações e facilitar foco.

Regras obrigatórias:

* Uma ação principal por seção.
* CTAs repetidos, mas não excessivos.
* Hierarquia visual clara.
* Cards objetivos.
* Evitar muitos links concorrendo por atenção.
* Evitar elementos animados chamando atenção sem necessidade.
* Formulário curto.
* Feedback imediato em interações.
* Mensagens de erro próximas ao campo correspondente.
* Página de contato sem excesso de texto.

### 18.5 Acessibilidade para pessoas com ansiedade

O site deve evitar pressão, urgência artificial e gatilhos desnecessários.

Regras obrigatórias:

* Não usar contagem regressiva.
* Não usar frases alarmistas.
* Não pressionar o usuário a agir imediatamente.
* Não usar gatilhos de escassez.
* Não usar linguagem de medo.
* Não mostrar mensagens de erro agressivas.
* Não bloquear a navegação com modal automático.
* Dar caminhos alternativos de contato.
* Permitir que o usuário leia no próprio ritmo.

Evitar:

```txt
Agende agora antes que piore.
Últimas vagas.
Você precisa resolver isso hoje.
Não deixe para depois.
```

Preferir:

```txt
Quando fizer sentido para você, entre em contato.
Agende uma primeira conversa.
Você pode enviar uma mensagem inicial para tirar dúvidas.
```

### 18.6 Acessibilidade para pessoas com depressão ou sofrimento emocional

O site deve ser leve, respeitoso e não culpabilizante.

Regras obrigatórias:

* Evitar linguagem motivacional exagerada.
* Evitar prometer transformação rápida.
* Evitar frases que responsabilizem o usuário pelo sofrimento.
* Usar tom gentil e realista.
* Reforçar que o contato inicial pode ser simples.
* Não exigir que o usuário explique detalhes clínicos no formulário.
* Não criar fluxo longo para contato.

Preferir:

```txt
Você pode enviar uma mensagem breve. Não é necessário explicar tudo neste primeiro contato.
```

### 18.7 Acessibilidade para idosos e baixa visão

Regras obrigatórias:

* Fonte mínima confortável.
* Botões grandes (mínimo 44px x 44px).
* Contraste adequado (WCAG AA).
* Evitar textos claros demais.
* Evitar verde claro para textos importantes.
* Labels visíveis.
* Ícones acompanhados de texto.
* Links fáceis de identificar.
* Espaçamento confortável entre elementos clicáveis.
* Menu mobile simples.

### 18.8 Linguagem simples e acolhedora

Os textos devem ser acessíveis para diferentes níveis de leitura.

Regras:

* Frases curtas.
* Evitar jargões técnicos.
* Quando usar termo técnico, explicar de forma simples.
* Evitar parágrafos longos.
* Usar voz ativa.
* Usar palavras humanas e diretas.
* Evitar excesso de metáforas.

Exemplo ruim:

```txt
Intervenções psicodinâmicas sustentam a elaboração simbólica dos conflitos intrapsíquicos.
```

Exemplo melhor:

```txt
A terapia oferece um espaço para compreender conflitos internos, emoções e escolhas com mais clareza.
```

### 18.9 Formulário acessível e emocionalmente seguro

O formulário deve ser curto e tranquilo.

Regras:

* Pedir apenas dados necessários.
* Não pedir motivo detalhado da terapia.
* Não pedir diagnóstico.
* Não pedir histórico clínico.
* Informar que a mensagem pode ser breve.
* Mostrar o que vai acontecer depois do envio.
* Manter dados preenchidos se houver erro.
* Não usar mensagens como "campo inválido" sem explicação.
* Não usar vermelho agressivo como única indicação de erro.
* Usar texto + cor + ícone quando possível.

Texto de apoio recomendado:

```txt
Você pode escrever uma mensagem breve. Não é necessário compartilhar detalhes pessoais ou clínicos neste primeiro contato.
```

### 18.10 Imagens, ícones e elementos decorativos

Regras:

* Imagens decorativas devem usar `aria-hidden="true"` ou `alt=""`.
* Imagens informativas devem ter `alt` descritivo.
* Ícones importantes devem ter texto junto.
* Elementos decorativos não devem competir com conteúdo.
* Texturas não devem ficar atrás de textos essenciais.
* Evitar imagens muito tristes, dramáticas ou com alto impacto emocional.
* Preferir imagens/ilustrações calmas, humanas e neutras.

### 18.11 Movimento e animações

Regras:

* Animações devem ser discretas.
* Não usar parallax agressivo.
* Não usar animações infinitas chamativas.
* Não usar piscadas.
* Respeitar `prefers-reduced-motion`.
* Todo conteúdo deve ser compreensível sem animação.

Implementação:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 18.12 Cores e contraste

Regras:

* Texto principal em verde escuro ou grafite.
* Evitar texto verde claro em fundo claro.
* Botões devem ter contraste forte.
* Estados de erro devem combinar cor, texto e ícone.
* Links devem ser distinguíveis além da cor.
* Foco deve ser visível em teclado.

### 18.13 Skip link

Criar componente:

```txt
src/components/shared/skip-link.tsx
```

Comportamento:

* Fica oculto visualmente.
* Aparece ao receber foco.
* Leva direto para `#main-content`.

Implementação:

```tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Ir para o conteúdo principal
    </a>
  );
}
```

### 18.14 Main content

No layout global:

```tsx
<main id="main-content" tabIndex={-1}>
  {children}
</main>
```

### 18.15 Checklist obrigatório de acessibilidade

Antes de considerar a entrega pronta, verificar:

* Navegação por teclado completa.
* Foco visível.
* Labels em todos os campos.
* Erros claros no formulário.
* Contraste adequado.
* Títulos em ordem correta.
* Texto legível em mobile.
* Nenhum conteúdo importante depende só de imagem.
* Nenhum conteúdo muda automaticamente.
* Nenhum popup automático.
* Nenhum carrossel automático.
* Nenhum CTA agressivo.
* Formulário não solicita dados clínicos sensíveis.
* Conteúdo escrito em linguagem simples.
* Layout confortável para leitura com dislexia.
* Experiência calma para pessoas autistas, ansiosas ou depressivas.

---

## 19. SEO

O SEO deve ser configurado de forma completa para um site institucional.

### 19.1 Metadata global

No `layout.tsx`, configurar metadata base:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://cibelepsicologia.com.br'),
  title: {
    default: 'Cibele Rosa | Psicologia Clínica para Adultos',
    template: '%s | Cibele Rosa Psicologia',
  },
  description:
    'Atendimento em psicologia clínica para adultos com foco em saúde emocional, autoconhecimento, transições de vida e fortalecimento interno.',
  keywords: [
    'psicologia clínica',
    'psicoterapia para adultos',
    'terapia online',
    'saúde mental',
    'autoconhecimento',
  ],
  authors: [{ name: 'Cibele Rosa' }],
  creator: 'Cibele Rosa',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://cibelepsicologia.com.br',
    siteName: 'Cibele Rosa Psicologia',
    title: 'Cibele Rosa | Psicologia Clínica para Adultos',
    description:
      'Atendimento em psicologia clínica para adultos com foco em saúde emocional, autoconhecimento, transições de vida e fortalecimento interno.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cibele Rosa Psicologia Clínica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cibele Rosa | Psicologia Clínica para Adultos',
    description:
      'Atendimento em psicologia clínica para adultos com foco em saúde emocional, autoconhecimento, transições de vida e fortalecimento interno.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};
```

### 19.2 Metadata por página

Home:

```tsx
export const metadata: Metadata = {
  title: 'Psicologia Clínica para Adultos',
  description:
    'Atendimento em psicologia clínica para adultos com foco em saúde emocional, autoconhecimento, transições de vida e fortalecimento interno.',
  alternates: {
    canonical: '/',
  },
};
```

Serviços:

```tsx
export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Conheça as principais demandas atendidas na psicoterapia para adultos, incluindo saúde emocional, transições, relacionamentos e tomada de decisão.',
  alternates: {
    canonical: '/servicos',
  },
};
```

Contato:

```tsx
export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato para agendar uma primeira conversa com Cibele Rosa, psicóloga clínica para adultos.',
  alternates: {
    canonical: '/contato',
  },
};
```

### 19.3 Sitemap

Criar:

```txt
src/app/sitemap.ts
```

Implementação:

```ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cibelepsicologia.com.br';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/servicos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
```

### 19.4 Robots

Criar:

```txt
src/app/robots.ts
```

Implementação:

```ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://cibelepsicologia.com.br/sitemap.xml',
  };
}
```

### 19.5 Headings

Home:

```txt
h1: Psicologia clínica para adultos que buscam compreender suas questões com profundidade e cuidado.
h2: Sobre Cibele Rosa
h2: Para quem é o atendimento
h2: Como a terapia pode ajudar
h2: Serviços em destaque
h2: Entre em contato
```

Serviços:

```txt
h1: Serviços de psicologia clínica para adultos
h2: Demandas atendidas
h2: Como funciona o processo terapêutico
h2: Agende uma primeira conversa
```

Contato:

```txt
h1: Entre em contato
h2: Fale pelo WhatsApp
h2: Envie uma mensagem
```

### 19.6 Dados estruturados (JSON-LD)

Adicionar JSON-LD básico, se os dados profissionais forem confirmados.

Tipo sugerido:

```txt
ProfessionalService
```

Implementação:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Cibele Rosa Psicologia Clínica',
      image: 'https://cibelepsicologia.com.br/og-image.png',
      '@id': 'https://cibelepsicologia.com.br',
      url: 'https://cibelepsicologia.com.br',
      telephone: '+5511999999999',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        addressCountry: 'BR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -23.5505,
        longitude: -46.6333,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      sameAs: [
        'https://instagram.com/cibelerosa.psi',
      ],
    }),
  }}
/>
```

Atenção:

* Só incluir endereço se for público e confirmado.
* Só incluir telefone se estiver autorizado.
* Só incluir CRP após confirmação.

---

## 20. Performance

### 20.1 Regras

* Evitar bibliotecas pesadas.
* Otimizar imagens com `next/image`.
* Usar Server Components por padrão.
* Evitar JavaScript desnecessário no client.
* Componentizar sem exagero.
* Evitar carrosséis e animações pesadas.
* Usar fontes otimizadas com `next/font`.

### 20.2 Imagens

Regras:

* Usar `next/image`.
* Definir `alt` adequado.
* Definir tamanhos corretos.
* Evitar imagens genéricas demais.
* Preferir imagens leves.

Exemplo:

```tsx
<Image
  src="/hero-illustration.svg"
  alt="Ilustração representando cuidado emocional e bem-estar"
  width={600}
  height={400}
  priority
/>
```

---

## 21. Padrão de layout por página

### 21.1 Home

Estrutura:

```txt
Header
Main
  HeroSection
  AboutSection
  AudienceSection
  ProcessSection
  ServicesPreviewSection
  CTASection
Footer
WhatsAppButton (floating)
```

#### HeroSection

Conteúdo:

* Eyebrow: Psicologia Clínica para Adultos.
* H1: Psicologia clínica para adultos que buscam compreender suas questões com profundidade e cuidado.
* Texto de apoio: A psicoterapia é um caminho de autoconhecimento, equilíbrio e escolhas mais conscientes.
* CTA primário: Agendar uma primeira conversa.
* CTA secundário: Conhecer os serviços.

#### AboutSection

Conteúdo:

* Experiência de mais de 20 anos.
* Atuação com adultos.
* Foco em escuta qualificada e profundidade.

#### AudienceSection

Cards ou lista clara com público-alvo.

#### ProcessSection

Explicação breve do processo terapêutico.

#### ServicesPreviewSection

Cards com principais serviços.

#### CTASection

Chamada final para WhatsApp ou contato.

### 21.2 Serviços

Estrutura:

```txt
Page intro
Services grid
Process explanation
CTA
```

### 21.3 Contato

Estrutura:

```txt
Page intro
WhatsApp card
Contact form
Social links
Privacy note
```

---

## 22. Padrões de componentes

### 22.1 SectionHeading

Props esperadas:

```ts
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};
```

### 22.2 ServiceCard

Props esperadas:

```ts
import { LucideIcon } from 'lucide-react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};
```

### 22.3 WhatsAppButton

Props esperadas:

```ts
type WhatsAppButtonProps = {
  variant?: 'floating' | 'inline';
  label?: string;
  message?: string;
};
```

Regras:

* Usar número vindo de `siteConfig`.
* Se não houver número definido, não renderizar o componente.
* Usar `aria-label` claro.
* Link deve abrir em nova aba.

Exemplo de implementação:

```tsx
'use client';

import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';

type WhatsAppButtonProps = {
  variant?: 'floating' | 'inline';
  label?: string;
  message?: string;
};

export function WhatsAppButton({
  variant = 'floating',
  label = 'Falar no WhatsApp',
  message = 'Olá! Gostaria de agendar uma primeira conversa.'
}: WhatsAppButtonProps) {
  if (!siteConfig.phone) return null;

  const whatsappUrl = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(message)}`;

  if (variant === 'floating') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    );
  }

  return (
    <Button asChild>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}
```

---

## 23. Padrão de mensagens e tom de voz

O texto do site deve ser:

* Acolhedor.
* Profissional.
* Claro.
* Sem exagero comercial.
* Sem promessa de resultado.
* Sem pressão psicológica.
* Sem linguagem alarmista.

Evitar:

```txt
Resolva sua vida agora.
Cure sua ansiedade.
Agende antes que piore.
Resultado garantido.
Transforme sua vida em poucos dias.
```

Preferir:

```txt
Agende uma primeira conversa.
Entre em contato para entender se este atendimento faz sentido para você.
O processo terapêutico pode ajudar a olhar suas questões com mais clareza e cuidado.
```

---

## 24. Analytics e tracking

O site deve permitir medição básica de conversão sem comprometer privacidade.

### 24.1 Eventos principais

Eventos recomendados:

```txt
cta_primary_click
whatsapp_click
contact_form_submit_attempt
contact_form_submit_success
contact_form_submit_error
navigation_link_click
```

### 24.2 Ferramentas possíveis

* Vercel Analytics (recomendado).
* Google Analytics.
* Plausible.

Para primeira versão, usar Vercel Analytics.

### 24.3 Regras de privacidade

* Não enviar conteúdo da mensagem para analytics.
* Não enviar nome, e-mail ou telefone para analytics.
* Eventos devem ser anônimos.
* Política de privacidade deve informar uso de analytics, se implementado.

### 24.4 Arquivo sugerido

```txt
src/lib/analytics.ts
```

Função sugerida:

```ts
export function trackEvent(
  eventName: string,
  payload?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return;

  // Vercel Analytics
  if (window.va) {
    window.va('track', eventName, payload);
  }

  // Custom implementation
  console.log('Event:', eventName, payload);
}
```

---

## 25. Fallbacks e dados ausentes

Componentes devem funcionar mesmo quando dados opcionais não estiverem definidos.

### 25.1 Regras

* Se WhatsApp não existir, não renderizar botão de WhatsApp.
* Se Instagram não existir, não renderizar link de Instagram.
* Se LinkedIn não existir, não renderizar link de LinkedIn.
* Se CRP não existir, exibir placeholder apenas em desenvolvimento.
* Se imagem profissional não existir, usar ilustração da marca.
* Se logo não existir, renderizar texto da marca.
* Nenhum componente deve quebrar por ausência de dado opcional.

### 25.2 Dados vindos de env

Devem vir da env:

```txt
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_INSTAGRAM_URL
NEXT_PUBLIC_LINKEDIN_URL
NEXT_PUBLIC_CRP
NEXT_PUBLIC_EMAIL
```

---

## 26. Estratégia mobile-first e acessibilidade responsiva

O desenvolvimento deve ser **mobile-first**.

### 26.1 Regras

* Começar o layout pelo mobile.
* Aplicar breakpoints progressivamente.
* Garantir toque confortável em botões e links (mínimo 44px x 44px).
* Evitar elementos pequenos demais.
* Garantir leitura confortável em telas pequenas.
* Não esconder informações essenciais no mobile.
* Menu mobile deve ser acessível por teclado e leitor de tela.
* Não usar hover como única forma de interação.

### 26.2 Breakpoints recomendados

```txt
base: mobile
sm: 640px (telas pequenas maiores)
md: 768px (tablet)
lg: 1024px (desktop)
xl: 1280px (desktop amplo)
2xl: 1536px (desktop extra amplo)
```

### 26.3 Tamanho mínimo de alvo de toque

Botões, links e campos interativos devem ter área clicável confortável.

Recomendação:

```txt
min-h-11 (44px)
```

---

## 27. Padrões de commits

Usar Conventional Commits.

Exemplos:

```txt
chore: setup next project
feat: add home hero section
feat: add contact form validation
feat: add accessibility skip link
feat: implement api route for contact
style: adjust responsive spacing
fix: improve form error messages
refactor: extract service card component
docs: update technical sdd
```

---

## 28. Testes

O projeto deve ter estratégia de testes robusta e proporcional ao tamanho do site.

### 28.1 Ferramentas recomendadas

```txt
Vitest
React Testing Library
Playwright
axe-core / jest-axe ou equivalente
```

### 28.2 Testes unitários

Cobrir:

* Schemas Zod.
* Funções utilitárias.
* Geração de links de WhatsApp.
* Configurações públicas.
* Logger.

### 28.3 Testes de componentes

Cobrir:

* Header renderiza links principais.
* Footer renderiza dados públicos quando disponíveis.
* ServiceCard renderiza título e descrição.
* ContactForm exibe mensagens de erro.
* ContactForm desabilita botão durante envio.
* SkipLink aparece ao receber foco.

### 28.4 Testes de integração

Cobrir:

* Envio de formulário com dados válidos.
* Erro da API exibindo mensagem genérica.
* Honeypot bloqueando spam.
* Rate limit retornando erro controlado.

### 28.5 Testes E2E com Playwright

Fluxos obrigatórios:

```txt
Usuário acessa Home e navega para Serviços.
Usuário acessa Home e navega para Contato.
Usuário preenche formulário inválido e vê erros.
Usuário preenche formulário válido e vê estado de envio.
Usuário clica no botão de WhatsApp.
Usuário navega pelo site usando teclado.
```

### 28.6 Testes de acessibilidade

Validar:

* Labels de formulário.
* Ordem de heading.
* Navegação por teclado.
* Foco visível.
* Contraste.
* Uso correto de landmarks.

### 28.7 Scripts esperados

Adicionar no `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test",
    "test:a11y": "jest --testPathPattern=a11y"
  }
}
```

---

## 29. Regras rígidas para desenvolvimento assistido por IA

Esta seção é obrigatória. Qualquer IA usada para desenvolver o projeto deve seguir estas regras.

### 29.1 A IA deve sempre

* Seguir este SDD técnico.
* Usar Next.js App Router.
* Usar TypeScript.
* Usar Tailwind CSS.
* Usar shadcn/ui quando houver componente equivalente.
* Usar Server Components por padrão.
* Usar Client Components apenas quando houver estado, evento, formulário ou API de navegador.
* Criar componentes pequenos e focados.
* Respeitar a estrutura de pastas definida.
* Centralizar dados do site em `siteConfig` e variáveis de ambiente.
* Validar formulários no client e no server.
* Implementar acessibilidade desde o início.
* Usar HTML semântico.
* Manter foco visível.
* Criar testes para lógica crítica.
* Preservar a identidade visual definida.
* Usar mensagens seguras para o usuário final.

### 29.2 A IA nunca deve

* Criar banco de dados sem solicitação explícita.
* Criar autenticação.
* Criar área do paciente.
* Criar loja online.
* Criar checkout.
* Criar CMS.
* Adicionar dependências sem justificar necessidade.
* Alterar a stack principal.
* Usar `any` sem motivo extremamente justificado.
* Espalhar `process.env` pelo projeto.
* Colocar secrets no front-end.
* Colocar API keys em código.
* Expor stack trace para usuário.
* Usar textos comerciais agressivos.
* Prometer cura ou resultado terapêutico.
* Solicitar dados clínicos sensíveis no formulário.
* Criar animações fortes, carrosséis automáticos ou pop-ups invasivos.
* Alterar a paleta de cores sem solicitação.
* Misturar lógica de negócio dentro de componentes `ui`.
* Criar abstrações complexas sem necessidade.

### 29.3 Regra de alteração de arquitetura

Qualquer alteração de arquitetura deve ser justificada antes de ser implementada.

A IA deve responder primeiro:

```txt
Proposta de alteração:
Motivo:
Impacto:
Arquivos afetados:
Riscos:
```

Somente depois disso a alteração pode ser feita.

### 29.4 Regra de geração de código

Ao gerar código, a IA deve informar:

```txt
Arquivos criados:
Arquivos alterados:
Dependências usadas:
Como testar:
```

### 29.5 Prompt base para IA

```txt
Implemente seguindo o SDD técnico do projeto Cibele Rosa v2.1.
Use Next.js App Router, TypeScript, Tailwind CSS e shadcn/ui.
Use Server Components por padrão e Client Components apenas quando necessário.
Priorize acessibilidade, segurança, SEO, testes e código simples.
Não adicione dependências sem necessidade.
Não crie funcionalidades fora do escopo.
Não altere a identidade visual definida.
```

## 29.6 Agents obrigatórios de validação

O projeto deve utilizar agents especializados para garantir qualidade arquitetural, consistência visual, acessibilidade, testes automatizados e conformidade com os princípios definidos neste SDD.

Os agents funcionam como validadores obrigatórios antes da conclusão de qualquer task, PR/MR ou refatoração importante.

---

### Agent 1 — Playwright Test Guardian

Responsável por validar fluxos reais do usuário, testes E2E, acessibilidade funcional e estabilidade da aplicação.

#### Objetivos

* Garantir que os fluxos principais funcionem corretamente.
* Validar comportamento real do usuário.
* Garantir acessibilidade básica funcional.
* Validar responsividade.
* Evitar regressões críticas.

#### Responsabilidades

* Criar testes E2E com Playwright.
* Validar formulários.
* Validar navegação.
* Validar estados de loading.
* Validar estados de erro e sucesso.
* Validar funcionamento do WhatsApp button.
* Validar navegação por teclado.
* Validar comportamento mobile.
* Validar fluxo completo do formulário de contato.

#### Regras obrigatórias

* Não criar testes frágeis.
* Evitar seletores baseados em estrutura visual.
* Preferir:
  * `getByRole`
  * `getByLabel`
  * `getByText`
* Utilizar `data-testid` apenas quando necessário.
* Cada teste deve validar apenas um comportamento claro.
* Não testar implementação interna.
* Testar comportamento visível ao usuário.
* Garantir testes independentes.
* Não reutilizar estado entre testes.

#### Fluxos obrigatórios

```txt
Usuário acessa Home
Usuário navega para Serviços
Usuário navega para Contato
Usuário envia formulário inválido
Usuário envia formulário válido
Usuário visualiza loading
Usuário visualiza feedback de sucesso
Usuário clica no WhatsApp
Usuário navega usando teclado
Usuário acessa em mobile
```

---

### Agent 2 — Architecture Guardian

Responsável por garantir que o código siga rigorosamente os princípios arquiteturais, padrões de estrutura e convenções definidos neste SDD.

#### Objetivos

* Garantir que nenhum arquivo esteja no lugar errado.
* Validar que as responsabilidades de cada camada estão respeitadas.
* Impedir que lógica de negócio vaze para camadas erradas.
* Garantir que nomenclaturas seguem o padrão do projeto.
* Evitar abstrações prematuras e overengineering.

#### Responsabilidades

* Validar estrutura de pastas conforme seção 7.
* Verificar que componentes `ui` não contêm lógica de negócio.
* Verificar que `sections` não importam outras `sections`.
* Verificar que `shared` contém apenas componentes verdadeiramente reutilizáveis.
* Validar que `config/` é a única fonte de leitura de `process.env`.
* Validar que imports usam alias `@/` e não paths relativos longos.
* Verificar que `app/` não contém lógica de validação ou negócio.
* Verificar que Client Components têm `'use client'` e justificativa clara.
* Verificar que Server Components não usam hooks ou APIs de browser.
* Garantir que nenhum arquivo quebra o padrão kebab-case.
* Verificar que nomes de componentes são PascalCase.
* Verificar que nenhum `any` não justificado existe no código.

#### Regras obrigatórias

```txt
ui/       → componentes genéricos, sem lógica de negócio
layout/   → estrutura global (Header, Footer, Menu)
sections/ → seções específicas de páginas
shared/   → componentes reutilizáveis do projeto
config/   → única fonte de process.env e configurações estáticas
lib/      → funções utilitárias puras, sem side effects
constants/→ dados estáticos do domínio
types/    → tipos TypeScript compartilhados
```

#### Checklist de validação

```txt
[ ] Estrutura de pastas segue seção 7
[ ] Nenhum componente ui/ importa siteConfig ou constantes do domínio
[ ] Nenhuma section/ importa outra section/
[ ] config/ é a única camada que lê process.env
[ ] Imports usam @/ e não caminhos relativos
[ ] Nenhum Client Component sem justificativa
[ ] Nenhum Server Component usando hooks
[ ] Nomes de arquivos em kebab-case
[ ] Nomes de componentes em PascalCase
[ ] Nenhum any sem comentário justificando
[ ] Nenhuma abstração criada sem uso imediato
```

---

### Agent 3 — Accessibility Guardian

Responsável por garantir que o site atende ao padrão WCAG 2.1 AA e às regras de acessibilidade e cuidado emocional definidas na seção 18.

#### Objetivos

* Garantir navegação acessível para todos os públicos definidos na seção 18.
* Validar conformidade com WCAG 2.1 AA.
* Garantir que nenhuma feature quebre a experiência de usuários com dislexia, TDAH, ansiedade, autismo ou deficiência visual.
* Validar semântica HTML.

#### Responsabilidades

* Validar presença de skip link funcional.
* Validar `id="main-content"` e `tabIndex={-1}` no `<main>`.
* Verificar h1 único por página.
* Verificar hierarquia de headings (h1 → h2 → h3).
* Verificar que `<section>` usa `aria-labelledby`.
* Verificar labels visíveis em todos os campos.
* Verificar `aria-describedby` nos campos com erro.
* Verificar `aria-invalid` nos campos inválidos.
* Verificar `role="alert"` em mensagens de erro.
* Validar `alt` em imagens.
* Validar `aria-hidden="true"` em elementos decorativos.
* Verificar contraste de cores (WCAG AA mínimo).
* Verificar foco visível em todos os elementos interativos.
* Verificar `prefers-reduced-motion` implementado.
* Verificar área mínima de toque (44px × 44px).
* Verificar que formulários não solicitam dados clínicos sensíveis.
* Verificar que mensagens de erro são respeitosas e claras.
* Verificar que CTAs não usam linguagem de pressão ou urgência artificial.

#### Checklist de validação

```txt
[ ] Skip link presente e funcional
[ ] main com id="main-content" e tabIndex={-1}
[ ] H1 único por página
[ ] Hierarquia de headings correta
[ ] sections com aria-labelledby
[ ] Labels visíveis em todos os campos
[ ] Imagens decorativas com aria-hidden="true"
[ ] Imagens informativas com alt descritivo
[ ] Foco visível em todos os interativos
[ ] prefers-reduced-motion implementado
[ ] Botões e links com mínimo 44px de área
[ ] Erros de formulário claros e respeitosos
[ ] Nenhum CTA com linguagem de urgência ou pressão
[ ] Nenhum dado clínico solicitado no formulário
[ ] Contraste WCAG AA confirmado
```

---

### Agent 4 — Security Guardian

Responsável por garantir que nenhuma decisão de segurança definida na seção 17 foi violada em nenhum ponto do código.

#### Objetivos

* Impedir exposição de secrets ou dados sensíveis.
* Garantir que validações server-side estejam presentes.
* Verificar que rate limiting e honeypot estão implementados.
* Garantir conformidade com LGPD no escopo do projeto.

#### Responsabilidades

* Verificar que `RESEND_API_KEY` não aparece em nenhum arquivo com prefixo `NEXT_PUBLIC_`.
* Verificar que `process.env` não é acessado fora de `config/env.ts`.
* Verificar que `env.ts` é importado no `layout.tsx`.
* Verificar que a API Route valida com Zod no server.
* Verificar que honeypot está implementado e verificado antes do envio.
* Verificar que rate limiting está implementado em `/api/contact`.
* Verificar que respostas de erro não expõem detalhes técnicos.
* Verificar que logger não registra secrets, tokens ou dados clínicos.
* Verificar que formulário não solicita dados clínicos, diagnóstico ou histórico.
* Verificar que `.env.local` está no `.gitignore`.
* Verificar que `.env.example` existe e está atualizado.

#### Checklist de validação

```txt
[ ] Nenhuma API key com prefixo NEXT_PUBLIC_
[ ] process.env acessado apenas em config/env.ts
[ ] env.ts importado no layout.tsx
[ ] Validação Zod no server (API Route)
[ ] Honeypot verificado antes do envio de email
[ ] Rate limiting ativo em /api/contact
[ ] Respostas de erro sem stack trace ou detalhes internos
[ ] Logger sem secrets ou dados clínicos
[ ] Formulário sem campos de dados clínicos sensíveis
[ ] .env.local no .gitignore
[ ] .env.example atualizado
```

---

### Agent 5 — Design System Guardian

Responsável por garantir que a identidade visual da marca está sendo aplicada corretamente e de forma consistente em todos os componentes e páginas.

#### Objetivos

* Garantir que a paleta de cores da marca é respeitada.
* Garantir que tokens do design system são usados, não valores hardcoded.
* Garantir que tipografia segue as regras da seção 12.
* Garantir que o tom visual e emocional está alinhado à proposta da marca.

#### Responsabilidades

* Verificar que cores de marca são usadas via tokens (`brand-forest`, `brand-sand`, etc.).
* Identificar valores hexadecimais hardcoded fora de `globals.css` e `components/ui/`.
* Verificar que Playfair Display é usada apenas em títulos curtos.
* Verificar que Inter é usada em textos longos, botões e campos.
* Verificar que fundos alternam corretamente entre seções.
* Verificar que cards seguem o padrão visual da seção 12.7.
* Verificar que botões primários e secundários seguem a seção 12.7.
* Verificar que elementos decorativos têm `aria-hidden="true"`.
* Verificar que nenhuma seção usa linguagem ou visual comercial agressivo.
* Verificar que o tom das mensagens segue a seção 12.9 e 23.

#### Tokens de referência

```txt
Fundo principal:    bg-brand-ivory      (#FAF7F2)
Fundo suave:        bg-brand-sand       (#F2E8DA)
Primário escuro:    bg-brand-forest     (#2F4A3F)
Texto apoio:        text-brand-sage     (#6D846F)
Detalhe:            text-brand-leaf     (#A7B89A)
Fonte título:       font-serif          (Playfair Display)
Fonte corpo:        font-sans           (Inter)
```

#### Checklist de validação

```txt
[ ] Cores de marca usadas via tokens Tailwind
[ ] Nenhum hex hardcoded fora de globals.css e ui/
[ ] Playfair Display apenas em títulos curtos
[ ] Inter em textos longos, botões e campos
[ ] Fundos alternam conforme padrão de seções
[ ] Cards seguem estilo da seção 12.7
[ ] Botões primários e secundários seguem seção 12.7
[ ] Elementos decorativos com aria-hidden="true"
[ ] Nenhum CTA com linguagem comercial agressiva
[ ] Tom das mensagens alinhado com seção 12.9 e 23
[ ] Layout limpo, respirável e sem poluição visual
```

---

### Agent 6 — Performance Guardian

Responsável por garantir que o site é rápido, leve e eficiente, seguindo as boas práticas de performance do Next.js definidas na seção 20.

#### Objetivos

* Garantir que Server Components são usados por padrão.
* Garantir que imagens são otimizadas com `next/image`.
* Garantir que o bundle client-side é mínimo.
* Evitar dependências desnecessárias.
* Garantir que fontes são carregadas com `next/font`.

#### Responsabilidades

* Verificar que Server Components são padrão.
* Verificar que Client Components existem apenas onde há estado, evento ou API de browser.
* Verificar que todas as imagens usam `next/image`.
* Verificar que imagens above-the-fold têm `priority`.
* Verificar que fontes usam `next/font/google`.
* Verificar que não há dependências instaladas sem uso.
* Verificar que não há `console.log` em produção.
* Verificar que `npm run build` passa sem erros e sem warnings críticos.
* Verificar que o bundle não cresce desnecessariamente por imports excessivos.

#### Checklist de validação

```txt
[ ] Server Components usados por padrão
[ ] Client Components apenas onde necessário e justificado
[ ] Todas as imagens com next/image
[ ] Imagens above-the-fold com priority
[ ] Fontes com next/font/google
[ ] Nenhuma dependência instalada sem uso real
[ ] Nenhum console.log em código de produção
[ ] npm run build sem erros
[ ] npm run typecheck sem erros
[ ] npm run lint sem erros
```

---

### Quality Gate — Critério de conclusão de task

Uma task só pode ser considerada concluída quando todos os agents relevantes validarem seus checklists sem itens pendentes.

#### Agents obrigatórios por tipo de entrega

```txt
Componente novo:
  [ ] Agent 2 — Architecture Guardian
  [ ] Agent 3 — Accessibility Guardian
  [ ] Agent 5 — Design System Guardian

Página nova:
  [ ] Agent 2 — Architecture Guardian
  [ ] Agent 3 — Accessibility Guardian
  [ ] Agent 5 — Design System Guardian
  [ ] Agent 6 — Performance Guardian

API Route:
  [ ] Agent 2 — Architecture Guardian
  [ ] Agent 4 — Security Guardian

Refatoração:
  [ ] Agent 2 — Architecture Guardian
  [ ] Agent 6 — Performance Guardian

PR / entrega final:
  [ ] Agent 1 — Playwright Test Guardian
  [ ] Agent 2 — Architecture Guardian
  [ ] Agent 3 — Accessibility Guardian
  [ ] Agent 4 — Security Guardian
  [ ] Agent 5 — Design System Guardian
  [ ] Agent 6 — Performance Guardian
```

#### Bloqueios de entrega

Qualquer item **não** verificado em um Agent obrigatório é um **bloqueio de entrega**.

Não existe "entregar e corrigir depois" para itens de segurança (Agent 4) e acessibilidade (Agent 3).

---

## 30. Critérios de aceite técnico

A entrega será aceita quando:

* O projeto roda sem erro.
* TypeScript não possui erros.
* ESLint não possui erros críticos.
* As páginas `/`, `/servicos` e `/contato` existem.
* O layout é responsivo.
* Header e footer funcionam.
* Formulário possui validação client-side e server-side.
* API Route `/api/contact` funciona.
* Rate limiting está implementado.
* Honeypot está implementado.
* Botão WhatsApp funciona ou usa fallback seguro.
* O site possui skip link.
* A navegação por teclado funciona.
* Headings estão corretos.
* Inputs possuem labels.
* Erros de formulário são claros e acolhedores.
* SEO básico está configurado.
* Sitemap e robots.txt existem.
* Dados de contato estão centralizados em `siteConfig`.
* Variáveis de ambiente estão validadas em `env.ts`.
* Nenhum segredo está hardcoded no front-end.
* Logger centralizado está implementado.
* Contraste de cores atinge WCAG AA.
* `prefers-reduced-motion` está implementado.

---

## 31. Dados pendentes para produção

Antes de publicar, preencher:

* CRP definitivo.
* WhatsApp com DDD.
* E-mail profissional.
* Instagram URL.
* LinkedIn URL (se houver).
* Cidade/estado de atuação.
* Atendimento online, presencial ou ambos.
* Foto profissional de alta qualidade.
* Domínio registrado.
* Política de privacidade completa.
* Configurar Resend com domínio próprio.
* Configurar DNS do domínio.

---

## 32. Ordem recomendada de implementação

### Etapa 1 — Setup

* Criar projeto Next.js com TypeScript.
* Configurar Tailwind CSS.
* Configurar shadcn/ui.
* Configurar alias de imports.
* Criar estrutura de pastas.
* Configurar ESLint e Prettier.
* Configurar variáveis de ambiente.

### Etapa 2 — Base visual

* Criar `siteConfig.ts`.
* Criar `env.ts` com validação Zod.
* Criar paleta de cores no Tailwind.
* Configurar Next Font (Inter + Playfair Display).
* Criar Header.
* Criar Footer.
* Criar PageContainer.
* Criar SkipLink.
* Configurar layout global.

### Etapa 3 — Home

* Criar HeroSection.
* Criar AboutSection.
* Criar AudienceSection.
* Criar ProcessSection.
* Criar ServicesPreviewSection.
* Criar CTASection.
* Criar WhatsAppButton (floating).

### Etapa 4 — Serviços

* Criar constantes de serviços em `services.ts`.
* Criar ServiceCard component.
* Criar grid de cards.
* Criar CTA final.

### Etapa 5 — Contato

* Criar schema Zod em `validations.ts`.
* Criar ContactForm com React Hook Form.
* Criar estados de sucesso/erro.
* Criar aviso de privacidade.
* Implementar honeypot.

### Etapa 6 — API e Backend

* Criar `/api/contact/route.ts`.
* Implementar validação server-side com Zod.
* Implementar rate limiting em `rate-limit.ts`.
* Implementar logger em `logger.ts`.
* Configurar Resend.
* Testar envio de email.

### Etapa 7 — SEO

* Configurar metadata global.
* Configurar metadata por página.
* Criar `sitemap.ts`.
* Criar `robots.ts`.
* Adicionar JSON-LD.
* Criar imagens OG.

### Etapa 8 — Qualidade

* Revisar responsividade em todos os breakpoints.
* Revisar acessibilidade com checklist.
* Revisar navegação por teclado.
* Revisar contraste de cores.
* Revisar headings.
* Revisar SEO.
* Revisar performance.
* Preparar deploy na Vercel.

---

## 33. Versão do documento

| Versão | Data       | Descrição                                                                                                          |
| ------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| 1.0    | 05/05/2026 | Criação inicial do SDD com base no formulário.                                                                     |
| 1.1    | 05/05/2026 | Inclusão de stack técnica, acessibilidade e backlog.                                                               |
| 2.0    | 05/05/2026 | Reestruturação técnica para orientar desenvolvimento com IA.                                                       |
| 2.1    | 05/05/2026 | Correção de numeração, eliminação de duplicações, implementação detalhada de API Route.                           |
| 3.0    | 06/05/2026 | AI Governance System: 6 agents de validação, Quality Gate por tipo de entrega, alinhamento com código real (env.ts, siteConfig, remoção de analytics.ts). |

---

## Fim do documento
