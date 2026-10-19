/* sheet_c102.js — sheet C-102, the horde, night by night (the owner's ideas of 19 Oct; 1.4 · 7 · 9). Two faces
   from MODELS.horde and MODELS.clock:
   THE ART    the horde on the road through the thirteen nights, more of it every night: a milestone a night, the
              event nights flagged, a new unit every second night as one roll of many has them, the night's aura
              glowing stronger under it, night 13's boss at the end, at the gate.
   THE DETAIL every night more and stronger (the count; the night's aura, normal and hard), every second night a
              new unit; the roll as the captains see it on the clock; the table, rolled at the fire, as a tree (a
              unit already in is struck from its pair: the other comes), and beside it the tiers as a staircase
              (none before its night); and the shade, which blinks inside the walls, with the answer inside. */
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
  const FIGS = { ghoul: F.ghoul, skeleton: F.skeleton, fiend: F.fiend, necro: F.necro, shade: F.shade, abom: F.abom };
  // the horde on a night, for the example roll: the base, and what each night of the table added by then
  const hordeOn = (n, roll) => [...HM.base, ...HM.table.filter((r) => r.night <= n).map((r) => roll[r.night])];

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
      if (n === BOSS) f = [{ t: 'ellipse', cx: fx, cy: fy, rx: 60, ry: 12, rc: 'f-aura', anim: 'm-tell' }, ...F.ghoul(fx, fy, 0)];
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
    if (named(n)) { const k = HM.example[n]; sp.push(sc(FIGS[k](x, 140, 0), x, 140, .9)); }
    else if (ADDS.includes(n)) sp.push({ t: 'poly', pts: [[x, 92], [x + 13, 108], [x, 124], [x - 13, 108]], rc: 'f-moon', style: 'fill:none;stroke:var(--f-moon);stroke-width:2.4;stroke-dasharray:4 4' });
  }
  render(sp, strip);
  for (let n = 1; n <= N; n++) { const t = text(strip, (n - .5) * cw, 252, String(n), 'pl-tier', null, 15); t.style.fill = 'var(--f-moon)'; }
  el('rect', { x: 30, y: 110, width: SW, height: SH, class: 'view-frame', style: 'stroke-width:3' }, K);
  lbl(K, 30, 420, 'before night 1, the captains see the roll:', 'start', 23);
  lbl(K, 30, 452, HM.table.map((r) => `night ${r.night}, ${HM.units[HM.example[r.night]].name}`).join('; '), 'start', 23);
  lbl(K, 30, 500, 'time to build a tower inside before they come', 'start', 23);
  lbl(K, 30, 532, `◇ an add night still to come: ${ADDS.filter((n) => !named(n)).join(', ')}`, 'start', 21);
  lbl(K, 30, KH - 22, 'one roll of three · the clock, C-101 · [ ] the look, a sketch', 'start', 20);

  /* ════════════ THE TABLE, ROLLED AT THE FIRE: a tree; and the tiers, a staircase (the owner, 19 Oct) ════════════ */
  const TB = document.getElementById('table'), TW = 1640, TH = 890;
  const T = el('g', { class: 'hand-vellum' }, TB);
  el('rect', { width: TW, height: TH, class: 'view-frame' }, T);
  text(T, 30, 46, 'the table, rolled at the fire', 'sc-kick');
  // a unit already in is struck from its pair, and the other comes (HM.repeat): drawn faded, struck through
  const [r2, r3] = HM.table, NW = 220, node = (x, y, k, struck) => {
    el('rect', { x: x - NW / 2, y: y - 74, width: NW, height: 128, rx: 14, class: 'pl-old', style: `stroke-width:3;fill:var(--dv-paper)${struck ? ';stroke-dasharray:6 8' : ''}` }, T);
    render([sc(FIGS[k](x, y + 20, 0), x, y + 20, 1)], el('g', struck ? { style: 'opacity:.3' } : {}, TB));
    const nm = lbl(T, x, y + 44, HM.units[k].name, 'middle', 22);
    if (struck) { nm.style.opacity = .45; el('line', { x1: x - NW / 2 + 18, y1: y + 44, x2: x + NW / 2 - 18, y2: y - 62, class: 'ln-heavy', style: 'stroke-width:4' }, T); }
  };
  const rx = 70, ry = 450, x2 = 330, x3 = 650, xr = 872;
  el('circle', { cx: rx, cy: ry, r: 16, class: 'pl-wall' }, T); lbl(T, rx, ry + 52, 'the fire', 'middle', 24); lbl(T, rx, ry + 80, 'setup', 'middle', 20);
  text(T, x2, 98, `NIGHT ${r2.night}`, 'st-name', 'middle', 26); text(T, x3, 98, `NIGHT ${r3.night}`, 'st-name', 'middle', 26); const later = ADDS.filter((n) => n > r3.night);
  text(T, xr, 98, `NIGHTS ${later[0]}–${later[later.length - 1]}`, 'st-name', 'middle', 26); lbl(T, xr, 128, 'every second', 'middle', 20);
  r2.pair.forEach((k2, i) => {
    const y2 = 280 + i * 340;
    el('path', { d: `M${rx} ${ry} H${(rx + x2 - NW / 2) / 2} V${y2} H${x2 - NW / 2 - 4}`, class: 'ln-heavy', style: 'stroke-width:3;fill:none' }, T);
    node(x2, y2, k2);
    r3.pair.forEach((k3, j) => {
      const y3 = y2 - 85 + j * 170, struck = k3 === k2;
      el('path', { d: `M${x2 + NW / 2} ${y2} H${(x2 + x3) / 2} V${y3} H${x3 - NW / 2 - 4}`, class: 'ln-thin', style: `stroke-width:2.4;fill:none${struck ? ';stroke-dasharray:4 8' : ''}` }, T);
      node(x3, y3, k3, struck);
      if (struck) { lbl(T, x3 + NW / 2 + 14, y3 - 8, 'already in:', 'start', 20); lbl(T, x3 + NW / 2 + 14, y3 + 18, 'the other comes', 'start', 20); }
      else { el('line', { x1: x3 + NW / 2 + 4, y1: y3, x2: xr - 66, y2: y3, class: 'ln-thin', style: 'stroke-width:2;stroke-dasharray:3 8' }, T); lbl(T, xr, y3 + 8, '[ ] to come', 'middle', 22); }
    });
  });
  lbl(T, 30, TH - 82, 'a unit already in is struck from its pair: the other comes', 'start', 21);
  lbl(T, 30, TH - 52, 'every second night one of a pair joins, for good', 'start', 21);
  lbl(T, 30, TH - 22, 'stock models: the Crypt Fiend spits, the Necromancer raises, the Shade blinks', 'start', 21);

  // the tiers (HM.tiers): a step a tier, none before its night, the stronger the later; the last step's night open
  el('line', { x1: 1000, y1: 24, x2: 1000, y2: TH - 24, class: 'ln-thin', style: 'stroke-width:2' }, T);
  text(T, 1030, 46, 'on tiers: none before its night', 'sc-kick');
  lbl(T, 1030, 96, 'the stronger, the later', 'start', 22);
  lbl(T, 1030, 124, 'no abominations on nights 1 or 2', 'start', 22);
  const sx0 = 1030, sw = 146, floor = 790;
  HM.tiers.forEach((tr, i) => {
    const x = sx0 + i * sw, top = 690 - i * 120, open = tr.from == null;
    el('rect', { x, y: top, width: sw, height: floor - top, class: open ? 'rl' : 'pl-old', style: `stroke-width:${open ? 4 : 3};fill:var(--dv-paper)` }, T);
    text(T, x + sw / 2, top + 44, open ? `NIGHT ${ADDS.find((n) => n > tr.after)}+` : `NIGHT ${tr.from}`, 'st-name', 'middle', 22);
    tr.units.forEach((k, j) => {
      const fx = x + sw / 2 + (j - (tr.units.length - 1) / 2) * 64;
      render([sc(FIGS[k](fx, top, j * .2), fx, top, .9)], el('g', {}, TB));
      lbl(T, x + sw / 2, floor + 30 + j * 24, HM.units[k].name, 'middle', 18);
    });
    if (open) lbl(T, x + sw / 2, floor + 54, '[ ] which night', 'middle', 18);
  });
  el('line', { x1: sx0 - 10, y1: floor, x2: sx0 + HM.tiers.length * sw + 6, y2: floor, class: 'ln-heavy', style: 'stroke-width:3' }, T);

  /* ════════════ THE SHADE, AND THE ANSWER INSIDE ════════════ */
  const SD = document.getElementById('shade'), DW = 1240, DH = 890;
  const D = el('g', { class: 'hand-vellum' }, SD);
  el('rect', { width: DW, height: DH, class: 'view-frame' }, D);
  text(D, 30, 46, 'the shade, and the answer inside', 'sc-kick');
  const sg = el('g', { transform: 'translate(30 80)' }, SD), SW2 = DW - 60, SH2 = 620, G2 = 470, wx = SW2 * .55;
  const ss = [{ t: 'rect', x: 0, y: 0, w: SW2, h: G2, rc: 'f-sky1' }, { t: 'rect', x: 0, y: G2, w: SW2, h: SH2 - G2, rc: 'f-ground' }];
  // the wall seen end-on as a section, the town to its left, the wild to its right (T-201's convention)
  ss.push({ t: 'rect', x: wx - 30, y: G2 - 200, w: 60, h: 200, rc: 'f-tower' });
  for (const dx of [-30, 0]) ss.push({ t: 'rect', x: wx + dx, y: G2 - 226, w: 26, h: 26, rc: 'f-merlon' });
  ss.push({ t: 'rect', x: 120, y: G2 - 250, w: 90, h: 250, rc: 'f-tower' }, { t: 'poly', pts: [[104, G2 - 250], [165, G2 - 320], [226, G2 - 250]], rc: 'f-roof' }, { t: 'rect', x: 152, y: G2 - 216, w: 26, h: 40, rc: 'f-win', anim: 'm-win' });
  ss.push({ t: 'rect', x: 260, y: G2 - 110, w: 130, h: 110, rc: 'f-tower' }, { t: 'poly', pts: [[248, G2 - 110], [325, G2 - 170], [402, G2 - 110]], rc: 'f-roof' });
  // the shade: out in the wild, a puff; over the wall; in the town, a puff and the shade
  for (const [x, dl] of [[wx + 210, 0], [wx - 220, .5]]) for (const [dx, dy, r] of [[0, -30, 22], [16, -54, 16], [-14, -50, 14]]) ss.push({ t: 'circle', cx: x + dx, cy: G2 + dy, r, rc: 'f-smoke', anim: 'm-puff', delay: dl });
  ss.push(sc(F.shade(wx - 220, G2 + 10, 0), wx - 220, G2 + 10, 1.4));
  ss.push(face(wx + 320, [sc(F.shade(wx + 320, G2 + 30, .4), wx + 320, G2 + 30, 1.2)]));
  // the answers: the tower inside shoots it; units inside take it
  ss.push({ t: 'line', x1: 178, y1: G2 - 200, x2: wx - 220, y2: G2 - 50, rc: 'f-shot', anim: 'm-shot' });
  ss.push(sc(F.footman(wx - 330, G2 + 40), wx - 330, G2 + 40, 1.2));
  render(ss, sg);
  el('path', { d: `M${wx + 210} ${G2 - 60} Q ${wx} ${G2 - 380} ${wx - 220} ${G2 - 60}`, class: 'f-beam', style: 'fill:none;stroke-width:4' }, sg);   // the blink, over the wall
  el('rect', { x: 30, y: 80, width: SW2, height: SH2, class: 'view-frame', style: 'stroke-width:3' }, SD);
  for (const [x, t, an] of [[50, 'behind · the town', 'start'], [30 + SW2 - 20, 'in front · the wild', 'end']]) { const tt = text(SD, x, 116, t, 'pl-lbl', an, 22); tt.style.fill = 'var(--f-moon)'; tt.style.stroke = 'none'; }
  lbl(D, 30, 744, 'weak, but it blinks inside the walls', 'start', 25);
  lbl(D, 30, 780, 'a tower inside answers it (T-301), or units inside', 'start', 25);
  lbl(D, 30, DH - 22, 'a regular unit once rolled (the owner, 19 Oct)', 'start', 20);

  /* ════════════ the key, in the title block ════════════ */
  const kt = document.getElementById('keyt'); kt.setAttribute('class', 'hand-vellum');
  const row = (i, drawIt, label) => { const y = 22 + i * 36; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (q, x, y) => { el('circle', { cx: x, cy: y, r: 9, class: 'ln-heavy', style: 'fill:none;stroke-width:2' }, q); el('circle', { cx: x + 14, cy: y, r: 13, class: 'ln-heavy', style: 'fill:none;stroke-width:2.6' }, q); }, "the night's aura, growing");
  row(1, (q, x, y) => el('path', { d: `M${x - 9} ${y + 8} l18 0 l-9 -16 Z`, class: 'arrow-h' }, q), 'an event night · 7.1');
  row(2, (q, x, y) => { el('line', { x1: x - 20, y1: y, x2: x - 4, y2: y, class: 'ln-heavy', style: 'stroke-width:3' }, q); el('line', { x1: x - 4, y1: y - 10, x2: x - 4, y2: y + 10, class: 'ln-heavy', style: 'stroke-width:3' }, q); el('line', { x1: x - 4, y1: y - 10, x2: x + 18, y2: y - 10, class: 'ln-thin', style: 'stroke-width:2' }, q); el('line', { x1: x - 4, y1: y + 10, x2: x + 18, y2: y + 10, class: 'ln-thin', style: 'stroke-width:2' }, q); }, 'a pair: one is rolled');
  row(3, (q, x, y) => el('rect', { x: x - 20, y: y - 14, width: 40, height: 28, rx: 6, class: 'rl', style: 'stroke-width:3;fill:none' }, q), 'a case still open');
  row(4, (q, x, y) => { for (const [dx, dy, r] of [[0, 0, 9], [10, -8, 6], [-8, -8, 5]]) el('circle', { cx: x + dx, cy: y + dy + 4, r, class: 'ln-thin', style: 'fill:none;stroke-width:1.6' }, q); }, 'a blink');
  row(5, (q, x, y) => text(q, x, y + 8, '7', 'pl-tier', null, 20), 'a night of thirteen');
  row(6, (q, x, y) => text(q, x, y + 8, 'C-101', 'pl-tier', null, 13), 'a sheet');
  row(7, (q, x, y) => text(q, x, y + 8, '[ ]', 'pl-tier', null, 20), 'to come, or not sealed');
  }
})();
