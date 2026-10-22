---
name: validar
description: >
  This skill should be used when the user types "/validar", pastes a Figma link of a
  component and asks "valida esse componente", "está certo?", "revisa meu botão",
  "posso usar isso no DS?", "review this component", or selects a component and asks
  for feedback on their Garoa-based design system. It runs the 9-item Garoa checklist
  (tokens, states, light/dark, construction, accessibility, analytics, duplicates,
  decisions, documentation) and returns a plain-language verdict with fixes it can apply.
metadata:
  version: "0.1.0"
---

# /validar — avaliar um componente

Antes de tudo, carregar a skill `garoa-guardiao` e usar o `references/checklist-validacao.md` dela.

## Passos

1. **Achar o componente.** Pedir o link do componente no Figma (botão direito → Copiar link). Do link, tirar a chave do arquivo e o `node-id` (trocar `-` por `:`). Se a pessoa disser "o que está selecionado", ler a seleção atual com `get_metadata`.
2. **Recusar o original.** Se a chave for `PoNCxaLwAHqt2tX9DrMtkC`, avisar que é o Garoa original e pedir a cópia.
3. **Olhar.** Tirar uma captura do componente (`get_screenshot`) e listar as variantes existentes.
4. **Conferir os 9 itens** do checklist, nesta ordem:
   - itens 1 e 4 com a receita 3 (varredura de valores soltos);
   - item 2 comparando as variantes com os estados obrigatórios;
   - itens 3 e 5 com as receitas 4 e 5 (contraste e captura em light e dark);
   - itens 6 e 9 lendo a descrição do componente;
   - item 7 procurando componentes com nome ou função parecida no arquivo;
   - item 8 lendo a página de decisões, se existir.
5. **Escrever o relatório** no formato do checklist, com veredito, o que está certo, o que ajustar (um item por linha, em linguagem de designer) e decisões novas.
6. **Oferecer a correção.** Separar o que dá para corrigir sozinho (ligar uma cor solta ao token certo, ligar um raio, preencher a descrição, criar o estado de foco copiando o padrão do Button) do que precisa de decisão dela (criar um estado novo, mudar o desenho). Perguntar: "Quer que eu corrija os itens X e Y?".
7. **Corrigir, se ela aprovar.** Mostrar antes/depois com captura. Rodar a varredura de novo e atualizar o veredito.
8. **Registrar.** Se o componente for aprovado e for novo, registrar na página de decisões (receita 8): "Componente X aprovado".

## Como escolher o token certo numa correção

1. Procurar primeiro um token do próprio componente (`card/border`).
2. Se não houver, usar o semântico do papel (`color/border/default`).
3. Nunca ligar a um primitivo. Se o componente precisar de um token que não existe, propor o nome (`componente/parte/estado`) e criar só com aprovação.

## Tom

Começar pelo que está bom. Explicar cada ajuste pelo efeito real ("no modo escuro este texto some", "se a marca mudar, este botão não acompanha"), nunca pelo nome técnico da propriedade.
