// Garoa Starter · montagem 02: estilos de texto (15) e de sombra (4), ligados às variáveis.
// Rodar depois da montagem 01. Pode rodar de novo com segurança.
// Texto: nome | família (TP = títulos, TM = texto corrido) | peso | tamanho | altura de linha | sublinhado
const TEXTOS = `Display|TP|bold|TR:type/display/size|TR:type/display/line-height|
Heading/H1|TP|semibold|TR:type/h1/size|TR:type/h1/line-height|
Heading/H2|TP|semibold|TR:type/h2/size|TR:type/h2/line-height|
Heading/H3|TP|semibold|TR:type/h3/size|TR:type/h3/line-height|
Heading/H4|TP|semibold|TR:type/h4/size|TR:type/h4/line-height|
Body/LG|TP|regular|TP:font/size/18|TP:font/line-height/27|
Body/MD/Medium|TM|medium|TM:font/size/16|TM:font/line-height/24|
Body/SM/Medium|TM|medium|TM:font/size/14|TM:font/line-height/21|
Label/MD|TP|medium|TP:font/size/18|TP:font/line-height/16|
Label/SM|TP|medium|TP:font/size/12|TP:font/line-height/16|
Caption|TP|regular|TP:font/size/12|TP:font/line-height/16|
Body/MD/Regular|TM|regular|TM:font/size/16|TM:font/line-height/24|
Body/SM/Regular|TM|regular|TM:font/size/14|TM:font/line-height/21|
Link/MD|TM|regular|TM:font/size/16|TM:font/line-height/24|U
Link/SM|TM|regular|TM:font/size/14|TM:font/line-height/21|U`;
const SOMBRAS = [['shadow/100', 'P:shadow/blur/100'], ['shadow/200', 'P:shadow/blur/200'], ['shadow/300', 'P:shadow/blur/300'], ['shadow/400', 'P:shadow/blur/400']];
const COL = { P: 'Primitivos', S: 'Semânticos', TP: 'Typography · Primitivos', TM: 'Typography · Mono Primitivos', TR: 'Typography · Responsivo', CS: 'Color · Semânticos', C: 'Componentes' };
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
const v = ref => { const [cod, ...r] = ref.split(':'); const col = cols.find(c => c.name === COL[cod]); const x = vars.find(y => y.variableCollectionId === col.id && y.name === r.join(':')); if (!x) throw new Error('variável não encontrada: ' + ref); return x; };
const valor = x => { const col = cols.find(c => c.id === x.variableCollectionId); let val = x.valuesByMode[col.modes[0].modeId], i = 0; while (val && val.type === 'VARIABLE_ALIAS' && i++ < 10) { const t = vars.find(y => y.id === val.id); const tc = cols.find(c => c.id === t.variableCollectionId); val = t.valuesByMode[tc.modes[0].modeId]; } return val; };
// Escolhe o nome de estilo da fonte pelo peso (Figma escreve "Semi Bold" ou "SemiBold" conforme a fonte)
const fontes = await figma.listAvailableFontsAsync();
const NOMES = { 400: ['Regular'], 500: ['Medium'], 600: ['Semi Bold', 'SemiBold'], 700: ['Bold'] };
const estiloDe = (fam, peso) => { const e = fontes.filter(f => f.fontName.family === fam).map(f => f.fontName.style); return NOMES[peso].find(n => e.includes(n)); };
const existentes = await figma.getLocalTextStylesAsync();
const criados = [], avisos = [];
for (const linha of TEXTOS.split('\n')) {
  const [nome, fam, peso, tam, alt, sub] = linha.split('|');
  const famVar = v(fam + ':font/family/brand');
  const pesoVar = v(fam + ':font/weight/' + peso);
  const familia = valor(famVar), pesoNum = valor(pesoVar);
  const estilo = estiloDe(familia, pesoNum);
  if (!estilo) { avisos.push(`${nome}: a fonte ${familia} não tem o peso ${pesoNum}`); continue; }
  await figma.loadFontAsync({ family: familia, style: estilo });
  let s = existentes.find(x => x.name === nome);
  if (!s) { s = figma.createTextStyle(); s.name = nome; }
  s.fontName = { family: familia, style: estilo };
  s.fontSize = valor(v(tam));
  s.lineHeight = { unit: 'PIXELS', value: valor(v(alt)) };
  s.letterSpacing = { unit: 'PIXELS', value: 0 };
  s.textDecoration = sub === 'U' ? 'UNDERLINE' : 'NONE';
  s.setBoundVariable('fontFamily', famVar);
  s.setBoundVariable('fontWeight', pesoVar);
  s.setBoundVariable('fontSize', v(tam));
  s.setBoundVariable('lineHeight', v(alt));
  s.setBoundVariable('letterSpacing', v(fam + ':font/letter-spacing/normal'));
  criados.push(nome);
}
const efeitos = await figma.getLocalEffectStylesAsync();
const corSombra = v('CS:shadow/color'), deslocY = v('P:shadow/offset-y');
for (const [nome, blur] of SOMBRAS) {
  let s = efeitos.find(x => x.name === nome);
  if (!s) { s = figma.createEffectStyle(); s.name = nome; }
  let e = { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.25 }, offset: { x: 0, y: 4 }, radius: 4, spread: 0, visible: true, blendMode: 'NORMAL' };
  e = figma.variables.setBoundVariableForEffect(e, 'radius', v(blur));
  e = figma.variables.setBoundVariableForEffect(e, 'offsetY', deslocY);
  e = figma.variables.setBoundVariableForEffect(e, 'color', corSombra);
  s.effects = [e];
  criados.push(nome);
}
return { criados: criados.length, avisos };
