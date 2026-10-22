// Garoa Starter · ajudantes da montagem. Colar este bloco no início de cada receita de componente (10 a 14).
const COL = { P: 'Primitivos', S: 'Semânticos', TP: 'Typography · Primitivos', TM: 'Typography · Mono Primitivos', TR: 'Typography · Responsivo', CS: 'Color · Semânticos', C: 'Componentes' };
const _cols = await figma.variables.getLocalVariableCollectionsAsync();
const _vars = await figma.variables.getLocalVariablesAsync();
const V = ref => { const [cod, ...r] = ref.split(':'); const col = _cols.find(c => c.name === COL[cod]); const x = col && _vars.find(y => y.variableCollectionId === col.id && y.name === r.join(':')); if (!x) throw new Error('variável não encontrada: ' + ref); return x; };
const _ts = await figma.getLocalTextStylesAsync();
const _fx = await figma.getLocalEffectStylesAsync();
for (const s of _ts) await figma.loadFontAsync(s.fontName);
const bind = (n, props, ref) => { const v = V(ref); for (const p of [].concat(props)) n.setBoundVariable(p, v); };
const pintura = ref => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', V(ref));
const fundo = (n, ref) => { n.fills = ref ? [pintura(ref)] : []; };
const borda = (n, ref, larg, incluir) => {
  if (!ref) { n.strokes = []; return; }
  n.strokes = [pintura(ref)]; n.strokeAlign = 'INSIDE';
  bind(n, ['strokeTopWeight', 'strokeRightWeight', 'strokeBottomWeight', 'strokeLeftWeight'], larg);
  n.strokesIncludedInLayout = !!incluir;
};
const raio = (n, ref) => bind(n, ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'], ref);
// Auto Layout: dir 'H' ou 'V'; pad = [vertical, horizontal] em tokens ou null; gap = token ou null
const layout = (n, dir, pad, gap, alinhar) => {
  n.layoutMode = dir === 'H' ? 'HORIZONTAL' : 'VERTICAL';
  n.primaryAxisSizingMode = 'AUTO'; n.counterAxisSizingMode = 'AUTO';
  if (pad) { bind(n, ['paddingTop', 'paddingBottom'], pad[0]); bind(n, ['paddingLeft', 'paddingRight'], pad[1]); }
  if (gap) bind(n, 'itemSpacing', gap);
  if (alinhar) { n.primaryAxisAlignItems = 'CENTER'; n.counterAxisAlignItems = 'CENTER'; }
  n.fills = [];
};
const texto = async (nome, estilo, cor, conteudo) => {
  const t = figma.createText(); t.name = nome;
  const s = _ts.find(x => x.name === estilo); if (!s) throw new Error('estilo não encontrado: ' + estilo);
  await t.setTextStyleIdAsync(s.id);
  t.characters = conteudo; t.fills = [pintura(cor)];
  return t;
};
const pagina = async nome => { let p = figma.root.children.find(x => x.name === nome); if (!p) { p = figma.createPage(); p.name = nome; } await figma.setCurrentPageAsync(p); return p; };
const _cache = {};
const varianteDe = async (conjunto, nomeVariante) => {
  const k = conjunto + '|' + nomeVariante; if (_cache[k]) return _cache[k];
  for (const p of figma.root.children) { await p.loadAsync(); const s = p.findOne(n => n.type === 'COMPONENT_SET' && n.name === conjunto); if (s) { const v = s.children.find(c => c.name === nomeVariante); if (!v) throw new Error('variante não encontrada: ' + conjunto + ' / ' + nomeVariante); _cache[k] = v; return v; } }
  throw new Error('componente não encontrado: ' + conjunto);
};
const propChave = (inst, prefixo) => Object.keys(inst.componentProperties).find(k => k.split('#')[0] === prefixo);
const ajustar = (inst, valores) => { const p = {}; for (const [k, v] of Object.entries(valores)) { const ch = propChave(inst, k); if (ch) p[ch] = v; } inst.setProperties(p); };
// Junta as variantes num conjunto organizado em grade: "colunas" variantes por linha, na ordem em que foram criadas
const conjunto = (comps, nome, pagina, colunas) => {
  const G = 32; let y = G; const larg = Math.max(...comps.map(c => c.width)); const pos = [];
  for (let i = 0; i < comps.length; i += colunas) {
    const linha = comps.slice(i, i + colunas);
    linha.forEach((c, j) => pos.push([G + j * (larg + G), y]));
    y += Math.max(...linha.map(c => c.height)) + G;
  }
  const s = figma.combineAsVariants(comps, pagina); s.name = nome;
  comps.forEach((c, i) => { c.x = pos[i][0]; c.y = pos[i][1]; });
  s.resize(G + Math.min(colunas, comps.length) * (larg + G), y);
  s.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  s.strokes = [{ type: 'SOLID', color: { r: 0.592, g: 0.278, b: 1 } }]; s.dashPattern = [10, 5]; s.strokeWeight = 1; s.cornerRadius = 8;
  return s;
};
const apagarSeExiste = (pg, nome) => { const x = pg.findOne(n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name === nome && n.parent.type !== 'COMPONENT_SET'); if (x) x.remove(); };
