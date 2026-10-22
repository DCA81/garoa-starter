// Garoa Starter · montagem 20: aplica a marca da empresa e organiza as páginas.
// Preencher MARCA com o plano aprovado pela pessoa. Famílias de cor ausentes ficam com os valores do Garoa.
const MARCA = {
  nome: 'Verde DS',
  empresa: 'Embalagens Verdes',
  cores: {
    PRIMARIO: { 50: '#58c789', 100: '#3eb874', 200: '#359d63', 300: '#2e8a57', 400: '#28774b', 500: '#1f5c3a' },
    BG: { 50: '#faf6ef', 100: '#f8f2e7', 200: '#f4ebdc', 300: '#f0e5d0', 400: '#eddec4', 500: '#e9d7b9' },
    SECUNDARIO: { 50: '#b0d683', 100: '#a8d278', 200: '#a1ce6c', 300: '#9acb61', 400: '#92c755', 500: '#8bc34a' },
    TERCEARIO: { 50: '#efe6d7', 100: '#eadfcc', 200: '#e6d8c1', 300: '#e2d1b6', 400: '#ddcaab', 500: '#d9c3a0' },
  },
  fonteTitulos: null,   // ex.: 'Poppins' (precisa ter Regular, Medium, Semi Bold/SemiBold e Bold)
  fonteTexto: null,     // ex.: 'Roboto Mono'
  decisoes: ['Cores: ação principal no verde-escuro da marca (#1F5C3A); fundo bege claro (#FAF6EF)', 'Cores: verde claro (#8BC34A) só em detalhes no claro; vira a cor de ação no escuro'],
};
const rgb = h => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
const prim = cols.find(c => c.name === 'Primitivos');
const pv = nome => vars.find(v => v.variableCollectionId === prim.id && v.name === nome);
const alterados = [];
for (const [familia, tons] of Object.entries(MARCA.cores)) for (const [tom, hex] of Object.entries(tons)) {
  const v = pv(`color/${familia}/${tom}`); if (v) { v.setValueForMode(prim.modes[0].modeId, rgb(hex)); alterados.push(v.name); }
}
if (MARCA.cores.PRIMARIO && MARCA.cores.PRIMARIO[400]) { pv('color/PRIMARIO/400-25').setValueForMode(prim.modes[0].modeId, Object.assign(rgb(MARCA.cores.PRIMARIO[400]), { a: 0.25 })); alterados.push('color/PRIMARIO/400-25'); }
const avisos = [];
const fontes = await figma.listAvailableFontsAsync();
for (const [colNome, fam] of [['Typography · Primitivos', MARCA.fonteTitulos], ['Typography · Mono Primitivos', MARCA.fonteTexto]]) {
  if (!fam) continue;
  const estilos = fontes.filter(f => f.fontName.family === fam).map(f => f.fontName.style);
  const ok = ['Regular', 'Medium', 'Bold'].every(s => estilos.includes(s)) && (estilos.includes('Semi Bold') || estilos.includes('SemiBold'));
  if (!ok) { avisos.push(`${fam} não tem os 4 pesos; fonte mantida`); continue; }
  for (const s of estilos) await figma.loadFontAsync({ family: fam, style: s });
  const col = cols.find(c => c.name === colNome);
  vars.find(v => v.variableCollectionId === col.id && v.name === 'font/family/brand').setValueForMode(col.modes[0].modeId, fam);
  alterados.push(colNome + ' · font/family/brand = ' + fam);
}
// Páginas: capa, decisões e ordem
const capa = figma.root.children.find(p => p.name === '00 · Capa') || figma.root.children.find(p => !/^\d\d ·/.test(p.name));
capa.name = '00 · Capa';
await figma.setCurrentPageAsync(capa);
const _ts = await figma.getLocalTextStylesAsync();
for (const s of _ts) await figma.loadFontAsync(s.fontName);
const sem = cols.find(c => c.name === 'Color · Semânticos');
const sv = n => vars.find(v => v.variableCollectionId === sem.id && v.name === n);
const pint = n => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', sv(n));
capa.children.filter(n => n.name === 'Capa').forEach(n => n.remove());
const f = figma.createAutoLayout('VERTICAL', { name: 'Capa', itemSpacing: 16, paddingLeft: 80, paddingRight: 80, paddingTop: 80, paddingBottom: 80 });
f.resize(1440, 600); f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED'; f.primaryAxisAlignItems = 'CENTER';
f.fills = [pint('color/bg/default')];
const linha = async (txt, estilo, cor) => { const t = figma.createText(); await t.setTextStyleIdAsync(_ts.find(s => s.name === estilo).id); t.characters = txt; t.fills = [pint(cor)]; f.appendChild(t); return t; };
await linha(MARCA.nome, 'Display', 'color/text/primary');
await linha('Design system de ' + MARCA.empresa, 'Heading/H3', 'color/text/primary');
await linha('Criado com o Garoa Starter a partir do Garoa · ' + new Date().toISOString().slice(0, 10), 'Body/MD/Regular', 'color/text/secondary');
let dec = figma.root.children.find(p => p.name === '03 · Decisões');
if (!dec) { dec = figma.createPage(); dec.name = '03 · Decisões'; }
await figma.setCurrentPageAsync(dec);
dec.children.filter(n => n.name === 'Decisões').forEach(n => n.remove());
const d = figma.createAutoLayout('VERTICAL', { name: 'Decisões', itemSpacing: 8, paddingLeft: 40, paddingRight: 40, paddingTop: 40, paddingBottom: 40 });
d.fills = [pint('color/bg/default')];
const add = async (txt, estilo) => { const t = figma.createText(); await t.setTextStyleIdAsync(_ts.find(s => s.name === estilo).id); t.characters = txt; t.fills = [pint('color/text/primary')]; d.appendChild(t); };
await add('Decisões do ' + MARCA.nome, 'Heading/H3');
for (const x of MARCA.decisoes) await add(new Date().toISOString().slice(0, 10) + ' · ' + x, 'Body/SM/Regular');
const ordem = p => parseInt(p.name.slice(0, 2), 10);
[...figma.root.children].sort((a, b) => ordem(a) - ordem(b)).forEach((p, i) => figma.root.insertChild(i, p));
await figma.setCurrentPageAsync(capa);
return { alterados: alterados.length, avisos, paginas: figma.root.children.map(p => p.name) };
