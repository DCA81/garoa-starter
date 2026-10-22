# Montagem do DS a partir da planta do Garoa

Scripts que o `/nova-marca` envia ao Figma (`use_figma`) para criar o design system num arquivo novo, sem duplicar o Garoa. Testados em 22/10/2026 num arquivo novo: 453 variáveis, 15 estilos de texto, 4 sombras, Icon (56), Button (18), Input (36), Tag (5) e Card, com as mesmas medidas do Garoa 0.6.6, nenhum valor solto e contraste aprovado.

| Ordem | Arquivo | O que faz | Como enviar |
| --- | --- | --- | --- |
| 1 | `01-variaveis.js` + `dados-variaveis.txt` | 7 coleções de variáveis com modos Light/Dark e Mobile/tablet/Desktop | Colocar o conteúdo do .txt no lugar do marcador entre crases |
| 2 | `02-estilos.js` | 15 estilos de texto e 4 sombras ligados às variáveis | Como está |
| 3 | `00-ajudantes.js` + `10-icon.js` | Icon, 56 variantes (fonte Material Symbols Rounded) | Os dois juntos, nessa ordem |
| 4 | `00-ajudantes.js` + `11-button.js` | Button, 18 variantes, 51px de altura, anel de foco a 4px | Os dois juntos |
| 5 | `00-ajudantes.js` + `12-input.js` | Input, 36 variantes | Os dois juntos |
| 6 | `00-ajudantes.js` + `13-tag.js` | Tag, 5 tons | Os dois juntos, com o texto de exemplo do negócio |
| 7 | `00-ajudantes.js` + `14-card.js` | Card com Button por dentro | Os dois juntos, com os textos de exemplo do negócio |
| 8 | `20-marca.js` | Cores, fontes, capa, página de decisões e ordem das páginas | Preencher `MARCA` com o plano aprovado |
| 9 | `30-conferir.js` | Varredura de valores soltos, contraste e captura em claro e escuro | Como está |

Todos podem ser repetidos com segurança. O formato de `dados-variaveis.txt`: `## código|coleção|modos` e uma linha por variável `nome|tipo|escopos|valor por modo`. Tipos: C cor, F número, S texto. Escopo `*` = todas as cores. Valores com `@` são apelidos (`@P:color/BG/50`). Códigos: P Primitivos, S Semânticos, TP/TM tipografia, TR tipografia responsiva, CS cores semânticas, C componentes.

Limitações conhecidas: as descrições das variáveis não são copiadas (para o envio ficar menor); as variantes `fill=on` do Icon são iguais às `fill=off`, como no Garoa.
