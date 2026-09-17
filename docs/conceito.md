# Conceito

MyFinance é um PWA de controle financeiro inspirado num bloco de notas: cada lançamento é uma "nota", e o app soma tudo automaticamente para mostrar um total.

## Nota

Cada nota tem:

- **Valor**: número sempre positivo.
- **Tipo**: `receita` ou `despesa` — define se o valor soma ou subtrai do total.
- **Descrição**: texto livre.
- **Categoria**: texto livre, criado pelo usuário (sem lista fixa).
- **Data/hora**: timestamp de criação, usado para ordenação cronológica.

## Regras

- **Total geral**: soma de receitas menos soma de despesas, sempre recalculado. Lista única e contínua, sem agrupamento por mês.
- **Ordenação**: cronológica.
- **Edição e exclusão**: qualquer nota pode ser editada ou excluída; o total se ajusta automaticamente.
- **Categoria**: apenas metadado de organização, não afeta o cálculo do total.

## Fluxo de uso

1. Usuário abre o app e vê o total em destaque.
2. Adiciona uma nota (tipo, valor, descrição, categoria).
3. A nota entra na lista e o total é recalculado na hora.
4. Pode editar ou excluir qualquer nota existente.

## Fora do escopo (por enquanto)

- Stack técnica, persistência, PWA (service worker/manifest).
- Design visual.
- Agrupamento por período, relatórios, totais por categoria.
- Múltiplos usuários, sync em nuvem, backend.

## Próximos passos

1. Estrutura técnica (stack, persistência local, config de PWA).
2. Design visual (telas, componentes, identidade visual).
