/* sheet_t201.js — sheet T-201, the gate (2.3 · 2.4 · 6.7). Two faces: the gate from MODELS.gate (the
   north elevation X-001 drew), the town around it from MODELS.town.
   THE ART    the gate at night, the first blow, split at a drafter's break (the owner's correction): behind
              it the town, the crew mending at the gate's inner face, the garrison rallied, the scout towers
              whole; in front the wild, the wave at the door, the towers shooting over the wall.
   THE DETAIL the gate's card, its upgrades as research (v1's screen, its numbers bracketed); one gate in
              three towns and the language it gives them ("gate tier 2, towers up"); the gate in plan, where
              the crew runs from and the garrison rallies to; and who does what at the gate: the chores, and
              the one choice (2.3). The night itself is T-202's. */
(function () {
  (document.fonts ? Promise.all([...document.fonts].map((f) => f.load().catch(() => null))).then(() => document.fonts.ready) : Promise.resolve()).then(draw);
  function draw() {
  const { el, pts, render } = window.WALL;
  const GM = window.MODELS.gate, M = window.MODELS.town, F = window.FIG;
  const { text, ROLE } = window.TOWN;
  const lbl = (g, x, y, s, anchor, size) => text(g, x, y, s, 'pl-lbl', anchor, size || 24);

  /* ════════════ THE ART: the gate at night, split at a drafter's break: behind it, and in front ════════════ */
  // the owner's correction: the crew mends from inside the walls. Left of the break the scene stands behind
  // the gate, in the town: the crew at its inner face, the garrison rallied, the scout towers whole. Right of
  // it, in front, in the wild: the wave, the first blow. On screen the break drags; the still and the print
  // stand it at the gate.
  const A = document.getElementById('art'), AW = 1900, AH = 1130, s = AW / GM.W, G = GM.G, aoy = AH - GM.H * s;
  const ad = el('defs', {}, A);
  const clipB = el('polygon', {}, el('clipPath', { id: 't201-behind' }, ad)), clipF = el('polygon', {}, el('clipPath', { id: 't201-front' }, ad));
  const sideB = el('g', { 'clip-path': 'url(#t201-behind)' }, A), sideF = el('g', { 'clip-path': 'url(#t201-front)' }, A);
  const at = (g) => el('g', { transform: `translate(0 ${aoy}) scale(${s})` }, g);
  const mirror = (x, parts) => ({ t: 'g', transform: `translate(${2 * x} 0) scale(-1 1)`, kids: parts });
  const cottage = (cx, w, h) => [{ t: 'rect', x: cx - w / 2, y: G - h, w, h, rc: 'f-tower' }, { t: 'poly', pts: [[cx - w / 2 - 14, G - h], [cx, G - h - w * .45], [cx + w / 2 + 14, G - h]], rc: 'f-roof' }, { t: 'rect', x: cx - 12, y: G - h + 26, w: 24, h: 30, rc: 'f-win', anim: 'm-win' }];
  // behind: the wall's inner face, the scout towers standing whole in front of it (2.4), the town's own houses;
  // the crew at the gate (6.7: three, out of the barracks) and the garrison rallied to it (2.3)
  const behind = [...GM.parts.filter((p) => !['towers', 'trees', 'people'].includes(p.layer)), ...GM.parts.filter((p) => p.layer === 'towers'),
    ...cottage(160, 150, 120), ...cottage(1290, 150, 120)];
  for (const x of [598, 644, 690]) behind.push(...F.peasant(x, G - 2, true));
  [[380, G + 40], [440, G + 40], [500, G + 40], [410, G + 96], [470, G + 96], [530, G + 96], [440, G + 152], [500, G + 152], [880, G + 30]].forEach(([x, y]) => behind.push(...F.footman(x, y)));
  render(behind, at(sideB));
  // in front: the gate as the wild sees it, the wave closing from both sides, the first blow, the towers shooting
  const front = GM.parts.filter((p) => p.layer !== 'people');
  const horde = [[1290, 930, 'g'], [1180, 900, 's'], [1080, 880, 'g'], [990, 845, 's'], [900, 815, 'g'], [180, 935, 's'], [300, 900, 'g'], [410, 870, 's'], [510, 840, 'g'], [600, 806, 's']];
  horde.forEach(([x, y, k], i) => { const f = (k === 'g' ? F.ghoul : F.skeleton)(x, y, i * .11); front.push(x < GM.W / 2 ? mirror(x, f) : { t: 'g', kids: f }); });
  front.push({ t: 'poly', pts: [[760, 640], [776, 668], [808, 664], [784, 688], [796, 720], [760, 700], [724, 720], [736, 688], [712, 664], [744, 668]], rc: 'f-flame', anim: 'm-tell' });
  front.push({ t: 'g', anim: 'm-lunge', kids: F.ghoul(840, G + 10, .2) }, { t: 'g', anim: 'm-lunge', kids: F.skeleton(780, G + 14, .4) });
  for (const [tx, tgt] of [[430, [[510, 840], [300, 900]]], [1010, [[900, 815], [1080, 880]]]]) for (const [x, y] of tgt) front.push({ t: 'line', x1: tx, y1: 400, x2: x, y2: y - 40, rc: 'f-shot', anim: 'm-shot' });
  render(front, at(sideF));
  // the break, its labels, and its knob
  const tag = (x, anchor, top, sub) => { const g = el('g', {}, A); const t1 = text(g, x, 176, top, 'st-name', anchor, 30); t1.style.fill = 'var(--f-moon)'; const t2 = text(g, x, 212, sub, 'pl-lbl', anchor, 24); t2.style.fill = 'var(--f-moon)'; t2.style.stroke = 'none'; return g; };
  const tagB = tag(40, 'start', 'BEHIND · THE TOWN', 'the crew mends from inside'), tagF = tag(AW - 40, 'end', 'IN FRONT · THE WILD', 'the wave at the door');
  const seam = el('polyline', { class: 'seam', style: 'stroke:var(--f-moon)' }, A), knob = el('g', {}, A), ky = AH * .5;
  el('circle', { cx: 0, cy: ky, r: 30, class: 'knob' }, knob); el('path', { d: `M-8 ${ky - 12} L-19 ${ky} L-8 ${ky + 12} Z M8 ${ky - 12} L19 ${ky} L8 ${ky + 12} Z`, class: 'knob-a' }, knob);
  const home = 720 * s;
  const set = (x) => {
    const sx = Math.max(60, Math.min(AW - 60, x)), sp = [[sx, 0], [sx, ky - 60], [sx + 30, ky - 30], [sx - 30, ky + 30], [sx, ky + 60], [sx, AH]];
    clipB.setAttribute('points', pts([[0, 0], ...sp, [0, AH]])); clipF.setAttribute('points', pts([[AW, 0], ...sp, [AW, AH]]));
    seam.setAttribute('points', pts(sp)); knob.setAttribute('transform', `translate(${sx} 0)`);
    tagB.style.opacity = sx < 520 ? 0 : 1; tagF.style.opacity = sx > AW - 520 ? 0 : 1;
  };
  set(home);
  const toView = (e) => { const p = A.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(A.getScreenCTM().inverse()).x; };
  let dragging = false, sx0 = home;
  A.setAttribute('tabindex', '0'); A.style.cursor = 'ew-resize';
  A.addEventListener('pointerdown', (e) => { dragging = true; A.setPointerCapture(e.pointerId); set(sx0 = toView(e)); });
  A.addEventListener('pointermove', (e) => { if (dragging) set(sx0 = toView(e)); });
  A.addEventListener('pointerup', () => { dragging = false; }); A.addEventListener('pointercancel', () => { dragging = false; });
  A.addEventListener('dblclick', () => set(sx0 = home));
  A.addEventListener('keydown', (e) => { const st = { ArrowLeft: -60, ArrowRight: 60 }[e.key]; if (st) { set(sx0 += st); e.preventDefault(); } });
  window.addEventListener('beforeprint', () => set(home));
  el('rect', { width: AW, height: AH, class: 'view-frame', style: 'stroke-width:8;pointer-events:none' }, A);

  /* ════════════ THE GATE'S CARD: its upgrades, like a building's research (2.4 · 6.7) ════════════ */
  const CD = document.getElementById('card'), CW = 960, CH = 560;
  const Q = el('g', { class: 'hand-vellum' }, CD);
  el('rect', { width: CW, height: CH, class: 'view-frame' }, Q);
  text(Q, 30, 46, "the gate's card · 2.4", 'sc-kick');
  text(Q, 30, 108, 'THE GATE · TIER [2]', 'st-name', 'start', 30);
  // the hit points bar, as v1's screen has it, bracketed: the numbers are the mock's, not sealed
  el('rect', { x: 30, y: 128, width: 440, height: 26, class: 'pl-old', style: 'stroke-width:2.4' }, Q);
  el('rect', { x: 30, y: 128, width: 440 * 2160 / 3000, height: 26, class: 'pl-wall' }, Q);
  lbl(Q, 486, 150, '[2160 / 3000] · armour [5], fortified', 'start', 22);
  const btn = (x, y, title, glyph, lines) => {
    el('rect', { x, y, width: 280, height: 250, rx: 14, class: 'pl-old', style: 'stroke-width:4' }, Q);
    glyph(x + 140, y + 74);
    text(Q, x + 140, y + 150, title.toUpperCase(), 'st-name', 'middle', 21);
    lines.forEach((l, i) => lbl(Q, x + 140, y + 186 + i * 28, l, 'middle', 21));
  };
  const gateGlyph = (cx, cy, up) => { el('path', { d: `M${cx - 42} ${cy + 34} V${cy - 22} H${cx + 42} V${cy + 34} M${cx - 18} ${cy + 34} V${cy + 6} A18 18 0 0 1 ${cx + 18} ${cy + 6} V${cy + 34}`, class: 'sc-glyph', style: 'stroke-width:3' }, Q); for (let i = 0; i < 4; i++) el('rect', { x: cx - 42 + i * 24, y: cy - 34, width: 14, height: 12, class: 'sc-glyph', style: 'stroke-width:2.4' }, Q); if (up) el('path', { d: `M${cx + 56} ${cy + 20} V${cy - 30} M${cx + 44} ${cy - 18} L${cx + 56} ${cy - 30} L${cx + 68} ${cy - 18}`, class: 'sc-glyph', style: 'stroke-width:3.4' }, Q); };
  btn(30, 190, 'reinforce', (x, y) => gateGlyph(x - 8, y, true), ['tier 3: [+800] hit points', '[300 g · 120 l · 60 s]']);
  btn(340, 190, 'armour', (x, y) => { el('path', { d: `M${x - 36} ${y - 34} H${x + 36} V${y + 2} C${x + 36} ${y + 22} ${x} ${y + 38} ${x} ${y + 38} C${x} ${y + 38} ${x - 36} ${y + 22} ${x - 36} ${y + 2} Z M${x - 18} ${y - 12} H${x + 18} M${x - 18} ${y + 4} H${x + 18}`, class: 'sc-glyph', style: 'stroke-width:3' }, Q); }, ['fortified, a tier at a time', '[ ] tiers, costs']);
  btn(650, 190, 'the crew', (x, y) => { el('path', { d: `M${x - 30} ${y + 30} L${x + 14} ${y - 14} M${x + 4} ${y - 30} L${x + 34} ${y} L${x + 22} ${y + 12} L${x - 8} ${y - 18} Z`, class: 'sc-glyph', style: 'stroke-width:3' }, Q); }, ['its size: [3] peasants', 'gold and lumber · 6.7']);
  lbl(Q, 30, CH - 46, 'no bill per hit point · repair capped per peasant · 6.7', 'start', 22);
  lbl(Q, 30, CH - 18, '[ ] v1\'s screen; values at balance', 'start', 20);

  /* ════════════ ONE GATE, THREE TOWNS, ONE LANGUAGE (2.4) ════════════ */
  const LG = document.getElementById('language'), LW = 960, LH = 620;
  const L = el('g', { class: 'hand-vellum' }, LG);
  el('rect', { width: LW, height: LH, class: 'view-frame' }, L);
  text(L, 30, 46, 'one gate, three towns · 2.4', 'sc-kick');
  // a gate in elevation, at a tier, with its two scout towers behind the wall built or not (rings)
  const gate = (cx, base, k, tier, towers) => {
    const g = el('g', { transform: `translate(${cx} ${base}) scale(${k})` }, L);
    [-150, 150].forEach((tx, i) => {
      if (i < towers) { el('rect', { x: tx - 24, y: -150, width: 48, height: 150, class: 'pl-old', style: 'stroke-width:3' }, g); el('path', { d: `M${tx - 32} -150 L${tx} -196 L${tx + 32} -150`, class: 'pl-old', style: 'stroke-width:3' }, g); }
      else el('ellipse', { cx: tx, cy: -96, rx: 30, ry: 10, class: 'pl-dim', style: 'stroke-width:2.6' }, g);
    });
    el('rect', { x: -230, y: -88, width: 460, height: 88, class: 'pl-old', style: 'stroke-width:3' }, g);
    el('rect', { x: -66, y: -140, width: 132, height: 140, class: 'pl-old', style: 'stroke-width:4' }, g);
    for (let i = 0; i < tier; i++) el('line', { x1: -66, y1: -122 + i * 14, x2: 66, y2: -122 + i * 14, class: 'ln-heavy', style: 'stroke-width:5' }, g);
    el('path', { d: 'M-30 0 V-44 A30 30 0 0 1 30 -44 V0 Z', class: 'pl-wall' }, g);
  };
  ['the hill', 'the valley', 'the forest'].forEach((t, i) => { const cx = 170 + i * 310; gate(cx, 250, .6, 2, 1); lbl(L, cx, 290, t, 'middle', 24); });
  lbl(L, LW / 2, 334, 'the same structure, every town', 'middle', 23);
  el('line', { x1: 30, y1: 362, x2: LW - 30, y2: 362, class: 'rule-2' }, L);
  // the phrasebook: what a captain says on the call, and what it means drawn
  [[2, 1, '“gate tier 2, one tower”', "v1's screen"], [2, 2, '“gate tier 2, towers up”', '2.4'], [3, 2, '“gate tier 3, towers up”', "v1's tooltip"]].forEach(([tier, tw, said, src], i) => {
    const cx = 170 + i * 310; gate(cx, 500, .5, tier, tw);
    lbl(L, cx, 540, said, 'middle', 22); lbl(L, cx, 568, src, 'middle', 18);
  });
  lbl(L, 30, LH - 18, 'bands, the gate\'s tier · a ring, a tower not yet built', 'start', 20);

  /* ════════════ THE GATE IN PLAN: from the hill (2.3 · 2.4 · 6.7) ════════════ */
  const PN = document.getElementById('plan'), PW = 1240, PH = 890;
  const N = el('g', { class: 'hand-vellum' }, PN);
  el('rect', { width: PW, height: PH, class: 'view-frame' }, N);
  text(N, 30, 46, 'the gate in plan · the hill', 'sc-kick');
  const k = .9, ox = 150, oy = 180, X = (x) => ox + x * k, Y = (y) => oy + y * k;
  // the north half of the town: walls cut, the gate's gap, the river and the little bridge, the hall, the barracks
  const T = 28, rv = M.river.filter(([x]) => x > -10 && x < M.W + 10);
  el('polyline', { points: pts(rv.map(([x, y]) => [X(x), Y(y)])), class: 'pl-river', style: `stroke-width:${46 * k + 4}` }, N);
  el('polyline', { points: pts(rv.map(([x, y]) => [X(x), Y(y)])), class: 'pl-riverp', style: `stroke-width:${46 * k - 2}` }, N);
  el('rect', { x: X(586), y: Y(236), width: 64 * k, height: 54 * k, class: 'pl-old', style: 'stroke-width:2.4' }, N);
  const wall = (x0, y0, x1, y1) => el('rect', { x: X(x0), y: Y(y0), width: (x1 - x0) * k, height: (y1 - y0) * k, class: 'pl-wall' }, N);
  wall(0, 0, M.gate.x0, T); wall(M.gate.x1, 0, M.W, T); wall(0, 0, T, M.riverGaps.west[0]); wall(0, M.riverGaps.west[1], T, 700); wall(M.W - T, 0, M.W, M.riverGaps.east[0]); wall(M.W - T, M.riverGaps.east[1], M.W, 700);
  for (const x of [M.W * .02, M.W * .98]) el('line', { x1: X(x), y1: Y(700), x2: X(x), y2: Y(760), class: 'ln-thin', style: 'stroke-width:2;stroke-dasharray:8 6' }, N);
  el('rect', { x: X(M.gate.x0 - 14), y: Y(-16), width: (M.gate.x1 - M.gate.x0 + 28) * k, height: 60 * k, class: 'pl-old', style: 'stroke-width:4;fill:url(#tg-h)' }, N);
  { const p = el('pattern', { id: 'tg-h', width: 8, height: 8, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, el('defs', {}, PN)); el('line', { x1: 0, y1: 1, x2: 8, y2: 1, style: 'stroke:var(--dv-line);stroke-width:1.4' }, p); }
  M.scouts.forEach(([x, y]) => { el('circle', { cx: X(x), cy: Y(y), r: 26 * k, class: 'pl-old', style: 'stroke-width:3' }, N); });
  M.plots.forEach((pl) => { if (pl.y < 720) el('circle', { cx: X(pl.x), cy: Y(pl.y), r: M.plotR * k, class: 'pl-dim', style: 'stroke-width:1.6' }, N); });
  M.spine.forEach((q) => { if (q.id !== 'barracks' && q.y0 < 700) el('rect', { x: X(q.x0), y: Y(q.y0), width: (q.x1 - q.x0) * k, height: (Math.min(q.y1, 700) - q.y0) * k, class: 'pl-dim', style: 'stroke-width:1.6' }, N); });
  const h = M.hall; el('rect', { x: X(h.x0), y: Y(h.y0), width: (h.x1 - h.x0) * k, height: (h.y1 - h.y0) * k, class: 'pl-old', style: 'stroke-width:3' }, N);
  const b = M.spine.find((q) => q.id === 'barracks'); el('rect', { x: X(b.x0), y: Y(b.y0), width: (b.x1 - b.x0) * k, height: (b.y1 - b.y0) * k, class: 'pl-old', style: 'stroke-width:3;fill:url(#tg-h)' }, N);
  lbl(N, X((h.x0 + h.x1) / 2), Y(h.y1) + 30, 'the hall', 'middle', 22); lbl(N, X((b.x0 + b.x1) / 2), Y(b.y1) + 30, 'the barracks', 'middle', 22);
  // the crew's run, out of the barracks and over the bridge to the gate (6.7); the garrison's rally behind the gate (2.3)
  const run = [[170, 560], [170, 420], [400, 330], [618, 290], [618, 70]];
  el('polyline', { points: pts(run.map(([x, y]) => [X(x), Y(y)])), class: 'ln-heavy', style: 'stroke-width:3.4;fill:none;stroke-dasharray:14 8' }, N);
  { const [x, y] = [X(618), Y(70)]; el('path', { d: `M${x} ${y} l-10 18 h20 Z`, class: 'arrow-h' }, N); }
  for (const [x, y] of [[560, 90], [600, 104], [640, 96], [680, 90], [580, 130], [660, 128]]) el('circle', { cx: X(x), cy: Y(y), r: 7, class: 'pl-wall' }, N);
  lbl(N, X(300), Y(450) - 4, "the crew's run · 6.7", 'start', 22); lbl(N, X(700), Y(150), 'the garrison rallies · 2.3', 'start', 22);
  lbl(N, X(M.scouts[1][0]) + 34, Y(M.scouts[1][1]) + 8, 'a scout-tower plot, behind the wall', 'start', 21);
  // the wave, from the north, onto the gate
  { const gx = X((M.gate.x0 + M.gate.x1) / 2); el('line', { x1: gx, y1: 70, x2: gx, y2: Y(-24) - 10, class: 'ln-heavy', style: 'stroke-width:6' }, N); el('path', { d: `M${gx} ${Y(-24)} l-14 -22 h28 Z`, class: 'arrow-h' }, N); lbl(N, gx + 22, 96, 'the wave, each night', 'start', 22); }
  lbl(N, X(M.gate.x0) - 22, Y(-26), 'the gate', 'end', 24);
  lbl(N, 30, PH - 18, 'the gate the same in every town; where it stands, the town\'s own', 'start', 20);

  /* ════════════ WHO DOES WHAT AT THE GATE: the chores, and the one choice (2.3 · 2.4 · 6.7) ════════════ */
  // v1 2.3: "chores to the garrison, the interesting part to the player" (the owner's pick, C, of three)
  const WH = document.getElementById('who'), WW = 1640, WHH = 890;
  const C2 = el('g', { class: 'hand-vellum' }, WH);
  el('rect', { width: WW, height: WHH, class: 'view-frame' }, C2);
  text(C2, 30, 46, 'who does what at the gate', 'sc-kick');
  const cast = [
    ['the garrison', (x, y) => [...F.footman(x - 26, y), ...F.footman(x + 26, y)], 'holds the gate', 'not yours · the barracks feeds it', '2.3'],
    ['the crew', (x, y) => [...F.peasant(x - 26, y, true), ...F.peasant(x + 26, y, true)], 'mends it, then goes home', 'not yours · no clicks, no bill', '6.7'],
    ['the scout towers', (x, y) => [{ t: 'rect', x: x - 34, y: y - 170, w: 68, h: 170, rc: 'f-tower' }, { t: 'poly', pts: [[x - 46, y - 170], [x, y - 230], [x + 46, y - 170]], rc: 'f-roof' }, { t: 'rect', x: x - 9, y: y - 140, w: 18, h: 30, rc: 'f-win', anim: 'm-win' }], 'shoot over the wall', 'built on their plots', '2.4'],
    ['you', (x, y) => F.rider(x, y), 'the one choice', 'stay, or go', 'A-101']];
  cast.forEach(([who, fig, does, note, ref], i) => {
    const cx = 205 + i * 410, base = 470;
    el('rect', { x: cx - 180, y: 110, width: 360, height: 400, rx: 18, class: i === 3 ? 'pl-old' : 'pl-dim', style: i === 3 ? 'stroke-width:5' : 'stroke-width:2.4' }, C2);
    const k2 = [1.9, 1.9, 1.3, 1.6][i]; render(fig(cx, base), el('g', { transform: `translate(${cx} ${base}) scale(${k2}) translate(${-cx} ${-base})` }, WH));
    text(C2, cx, 570, who.toUpperCase(), 'st-name', 'middle', 26);
    lbl(C2, cx, 616, does, 'middle', 26); lbl(C2, cx, 652, note, 'middle', 22); lbl(C2, cx, 686, ref, 'middle', 20);
  });
  el('path', { d: `M25 740 H${205 + 2 * 410 + 180}`, class: 'ln-thin', style: 'stroke-width:2' }, C2);
  lbl(C2, 25 + (3 * 410) / 2, 776, 'the chores', 'middle', 24); lbl(C2, 205 + 3 * 410, 776, 'the interesting part', 'middle', 24);
  lbl(C2, 30, WHH - 18, 'v1 2.3: chores to the garrison, the interesting part to the player · the night itself, T-202', 'start', 20);

  /* ════════════ the key, in the title block ════════════ */
  const kt = document.getElementById('keyt'); kt.setAttribute('class', 'hand-vellum');
  const row = (i, drawIt, label) => { const y = 22 + i * 36; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (q, x, y) => el('rect', { x: x - 22, y: y - 8, width: 44, height: 16, class: 'pl-wall' }, q), 'a wall, cut');
  row(1, (q, x, y) => el('circle', { cx: x, cy: y, r: 12, class: 'pl-old', style: 'stroke-width:3' }, q), 'a scout-tower plot · 2.4');
  row(2, (q, x, y) => { for (let i = 0; i < 2; i++) el('line', { x1: x - 20, y1: y - 5 + i * 10, x2: x + 20, y2: y - 5 + i * 10, class: 'ln-heavy', style: 'stroke-width:4' }, q); }, "bands: the gate's tier");
  row(3, (q, x, y) => el('line', { x1: x - 22, y1: y, x2: x + 22, y2: y, class: 'ln-heavy', style: 'stroke-width:3.4;stroke-dasharray:10 6' }, q), "the crew's run · 6.7");
  row(4, (q, x, y) => { for (const dx of [-14, 0, 14]) el('circle', { cx: x + dx, cy: y, r: 5, class: 'pl-wall' }, q); }, 'the garrison · 2.3');
  row(5, (q, x, y) => { el('line', { x1: x - 22, y1: y, x2: x + 8, y2: y, class: 'ln-heavy', style: 'stroke-width:5' }, q); el('path', { d: `M${x + 22} ${y} l-14 -9 v18 Z`, class: 'arrow-h' }, q); }, 'the wave, onto the gate');
  row(6, (q, x, y) => el('rect', { x: x - 22, y: y - 14, width: 44, height: 28, rx: 6, class: 'pl-dim' }, q), 'not yours: it runs itself');
  row(7, (q, x, y) => text(q, x, y + 8, '[ ]', 'pl-tier', null, 20), 'drawn, not sealed');
  }
})();
