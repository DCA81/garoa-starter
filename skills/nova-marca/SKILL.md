---
name: nova-marca
description: >
  This skill should be used when the user wants to create their company's design system
  from Garoa, types "/nova-marca", or says "criar meu design system", "adaptar o Garoa
  para minha marca", "trocar as cores e a fonte do DS", "começar um DS novo", "rebrand
  the design system". It interviews a non-developer designer with 8 simple questions
  (accepting screenshots and brand PDFs), shows a summary for approval, then creates a
  new Figma file in their drafts and builds the design system there from the Garoa
  blueprint (variables, text and shadow styles, Icon, Button, Input, Tag, Card) with
  the company's colors and fonts, checking contrast in light and dark.
metadata:
  version: "0.2.0"
---

# /nova-marca — criar o DS da empresa a partir do Garoa

Antes de tudo, carregar a skill `garoa-guardiao` e seguir as regras dela. A pessoa não é programadora: uma pergunta por vez, linguagem simples, nada aplicado sem um "sim".

## Passo 0 — Preparar

1. Dar boas-vindas em 2 frases: o que vai acontecer ("vou te fazer 8 perguntas e, no fim, eu crio um arquivo novo nos seus rascunhos do Figma com o seu DS pronto") e quanto tempo leva (cerca de 15 minutos de conversa e alguns minutos de montagem).
2. Conferir se a conexão com o Figma está ativa (tentar `whoami`). Se não estiver, explicar como conectar o Figma ao Claude em 3 passos e parar.
3. Perguntar qual o plano do Figma (gratuito ou pago) e avisar com clareza, antes da entrevista, o que muda:
   - **Plano pago (Professional ou acima):** DS completo, com modo claro e escuro, tamanhos de texto para celular, tablet e desktop, e uso como biblioteca em outros arquivos.
   - **Plano gratuito (Starter):** o Figma só permite um modo por coleção de variáveis. Por isso o DS **não terá modo escuro** e terá **um tamanho de texto só (desktop)**. Funciona dentro de um único arquivo e não vira biblioteca. Dizer assim: "No plano gratuito do Figma eu crio o seu DS só no modo claro, sem o modo escuro. Se a empresa assinar o plano pago depois, eu acrescento o escuro sem refazer nada. Quer seguir assim?"
   - Só seguir com a confirmação da pessoa. Se ela não souber o plano, seguir e deixar a montagem descobrir (passo 4.2).
4. Não é preciso duplicar o Garoa: o plugin cria o arquivo e monta tudo. Se a pessoa já tiver uma cópia do Garoa e preferir usá-la, seguir o caminho antigo (receitas 2, 6 e 7 de `figma-receitas.md` na cópia; nunca no original `PoNCxaLwAHqt2tX9DrMtkC`).
5. Usar o plano do Figma devolvido pelo `whoami`. Se houver mais de um plano (time ou organização), perguntar em qual criar o arquivo.
6. **Conferir a fonte de ícones** (receita 9, rodada em qualquer arquivo da pessoa ou logo depois de criar o arquivo novo). Os ícones do DS são letras da fonte Material Symbols Rounded; sem ela, aparecem palavras como "arrow_back" no lugar do desenho. Se faltar, recomendar a instalação antes de seguir, em passos simples:
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

## Passo 4 — Criar o arquivo e montar o DS

Os scripts ficam em `montagem/`. Cada etapa é uma chamada do `use_figma`; mostrar o progresso em uma linha por etapa ("Cores e tokens prontos", "Botões prontos"…). Carregar antes a skill `figma-use` do conector do Figma e, se existir, a `figma-create-new-file`.

1. **Criar o arquivo:** `create_new_file` com o nome "<Nome do DS>" e o plano do Passo 0, depois `create_session` com a chave do arquivo novo.
2. **Variáveis (01):** enviar o `01-variaveis.js` com o conteúdo de `dados-variaveis.txt` no lugar do marcador entre crases da linha `DADOS`. Não editar os dados à mão: a marca entra no passo 8. Se o resultado vier com `modoUnico: true`, o plano é gratuito: avisar a pessoa em uma frase ("Seu Figma é do plano gratuito, então o DS vai ficar só no modo claro, sem modo escuro") e seguir; o resto da montagem funciona igual.
3. **Estilos (02):** enviar `02-estilos.js` como está.
4. **Icon (10):** enviar `00-ajudantes.js` seguido de `10-icon.js`, num único código.
5. **Button (11):** `00-ajudantes.js` + `11-button.js`.
6. **Input (12):** `00-ajudantes.js` + `12-input.js`.
7. **Tag (13) e Card (14):** `00-ajudantes.js` + `13-tag.js`; depois `00-ajudantes.js` + `14-card.js`. Antes, trocar os textos de exemplo (`EXEMPLO_TAG` e `EXEMPLO`) por textos do negócio da pessoa (ex.: "Caixa kraft", "Embalagem sob medida").
8. **Marca e páginas (20):** preencher `MARCA` em `20-marca.js` com o plano aprovado (nome, empresa, famílias de cor trocadas, fontes e decisões) e enviar. Ele recalcula a cor da sombra, troca as fontes se tiverem os 4 pesos, cria a capa, a página de decisões e ordena as páginas.
9. **Cantos:** se a pessoa escolheu algo diferente do padrão, rodar a receita 7 de `figma-receitas.md`.
10. **Logo:** se a pessoa colou o SVG do logo, usar `figma.createNodeFromSvg` numa página `36 · Logo` e ajustar os tokens `logo/*`. Se não, deixar a orientação para trocar depois.

Se uma etapa der erro, corrigir e rodar de novo só aquela etapa: todos os scripts podem ser repetidos com segurança (reaproveitam ou recriam o que já existe). Os componentes dependem do Icon; o Card depende do Button.

## Passo 5 — Conferir e entregar

1. Enviar `30-conferir.js`: confere todas as camadas dos componentes (cores, raios e textos soltos), o contraste dos pares principais em claro e escuro e devolve uma captura do kit nos dois temas. Mostrar a captura para a pessoa. No plano gratuito, a captura e o contraste mostram só o modo claro.
2. Se aparecer valor solto ou contraste abaixo do mínimo, explicar em linguagem simples e corrigir antes de entregar.
3. As decisões principais já estão na página `03 · Decisões` (passo 8). Acrescentar as que surgirem depois com a receita 8.
4. Encerrar com uma lista curta do que a pessoa faz agora:
   - abrir o arquivo pelo link (ele está nos rascunhos do Figma);
   - no plano pago: publicar a biblioteca (Assets → Publicar);
   - no plano gratuito: lembrar que o DS está só no modo claro. Para ganhar o modo escuro depois de assinar o plano pago, pedir "ativar o modo escuro do meu DS": o Claude roda de novo `01-variaveis.js` e, em seguida, `20-marca.js` com as cores da página `03 · Decisões`;
   - por enquanto o DS tem o kit base (Icon, Button, Input, Tag, Card); os outros componentes do Garoa chegam pelo `/novo-componente`;
   - revisar as telas de exemplo e trocar os textos pelo tema da empresa;
   - usar `/validar` em qualquer componente que desenhar e `/novo-componente` quando faltar algo.
5. Não falar de GitHub nem de código agora. Isso vem depois que o DS estiver estável.

## Se algo der errado

- Fonte sem algum peso: oferecer a mais parecida que tenha os 4 pesos ou manter a do Garoa.
- Cor da marca sem contraste: mantê-la em detalhes (bordas, ícones grandes, ilustrações) e propor um tom mais escuro para texto e botões.
- Erro do Figma no meio da montagem: parar, contar o que já foi criado e o que falta, e rodar de novo só a etapa que falhou.
- Plano gratuito do Figma: a montagem segue com um modo só (claro e desktop). Nunca prometer modo escuro nesse plano.
- Fonte de ícones ausente: a montagem funciona, mas os ícones aparecem como palavras até a fonte ser instalada.
