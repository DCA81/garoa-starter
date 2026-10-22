# Escalas de cor e contraste

## 1. Dar um papel a cada cor da marca

| Família | Recebe | Regra |
| --- | --- | --- |
| PRIMARIO | A cor mais escura e marcante da marca | Vira texto, ícones e botão principal no light. O tom 500 precisa de contraste 4,5:1 sobre o fundo. |
| SECUNDARIO | Uma cor mais clara ou viva da marca | Vira a ação no dark. O tom 500 precisa de 4,5:1 com o texto inverso escuro (CINZA/900). Se a marca só tiver uma cor, usar uma versão clara da primária. |
| TERCEARIO | A cor de destaque restante | Destaques e ilustrações. Sem exigência de texto. |
| BG | O fundo da marca (branco, off-white, bege) | Se a marca não tiver, manter o marfim do Garoa ou usar um off-white neutro. |
| CINZA | Neutros | Por padrão manter os do Garoa. Trocar só se a marca tiver neutros próprios (frios ou quentes). |

## 2. Gerar 6 tons (50 a 500)

O Garoa usa 500 como o tom base da família. Para PRIMARIO, 500 é o mais escuro e 50 o mais claro; para BG e SECUNDARIO, 50 é o mais claro ou vivo.

Regra prática para PRIMARIO: 500 = a cor da marca (escurecida até passar no contraste, se precisar); 400, 300, 200, 100 e 50 = a mesma cor clareada em passos de cerca de 7, 12, 17, 24 e 32 pontos de luminosidade (HSL). Para BG: 50 = o fundo da marca; 100 a 500 = o mesmo tom escurecido em passos de cerca de 2, 5, 8, 11 e 14 pontos.

Gerar os números com cálculo, não de cabeça. Mostrar a escala para a pessoa como tabela com os hex.

## 3. Conferir o contraste antes de aplicar

Calcular com a fórmula WCAG (luminância relativa) os mesmos pares da receita 4 de `figma-receitas.md`, usando os valores novos:

| Par | Light | Dark | Mínimo |
| --- | --- | --- | --- |
| Texto principal sobre fundo | PRIMARIO/500 × BG/50 | BG/50 × CINZA/900 | 4,5 |
| Texto principal sobre modal | PRIMARIO/500 × branco | BG/50 × CINZA/600 | 4,5 |
| Texto secundário sobre fundo | CINZA/600 × BG/50 | CINZA/200 × CINZA/900 | 4,5 |
| Texto do botão | BG/50 × PRIMARIO/500 | CINZA/900 × SECUNDARIO/500 | 4,5 |
| Texto do botão no hover | BG/50 × CINZA/900 | CINZA/900 × SECUNDARIO/300 | 4,5 |
| Borda de ação sobre fundo | PRIMARIO/500 × BG/50 | SECUNDARIO/500 × CINZA/900 | 3 |

Se um par não passar: escurecer (light) ou clarear (dark) o tom em passos de 3 pontos até passar, e contar para a pessoa em uma frase: "o verde do logo ficou um pouco mais escuro nos botões para o texto branco ser legível".

## 4. Exemplo: empresa de embalagens

Marca: verde-escuro #1F5C3A, bege kraft #D9C3A0, verde claro #8BC34A.

- PRIMARIO ← verde-escuro (500 = #1F5C3A; passa 4,5:1 sobre o fundo).
- BG ← bege kraft clareado (50 = #FAF6EF), para o texto ter contraste.
- SECUNDARIO ← verde claro (no dark, o botão fica verde claro com texto quase preto).
- TERCEARIO ← o bege kraft original, para destaques.
- O verde claro sobre fundo claro não passa para texto: avisar que ele fica só em detalhes no light.
