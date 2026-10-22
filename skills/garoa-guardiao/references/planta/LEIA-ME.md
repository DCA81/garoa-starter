# Planta do Garoa (kit base)

Exportada do arquivo do Garoa 0.6.2 em 20/10/2026 e atualizada para a 0.6.6 (sombra ligada a token, altura do Button e anel de foco do Button igual ao do Input), somente leitura. É a "planta" que o plugin segue para montar o DS num arquivo novo, sem a pessoa duplicar o Garoa.

## Arquivos

| Arquivo | O que tem | Quantidade |
| --- | --- | --- |
| `fundacoes.json` | Páginas, 6 coleções de variáveis (exceto Componentes), estilos de texto e de sombra | 200 variáveis, 15 estilos de texto, 4 sombras |
| `tokens-componentes.json` | Coleção `Componentes` | 254 variáveis |
| `componente-icon.json` | Icon (glifo Material Symbols Rounded) | 56 variantes |
| `componente-button.json` | Button | 18 variantes |
| `componente-input.json` | Input | 36 variantes |
| `componente-card.json` | Card (usa Button por dentro) | 1 componente |
| `componente-tag.json` | Tag | 5 variantes |

Ordem de montagem: fundações → tokens de componente → Icon → Button → Input → Tag → Card (Card depende de Button; Button e Input dependem de Icon).

## Formato das variáveis

Cada variável é uma lista: `[nome, tipo, escopos, valores por modo, descrição]`.
Valores que começam com `@` são apelidos: `@Primitivos::color/BG/50` aponta para a variável `color/BG/50` da coleção `Primitivos`.

## Formato dos componentes (chaves curtas)

| Chave | Significado |
| --- | --- |
| `t` | Tipo: `COMP` componente, `FRAM` frame, `TEXT` texto, `INST` instância, `ELLI` elipse |
| `n` | Nome da camada ou da variante |
| `wh` | Largura e altura |
| `xy` | Posição (só quando o pai não tem Auto Layout) |
| `sz` | Dimensionamento no Auto Layout do pai: 1ª letra horizontal, 2ª vertical (`X` fixo, `H` abraça o conteúdo, `L` preenche) |
| `L` | Auto Layout: `[direção H/V, padding topo, direita, baixo, esquerda, espaço entre itens, alinhamento principal, alinhamento cruzado, quebra]` |
| `mm` | Mínimos e máximos (`minHeight`…) |
| `r` | Raio (número ou 4 cantos) |
| `f`, `s` | Preenchimentos e bordas: `[token ou hex, opacidade, visível]` |
| `sw`, `sa` | Espessura e alinhamento da borda (`I` dentro, `C` centro, `O` fora) |
| `fx` | Estilo de efeito (sombra) |
| `b` | Propriedades ligadas a variáveis: `{propriedade: "COLEÇÃO:nome"}` |
| `ch`, `ts`, `font`, `ta`, `ar` | Texto: conteúdo, estilo de texto, fonte (quando não há estilo), alinhamento, redimensionamento |
| `i` | Instância: componente (`c`), variante (`v`) e propriedades (`p`) |
| `cpr` | Ligação a propriedades do componente (`visible`, `characters`) |
| `c` | Filhos |

Siglas das coleções em `b`, `f` e `s`: `C` Componentes, `S` Semânticos, `CS` Color · Semânticos, `P` Primitivos, `TP` Typography · Primitivos, `TM` Typography · Mono Primitivos, `TR` Typography · Responsivo.

## Conferência feita na exportação

- Todas as variantes exportadas (56 + 18 + 36 + 1 + 5).
- Nenhuma cor solta nos componentes (as únicas cores em hex são fundos transparentes de variante, com opacidade 0).
- Nenhuma ligação direta a primitivo nos componentes.
- Todas as referências a variáveis e estilos existem nas fundações.

## Observações para a montagem

1. **Fonte dos ícones:** os glifos usam Material Symbols Rounded. Antes de montar, conferir com a receita 9 de `figma-receitas.md`; se faltar, orientar a instalação (passo 0 do `/nova-marca`).
2. **Cor das sombras (corrigido na 0.6.3):** os estilos `shadow/100` a `shadow/400` usam o token `shadow/color`, que aponta para `color/PRIMARIO/400-25`. Ao montar para outra marca, esse primitivo recebe o novo PRIMARIO/400 com 25% de opacidade.
3. **Textos de exemplo do Garoa** ("Design system Garoa", "Liderança", "Ver case") devem ser trocados pelo tema da empresa.
4. **Altura do Button (corrigido na 0.6.5):** todas as variantes medem 51px. A borda não entra no cálculo do tamanho (chave `sil: 0` = "incluir traço no layout" desligado); ao montar, use `strokesIncludedInLayout = false` em `Button/Control`.
5. **Páginas** do Garoa que não entram no kit base: Modal, Surface & Popover, Select, Checkbox, Radio, Switch, Textarea, Alert, Toast, Tooltip, Tabs, Link, Marca e Logo Garoa. Ficam para a segunda parte da exportação.
