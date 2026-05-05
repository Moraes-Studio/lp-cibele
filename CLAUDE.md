@AGENTS.md

# CLAUDE.md

## Contexto do projeto

[Descreva brevemente o que é o projeto, stack principal, objetivo]

## Estrutura
```
/src
/components
/pages
/lib
/styles
/docs
/architecture.md
/accessibility.md
/sdd.md
/tests
```
## Stack

- Next.js [versão]
- TypeScript
- [outras libs principais]

## Padrões de código

### Testes
- Table-driven pattern com `runTests`, `TestCase`
- Casos "Success" e "Validation Errors" separados
- Nomes em inglês
- `BASE` para dados compartilhados
- `faker.seed` quando necessário
- `it.each` quando aplicável
- Stubs via `getStub` com `sandbox.stub`

### Componentes
- [padrão de nomenclatura]
- [estrutura de pastas]
- [convenções de props]

### Estilo
- [Tailwind/CSS Modules/styled-components]
- [convenções de classes]

## Regras

- Sempre rodar lint + typecheck + testes antes de PR
- Atualizar docs quando alterar arquitetura ou acessibilidade
- Uma task = uma branch
- Sempre voltar para `develop`

## Comandos úteis

```bash
npm run dev
npm run test
npm run lint
npm run typecheck
```
## Skills disponíveis

Localizadas em `/home/lbc_m/skills/user/`:
- playwright-dev / playwright-devops
- context7-cli / context7-mcp / find-docs
- humanizer
