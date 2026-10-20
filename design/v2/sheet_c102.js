/* sheet_c102.js — sheet C-102, the horde, night by night (the owner's ideas and interview of 19 Oct; docs/HORDE.md;
   1.4 · 7 · 9). Two faces from MODELS.horde and MODELS.clock:
   THE ART    the horde on the road through the thirteen nights, more of it every night: a milestone a night, the
              event nights flagged, a new unit every second night as one roll of many has them, the night's aura
              glowing stronger under it, and at the gate night 13's boss, as his shadow (chosen at the fire, W-102).
   THE DETAIL every night more and stronger (the count; the night's aura, normal and hard), every second night a
              new unit; the roll as the players see it on the clock; the table rolled at the fire, a pair each add
              night, the repeat links drawn; and WC3's tiers as a staircase of three buildings, hard's wyrm above. */
(function () {
  (document.fonts ? Promise.all([...document.fonts].map((f) => f.load().catch(() => null))).then(() => document.fonts.ready) : Promise.resolve()).then(draw);
  function draw() {
  const { el, pts, render } = window.WALL, F = window.FIG, { text } = window.TOWN;
  const HM = window.MODELS.horde, CL = window.MODELS.clock;
  const lbl = (g, x, y, s, anchor, size) => text(g, x, y, s, 'pl-lbl', anchor, size || 24);
  const N = CL.nights, EVENTS = [...CL.events.draws, CL.events.last], BOSS = CL.finale.night;
  // the add nights: a new unit every second night, before the boss (HM.adds)
  const ADDS = []; for (let n = HM.adds.first; n < BOSS; n += HM.adds.every) ADDS.push(n);
  const named = (n) => HM.table.some((r) => r.night === n);
  const sc = (parts, cx, base, k) => ({ t: 'g', transform: `translate(${cx} ${base}) scale(${k}) translate(${-cx} ${-base})`, kids: parts });
  const face = (x, parts) => ({ t: 'g', transform: `translate(${2 * x} 0) scale(-1 1)`, kids: parts });
  const FIGS = { ghoul: F.ghoul, skeleton: F.skeleton, fiend: F.fiend, necro: F.necro, shade: F.shade, abom: F.abom, webspinner: F.webspinner,
    ghost: F.ghost, frostrev: F.frostrev, lightrev: F.lightrev, grunt: F.grunt, wyrm: F.wyrm };
  const { ROMAN } = window.TOWN;
  // how many rolls the table holds: each night's pair, less whatever is already in by then (HM.repeat)
  const rolls = (function count(i, inn) {
    if (i === HM.table.length) return 1;
    const free = HM.table[i].pair.filter((k) => !inn.includes(k));
    return (free.length ? free : [null]).reduce((s, k) => s + count(i + 1, k ? [...inn, k] : inn), 0);
  })(0, []);
  // the horde on a night, for the example roll: the base, and what each night of the table added by then
  const hordeOn = (n, roll) => [...HM.base, ...HM.table.filter((r) => r.night <= n).map((r) => roll[r.night])];
  // night 13's boss, chosen at the fire from three (W-102): drawn as his shadow, crowned, eyes lit
  const bossShadow = (cx, base) => [
    { t: 'path', d: `M${cx - 30} ${base} C ${cx - 34} ${base - 50}, ${cx - 22} ${base - 96}, ${cx} ${base - 100} C ${cx + 22} ${base - 96}, ${cx + 34} ${base - 50}, ${cx + 30} ${base} Z`, rc: 'f-obelisk' },
    { t: 'poly', pts: [[cx - 14, base - 96], [cx - 18, base - 120], [cx - 6, base - 104], [cx, base - 124], [cx + 6, base - 104], [cx + 18, base - 120], [cx + 14, base - 96]], rc: 'f-obelisk' },
    { t: 'circle', cx: cx - 6, cy: base - 84, r: 3, rc: 'f-eye', anim: 'm-tell' },
    { t: 'circle', cx: cx + 6, cy: base - 84, r: 3, rc: 'f-eye', anim: 'm-tell' }
  ];

  /* ════════════ THE ART: the horde on the road, night by night ════════════ */
  const A = document.getElementById('art'), AW = 1900, AH = 1130;
  const art = [];
  art.push({ t: 'rect', x: 0, y: 0, w: AW, h: 420, rc: 'f-sky1' }, { t: 'rect', x: 0, y: 300, w: AW, h: 120, rc: 'f-sky2' }, { t: 'rect', x: 0, y: 380, w: AW, h: 40, rc: 'f-sky3' });
  for (let i = 0; i < 40; i++) art.push({ t: 'circle', cx: (i * 397) % AW, cy: 20 + (i * 131) % 300, r: 2.4, rc: 'f-star', anim: 'm-star', delay: (i % 5) * .5 });
  art.push(...F.moon(1720, 120));
  art.push({ t: 'path', d: `M0 420 C 200 380, 420 400, 640 390 S 1100 370, 1300 395 S 1700 380, ${AW} 400 V${AH} H0 Z`, rc: 'f-hill' });
  art.push({ t: 'rect', x: 0, y: 470, w: AW, h: AH - 470, rc: 'f-blight' });
  // the road: across the far side and back along the near side, a switchback, to the gate at its end
  const top = 560, bot = 920;
  art.push({ t: 'path', d: `M-20 ${top} H1740 C 1880 ${top}, 1880 ${bot}, 1740 ${bot} H180`, rc: 'f-road-edge', style: 'stroke-width:96' });
  art.push({ t: 'path', d: `M-20 ${top} H1740 C 1880 ${top}, 1880 ${bot}, 1740 ${bot} H180`, rc: 'f-road-fill', style: 'stroke-width:84' });
  // the gate at the road's end
  art.push({ t: 'rect', x: 0, y: bot - 230, w: 190, h: 290, rc: 'f-wall' }, { t: 'path', d: `M60 ${bot + 40} V${bot - 60} A50 50 0 0 1 160 ${bot - 60} V${bot + 40} Z`, rc: 'f-arch' });
  for (let i = 0; i < 4; i++) art.push({ t: 'rect', x: 4 + i * 48, y: bot - 262, w: 32, h: 32, rc: 'f-merlon' });
  const at = (n) => (n <= 7 ? [120 + (n - 1) * 262, top] : [1640 - (n - 8) * 262, bot]);
  for (let n = 1; n <= N; n++) {
    const [x, y] = at(n), right = n <= 7, lvl = n / N;
    // the night's aura, stronger as the nights go (the owner: one aura a night)
    art.push({ t: 'ellipse', cx: x, cy: y + 18, rx: 70 + 40 * lvl, ry: 14 + 6 * lvl, rc: 'f-aura', style: `opacity:${(.35 + .6 * lvl).toFixed(2)}`, anim: 'm-tell' });
    const kinds = n === BOSS ? ['ghoul'] : hordeOn(n, HM.example), count = n === BOSS ? 1 : 2 + Math.floor(n * .8);
    for (let i = 0; i < count; i++) {
      const k = kinds[i % kinds.length], fx = x - 66 + (i % 4) * 40 + (Math.floor(i / 4) % 2) * 18, fy = y - 6 + Math.floor(i / 4) * 18;
      let f = FIGS[k](fx, fy, i * .1);
      if (n === BOSS) f = [{ t: 'ellipse', cx: fx, cy: fy, rx: 60, ry: 12, rc: 'f-aura', anim: 'm-tell' }, ...bossShadow(fx, fy)];
      const fig = sc(f, fx, fy, n === BOSS ? 1.7 : .8);
      art.push(right ? face(fx, [fig]) : fig);
    }
    // the milestone: the night's number; the event nights flagged (7.1); night 13's own
    const mx = x + (right ? 92 : -92), my = y - 54;
    art.push({ t: 'rect', x: mx - 22, y: my - 30, w: 44, h: 54, rx: 10, rc: 'f-bone' });
    if (EVENTS.includes(n)) art.push({ t: 'line', x1: mx + 18, y1: my - 30, x2: mx + 18, y2: my - 96, rc: 'f-pole' }, { t: 'poly', pts: [[mx + 18, my - 96], [mx + 58, my - 86], [mx + 18, my - 72]], rc: 'f-flag', anim: 'm-flag' });
  }
  const g = el('g', {}, A); render(art, g);
  for (let n = 1; n <= N; n++) { const [x, y] = at(n), mx = x + (n <= 7 ? 92 : -92), my = y - 54; text(g, mx, my + 10, String(n), 'pl-tier', null, 26).style.fill = 'var(--f-ink)'; }
  el('rect', { width: AW, height: AH, class: 'view-frame', style: 'stroke-width:8' }, A);

  /* ════════════ EVERY NIGHT MORE AND STRONGER; EVERY SECOND NIGHT, A NEW UNIT (the owner, 19 Oct) ════════════ */
  const AU = document.getElementById('aura'), UW = 960, UH = 560;
  const U = el('g', { class: 'hand-vellum' }, AU);
  el('rect', { width: UW, height: UH, class: 'view-frame' }, U);
  text(U, 30, 46, 'every night, more and stronger', 'sc-kick');
  const ux0 = 190, ucw = (UW - ux0 - 40) / N;
  for (let n = 1; n <= N; n++) {
    const x = ux0 + (n - .5) * ucw;
    text(U, x, 108, String(n), 'pl-tier', null, 22);
    if (EVENTS.includes(n)) el('path', { d: `M${x - 9} 76 l18 0 l-9 -16 Z`, class: 'arrow-h' }, U);
    // a new unit, every second night: a pair named, filled; to come, open
    if (ADDS.includes(n)) el('path', { d: `M${x} 134 l12 15 l-12 15 l-12 -15 Z`, class: 'ln-heavy', style: `stroke-width:2.4;fill:${named(n) ? 'var(--f-ink)' : 'none'}` }, U);
    // more: the count, a bar a night, to the boss's night
    if (n < BOSS) { const bh = 10 + n * 4.5; el('rect', { x: x - 9, y: 250 - bh, width: 18, height: bh, class: 'ln-heavy', style: 'stroke-width:2;fill:none' }, U); }
    // stronger: the night's aura, normal and hard
    HM.difficulties.forEach((d, r) => {
      const y = 302 + r * 88, rr = 6 + n * 1.5 + r * 4;
      el('circle', { cx: x, cy: y, r: rr, class: 'ln-heavy', style: `fill:none;stroke-width:${2 + r * 1.6}` }, U);
      if (r) el('circle', { cx: x, cy: y, r: rr - 6, class: 'ln-thin', style: 'fill:none;stroke-width:1.6' }, U);
    });
  }
  text(U, 30, 157, 'NEW UNIT', 'st-name', 'start', 22); text(U, 30, 228, 'MORE', 'st-name', 'start', 22);
  HM.difficulties.forEach((d, r) => text(U, 30, 310 + r * 88, d.toUpperCase(), 'st-name', 'start', 22));
  lbl(U, ux0 + (BOSS - .5) * ucw, 228, 'the boss', 'middle', 18);
  lbl(U, 30, 450, "stronger: the night's aura, no unit edited,", 'start', 21);
  lbl(U, 30, 476, 'one hidden caster per gate, its level set at dusk', 'start', 21);
  lbl(U, 30, 506, '◆ a new unit, every second night · ▲ an event night · 7.1', 'start', 21);
  lbl(U, 30, UH - 20, '[ ] how many more, which stats, how much: at balance', 'start', 21);

  /* ════════════ SHOWN AT THE FIRE: the roll on the clock ════════════ */
  const CK = document.getElementById('clock'), KW = 960, KH = 620;
  const K = el('g', { class: 'hand-vellum' }, CK);
  el('rect', { width: KW, height: KH, class: 'view-frame' }, K);
  text(K, 30, 46, 'shown at the fire', 'sc-kick');
  const strip = el('g', { transform: 'translate(30 110)' }, CK), SW = KW - 60, SH = 260, cw = SW / N;
  const sp = [{ t: 'rect', x: 0, y: 0, w: SW, h: SH, rc: 'f-sky1' }];
  for (let n = 1; n <= N; n++) {
    const x = (n - .5) * cw;
    sp.push({ t: 'circle', cx: x, cy: 196, r: 16, rc: n === BOSS ? 'f-flame' : 'f-moon' });
    if (EVENTS.includes(n)) sp.push({ t: 'poly', pts: [[x - 10, 236], [x + 10, 236], [x, 220]], rc: 'f-flag' });
    if (named(n)) { const k = HM.example[n]; sp.push(sc(FIGS[k](x, 150, 0), x, 150, .85)); }
  }
  render(sp, strip);
  for (let n = 1; n <= N; n++) { const t = text(strip, (n - .5) * cw, 252, String(n), 'pl-tier', null, 15); t.style.fill = 'var(--f-moon)'; }
  el('rect', { x: 30, y: 110, width: SW, height: SH, class: 'view-frame', style: 'stroke-width:3' }, K);
  const said = HM.table.map((r, i) => `${i ? '' : 'night '}${r.night}, ${HM.units[HM.example[r.night]].name}`);
  lbl(K, 30, 420, 'before night 1, the players see the roll:', 'start', 23);
  lbl(K, 30, 452, said.slice(0, 3).join('; ') + ';', 'start', 23);
  lbl(K, 30, 482, said.slice(3).join('; '), 'start', 23);
  lbl(K, 30, 526, 'time to build a tower inside before the shades come', 'start', 21);
  lbl(K, 30, KH - 22, `one roll of ${rolls} · the clock, C-101 · [ ] the look, a sketch`, 'start', 20);

  /* ════════════ THE TABLE, ROLLED AT THE FIRE: a pair each add night (the owner, 19 Oct) ════════════ */
  const TB = document.getElementById('table'), TW = 1640, TH = 890;
  const T = el('g', { class: 'hand-vellum' }, TB);
  el('rect', { width: TW, height: TH, class: 'view-frame' }, T);
  text(T, 30, 46, 'the table, rolled at the fire', 'sc-kick');
  // a column a night: night 1's base, then each add night's pair; a card per unit, its tier's badge in the corner
  const cols = [{ night: 1, pair: HM.base, base: true }, ...HM.table], cW = (TW - 40) / cols.length, CWD = 196, CHT = 232;
  const cy0 = 128, cy1 = 420, colX = (i) => 20 + (i + .5) * cW, tierOf = (k) => HM.tiers.find((t) => t.units.includes(k)).tier;
  const card = (x, y, k) => {
    el('rect', { x: x - CWD / 2, y, width: CWD, height: CHT, rx: 14, class: 'pl-old', style: 'stroke-width:3;fill:var(--dv-paper)' }, T);
    el('circle', { cx: x + CWD / 2 - 22, cy: y + 22, r: 15, class: 'ln-thin', style: 'fill:none;stroke-width:2' }, T);
    text(T, x + CWD / 2 - 22, y + 29, ROMAN[tierOf(k) - 1], 'pl-tier', null, 17);
    render([sc(FIGS[k](x, y + 132, 0), x, y + 132, .95)], el('g', {}, TB));
    const u = HM.units[k];
    lbl(T, x, y + 166, u.name, 'middle', 20);
    lbl(T, x, y + 190, `lvl ${u.lvl} · ${u.hp} hp`, 'middle', 16);
    if (u.does) lbl(T, x, y + 214, u.does, 'middle', 15);
  };
  cols.forEach((c, i) => {
    const x = colX(i);
    text(T, x, 98, c.base ? 'NIGHT 1' : `NIGHT ${c.night}`, 'st-name', 'middle', 24);
    card(x, cy0, c.pair[0]); card(x, cy1, c.pair[1]);
    const again = HM.table.find((r) => r.night < c.night && r.pair.join() === c.pair.join());
    lbl(T, x, cy1 - 24, c.base ? 'and' : again ? 'the other' : 'or', 'middle', 22);
  });
  // the repeat links: a unit already in is struck from its pair, and the other comes (HM.repeat)
  const link = (i0, y0, i1, y1) => el('path', { d: `M${colX(i0) + CWD / 2 + 4} ${y0} C ${colX(i0) + cW / 2 + 10} ${y0}, ${colX(i1) - cW / 2 - 10} ${y1}, ${colX(i1) - CWD / 2 - 4} ${y1}`, class: 'ln-thin', style: 'fill:none;stroke-width:2.4;stroke-dasharray:4 7' }, T);
  HM.table.forEach((r, i) => HM.table.slice(0, i).forEach((q, h) => q.pair.forEach((k, a) => {
    const b = r.pair.indexOf(k);
    if (b >= 0) link(h + 1, (a ? cy1 : cy0) + CHT / 2, i + 1, (b ? cy1 : cy0) + CHT / 2);
  })));
  lbl(T, 30, TH - 112, 'a unit already in is struck from its pair: the other comes (- - -)', 'start', 21);
  lbl(T, 30, TH - 82, 'night 10 is night 8 again: every match has both by night 10', 'start', 21);
  lbl(T, 30, TH - 52, 'I II III: its tier, at right · lvl and hp: the game\'s data (docs/UNDEAD.md)', 'start', 21);
  lbl(T, 30, TH - 22, 'the shade: an attack added in data (the stock one has none)', 'start', 21);

  /* ════════════ ON WC3'S TIERS: none before its night (the owner, 19 Oct) ════════════ */
  const TI = document.getElementById('tiers'), IW = 1240, IH = 890;
  const I = el('g', { class: 'hand-vellum' }, TI);
  el('rect', { width: IW, height: IH, class: 'view-frame' }, I);
  text(I, 30, 46, "on WC3's tiers: none before its night", 'sc-kick');
  lbl(I, 30, 96, 'the building that unlocks it in melee;', 'start', 22);
  lbl(I, 30, 124, 'campaign and neutral undead by level;', 'start', 22);
  lbl(I, 30, 152, 'the same on normal and hard', 'start', 22);
  const ix0 = 40, iw = (IW - 80) / HM.tiers.length, ifloor = 740;
  HM.tiers.forEach((tr, i) => {
    const x = ix0 + i * iw, top = 640 - i * 150, mid = x + iw / 2;
    el('rect', { x, y: top, width: iw, height: ifloor - top, class: 'pl-old', style: 'stroke-width:3;fill:var(--dv-paper)' }, I);
    text(I, mid, top + 40, tr.building.toUpperCase(), 'st-name', 'middle', 21);
    lbl(I, mid, top + 68, `tier ${ROMAN[tr.tier - 1]} · from night ${tr.from}`, 'middle', 19);
    tr.units.forEach((k, j) => {
      const fx = mid + (j - (tr.units.length - 1) / 2) * 88;
      render([sc(FIGS[k](fx, top, j * .2), fx, top, .85)], el('g', {}, TI));
    });
    // hard's flyer over its tier, its shadow on the step among the others
    (tr.hard || []).forEach((k) => render([sc(FIGS[k](mid + 110, top, 0, 180), mid + 110, top, .85)], el('g', {}, TI)));
    const names = tr.units.map((k) => HM.units[k].name);
    for (let l = 0; l * 2 < names.length; l++) lbl(I, mid, ifloor + 30 + l * 24, names.slice(l * 2, l * 2 + 2).join(' · '), 'middle', 17);
    if (tr.hard) lbl(I, mid, ifloor + 30 + Math.ceil(names.length / 2) * 24, tr.hard.map((k) => HM.units[k].name).join(' · ') + ': hard only', 'middle', 17);
  });
  el('line', { x1: ix0 - 10, y1: ifloor, x2: ix0 + HM.tiers.length * iw + 10, y2: ifloor, class: 'ln-heavy', style: 'stroke-width:3' }, I);
  const ht = HM.tiers.findIndex((t) => t.hard);
  lbl(I, ix0 + ht * iw + iw / 2 + 30, 640 - ht * 150 - 168, 'hard only', 'end', 20);

  /* ════════════ the key, in the title block ════════════ */
  const kt = document.getElementById('keyt'); kt.setAttribute('class', 'hand-vellum');
  const row = (i, drawIt, label) => { const y = 22 + i * 36; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (q, x, y) => { el('circle', { cx: x, cy: y, r: 9, class: 'ln-heavy', style: 'fill:none;stroke-width:2' }, q); el('circle', { cx: x + 14, cy: y, r: 13, class: 'ln-heavy', style: 'fill:none;stroke-width:2.6' }, q); }, "the night's aura, growing");
  row(1, (q, x, y) => el('path', { d: `M${x - 9} ${y + 8} l18 0 l-9 -16 Z`, class: 'arrow-h' }, q), 'an event night · 7.1');
  row(2, (q, x, y) => { el('line', { x1: x - 20, y1: y, x2: x - 4, y2: y, class: 'ln-heavy', style: 'stroke-width:3' }, q); el('line', { x1: x - 4, y1: y - 10, x2: x - 4, y2: y + 10, class: 'ln-heavy', style: 'stroke-width:3' }, q); el('line', { x1: x - 4, y1: y - 10, x2: x + 18, y2: y - 10, class: 'ln-thin', style: 'stroke-width:2' }, q); el('line', { x1: x - 4, y1: y + 10, x2: x + 18, y2: y + 10, class: 'ln-thin', style: 'stroke-width:2' }, q); }, 'a pair: one is rolled');
  row(3, (q, x, y) => { el('rect', { x: x - 20, y: y - 14, width: 40, height: 28, rx: 6, class: 'pl-old', style: 'stroke-width:3;fill:none;stroke-dasharray:4 5' }, q); el('line', { x1: x - 16, y1: y + 10, x2: x + 16, y2: y - 10, class: 'ln-heavy', style: 'stroke-width:3' }, q); }, 'already in: struck');
  row(4, (q, x, y) => { el('circle', { cx: x, cy: y, r: 14, class: 'ln-thin', style: 'fill:none;stroke-width:2' }, q); text(q, x, y + 7, 'II', 'pl-tier', null, 16); }, "a tier, WC3's");
  row(5, (q, x, y) => text(q, x, y + 8, '7', 'pl-tier', null, 20), 'a night of thirteen');
  row(6, (q, x, y) => text(q, x, y + 8, 'C-101', 'pl-tier', null, 13), 'a sheet');
  row(7, (q, x, y) => text(q, x, y + 8, '[ ]', 'pl-tier', null, 20), 'to come, or not sealed');
  }
})();
