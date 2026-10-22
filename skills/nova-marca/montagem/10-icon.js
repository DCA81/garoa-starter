// Garoa Starter · receita 10: Icon (56 variantes). Precisa da fonte Material Symbols Rounded.
await figma.loadFontAsync({ family: 'Material Symbols Rounded', style: 'Regular' });
const pg = await pagina('14 · Ícones');
apagarSeExiste(pg, 'Icon');
const TAM = ['sm', 'md', 'lg', 'xl'], PX = { sm: 20, md: 24, lg: 32, xl: 40 };
const CORES = ['default', 'action', 'inverse', 'disabled', 'sucesso', 'erro', 'alerta'];
const comps = [];
for (const tam of TAM) for (const preench of ['off', 'on']) for (const cor of CORES) {
  const c = figma.createComponent();
  c.name = `size=${tam}, fill=${preench}, color=${cor}`;
  layout(c, 'H', null, null, true);
  c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'FIXED';
  c.resize(PX[tam], PX[tam]);
  bind(c, ['width', 'height'], 'S:icon/size/' + tam);
  const g = figma.createText(); g.name = 'Icon/Glyph';
  g.fontName = { family: 'Material Symbols Rounded', style: 'Regular' };
  g.characters = 'home';
  g.textAlignHorizontal = 'CENTER'; g.textAlignVertical = 'CENTER';
  g.fills = [pintura('CS:color/icon/' + cor)];
  bind(g, ['fontSize', 'lineHeight'], 'S:icon/size/' + tam);
  bind(g, 'fontWeight', 'S:icon/weight');
  c.appendChild(g);
  g.textAutoResize = 'NONE'; g.layoutSizingHorizontal = 'FILL'; g.layoutSizingVertical = 'FILL';
  comps.push(c);
}
const s = conjunto(comps, 'Icon', pg, 7);
const chNome = s.addComponentProperty('name', 'TEXT', 'home');
for (const v of s.children) v.findOne(n => n.name === 'Icon/Glyph').componentPropertyReferences = { characters: chNome };
s.description = 'Mostra um glifo Material Symbols Rounded no tamanho e na cor do DS. Troque o nome do ícone na propriedade "name" (ex.: arrow_forward, check, close).';
return { componente: s.name, id: s.id, variantes: s.children.length };
