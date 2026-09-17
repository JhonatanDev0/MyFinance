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

- **Total geral**: soma de receitas menos soma de despesas, sempre recalculado, desde a primeira nota até a mais recente — não existe "fechamento de mês".
- **Ordenação**: cronológica. Na lista, as notas são apresentadas agrupadas visualmente por mês (com um subtotal do período em cada grupo), mas isso é só apresentação — o Total continua sendo o acumulado geral.
- **Edição e exclusão**: qualquer nota pode ser editada ou excluída (com confirmação antes de excluir); o total se ajusta automaticamente.
- **Categoria**: apenas metadado de organização, não afeta o cálculo do total. Categorias já usadas são sugeridas por autocompletar ao criar uma nova nota.
- **Backup**: como os dados vivem só no navegador (`localStorage`), o usuário pode exportar um arquivo `.json` com todas as notas e reimportá-lo depois (substituindo as notas atuais).

## Fluxo de uso

1. Usuário abre o app e vê o total em destaque.
2. Adiciona uma nota (tipo, valor, descrição, categoria).
3. A nota entra na lista e o total é recalculado na hora.
4. Pode editar ou excluir qualquer nota existente.

## Fora do escopo (por enquanto)

- Stack técnica, persistência, PWA (service worker/manifest).
- Design visual.
- Relatórios e totais por categoria.
- Múltiplos usuários, sync em nuvem, backend.
- Merge inteligente de backups (import sempre substitui tudo).

## Próximos passos

1. Estrutura técnica (stack, persistência local, config de PWA).
2. Design visual (telas, componentes, identidade visual).
