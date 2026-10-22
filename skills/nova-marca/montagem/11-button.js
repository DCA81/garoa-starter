// Garoa Starter · receita 11: Button (3 variantes × 6 estados). Precisa do Icon (receita 10).
const pg = await pagina('20 · Button');
apagarSeExiste(pg, 'Button');
// estado: [fundo, borda, espessura da borda, texto, cor do ícone]
const B = 'C:button/';
const TABELA = {
  primary: {
    default: [B + 'primary/bg', B + 'primary/border', B + 'primary/border-width', B + 'primary/fg', 'inverse'],
    hover: [B + 'primary/bg-hover', B + 'primary/bg-hover', B + 'primary/border-width', B + 'primary/fg', 'inverse'],
    focus: [B + 'primary/bg', null, null, B + 'primary/fg', 'inverse'],
    press: [B + 'primary/bg-hover', null, null, B + 'primary/fg', 'inverse'],
    disabled: [B + 'bg-disabled', null, null, B + 'fg-disabled', 'disabled'],
    loading: [B + 'primary/bg', null, null, B + 'primary/fg', 'inverse'],
  },
  secondary: {
    default: [null, B + 'secondary/border', B + 'border-width', B + 'secondary/fg', 'action'],
    hover: [B + 'secondary/bg-hover', B + 'secondary/border-hover', B + 'border-width', B + 'secondary/fg-hover', 'action'],
    focus: [null, B + 'secondary/border', B + 'border-width', B + 'secondary/fg', 'action'],
    press: [B + 'secondary/bg-hover', B + 'secondary/border-hover', B + 'border-width', B + 'secondary/fg-hover', 'action'],
    disabled: [B + 'bg-disabled', null, null, B + 'fg-disabled', 'disabled'],
    loading: [null, B + 'secondary/border', B + 'border-width', B + 'secondary/fg', 'action'],
  },
  ghost: {
    default: [null, null, null, B + 'ghost/fg', 'action'],
    hover: [B + 'ghost/bg-hover', B + 'ghost/border-hover', B + 'border-width', B + 'ghost/fg-hover', 'action'],
    focus: [null, null, null, B + 'ghost/fg', 'action'],
    press: [B + 'ghost/bg-hover', B + 'ghost/border-hover', B + 'border-width', B + 'ghost/fg-hover', 'action'],
    disabled: [B + 'bg-disabled', null, null, B + 'fg-disabled', 'disabled'],
    loading: [null, null, null, B + 'ghost/fg', 'action'],
  },
};
const icone = async (nome, cor, glifo) => {
  const i = (await varianteDe('Icon', `size=md, fill=off, color=${cor}`)).createInstance();
  i.name = nome; ajustar(i, { name: glifo });
  bind(i, ['width', 'height'], B + 'icon-size');
  return i;
};
const comps = [], refs = [];
for (const [variante, estados] of Object.entries(TABELA)) for (const [estado, [bg, bd, bw, fg, cor]] of Object.entries(estados)) {
  const c = figma.createComponent(); c.name = `variant=${variante}, state=${estado}`;
  layout(c, 'H', null, null, true);
  const ctrl = figma.createFrame(); ctrl.name = 'Button/Control';
  layout(ctrl, 'H', [B + 'padding-y', B + 'padding-x'], B + 'gap', true);
  raio(ctrl, B + 'radius'); bind(ctrl, 'minHeight', B + 'min-height');
  fundo(ctrl, bg); borda(ctrl, bd, bw, false);
  const esq = await icone('Button/IconLeft', cor, estado === 'loading' ? 'progress_activity' : 'arrow_back');
  const rot = await texto('Button/Label', 'Body/LG', fg, 'texto');
  const dir = await icone('Button/IconRight', cor, 'arrow_forward');
  ctrl.appendChild(esq); ctrl.appendChild(rot); ctrl.appendChild(dir);
  c.appendChild(ctrl);
  if (estado === 'focus') {
    // Anel de foco: 2px, a 4px do botão, borda por dentro e incluída no tamanho
    bind(c, ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'], B + 'focus-ring-offset');
    raio(c, B + 'focus-ring-radius'); borda(c, B + 'focus-ring', B + 'focus-ring-width', true);
  }
  comps.push(c); refs.push({ esq, rot, dir });
}
const s = conjunto(comps, 'Button', pg, 6);
s.x = 0; s.y = 0;
const pRot = s.addComponentProperty('label', 'TEXT', 'texto');
const pEsq = s.addComponentProperty('iconLeft', 'BOOLEAN', true);
const pDir = s.addComponentProperty('iconRight', 'BOOLEAN', true);
for (const r of refs) { r.rot.componentPropertyReferences = { characters: pRot }; r.esq.componentPropertyReferences = { visible: pEsq }; r.dir.componentPropertyReferences = { visible: pDir }; }
s.description = 'Dispara uma ação: primary (principal), secondary (apoio) e ghost (discreta), com ícones opcionais. A borda não muda o tamanho: todos os estados têm a mesma altura.';
const alturas = [...new Set(s.children.map(v => Math.round(v.findOne(n => n.name === 'Button/Control').height)))];
await s.screenshot({ scale: 1 });
return { componente: s.name, id: s.id, variantes: s.children.length, alturasDoBotao: alturas };
