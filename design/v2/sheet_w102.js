/* sheet_w102.js — sheet W-102, night 13: the boss, three prongs, three endings (1.3 · 9.3–9.5, sealed 17 Oct;
   amended by the owner, 19 Oct; docs/HORDE.md). Two faces from MODELS.finale and MODELS.clock:
   THE ART    one night 13, looking south from the wild: three roads to the three towns on the horizon. The boss,
              chosen at the fire (here Mal'Ganis), takes the middle road to the valley with the Spider Lord ahead;
              the Rotting Brute takes the hill's; the east ritual was broken, so the forest's road is empty.
   THE DETAIL the boss chosen at the fire, his herald; the rituals and their lieutenants; and the endings, each with
              its own last screen, the loss among them. */
(function () {
  (document.fonts ? Promise.all([...document.fonts].map((f) => f.load().catch(() => null))).then(() => document.fonts.ready) : Promise.resolve()).then(draw);
  function draw() {
  const { el, render } = window.WALL, F = window.FIG, { text } = window.TOWN;
  const FN = window.MODELS.finale, CL = window.MODELS.clock;
  const lbl = (g, x, y, s, anchor, size) => text(g, x, y, s, 'pl-lbl', anchor, size || 24);
  const sc = (parts, cx, base, k) => ({ t: 'g', transform: `translate(${cx} ${base}) scale(${k}) translate(${-cx} ${-base})`, kids: parts });
  const mirror = (x, parts) => ({ t: 'g', transform: `translate(${2 * x} 0) scale(-1 1)`, kids: parts });
  const FIGS = { dreadlord: F.dreadlord, deathknight: F.deathknight, lich: F.lich, cryptlord: F.cryptlord, abom: F.abom };
  const boss = FN.bosses.find((b) => b.id === FN.example.boss), broken = (r) => FN.example.broken.includes(r.side);
  const lerp = (a, b, t) => a + (b - a) * t;

  // a town on the horizon: its wall, two towers, roofs, lit windows
  const townAt = (cx, base, k) => sc([
    { t: 'rect', x: cx - 90, y: base - 40, w: 180, h: 40, rc: 'f-wall' },
    ...[-90, -60, -30, 0, 30, 60].map((dx) => ({ t: 'rect', x: cx + dx, y: base - 50, w: 16, h: 10, rc: 'f-merlon' })),
    { t: 'rect', x: cx - 60, y: base - 96, w: 34, h: 56, rc: 'f-tower' }, { t: 'poly', pts: [[cx - 66, base - 96], [cx - 43, base - 128], [cx - 20, base - 96]], rc: 'f-roof' },
    { t: 'rect', x: cx + 24, y: base - 84, w: 34, h: 44, rc: 'f-tower' }, { t: 'poly', pts: [[cx + 18, base - 84], [cx + 41, base - 112], [cx + 64, base - 84]], rc: 'f-roof' },
    { t: 'rect', x: cx - 48, y: base - 82, w: 10, h: 14, rc: 'f-win', anim: 'm-win' }, { t: 'rect', x: cx + 36, y: base - 72, w: 10, h: 14, rc: 'f-win', anim: 'm-win' }
  ], cx, base, k);
  // a ritual broken: the obelisk felled, its shield gone, its acolytes fled (9.1)
  const brokenRitual = (cx, base) => [
    { t: 'ellipse', cx, cy: base + 6, rx: 250, ry: 52, rc: 'f-blight' },
    { t: 'poly', pts: [[cx - 24, base], [cx - 18, base - 70], [cx + 4, base - 84], [cx + 20, base - 60], [cx + 24, base]], rc: 'f-obelisk' },
    { t: 'poly', pts: [[cx + 40, base + 8], [cx + 130, base - 6], [cx + 150, base + 12], [cx + 60, base + 26]], rc: 'f-obelisk' },
    { t: 'poly', pts: [[cx - 70, base + 14], [cx - 50, base - 2], [cx - 34, base + 18]], rc: 'f-ruin' }
  ];

  /* ════════════ THE ART: night 13, three roads ════════════ */
  const A = document.getElementById('art'), AW = 1900, AH = 1130, HZ = 440;
  const art = [{ t: 'rect', x: 0, y: 0, w: AW, h: HZ, rc: 'f-sky1' }, { t: 'rect', x: 0, y: HZ - 120, w: AW, h: 120, rc: 'f-sky2' }];
  for (let i = 0; i < 44; i++) art.push({ t: 'circle', cx: (i * 431) % AW, cy: 16 + (i * 137) % 280, r: 2.2, rc: 'f-star', anim: 'm-star', delay: (i % 5) * .5 });
  art.push(...F.moon(1660, 110));
  // the west ridge and the east forest (1.5): the hill under its mountains, the forest in its wood
  art.push({ t: 'poly', pts: [[0, HZ + 10], [0, 220], [80, 160], [160, 250], [250, 190], [340, 280], [440, 250], [560, HZ + 10]], rc: 'f-hill' });
  art.push({ t: 'rect', x: 0, y: HZ, w: AW, h: AH - HZ, rc: 'f-ground' });
  art.push({ t: 'path', d: `M0 700 C 300 660, 600 720, 950 690 S 1600 660, ${AW} 700 V${AH} H0 Z`, rc: 'f-blight' });
  for (let i = 0; i < 12; i++) { const tx = 1340 + i * 48, h = 50 + (i % 3) * 14; art.push({ t: 'poly', pts: [[tx - 22, HZ + 6], [tx, HZ + 6 - h], [tx + 22, HZ + 6]], rc: 'f-tree' }); }
  art.push({ t: 'path', d: `M260 ${HZ + 10} Q 380 ${HZ - 40} 500 ${HZ + 10} Z`, rc: 'f-hill' });
  art.push({ t: 'ellipse', cx: 950, cy: HZ + 24, rx: 150, ry: 12, rc: 'f-sky2' });
  const towns = { hill: [380, HZ - 4, .9], valley: [950, HZ + 10, .95], forest: [1540, HZ + 6, .9] };
  for (const [cx, base, k] of Object.values(towns)) art.push(townAt(cx, base, k));
  // the three roads, wide at our feet in the wild, narrow at each town's gate
  const roads = { west: [330, 'hill'], middle: [950, 'valley'], east: [1570, 'forest'] };
  for (const [bx, town] of Object.values(roads)) { const [tx, ty] = towns[town]; art.push({ t: 'poly', pts: [[bx - 96, AH], [bx + 96, AH], [tx + 14, ty + 12], [tx - 14, ty + 12]], rc: 'f-road' }); }
  // the rituals, in the wild: the west and the middle still channelling, the east broken
  art.push(sc(F.ritual(130, 1050, 120), 130, 1050, .42), sc(F.ritual(700, 1070, 120), 700, 1070, .4), sc(brokenRitual(1790, 1050), 1790, 1050, .42));
  // who marches where: a point along a road, and how big it is there
  const along = (side, t) => { const [bx, town] = roads[side], [tx, ty] = towns[town]; return [lerp(bx, tx, t), lerp(AH - 30, ty + 16, t), lerp(1.45, .32, t)]; };
  const marchers = [];
  const push = (side, t, fig, k = 1, dx = 0) => { const [x, y, s] = along(side, t); marchers.push([y, sc(FIGS[fig] ? FIGS[fig](x + dx * s, y, t) : fig(x + dx * s, y, t), x + dx * s, y, s * k)]); };
  // the horde on the roads that are not empty
  for (const side of ['west', 'middle']) for (const [t, dx, f] of [[.12, -40, F.ghoul], [.16, 46, F.skeleton], [.3, -36, F.ghoul], [.34, 40, F.skeleton], [.62, -30, F.ghoul], [.7, 30, F.skeleton]]) push(side, t, f, .9, dx);
  push('west', .44, 'abom', 1.35);                                         // the Rotting Brute, for the hill
  push('middle', .66, 'cryptlord', 1.2);                                   // the Spider Lord, for the valley, ahead
  const [bx, by, bs] = along('middle', .2);                                // the boss, for the valley
  marchers.push([by, sc([{ t: 'ellipse', cx: bx, cy: by, rx: 70, ry: 14, rc: 'f-aura', anim: 'm-tell' }, ...FIGS[boss.fig](bx, by, 0)], bx, by, bs * 1.6)]);
  marchers.sort((a, b) => a[0] - b[0]).forEach(([, m]) => art.push(m));
  render(art, el('g', {}, A));
  el('rect', { width: AW, height: AH, class: 'view-frame', style: 'stroke-width:8' }, A);

  /* ════════════ THE BOSS, CHOSEN AT THE FIRE ════════════ */
  const BS = document.getElementById('boss'), BW = 960, BH = 560;
  const Bg = el('g', { class: 'hand-vellum' }, BS);
  el('rect', { width: BW, height: BH, class: 'view-frame' }, Bg);
  text(Bg, 30, 46, 'the boss, chosen at the fire', 'sc-kick');
  FN.bosses.forEach((b, i) => {
    const cx = 170 + i * 310, chosen = b.id === FN.example.boss, EV = window.MODELS.events;
    el('rect', { x: cx - 140, y: 72, width: 280, height: 250, rx: 14, class: 'pl-old', style: chosen ? 'stroke-width:5;stroke:var(--f-flag);fill:var(--dv-paper)' : 'stroke-width:3;fill:var(--dv-paper)' }, Bg);
    render([sc([{ t: 'ellipse', cx, cy: 300, rx: 60, ry: 10, rc: 'f-aura', anim: 'm-tell' }, ...FIGS[b.fig](cx, 300, i * .3)], cx, 300, 1.35)], el('g', {}, BS));
    text(Bg, cx, 360, b.name.toUpperCase(), 'st-name', 'middle', 22);
    lbl(Bg, cx, 388, `on ${b.model} model, larger`, 'middle', 17);
    lbl(Bg, cx, 418, `his herald: ${EV ? EV.heroes[b.herald].name : b.herald}`, 'middle', 19);
    lbl(Bg, cx, 442, `(${b.event}, all match)`, 'middle', 17);
    if (b.note) { lbl(Bg, cx, 470, "and the forest's lieutenant:", 'middle', 16); lbl(Bg, cx, 490, 'his apprentice, a smaller Lich', 'middle', 16); }
  });
  lbl(Bg, 30, BH - 22, 'chosen by the host, or rolled · his abilities beefed up · the art: this night', 'start', 18);

  /* ════════════ THE RITUALS AND THE LIEUTENANTS (9.1–9.4) ════════════ */
  const PR = document.getElementById('prongs'), PW = 960, PH = 620;
  const P = el('g', { class: 'hand-vellum' }, PR);
  el('rect', { width: PW, height: PH, class: 'view-frame' }, P);
  text(P, 30, 46, 'the rituals and their lieutenants', 'sc-kick');
  FN.rituals.forEach((r, i) => {
    const cx = 170 + i * 310, off = broken(r);
    // the ritual: an obelisk in ink; struck when broken
    el('path', { d: `M${cx - 12} ${136} L${cx - 7} ${88} L${cx} ${74} L${cx + 7} ${88} L${cx + 12} ${136} Z`, class: 'sc-glyph' }, P);
    if (off) el('path', { d: `M${cx - 24} ${82} L${cx + 24} ${130} M${cx + 24} ${82} L${cx - 24} ${130}`, class: 'sc-glyph', style: 'stroke-width:4' }, P);
    lbl(P, cx, 166, `the ${r.side} ritual${off ? ', broken' : ''}`, 'middle', 19);
    el('path', { d: `M${cx} 178 V200 M${cx - 7} 192 L${cx} 202 L${cx + 7} 192`, class: 'ln-thin', style: 'fill:none;stroke-width:2.4' }, P);
    render([sc(FIGS[r.fig](cx, 330, i * .2), cx, 330, r.fig === 'abom' ? 1.05 : .95)], el('g', off ? { style: 'opacity:.3' } : {}, PR));
    text(P, cx, 372, r.name.toUpperCase(), 'st-name', 'middle', 20).style.opacity = off ? .45 : 1;
    lbl(P, cx, 398, off ? 'stays home: an empty road' : r.what, 'middle', 17);
    el('path', { d: `M${cx} 412 V432 M${cx - 7} 424 L${cx} 434 L${cx + 7} 424`, class: 'ln-thin', style: 'fill:none;stroke-width:2.4' }, P);
    text(P, cx, 462, `THE ${r.town.toUpperCase()}`, 'st-name', 'middle', 20);
  });
  lbl(P, 30, 512, `the boss: always, the middle road to the ${CL.finale.boss}`, 'start', 20);
  lbl(P, 30, 540, "break all three, any day before: the rituals' victory", 'start', 20);
  lbl(P, 30, PH - 20, `the Spider Lord and the Lich: the event heroes, at level ${FN.level}`, 'start', 18);

  /* ════════════ THE ENDINGS, AND THEIR LAST SCREENS ════════════ */
  // a scene at 420 x 180, scaled by f: o = { id, last }
  const FW0 = 420, FH0 = 180;
  const scene = (svg, x, y, f, o, key) => {
    const day = o.last ? o.id !== 'lost' : o.id === 'rituals';
    const g = el('g', { transform: `translate(${x} ${y}) scale(${f})`, class: day ? 'lit-day' : null }, svg), w = FW0, h = FH0, G = 128, p = [];
    el('rect', { width: w, height: h }, el('clipPath', { id: key }, el('defs', {}, g)));
    const s = el('g', { 'clip-path': `url(#${key})` }, g);
    p.push({ t: 'rect', x: 0, y: 0, w, h: G, rc: 'f-sky1' }, { t: 'rect', x: 0, y: G, w, h: h - G, rc: 'f-ground' });
    if (!day) for (const [sx, sy] of [[30, 16], [150, 30], [280, 12], [380, 34]]) p.push({ t: 'circle', cx: sx, cy: sy, r: 1.6, rc: 'f-star', anim: 'm-star' });
    else p.push(sc(F.sun(360, 40), 360, 40, .4));
    if (!o.last) {
      if (o.id === 'players') {
        p.push({ t: 'rect', x: 330, y: G - 70, w: 90, h: 70, rc: 'f-wall' }, { t: 'path', d: `M354 ${G} V${G - 30} A16 16 0 0 1 386 ${G - 30} V${G} Z`, rc: 'f-arch' });
        p.push({ t: 'ellipse', cx: 268, cy: G + 24, rx: 60, ry: 10, rc: 'f-aura' });
        p.push({ t: 'g', transform: `rotate(-84 268 ${G + 22})`, kids: [sc(FIGS[boss.fig](268, G + 22, 0), 268, G + 22, .85)] });
        p.push(mirror(70, [sc(F.rider(70, G + 30), 70, G + 30, .55)]));
        for (const fx of [140, 168]) p.push(mirror(fx, [sc(F.footman(fx, G + 34), fx, G + 34, .55)]));
      }
      if (o.id === 'relief') {
        p.push({ t: 'poly', pts: [[0, G], [0, 40], [70, 30], [150, 70], [220, G]], rc: 'f-hill' });
        for (const [bx, by] of [[24, 40], [70, 32], [116, 50], [160, 76]]) p.push({ t: 'line', x1: bx, y1: by, x2: bx, y2: by - 26, rc: 'f-pole' }, { t: 'poly', pts: [[bx, by - 26], [bx + 18, by - 22], [bx, by - 16]], rc: 'f-flag', anim: 'm-flag' });
        for (const [rx, ry] of [[120, G - 14], [176, G + 10]]) p.push(mirror(rx, [sc(F.rider(rx, ry), rx, ry, .45)]));
        for (let i = 0; i < 3; i++) { const cx = 300 + i * 34, b = G + 22 + (i % 2) * 10; p.push(mirror(cx, [sc(F.ghoul(cx, b, i * .1), cx, b, .45)])); }
      }
      if (o.id === 'rituals') {
        p.push({ t: 'ellipse', cx: 210, cy: G + 18, rx: 200, ry: 22, rc: 'f-blight' });
        for (const cx of [90, 210, 330]) p.push(...brokenRitual(cx, G + 14).slice(1).map((q) => sc([q], cx, G + 14, .45)));
        for (const fx of [150, 270]) p.push(sc(F.footman(fx, G + 40), fx, G + 40, .5));
      }
      if (o.id === 'lost') {
        for (const cx of [80, 210, 340]) {
          p.push({ t: 'rect', x: cx - 30, y: G - 50, w: 60, h: 50, rc: 'f-tower' }, { t: 'poly', pts: [[cx - 36, G - 50], [cx, G - 78], [cx + 36, G - 50]], rc: 'f-roof' });
          for (const [dx, dy, r] of [[-14, -60, 10], [10, -72, 14], [0, -90, 12]]) p.push({ t: 'circle', cx: cx + dx, cy: G + dy, r, rc: 'f-smoke', anim: 'm-puff' });
          p.push({ t: 'poly', pts: [[cx - 20, G - 40], [cx - 10, G - 66], [cx, G - 46], [cx + 8, G - 72], [cx + 18, G - 40]], rc: 'f-flame', anim: 'm-flame' });
        }
      }
    } else {
      // the last screen: back at the fire where it began (4.x · 9.5); by day for a victory, cold for the loss
      p.push({ t: 'line', x1: 186, y1: G + 26, x2: 234, y2: G + 14, rc: 'f-wood' }, { t: 'line', x1: 186, y1: G + 14, x2: 234, y2: G + 26, rc: 'f-wood' });
      if (o.id === 'lost') for (const [dx, dy, r] of [[0, 0, 8], [6, -14, 6], [-2, -26, 5]]) p.push({ t: 'circle', cx: 210 + dx, cy: G + 8 + dy, r, rc: 'f-smoke', anim: 'm-puff' });
      else p.push({ t: 'poly', pts: [[196, G + 18], [204, G - 10], [210, G + 4], [216, G - 18], [224, G + 18]], rc: 'f-flame', anim: 'm-flame' });
      if (o.id !== 'lost') for (const [fx, m] of [[130, false], [290, true], [176, false]]) { const fig = sc(F.footman(fx, G + 40), fx, G + 40, .55); p.push(m ? mirror(fx, [fig]) : fig); }
      if (o.id === 'players') p.push({ t: 'path', d: `M236 ${G + 30} l4 -10 l5 6 l5 -9 l5 9 l5 -6 l4 10 Z`, rc: 'f-flag' });
      if (o.id === 'relief') for (const bx of [40, 360]) p.push({ t: 'line', x1: bx, y1: G + 20, x2: bx, y2: G - 60, rc: 'f-pole' }, { t: 'poly', pts: [[bx, G - 60], [bx + 30, G - 54], [bx + 22, G - 44], [bx + 30, G - 34], [bx, G - 38]], rc: 'f-flag', anim: 'm-flag' });
      if (o.id === 'rituals') p.push(sc(brokenRitual(370, G + 20).slice(1), 370, G + 20, .3));
    }
    render(p, s);
    el('rect', { width: w, height: h, class: 'view-frame', style: o.id === 'lost' ? 'stroke-width:4;stroke:var(--redline)' : 'stroke-width:2.4' }, g);
  };
  const EN = document.getElementById('endings'), EW = 2920, EH = 890;
  const E = el('g', { class: 'hand-vellum' }, EN);
  el('rect', { width: EW, height: EH, class: 'view-frame' }, E);
  text(E, 30, 46, 'the endings, and their last screens', 'sc-kick');
  const labW = 330, fe = 1.2, few = FW0 * fe, feh = FH0 * fe, egap = (EW - labW - 30 - 4 * few) / 3;
  text(E, 30, 80 + feh / 2, 'THE END', 'st-name', 'start', 28);
  lbl(E, 30, 80 + feh / 2 + 34, `night ${CL.finale.night} never dawns`, 'start', 20);
  lbl(E, 30, 80 + feh / 2 + 60, 'on its own (1.3)', 'start', 20);
  text(E, 30, 470 + feh / 2, 'THE LAST SCREEN', 'st-name', 'start', 22);
  lbl(E, 30, 470 + feh / 2 + 34, 'back at the fire', 'start', 20);
  lbl(E, 30, 470 + feh / 2 + 60, 'where it began (9.5)', 'start', 20);
  FN.endings.forEach((en, c) => {
    const x = labW + c * (few + egap), lost = en.id === 'lost';
    scene(EN, x, 80, fe, { id: en.id }, `w102-e${c}`);
    const t = text(E, x + few / 2, 80 + feh + 40, en.name.toUpperCase(), 'st-name', 'middle', 21); if (lost) t.style.fill = 'var(--redline)';
    const when = en.id === 'relief' ? `[${Math.floor(CL.finale.armyAt / 60)}:${String(CL.finale.armyAt % 60).padStart(2, '0')}] into night ${CL.finale.night}` : en.when;
    const l = lbl(E, x + few / 2, 80 + feh + 68, `${when} · ${en.dec}`, 'middle', 19); if (lost) l.style.fill = 'var(--redline)';
    el('path', { d: `M${x + few / 2} ${80 + feh + 84} V${470 - 12} M${x + few / 2 - 8} ${470 - 22} L${x + few / 2} ${470 - 10} L${x + few / 2 + 8} ${470 - 22}`, class: 'ln-thin', style: 'fill:none;stroke-width:2.4' }, E);
    scene(EN, x, 470, fe, { id: en.id, last: true }, `w102-l${c}`);
    lbl(E, x + few / 2, 470 + feh + 36, en.last, 'middle', 19);
  });
  lbl(E, 30, EH - 22, "three victories, each with its own last screen (1.3, amended 19 Oct); the relief's scene is 9.5's", 'start', 19);

  /* ════════════ the key, in the title block ════════════ */
  const kt = document.getElementById('keyt'); kt.setAttribute('class', 'hand-vellum');
  const row = (i, drawIt, label) => { const y = 22 + i * 36; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (q, x, y) => el('rect', { x: x - 22, y: y - 14, width: 44, height: 28, rx: 4, style: 'fill:none;stroke:var(--f-flag);stroke-width:5' }, q), 'the boss this night plays');
  row(1, (q, x, y) => { el('path', { d: `M${x - 6} ${y + 14} L${x - 3} ${y - 8} L${x} ${y - 16} L${x + 3} ${y - 8} L${x + 6} ${y + 14} Z`, class: 'sc-glyph' }, q); }, 'a ritual · 9.1');
  row(2, (q, x, y) => { el('path', { d: `M${x - 6} ${y + 14} L${x - 3} ${y - 8} L${x} ${y - 16} L${x + 3} ${y - 8} L${x + 6} ${y + 14} Z`, class: 'sc-glyph' }, q); el('path', { d: `M${x - 14} ${y - 12} L${x + 14} ${y + 12} M${x + 14} ${y - 12} L${x - 14} ${y + 12}`, class: 'sc-glyph', style: 'stroke-width:3' }, q); }, 'broken: its lieutenant stays home');
  row(3, (q, x, y) => el('rect', { x: x - 22, y: y - 14, width: 44, height: 28, rx: 4, style: 'fill:none;stroke:var(--redline);stroke-width:4' }, q), 'the loss · 2.7');
  row(4, (q, x, y) => text(q, x, y + 8, '[ ]', 'pl-tier', null, 20), 'a test value, not sealed');
  row(5, (q, x, y) => text(q, x, y + 8, 'C-101', 'pl-tier', null, 13), 'a sheet');
  }
})();
