# Tasks — Cibele Rosa Psicologia

## Status das Etapas

- ✅ Concluída
- 🚧 Em progresso
- 📋 Pendente
- ⏸️ Bloqueada

---

## Etapa 1 — Setup e Configuração Base

### 1.1 Criar projeto Next.js
- [ ] Criar projeto Next.js 15+ com TypeScript
- [ ] Configurar `tsconfig.json` com strict mode
- [ ] Configurar alias de imports (`@/`)
- [ ] Testar: `npm run dev` funciona sem erros

### 1.2 Configurar Tailwind CSS
- [ ] Instalar Tailwind CSS 4+
- [ ] Configurar `tailwind.config.ts` com paleta de cores da marca
- [ ] Configurar tokens de cor do shadcn/ui
- [ ] Criar `globals.css` com variáveis CSS
- [ ] Testar: aplicar classe Tailwind em componente de teste

### 1.3 Configurar shadcn/ui
- [ ] Instalar shadcn/ui CLI
- [ ] Configurar `components.json`
- [ ] Instalar componentes iniciais: button, card, input, textarea, label, form, sheet
- [ ] Testar: renderizar Button component

### 1.4 Configurar fontes
- [ ] Configurar Inter com `next/font/google`
- [ ] Configurar Playfair Display com `next/font/google`
- [ ] Aplicar variáveis de fonte no layout
- [ ] Testar: fontes carregam corretamente

### 1.5 Configurar qualidade de código
- [ ] Configurar ESLint
- [ ] Configurar Prettier
- [ ] Adicionar scripts no `package.json`: lint, typecheck
- [ ] Testar: `npm run lint` sem erros

### 1.6 Criar estrutura de pastas
- [ ] Criar estrutura completa conforme SDD seção 7
- [ ] Criar arquivos `.gitkeep` em pastas vazias
- [ ] Testar: estrutura está correta

---

## Etapa 2 — Configurações e Utilitários

### 2.1 Criar configuração do site
- [ ] Criar `src/config/site.ts` com siteConfig
- [ ] Definir todos os campos conforme SDD seção 13
- [ ] Usar placeholders para dados pendentes
- [ ] Testar: importar siteConfig em componente de teste

### 2.2 Criar validação de ambiente
- [ ] Criar `src/config/env.ts`
- [ ] Implementar schema Zod para variáveis de ambiente
- [ ] Validar variáveis obrigatórias e opcionais
- [ ] Testar: erro claro quando env obrigatória está ausente

### 2.3 Criar arquivo .env.local
- [ ] Criar `.env.local` com todas as variáveis
- [ ] Usar placeholders seguros para desenvolvimento
- [ ] Adicionar `.env.local` no `.gitignore`
- [ ] Criar `.env.example` como template
- [ ] Testar: variáveis são lidas corretamente

### 2.4 Criar utilitários base
- [ ] Criar `src/lib/utils.ts` com função `cn`
- [ ] Criar `src/lib/logger.ts` conforme SDD seção 17.4
- [ ] Testar: logger registra eventos corretamente

### 2.5 Criar constantes de conteúdo
- [ ] Criar `src/constants/services.ts` conforme SDD seção 14.1
- [ ] Criar `src/constants/audience.ts` conforme SDD seção 14.2
- [ ] Testar: importar e usar constantes

---

## Etapa 3 — Layout Global e Componentes Base

### 3.1 Criar componente SkipLink
- [ ] Criar `src/components/shared/skip-link.tsx` conforme SDD seção 18.13
- [ ] Implementar estilo acessível
- [ ] Testar: aparece ao receber foco, leva para #main-content

### 3.2 Criar componente PageContainer
- [ ] Criar `src/components/shared/page-container.tsx`
- [ ] Implementar container responsivo conforme SDD seção 10.2
- [ ] Testar: centraliza conteúdo corretamente

### 3.3 Criar componente SectionHeading
- [ ] Criar `src/components/shared/section-heading.tsx`
- [ ] Implementar props conforme SDD seção 22.1
- [ ] Suportar eyebrow, title, description, align
- [ ] Testar: renderiza todos os elementos corretamente

### 3.4 Criar Header
- [ ] Criar `src/components/layout/header.tsx`
- [ ] Implementar navegação desktop
- [ ] Implementar logo
- [ ] Implementar links para /, /servicos, /contato
- [ ] Aplicar estilos conforme SDD seção 12.10
- [ ] Testar: navegação funciona, responsivo em mobile

### 3.5 Criar Menu Mobile
- [ ] Criar `src/components/layout/mobile-menu.tsx`
- [ ] Usar Sheet do shadcn/ui
- [ ] Implementar toggle do menu
- [ ] Garantir acessibilidade por teclado
- [ ] Testar: abre/fecha, navegação funciona

### 3.6 Criar Footer
- [ ] Criar `src/components/layout/footer.tsx`
- [ ] Implementar dados profissionais (CRP, contato, redes)
- [ ] Aplicar estilos conforme SDD seção 12.10
- [ ] Implementar fallbacks para dados ausentes
- [ ] Testar: renderiza corretamente, links funcionam

### 3.7 Configurar Layout Global
- [ ] Editar `src/app/layout.tsx`
- [ ] Adicionar SkipLink
- [ ] Adicionar Header
- [ ] Configurar main com id="main-content" e tabIndex={-1}
- [ ] Adicionar Footer
- [ ] Configurar metadata global conforme SDD seção 19.1
- [ ] Testar: layout renderiza em todas as páginas

---

## Etapa 4 — Página Home

### 4.1 Criar HeroSection
- [ ] Criar `src/components/sections/hero-section.tsx`
- [ ] Implementar conteúdo conforme SDD seção 21.1
- [ ] Implementar CTAs (primário e secundário)
- [ ] Aplicar estilos conforme SDD seção 12.10
- [ ] Testar: responsivo, CTAs funcionam

### 4.2 Criar AboutSection
- [ ] Criar `src/components/sections/about-section.tsx`
- [ ] Implementar conteúdo sobre a profissional
- [ ] Aplicar estilos consistentes
- [ ] Testar: renderiza corretamente

### 4.3 Criar AudienceSection
- [ ] Criar `src/components/sections/audience-section.tsx`
- [ ] Usar dados de `constants/audience.ts`
- [ ] Implementar lista ou cards
- [ ] Testar: renderiza todos os itens

### 4.4 Criar ProcessSection
- [ ] Criar `src/components/sections/process-section.tsx`
- [ ] Explicar processo terapêutico brevemente
- [ ] Aplicar estilos consistentes
- [ ] Testar: renderiza corretamente

### 4.5 Criar componente ServiceCard
- [ ] Criar `src/components/shared/service-card.tsx`
- [ ] Implementar props conforme SDD seção 22.2
- [ ] Suportar ícone, título, descrição
- [ ] Aplicar estilos conforme SDD seção 12.7
- [ ] Testar: renderiza corretamente

### 4.6 Criar ServicesPreviewSection
- [ ] Criar `src/components/sections/services-preview-section.tsx`
- [ ] Usar dados de `constants/services.ts`
- [ ] Renderizar grid de ServiceCard
- [ ] Implementar grid responsivo
- [ ] Testar: renderiza todos os serviços

### 4.7 Criar CTASection
- [ ] Criar `src/components/sections/cta-section.tsx`
- [ ] Implementar chamada final para contato
- [ ] Aplicar estilos conforme SDD seção 12.10
- [ ] Testar: CTA funciona

### 4.8 Criar WhatsAppButton
- [ ] Criar `src/components/shared/whatsapp-button.tsx`
- [ ] Implementar variantes: floating e inline
- [ ] Implementar props conforme SDD seção 22.3
- [ ] Implementar fallback quando número não existe
- [ ] Gerar link wa.me correto
- [ ] Testar: abre WhatsApp, fallback funciona

### 4.9 Montar página Home
- [ ] Editar `src/app/page.tsx`
- [ ] Importar e renderizar todas as seções na ordem correta
- [ ] Adicionar WhatsAppButton floating
- [ ] Configurar metadata conforme SDD seção 19.2
- [ ] Testar: página completa funciona, responsiva

---

## Etapa 5 — Página Serviços

### 5.1 Criar página de Serviços
- [ ] Criar `src/app/servicos/page.tsx`
- [ ] Configurar metadata conforme SDD seção 19.2
- [ ] Implementar intro da página
- [ ] Renderizar grid de ServiceCard com todos os serviços
- [ ] Adicionar seção de processo terapêutico
- [ ] Adicionar CTA final
- [ ] Testar: página completa funciona, responsiva

---

## Etapa 6 — Validação e Schema

### 6.1 Criar schema de validação
- [ ] Criar `src/lib/validations.ts`
- [ ] Implementar `contactFormSchema` conforme SDD seção 15.3
- [ ] Incluir campo honeypot (company)
- [ ] Exportar tipo `ContactFormData`
- [ ] Testar: schema valida corretamente

### 6.2 Criar tipos TypeScript
- [ ] Criar `src/types/contact.ts`
- [ ] Definir tipos adicionais se necessário
- [ ] Testar: tipos importam sem erro

---

## Etapa 7 — Formulário de Contato

### 7.1 Criar ContactForm (estrutura)
- [ ] Criar `src/components/sections/contact-section.tsx`
- [ ] Marcar como Client Component ('use client')
- [ ] Configurar React Hook Form
- [ ] Configurar resolver do Zod
- [ ] Implementar campos: nome, email, phone, message
- [ ] Implementar campo honeypot (company) oculto
- [ ] Testar: formulário renderiza

### 7.2 Implementar validação client-side
- [ ] Conectar schema Zod ao formulário
- [ ] Implementar exibição de erros por campo
- [ ] Aplicar estilos acessíveis para erros conforme SDD seção 18.9
- [ ] Testar: validação funciona, erros aparecem

### 7.3 Implementar estados do formulário
- [ ] Implementar estado normal
- [ ] Implementar estado loading (isSubmitting)
- [ ] Implementar estado de sucesso
- [ ] Implementar estado de erro
- [ ] Desabilitar campos durante envio
- [ ] Testar: estados funcionam corretamente

### 7.4 Implementar textos acessíveis
- [ ] Adicionar labels visíveis em todos os campos
- [ ] Adicionar texto de apoio conforme SDD seção 15.4
- [ ] Adicionar aviso de privacidade conforme SDD seção 17.5
- [ ] Testar: textos são claros e acolhedores

### 7.5 Criar página de Contato
- [ ] Criar `src/app/contato/page.tsx`
- [ ] Configurar metadata conforme SDD seção 19.2
- [ ] Implementar intro da página
- [ ] Adicionar card de WhatsApp
- [ ] Renderizar ContactForm
- [ ] Adicionar links de redes sociais
- [ ] Testar: página completa funciona

---

## Etapa 8 — Rate Limiting

### 8.1 Implementar rate limiting
- [ ] Criar `src/lib/rate-limit.ts` conforme SDD seção 16.3
- [ ] Configurar limite: 3 requisições por minuto
- [ ] Implementar LRU Cache
- [ ] Testar: rate limit funciona corretamente

---

## Etapa 9 — API Route de Contato

### 9.1 Configurar Resend
- [ ] Criar conta na Resend
- [ ] Obter API key
- [ ] Adicionar RESEND_API_KEY no .env.local
- [ ] Adicionar CONTACT_EMAIL_TO no .env.local
- [ ] Adicionar CONTACT_EMAIL_FROM no .env.local
- [ ] Testar: variáveis estão corretas

### 9.2 Criar API Route
- [ ] Criar `src/app/api/contact/route.ts`
- [ ] Implementar estrutura conforme SDD seção 16.2
- [ ] Implementar rate limiting
- [ ] Implementar validação server-side com Zod
- [ ] Implementar honeypot check
- [ ] Implementar envio via Resend
- [ ] Implementar logs com logger
- [ ] Implementar tratamento de erros
- [ ] Testar: endpoint funciona

### 9.3 Conectar formulário à API
- [ ] Implementar `onSubmit` no ContactForm
- [ ] Fazer POST para /api/contact
- [ ] Tratar resposta de sucesso
- [ ] Tratar resposta de erro
- [ ] Exibir mensagens conforme SDD seção 15.4
- [ ] Testar: envio completo funciona

### 9.4 Testar fluxo completo
- [ ] Testar envio com dados válidos
- [ ] Testar envio com dados inválidos
- [ ] Testar honeypot (preencher campo company)
- [ ] Testar rate limit (enviar 4x em 1 minuto)
- [ ] Testar recebimento de email
- [ ] Testar: todos os fluxos funcionam

---

## Etapa 10 — SEO

### 10.1 Configurar metadata global
- [ ] Já configurado no layout (Etapa 3.7)
- [ ] Verificar se todos os campos estão corretos
- [ ] Testar: metadata aparece no HTML

### 10.2 Configurar metadata por página
- [ ] Já configurado em cada página
- [ ] Verificar se canonical está correto
- [ ] Testar: metadata específica aparece

### 10.3 Criar sitemap
- [ ] Criar `src/app/sitemap.ts` conforme SDD seção 19.3
- [ ] Incluir rotas: /, /servicos, /contato
- [ ] Testar: acessar /sitemap.xml

### 10.4 Criar robots.txt
- [ ] Criar `src/app/robots.ts` conforme SDD seção 19.4
- [ ] Referenciar sitemap
- [ ] Testar: acessar /robots.txt

### 10.5 Criar imagens OG
- [ ] Criar `public/og-image.png` (1200x630)
- [ ] Garantir que imagem segue identidade visual
- [ ] Testar: imagem aparece ao compartilhar link

### 10.6 Criar favicons
- [ ] Criar `public/favicon.ico`
- [ ] Criar `public/icon.png`
- [ ] Criar `public/apple-icon.png`
- [ ] Testar: favicons aparecem no navegador

### 10.7 Adicionar JSON-LD
- [ ] Adicionar structured data conforme SDD seção 19.6
- [ ] Só adicionar após ter dados reais confirmados
- [ ] Testar: validar com Google Rich Results Test

---

## Etapa 11 — Acessibilidade

### 11.1 Revisar navegação por teclado
- [ ] Testar navegação completa por Tab
- [ ] Testar skip link (Tab na primeira tecla)
- [ ] Testar menu mobile por teclado
- [ ] Testar formulário por teclado
- [ ] Testar WhatsApp button por teclado
- [ ] Corrigir problemas encontrados

### 11.2 Revisar foco visível
- [ ] Verificar foco em todos os elementos interativos
- [ ] Garantir contraste do foco
- [ ] Corrigir elementos sem foco visível

### 11.3 Revisar headings
- [ ] Verificar h1 único por página
- [ ] Verificar ordem correta (h1 → h2 → h3)
- [ ] Corrigir hierarquia se necessário

### 11.4 Revisar labels
- [ ] Verificar labels em todos os campos
- [ ] Garantir que labels são visíveis
- [ ] Corrigir campos sem label

### 11.5 Revisar contraste
- [ ] Verificar contraste de textos (WCAG AA)
- [ ] Verificar contraste de botões
- [ ] Verificar contraste de ícones
- [ ] Corrigir problemas de contraste

### 11.6 Implementar prefers-reduced-motion
- [ ] Adicionar CSS conforme SDD seção 18.11
- [ ] Testar: animações desaparecem com preferência ativada

### 11.7 Revisar alt em imagens
- [ ] Verificar alt em todas as imagens
- [ ] Garantir alt descritivo para imagens informativas
- [ ] Garantir alt="" ou aria-hidden para decorativas
- [ ] Corrigir problemas

### 11.8 Testar com leitor de tela
- [ ] Testar navegação com NVDA ou JAWS
- [ ] Corrigir problemas de leitura

---

## Etapa 12 — Responsividade

### 12.1 Revisar mobile (320px - 639px)
- [ ] Testar todas as páginas em mobile
- [ ] Verificar textos legíveis
- [ ] Verificar botões tocáveis (mínimo 44px)
- [ ] Verificar menu mobile funciona
- [ ] Corrigir problemas

### 12.2 Revisar tablet (640px - 1023px)
- [ ] Testar todas as páginas em tablet
- [ ] Verificar layout intermediário
- [ ] Corrigir problemas

### 12.3 Revisar desktop (1024px+)
- [ ] Testar todas as páginas em desktop
- [ ] Verificar aproveitamento de espaço
- [ ] Corrigir problemas

---

## Etapa 13 — Performance

### 13.1 Otimizar imagens
- [ ] Verificar todas as imagens usam next/image
- [ ] Definir width e height
- [ ] Definir priority em imagens above-the-fold
- [ ] Testar: imagens carregam otimizadas

### 13.2 Revisar bundle
- [ ] Rodar `npm run build`
- [ ] Analisar bundle size
- [ ] Verificar se não há dependências desnecessárias
- [ ] Corrigir problemas

### 13.3 Testar Lighthouse
- [ ] Rodar Lighthouse em todas as páginas
- [ ] Verificar score de Performance
- [ ] Verificar score de Accessibility
- [ ] Verificar score de SEO
- [ ] Corrigir problemas críticos

---

## Etapa 14 — Testes

### 14.1 Configurar Vitest
- [ ] Instalar Vitest
- [ ] Configurar vitest.config.ts
- [ ] Adicionar script test no package.json
- [ ] Testar: `npm run test` funciona

### 14.2 Testes unitários
- [ ] Testar schema Zod
- [ ] Testar função cn (utils)
- [ ] Testar logger
- [ ] Testar geração de link WhatsApp
- [ ] Garantir 100% coverage em lógica crítica

### 14.3 Testes de componentes
- [ ] Testar ServiceCard renderiza props
- [ ] Testar ContactForm exibe erros
- [ ] Testar ContactForm desabilita durante envio
- [ ] Testar SkipLink aparece ao receber foco

### 14.4 Configurar Playwright (opcional)
- [ ] Instalar Playwright
- [ ] Configurar playwright.config.ts
- [ ] Adicionar script test:e2e no package.json
- [ ] Testar: `npm run test:e2e` funciona

### 14.5 Testes E2E (opcional)
- [ ] Testar navegação Home → Serviços
- [ ] Testar navegação Home → Contato
- [ ] Testar preenchimento de formulário inválido
- [ ] Testar preenchimento de formulário válido
- [ ] Testar clique em WhatsApp button
- [ ] Testar navegação por teclado

---

## Etapa 15 — Deploy

### 15.1 Preparar projeto
- [ ] Verificar .env.example está atualizado
- [ ] Verificar .gitignore está correto
- [ ] Criar README.md com instruções
- [ ] Fazer commit final
- [ ] Testar: `npm run build` sem erros

### 15.2 Configurar Vercel
- [ ] Criar conta na Vercel
- [ ] Conectar repositório GitHub
- [ ] Configurar variáveis de ambiente
- [ ] Fazer deploy
- [ ] Testar: site funciona em produção

### 15.3 Configurar domínio
- [ ] Registrar domínio
- [ ] Configurar DNS
- [ ] Adicionar domínio na Vercel
- [ ] Aguardar propagação
- [ ] Testar: domínio funciona

### 15.4 Configurar Resend com domínio
- [ ] Adicionar domínio na Resend
- [ ] Configurar registros DNS
- [ ] Verificar domínio
- [ ] Atualizar CONTACT_EMAIL_FROM
- [ ] Testar: emails chegam com domínio próprio

---

## Etapa 16 — Pós-Deploy

### 16.1 Verificação final
- [ ] Testar todas as páginas em produção
- [ ] Testar formulário de contato em produção
- [ ] Testar recebimento de emails
- [ ] Testar WhatsApp button
- [ ] Testar responsividade em produção
- [ ] Testar acessibilidade em produção

### 16.2 Monitoramento
- [ ] Configurar Vercel Analytics
- [ ] Verificar logs de erro
- [ ] Monitorar envios de formulário

### 16.3 Documentação
- [ ] Atualizar README.md com URL de produção
- [ ] Documentar processo de deploy
- [ ] Documentar variáveis de ambiente necessárias

---

## Etapa 17 — Dados Reais (quando disponíveis)

### 17.1 Atualizar dados profissionais
- [ ] Substituir CRP placeholder pelo CRP real
- [ ] Substituir WhatsApp placeholder pelo número real
- [ ] Substituir email placeholder pelo email real
- [ ] Adicionar Instagram URL real
- [ ] Adicionar LinkedIn URL real (se houver)
- [ ] Atualizar cidade/estado de atuação

### 17.2 Atualizar conteúdo
- [ ] Revisar textos com a profissional
- [ ] Adicionar foto profissional de alta qualidade
- [ ] Revisar serviços oferecidos
- [ ] Revisar público-alvo

### 17.3 Criar Política de Privacidade
- [ ] Escrever política de privacidade completa
- [ ] Criar página /privacidade
- [ ] Adicionar link no footer
- [ ] Publicar

---

## Notas Importantes

### Como usar este arquivo

1. **Marque tasks concluídas** com `[x]`
2. **Trabalhe sequencialmente** - não pule etapas
3. **Teste após cada task** - garanta que funciona antes de avançar
4. **Faça commits frequentes** - um commit por task ou grupo de tasks relacionadas
5. **Documente problemas** - adicione notas inline se encontrar bloqueios

### Estimativa de tempo

- **Etapas 1-3**: ~4-6 horas (setup e base)
- **Etapas 4-5**: ~3-4 horas (páginas principais)
- **Etapas 6-9**: ~4-6 horas (formulário e API)
- **Etapas 10-13**: ~3-4 horas (SEO, a11y, performance)
- **Etapas 14-16**: ~2-3 horas (testes e deploy)

**Total estimado**: 16-23 horas de desenvolvimento

### Bloqueios conhecidos

- **Etapa 9.1** requer conta Resend (gratuita)
- **Etapa 15.2** requer conta Vercel (gratuita)
- **Etapa 15.3** requer compra de domínio
- **Etapa 17** depende de cliente fornecer dados reais

---

**Última atualização**: 05/05/2026
**Versão do SDD**: 2.1
