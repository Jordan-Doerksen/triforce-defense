/* sheet_clock.js — sheet X-002, the clock. Two faces, both computed from MODELS.clock:
   THE ART    one cycle, painted: day on the left, night on the right, split where the data splits it
              (day : night). The same town is drawn twice, relit by the cascade (.lit-day / .lit-night).
   THE DETAIL the whole match to scale, in the sealed hand (drafting vellum): events, the finale,
              bounties, the undead's strength, minutes, and what the numbers add up to.
   One clock drives both: the sun and moon ride their arcs, the score's playhead walks the match.
   Reduced motion and print show the still: sun and moon at their height, no playhead. */
(function () {
  const { el, pts, render } = window.WALL;
  const C = window.MODELS.clock, F = window.FIG;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const D = C.cycle.day, N = C.cycle.night, CYC = D + N, TOTAL = C.nights * CYC;
  const b = (v) => C.cycle.test ? `[${v}]` : String(v);          // a test value is bracketed
  const text = (g, x, y, s, cls, anchor) => { const t = el('text', { x, y, class: cls, 'text-anchor': anchor || 'start' }, g); t.textContent = s; return t; };

  /* ════════════ THE ART ════════════ */
  const art = document.getElementById('art');
  const W = 2920, H = 1000, G = 760, SX = W * D / CYC;          // the split comes from the data

  // the road's centre line: from the far left (toward the ritual) to the gate, on to the right (the short road north)
  const seg = [[[-40, 950], [600, 940], [1400, 860], [SX, 772]], [[SX, 772], [SX + 400, 830], [W - 300, 900], [W + 40, 930]]];
  const bez = (s, t) => [0, 1].map((i) => (1 - t) ** 3 * s[0][i] + 3 * (1 - t) ** 2 * t * s[1][i] + 3 * (1 - t) * t * t * s[2][i] + t ** 3 * s[3][i]);
  const roadY = (x) => {
    const s = x <= SX ? seg[0] : seg[1];
    let lo = 0, hi = 1;
    for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (bez(s, m)[0] < x) lo = m; else hi = m; }
    return bez(s, lo)[1];
  };
  const roadD = `M${seg[0][0]} C${seg[0][1]} ${seg[0][2]} ${seg[0][3]} C${seg[1][1]} ${seg[1][2]} ${seg[1][3]}`;

  const sunAt = (f) => [SX / 2 - SX / 2 * Math.cos(Math.PI * f), G - (G - 130) * Math.sin(Math.PI * f)];
  const moonAt = (f) => [SX + (W - SX) / 2 - (W - SX) / 2 * Math.cos(Math.PI * f), G - (G - 170) * Math.sin(Math.PI * f)];

  // the town, as one model; `only` keeps a part to one light
  const town = [];
  const add = (p) => town.push(p);
  add({ t: 'rect', x: 0, y: 0, w: W, h: G, rc: 'f-sky1' });
  add({ t: 'rect', x: 0, y: 470, w: W, h: G - 470, rc: 'f-sky2' });
  add({ t: 'rect', x: 0, y: 620, w: W, h: G - 620, rc: 'f-sky3' });
  [['f-dusk1', 120], ['f-dusk2', 80], ['f-dusk3', 40]].forEach(([c, d]) => add({ t: 'rect', x: SX - d, y: 0, w: 40, h: G, rc: c, only: 'day' }));
  [[2010, 80], [2140, 150], [2260, 60], [2400, 210], [2520, 90], [2700, 120], [2840, 60], [2080, 300], [2330, 330], [2890, 260]].forEach(([cx, cy], i) =>
    add({ t: 'circle', cx, cy, r: 2.8, rc: 'f-star', anim: 'm-star', delay: (i % 5) * .6, only: 'night' }));
  add({ t: 'path', d: `M0 ${G} A${SX / 2} ${G - 130} 0 0 1 ${SX} ${G}`, rc: 'arc-day', only: 'day' });
  add({ t: 'path', d: `M${SX} ${G} A${(W - SX) / 2} ${G - 170} 0 0 1 ${W} ${G}`, rc: 'arc-night', only: 'night' });
  add({ t: 'g', id: 'x002-sun', transform: `translate(${sunAt(.5).join(' ')})`, kids: F.sun(0, 0), only: 'day' });
  add({ t: 'g', id: 'x002-moon', transform: `translate(${moonAt(.5).join(' ')})`, kids: F.moon(0, 0), only: 'night' });
  add({ t: 'path', d: 'M0 560 C 300 470, 600 520, 900 500 S 1500 450, 1800 505 S 2400 470, 2700 520 S 2900 500, 2920 505 V760 H0 Z', rc: 'f-hill' });
  add({ t: 'rect', x: 0, y: G, w: W, h: H - G, rc: 'f-ground' });
  const tree = (cx, base, h, w) => {
    add({ t: 'rect', x: cx - 9, y: base - 34, w: 18, h: 34, rc: 'f-trunk' });
    for (let i = 0; i < 3; i++) {
      const bot = base - 28 - i * h * .22, top = bot - h * .42, hw = (w / 2) * (1 - i * .22);
      add({ t: 'poly', pts: [[cx - hw, bot], [cx, top], [cx + hw, bot]], rc: 'f-tree' });
    }
  };
  add({ t: 'path', d: roadD, rc: 'f-road-edge' });
  add({ t: 'path', d: roadD, rc: 'f-road-fill' });
  for (const cx of [SX - 300, SX + 300]) {                      // the two scout towers behind the wall (2.4)
    add({ t: 'rect', x: cx - 60, y: 390, w: 120, h: G - 390, rc: 'f-tower' });
    add({ t: 'poly', pts: [[cx - 78, 390], [cx, 276], [cx + 78, 390]], rc: 'f-roof' });
    add({ t: 'rect', x: cx - 12, y: 428, w: 24, h: 44, rc: 'f-win', anim: 'm-win' });
  }
  // a plot building itself in view, behind the wall (6.5): scaffold, a rising frame
  add({ t: 'rect', x: 1060, y: 450, w: 240, h: 150, rc: 'f-wall', only: 'day' });
  for (const x of [1040, 1180, 1320]) add({ t: 'line', x1: x, y1: 360, x2: x, y2: 600, rc: 'f-wood', only: 'day' });
  add({ t: 'line', x1: 1060, y1: 450, x2: 1180, y2: 352, rc: 'f-wood', only: 'day' });
  add({ t: 'line', x1: 1180, y1: 352, x2: 1300, y2: 450, rc: 'f-wood', only: 'day' });
  add({ t: 'rect', x: 1020, y: 470, w: 320, h: 12, rc: 'f-plank', only: 'day' });
  add({ t: 'rect', x: 0, y: 560, w: W, h: G - 560, rc: 'f-wall' });
  for (let x = 0; x < W; x += 64) if (x + 50 < SX - 150 || x > SX + 150) add({ t: 'rect', x: x + 14, y: 528, w: 36, h: 32, rc: 'f-merlon' });
  for (let y = 618; y < G; y += 58) add({ t: 'line', x1: 0, y1: y, x2: W, y2: y, rc: 'f-course' });
  add({ t: 'rect', x: SX - 150, y: 420, w: 300, h: G - 420, rc: 'f-wall' });
  for (let i = 0; i < 6; i++) add({ t: 'rect', x: SX - 150 + i * 52, y: 388, w: 40, h: 32, rc: 'f-merlon' });
  for (let y = 478; y < G; y += 58) add({ t: 'line', x1: SX - 150, y1: y, x2: SX + 150, y2: y, rc: 'f-course' });
  add({ t: 'path', d: `M${SX - 72} ${G} V650 A72 72 0 0 1 ${SX + 72} 650 V${G} Z`, rc: 'f-arch' });
  for (const dx of [-48, -24, 0, 24, 48]) add({ t: 'line', x1: SX + dx, y1: 650 - Math.sqrt(72 * 72 - dx * dx) + 6, x2: SX + dx, y2: G, rc: 'f-bars', only: 'night' });
  for (const y of [670, 706, 742]) add({ t: 'line', x1: SX - 68, y1: y, x2: SX + 68, y2: y, rc: 'f-bars', only: 'night' });
  add({ t: 'rect', x: SX - 112, y: 470, w: 30, h: 52, rc: 'f-win', anim: 'm-win' });
  add({ t: 'rect', x: SX + 82, y: 470, w: 30, h: 52, rc: 'f-win', anim: 'm-win' });
  add({ t: 'rect', x: SX + 101, y: 604, w: 10, h: 26, rc: 'f-iron', only: 'night' });
  add({ t: 'path', d: `M${SX + 106} 572 C ${SX + 93} 587, ${SX + 97} 601, ${SX + 106} 604 C ${SX + 115} 601, ${SX + 119} 587, ${SX + 106} 572 Z`, rc: 'f-flame', anim: 'm-flame', only: 'night' });
  tree(640, 812, 200, 160); tree(760, 808, 150, 120); tree(2610, 812, 200, 160); tree(2730, 808, 150, 120);
  add({ t: 'line', x1: SX, y1: 388, x2: SX, y2: 290, rc: 'f-pole' });
  add({ t: 'poly', pts: [[SX + 4, 296], [SX + 90, 306], [SX + 70, 326], [SX + 92, 348], [SX + 4, 342]], rc: 'f-flag', anim: 'm-flag' });

  const defs = el('defs', {}, art);
  const clip = (id, x, w) => el('rect', { x, y: 0, width: w, height: H }, el('clipPath', { id }, defs));
  clip('x002-day', 0, SX); clip('x002-night', SX, W - SX);
  const lit = (name) => {
    const g = el('g', { class: `lit-${name}`, 'clip-path': `url(#x002-${name})` }, art);
    render(town.filter((p) => !p.only || p.only === name), g);
  };
  lit('day'); lit('night');

  // the actors. By day: the push window (1.4) — a ritual on blight (9.1), stronger undead on it, the
  // field force with an engine going for it (9.2), peasants raising a plot (6.5).
  // By night: the wave down the short road (1.4 · 7.1), the tell on every unit (1.4), the garrison (2.3).
  const actors = [];
  actors.push(...F.ritual(300, 930, 170));
  actors.push(...F.ghoul(470, 958, .2));
  actors.push(...F.siege(1350, roadY(1350) + 14));
  for (const [x, dy] of [[1200, 8], [1130, -6], [1060, 10]]) actors.push(...F.footman(x, roadY(x) + dy));
  actors.push(...F.rider(940, roadY(940) + 6));
  actors.push(...F.peasant(1110, 470, true), ...F.peasant(1250, 470, true));
  [[2300, -4, 'g'], [2380, 14, 's'], [2460, -8, 'g'], [2540, 12, 'g'], [2620, -10, 's'], [2700, 10, 'g'], [2790, -6, 'g'], [2870, 12, 's']]
    .forEach(([x, dy, k], i) => actors.push(...(k === 'g' ? F.ghoul : F.skeleton)(x, roadY(x) + dy, (i % 3) * .23)));
  for (const [x, dy] of [[SX + 40, 18], [SX + 104, 4], [SX + 168, 16]]) actors.push(...F.footman(x, roadY(x) + dy));
  for (const [x, y] of [[2380, 812], [2540, 820], [2700, 830]]) actors.push({ t: 'line', x1: SX + 300, y1: 450, x2: x, y2: y, rc: 'f-shot', anim: 'm-shot' });
  render(actors, el('g', {}, art));
  el('line', { x1: SX, y1: 0, x2: SX, y2: H, class: 'seam', style: 'stroke-width:3' }, art);

  // the art's keynote tags, in the sealed hand; the key is in the title block
  const tags = el('g', { class: 'hand-vellum' }, art);
  const tag = (n, [ax, ay], [tx, ty]) => {
    const len = Math.hypot(ax - tx, ay - ty);
    el('line', { x1: tx + (ax - tx) * 27 / len, y1: ty + (ay - ty) * 27 / len, x2: ax, y2: ay, class: 'ln-thin', style: 'stroke-width:2.6' }, tags);
    el('circle', { cx: ax, cy: ay, r: 6, class: 'ln-dot' }, tags);
    el('polygon', { points: pts(Array.from({ length: 6 }, (_, i) => [tx + 27 * Math.cos(Math.PI / 6 + i * Math.PI / 3), ty + 27 * Math.sin(Math.PI / 6 + i * Math.PI / 3)])), class: 'ln-tag', style: 'stroke-width:3' }, tags);
    text(tags, tx, ty + 1, String(n), 'ln-tagn', 'middle');
  };
  tag(1, [940, roadY(940) - 120], [1000, 640]);
  tag(2, [300, 760], [170, 620]);
  tag(3, [470, 912], [560, 700]);
  tag(4, [1180, 420], [1420, 330]);
  tag(5, [2300, roadY(2300) - 40], [2380, 640]);
  tag(6, [2453, roadY(2460) - 64], [2560, 520]);
  tag(7, [SX + 104, roadY(SX + 104) - 40], [SX + 230, 620]);

  /* the ruler over the art: the cycle, to scale, from the same numbers */
  const ruler = document.getElementById('ruler');
  const RL = el('g', { class: 'hand-vellum' }, ruler);
  const dim = (x1, x2, y, label) => {
    el('line', { x1, y1: y, x2, y2: y, class: 'ln-thin', style: 'stroke-width:2' }, RL);
    for (const x of [x1, x2]) el('line', { x1: x - 9, y1: y + 9, x2: x + 9, y2: y - 9, class: 'ln-tick' }, RL);
    text(RL, (x1 + x2) / 2, y - 12, label, 'ln-lbl', 'middle');
  };
  dim(4, SX, 44, `day · ${b(D)} min`);
  dim(SX, W - 4, 44, `night · ${b(N)} min`);
  for (let m = 0; m <= CYC; m++) el('line', { x1: Math.min(W - 2, Math.max(2, W * m / CYC)), y1: 56, x2: Math.min(W - 2, Math.max(2, W * m / CYC)), y2: 72, class: 'ln-thin', style: 'stroke-width:2' }, RL);
  const rulerNow = el('path', { d: 'M-9 56 L9 56 L0 72 Z', class: 'sc-headf hidden' }, ruler);

  /* ════════════ THE DETAIL ════════════ */
  const det = document.getElementById('detail');
  const S = el('g', { class: 'hand-vellum' }, det);
  const X0 = 170, X1 = 2770, CW = (X1 - X0) / C.nights, DW = CW * D / CYC, NW = CW - DW;
  const xAt = (min) => X0 + min / CYC * CW;                     // minutes of match -> x on the score
  const nightC = (k) => X0 + (k - 1) * CW + DW + NW / 2;
  const ST = 220, SB = 340;                                      // the strip's top and bottom

  // row labels
  [['events', 116], ['undead', 470], ['minutes', 600], ['length', 708], ['hard', 958]].forEach(([s, y]) => text(S, 20, y, s, 'sc-kick'));

  // glyphs, drawn in ink at a centre
  const glyph = {
    fog: (g, x, y, s) => el('path', { d: `M${x - 22 * s} ${y + 8 * s} a10 10 0 0 1 4 -18 a13 13 0 0 1 24 -6 a11 11 0 0 1 18 8 a9 9 0 0 1 -2 16 Z`, class: 'sc-glyph', transform: `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})` }, g),
    air: (g, x, y, s) => el('path', { d: `M${x - 26} ${y} Q${x - 14} ${y - 16} ${x - 4} ${y - 4} L${x} ${y - 10} L${x + 4} ${y - 4} Q${x + 14} ${y - 16} ${x + 26} ${y} Q${x + 12} ${y - 2} ${x + 6} ${y + 8} L${x} ${y + 2} L${x - 6} ${y + 8} Q${x - 12} ${y - 2} ${x - 26} ${y} Z`, class: 'sc-glyphf', transform: `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})` }, g),
    insurgents: (g, x, y, s) => {
      const t = `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;
      el('path', { d: `M${x - 18} ${y + 20} L${x - 10} ${y - 8} Q${x} ${y - 26} ${x + 10} ${y - 8} L${x + 18} ${y + 20} Z`, class: 'sc-glyphf', transform: t }, g);
      el('circle', { cx: x, cy: y - 4, r: 6, class: 'sc-pip', transform: t }, g);
    },
    sun: (g, x, y) => { el('circle', { cx: x, cy: y, r: 10, class: 'sc-glyph' }, g); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; el('line', { x1: x + 14 * Math.cos(a), y1: y + 14 * Math.sin(a), x2: x + 20 * Math.cos(a), y2: y + 20 * Math.sin(a), class: 'sc-glyph', style: 'stroke-width:2' }, g); } },
    moon: (g, x, y) => { el('circle', { cx: x, cy: y, r: 12, class: 'sc-pip' }, g); el('circle', { cx: x + 6, cy: y - 4, r: 11, class: 'sc-ink' }, g); },
    bounty: (g, x, y) => { el('circle', { cx: x, cy: y, r: 11, class: 'sc-glyph' }, g); el('path', { d: `M${x - 17} ${y} H${x + 17} M${x} ${y - 17} V${y + 17}`, class: 'sc-glyph', style: 'stroke-width:2' }, g); },
    fire: (g, x, y) => { el('path', { d: `M${x} ${y - 34} C${x - 22} ${y - 8}, ${x - 16} ${y + 10}, ${x} ${y + 12} C${x + 16} ${y + 10}, ${x + 22} ${y - 8}, ${x} ${y - 34} Z M${x} ${y - 6} C${x - 8} ${y + 4}, ${x - 4} ${y + 10}, ${x} ${y + 10} C${x + 4} ${y + 10}, ${x + 8} ${y + 4}, ${x} ${y - 6} Z`, class: 'sc-glyph' }, g); el('path', { d: `M${x - 26} ${y + 24} L${x + 26} ${y + 14} M${x - 26} ${y + 14} L${x + 26} ${y + 24}`, class: 'sc-glyph', style: 'stroke-width:4' }, g); },
    banner: (g, x, y) => { el('line', { x1: x - 14, y1: y + 36, x2: x - 14, y2: y - 38, class: 'sc-glyph', style: 'stroke-width:3' }, g); el('path', { d: `M${x - 12} ${y - 36} H${x + 24} L${x + 16} ${y - 20} L${x + 24} ${y - 4} H${x - 12} Z`, class: 'sc-glyph' }, g); el('path', { d: `M${x - 2} ${y - 14} l4 -12 l4 8 l4 -8 l4 12 Z`, class: 'sc-glyphf', style: 'stroke-width:1' }, g); },
    boss: (g, x, y) => { el('path', { d: `M${x - 20} ${y - 18} L${x - 20} ${y - 34} L${x - 10} ${y - 24} L${x} ${y - 38} L${x + 10} ${y - 24} L${x + 20} ${y - 34} L${x + 20} ${y - 18} Z`, class: 'sc-glyphf' }, g); el('circle', { cx: x, cy: y, r: 17, class: 'sc-glyph' }, g); el('circle', { cx: x - 6, cy: y - 2, r: 4, class: 'sc-ink' }, g); el('circle', { cx: x + 6, cy: y - 2, r: 4, class: 'sc-ink' }, g); el('path', { d: `M${x - 8} ${y + 17} V${y + 26} H${x + 8} V${y + 17}`, class: 'sc-glyph' }, g); }
  };

  // events: the pool, drawn three ways onto nights 3, 6, 9; night 12 any of them, full strength.
  // The cards grow with the night: weakest first, strongest last (7.5).
  el('rect', { x: X0 + 10, y: 52, width: 330, height: 120, rx: 14, class: 'sc-card', style: 'stroke-dasharray:10 7' }, S);
  C.events.pool.forEach((e, i) => glyph[e](S, X0 + 70 + i * 105, 108, 1.15));
  text(S, X0 + 175, 200, 'the draw · no repeats', 'ln-lbl', 'middle').style.fontSize = '24px';
  const cards = {};
  const evNights = [...C.events.draws, C.events.last];
  evNights.forEach((k, i) => {
    const s = 64 + i * 14, cx = nightC(k), top = 196 - s;
    el('path', { d: `M${X0 + 340} ${90 + i * 10} C ${X0 + 340 + (cx - X0 - 340) * .45} ${20 + i * 6}, ${cx - 20} ${14 + i * 6}, ${cx} ${top - 6}`, class: 'ln-ext', style: 'stroke-width:1.8' }, S);
    el('path', { d: `M${cx - 7} ${top - 16} L${cx} ${top - 4} L${cx + 7} ${top - 16}`, class: 'sc-glyph', style: 'stroke-width:2' }, S);
    cards[k] = el('rect', { x: cx - s / 2, y: top, width: s, height: s, rx: 10, class: 'sc-card' }, S);
    text(S, cx, top + s / 2 + 2, k === C.events.last ? '★' : '?', 'sc-q', 'middle').style.fontSize = (s * .5) + 'px';
    el('line', { x1: cx - NW / 2, y1: 198, x2: cx - NW / 2, y2: ST, class: 'sc-glyph', style: 'stroke-width:2' }, S);   // announced at dusk
  });

  // night 13: the boss on the middle road, a lieutenant on each town's road (9.3 · 9.4)
  const fc = nightC(C.finale.night);
  cards[C.finale.night] = el('rect', { x: fc - 60, y: 52, width: 120, height: 112, rx: 12, class: 'sc-card' }, S);
  glyph.boss(S, fc, 112);
  [-1, 0, 1].forEach((d) => {
    el('line', { x1: fc + d * 14, y1: 166, x2: fc + d * 30, y2: ST - 4, class: 'sc-glyph', style: 'stroke-width:2.4' }, S);
    el('circle', { cx: fc + d * 30, cy: ST - 4, r: 5, class: 'sc-ink' }, S);
  });

  // the strip: the fire, thirteen days and nights, the relief
  el('rect', { x: 20, y: ST, width: 130, height: SB - ST, rx: 10, class: 'sc-day' }, S);
  glyph.fire(S, 85, 280);
  for (let k = 1; k <= C.nights; k++) {
    const x = X0 + (k - 1) * CW;
    el('rect', { x, y: ST, width: DW, height: SB - ST, class: 'sc-day' }, S);
    el('rect', { x: x + DW, y: ST, width: NW, height: SB - ST, class: 'sc-night' }, S);
    glyph.sun(S, x + DW / 2, 258);
    if (k > 1) glyph.bounty(S, x + DW / 2, 310);              // every dawn, one bounty champion (3.3)
    glyph.moon(S, x + DW + NW / 2, 262);
    text(S, x + DW + NW / 2, 378, String(k), 'sc-num');
  }
  el('rect', { x: X1 + 20, y: ST, width: 130, height: SB - ST, rx: 10, class: 'sc-day' }, S);
  glyph.banner(S, X1 + 85, 280);

  // the undead: weak by day, strong by night, stronger on blight. The shape is sealed; the values are open.
  let step = `M${X0} 500`;
  for (let k = 0; k < C.nights; k++) step += ` H${X0 + k * CW + DW} V440 H${X0 + (k + 1) * CW} V500`;
  el('path', { d: step, class: 'sc-glyph', style: 'stroke-width:3.4' }, S);
  el('line', { x1: X0, y1: 412, x2: X1, y2: 412, class: 'ln-ext', style: 'stroke-width:2.2' }, S);
  el('path', { d: 'M136 500 l8 -12 l8 12 Z', class: 'sc-glyphf', transform: 'rotate(180 144 494)' }, S);
  el('path', { d: 'M136 446 l8 -12 l8 12 Z', class: 'sc-glyphf' }, S);
  el('path', { d: 'M136 418 l8 -12 l8 12 Z M136 406 l8 -12 l8 12 Z', class: 'sc-glyphf' }, S);
  text(S, X1 + 20, 420, 'on blight', 'ln-lbl');
  text(S, X0 + 8, 536, 'values open · in config', 'ln-lbl').style.fontSize = '22px';

  // minutes, to scale
  el('line', { x1: X0, y1: 576, x2: X1, y2: 576, class: 'ln-thin', style: 'stroke-width:2' }, S);
  for (let m = 0; m <= TOTAL; m++) el('line', { x1: xAt(m), y1: 571, x2: xAt(m), y2: 581, class: 'ln-thin' }, S);
  for (let k = 0; k <= C.nights; k++) {
    el('line', { x1: X0 + k * CW, y1: 562, x2: X0 + k * CW, y2: 590, class: 'ln-tick', style: 'stroke-width:2.4' }, S);
    text(S, X0 + k * CW, 622, b(k * CYC), 'ln-lbl', 'middle').style.fontSize = '24px';
  }

  // what the numbers add up to, and what the sheet found
  const dimS = (x1, x2, y, cls, tick) => {
    el('line', { x1, y1: y, x2, y2: y, class: cls }, S);
    for (const x of [x1, x2]) el('line', { x1: x - 10, y1: y + 10, x2: x + 10, y2: y - 10, class: tick }, S);
  };
  dimS(X0, X1, 700, 'ln-thin', 'ln-tick');
  const x40 = xAt(C.v1Label.minutes);
  text(S, (x40 + X1) / 2 + 300, 686, `${C.nights} nights × ${b(CYC)} min = ${b(TOTAL)} min`, 'ln-lbl', 'middle');
  el('line', { x1: x40, y1: ST - 10, x2: x40, y2: 790, class: 'rl', style: 'stroke-dasharray:12 8' }, S);
  dimS(X0, x40, 780, 'rl', 'rl-tick');
  text(S, (X0 + x40) / 2, 766, `~${C.v1Label.minutes} min · v1's label · unsealed`, 'rl-lbl', 'middle');
  // the finding, clouded and flagged as a reviewer would
  const need = Math.round(C.v1Label.minutes / C.nights);
  const nx = x40 + 70, ny = 744;
  text(S, nx, ny, `at the test cycle a match runs ${b(TOTAL)} min;`, 'rl-lbl');
  text(S, nx, ny + 38, `~${C.v1Label.minutes} min needs a ${b(need)}-min cycle, or fewer nights`, 'rl-lbl');
  const cx0 = nx - 26, cy0 = ny - 40, cx1 = nx + 800, cy1 = ny + 58;
  let cloud = `M${cx0} ${cy0}`;
  for (let x = cx0; x < cx1; x += 40) cloud += ` a20 16 0 0 1 40 0`;
  for (let y = cy0; y < cy1; y += 32) cloud += ` a16 16 0 0 1 0 32`;
  for (let x = cx1 + (40 - (cx1 - cx0) % 40) % 40; x > cx0; x -= 40) cloud += ` a20 16 0 0 1 -40 0`;
  for (let y = cy1 + (32 - (cy1 - cy0) % 32) % 32; y > cy0; y -= 32) cloud += ` a16 16 0 0 1 0 -32`;
  el('path', { d: cloud, class: 'rl-cloud' }, S);
  el('path', { d: `M${cx1 + 60} ${cy0 + 4} l22 38 h-44 Z`, class: 'rl-cloud', style: 'stroke-width:3' }, S);
  text(S, cx1 + 60, cy0 + 36, '1', 'rl-lbl', 'middle').style.fontSize = '22px';

  // hard mode, planned: 26 nights, an event every third night (not to the time scale above)
  const HW = (X1 - X0) / C.hard.nights;
  for (let k = 1; k <= C.hard.nights; k++) {
    const x = X0 + (k - 1) * HW;
    el('rect', { x, y: 930, width: HW * D / CYC, height: 36, class: 'sc-day', style: 'stroke-width:1.4' }, S);
    el('rect', { x: x + HW * D / CYC, y: 930, width: HW * N / CYC, height: 36, class: 'sc-night', style: 'stroke-width:1.4' }, S);
    if (k % C.hard.every === 0) el('path', { d: `M${x + HW * (D + N / 2) / CYC} 902 l7 16 h-14 Z`, class: 'sc-glyphf' }, S);
  }
  text(S, X1 + 20, 958, `${C.hard.nights} · planned`, 'ln-lbl').style.fontSize = '24px';

  // the detail's key, in the title block, drawn with the same glyphs
  const keyd = document.getElementById('keyd');
  const row = (i, draw, label) => {
    const y = 22 + i * 44;
    const g = el('g', { transform: `translate(44 ${y}) scale(.62) translate(-44 ${-y})` }, keyd);
    draw(g, 44, y);
    text(keyd, 92, y + 8, label, 'tb-text').style.fontSize = '22px';
  };
  const card = (mark) => (g, x, y) => { el('rect', { x: x - 26, y: y - 26, width: 52, height: 52, rx: 8, class: 'sc-card' }, g); text(g, x, y + 2, mark, 'sc-q', 'middle').style.fontSize = '30px'; };
  row(0, glyph.fire, 'the fire, before the first day · 4');
  row(1, (g, x, y) => { glyph.sun(g, x - 18, y); el('rect', { x: x + 6, y: y - 22, width: 40, height: 44, class: 'sc-night' }, g); glyph.moon(g, x + 26, y); }, 'a day, then a night · 1.4');
  row(2, glyph.bounty, 'a bounty, dawn to dusk · 3.3');
  row(3, card('?'), 'an event, drawn, told at dusk · 7.1');
  row(4, card('★'), 'any event, full strength · 7.5');
  row(5, glyph.boss, 'the boss, three prongs · 9.3');
  row(6, glyph.banner, 'the relief, at dawn · 9.5');

  // the playhead (screen only)
  const now = el('rect', { x: X0, y: ST - 6, width: CW, height: SB - ST + 12, class: 'sc-now hidden' }, det);
  const head = el('g', { class: 'hidden' }, det);
  el('line', { x1: 0, y1: ST - 26, x2: 0, y2: SB + 8, class: 'sc-head' }, head);
  el('path', { d: `M-10 ${ST - 32} L10 ${ST - 32} L0 ${ST - 16} Z`, class: 'sc-headf' }, head);

  /* ════════════ one clock, both faces ════════════ */
  const sun = document.getElementById('x002-sun'), moon = document.getElementById('x002-moon');
  const still = () => {
    sun.setAttribute('transform', `translate(${sunAt(.5).join(' ')})`);
    moon.setAttribute('transform', `translate(${moonAt(.5).join(' ')})`);
    sun.style.display = moon.style.display = '';
    [now, head, rulerNow].forEach((e) => e.classList.add('hidden'));
    Object.values(cards).forEach((c) => c.classList.remove('on'));
  };
  const tick = (t) => {
    const k = Math.min(C.nights - 1, Math.floor(t / CYC)), m = Math.min(CYC, t - k * CYC), day = m < D;
    sun.style.display = day ? '' : 'none';
    moon.style.display = day ? 'none' : '';
    if (day) sun.setAttribute('transform', `translate(${sunAt(m / D).join(' ')})`);
    else moon.setAttribute('transform', `translate(${moonAt((m - D) / N).join(' ')})`);
    rulerNow.setAttribute('transform', `translate(${W * m / CYC} 0)`);
    now.setAttribute('x', X0 + k * CW);
    head.setAttribute('transform', `translate(${xAt(t)} 0)`);
    [now, head, rulerNow].forEach((e) => e.classList.remove('hidden'));
    Object.entries(cards).forEach(([n, c]) => c.classList.toggle('on', +n === k + 1 && !day));
  };
  if (reduced) { still(); return; }
  let t = 0;
  const FPS = 8;                                                 // Flash's frame rate: stepped, never tweened
  setInterval(() => { t += 1 / FPS; if (t > TOTAL + 3) t = 0; tick(Math.min(t, TOTAL)); }, 1000 / FPS);
  window.addEventListener('beforeprint', still);
})();
