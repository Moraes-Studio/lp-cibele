 Branch Flow

## Branches principais

### main
Produção estável. Só recebe merge de `develop` após validação completa.

### develop
Integração contínua. Base para todas as tasks. Sempre retornar aqui após finalizar.

## Branches de task

## Padrão:
```
lp-cp-{TASK-ID}-{descricao-curta}
```
## Exemplo:
```
lp-cp-TASK-001-setup-next
```
## Fluxo

1. Criar issue
2. Criar branch **a partir de `develop`**
3. Executar o escopo da issue
4. Criar ou atualizar testes
5. Rodar lint, typecheck e testes
6. Abrir PR para `develop`
7. Após merge, **retornar para `develop`**

## Regras

- Uma branch = uma task
- Não misturar refatoração com feature
- Atualizar `/docs/architecture.md` se alterar arquitetura
- Atualizar `/docs/accessibility.md` se alterar acessibilidade
- Refletir mudanças relevantes em `/docs/sdd.md`
- **Sempre voltar para `develop` após finalizar**
