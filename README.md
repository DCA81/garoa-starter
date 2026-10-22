# Garoa Starter

Crie o design system da sua empresa no Figma, mesmo sem experiência, a partir do **Garoa**, o design system de Daniel Costa.

Você responde algumas perguntas (ou manda prints da sua marca), o Claude mostra um resumo e, com o seu "sim", cria um arquivo novo nos seus rascunhos do Figma com o design system pronto: cores, tipografia, sombras e os componentes Icon, Button, Input, Tag e Card, já com a sua marca, em claro e escuro. Depois, ele avalia os componentes que você desenhar e cria componentes novos a partir de uma descrição.

## O que vem no plugin

| Comando | O que faz |
| --- | --- |
| `/nova-marca` | 8 perguntas simples → resumo → cria um arquivo novo no seu Figma com o DS da sua marca, em claro e escuro e com contraste conferido |
| `/validar` | Avalia um componente em 9 pontos (tokens, estados, temas, construção, acessibilidade, analytics, duplicidade, decisões, documentação) e oferece corrigir |
| `/novo-componente` | Cria um componente a partir de uma descrição, usando só os tokens e componentes do seu DS |

Ele também traz o **Guardião do Garoa**: as regras e a estrutura do Garoa, que o Claude consulta sozinho sempre que você fala do seu DS.

## Antes de começar

1. **Plano pago do Claude** (Pro, Max, Team ou Enterprise). Plugins não funcionam no plano gratuito.
2. **Figma conectado ao Claude.** O plugin já traz a conexão; na primeira vez, o Claude pede para você entrar na sua conta do Figma.
3. **Fonte de ícones instalada:** os ícones do DS usam a fonte gratuita **Material Symbols Rounded**, do Google Fonts. O plugin confere se ela existe no seu Figma e, se faltar, ensina a instalar em 5 passos.

### Plano do Figma: o que muda

| | Plano gratuito (Starter) | Plano pago (Professional ou acima) |
| --- | --- | --- |
| Modo claro | Sim | Sim |
| **Modo escuro** | **Não** (o Figma gratuito só permite um modo por coleção de variáveis) | Sim |
| Tamanhos de texto | Só desktop | Celular, tablet e desktop |
| Usar como biblioteca em outros arquivos | Não | Sim |

No plano gratuito o plugin avisa antes de começar e cria o DS só no modo claro. Se a empresa assinar o plano pago depois, peça ao Claude "ativar o modo escuro do meu DS" e ele acrescenta o escuro sem refazer o resto.

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

Não é preciso duplicar nenhum arquivo: o plugin cria o arquivo novo nos seus rascunhos. Ele nunca altera nada sem mostrar antes e pedir sua confirmação.

## O que fica para depois

Documentação no GitHub e código React vêm quando o DS estiver estável no Figma (veja o Playbook do Garoa).

## Privacidade

O plugin não coleta nem envia dados para o autor. Ele só usa a sua conexão com o Figma, que segue a [política de privacidade do Figma](https://www.figma.com/legal/privacy/).

## Licença

MIT © 2026 Daniel da Costa Alexandre. Você pode usar, copiar e modificar, inclusive para fins comerciais, mantendo o crédito. Veja o arquivo [LICENSE](LICENSE).

## Links

- Site do Garoa: https://garoa-design-system.vercel.app
- Versão: 0.2.1
