// Garoa Starter · montagem 01: cria as 7 coleções de variáveis do Garoa no arquivo aberto.
// Uso: trocar o marcador entre crases na linha DADOS pelo conteúdo de dados-variaveis.txt, sem alterar nada.
// Pode rodar de novo com segurança: reaproveita coleções e variáveis que já existem.
const DADOS = `__DADOS__`;
const SC = { a: 'ALL_SCOPES', ff: 'FRAME_FILL', sf: 'SHAPE_FILL', tf: 'TEXT_FILL', sc: 'STROKE_COLOR', ec: 'EFFECT_COLOR', g: 'GAP', wh: 'WIDTH_HEIGHT', cr: 'CORNER_RADIUS', sw: 'STROKE_FLOAT', ef: 'EFFECT_FLOAT', fam: 'FONT_FAMILY', fw: 'FONT_WEIGHT', fs: 'FONT_SIZE', lh: 'LINE_HEIGHT', ls: 'LETTER_SPACING', op: 'OPACITY', tc: 'TEXT_CONTENT' };
const TIPO = { C: 'COLOR', F: 'FLOAT', S: 'STRING' };
const secoes = [];
let atual = null;
for (const linha of DADOS.split('\n')) {
  if (!linha.trim()) continue;
  if (linha.startsWith('## ')) { const [cod, nome, modos] = linha.slice(3).split('|'); atual = { cod, nome, modos: modos.split(','), vars: [] }; secoes.push(atual); continue; }
  const p = linha.split('|');
  const nModos = atual.modos.length;
  const esc = p[2] === '*' ? ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL', 'STROKE_COLOR', 'EFFECT_COLOR'] : p[2] ? p[2].split(',').map(s => SC[s]) : [];
  atual.vars.push({ nome: p[0], tipo: TIPO[p[1]], escopos: esc, valores: p.slice(3, 3 + nModos), desc: p[3 + nModos] || '' });
}
const existentes = await figma.variables.getLocalVariableCollectionsAsync();
const porCod = {};
for (const s of secoes) {
  let col = existentes.find(c => c.name === s.nome);
  if (!col) col = figma.variables.createVariableCollection(s.nome);
  col.renameMode(col.modes[0].modeId, s.modos[0]);
  for (const m of s.modos.slice(1)) if (!col.modes.some(x => x.name === m)) col.addMode(m);
  porCod[s.cod] = col;
}
const todas = await figma.variables.getLocalVariablesAsync();
const chave = (colId, nome) => colId + '|' + nome;
const mapa = {};
for (const v of todas) mapa[chave(v.variableCollectionId, v.name)] = v;
for (const s of secoes) {
  const col = porCod[s.cod];
  for (const d of s.vars) {
    let v = mapa[chave(col.id, d.nome)];
    if (!v) { v = figma.variables.createVariable(d.nome, col, d.tipo); mapa[chave(col.id, d.nome)] = v; }
    v.scopes = d.escopos;
    if (d.desc) v.description = d.desc;
  }
}
const cor = h => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255, a: h.length > 7 ? parseInt(h.slice(7, 9), 16) / 255 : 1 });
const erros = [];
for (const s of secoes) {
  const col = porCod[s.cod];
  for (const d of s.vars) {
    const v = mapa[chave(col.id, d.nome)];
    d.valores.forEach((bruto, i) => {
      const modo = col.modes.find(m => m.name === s.modos[i]).modeId;
      let valor;
      if (bruto.startsWith('@')) {
        const [cod, ...resto] = bruto.slice(1).split(':');
        const alvo = mapa[chave(porCod[cod].id, resto.join(':'))];
        if (!alvo) { erros.push(d.nome + ' → ' + bruto); return; }
        valor = figma.variables.createVariableAlias(alvo);
      } else if (d.tipo === 'COLOR') valor = cor(bruto);
      else if (d.tipo === 'FLOAT') valor = Number(bruto);
      else valor = bruto;
      v.setValueForMode(modo, valor);
    });
  }
}
const resumo = secoes.map(s => s.nome + ': ' + s.vars.length);
return { resumo, total: secoes.reduce((n, s) => n + s.vars.length, 0), erros };
