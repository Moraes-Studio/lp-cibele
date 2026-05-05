# Branch Flow

## Branches principais

### main
Branch estável de produção.

Regras:
- Não receber commits diretos.
- Só recebe merge a partir da `develop` após validação.
- Deve estar sempre deployável.

### develop
Branch de integração e homologação.

Regras:
- Não receber commits diretos.
- Recebe merges das branches de task após revisão.
- Deve passar testes antes do merge.

## Branches de task

Padrão:

lp-cp-{TASK-ID}-{descricao-curta}

Exemplo:

lp-cp-TASK-001-setup-next

## Fluxo obrigatório

1. Criar issue para a task.
2. Criar branch a partir de `develop`.
3. Executar somente o escopo da issue.
4. Criar ou atualizar testes quando necessário.
5. Rodar lint, typecheck e testes.
6. Abrir PR/MR para `develop`.
7. Aguardar aprovação.
8. Fazer merge somente após validação.

## Regras

- Uma branch deve resolver apenas uma task.
- Não misturar refatoração com feature.
- Não alterar arquitetura sem atualizar `/docs/architecture.md`.
- Não alterar regras de acessibilidade sem atualizar `/docs/accessibility.md`.
- Toda mudança relevante deve ser refletida no `/docs/sdd.md` ou documentação relacionada.
