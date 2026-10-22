# Receitas para o `use_figma`

Trechos escritos para o Garoa 0.6.2. As receitas de leitura (1, 3, 4 e a checagem de pesos da 6) foram testadas nele; depois de qualquer receita de escrita, conferir o resultado com uma captura de tela. Antes de usar, carregar a skill `figma-use` do conector do Figma. Cada script roda isolado: passar ids entre chamadas como texto. Nunca rodar receitas de escrita no arquivo original do Garoa (`PoNCxaLwAHqt2tX9DrMtkC`).

## 1. Inventário (leitura)

```js
const cols = await figma.variables.getLocalVariableCollectionsAsync();
return {
  paginas: figma.root.children.map(p => p.name),
  colecoes: cols.map(c => ({ nome: c.name, modos: c.modes.map(m => m.name), total: c.variableIds.length })),
  ehGaroa: ['Primitivos', 'Color · Semânticos', 'Componentes'].every(n => cols.some(c => c.name === n))
};
```

## 2. Trocar os valores de uma família primitiva (escrita)

`novos` vem do plano aprovado pela pessoa. Mantém os nomes, troca só os valores.

```js
const familia = 'PRIMARIO';               // BG, PRIMARIO, SECUNDARIO, TERCEARIO ou CINZA
const novos = { 50: '#9fb8a8', 100: '#7f9e8b', 200: '#5f846e', 300: '#3f6a52', 400: '#2a5a3f', 500: '#1f4a33' };
const toRgb = h => ({ r: parseInt(h.slice(1,3),16)/255, g: parseInt(h.slice(3,5),16)/255, b: parseInt(h.slice(5,7),16)/255 });
const col = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === 'Primitivos');
const vars = await figma.variables.getLocalVariablesAsync('COLOR');
const alterados = [];
for (const [tom, hex] of Object.entries(novos)) {
  const v = vars.find(x => x.variableCollectionId === col.id && x.name === `color/${familia}/${tom}`);
  if (!v) continue;
  v.setValueForMode(col.modes[0].modeId, toRgb(hex));
  alterados.push(v.name);
}
// Sombra: PRIMARIO/400-25 = o novo PRIMARIO/400 com 25% de opacidade
if (familia === 'PRIMARIO' && novos[400]) {
  const s = vars.find(x => x.variableCollectionId === col.id && x.name === 'color/PRIMARIO/400-25');
  if (s) { s.setValueForMode(col.modes[0].modeId, Object.assign(toRgb(novos[400]), { a: 0.25 })); alterados.push(s.name); }
}
return { alterados };
```

## 3. Varredura de valores soltos num componente (leitura)

`ALVO` é o id do conjunto de variantes ou do componente (vem do link: `node-id=104-99` vira `104:99`).

```js
const alvo = await figma.getNodeByIdAsync('ALVO');
const soltos = [];
for (const n of [alvo, ...alvo.findAll(() => true)]) {
  if (n.type === 'COMPONENT_SET') continue;        // a moldura roxa do Figma não conta
  const bv = n.boundVariables || {};
  for (const prop of ['fills', 'strokes']) {
    const lista = n[prop]; if (!Array.isArray(lista)) continue;
    lista.forEach(p => { if (p.type === 'SOLID' && p.visible !== false && !(p.boundVariables && p.boundVariables.color) && !(prop === 'fills' && n.fillStyleId)) soltos.push(`${n.name}: ${prop === 'fills' ? 'preenchimento' : 'borda'} solta`); });
  }
  if (typeof n.cornerRadius === 'number' && n.cornerRadius !== 0 && !bv.topLeftRadius && !bv.cornerRadius) soltos.push(`${n.name}: raio ${n.cornerRadius}px solto`);
  for (const k of ['paddingLeft', 'paddingTop', 'itemSpacing']) if (k in n && n.layoutMode && n.layoutMode !== 'NONE' && n[k] > 0 && !bv[k]) soltos.push(`${n.name}: ${k} ${n[k]}px solto`);
  if (n.type === 'TEXT' && !n.textStyleId && !bv.fontSize) soltos.push(`${n.name}: texto sem estilo`);
  if (n.clipsContent && (n.effects || []).some(e => e.type === 'DROP_SHADOW' && e.visible !== false)) soltos.push(`${n.name}: recorta conteúdo e tem sombra`);
}
return { total: soltos.length, soltos: soltos.slice(0, 40) };
```

## 4. Contraste dos pares principais, light e dark (leitura)

```js
const sem = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === 'Color · Semânticos');
const all = await figma.variables.getLocalVariablesAsync('COLOR');
const byName = n => all.find(v => v.name === n && v.variableCollectionId === sem.id);
async function resolve(v, modeId) {
  let val = v.valuesByMode[modeId], i = 0;
  while (val && val.type === 'VARIABLE_ALIAS' && i++ < 10) { const t = await figma.variables.getVariableByIdAsync(val.id); val = t.valuesByMode[Object.keys(t.valuesByMode)[0]]; }
  return val;
}
const lum = c => { const f = x => x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
const ratio = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return Math.round(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100; };
const pares = [
  ['color/text/primary', 'color/bg/default', 4.5], ['color/text/primary', 'color/surface/raised', 4.5], ['color/text/primary', 'color/surface/modal', 4.5],
  ['color/text/secondary', 'color/bg/default', 4.5], ['color/text/inverse', 'color/action/primary', 4.5], ['color/text/inverse', 'color/action/hover', 4.5],
  ['color/border/action', 'color/bg/default', 3], ['color/action/primary', 'color/bg/default', 3]
];
const res = [];
for (const m of sem.modes) for (const [fg, bg, min] of pares) {
  const r = ratio(await resolve(byName(fg), m.modeId), await resolve(byName(bg), m.modeId));
  res.push({ modo: m.name, par: `${fg} sobre ${bg}`, contraste: r, minimo: min, ok: r >= min });
}
return res;
```

No Garoa original todos os pares passam (o mais baixo é 5,33:1).

## 5. Captura em light e dark (escrita temporária)

Cria um quadro temporário com uma instância em cada modo, tira a captura e apaga o quadro. Avisar a pessoa que é temporário.

```js
const comp = await figma.getNodeByIdAsync('ALVO');               // um COMPONENT (variante), não o conjunto
const sem = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === 'Color · Semânticos');
const quadro = figma.createAutoLayout('HORIZONTAL', { name: 'tmp-light-dark', itemSpacing: 24, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 });
quadro.x = -10000; quadro.y = -10000;
for (const modo of sem.modes) {
  const caixa = figma.createAutoLayout('VERTICAL', { name: modo.name, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 });
  caixa.setExplicitVariableModeForCollection(sem, modo.modeId);
  const bg = (await figma.variables.getLocalVariablesAsync('COLOR')).find(v => v.name === 'color/bg/default' && v.variableCollectionId === sem.id);
  caixa.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', bg)];
  caixa.appendChild(comp.createInstance());
  quadro.appendChild(caixa);
}
await quadro.screenshot({ scale: 2 });
quadro.remove();
return { ok: true };
```

## 6. Trocar a fonte da marca (escrita)

Os estilos ligam o peso por número (400, 500, 600, 700), então a fonte nova precisa ter Regular, Medium, SemiBold (ou "Semi Bold") e Bold.

```js
const familia = 'Poppins';
const colecao = 'Typography · Primitivos';      // ou 'Typography · Mono Primitivos' para o texto corrido
const fonts = await figma.listAvailableFontsAsync();
const estilos = fonts.filter(f => f.fontName.family === familia).map(f => f.fontName.style);
const pesos = { 400: ['Regular'], 500: ['Medium'], 600: ['SemiBold', 'Semi Bold'], 700: ['Bold'] };
const faltam = Object.entries(pesos).filter(([, nomes]) => !nomes.some(n => estilos.includes(n))).map(([p]) => p);
if (!estilos.length || faltam.length) return { ok: false, existe: estilos.length > 0, pesosQueFaltam: faltam };
for (const [, nomes] of Object.entries(pesos)) { const s = nomes.find(n => estilos.includes(n)); await figma.loadFontAsync({ family: familia, style: s }); }
const col = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === colecao);
const v = (await figma.variables.getLocalVariablesAsync('STRING')).find(x => x.variableCollectionId === col.id && x.name === 'font/family/brand');
v.setValueForMode(col.modes[0].modeId, familia);
return { ok: true, alterado: `${colecao} · font/family/brand = ${familia}` };
```

## 7. Mudar os raios e acertar os anéis de foco (escrita)

Exemplo para "cantos retos": padrão 4, pequeno 2, grande 8. O anel de foco fica com o raio padrão + 4.

```js
const plano = { 'radius/4': 2, 'radius/8': 4, 'radius/12': 8 };      // primitivos: nome → novo valor
const col = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === 'Primitivos');
const vars = await figma.variables.getLocalVariablesAsync('FLOAT');
for (const [nome, valor] of Object.entries(plano)) {
  const v = vars.find(x => x.variableCollectionId === col.id && x.name === nome);
  v.setValueForMode(col.modes[0].modeId, valor);
}
// Os anéis apontam para radius/lg (radius/12). Com radius/default = 4 e offset 4, o anel deve ter 8 = radius/lg novo. Conferir:
return { padrao: plano['radius/8'], anel: plano['radius/12'], regraOk: plano['radius/12'] === plano['radius/8'] + 4 };
```

Se `regraOk` der falso, ajustar o valor de `radius/12` ou ligar os tokens `button/focus-ring-radius` e `input/focus-ring-radius` a outro primitivo com o valor certo.

## 8. Registrar uma decisão (escrita)

```js
let pagina = figma.root.children.find(p => p.name === '03 · Decisões');
if (!pagina) { pagina = figma.createPage(); pagina.name = '03 · Decisões'; }
await figma.setCurrentPageAsync(pagina);
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
const ultimo = pagina.children.reduce((y, n) => Math.max(y, n.y + n.height), 0);
const t = figma.createText();
t.characters = `${new Date().toISOString().slice(0, 10)} · Cores · Ação principal usa o verde da marca (PRIMARIO/500) · Marca`;
t.y = ultimo + 16;
pagina.appendChild(t);
return { id: t.id };
```

## 9. Conferir as fontes antes de montar (leitura)

Confere a fonte de ícones (obrigatória) e as fontes da marca.

```js
const fonts = await figma.listAvailableFontsAsync();
const tem = familia => fonts.some(f => f.fontName.family === familia);
const marca = ['Inter', 'IBM Plex Mono'];             // trocar pelas fontes escolhidas na conversa
return {
  icones: { familia: 'Material Symbols Rounded', ok: tem('Material Symbols Rounded') },
  marca: marca.map(f => ({ familia: f, ok: tem(f) }))
};
```

Se `icones.ok` for falso, orientar a instalação (passo 0 do `/nova-marca`) antes de montar o kit. Sem a fonte, os ícones aparecem como palavras ("arrow_back") no lugar do desenho.

