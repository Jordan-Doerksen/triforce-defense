/* sheet_t101.js — sheet T-101, the hill. Two faces from MODELS.town (through town.js) and MODELS.province:
   THE ART    the finished town at the Castle tier, a framed render on its high ground with the mountains
              behind it, one build of many (R10's box, drawn plainly: no toy-box band or badges).
   THE DETAIL a key plan with the hill in its mountains; the river's section, source to lake, so it is seen
              to run downhill; the hill's charge; and the town in big numbered steps, one per hall tier (R10). */
(function () {
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(draw);
  function draw() {
  const { el, pts, render } = window.WALL;
  const P = window.MODELS.province, F = window.FIG;
  const { text, box, step } = window.TOWN;
  const lbl = (g, x, y, s, anchor, size) => text(g, x, y, s, 'pl-lbl', anchor, size || 22);
  const ref = (g, cx, cy, top, sheet) => {                       // an architect's reference bubble
    el('circle', { cx, cy, r: 28, class: 'vt-ring' }, g); el('line', { x1: cx - 26, y1: cy, x2: cx + 26, y2: cy, class: 'rule' }, g);
    text(g, cx, cy - 6, top, 'vt-id', null, 22); text(g, cx, cy + 20, sheet, 'vt-sh', null, 12);
  };
  // a downstream chevron at x, y, pointing along angle t
  const chevron = (g, x, y, t, len, w) => el('path', { d: `M${x - len * Math.cos(t - .6)} ${y - len * Math.sin(t - .6)} L${x} ${y} L${x - len * Math.cos(t + .6)} ${y - len * Math.sin(t + .6)}`, class: 'ln-thin', style: `stroke-width:${w}` }, g);
  const peak = (g, x, y, sz, w) => el('path', { d: `M${x - 7 * sz} ${y + 6 * sz} L${x} ${y - 7 * sz} L${x + 7 * sz} ${y + 6 * sz}`, class: 'ln-thin', style: `stroke-width:${w}` }, g);
  const river = (g, d, w) => { el('path', { d, class: 'pl-river', style: `stroke-width:${w}` }, g); el('path', { d, class: 'pl-riverp', style: `stroke-width:${w * .6}` }, g); };

  /* the art: the finished town, framed plainly */
  box(document.getElementById('box'), { band: false, fit: { x: 40, y: 40, w: 1820, h: 1044 } });

  /* the key plan: the hill in its mountains (1.2 · 1.5, clarified) */
  const kp = document.getElementById('locator'), KW = 960, KH = 520;
  const K = el('g', { class: 'hand-vellum' }, kp);
  const kd = el('defs', {}, kp);
  const hatch = (id, rot, gap, w) => { const p = el('pattern', { id, width: gap, height: gap, patternUnits: 'userSpaceOnUse', patternTransform: `rotate(${rot})` }, kd); el('line', { x1: 0, y1: 1, x2: gap, y2: 1, style: `stroke:var(--dv-line);stroke-width:${w}` }, p); };
  hatch('loc-wild', 35, 9, 1.2); hatch('loc-town', 45, 7, 2.4);
  el('rect', { width: KW, height: KH, class: 'view-frame' }, K);
  text(K, 30, 42, 'key plan', 'sc-kick');
  const [fx0, fy0, fx1, fy1] = P.frame;
  const s = Math.min((KW - 60) / (fx1 - fx0), (KH - 84) / (fy1 - fy0)), ox = (KW - (fx1 - fx0) * s) / 2, oy = 62;
  const at = (x, y) => [ox + (x - fx0) * s, oy + (y - fy0) * s];
  const g = el('g', { transform: `translate(${ox - fx0 * s} ${oy - fy0 * s}) scale(${s})` }, K);
  el('rect', { x: fx0, y: fy0, width: fx1 - fx0, height: fy1 - fy0, class: 'pl-old', style: 'stroke-width:1.4' }, g);
  el('path', { d: P.wild, class: 'ln-thin', style: 'stroke-width:1;fill:url(#loc-wild)' }, g);   // a class's fill: none would win over the attribute
  P.rituals.forEach(([x, y]) => el('path', { d: `M${x} ${y - 9} l5 16 h-10 Z`, class: 'arrow-h' }, g));
  // the mountains: the ridge, heavier beside the hill, and its spurs around the town
  for (let y = fy0 + 10, i = 0; y < fy1; y += 17, i++) for (const x of [22, 40, 58]) {
    const near = y > 120 && y < 360, [sx, sy] = P.spring;
    if (Math.hypot(x + (i % 2) * 5 - sx, y - sy) < 12) continue;   // the spring
    peak(g, x + (i % 2) * 5, y, near ? 1.25 : 1, near ? 1.4 : 1);
  }
  [...P.spurs.nw, ...P.spurs.sw].forEach(([x, y]) => peak(g, x, y, 1.3, 1.4));
  for (let y = fy0 + 12; y < fy1; y += 16) for (const x of [598, 612, 624]) el('path', { d: `M${x - 5} ${y + 5} L${x} ${y - 6} L${x + 5} ${y + 5} Z`, class: 'ln-thin', style: 'stroke-width:.8' }, g);   // the forest
  // contours: the hill's high ground, out of the ridge and falling away east and south
  const H0 = P.towns.hill;
  for (const o of [8, 16]) {
    const x1 = H0.x + H0.w + o, y0 = H0.y - o, y1 = H0.y + H0.h + o, r = 8 + o / 2;
    el('path', { d: `M70 ${y0} H${x1 - r} Q${x1} ${y0} ${x1} ${y0 + r} V${y1 - r} Q${x1} ${y1} ${x1 - r} ${y1} H70`, class: 'ln-fine', style: 'stroke-width:1;stroke-dasharray:5 3' }, g);
  }
  P.river.forEach((d) => river(g, d, 6));
  el('circle', { cx: P.spring[0], cy: P.spring[1], r: 3.4, class: 'pl-old', style: 'stroke-width:1.4' }, g);
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
  // downstream, along both reaches: chevrons at the sheet's scale, read off the drawn paths
  g.querySelectorAll('path.pl-riverp').forEach((pth) => {
    const L = pth.getTotalLength();
    for (const f of [.2, .5, .8]) {
      const a = pth.getPointAtLength(L * f), b = pth.getPointAtLength(Math.min(L, L * f + 2));
      chevron(K, ...at(a.x, a.y), Math.atan2(b.y - a.y, b.x - a.x), 8, 2.4);
    }
  });
  const L = (x, y, str, anchor) => lbl(K, ...at(x, y), str, anchor);
  L(188, 214, 'the hill · here', 'start'); L(382, 388, 'the valley', 'start'); L(518, 300, 'the forest'); L(330, 40, 'the overrun north');
  L(258, 300, 'bridge', 'start');
  const [rx] = at(fx0, 0);                                       // the margin west of the frame: the ridge and its spring
  const rl = lbl(K, rx - 22, at(0, 300)[1], 'the ridge'); rl.setAttribute('transform', `rotate(-90 ${rx - 22} ${at(0, 300)[1]})`);
  const [spx, spy] = at(...P.spring);
  el('path', { d: `M${rx - 46} ${spy - 40} H${spx - 26} L${spx - 6} ${spy - 4}`, class: 'ln-thin', style: 'stroke-width:1.6' }, K);
  lbl(K, rx - 50, spy - 48, 'the spring', 'end', 20);
  const [nx, ny] = [KW - 56, KH - 50];
  el('circle', { cx: nx, cy: ny, r: 20, class: 'ln-thin', style: 'stroke-width:2' }, K);
  el('path', { d: `M${nx} ${ny - 27} L${nx + 7} ${ny + 5} L${nx} ${ny} L${nx - 7} ${ny + 5} Z`, class: 'arrow-h' }, K);
  ref(K, KW - 52, 40, '1', 'M-101');

  /* the river's section, source to lake: the ground falls the whole way (1.5, clarified) */
  const pr = document.getElementById('profile'), PW2 = 960, PH2 = 300;
  const R = el('g', { class: 'hand-vellum' }, pr);
  const ph = el('pattern', { id: 'pro-h', width: 10, height: 10, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, el('defs', {}, pr));
  el('line', { x1: 0, y1: 1, x2: 10, y2: 1, style: 'stroke:var(--dv-line);stroke-width:1.2' }, ph);
  el('rect', { width: PW2, height: PH2, class: 'view-frame' }, R);
  text(R, 30, 40, 'the river, source to lake', 'sc-kick');
  const ground = [[30, 132], [56, 118], [92, 108], [118, 114], [150, 140], [180, 166], [200, 178], [500, 178], [500, 240], [600, 246], [700, 252], [820, 262], [840, 276], [910, 276], [922, 264], [930, 264]];
  const ridge = [[30, 132], [56, 78], [76, 96], [94, 62], [112, 88], [124, 100], [150, 140]];
  el('polygon', { points: pts([...ridge, ...ground.slice(5), [930, 292], [30, 292]]), class: 'pl-old', style: 'stroke-width:2.6;fill:url(#pro-h)' }, R);
  el('polyline', { points: pts([...ridge, ...ground.slice(5)]), class: 'ln-heavy', style: 'stroke-width:3.4;fill:none' }, R);
  for (const x of [232, 468]) el('rect', { x: x - 7, y: 144, width: 14, height: 34, class: 'pl-wall' }, R);   // the town's walls, cut
  el('path', { d: 'M334 178 V150 H366 V178 M328 152 L350 128 L372 152', class: 'pl-old', style: 'stroke-width:2.6;fill:none' }, R);   // the castle
  const upper = [[124, 98], [150, 134], [180, 160], [200, 172], [500, 172]], lower = [[504, 236], [600, 242], [700, 248], [820, 258], [846, 268], [906, 268]];
  for (const w of [upper, lower]) { el('polyline', { points: pts(w), class: 'pl-river', style: 'stroke-width:9' }, R); el('polyline', { points: pts(w), class: 'pl-riverp', style: 'stroke-width:5' }, R); }
  for (let i = 0; i < 4; i++) el('line', { x1: 502 + i * 5, y1: 172, x2: 502 + i * 5, y2: 236, class: 'ln-thin', style: 'stroke-width:1.8' }, R);   // the falls
  el('circle', { cx: 124, cy: 98, r: 6, class: 'pl-old', style: 'stroke-width:2' }, R);   // the spring
  el('path', { d: 'M626 244 Q650 220 674 248', class: 'ln-heavy', style: 'stroke-width:3.4;fill:none' }, R);   // the bridge
  const mid = (w, i) => { const [ax, ay] = w[i], [cx, cy] = w[i + 1]; return [(ax + cx) / 2, (ay + cy) / 2, Math.atan2(cy - ay, cx - ax)]; };
  [[upper, 0], [upper, 3], [lower, 0], [lower, 2]].forEach(([w, i]) => { const [x, y, t] = mid(w, i); chevron(R, x, y, t, 9, 2.6); });
  [[upper, 3, .3], [upper, 3, .7]].forEach(([w, i, f]) => { const [ax, ay] = w[i], [cx] = w[i + 1]; chevron(R, ax + (cx - ax) * f, ay, 0, 9, 2.6); });
  lbl(R, 152, 108, 'the spring', 'start'); lbl(R, 350, 116, 'the hill'); lbl(R, 528, 214, 'the falls', 'start');
  lbl(R, 650, 282, 'the bridge'); lbl(R, 876, 252, 'the lake'); lbl(R, 92, 230, 'the ridge');
  lbl(R, PW2 - 24, 100, '[ ] heights drawn, not sealed', 'end', 19);
  ref(R, PW2 - 52, 40, '2', 'M-101');

  /* the hill's charge: what this town brings (2.1 · 5 · 9.2) */
  const ch = document.getElementById('charge');
  const C = el('g', { class: 'hand-vellum' }, ch);
  el('rect', { width: 960, height: 314, class: 'view-frame' }, C);
  text(C, 30, 40, "the hill's charge", 'sc-kick');
  render(F.siege(0, 0), el('g', { transform: 'translate(150 174) scale(.8)' }, ch));
  text(C, 300, 98, 'siege engine', 'st-name', null, 30);
  lbl(C, 300, 132, 'the special unit · break · armour lean', 'start');
  lbl(C, 300, 160, 'opened by the castle · 2.1', 'start');
  ref(C, 880, 104, 'H', 'H-101'); lbl(C, 880, 156, 'its hero', 'middle', 19);
  el('line', { x1: 30, y1: 186, x2: 930, y2: 186, class: 'rule-2' }, C);
  render(F.ritual(0, 0, 70), el('g', { transform: 'translate(150 288) scale(.34)' }, ch));
  text(C, 300, 240, 'win B runs through here', 'st-name', null, 28);
  lbl(C, 300, 274, 'engines break the rituals · 9.2', 'start');
  ref(C, 880, 252, 'B', 'W-101');

  /* the detail: the town in big numbered steps (R10) */
  const caption = ['opens ring I · forge I–II', 'opens ring II · forge III–IV', 'opens ring III · siege · ultimate'];
  ['step1', 'step2', 'step3'].forEach((id, i) => step(document.getElementById(id), i, { caption: (si) => caption[si] }));

  /* the key, in the title block */
  const kt = document.getElementById('keyt');
  kt.setAttribute('class', 'hand-vellum');                       // the key's line marks take the vellum pen
  const row = (i, drawIt, label) => { const y = 22 + i * 38; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (g2, x, y) => el('rect', { x: x - 22, y: y - 8, width: 44, height: 16, class: 'pl-wall' }, g2), 'a wall, cut');
  row(1, (g2, x, y) => { el('circle', { cx: x, cy: y, r: 13, class: 'pl-old' }, g2); for (let k = 0; k < 8; k++) { const t = k * Math.PI / 4; el('line', { x1: x + 16 * Math.cos(t), y1: y + 16 * Math.sin(t), x2: x + 22 * Math.cos(t), y2: y + 22 * Math.sin(t), class: 'ln-thin', style: 'stroke-width:2' }, g2); } }, 'a plot whose ring is lit · 6.2');
  row(2, (g2, x, y) => el('circle', { cx: x, cy: y, r: 13, class: 'pl-old' }, g2), 'a plot, its ring not yet lit');
  row(3, (g2, x, y) => { peak(g2, x - 8, y + 2, 1.3, 1.8); peak(g2, x + 9, y + 2, 1.3, 1.8); }, 'mountains, around the hill · 1.5');
  row(4, (g2, x, y) => { for (const o of [0, 7]) el('path', { d: `M${x - 22} ${y + 6 - o} Q${x} ${y - 6 - o} ${x + 22} ${y + 6 - o}`, class: 'ln-fine', style: 'stroke-width:1.6;stroke-dasharray:5 3' }, g2); }, 'contours, falling from them');
  row(5, (g2, x, y) => { el('line', { x1: x - 22, y1: y, x2: x + 22, y2: y, class: 'pl-river', style: 'stroke-width:12' }, g2); el('line', { x1: x - 22, y1: y, x2: x + 22, y2: y, class: 'pl-riverp', style: 'stroke-width:8' }, g2); chevron(g2, x + 6, y, 0, 8, 2.2); }, 'the river, downstream');
  row(6, (g2, x, y) => text(g2, x, y + 8, '▲', 'pl-tier', null, 22), 'each tier raises the garrison');
  row(7, (g2, x, y) => text(g2, x, y + 8, '[ ]', 'pl-tier', null, 20), 'the layout: drawn, not sealed · 2.5');
  }
})();
