# Checklist de validação

Aplicar item por item. Cada item tem um resultado: ok, ajustar ou não se aplica.

| # | Item | Como conferir |
| --- | --- | --- |
| 1 | Tokens | Varredura de valores soltos (receita 3): toda cor, espaçamento, raio e borda ligada a variável. Nenhuma ligação direta a primitivo (exceto logo). |
| 2 | Estados | Comparar as variantes com os estados obrigatórios de `regras-construcao.md`. |
| 3 | Temas | Capturar o componente nos modos Light e Dark (receita 5) e olhar se algo some ou perde contraste. |
| 4 | Construção | Auto Layout em todos os frames; sem "Clip content" em quem tem sombra; tamanho igual em todos os estados (comparar a altura das variantes); nomes de camadas e variantes claros. |
| 5 | Acessibilidade | Contraste dos pares texto/fundo e borda/fundo nos dois modos (receita 4); anel de foco presente e com raio correto; altura mínima de 44px em clicáveis. |
| 6 | Analytics | Se for clicável, a descrição informa o evento (`ds_interaction`) e um id de exemplo em kebab-case. |
| 7 | Duplicidade | Procurar componente parecido no arquivo. Se existir, sugerir virar variante dele. |
| 8 | Decisões | Ler a página de decisões e apontar qualquer conflito. |
| 9 | Documentação | Descrição do componente preenchida (ver `regras-construcao.md`). |

## Veredito

- **Aprovado:** todos os itens ok ou não se aplica.
- **Aprovado com ajustes:** só problemas que não impedem o uso (descrição faltando, nome de camada, estado secundário).
- **Reprovado:** contraste abaixo do mínimo, falta de foco visível, cores ou raios soltos em quantidade, componente duplicado.

## Formato do relatório (para a pessoa)

```
**Veredito: Aprovado com ajustes**

O que está certo
- (2 ou 3 pontos curtos)

O que ajustar
1. (item do checklist) — o problema em uma frase — por que importa — a sugestão
2. ...

Decisões novas para registrar
- (se houver)

Quer que eu corrija os itens 1 e 2 pra você?
```

Escrever cada ajuste em linguagem de designer. Exemplo bom: "o verde foi colado direto, não pelo token `button/primary/bg` — se a marca mudar, este botão não acompanha". Exemplo ruim: "fill sem boundVariables.color".
