---
name: nova-marca
description: >
  This skill should be used when the user wants to create their company's design system
  from Garoa, types "/nova-marca", or says "criar meu design system", "adaptar o Garoa
  para minha marca", "trocar as cores e a fonte do DS", "começar um DS novo", "rebrand
  the design system". It interviews a non-developer designer with 8 simple questions
  (accepting screenshots and brand PDFs), shows a summary for approval, then rebrands
  their copy of Garoa in Figma: color scales, font, corners, logo, and a contrast check
  in light and dark.
metadata:
  version: "0.1.0"
---

# /nova-marca — criar o DS da empresa a partir do Garoa

Antes de tudo, carregar a skill `garoa-guardiao` e seguir as regras dela. A pessoa não é programadora: uma pergunta por vez, linguagem simples, nada aplicado sem um "sim".

## Passo 0 — Preparar

1. Dar boas-vindas em 2 frases: o que vai acontecer ("vou te fazer 8 perguntas e, no fim, seu DS estará pronto no Figma") e quanto tempo leva (cerca de 15 minutos).
2. Conferir se a conexão com o Figma está ativa (tentar `whoami`). Se não estiver, explicar como conectar o Figma ao Claude em 3 passos e parar.
3. Perguntar qual o plano do Figma (gratuito ou pago). Explicar em uma frase: no gratuito o DS funciona dentro de um único arquivo; no pago ele vira biblioteca para outros arquivos.
4. Pedir o link da cópia do Garoa. Se a pessoa ainda não tiver, explicar: abrir o link do Garoa que recebeu, clicar em "Duplicar" e colar aqui o link da cópia. Se o link tiver a chave `PoNCxaLwAHqt2tX9DrMtkC`, é o original: recusar com gentileza e pedir a cópia.
5. Rodar o inventário (receita 1 de `figma-receitas.md`). Se não for uma cópia do Garoa, avisar e parar.
6. **Conferir a fonte de ícones** (receita 9). Os ícones do DS são letras da fonte Material Symbols Rounded; sem ela, aparecem palavras como "arrow_back" no lugar do desenho. Se faltar, recomendar a instalação antes de seguir, em passos simples:
   1. Abrir fonts.google.com e buscar "Material Symbols Rounded".
   2. Clicar em "Get font" e depois em "Download all".
   3. Abrir o arquivo baixado e instalar a fonte (no Mac, dois cliques e "Instalar"; no Windows, botão direito e "Instalar").
   4. Fechar e abrir o Figma de novo. Quem usa o Figma pelo navegador precisa do instalador de fontes do Figma para ele enxergar fontes do computador.
   5. Rodar a receita 9 de novo para confirmar.
   Se a pessoa preferir seguir sem instalar, continuar e avisar que os ícones vão aparecer como texto até a fonte ser instalada.

## Passo 1 — Entrevista

Fazer as 8 perguntas de `references/briefing.md`, uma por vez, na ordem. Aceitar texto, prints e PDFs. Quando a pessoa não souber, seguir a coluna "Se ela não souber".

Ao receber prints ou PDF: olhar a imagem, listar as cores que aparecem com código hex e uma etiqueta ("verde do logo", "bege da caixa") e perguntar quais são da marca. Para fonte em print, propor as 2 fontes mais parecidas disponíveis no Figma.

## Passo 2 — Montar o plano

Seguir `references/escalas-e-contraste.md`:

1. Decidir o papel de cada cor da marca (PRIMARIO, SECUNDARIO, TERCEARIO, BG, CINZA).
2. Gerar as escalas de 6 tons para cada família trocada.
3. Calcular o contraste dos pares principais em light e dark **antes** de aplicar. Ajustar tons que não passarem e explicar o ajuste.
4. Conferir a fonte com a checagem de pesos (receita 6, só a parte de leitura).

## Passo 3 — Mostrar o resumo e pedir o "sim"

Mostrar numa tabela curta:

| O que | Garoa | Sua marca |
| --- | --- | --- |
| Cor de ação (light) | chumbo #454242 | … |
| Cor de ação (dark) | azul #37cbcf | … |
| Fundo | marfim #f9f8eb | … |
| Fonte de títulos | Inter | … |
| Fonte de texto | IBM Plex Mono | … |
| Cantos | 8px | … |
| Contraste | todos passam | todos passam / ajustes feitos |

Depois, se possível, mostrar uma prévia: um botão primary, um card e um campo com as cores novas (pode ser em texto, com os hex, se não der para desenhar). Perguntar: "Posso criar seu DS com isso?". Só seguir com um sim.

## Passo 4 — Aplicar

Na cópia, nesta ordem, mostrando o progresso em uma linha por etapa:

1. Cores: receita 2, uma família por vez. Ao trocar PRIMARIO, a receita já recalcula `PRIMARIO/400-25`, a cor das sombras.
2. Fonte: receita 6 (títulos e, se mudou, texto corrido).
3. Cantos: receita 7, se a pessoa escolheu algo diferente do padrão.
4. Nome: trocar "Garoa" pelo nome do DS nos textos da página `00 · Capa` (carregar a fonte antes de editar texto). O nome do arquivo a pessoa troca à mão: explicar onde.
5. Logo: se a pessoa colou o SVG do logo, usar `figma.createNodeFromSvg` numa página `36 · Logo` nova e ajustar os tokens `logo/*` para as cores da marca. Se não, deixar a orientação para trocar depois. As páginas `35 · Marca` e `36 · Logo Garoa` são do autor do Garoa: perguntar se pode apagá-las.
6. ID do Google Tag Manager: se a pessoa tiver, registrar na página de decisões.

## Passo 5 — Conferir e entregar

1. Rodar a receita 4 (contraste) e a varredura (receita 3) em 2 ou 3 componentes (Button, Input, Card).
2. Tirar capturas do Button e do Card em light e dark (receita 5) e mostrar.
3. Registrar as decisões da marca (receita 8): cores e papéis, fontes, cantos, plano do Figma.
4. Encerrar com uma lista curta do que a pessoa faz agora:
   - renomear o arquivo;
   - no plano pago: publicar a biblioteca (Assets → Publicar);
   - revisar as telas de exemplo e trocar os textos pelo tema da empresa;
   - usar `/validar` em qualquer componente que desenhar e `/novo-componente` quando faltar algo.
5. Não falar de GitHub nem de código agora. Isso vem depois que o DS estiver estável.

## Se algo der errado

- Fonte sem algum peso: oferecer a mais parecida que tenha os 4 pesos ou manter a do Garoa.
- Cor da marca sem contraste: mantê-la em detalhes (bordas, ícones grandes, ilustrações) e propor um tom mais escuro para texto e botões.
- Erro do Figma no meio da troca: parar, contar o que já foi aplicado e o que falta, e perguntar se tenta de novo.
