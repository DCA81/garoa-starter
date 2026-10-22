// Garoa Starter · receita 13: Tag (5 tons). EXEMPLO_TAG = texto de exemplo do negócio.
const EXEMPLO_TAG = 'Liderança';
const pg = await pagina('23 · Tag');
apagarSeExiste(pg, 'Tag');
const T = 'C:tag/';
const comps = [], refs = [];
for (const tom of ['neutral', 'info', 'success', 'warning', 'error']) {
  const c = figma.createComponent(); c.name = `tone=${tom}`;
  layout(c, 'H', [T + 'padding-y', T + 'padding-x'], T + 'gap', false);
  c.counterAxisAlignItems = 'CENTER';
  raio(c, T + 'radius'); fundo(c, T + tom + '/bg'); borda(c, T + tom + '/accent', T + 'border-width', true);
  const p = figma.createEllipse(); p.name = 'Tag/Dot'; p.resize(8, 8); fundo(p, T + tom + '/accent'); bind(p, ['width', 'height'], T + 'dot-size');
  const t = await texto('Tag/Label', 'Body/SM/Medium', T + 'fg', EXEMPLO_TAG);
  c.appendChild(p); c.appendChild(t);
  comps.push(c); refs.push({ p, t });
}
const s = conjunto(comps, 'Tag', pg, 5);
s.x = 0; s.y = 0;
const pRot = s.addComponentProperty('label', 'TEXT', EXEMPLO_TAG);
const pPonto = s.addComponentProperty('showDot', 'BOOLEAN', true);
for (const r of refs) { r.t.componentPropertyReferences = { characters: pRot }; r.p.componentPropertyReferences = { visible: pPonto }; }
s.description = 'Rótulo curto de status ou categoria. A cor de status fica só na borda e no ponto; o texto usa a cor principal (contraste).';
await s.screenshot({ scale: 1 });
return { componente: s.name, variantes: s.children.length };
