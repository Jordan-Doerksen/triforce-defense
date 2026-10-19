/* sheet_t401.js — sheet T-401, the forge and the market (6.4 · 6.6 · 3.1). From v1 chapter 6 III and its two
   screens (the forge's window, the market's stock); every number on them is a placeholder, bracketed here.
   THE ART    a street by day: the smith at the anvil, sparks and smoke, a footman walking out with the new
              blade; across the street the market's stalls, potions, scrolls, boots and rings, a hero at them.
   THE DETAIL the forge's window, two ladders of six, opened by the hall; the market's shelf by hall tier, the
              rare rolled at the war council, the good items only from the wild; and the ladder drawn on the
              footman himself, six of him, the blade changing at III and the plate at V (R10's numbered steps). */
(function () {
  (document.fonts ? Promise.all([...document.fonts].map((f) => f.load().catch(() => null))).then(() => document.fonts.ready) : Promise.resolve()).then(draw);
  function draw() {
  const { el, pts, render } = window.WALL, F = window.FIG, { text } = window.TOWN;
  const lbl = (g, x, y, s, anchor, size) => text(g, x, y, s, 'pl-lbl', anchor, size || 24);
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'], HALL = ['town hall', 'town hall', 'keep', 'keep', 'castle', 'castle'];
  const sc = (parts, cx, base, k) => ({ t: 'g', transform: `translate(${cx} ${base}) scale(${k}) translate(${-cx} ${-base})`, kids: parts });

  // the footman at a forge tier (6.4; v1's forge screen: "the footman's blade changed at III; his plate changes at V")
  const footman = (cx, base, tier) => {
    let p = F.footman(cx, base);
    if (tier >= 3) {
      p = p.filter((q) => q.rc !== 'f-blade');
      p.push({ t: 'poly', pts: [[cx + 14, base - 30], [cx + 20, base - 34], [cx + 46, base - 90], [cx + 40, base - 94], [cx + 36, base - 86]], rc: 'f-steel' });
      p.push({ t: 'rect', x: cx + 8, y: base - 40, w: 18, h: 6, rc: 'f-flag' });
    }
    if (tier >= 5) {
      p.push({ t: 'rect', x: cx - 13, y: base - 52, w: 26, h: 26, rx: 5, rc: 'f-steel' }, { t: 'line', x1: cx - 13, y1: base - 40, x2: cx + 13, y2: base - 40, rc: 'f-blade' });
      for (const dx of [-16, 16]) p.push({ t: 'circle', cx: cx + dx, cy: base - 50, r: 7, rc: 'f-steel' });
      p.push({ t: 'poly', pts: [[cx - 3, base - 76], [cx + 8, base - 98], [cx + 14, base - 92], [cx + 4, base - 74]], rc: 'f-roof' });
    }
    return p;
  };

  /* ════════════ THE ART: the forge and the market, by day ════════════ */
  const A = document.getElementById('art'), AW = 1900, AH = 1130, G = 860;
  const art = [];
  art.push({ t: 'rect', x: 0, y: 0, w: AW, h: G, rc: 'f-sky2' }, { t: 'rect', x: 0, y: 520, w: AW, h: G - 520, rc: 'f-sky3' });
  art.push(...F.sun(220, 170));
  for (const [cx, cy, k] of [[760, 150, 1], [1440, 110, .8]]) for (const [dx, dy, r] of [[-60, 10, 34], [-20, -14, 44], [30, 0, 38], [70, 14, 28]]) art.push({ t: 'circle', cx: cx + dx * k, cy: cy + dy * k, r: r * k, rc: 'f-moon' });
  // the town wall behind, and the street
  art.push({ t: 'rect', x: 0, y: 600, w: AW, h: G - 600, rc: 'f-wall' });
  for (let x = 0; x < AW; x += 72) art.push({ t: 'rect', x: x + 16, y: 570, w: 40, h: 30, rc: 'f-merlon' });
  art.push({ t: 'rect', x: 0, y: G, w: AW, h: AH - G, rc: 'f-ground' });
  art.push({ t: 'poly', pts: [[820, G], [1060, G], [1240, AH], [640, AH]], rc: 'f-road' });
  // the smithy: stone, an open front with the forge's glow, a chimney smoking, the anvil and the smith
  art.push({ t: 'rect', x: 110, y: 470, w: 600, h: G - 470, rc: 'f-tower' });
  art.push({ t: 'poly', pts: [[80, 470], [410, 300], [740, 470]], rc: 'f-roof' });
  art.push({ t: 'rect', x: 560, y: 250, w: 70, h: 180, rc: 'f-iron' });
  for (const [dx, dy, r, dl] of [[0, -20, 26, 0], [18, -64, 34, .4], [-6, -116, 40, .8]]) art.push({ t: 'circle', cx: 595 + dx, cy: 250 + dy, r, rc: 'f-smoke', anim: 'm-puff', delay: dl });
  art.push({ t: 'rect', x: 170, y: 600, w: 300, h: G - 600, rc: 'f-arch' });
  art.push({ t: 'path', d: 'M230 800 C 250 740, 290 760, 300 720 C 320 760, 360 740, 380 800 Z', rc: 'f-flame', anim: 'm-flame' });
  for (const x of [520, 580, 640]) art.push({ t: 'line', x1: x, y1: 640, x2: x + 6, y2: 760, rc: 'f-blade' });
  art.push({ t: 'rect', x: 500, y: 760, w: 170, h: 14, rc: 'f-plank' });
  art.push({ t: 'poly', pts: [[640, G - 40], [740, G - 40], [760, G - 62], [620, G - 62]], rc: 'f-iron' }, { t: 'rect', x: 668, y: G - 40, w: 44, h: 40, rc: 'f-iron' });
  art.push(sc(F.peasant(800, G + 10, true), 800, G + 10, 1.6));
  for (const [x, y, dl] of [[724, G - 86, 0], [756, G - 104, .3], [700, G - 112, .6]]) art.push({ t: 'poly', pts: [[x, y - 9], [x + 3, y - 3], [x + 9, y], [x + 3, y + 3], [x, y + 9], [x - 3, y + 3], [x - 9, y], [x - 3, y - 3]], rc: 'f-flame', anim: 'm-tell', delay: dl });
  // a footman walking out with the new blade: the ladder shows on him (6.4)
  art.push({ t: 'g', anim: 'm-march', kids: [sc(footman(980, G + 120, 3), 980, G + 120, 2)] });
  // the market: three stalls under striped awnings, their goods on the boards (6.6)
  const goods = {
    potion: (x, y) => [{ t: 'circle', cx: x, cy: y - 14, r: 13, rc: 'f-shield' }, { t: 'rect', x: x - 5, y: y - 36, w: 10, h: 12, rc: 'f-bone' }],
    scroll: (x, y) => [{ t: 'rect', x: x - 18, y: y - 20, w: 36, h: 20, rx: 8, rc: 'f-bone' }, { t: 'line', x1: x - 10, y1: y - 10, x2: x + 10, y2: y - 10, rc: 'f-course' }],
    boot: (x, y) => [{ t: 'path', d: `M${x - 10} ${y - 34} H${x + 4} V${y - 10} H${x + 20} V${y} H${x - 10} Z`, rc: 'f-smock' }],
    ring: (x, y) => [{ t: 'circle', cx: x, cy: y - 14, r: 12, rc: 'f-flag' }, { t: 'circle', cx: x, cy: y - 14, r: 6, rc: 'f-sky2' }]
  };
  [[1110, ['potion', 'potion', 'scroll']], [1390, ['boot', 'ring', 'boot']], [1670, ['ring', 'potion', 'scroll']]].forEach(([cx, items]) => {
    for (const dx of [-120, 120]) art.push({ t: 'rect', x: cx + dx - 6, y: 600, w: 12, h: G - 600, rc: 'f-plank' });
    for (let i = 0; i < 6; i++) art.push({ t: 'poly', pts: [[cx - 140 + i * 46.7, 560], [cx - 140 + (i + 1) * 46.7, 560], [cx - 140 + (i + 1) * 46.7, 620], [cx - 140 + i * 46.7, 620]], rc: i % 2 ? 'f-flag' : 'f-roof' });
    art.push({ t: 'poly', pts: [[cx - 150, 560], [cx, 520], [cx + 150, 560]], rc: 'f-roof' });
    art.push({ t: 'rect', x: cx - 130, y: 740, w: 260, h: 26, rc: 'f-plank' }, { t: 'rect', x: cx - 120, y: 766, w: 240, h: G - 766, rc: 'f-smock' });
    items.forEach((it, i) => art.push(...goods[it](cx - 80 + i * 80, 740)));
  });
  art.push(sc(F.rider(1380, G + 120), 1380, G + 120, 1.15));
  art.push(sc(F.peasant(1700, G + 70, false), 1700, G + 70, 1.4), sc(F.peasant(1180, G + 60, false), 1180, G + 60, 1.3));
  render(art, el('g', { class: 'lit-day' }, A));
  el('rect', { width: AW, height: AH, class: 'view-frame', style: 'stroke-width:8' }, A);

  /* ════════════ THE FORGE'S WINDOW: two ladders of six, opened by the hall (6.4) ════════════ */
  const FG = document.getElementById('forge'), FW = 960, FH = 560;
  const Q = el('g', { class: 'hand-vellum' }, FG);
  el('rect', { width: FW, height: FH, class: 'view-frame' }, Q);
  text(Q, 30, 46, "the forge's window · 6.4", 'sc-kick');
  const x0 = 270, cw = 108, done = { weapons: 3, armour: 2 }, open = 4;   // v1's screen: Weapons III / Armour II, at the Keep
  ['weapons', 'armour'].forEach((row, r) => {
    const y = 150 + r * 110;
    text(Q, 30, y + 8, row.toUpperCase(), 'st-name', 'start', 22);
    ROMAN.forEach((n, i) => {
      const x = x0 + i * cw, has = i < done[row], lock = i >= open;
      el('rect', { x: x - 44, y: y - 40, width: 88, height: 80, rx: 10, class: has ? 'pl-wall' : lock ? 'pl-dim' : 'pl-old', style: has ? '' : 'stroke-width:3' }, Q);
      const t = text(Q, x, y + 12, n, 'pl-tier', null, 30); if (has) t.style.fill = 'var(--dv-paper)';
      if (lock) el('path', { d: `M${x + 24} ${y - 24} h14 v12 h-14 Z M${x + 27} ${y - 24} v-5 a4 4 0 0 1 8 0 v5`, class: 'ln-thin', style: 'stroke-width:2' }, Q);
    });
  });
  ROMAN.forEach((n, i) => { if (i % 2 === 0) { const x = x0 + i * cw + cw / 2; el('path', { d: `M${x - cw + 16} 318 V328 H${x + cw - 16} V318`, class: 'ln-thin', style: 'stroke-width:2' }, Q); lbl(Q, x, 356, HALL[i], 'middle', 22); } });
  lbl(Q, x0 + 2 * cw, 96, 'the blade changes', 'middle', 20); lbl(Q, x0 + 4 * cw, 96, 'the plate changes', 'middle', 20);
  // the tooltip, as v1's screen has it
  el('rect', { x: 30, y: 386, width: FW - 60, height: 108, rx: 10, class: 'pl-old', style: 'stroke-width:2.4' }, Q);
  text(Q, 50, 422, 'WEAPONS IV', 'st-name', 'start', 22);
  lbl(Q, 50, 454, '+1 attack damage: footmen, riflemen, knights, engines', 'start', 22);
  lbl(Q, 50, 482, 'the fourth of six · [400 g · 200 l · 75 s]', 'start', 21);
  lbl(Q, 30, FH - 22, 'per town, not shared · [ ] v1\'s screen, at the Keep', 'start', 20);

  /* ════════════ THE MARKET'S SHELF: by hall tier (6.6 · 3.1) ════════════ */
  const MK = document.getElementById('market'), MW = 960, MH = 620;
  const K = el('g', { class: 'hand-vellum' }, MK);
  el('rect', { width: MW, height: MH, class: 'view-frame' }, K);
  text(K, 30, 46, "the market's shelf · 6.6", 'sc-kick');
  const icon = {
    potion: (g, x, y) => el('path', { d: `M${x - 6} ${y - 30} h12 v10 a18 18 0 1 1 -12 0 Z`, class: 'sc-glyph', style: 'stroke-width:3' }, g),
    scroll: (g, x, y) => el('path', { d: `M${x - 22} ${y - 18} h36 a8 8 0 0 1 0 16 h-36 a8 8 0 0 1 0 -16 M${x - 22} ${y - 2} v14 h36 a8 8 0 0 0 0 -16`, class: 'sc-glyph', style: 'stroke-width:3' }, g),
    boot: (g, x, y) => el('path', { d: `M${x - 12} ${y - 30} h16 v22 h16 a6 6 0 0 1 6 6 v6 h-38 Z`, class: 'sc-glyph', style: 'stroke-width:3' }, g),
    ring: (g, x, y) => { el('circle', { cx: x, cy: y - 2, r: 16, class: 'sc-glyph', style: 'stroke-width:3' }, g); el('path', { d: `M${x - 6} ${y - 24} l6 -8 l6 8 Z`, class: 'sc-glyph', style: 'stroke-width:2.4' }, g); }
  };
  const items = [['potion', 'a potion', 150, 300], ['scroll', 'town portal, home only', 350, 500], ['boot', 'a boot', 250, 600], ['ring', 'a ring', 400, 800]];
  [['TOWN HALL', 0], ['KEEP', 1]].forEach(([tier, k], r) => {
    const y = 140 + r * 150;
    text(K, 30, y + 8, tier, 'st-name', 'start', 22);
    items.forEach(([id, name, p1, p2], i) => {
      const x = 270 + i * 180;
      el('rect', { x: x - 70, y: y - 56, width: 140, height: 112, rx: 10, class: 'pl-old', style: `stroke-width:${k ? 4.5 : 3}` }, K);
      icon[id](K, x, y);
      if (k) text(K, x + 50, y - 30, '+', 'pl-tier', null, 26);
      lbl(K, x, y + 44, `[${k ? p2 : p1}]`, 'middle', 21);
      if (!k) lbl(K, x, y - 70, name, 'middle', 19);
    });
  });
  lbl(K, 30, 320, 'the next step', 'start', 19); lbl(K, 30, 344, 'of each', 'start', 19);
  { const y = 440; text(K, 30, y + 8, 'CASTLE', 'st-name', 'start', 22);
    el('rect', { x: 200, y: y - 56, width: 140, height: 112, rx: 10, class: 'pl-old', style: 'stroke-width:4.5;stroke-dasharray:10 6' }, K);
    text(K, 270, y + 18, '?', 'st-num', null, 64);
    lbl(K, 370, y - 8, 'one rare per market,', 'start', 22); lbl(K, 370, y + 22, 'rolled at the war council', 'start', 22); }
  // the good items: only the wild's (3.1)
  el('path', { d: `M${MW - 70} 520 V430`, class: 'ln-heavy', style: 'stroke-width:4' }, K); el('path', { d: `M${MW - 70} 416 l-12 18 h24 Z`, class: 'arrow-h' }, K);
  lbl(K, MW - 90, 548, 'the good items: only from the wild · 3.1 · W-103', 'end', 21);
  lbl(K, 30, MH - 22, '[ ] v1\'s prices; the icons, placeholders', 'start', 20);

  /* ════════════ THE LADDER, ON THE FOOTMAN HIMSELF (6.4 · R10) ════════════ */
  const LD = document.getElementById('ladder'), LW = 2920, LH = 890;
  const L = el('g', { class: 'hand-vellum' }, LD);
  el('rect', { width: LW, height: LH, class: 'view-frame' }, L);
  text(L, 30, 46, 'the ladder, on the footman himself · 6.4', 'sc-kick');
  const step = (LW - 240) / 6;
  ROMAN.forEach((n, i) => {
    const cx = 160 + step * i + step / 2, base = 600;
    text(L, cx - 150, 190, n, 'st-num', 'start', 110);
    render([sc(footman(cx + 30, base, i + 1), cx + 30, base, 3.4)], el('g', {}, LD));
    lbl(L, cx + 20, 660, `weapons ${n} · armour ${n}`, 'middle', 23);
    if (i === 2) lbl(L, cx + 20, 696, 'the blade changes', 'middle', 25).style.fontWeight = '700';
    if (i === 4) lbl(L, cx + 20, 696, 'the plate changes', 'middle', 25).style.fontWeight = '700';
    if (i % 2 === 0) { const x1 = cx - step / 2 + 30, x2 = cx + step * 1.5 - 30; el('path', { d: `M${x1} 740 V756 H${x2} V740`, class: 'ln-heavy', style: 'stroke-width:3;fill:none' }, L); text(L, (x1 + x2) / 2, 796, HALL[i].toUpperCase(), 'st-name', 'middle', 26); }
  });
  lbl(L, 30, LH - 22, 'late nights scale by upgrades, not by spamming units · 6.4', 'start', 22);

  /* ════════════ the key, in the title block ════════════ */
  const kt = document.getElementById('keyt'); kt.setAttribute('class', 'hand-vellum');
  const row = (i, drawIt, label) => { const y = 22 + i * 36; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (q, x, y) => el('rect', { x: x - 18, y: y - 14, width: 36, height: 28, rx: 5, class: 'pl-wall' }, q), 'researched');
  row(1, (q, x, y) => el('rect', { x: x - 18, y: y - 14, width: 36, height: 28, rx: 5, class: 'pl-old', style: 'stroke-width:2.6' }, q), 'open, not yet bought');
  row(2, (q, x, y) => el('rect', { x: x - 18, y: y - 14, width: 36, height: 28, rx: 5, class: 'pl-dim' }, q), 'locked: requires the hall');
  row(3, (q, x, y) => text(q, x, y + 8, '+', 'pl-tier', null, 24), "an item's next step, at the Keep");
  row(4, (q, x, y) => text(q, x, y + 10, '?', 'pl-tier', null, 28), 'the rare, rolled at setup');
  row(5, (q, x, y) => { el('line', { x1: x, y1: y + 12, x2: x, y2: y - 4, class: 'ln-heavy', style: 'stroke-width:4' }, q); el('path', { d: `M${x} ${y - 14} l-9 13 h18 Z`, class: 'arrow-h' }, q); }, 'from the wild · 3.1');
  row(6, (q, x, y) => text(q, x, y + 8, 'III', 'pl-tier', null, 20), 'a forge tier');
  row(7, (q, x, y) => text(q, x, y + 8, '[ ]', 'pl-tier', null, 20), 'a placeholder, not sealed');
  }
})();
