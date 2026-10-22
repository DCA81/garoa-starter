# Garoa Starter

Crie o design system da sua empresa no Figma, mesmo sem experiência, a partir do **Garoa**, o design system de Daniel Costa.

Você responde algumas perguntas (ou manda prints da sua marca), o Claude mostra um resumo e, com o seu "sim", troca cores, fonte, cantos e logo numa cópia do Garoa. Depois, ele avalia os componentes que você desenhar e cria componentes novos a partir de uma descrição.

## O que vem no plugin

| Comando | O que faz |
| --- | --- |
| `/nova-marca` | 8 perguntas simples → resumo → cria o DS da sua marca na sua cópia do Garoa, com light e dark e contraste conferido |
| `/validar` | Avalia um componente em 9 pontos (tokens, estados, temas, construção, acessibilidade, analytics, duplicidade, decisões, documentação) e oferece corrigir |
| `/novo-componente` | Cria um componente a partir de uma descrição, usando só os tokens e componentes do seu DS |

Ele também traz o **Guardião do Garoa**: as regras e a estrutura do Garoa, que o Claude consulta sozinho sempre que você fala do seu DS.

## Antes de começar

1. **Plano pago do Claude** (Pro, Max, Team ou Enterprise). Plugins não funcionam no plano gratuito.
2. **Figma conectado ao Claude.** O plugin já traz a conexão; na primeira vez, o Claude pede para você entrar na sua conta do Figma.
3. **Fonte de ícones instalada:** os ícones do DS usam a fonte gratuita **Material Symbols Rounded**, do Google Fonts. O plugin confere se ela existe no seu Figma e, se faltar, ensina a instalar em 5 passos.
4. **Uma cópia do Garoa.** Abra o link do Garoa que você recebeu, clique em **Duplicar** e guarde o link da sua cópia.

Plano do Figma: no gratuito, o DS funciona dentro de um único arquivo. Para usá-lo como biblioteca em outros arquivos, é preciso um plano pago do Figma.

## Instalar

- **No Claude (app ou site):** Personalizar → Plugins → adicionar a loja `DCA81/garoa-starter` e instalar o **Garoa Starter**. Ou envie o arquivo `.plugin` que você recebeu.
- **No Claude Code:**

```
/plugin install garoa-starter --marketplace DCA81/garoa-starter
```

## Como usar

1. Digite `/nova-marca` e siga a conversa.
2. Desenhou um componente? Copie o link dele e digite `/validar`.
3. Faltou algo? Digite `/novo-componente` e descreva o que precisa.

O Claude nunca altera nada sem mostrar antes e pedir sua confirmação, e nunca mexe no arquivo original do Garoa.

## O que fica para depois

Documentação no GitHub e código React vêm quando o DS estiver estável no Figma (veja o Playbook do Garoa).

## Privacidade

O plugin não coleta nem envia dados para o autor. Ele só usa a sua conexão com o Figma, que segue a [política de privacidade do Figma](https://www.figma.com/legal/privacy/).

## Licença

MIT © 2026 Daniel da Costa Alexandre. Você pode usar, copiar e modificar, inclusive para fins comerciais, mantendo o crédito. Veja o arquivo [LICENSE](LICENSE).

## Links

- Site do Garoa: https://garoa-design-system.vercel.app
- Versão: 0.1.3
