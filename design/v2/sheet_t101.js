/* sheet_t101.js — sheet T-101, the hill. Two faces from MODELS.town (through town.js) and MODELS.province:
   THE ART    the box: the finished town at the Castle tier, one build of many (R10).
   THE DETAIL a key plan of the province with the hill picked out; the hill's charge; and the town in big
              numbered steps, one per hall tier (R10), each a plan in the sealed hand. */
(function () {
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(draw);
  function draw() {
  const { el, pts, render } = window.WALL;
  const P = window.MODELS.province, F = window.FIG;
  const { text, box, step } = window.TOWN;

  /* the art: the box */
  box(document.getElementById('box'), { title: 'THE HILL', sub: 'the castle tier · the finished set', fit: { x: 40, y: 150, w: 1600, h: 1010 }, badges: [1790, 270, 180] });

  /* the key plan: where the hill stands in the province (1.2 · 1.5) */
  const kp = document.getElementById('locator');
  const K = el('g', { class: 'hand-vellum' }, kp);
  const kd = el('defs', {}, kp);
  const hatch = (id, rot, gap, w) => { const p = el('pattern', { id, width: gap, height: gap, patternUnits: 'userSpaceOnUse', patternTransform: `rotate(${rot})` }, kd); el('line', { x1: 0, y1: 1, x2: gap, y2: 1, style: `stroke:var(--dv-line);stroke-width:${w}` }, p); };
  hatch('loc-wild', 35, 9, 1.2); hatch('loc-town', 45, 7, 2.4);
  el('rect', { width: 960, height: 664, class: 'view-frame' }, K);
  text(K, 30, 50, 'key plan', 'sc-kick');
  const s = 1.4, ox = 30, oy = 70;
  const g = el('g', { transform: `translate(${ox - P.frame[0] * s} ${oy - P.frame[1] * s}) scale(${s})` }, K);
  const [fx0, fy0, fx1, fy1] = P.frame;
  el('rect', { x: fx0, y: fy0, width: fx1 - fx0, height: fy1 - fy0, class: 'pl-old', style: 'stroke-width:1.4' }, g);
  el('path', { d: P.wild, class: 'ln-thin', style: 'stroke-width:1;fill:url(#loc-wild)' }, g);   // a class's fill: none would win over the attribute
  P.rituals.forEach(([x, y]) => el('path', { d: `M${x} ${y - 9} l5 16 h-10 Z`, class: 'arrow-h' }, g));
  for (let y = fy0 + 10; y < fy1; y += 18) for (const x of [24, 44, 60]) el('path', { d: `M${x - 7} ${y + 6} L${x} ${y - 6} L${x + 7} ${y + 6}`, class: 'ln-thin', style: 'stroke-width:.9' }, g);   // the ridge
  for (let y = fy0 + 12; y < fy1; y += 16) for (const x of [598, 612, 624]) el('path', { d: `M${x - 5} ${y + 5} L${x} ${y - 6} L${x + 5} ${y + 5} Z`, class: 'ln-thin', style: 'stroke-width:.8' }, g);   // the forest
  P.river.forEach((d) => { el('path', { d, class: 'pl-river', style: 'stroke-width:6' }, g); el('path', { d, class: 'pl-riverp', style: 'stroke-width:3.6' }, g); });
  const [fa, fb, , fd] = P.falls; for (let i = 0; i < 4; i++) el('line', { x1: fa + i * 4, y1: fb, x2: fa + i * 4 + 4, y2: fd, class: 'ln-thin', style: 'stroke-width:.9' }, g);   // the falls
  for (const d of Object.values(P.roads)) el('path', { d, class: 'ln-thin', style: 'stroke-width:1.6;stroke-dasharray:6 3' }, g);
  for (const d of P.shortRoads) el('path', { d, class: 'ln-thin', style: 'stroke-width:1.2;stroke-dasharray:2 3' }, g);
  const [bx, by, br] = P.bridge;
  el('rect', { x: -7, y: -4, width: 14, height: 8, class: 'pl-old', style: 'stroke-width:1.2', transform: `translate(${bx} ${by}) rotate(${br})` }, g);
  for (const [id, t] of Object.entries(P.towns)) {
    const here = id === 'hill';
    el('rect', { x: t.x, y: t.y, width: t.w, height: t.h, class: here ? 'pl-new' : 'pl-old', fill: here ? 'url(#loc-town)' : 'var(--dv-paper)', style: `stroke-width:${here ? 2.6 : 1.4}` }, g);
    if (id === 'valley') el('path', { d: P.lake, class: 'pl-old', style: 'stroke-width:1' }, g);
    el('rect', { x: t.gate[0] - 7, y: t.gate[1] - 4, width: 14, height: 8, class: 'pl-wall' }, g);
  }
  // labels, at the sheet's scale so they read
  const at = (x, y) => [ox + (x - fx0) * s, oy + (y - fy0) * s];
  const lbl = (x, y, str, anchor) => { const [lx, ly] = at(x, y); text(K, lx, ly, str, 'pl-lbl', anchor, 24); };
  lbl(120, 290, 'the hill · here'); lbl(318, 330, 'the valley'); lbl(518, 300, 'the forest'); lbl(330, 40, 'the overrun north');
  lbl(258, 300, 'bridge', 'start');
  // north, and the sheet that draws the province in full
  const [nx, ny] = [900, 600];
  el('circle', { cx: nx, cy: ny, r: 22, class: 'ln-thin', style: 'stroke-width:2' }, K);
  el('path', { d: `M${nx} ${ny - 30} L${nx + 8} ${ny + 5} L${nx} ${ny} L${nx - 8} ${ny + 5} Z`, class: 'arrow-h' }, K);
  text(K, nx, ny - 36, 'N', 'pl-tier', null, 20);
  el('circle', { cx: 900, cy: 46, r: 28, class: 'vt-ring' }, K); el('line', { x1: 874, y1: 46, x2: 926, y2: 46, class: 'rule' }, K);
  text(K, 900, 40, '1', 'vt-id', null, 22); text(K, 900, 66, 'M-101', 'vt-sh', null, 12);

  /* the hill's charge: what this town brings (2.1 · 5 · 9.2) */
  const ch = document.getElementById('charge');
  const C = el('g', { class: 'hand-vellum' }, ch);
  el('rect', { width: 960, height: 490, class: 'view-frame' }, C);
  text(C, 30, 50, "the hill's charge", 'sc-kick');
  render(F.siege(0, 0), el('g', { transform: 'translate(150 236) scale(1.1)' }, ch));
  text(C, 300, 150, 'siege engine', 'st-name', null, 34);
  text(C, 300, 192, 'the special unit · break · armour lean', 'pl-lbl', 'start', 24);
  text(C, 300, 226, 'opened by the castle · 2.1', 'pl-lbl', 'start', 24);
  el('line', { x1: 30, y1: 262, x2: 930, y2: 262, class: 'rule-2' }, C);
  render(F.ritual(0, 0, 70), el('g', { transform: 'translate(150 420) scale(.42)' }, ch));
  text(C, 300, 350, 'win B runs through here', 'st-name', null, 30);
  text(C, 300, 392, 'engines break the rituals · 9.2', 'pl-lbl', 'start', 24);
  el('circle', { cx: 880, cy: 400, r: 30, class: 'vt-ring' }, C); el('line', { x1: 852, y1: 400, x2: 908, y2: 400, class: 'rule' }, C);
  text(C, 880, 394, 'B', 'vt-id', null, 22); text(C, 880, 422, 'W-101', 'vt-sh', null, 13);
  el('circle', { cx: 880, cy: 170, r: 30, class: 'vt-ring' }, C); el('line', { x1: 852, y1: 170, x2: 908, y2: 170, class: 'rule' }, C);
  text(C, 880, 164, 'H', 'vt-id', null, 22); text(C, 880, 192, 'H-101', 'vt-sh', null, 13);
  text(C, 838, 236, 'its hero', 'pl-lbl', 'start', 20);

  /* the detail: the town in big numbered steps (R10) */
  const caption = ['opens ring I · forge I–II', 'opens ring II · forge III–IV', 'opens ring III · siege · ultimate'];
  ['step1', 'step2', 'step3'].forEach((id, i) => step(document.getElementById(id), i, { caption: (si) => caption[si] }));

  /* the key, in the title block */
  const kt = document.getElementById('keyt');
  const row = (i, drawIt, label) => { const y = 22 + i * 40; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (g2, x, y) => el('rect', { x: x - 22, y: y - 8, width: 44, height: 16, class: 'pl-wall' }, g2), 'a wall, cut');
  row(1, (g2, x, y) => { el('circle', { cx: x, cy: y, r: 13, class: 'pl-old' }, g2); for (let k = 0; k < 8; k++) { const t = k * Math.PI / 4; el('line', { x1: x + 16 * Math.cos(t), y1: y + 16 * Math.sin(t), x2: x + 22 * Math.cos(t), y2: y + 22 * Math.sin(t), class: 'ln-thin', style: 'stroke-width:2' }, g2); } }, 'a plot whose ring is lit · 6.2');
  row(2, (g2, x, y) => el('circle', { cx: x, cy: y, r: 13, class: 'pl-old' }, g2), 'a plot, its ring not yet lit');
  row(3, (g2, x, y) => { for (const o of [0, 6, 12]) el('path', { d: `M${x - 22} ${y + 8 - o} Q${x} ${y - 6 - o} ${x + 22} ${y + 8 - o}`, class: 'ln-fine', style: 'stroke-width:1.6' }, g2); }, 'contours: the high ground · 1.5');
  row(4, (g2, x, y) => { el('line', { x1: x - 22, y1: y, x2: x + 22, y2: y, class: 'pl-river', style: 'stroke-width:12' }, g2); el('line', { x1: x - 22, y1: y, x2: x + 22, y2: y, class: 'pl-riverp', style: 'stroke-width:8' }, g2); }, 'the river, to the falls');
  row(5, (g2, x, y) => text(g2, x, y + 8, '▲', 'pl-tier', null, 22), 'each tier raises the garrison');
  row(6, (g2, x, y) => text(g2, x, y + 8, '[ ]', 'pl-tier', null, 20), 'the layout: drawn, not sealed · 2.5');
  }
})();
