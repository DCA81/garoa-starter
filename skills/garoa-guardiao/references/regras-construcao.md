# Regras de construção (herdadas do Garoa)

## Tokens
- Cores, espaços, cantos, bordas e sombras vêm de variáveis. Nunca um valor digitado à mão.
- Dentro de um componente, usar os tokens dele (`button/*`, `card/*`…). Fora, os semânticos (`color/text/primary`, `space/stack`, `radius/default`).
- Nunca ligar um componente direto a um primitivo (`color/PRIMARIO/500`, `space/16`). Exceção: tokens de logo.
- Nome de token novo: `componente/parte/estado`, em inglês, minúsculas e hífen (ex.: `card/border-hover`), com descrição em português.

## Estrutura
- Auto Layout em tudo, com espaçamentos ligados a tokens.
- Componentes com sombra **não** usam "Clip content" (recortar conteúdo), porque corta a sombra.
- O tamanho de um componente não muda entre estados. Se a borda muda de espessura entre estados (como no Button), ela não entra no tamanho: desligar "incluir traço no layout" (strokesIncludedInLayout). Borda de espessura fixa (Input, Tag, Card) pode entrar no tamanho.
- Variantes nomeadas como propriedade=valor: `variant=primary, state=hover`.
- Camadas com nomes claros (`Button/Control`, `Input/Focus`), nunca "Frame 123".

## Estados obrigatórios
- Clicáveis: default, hover, focus, press, disabled. Quando fizer sentido: selected, loading, erro.
- Campos: default, filled, hover, focus, disabled, e os status success, info, warning, error.

## Light e dark
- O tema muda pelo modo da coleção `Color · Semânticos`. Nunca criar cópias de componentes para o dark.
- Conferir os dois modos antes de aprovar.

## Acessibilidade
- Texto com contraste mínimo de 4,5:1; bordas, ícones e anel de foco com 3:1.
- Cores de status só em ícones, bordas e pontos. O texto usa `color/text/primary`.
- Todo clicável tem estado de foco visível: anel de 2px, a 4px do componente, borda por dentro no Figma, tokens `*-focus-ring`, raio = raio do componente + 4.
- Área de toque mínima de 44px (`space/target`).
- Link sempre sublinhado. Ícone sozinho precisa de rótulo ou Tooltip.

## Escolha do componente certo
| Situação | Use |
| --- | --- |
| Ação principal | Button primary (uma por área) |
| Navegar para outra página | Link |
| Até 5 opções, uma escolha | Radio |
| Mais de 5 opções, uma escolha | Select |
| Várias escolhas | Checkbox |
| Ligar algo com efeito imediato | Switch |
| Texto longo | Textarea |
| Aviso fixo | Alert |
| Confirmação temporária | Toast |
| Dica de uma linha | Tooltip |
| Explicação com ações | Popover |
| Decisão que bloqueia a tela | Modal |
| Status curto | Tag |
| Seções do mesmo conteúdo | Tabs |
| Nada disso resolve | Composição com Surface, avisando que é nova |

## Documentação de cada componente
Na descrição do componente (campo Description do Figma): para que serve, quando usar e quando não usar, variantes, tokens usados, como o leitor de tela anuncia, evento de analytics se for clicável.
