/* sheet_clock.js — sheet C-101, the clock (it was the mockup X-002). Two faces:
   THE ART    an illustration, a clean half and half: by day the field force marches out of the gate on
              a ritual and breaks it; by night the same forces hold the gate against the horde. The same
              town is drawn twice, relit by the cascade (.lit-day / .lit-night). It has its own loop and
              is not bound to the numbers (owner, 19 Oct): it tells the story; the detail carries the change.
   THE DETAIL the whole match to scale, from MODELS.clock, in the sealed hand (drafting vellum): the four
              events, three drawn, each led by its hero (C-201); the add nights (C-102); the finale (the boss
              chosen at the fire) and its three endings; bounties; each cycle's day and night (the days shrink, the
              nights grow), the undead's strength, minutes, and what the numbers add up to. Its playhead
              walks the match.
   Reduced motion, print and ?motion=still show the still. */
(function () {
  // the notes size themselves to their words, so nothing is drawn until the lettering has loaded
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(draw);
  function draw() {
  const { el, pts, render } = window.WALL;
  const C = window.MODELS.clock, F = window.FIG;
  const motion = document.documentElement.dataset.motion;
  const moving = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && motion !== 'still';
  const FPS = 8;                                                 // Flash's frame rate: stepped, never tweened

  // every cycle's day and night, in minutes: the first cycle's, evened out to the last cycle's
  const NN = C.nights, grow = C.growth || {};
  const lerp = (a, z, k) => a + (z - a) * (NN > 1 ? k / (NN - 1) : 0);
  const DAY = Array.from({ length: NN }, (_, k) => lerp(C.cycle.day, grow.day ?? C.cycle.day, k) / 60);
  const NIGHT = Array.from({ length: NN }, (_, k) => lerp(C.cycle.night, grow.night ?? C.cycle.night, k) / 60);
  const START = []; let TOTAL = 0;
  for (let k = 0; k < NN; k++) { START.push(TOTAL); TOTAL += DAY[k] + NIGHT[k]; }
  const CYC = DAY[0] + NIGHT[0];
  const grows = DAY[NN - 1] !== DAY[0] || NIGHT[NN - 1] !== NIGHT[0];

  const b = (v) => C.cycle.test ? `[${v}]` : String(v);          // a test value is bracketed
  const mmss = (m) => Number.isInteger(+m.toFixed(6)) ? `${Math.round(m)} min` : `${Math.floor(m)}:${String(Math.round(m % 1 * 60)).padStart(2, '0')}`;
  const mss = (m) => `${Math.floor(m + 1e-9)}:${String(Math.round((m + 1e-9) % 1 * 60) % 60).padStart(2, '0')}`;   // a clock reading, 3:00
  const text = (g, x, y, s, cls, anchor) => { const t = el('text', { x, y, class: cls, 'text-anchor': anchor || 'start' }, g); t.textContent = s; return t; };

  /* ════════════ THE ART ════════════ */
  const art = document.getElementById('art');
  const W = 2920, H = 1000, G = 760, SX = W / 2;                  // half and half: the art is not to scale

  // the road's centre line: from the far left (to the ritual) through the gate, on to the right (the short road north)
  const seg = [[[-40, 950], [500, 940], [1100, 860], [SX, 772]], [[SX, 772], [SX + 400, 830], [W - 300, 900], [W + 40, 930]]];
  const bez = (s, t) => [0, 1].map((i) => (1 - t) ** 3 * s[0][i] + 3 * (1 - t) ** 2 * t * s[1][i] + 3 * (1 - t) * t * t * s[2][i] + t ** 3 * s[3][i]);
  const roadY = (x) => {
    const s = x <= SX ? seg[0] : seg[1];
    let lo = 0, hi = 1;
    for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (bez(s, m)[0] < x) lo = m; else hi = m; }
    return bez(s, lo)[1];
  };
  const roadD = `M${seg[0][0]} C${seg[0][1]} ${seg[0][2]} ${seg[0][3]} C${seg[1][1]} ${seg[1][2]} ${seg[1][3]}`;

  // the town, as one model; `only` keeps a part to one light
  const town = [];
  const add = (p) => town.push(p);
  add({ t: 'rect', x: 0, y: 0, w: W, h: G, rc: 'f-sky1' });
  add({ t: 'rect', x: 0, y: 470, w: W, h: G - 470, rc: 'f-sky2' });
  add({ t: 'rect', x: 0, y: 620, w: W, h: G - 620, rc: 'f-sky3' });
  [['f-dusk1', 120], ['f-dusk2', 80], ['f-dusk3', 40]].forEach(([c, d]) => add({ t: 'rect', x: SX - d, y: 0, w: 40, h: G, rc: c, only: 'day' }));
  for (let i = 0; i < 18; i++) add({ t: 'circle', cx: SX + 40 + (i * 853) % (W - SX - 60), cy: 50 + (i * 337) % 300, r: 2.8, rc: 'f-star', anim: 'm-star', delay: (i % 5) * .6, only: 'night' });
  add({ t: 'g', kids: F.sun(560, 170), only: 'day' });
  add({ t: 'g', kids: F.moon(2380, 180), only: 'night' });
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
  add({ t: 'rect', x: 760, y: 450, w: 240, h: 150, rc: 'f-wall', only: 'day' });
  for (const x of [740, 880, 1020]) add({ t: 'line', x1: x, y1: 360, x2: x, y2: 600, rc: 'f-wood', only: 'day' });
  add({ t: 'line', x1: 760, y1: 450, x2: 880, y2: 352, rc: 'f-wood', only: 'day' });
  add({ t: 'line', x1: 880, y1: 352, x2: 1000, y2: 450, rc: 'f-wood', only: 'day' });
  add({ t: 'rect', x: 720, y: 470, w: 320, h: 12, rc: 'f-plank', only: 'day' });
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
  tree(1180, 812, 200, 160); tree(1290, 808, 150, 120); tree(2660, 812, 200, 160); tree(2780, 808, 150, 120);
  add({ t: 'line', x1: SX, y1: 388, x2: SX, y2: 290, rc: 'f-pole' });
  add({ t: 'poly', pts: [[SX + 4, 296], [SX + 90, 306], [SX + 70, 326], [SX + 92, 348], [SX + 4, 342]], rc: 'f-flag', anim: 'm-flag' });

  const defs = el('defs', {}, art);
  const clip = (id, x, w) => el('rect', { x, y: 0, width: w, height: H }, el('clipPath', { id }, defs));
  clip('clock-day', 0, SX); clip('clock-night', SX, W - SX);
  const lit = (name) => render(town.filter((p) => !p.only || p.only === name), el('g', { class: `lit-${name}`, 'clip-path': `url(#clock-${name})` }, art));
  lit('day'); lit('night');

  // the still actors. By day, at the ritual on blight (9.1): an engine shelling the obelisk, footmen on the
  // acolytes, a ghoul stronger on its blight (1.4). By night, at the gate: the captain and the field force
  // facing the horde, the garrison behind them (2.3), the tower's arrows.
  const stage = [];
  stage.push(...F.ritual(300, 930, 170));
  stage.push(...F.ghoul(470, 958, .2));
  stage.push(...F.siege(700, roadY(700) + 12));
  stage.push({ t: 'line', x1: 598, y1: roadY(700) - 46, x2: 330, y2: 820, rc: 'f-shot', anim: 'm-shot' });
  for (const [x, dy] of [[560, 6], [600, -10]]) stage.push({ t: 'g', anim: 'm-lunge', kids: F.footman(x, roadY(x) + dy) });
  for (const [x, dy] of [[SX + 50, 16], [SX + 110, 2]]) stage.push(...F.footman(x, roadY(x) + dy));   // the garrison
  for (const [x, y] of [[2120, 812], [2260, 826], [2400, 840]]) stage.push({ t: 'line', x1: SX + 300, y1: 450, x2: x, y2: y, rc: 'f-shot', anim: 'm-shot' });
  render(stage, el('g', {}, art));
  // the captain and the field force at the night's line, facing the horde (mirrored to face right)
  const FIGHT = SX + 440;
  const face = (parts, x) => { const g = el('g', { transform: `translate(${2 * x} 0) scale(-1 1)` }, art); render(parts, g); return g; };
  face(F.rider(SX + 300, roadY(SX + 300) + 8), SX + 300);
  for (const [x, dy] of [[SX + 380, -8], [SX + 420, 14], [FIGHT - 20, -2]]) face([{ t: 'g', anim: 'm-lunge', kids: F.footman(x, roadY(x) + dy) }], x);

  // the moving actors, each drawn at its own origin and walked by the art's loop
  const walker = (parts) => { const g = el('g', {}, art); render(parts, g); return g; };
  const PERIOD = 8;                                              // seconds for a figure to walk its road
  // by day: the column out of the gate, down the road to the ritual
  const column = [F.rider(0, 0), F.footman(0, 0), F.footman(0, 0), F.siege(0, 0), F.footman(0, 0), F.footman(0, 0)]
    .map((parts, i, all) => ({ g: walker(parts), phase: i / all.length, from: SX - 120, to: 840, falls: false }));
  // by night: the horde down the short road, falling at the line
  const horde = Array.from({ length: 9 }, (_, i) => ({ g: walker((i % 3 === 1 ? F.skeleton : F.ghoul)(0, 0, (i % 3) * .23)), phase: i / 9, from: W + 40, to: FIGHT + 40, dy: [-6, 12, 0][i % 3], falls: true }));
  // a figure walks 86% of its loop, then the horde falls at the line and the column joins the fight
  const place = (u, f) => {
    const x = u.from + (u.to - u.from) * Math.min(1, f / .86), y = roadY(x) + (u.dy || 0), end = Math.max(0, (f - .86) / .14);
    u.g.setAttribute('transform', `translate(${x} ${y})` + (u.falls && end ? ` rotate(${80 * end})` : ''));
    u.g.style.opacity = end ? (u.falls ? 1 - end * .8 : 0) : f < .06 ? .5 : 1;
  };
  const artTick = (t) => { for (const u of [...column, ...horde]) place(u, (t / PERIOD + u.phase) % 1); };

  // the art's keynote tags, in the sealed hand; the key is in the title block
  const tags = el('g', { class: 'hand-vellum' }, art);
  const tag = (n, [ax, ay], [tx, ty]) => {
    const len = Math.hypot(ax - tx, ay - ty);
    el('line', { x1: tx + (ax - tx) * 27 / len, y1: ty + (ay - ty) * 27 / len, x2: ax, y2: ay, class: 'ln-thin', style: 'stroke-width:2.6' }, tags);
    el('circle', { cx: ax, cy: ay, r: 6, class: 'ln-dot' }, tags);
    el('polygon', { points: pts(Array.from({ length: 6 }, (_, i) => [tx + 27 * Math.cos(Math.PI / 6 + i * Math.PI / 3), ty + 27 * Math.sin(Math.PI / 6 + i * Math.PI / 3)])), class: 'ln-tag', style: 'stroke-width:3' }, tags);
    text(tags, tx, ty + 1, String(n), 'ln-tagn', 'middle');
  };
  tag(1, [1100, roadY(1100) - 30], [1120, 650]);
  tag(2, [300, 760], [170, 620]);
  tag(3, [470, 912], [470, 680]);
  tag(4, [880, 420], [1080, 300]);
  tag(5, [2560, roadY(2560) - 40], [2600, 640]);
  tag(6, [FIGHT + 120, roadY(FIGHT + 120) - 60], [2140, 560]);
  tag(7, [SX + 80, roadY(SX + 80) - 50], [SX + 210, 640]);

  /* ════════════ THE DETAIL ════════════ */
  const det = document.getElementById('detail');
  const S = el('g', { class: 'hand-vellum' }, det);
  const X0 = 170, X1 = 2770;
  const xAt = (min) => X0 + min / TOTAL * (X1 - X0);            // minutes of match -> x on the score
  const duskX = (k) => xAt(START[k - 1] + DAY[k - 1]);          // k counts nights from 1
  const endX = (k) => xAt(START[k - 1] + DAY[k - 1] + NIGHT[k - 1]);
  const nightC = (k) => xAt(START[k - 1] + DAY[k - 1] + NIGHT[k - 1] / 2);
  const ST = 220, SB = 340;                                      // the strip's top and bottom

  // row labels
  [['events', 116], ['lengths', 466], ['undead', 586], ['minutes', 686], ['length', 782], ['long', 1006], ['night', 1034]].forEach(([s, y]) => text(S, 20, y, s, 'sc-kick'));

  // glyphs, drawn in ink at a centre
  const glyph = {
    ...window.WALL.EVENT,                                         // the four events' glyphs, shared (C-201)
    sun: (g, x, y) => { el('circle', { cx: x, cy: y, r: 10, class: 'sc-glyph' }, g); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; el('line', { x1: x + 14 * Math.cos(a), y1: y + 14 * Math.sin(a), x2: x + 20 * Math.cos(a), y2: y + 20 * Math.sin(a), class: 'sc-glyph', style: 'stroke-width:2' }, g); } },
    moon: (g, x, y) => { el('circle', { cx: x, cy: y, r: 12, class: 'sc-pip' }, g); el('circle', { cx: x + 6, cy: y - 4, r: 11, class: 'sc-ink' }, g); },
    bounty: (g, x, y) => { el('circle', { cx: x, cy: y, r: 11, class: 'sc-glyph' }, g); el('path', { d: `M${x - 17} ${y} H${x + 17} M${x} ${y - 17} V${y + 17}`, class: 'sc-glyph', style: 'stroke-width:2' }, g); },
    fire: (g, x, y) => { el('path', { d: `M${x} ${y - 34} C${x - 22} ${y - 8}, ${x - 16} ${y + 10}, ${x} ${y + 12} C${x + 16} ${y + 10}, ${x + 22} ${y - 8}, ${x} ${y - 34} Z M${x} ${y - 6} C${x - 8} ${y + 4}, ${x - 4} ${y + 10}, ${x} ${y + 10} C${x + 4} ${y + 10}, ${x + 8} ${y + 4}, ${x} ${y - 6} Z`, class: 'sc-glyph' }, g); el('path', { d: `M${x - 26} ${y + 24} L${x + 26} ${y + 14} M${x - 26} ${y + 14} L${x + 26} ${y + 24}`, class: 'sc-glyph', style: 'stroke-width:4' }, g); },
    banner: (g, x, y) => { el('line', { x1: x - 14, y1: y + 36, x2: x - 14, y2: y - 38, class: 'sc-glyph', style: 'stroke-width:3' }, g); el('path', { d: `M${x - 12} ${y - 36} H${x + 24} L${x + 16} ${y - 20} L${x + 24} ${y - 4} H${x - 12} Z`, class: 'sc-glyph' }, g); el('path', { d: `M${x - 2} ${y - 14} l4 -12 l4 8 l4 -8 l4 12 Z`, class: 'sc-glyphf', style: 'stroke-width:1' }, g); },
    obelisk: (g, x, y) => { el('path', { d: `M${x - 12} ${y + 26} L${x - 7} ${y - 22} L${x} ${y - 36} L${x + 7} ${y - 22} L${x + 12} ${y + 26} Z`, class: 'sc-glyph' }, g); el('line', { x1: x, y1: y - 18, x2: x, y2: y + 16, class: 'sc-glyph', style: 'stroke-width:2' }, g); },
    cross: (g, x, y, r) => el('path', { d: `M${x - r} ${y - r} L${x + r} ${y + r} M${x + r} ${y - r} L${x - r} ${y + r}`, class: 'sc-glyph', style: 'stroke-width:4' }, g),
    // the three victories (1.3 · 9.5, amended): the boss dies, the King's army arrives, the rituals are broken
    endings: (g, x, y) => {
      const mini = (draw, dx) => { const m = el('g', { transform: `translate(${x + dx} ${y}) scale(.6) translate(${-x - dx} ${-y})` }, g); draw(m, x + dx, y); };
      mini((m, cx, cy) => { glyph.boss(m, cx, cy + 6); glyph.cross(m, cx, cy + 2, 24); }, -40);
      mini((m, cx, cy) => glyph.banner(m, cx, cy), 0);
      mini((m, cx, cy) => { glyph.obelisk(m, cx, cy); glyph.cross(m, cx, cy - 4, 22); }, 40);
    },
    // a hero: crowned, smaller than the boss (C-201: each event's hero leads it)
    hero: (g, x, y) => { el('path', { d: `M${x - 12} ${y - 6} L${x - 12} ${y - 17} L${x - 6} ${y - 11} L${x} ${y - 19} L${x + 6} ${y - 11} L${x + 12} ${y - 17} L${x + 12} ${y - 6} Z`, class: 'sc-glyphf' }, g); el('circle', { cx: x, cy: y + 6, r: 9, class: 'sc-glyph' }, g); },
    // a new unit, every second night (C-102)
    add: (g, x, y) => el('path', { d: `M${x} ${y - 9} l9 9 l-9 9 l-9 -9 Z`, class: 'sc-glyphf' }, g),
    boss: (g, x, y) => { el('path', { d: `M${x - 20} ${y - 18} L${x - 20} ${y - 34} L${x - 10} ${y - 24} L${x} ${y - 38} L${x + 10} ${y - 24} L${x + 20} ${y - 34} L${x + 20} ${y - 18} Z`, class: 'sc-glyphf' }, g); el('circle', { cx: x, cy: y, r: 17, class: 'sc-glyph' }, g); el('circle', { cx: x - 6, cy: y - 2, r: 4, class: 'sc-ink' }, g); el('circle', { cx: x + 6, cy: y - 2, r: 4, class: 'sc-ink' }, g); el('path', { d: `M${x - 8} ${y + 17} V${y + 26} H${x + 8} V${y + 17}`, class: 'sc-glyph' }, g); }
  };

  // events: the pool of four, three drawn onto nights 3, 6, 9; night 12 any of them, full strength (7.1, amended
  // 19 Oct). The cards grow with the night: weakest first, strongest last (7.5). Each event's hero leads it (C-201)
  const PW = 30 + C.events.pool.length * 100;
  el('rect', { x: X0 + 10, y: 52, width: PW, height: 120, rx: 14, class: 'sc-card', style: 'stroke-dasharray:10 7' }, S);
  C.events.pool.forEach((e, i) => glyph[e](S, X0 + 70 + i * 100, 108, 1.1));
  text(S, X0 + 10 + PW / 2, 200, `the draw · ${C.events.draws.length} of ${C.events.pool.length}, no repeats`, 'ln-lbl', 'middle').style.fontSize = '24px';
  const cards = {};
  [...C.events.draws, C.events.last].forEach((k, i) => {
    const s = 64 + i * 14, cx = nightC(k), top = 196 - s;
    el('path', { d: `M${X0 + 10 + PW} ${90 + i * 10} C ${X0 + 10 + PW + (cx - X0 - 10 - PW) * .45} ${20 + i * 6}, ${cx - 20} ${14 + i * 6}, ${cx} ${top - 6}`, class: 'ln-ext', style: 'stroke-width:1.8' }, S);
    el('path', { d: `M${cx - 7} ${top - 16} L${cx} ${top - 4} L${cx + 7} ${top - 16}`, class: 'sc-glyph', style: 'stroke-width:2' }, S);
    cards[k] = el('rect', { x: cx - s / 2, y: top, width: s, height: s, rx: 10, class: 'sc-card' }, S);
    text(S, cx, top + s / 2 + 2, k === C.events.last ? '★' : '?', 'sc-q', 'middle').style.fontSize = (s * .5) + 'px';
    el('line', { x1: duskX(k), y1: 198, x2: duskX(k), y2: ST, class: 'sc-glyph', style: 'stroke-width:2' }, S);   // announced at dusk
    glyph.hero(S, cx + s / 2 + 22, top + s / 2);                // its hero leads it, at the dusk roll's town
  });

  // night 13: the boss on the middle road, a lieutenant on each town's road (9.3 · 9.4)
  const fc = nightC(C.finale.night);
  cards[C.finale.night] = el('rect', { x: fc - 60, y: 52, width: 120, height: 112, rx: 12, class: 'sc-card' }, S);
  glyph.boss(S, fc, 112);
  [-1, 0, 1].forEach((d) => {
    el('line', { x1: fc + d * 14, y1: 166, x2: fc + d * 30, y2: ST - 4, class: 'sc-glyph', style: 'stroke-width:2.4' }, S);
    el('circle', { cx: fc + d * 30, cy: ST - 4, r: 5, class: 'sc-ink' }, S);
  });

  // the strip: the fire, thirteen days and nights to scale, the end
  el('rect', { x: 20, y: ST, width: 130, height: SB - ST, rx: 10, class: 'sc-day' }, S);
  glyph.fire(S, 85, 280);
  for (let k = 1; k <= NN; k++) {
    const x = xAt(START[k - 1]), dw = duskX(k) - x, nw = endX(k) - x - dw;
    el('rect', { x, y: ST, width: dw, height: SB - ST, class: 'sc-day' }, S);
    el('rect', { x: x + dw, y: ST, width: nw, height: SB - ST, class: 'sc-night' }, S);
    glyph.sun(S, x + dw / 2, 258);
    if (k > 1) glyph.bounty(S, x + dw / 2, 310);              // every dawn, one bounty champion (3.3)
    glyph.moon(S, x + dw + nw / 2, 262);
    text(S, x + dw + nw / 2, 378, String(k), 'sc-num');
  }
  const HM = window.MODELS.horde;                                // a new unit, every second night (C-102)
  if (HM) for (let k = HM.adds.first; k < C.finale.night; k += HM.adds.every) glyph.add(S, nightC(k), 400);
  // the end: night 13 has no dawn of its own; it ends one of three ways (1.3 · 9.5, amended)
  el('rect', { x: X1 + 20, y: ST, width: 130, height: SB - ST, rx: 10, class: 'sc-day' }, S);
  glyph.endings(S, X1 + 85, 280);
  text(S, X1 + 85, 378, 'three endings', 'ln-lbl', 'middle').style.fontSize = '22px';
  if (C.finale.endless) text(S, X1 + 85, 206, `army ${b(mss(C.finale.armyAt / 60))}`, 'ln-lbl', 'middle').style.fontSize = '22px';

  // lengths: each cycle's day and night, so the days can be seen to shrink and the nights to grow
  const all = [...DAY, ...NIGHT], lo = Math.min(...all), hi = Math.max(...all);
  const yL = (m) => hi === lo ? 458 : 498 - (m - lo) / (hi - lo) * 80;
  const cyc = (k) => xAt(START[k] + (DAY[k] + NIGHT[k]) / 2);
  const line = (arr) => pts(arr.map((m, k) => [cyc(k), yL(m)]));
  el('polyline', { points: line(DAY), class: 'sc-glyph', style: 'stroke-width:3' }, S);
  el('polyline', { points: line(NIGHT), class: 'sc-glyph', style: 'stroke-width:7' }, S);
  DAY.forEach((m, k) => el('circle', { cx: cyc(k), cy: yL(m), r: 7, class: 'sc-day' }, S));
  NIGHT.forEach((m, k) => el('circle', { cx: cyc(k), cy: yL(m), r: 7, class: 'sc-night' }, S));
  const lbl = (x, y, s, a) => { text(S, x, y, s, 'ln-lbl', a).style.fontSize = '23px'; };
  lbl(cyc(0) - 16, yL(DAY[0]) + 8, `day ${b(mss(DAY[0]))}`, 'end');
  lbl(cyc(0) - 16, yL(NIGHT[0]) + 8, `night ${b(mss(NIGHT[0]))}`, 'end');
  lbl(X1 + 20, yL(DAY[NN - 1]) + 8, `day ${b(mss(DAY[NN - 1]))}`);
  lbl(X1 + 20, yL(NIGHT[NN - 1]) + 8, `night ${b(mss(NIGHT[NN - 1]))}`);
  if (grows) {                                                   // where the night first matches the day
    const even = NIGHT.findIndex((n, k) => n >= DAY[k] - 1e-9);
    if (even > 0 && even < NN - 1) {
      el('line', { x1: cyc(even), y1: 400, x2: cyc(even), y2: 506, class: 'ln-ext', style: 'stroke-width:2' }, S);
      lbl(cyc(even) + 12, 412, `even by night ${even + 1}`);
    }
  }

  // the undead: weak by day, strong by night, stronger on blight. The shape is sealed; the values are open.
  let step = `M${X0} 612`;
  for (let k = 1; k <= NN; k++) step += ` H${duskX(k)} V560 H${endX(k)} V612`;
  el('path', { d: step, class: 'sc-glyph', style: 'stroke-width:3.4' }, S);
  el('line', { x1: X0, y1: 534, x2: X1, y2: 534, class: 'ln-ext', style: 'stroke-width:2.2' }, S);
  el('path', { d: 'M136 612 l8 -12 l8 12 Z', class: 'sc-glyphf', transform: 'rotate(180 144 606)' }, S);
  el('path', { d: 'M136 566 l8 -12 l8 12 Z', class: 'sc-glyphf' }, S);
  el('path', { d: 'M136 540 l8 -12 l8 12 Z M136 528 l8 -12 l8 12 Z', class: 'sc-glyphf' }, S);
  text(S, X1 + 20, 542, 'on blight', 'ln-lbl');
  text(S, X0 + 8, 646, 'values open · in config', 'ln-lbl').style.fontSize = '22px';

  // minutes, to scale
  el('line', { x1: X0, y1: 680, x2: X1, y2: 680, class: 'ln-thin', style: 'stroke-width:2' }, S);
  for (let m = 0; m <= TOTAL + 1e-9; m++) el('line', { x1: xAt(m), y1: 675, x2: xAt(m), y2: 685, class: 'ln-thin' }, S);
  [...START, TOTAL].forEach((m) => {
    el('line', { x1: xAt(m), y1: 666, x2: xAt(m), y2: 694, class: 'ln-tick', style: 'stroke-width:2.4' }, S);
    text(S, xAt(m), 724, b(mmss(m).replace(' min', '')), 'ln-lbl', 'middle').style.fontSize = '24px';
  });

  // what the numbers add up to, and what the sheet found
  const dimS = (x1, x2, y, cls, tick) => {
    el('line', { x1, y1: y, x2, y2: y, class: cls }, S);
    for (const x of [x1, x2]) el('line', { x1: x - 10, y1: y + 10, x2: x + 10, y2: y - 10, class: tick }, S);
  };
  dimS(X0, X1, 776, 'ln-thin', 'ln-tick');
  // the numbers move, so the notes find their own room: whichever side of the red line is wider
  const x40 = xAt(C.v1Label.minutes), roomLeft = x40 - X0 >= X1 - x40;
  text(S, roomLeft ? (X0 + x40) / 2 : (x40 + X1) / 2, 762, grows
    ? `nights ${b(mss(NIGHT[0]))} → ${b(mss(NIGHT[NN - 1]))} · ${NN} cycles = ${b(mss(TOTAL))}`
    : `${NN} nights × ${b(mmss(CYC))} = ${b(mmss(TOTAL))}`, 'ln-lbl', 'middle');
  el('line', { x1: x40, y1: ST - 10, x2: x40, y2: 846, class: 'rl', style: 'stroke-dasharray:12 8' }, S);
  dimS(X0, x40, 836, 'rl', 'rl-tick');
  text(S, (X0 + x40) / 2, 822, `~${C.v1Label.minutes} min · v1's label · unsealed`, 'rl-lbl', 'middle');
  // the finding, clouded and flagged as a reviewer would, sized to its own words
  const need = Math.round(C.v1Label.minutes / NN);
  const anchor = roomLeft ? 'end' : 'start', nx = roomLeft ? x40 - 44 : x40 + 44;
  const notes = [text(S, nx, 896, `at the test cycle a match runs ${b(mss(TOTAL))};`, 'rl-lbl', anchor),
                 text(S, nx, 930, `~${C.v1Label.minutes} min needs a ${b(need)}-min cycle, or fewer nights`, 'rl-lbl', anchor)];
  const tw = Math.max(...notes.map((l) => l.getComputedTextLength()));
  const cx0 = (roomLeft ? nx - tw : nx) - 24, cx1 = cx0 + tw + 48, cy0 = 866, cy1 = 946;
  const nh = Math.ceil((cx1 - cx0) / 40), sh = (cx1 - cx0) / nh, nv = Math.ceil((cy1 - cy0) / 30), sv = (cy1 - cy0) / nv;
  let cloud = `M${cx0} ${cy0}`;
  for (let i = 0; i < nh; i++) cloud += ` a${sh / 2} 14 0 0 1 ${sh} 0`;
  for (let i = 0; i < nv; i++) cloud += ` a14 ${sv / 2} 0 0 1 0 ${sv}`;
  for (let i = 0; i < nh; i++) cloud += ` a${sh / 2} 14 0 0 1 ${-sh} 0`;
  for (let i = 0; i < nv; i++) cloud += ` a14 ${sv / 2} 0 0 1 0 ${-sv}`;
  el('path', { d: cloud, class: 'rl-cloud' }, S);
  // the revision delta: rev 1 cut the test cycle from six minutes to four; rev 2 made the nights grow
  const fx = roomLeft ? cx0 - 46 : cx1 + 46;
  el('path', { d: `M${fx} ${cy0 + 4} l22 38 h-44 Z`, class: 'rl-cloud', style: 'stroke-width:3' }, S);
  text(S, fx, cy0 + 36, '2', 'rl-lbl', 'middle').style.fontSize = '22px';

  // the long night, later (v1's hard mode, renamed: hard is now the difficulty dial): 26 nights, an event every
  // third night (not to the time scale above)
  const HW = (X1 - X0) / C.long.nights, HD = DAY[0] / CYC;
  for (let k = 1; k <= C.long.nights; k++) {
    const x = X0 + (k - 1) * HW;
    el('rect', { x, y: 994, width: HW * HD, height: 36, class: 'sc-day', style: 'stroke-width:1.4' }, S);
    el('rect', { x: x + HW * HD, y: 994, width: HW * (1 - HD), height: 36, class: 'sc-night', style: 'stroke-width:1.4' }, S);
    if (k % C.long.every === 0) el('path', { d: `M${x + HW * (1 + HD) / 2} 966 l7 16 h-14 Z`, class: 'sc-glyphf' }, S);
  }
  text(S, X1 + 20, 1022, `${C.long.nights} · later`, 'ln-lbl').style.fontSize = '24px';

  // the detail's key, in the title block, drawn with the same glyphs
  const keyd = document.getElementById('keyd');
  const row = (i, draw, label) => {
    const y = 20 + i * 36;
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
  row(5, glyph.hero, 'its hero leads it; hard: every night');
  row(6, glyph.add, 'a new unit, every second night');
  row(7, glyph.boss, 'the boss, chosen at the fire · 9.3');
  row(8, (g, x, y) => glyph.endings(el('g', { transform: `translate(${x} ${y}) scale(.5) translate(${-x} ${-y})` }, g), x, y), 'the endings: boss · army · rituals');

  // the playhead (screen only)
  const now = el('rect', { x: X0, y: ST - 6, width: xAt(CYC) - X0, height: SB - ST + 12, class: 'sc-now hidden' }, det);
  const head = el('g', { class: 'hidden' }, det);
  el('line', { x1: 0, y1: ST - 26, x2: 0, y2: SB + 8, class: 'sc-head' }, head);
  el('path', { d: `M-10 ${ST - 32} L10 ${ST - 32} L0 ${ST - 16} Z`, class: 'sc-headf' }, head);

  /* ════════════ two loops: the art's story, the detail's clock ════════════ */
  const still = () => {
    artTick(PERIOD * .37);                                       // a frame with the column strung out and the horde on the road
    [now, head].forEach((e) => e.classList.add('hidden'));
    Object.values(cards).forEach((c) => c.classList.remove('on'));
  };
  const clockTick = (t) => {
    let k = 0;
    while (k < NN - 1 && START[k + 1] <= t) k++;
    const day = t - START[k] < DAY[k];
    now.setAttribute('x', xAt(START[k])); now.setAttribute('width', xAt(START[k] + DAY[k] + NIGHT[k]) - xAt(START[k]));
    head.setAttribute('transform', `translate(${xAt(t)} 0)`);
    [now, head].forEach((e) => e.classList.remove('hidden'));
    Object.entries(cards).forEach(([n, c]) => c.classList.toggle('on', +n === k + 1 && !day));
  };
  still();
  if (!moving) return;
  let t = 0, a = 0;
  setInterval(() => {
    if (motion !== 'data') { a += 1 / FPS; artTick(a); }         // ?motion=data keeps only what the numbers drive
    t += 1 / FPS; if (t > TOTAL + 3) t = 0; clockTick(Math.min(t, TOTAL));
  }, 1000 / FPS);
  window.addEventListener('beforeprint', still);
  }
})();
