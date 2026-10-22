// Garoa Starter · montagem 30: conferência final. Não altera o DS (cria e apaga um quadro temporário para a captura).
const soltos = []; let camadas = 0;
for (const p of figma.root.children) {
  await p.loadAsync();
  for (const s of p.findAll(n => n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent.type !== 'COMPONENT_SET'))) {
    for (const n of s.findAll(() => true)) {
      camadas++;
      const bv = n.boundVariables || {};
      for (const prop of ['fills', 'strokes']) { const l = n[prop]; if (Array.isArray(l)) l.forEach(x => { if (x.type === 'SOLID' && x.visible !== false && !(x.boundVariables && x.boundVariables.color)) soltos.push(s.name + ' / ' + n.name + ' ' + prop); }); }
      if (typeof n.cornerRadius === 'number' && n.cornerRadius > 0 && !bv.topLeftRadius) soltos.push(s.name + ' / ' + n.name + ' raio');
      if (n.type === 'TEXT' && !n.textStyleId && n.name !== 'Icon/Glyph') soltos.push(s.name + ' / ' + n.name + ' texto sem estilo');
    }
  }
}
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync('COLOR');
const sem = cols.find(c => c.name === 'Color · Semânticos');
const sv = n => vars.find(v => v.variableCollectionId === sem.id && v.name === n);
async function res(v, m) { let x = v.valuesByMode[m], i = 0; while (x && x.type === 'VARIABLE_ALIAS' && i++ < 10) { const t = await figma.variables.getVariableByIdAsync(x.id); x = t.valuesByMode[Object.keys(t.valuesByMode)[0]]; } return x; }
const lum = c => { const f = x => x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
const rat = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return Math.round((x + 0.05) / (y + 0.05) * 100) / 100; };
const pares = [['color/text/primary', 'color/bg/default', 4.5], ['color/text/primary', 'color/surface/modal', 4.5], ['color/text/secondary', 'color/bg/default', 4.5], ['color/text/inverse', 'color/action/primary', 4.5], ['color/text/inverse', 'color/action/hover', 4.5], ['color/border/action', 'color/bg/default', 3]];
const contraste = []; let menor = 99;
for (const m of sem.modes) for (const [a, b, min] of pares) { const r = rat(await res(sv(a), m.modeId), await res(sv(b), m.modeId)); menor = Math.min(menor, r); if (r < min) contraste.push(`${m.name}: ${a} sobre ${b} = ${r} (mínimo ${min})`); }
const pegar = (nome, variante) => { for (const p of figma.root.children) { const s = p.findOne(n => n.name === nome && (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT')); if (s) return s.type === 'COMPONENT' ? s : s.children.find(c => c.name === variante); } };
const itens = [pegar('Button', 'variant=primary, state=default'), pegar('Button', 'variant=secondary, state=default'), pegar('Tag', 'tone=success'), pegar('Input', 'variant=outline, size=large, state=filled'), pegar('Card')];
const capa = figma.root.children.find(p => p.name === '00 · Capa') || figma.root.children[0]; await figma.setCurrentPageAsync(capa);
const q = figma.createAutoLayout('HORIZONTAL', { name: 'tmp-conferencia' }); q.x = -30000; q.y = 0;
const fundoVar = sv('color/bg/default');
for (const m of sem.modes) {
  const caixa = figma.createAutoLayout('VERTICAL', { itemSpacing: 16, paddingLeft: 32, paddingRight: 32, paddingTop: 32, paddingBottom: 32 });
  caixa.setExplicitVariableModeForCollection(sem, m.modeId);
  caixa.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', fundoVar)];
  const linha = figma.createAutoLayout('HORIZONTAL', { itemSpacing: 16, counterAxisAlignItems: 'CENTER' }); linha.fills = [];
  for (const i of itens.slice(0, 3)) if (i) linha.appendChild(i.createInstance());
  caixa.appendChild(linha);
  for (const i of itens.slice(3)) if (i) caixa.appendChild(i.createInstance());
  q.appendChild(caixa);
}
await q.screenshot({ scale: 1 });
q.remove();
return { camadasConferidas: camadas, valoresSoltos: soltos.length, exemplos: soltos.slice(0, 5), contrasteAbaixoDoMinimo: contraste, menorContraste: menor };
