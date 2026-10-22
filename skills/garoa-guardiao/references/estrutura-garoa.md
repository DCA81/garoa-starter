# Estrutura do Garoa

Retrato do Garoa versão 0.6.6 (outubro de 2026). Use para saber o que existe e o que trocar.

## Coleções de variáveis

| Coleção | Modos | O que guarda |
| --- | --- | --- |
| `Primitivos` | Valor | Cores cruas, espaçamentos, raios, bordas, sombras |
| `Semânticos` | Mobile, tablet, Desktop | Espaçamentos de uso (`space/inset`, `space/stack`…), ícones, raios de uso, área de toque |
| `Typography · Primitivos` | Valor | `font/family/brand` (Inter), pesos, tamanhos, alturas de linha |
| `Typography · Mono Primitivos` | Valor | `font/family/brand` (IBM Plex Mono) e escala do texto corrido |
| `Typography · Responsivo` | Mobile, tablet, Desktop | Tamanhos de títulos por tela, grid |
| `Color · Semânticos` | Light, Dark | Papéis de cor (`color/text/primary`, `color/action/primary`…) |
| `Componentes` | Valor | 254 tokens por componente (`button/*`, `input/*`, `card/*`…) que apontam para os semânticos |

## Famílias de cor primitivas (camada de marca)

Cada família tem 6 tons, de 50 a 500. Os nomes ficam; os valores mudam por marca.

| Família | Papel no Garoa | Valores no Garoa (50 → 500) |
| --- | --- | --- |
| `color/BG` | Fundos claros | #f9f8eb · #f4f3e6 · #ebeadc · #e2e0ce · #dad9c8 · #cdccba |
| `color/PRIMARIO` | Texto e ação no light (500 é o mais escuro). Tem também `400-25`: o tom 400 com 25% de opacidade, usado nas sombras | #968e8e · #787070 · #6c6565 · #625c5c · #534e4e · #454242 (+ #534e4e40) |
| `color/SECUNDARIO` | Ação e detalhes no dark | #46faff · #40eef3 · #39e7eb · #38dfe3 · #35d5d9 · #37cbcf |
| `color/TERCEARIO` | Destaques | #f0c8c2 · #e5b6af · #e2aca4 · #e0a399 · #e3998d · #e68f81 |
| `color/CINZA` | Neutros e superfícies do dark (50 → 900) | 10 tons, de #e5e7ea a #131927 |
| `color/sucesso`, `color/erro`, `color/alerta` | Status (camada de sistema) | 6 tons cada |
| `color/branco`, `color/preto`, `color/preto/40`, `color/preto/60` | Fixos | Não trocar |

## Como os semânticos usam as famílias

| Semântico | Light | Dark |
| --- | --- | --- |
| `color/bg/default`, `color/surface/base` | BG/50 | CINZA/900 |
| `color/text/primary`, `color/icon/default` | PRIMARIO/500 | BG/50 |
| `color/text/secondary` | CINZA/600 | CINZA/200 |
| `color/text/inverse` | BG/50 | CINZA/900 |
| `color/action/primary`, `color/border/action` | PRIMARIO/500 | SECUNDARIO/500 |
| `color/action/hover` | CINZA/900 | SECUNDARIO/300 |
| `color/surface/raised` | branco | CINZA/800 |
| `color/surface/overlay` | branco | CINZA/700 |
| `color/surface/modal` | branco | CINZA/600 |
| `color/surface/hover`, `color/bg/hover` | BG/200 | CINZA/600 e CINZA/700 |
| `color/border/default` | CINZA/100 | CINZA/400 |
| `color/terciario/default` | TERCEARIO/500 | TERCEARIO/300 |
| `shadow/color` | PRIMARIO/400-25 | PRIMARIO/400-25 |

Consequência: trocar os valores de PRIMARIO muda texto e ação no light; trocar SECUNDARIO muda a ação no dark; trocar BG muda fundos e o texto do dark.

## Tipografia

- Família principal: `font/family/brand` em `Typography · Primitivos` (Inter). Usada em títulos, botões e rótulos.
- Família do texto corrido: `font/family/brand` em `Typography · Mono Primitivos` (IBM Plex Mono).
- Os 15 estilos de texto puxam a família desses tokens. Estilos de peso usados: Regular, Medium, Semi Bold, Bold. Uma fonte nova precisa ter esses pesos com esses nomes no Figma.
- Estilos: Display, Heading/H1–H4, Body/LG, Body/MD (Regular e Medium), Body/SM (Regular e Medium), Label/MD, Label/SM, Caption, Link/MD, Link/SM.

## Raios

- Primitivos: `radius/4`, `radius/8`, `radius/12`, `radius/full`.
- Semânticos: `radius/sm` → 4, `radius/default` → 8, `radius/lg` → 12.
- Anéis de foco: `button/focus-ring-radius` e `input/focus-ring-radius` apontam para `radius/lg`. Regra: raio do anel = raio do componente + `focus-ring-offset` (4). Ao mudar `radius/default`, ajustar os dois tokens de anel.

## Sombras

Estilos `shadow/100` a `shadow/400`, todos com a cor ligada a `shadow/color` → `color/PRIMARIO/400-25`. Ao trocar PRIMARIO, recalcular também o `400-25` (novo 400 com 25% de opacidade); a receita 2 já faz isso.

## Fonte de ícones

Os ícones são letras da fonte **Material Symbols Rounded** (componente Icon). Ela precisa existir no Figma da pessoa; conferir com a receita 9.

## Páginas do arquivo

`00 · Capa`, `01 · Comece aqui`, `02 · Changelog`, `10 · Cores`, `11 · Tipografia`, `12 · Espaçamento e grid`, `13 · Bordas e sombras`, `14 · Ícones`, `15 · Radius`, `20 · Button` a `35 · Link` (um componente por página), `35 · Marca` e `36 · Logo Garoa` (marca do autor, trocar ou remover com confirmação).

## Componentes (16 páginas)

Button, Input, Card, Tag, Modal, Surface e Popover, Select (com Option), Checkbox, Radio, Switch, Textarea, Alert, Toast, Tooltip, Tabs, Link. Tokens de logo: `logo/primary`, `logo/secondary`, `logo/tertiary`, `logo/neutral` apontam direto para primitivos (camada de marca).

## Onde registrar decisões

Se não existir, criar uma página `03 · Decisões` com uma tabela simples: data, tema, decisão, tipo (Marca ou Sistema). Adicionar uma linha por decisão aprovada.
