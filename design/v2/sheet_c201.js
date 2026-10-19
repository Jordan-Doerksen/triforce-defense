/* sheet_c201.js — sheet C-201, the event nights and their heroes (7.1–7.5, amended by the owner's interview of
   19 Oct; docs/HORDE.md). Two faces from MODELS.events and MODELS.clock:
   THE ART    one draw, played as a board: the four event nights (rows) across the three towns (columns). Each event
              is everywhere; its hero leads at the one town the dusk roll names, framed in gold, the drop that town's.
              Running, a red frame walks the board night to night; the still is the whole board.
   THE DETAIL the draw (three of four on 3, 6 and 9; any on 12, at full strength); the heroes night by night, normal
              and hard; and the four events with their heroes as cards: the event, its answer, the kit, the drop. */
(function () {
  (document.fonts ? Promise.all([...document.fonts].map((f) => f.load().catch(() => null))).then(() => document.fonts.ready) : Promise.resolve()).then(draw);
  function draw() {
  const { el, render, EVENT } = window.WALL, F = window.FIG, { text } = window.TOWN;
  const EV = window.MODELS.events, CL = window.MODELS.clock;
  const lbl = (g, x, y, s, anchor, size) => text(g, x, y, s, 'pl-lbl', anchor, size || 24);
  const motion = document.documentElement.dataset.motion;
  const moving = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && motion !== 'still';
  const sc = (parts, cx, base, k) => ({ t: 'g', transform: `translate(${cx} ${base}) scale(${k}) translate(${-cx} ${-base})`, kids: parts });
  const HERO = { deathknight: F.deathknight, lich: F.lich, dreadlord: F.dreadlord, cryptlord: F.cryptlord };
  const evOf = (id) => EV.pool.find((e) => e.id === id);
  const BOSS = CL.finale.night;

  // one scene: an event night at one town, drawn at 420 x 180 and scaled by f; the town to the left of its wall,
  // the wild to the right (T-201's convention). o = { event, town, hero, full }
  const FW0 = 420, FH0 = 180;
  const frame = (svg, x, y, f, o, id) => {
    const g = el('g', { transform: `translate(${x} ${y}) scale(${f})` }, svg), w = FW0, h = FH0, G = 128, wx = 300, p = [];
    el('rect', { width: w, height: h }, el('clipPath', { id }, el('defs', {}, g)));
    const s = el('g', { 'clip-path': `url(#${id})` }, g);
    p.push({ t: 'rect', x: 0, y: 0, w, h: G, rc: 'f-sky1' }, { t: 'rect', x: 0, y: G, w, h: h - G, rc: 'f-ground' });
    for (const [sx, sy] of [[30, 16], [140, 28], [270, 12], [390, 36], [210, 50]]) p.push({ t: 'circle', cx: sx, cy: sy, r: 1.6, rc: 'f-star', anim: 'm-star' });
    // the town's own ground behind it (1.5): the hill under its mountains, the valley's lake, the forest's trees
    if (o.town === 'hill') p.push({ t: 'poly', pts: [[0, G - 26], [56, G - 88], [110, G - 44], [160, G - 82], [236, G - 26], [0, G]], rc: 'f-hill' });
    if (o.town === 'valley') p.push({ t: 'ellipse', cx: 110, cy: G + 22, rx: 96, ry: 12, rc: 'f-sky2' });
    if (o.town === 'forest') for (const tx of [16, 50, 252, 280]) p.push({ t: 'poly', pts: [[tx - 18, G], [tx, G - 60], [tx + 18, G]], rc: 'f-tree' });
    p.push({ t: 'rect', x: 196, y: G - 34, w: 44, h: 34, rc: 'f-tower' }, { t: 'poly', pts: [[190, G - 34], [218, G - 56], [246, G - 34]], rc: 'f-roof' }, { t: 'rect', x: 212, y: G - 24, w: 10, h: 12, rc: 'f-win', anim: 'm-win' });
    p.push({ t: 'rect', x: wx, y: G - 66, w: 18, h: 66, rc: 'f-wall' });
    for (const mx of [wx - 2, wx + 10]) p.push({ t: 'rect', x: mx, y: G - 76, w: 10, h: 10, rc: 'f-merlon' });
    // the night's wave, out in the wild: every night has one
    for (let i = 0; i < 3; i++) { const cx = wx + 44 + i * 30, b = G + 16 + (i % 2) * 10; p.push(sc((i % 2 ? F.skeleton : F.ghoul)(cx, b, i * .1), cx, b, .42)); }
    const hx = o.event === 'insurgents' ? 150 : o.event === 'burrow' ? 222 : wx + 70;   // where the hero stands
    if (o.event === 'insurgents') {
      for (const tx of [52, 78, 104]) p.push(...F.tomb(tx, G + 6));
      for (const [ax, b] of [[34, G + 16], [124, G + 16]]) { p.push({ t: 'line', x1: ax, y1: b - 30, x2: 78, y2: G - 10, rc: 'f-beam', anim: 'm-tell' }); p.push(sc(F.acolyte(ax, b), ax, b, .6)); }
      p.push(sc(F.skeleton(80, G + 14, .3), 80, G + 14, .4));
    }
    if (o.event === 'air') {
      p.push({ t: 'rect', x: 28, y: G - 4, w: 130, h: 12, rc: 'f-bush' }, { t: 'rect', x: 60, y: G - 26, w: 34, h: 22, rc: 'f-plank' }, { t: 'poly', pts: [[56, G - 26], [77, G - 40], [98, G - 26]], rc: 'f-roof' });
      const gs = o.full ? [[250, 34], [180, 52], [120, 30], [70, 58], [330, 24]] : [[250, 34], [180, 52], [120, 30]];
      gs.forEach(([gx, gy], i) => p.push(sc(F.gargoyle(gx, gy, i * .3), gx, gy, .6)));
    }
    if (o.event === 'burrow') {
      p.push(sc(F.mound(130, G + 10), 130, G + 10, .7));
      for (const [bx, b] of [[88, G + 18], [166, G + 20], [112, G + 26]]) p.push(sc(F.beetle(bx, b, bx * .01), bx, b, .7));
      p.push(sc(F.fiend(180, G + 8, .2), 180, G + 8, .4));
    }
    if (o.hero) p.push(sc(HERO[evOf(o.event).hero](hx, G + 22, 0), hx, G + 22, evOf(o.event).hero === 'cryptlord' ? .5 : .55));
    if (o.hero) p.push({ t: 'poly', pts: [[hx + 30, G - 54], [hx + 38, G - 46], [hx + 30, G - 38], [hx + 22, G - 46]], rc: 'f-flag', anim: 'm-tell' });   // the drop
    // the fog last: over everything, sight cut (7.2)
    if (o.event === 'fog') for (let i = 0; i < 6; i++) p.push({ t: 'ellipse', cx: 30 + i * 74, cy: G - 18 + (i % 2) * 16, rx: 64, ry: 18, rc: 'f-smoke', style: 'opacity:.42', anim: 'm-tell', delay: i * .2 });
    render(p, s);
    el('rect', { width: w, height: h, class: 'view-frame', style: o.hero ? 'stroke-width:5;stroke:var(--f-flag)' : 'stroke-width:2.4' }, g);
    return g;
  };

  /* ════════════ THE ART: one draw, four event nights across three towns ════════════ */
  const A = document.getElementById('art'), AW = 1900, AH = 1130;
  const B = el('g', { class: 'hand-vellum' }, A);
  el('rect', { width: AW, height: AH, class: 'view-frame', style: 'stroke-width:6' }, B);
  const labW = 280, gap = 28, f = (AW - labW - 20 - 2 * gap) / 3 / FW0, fw = FW0 * f, fh = FH0 * f, rowH = 262, y0 = 74;
  EV.towns.forEach((t, c) => text(B, labW + c * (fw + gap) + fw / 2, 50, `THE ${t.toUpperCase()}`, 'st-name', 'middle', 24));
  const heroFrames = [];
  EV.example.forEach((r, i) => {
    const y = y0 + i * rowH, e = evOf(r.event), hero = EV.heroes[e.hero];
    text(B, 26, y + 46, `NIGHT ${r.night}`, 'st-name', 'start', 28);
    lbl(B, 26, y + 82, e.name, 'start', 24);
    lbl(B, 26, y + 110, r.full ? 'any, at full strength' : 'drawn: one of four', 'start', 18);
    EVENT[r.event](B, 60, y + 160, 1);
    EV.towns.forEach((t, c) => {
      const x = labW + c * (fw + gap), isHero = t === r.town;
      frame(A, x, y, f, { event: r.event, town: t, hero: isHero, full: r.full }, `c201-${i}${c}`);
      if (isHero) { heroFrames.push([x, y]); lbl(B, x + fw / 2, y + fh + 26, `${hero.name}, lvl ${EV.level(r.night)} · the drop is the ${t}'s`, 'middle', 19); }
    });
  });
  // the animatic: running, a red frame walks the board, event night to event night, at the hero's town
  const now = el('rect', { width: fw + 16, height: fh + 16, rx: 6, class: 'rl', style: 'stroke-width:6;fill:none;display:none' }, B);
  if (moving) { let k = 0; const step = () => { const [x, y] = heroFrames[k]; now.setAttribute('x', x - 8); now.setAttribute('y', y - 8); now.style.display = ''; k = (k + 1) % heroFrames.length; }; step(); setInterval(step, 1600); }

  /* ════════════ THE DRAW (7.1, amended 19 Oct) ════════════ */
  const DR = document.getElementById('draw'), DW = 960, DH = 560;
  const D = el('g', { class: 'hand-vellum' }, DR);
  el('rect', { width: DW, height: DH, class: 'view-frame' }, D);
  text(D, 30, 46, 'the draw', 'sc-kick');
  EV.pool.forEach((e, i) => {
    const x = 135 + i * 230;
    el('circle', { cx: x, cy: 118, r: 42, class: 'pl-old', style: 'stroke-width:3;fill:var(--dv-paper)' }, D);
    EVENT[e.id](D, x, 118, 1);
    lbl(D, x, 186, e.name, 'middle', 20);
    lbl(D, x, 210, EV.heroes[e.hero].name, 'middle', 17);
  });
  el('line', { x1: 60, y1: 240, x2: DW - 60, y2: 240, class: 'ln-thin', style: 'stroke-width:2;stroke-dasharray:3 8' }, D);
  [...CL.events.draws, CL.events.last].forEach((n, i) => {
    const x = 135 + i * 230, last = n === CL.events.last;
    text(D, x, 286, `NIGHT ${n}`, 'st-name', 'middle', 20);
    el('rect', { x: x - 38, y: 304, width: 76, height: 76, rx: 10, class: last ? 'pl-wall' : 'pl-old', style: 'stroke-width:3' }, D);
    const q = text(D, x, 356, last ? '★' : '?', 'sc-q', 'middle'); q.style.fontSize = '40px'; if (last) q.style.fill = 'var(--dv-paper)';
    lbl(D, x, 410, `its hero lvl ${EV.level(n)}`, 'middle', 18);
  });
  lbl(D, 30, 456, '3, 6, 9: three of the four, no repeats; each match misses one', 'start', 20);
  lbl(D, 30, 484, '12: any of the four, at full strength', 'start', 20);
  lbl(D, 30, 512, "announced at dusk; the hero's town, rolled at dusk", 'start', 20);
  lbl(D, 30, DH - 18, '7.1–7.5, amended 19 Oct: the pool grows to four', 'start', 17);

  /* ════════════ THE HEROES, NIGHT BY NIGHT: normal and hard (the owner, 19 Oct) ════════════ */
  const HN = document.getElementById('hard'), HW = 960, HH = 620;
  const H = el('g', { class: 'hand-vellum' }, HN);
  el('rect', { width: HW, height: HH, class: 'view-frame' }, H);
  text(H, 30, 46, 'the heroes, night by night', 'sc-kick');
  const hx0 = 150, hcw = (HW - hx0 - 24) / (BOSS - 1), byNight = Object.fromEntries(EV.example.map((r) => [r.night, evOf(r.event).hero]));
  // hard's in-between nights: the four in turn, in the order rolled at the fire
  const between = []; for (let n = 1; n < BOSS; n++) if (!byNight[n]) between.push(n);
  const hardOf = (n) => byNight[n] || EV.hardOrder[between.indexOf(n) % EV.hardOrder.length];
  const strip = el('g', {}, HN), sp = [];
  for (let n = 1; n < BOSS; n++) {
    const x = hx0 + (n - .5) * hcw, ev = !!byNight[n];
    text(H, x, 96, String(n), 'pl-tier', null, 20);
    if (ev) EVENT[EV.example.find((r) => r.night === n).event](H, x, 126, .55);
    for (const [row, base] of [['normal', 260], ['hard', 440]]) {
      const k = row === 'hard' ? hardOf(n) : byNight[n];
      if (!k) continue;
      sp.push(sc(HERO[k](x, base, n * .05), x, base, .42));
      lbl(H, x, base + 26, `${EV.level(n)}`, 'middle', 16);
    }
  }
  render(sp, strip);
  text(H, 30, 220, 'NORMAL', 'st-name', 'start', 20); lbl(H, 30, 246, 'its event', 'start', 16);
  text(H, 30, 400, 'HARD', 'st-name', 'start', 20); lbl(H, 30, 426, 'every night', 'start', 16);
  lbl(H, 30, 514, "an event night keeps its event's hero; between them,", 'start', 19);
  lbl(H, 30, 540, 'the four in turn, the order rolled at the fire', 'start', 19);
  lbl(H, 30, 568, "the number: its level, half the night, rounded up", 'start', 19);
  lbl(H, 30, HH - 16, 'night 13: the boss and his lieutenants, W-102', 'start', 17);

  /* ════════════ THE FOUR, AND THEIR HEROES: cards ════════════ */
  const CD = document.getElementById('cards'), CW = 2920, CH = 890;
  const C = el('g', { class: 'hand-vellum' }, CD);
  el('rect', { width: CW, height: CH, class: 'view-frame' }, C);
  text(C, 30, 46, 'the four, and their heroes', 'sc-kick');
  const cw4 = (CW - 30 * 5) / 4, cf = (cw4 - 40) / FW0;
  EV.pool.forEach((e, i) => {
    const x = 30 + i * (cw4 + 30), y = 70, hero = EV.heroes[e.hero];
    el('rect', { x, y, width: cw4, height: CH - 100, rx: 18, class: 'pl-old', style: 'stroke-width:3;fill:var(--dv-paper)' }, C);
    EVENT[e.id](C, x + 52, y + 50, .9);
    text(C, x + 100, y + 62, e.name.toUpperCase(), 'st-name', 'start', 26);
    lbl(C, x + cw4 - 24, y + 62, e.dec, 'end', 17);
    const town = (EV.example.find((r) => r.event === e.id) || { town: 'hill' }).town;
    frame(CD, x + 20, y + 90, cf, { event: e.id, town, hero: true, full: false }, `c201-card-${i}`);
    const yy = y + 90 + FH0 * cf;
    text(C, x + 24, yy + 46, hero.name.toUpperCase(), 'st-name', 'start', 24);
    e.does.forEach((d, j) => lbl(C, x + 24, yy + 80 + j * 26, d, 'start', 19));
    lbl(C, x + 24, yy + 136, `answer: ${e.answer}`, 'start', 19);
    const kit = [['passive', hero.passive], ['active', hero.active], ['ultimate', hero.ult + (hero.ultNote ? `, ${hero.ultNote}` : '')], ['stats', hero.stats]];
    if (hero.pack) kit.push(['pack', hero.pack]);
    kit.forEach(([k, v], j) => { const t = lbl(C, x + 24, yy + 180 + j * 30, k, 'start', 17); t.style.opacity = .7; lbl(C, x + 124, yy + 180 + j * 30, v, 'start', 20); });
    const ky = yy + 180 + kit.length * 30 + 10;
    el('path', { d: `M${x + 32} ${ky - 6} l8 8 l-8 8 l-8 -8 Z`, class: 'pl-wall' }, C);
    lbl(C, x + 50, ky + 8, `drops ${hero.drop.item}, ${hero.drop.rarity}: ${hero.drop.does}`, 'start', 18);
    const coda = [hero.herald ? `herald of ${hero.herald}, if he is the boss` : null, hero.night13 ? `night 13: ${hero.night13}` : null].filter(Boolean).join(' · ');
    lbl(C, x + 24, y + CH - 122, coda, 'start', 17);
  });

  /* ════════════ the key, in the title block ════════════ */
  const kt = document.getElementById('keyt'); kt.setAttribute('class', 'hand-vellum');
  const row = (i, drawIt, label) => { const y = 22 + i * 36; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (q, x, y) => el('rect', { x: x - 22, y: y - 14, width: 44, height: 28, rx: 4, style: 'fill:none;stroke:var(--f-flag);stroke-width:5' }, q), "the hero's town, rolled at dusk");
  row(1, (q, x, y) => el('rect', { x: x - 22, y: y - 14, width: 44, height: 28, rx: 4, class: 'rl', style: 'stroke-width:4;fill:none' }, q), 'running: the night playing');
  row(2, (q, x, y) => el('path', { d: `M${x} ${y - 10} l10 10 l-10 10 l-10 -10 Z`, class: 'pl-wall' }, q), 'the drop, the defender\'s · 3.1');
  row(3, (q, x, y) => { EVENT.fog(q, x - 10, y, .5); EVENT.burrow(q, x + 16, y, .5); }, 'an event · 7.2–7.4, the burrow');
  row(4, (q, x, y) => text(q, x, y + 10, '?', 'sc-q', 'middle').style.fontSize = '26px', 'drawn: one of the four');
  row(5, (q, x, y) => text(q, x, y + 10, '★', 'sc-q', 'middle').style.fontSize = '26px', 'any, at full strength');
  row(6, (q, x, y) => text(q, x, y + 8, 'C-101', 'pl-tier', null, 13), 'a sheet');
  row(7, (q, x, y) => text(q, x, y + 8, '[ ]', 'pl-tier', null, 20), 'to come, or not sealed');
  }
})();
