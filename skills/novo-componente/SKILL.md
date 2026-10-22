---
name: novo-componente
description: >
  This skill should be used when the user types "/novo-componente" or asks "cria um
  componente de…", "preciso de um card de produto", "falta um componente de tabela",
  "monta um componente novo no meu DS", "create a new component" in a design system
  based on Garoa. It checks whether something similar already exists, proposes a spec
  (anatomy, variants, states, tokens) for approval, builds it in Figma using only
  existing tokens and components, documents it and runs /validar on the result.
metadata:
  version: "0.1.0"
---

# /novo-componente — criar um componente a partir de uma descrição

Antes de tudo, carregar a skill `garoa-guardiao` e seguir as regras dela. Antes de criar componentes no Figma, carregar também a skill `figma-generate-library` do conector do Figma, se estiver disponível.

## Passos

1. **Entender o pedido.** Pedir em texto: para que serve, onde aparece e um exemplo real de conteúdo. Ex.: "card de produto com foto, nome, medidas e botão de orçamento".
2. **Procurar algo parecido.** Listar os componentes do arquivo. Se um existente resolver (ou resolver com uma variante nova), sugerir isso primeiro e explicar por quê: menos peças, DS mais fácil de manter.
3. **Propor a ficha** e pedir aprovação, numa tabela curta:
   - anatomia (as partes, de cima para baixo);
   - variantes e estados (seguindo os estados obrigatórios);
   - quais componentes do DS ele usa por dentro (ex.: Button, Tag);
   - tokens: os semânticos que vai usar e os tokens novos que precisa criar (`componente/parte/estado`).
4. **Construir, só depois do "sim":**
   - criar uma página nova `NN · Nome` depois da última página de componente;
   - criar os tokens novos na coleção `Componentes`, apontando para semânticos, com descrição em português e escopo definido;
   - montar com Auto Layout, ligando toda cor, espaço, raio e borda a tokens;
   - usar instâncias dos componentes existentes por dentro, nunca cópias desanexadas;
   - criar as variantes como conjunto (`propriedade=valor`);
   - componentes com sombra sem "Clip content";
   - preencher a descrição (para que serve, quando usar, variantes, tokens, leitor de tela, analytics);
   - desenhar um exemplo de uso ao lado, com o conteúdo real que a pessoa deu.
5. **Mostrar** uma captura em light e dark.
6. **Validar.** Rodar o `/validar` no componente criado e corrigir o que aparecer antes de entregar.
7. **Registrar** na página de decisões: componente criado, tokens novos, motivo.

## Limites

- Não criar componentes que dupliquem os do DS só com outra cor ou tamanho: isso vira variante.
- Se o pedido for uma tela inteira, explicar a diferença (componente é a peça; tela é a montagem) e oferecer montar a tela com os componentes existentes.
- Se precisar de ícone, usar os ícones já usados no DS. Não desenhar ícones novos.
