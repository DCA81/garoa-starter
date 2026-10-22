// Garoa Starter · receita 12: Input (2 variantes × 2 tamanhos × 9 estados). Precisa do Icon (receita 10).
const pg = await pagina('21 · Input');
apagarSeExiste(pg, 'Input');
const I = 'C:input/';
const ESTADOS = ['default', 'filled', 'hover', 'focus', 'disabled', 'success', 'info', 'warning', 'error'];
// borda do campo, texto do valor, texto de ajuda e cor dos ícones por estado (variante outline)
const BORDA = { default: 'border', filled: 'border', hover: 'border-hover', focus: 'border', disabled: 'border', success: 'border-success', info: 'border-info', warning: 'border-warning', error: 'border-error' };
const VALOR = { default: 'placeholder', filled: 'fg', hover: 'placeholder', focus: 'fg', disabled: 'fg-disabled', success: 'fg', info: 'fg', warning: 'fg', error: 'fg' };
const AJUDA = { default: 'helper', filled: 'helper', hover: 'helper', focus: 'helper', disabled: 'fg-disabled', success: 'helper-success', info: 'helper-info', warning: 'helper-warning', error: 'helper-error' };
const ICONE = { disabled: 'disabled', success: 'sucesso', warning: 'alerta', error: 'erro' };
const icone = async (nome, cor, glifo) => {
  const i = (await varianteDe('Icon', `size=md, fill=off, color=${cor}`)).createInstance();
  i.name = nome; ajustar(i, { name: glifo });
  bind(i, ['width', 'height'], I + 'icon-size');
  return i;
};
const comps = [], refs = [];
for (const variante of ['outline', 'filled']) for (const tam of ['large', 'medium']) for (const est of ESTADOS) {
  const c = figma.createComponent(); c.name = `variant=${variante}, size=${tam}, state=${est}`;
  layout(c, 'V', null, I + 'gap', false);
  c.counterAxisSizingMode = 'FIXED'; c.resize(350, c.height);
  const rot = await texto('Input/Label', 'Body/MD/Medium', I + 'label', 'Label');
  const foco = figma.createFrame(); foco.name = 'Input/Focus'; layout(foco, 'V', null, null, false);
  const ctrl = figma.createFrame(); ctrl.name = 'Input/Control';
  layout(ctrl, 'H', [I + tam + '/padding-y', I + 'padding-x'], I + 'control-gap', true);
  ctrl.primaryAxisAlignItems = 'MIN';
  raio(ctrl, I + 'radius'); bind(ctrl, 'minHeight', I + 'min-height');
  const filled = variante === 'filled';
  const bordaRef = filled && est === 'hover' ? I + 'filled/border-hover' : I + BORDA[est];
  borda(ctrl, bordaRef, I + 'border-width', true);
  fundo(ctrl, filled ? (est === 'hover' ? I + 'filled/bg-hover' : est === 'disabled' ? I + 'filled/bg-disabled' : I + 'filled/bg') : null);
  const cor = ICONE[est] || 'default';
  const esq = await icone('Input/IconLeft', cor, 'star');
  const val = await texto('Input/Value', tam === 'large' ? 'Body/MD/Regular' : 'Body/SM/Regular', filled && est === 'hover' ? I + 'filled/fg-hover' : I + VALOR[est], 'Placeholder');
  const dir = await icone('Input/IconRight', cor, 'keyboard_arrow_down');
  ctrl.appendChild(esq); ctrl.appendChild(val); ctrl.appendChild(dir);
  val.layoutSizingHorizontal = 'FILL'; val.textAutoResize = 'HEIGHT';
  foco.appendChild(ctrl);
  const aj = await texto('Input/Helper', 'Body/SM/Regular', I + AJUDA[est], 'Helper Text');
  c.appendChild(rot); c.appendChild(foco); c.appendChild(aj);
  for (const n of [rot, foco, aj]) n.layoutSizingHorizontal = 'FILL';
  rot.textAutoResize = 'HEIGHT'; aj.textAutoResize = 'HEIGHT';
  ctrl.layoutSizingHorizontal = 'FILL';
  if (est === 'focus') {
    bind(foco, ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'], I + 'focus-ring-offset');
    raio(foco, I + 'focus-ring-radius'); borda(foco, I + 'focus-ring', I + 'focus-ring-width', true);
  }
  comps.push(c); refs.push({ rot, val, aj, esq, dir });
}
const s = conjunto(comps, 'Input', pg, 9);
s.x = 0; s.y = 0;
const pLab = s.addComponentProperty('label', 'TEXT', 'Label');
const pVal = s.addComponentProperty('value', 'TEXT', 'Placeholder');
const pAj = s.addComponentProperty('helper', 'TEXT', 'Helper Text');
const pVerAj = s.addComponentProperty('showHelper', 'BOOLEAN', true);
const pEsq = s.addComponentProperty('iconLeft', 'BOOLEAN', true);
const pDir = s.addComponentProperty('iconRight', 'BOOLEAN', true);
for (const r of refs) {
  r.rot.componentPropertyReferences = { characters: pLab };
  r.val.componentPropertyReferences = { characters: pVal };
  r.aj.componentPropertyReferences = { characters: pAj, visible: pVerAj };
  r.esq.componentPropertyReferences = { visible: pEsq };
  r.dir.componentPropertyReferences = { visible: pDir };
}
s.description = 'Recebe um texto curto, com rótulo, ajuda e ícones opcionais. Variantes outline e filled, tamanhos large e medium.';
const alturas = {};
for (const v of s.children) { const k = v.name.split(', ')[1]; (alturas[k] = alturas[k] || new Set()).add(Math.round(v.findOne(n => n.name === 'Input/Control').height)); }
await s.screenshot({ scale: 0.5 });
return { componente: s.name, variantes: s.children.length, alturasDoCampo: Object.fromEntries(Object.entries(alturas).map(([k, v]) => [k, [...v]])) };
