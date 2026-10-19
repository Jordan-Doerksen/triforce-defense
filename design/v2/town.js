/* town.js — the hill town, drawn from MODELS.town: its buildings in iso (v1's Flash style), the whole
   town at a tier as a diorama, the box that holds it (the art face), small icons of its parts, and its
   plans at each tier in the sealed hand (the detail face). Shared by X-003 (the Q7 trial, with the LEGO
   devices it tried) and T-101 (the sheet, with the two R10 kept: the box and the numbered steps). */
(function () {
  const { el, pts, render } = window.WALL;
  const M = window.MODELS.town, F = window.FIG, ISO = window.ISO;
  const W = M.W, H = M.H, MG = M.margin;
  // an anchor given here wins over a class's own (the hand lettering centres by default)
  const text = (g, x, y, s, cls, anchor, size) => { const t = el('text', { x, y, class: cls }, g); t.textContent = s; if (anchor) t.style.textAnchor = anchor; if (size) t.style.fontSize = size + 'px'; return t; };
  const ROMAN = ['I', 'II', 'III'];

  /* ════════════ the buildings, in iso ════════════ */
  const treeParts = (h, w) => {
    const p = [{ t: 'rect', x: -8, y: -30, w: 16, h: 30, rc: 'f-trunk' }];
    for (let i = 0; i < 3; i++) { const bot = -24 - i * h * .22, top = bot - h * .42, hw = (w / 2) * (1 - i * .22); p.push({ t: 'poly', pts: [[-hw, bot], [0, top], [hw, bot]], rc: 'f-tree' }); }
    return p;
  };
  const flagAt = (I, x, y, z, d) => I.custom(d, (p, P) => {
    const [sx, sy] = P(x, y, z);
    el('line', { x1: sx, y1: sy, x2: sx, y2: sy - 46, class: 'f-pole', style: 'stroke-width:3' }, p);
    el('polygon', { points: pts([[sx, sy - 46], [sx - 34, sy - 40], [sx - 26, sy - 32], [sx - 34, sy - 24], [sx, sy - 26]]), class: 'f-flag m-flag' }, p);
  });
  const smokeAt = (I, x, y, z, d) => I.custom(d, (p, P) => {
    const [sx, sy] = P(x, y, z);
    for (const [dx, dy, r, dl] of [[0, -10, 9, 0], [6, -26, 12, .4], [-4, -44, 14, .8]]) el('circle', { cx: sx + dx, cy: sy + dy, r, class: 'f-smoke m-puff', style: `animation-delay:${dl}s` }, p);
  });
  const doorN = (I, x0, x1, y, z0, h, d) => I.custom(d, (p, P) => el('polygon', { points: pts([P(x0, y, z0), P(x1, y, z0), P(x1, y, z0 + h), P(x0, y, z0 + h)]), class: 'i-door' }, p));

  // one function per kind; footprints in plan, centred on cx, cy where a plot holds them
  const KIND = {
    hall(I, tier, f) {
      const { x0, y0, x1, y1 } = f, d = I.depth((x0 + x1) / 2, (y0 + y1) / 2);
      const h = [70, 96, 118][tier];
      I.box(x0, y0, x1, y1, 0, h, 'stone', d);
      doorN(I, (x0 + x1) / 2 - 18, (x0 + x1) / 2 + 18, y0, 0, 40, d + .2);
      I.roof(x0 + 6, y0 + 6, x1 - 6, y1 - 6, h, [60, 70, 80][tier], 'roof', d);
      const t = [[], [[x0 - 8, y0 - 8]], [[x0 - 10, y0 - 10], [x1 - 34, y0 - 10], [x0 - 10, y1 - 34], [x1 - 34, y1 - 34]]][tier];
      if (tier === 1) t.push([x1 - 32, y0 - 8]);
      t.forEach(([tx, ty], i) => {
        const th = tier === 2 ? 168 : 128, td = I.depth(tx + 22, ty + 22) + (i < 2 ? 0 : -30);
        I.box(tx, ty, tx + 44, ty + 44, 0, th, 'stone', td);
        I.roof(tx, ty, tx + 44, ty + 44, th, 46, 'roof', td);
        if (tier === 2 && i < 2) flagAt(I, tx + 22, ty + 22, th + 46, td + .9);
      });
      if (tier < 2) flagAt(I, (x0 + x1) / 2, (y0 + y1) / 2, h + [60, 70][tier], d + .9);
    },
    barracks(I, f) { const d = I.depth((f.x0 + f.x1) / 2, (f.y0 + f.y1) / 2); I.box(f.x0, f.y0, f.x1, f.y1, 0, 56, 'stone', d); I.roof(f.x0, f.y0, f.x1, f.y1, 56, 40, 'roof', d); doorN(I, f.x0 + 60, f.x0 + 90, f.y0, 0, 32, d + .2); flagAt(I, f.x0 + 20, f.y0 + 10, 96, d + .9); },
    house(I, f, mat = 'wood') { const d = I.depth((f.x0 + f.x1) / 2, (f.y0 + f.y1) / 2); I.box(f.x0, f.y0, f.x1, f.y1, 0, 38, mat, d); I.roof(f.x0, f.y0, f.x1, f.y1, 38, 30, 'roof', d); },
    field(I, x0, y0, x1, y1) {
      I.flat([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], 'i-soil', -9e3);
      I.custom(-8e3, (p, P) => { for (let x = x0 + 16; x < x1 - 8; x += 26) for (let y = y0 + 14; y < y1 - 6; y += 22) { const [sx, sy] = P(x, y, 0); el('circle', { cx: sx, cy: sy - 3, r: 5, class: 'i-pumpkin' }, p); } });
    },
    farm(I, f) { KIND.house(I, f); if (f.field) KIND.field(I, ...f.field); },
    smithy(I, f) { const d = I.depth((f.x0 + f.x1) / 2, (f.y0 + f.y1) / 2); I.box(f.x0, f.y0, f.x1, f.y1, 0, 46, 'stone', d); I.roof(f.x0, f.y0, f.x1, f.y1, 46, 28, 'roof', d); I.box(f.x1 - 24, f.y0 + 8, f.x1 - 6, f.y0 + 26, 0, 104, 'rock', d + .7); smokeAt(I, f.x1 - 15, f.y0 + 17, 104, d + .8); },
    mill(I, f) {
      const d = I.depth((f.x0 + f.x1) / 2, (f.y0 + f.y1) / 2);
      I.box(f.x0, f.y0, f.x1, f.y1, 0, 44, 'wood', d); I.roof(f.x0, f.y0, f.x1, f.y1, 44, 30, 'roof', d);
      for (const [i, j] of [[0, 0], [1, 0], [0, 1]]) I.box(f.x0 - 50 + i * 20, f.y0 + 10 + j * 0, f.x0 - 32 + i * 20, f.y0 + 60, j * 16, 16, 'wood', d - 20 + i);
    },
    mine(I, f) {
      const d = I.depth((f.x0 + f.x1) / 2, (f.y0 + f.y1) / 2);
      I.box(f.x0, f.y0, f.x1, f.y1, 0, 44, 'rock', d); I.roof(f.x0, f.y0, f.x1, f.y1, 44, 56, 'rock', d);
      doorN(I, (f.x0 + f.x1) / 2 - 16, (f.x0 + f.x1) / 2 + 16, f.y0, 0, 30, d + .2);
      I.custom(d + .3, (p, P) => { for (const [x, z] of [[f.x0 + 20, 20], [f.x1 - 22, 30], [f.x0 + 36, 52]]) { const [sx, sy] = P(x, f.y0, z); el('circle', { cx: sx, cy: sy, r: 4.5, class: 'i-gold' }, p); } });
    },
    scout(I, cx, cy) { const d = I.depth(cx, cy); I.box(cx - 18, cy - 18, cx + 18, cy + 18, 0, 118, 'stone', d); I.roof(cx - 22, cy - 22, cx + 22, cy + 22, 118, 40, 'roof', d); },
    guard(I, cx, cy) { const d = I.depth(cx, cy); I.box(cx - 22, cy - 22, cx + 22, cy + 22, 0, 140, 'stone', d); I.roof(cx - 26, cy - 26, cx + 26, cy + 26, 140, 50, 'roof', d); },
    arcane(I, cx, cy) { const d = I.depth(cx, cy); I.box(cx - 22, cy - 22, cx + 22, cy + 22, 0, 160, 'stone', d); I.roof(cx - 26, cy - 26, cx + 26, cy + 26, 160, 70, 'violet', d); },
    sanctum(I, cx, cy) { const d = I.depth(cx, cy); I.box(cx - 50, cy - 42, cx + 50, cy + 42, 0, 58, 'stone', d); I.roof(cx - 50, cy - 42, cx + 50, cy + 42, 58, 84, 'blue', d); doorN(I, cx - 14, cx + 14, cy - 42, 0, 30, d + .2); },
    workshop(I, cx, cy) { const d = I.depth(cx, cy); I.box(cx - 55, cy - 40, cx + 55, cy + 40, 0, 52, 'wood', d); I.roof(cx - 55, cy - 40, cx + 55, cy + 40, 52, 34, 'roof', d); I.box(cx + 26, cy - 30, cx + 42, cy - 14, 0, 110, 'rock', d + .7); smokeAt(I, cx + 34, cy - 22, 110, d + .8); },
    farmPlot(I, cx, cy) { KIND.house(I, { x0: cx - 30, y0: cy - 44, x1: cx + 30, y1: cy - 4 }); KIND.field(I, cx - 50, cy, cx + 50, cy + 46); },
    market(I, cx, cy) {
      for (const [x0, y0] of [[cx - 52, cy - 34], [cx + 8, cy - 34], [cx - 22, cy + 10]]) {
        const d = I.depth(x0 + 22, y0 + 18);
        I.box(x0, y0, x0 + 44, y0 + 36, 0, 22, 'canvas', d);
        I.roof(x0 - 4, y0 - 4, x0 + 48, y0 + 40, 22, 22, 'roof', d);
      }
    },
    aviary(I, cx, cy) {
      const d = I.depth(cx, cy);
      I.box(cx - 26, cy - 26, cx + 26, cy + 26, 0, 150, 'wood', d); I.roof(cx - 32, cy - 32, cx + 32, cy + 32, 150, 40, 'blue', d);
      I.custom(d + 50, (p, P) => {                               // a gryphon of the patrol, circling (2.6)
        const [sx, sy] = P(cx, cy, 250);
        const g = el('g', { class: 'm-circle', style: `transform-origin:${sx}px ${sy}px` }, p);
        render(F.gryphon(0, 0), el('g', { transform: `translate(${sx + 70} ${sy}) scale(.7)` }, g));
      });
    },
    gate(I) {
      const { x0, x1 } = M.gate, d = I.depth((x0 + x1) / 2, 14);
      I.box(x0 - 14, -16, x1 + 14, 44, 0, 104, 'stone', d + 6);
      doorN(I, x0 + 6, x1 - 6, -16, 0, 56, d + 6.2);
      for (const mx of [x0 - 14, (x0 + x1) / 2 - 10, x1 - 6]) I.box(mx, -16, mx + 20, 4, 104, 18, 'stone', d + 6.3);
      flagAt(I, (x0 + x1) / 2, 14, 122, d + 6.9);
    },
    plot(I, cx, cy) { I.ring(cx, cy, M.plotR, 'i-plot'); },
    special(I, cx, cy) { I.sprite(F.siege(0, 0), cx, cy, .62); },
    garrison(I, cx, cy) { I.sprite(F.footman(0, 0), cx, cy, .9); },
    ultimate(I, cx, cy) { I.custom(0, (p, P) => { const [sx, sy] = P(cx, cy, 30); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; el('line', { x1: sx + 10 * Math.cos(a), y1: sy + 10 * Math.sin(a), x2: sx + 30 * Math.cos(a), y2: sy + 30 * Math.sin(a), class: 'f-ray' }, p); } el('circle', { cx: sx, cy: sy, r: 12, class: 'f-sun' }, p); }); }
  };
  const OPTION = { farm: KIND.farmPlot, guard: KIND.guard, arcane: KIND.arcane, sanctum: KIND.sanctum, workshop: KIND.workshop, market: KIND.market, aviary: KIND.aviary };
  const spineKind = { barracks: KIND.barracks, farm: KIND.farm, smithy: KIND.smithy, mill: KIND.mill, mine: KIND.mine };

  // the walls: segments, so the painter can sort them, with gaps for the gate and the river
  const walls = (I) => {
    const T = 28, Hh = 64, seg = 100;
    const run = (along, gaps, mk) => { for (let a = 0; a < along; a += seg) { let s0 = a, s1 = Math.min(a + seg, along); for (const [g0, g1] of gaps) { if (s1 > g0 && s0 < g1) { if (s0 < g0) mk(s0, g0); s0 = Math.max(s0, g1); } } if (s1 > s0) mk(s0, s1); } };
    const merl = (x0, y0, x1, y1, d) => I.box(x0, y0, x1, y1, Hh, 16, 'stone', d + .1);
    run(W, [[M.gate.x0, M.gate.x1]], (a, b) => { const d = I.depth((a + b) / 2, T / 2); I.box(a, 0, b, T, 0, Hh, 'stone', d); for (let m = a + 8; m < b - 18; m += 40) merl(m, 0, m + 20, T, d); });
    run(H, [M.riverGaps.east], (a, b) => { const d = I.depth(W - T / 2, (a + b) / 2); I.box(W - T, a, W, b, 0, Hh, 'stone', d); for (let m = a + 8; m < b - 18; m += 40) merl(W - T, m, W, m + 20, d); });
    run(W, [], (a, b) => { const d = I.depth((a + b) / 2, H - T / 2); I.box(a, H - T, b, H, 0, Hh, 'stone', d); });
    run(H, [M.riverGaps.west], (a, b) => { const d = I.depth(T / 2, (a + b) / 2); I.box(0, a, T, b, 0, Hh, 'stone', d); });
    for (const [x, y] of [[-12, -12], [W - 40, -12], [-12, H - 40], [W - 40, H - 40]]) { const d = I.depth(x + 26, y + 26) + 2; I.box(x, y, x + 52, y + 52, 0, 92, 'stone', d); I.roof(x - 4, y - 4, x + 56, y + 56, 92, 44, 'roof', d); }
  };

  // the river through the town: an outline from its centre line, so plans and art share the bank
  const riverOutline = (w, c = M.river) => {
    const L = [], R = [];
    c.forEach((p, i) => {
      const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1;
      L.push([p[0] - dy / n * w / 2, p[1] + dx / n * w / 2]); R.push([p[0] + dy / n * w / 2, p[1] - dx / n * w / 2]);
    });
    return [...L, ...R.reverse()];
  };

  // the mountains behind the plateau (1.5, clarified): a massif west and south, higher than the town,
  // its peaks snow-capped, and the river coming down out of it in a cascade onto the plateau
  const massif = (I) => {
    const Mt = M.mountains, E = MG, CL = M.cliff, S = Mt.shoulder, xW = Mt.west, yS = Mt.south;
    I.box(xW, -E, -E, yS, -CL, CL + S, 'rock', -3e5);
    I.box(-E, H + E, 560, yS, -CL, CL + S, 'rock', -3e5 + 1);
    I.flat([[xW + 60, 92], [-E, 96], [-E, 128], [xW + 60, 136]], 'i-water', -2.9e5, S);
    I.custom(-2.9e5 + 1, (p, P) => el('polyline', { points: pts([P(xW + 70, 114, S), P(-E, 112, S)]), class: 'i-flow m-flow' }, p));
    const peaks = [];
    for (let y = 20, i = 0; y < yS - 70; y += 140, i++) peaks.push([(xW - E) / 2 + (i % 2 ? 46 : -46), y, 170 + (i * 53) % 110]);
    for (let x = 70, i = 0; x < 540; x += 150, i++) peaks.push([x, (H + E + yS) / 2 + (i % 2 ? 34 : -34), 150 + (i * 41) % 90]);
    peaks.forEach(([cx, cy, h]) => {
      if (Math.abs(cy - 112) < 70 && cx < -E) return;             // the gorge the river comes down
      const b = 130, d = -2.8e5 + I.depth(cx, cy) * .01;
      I.roof(cx - b / 2, cy - b / 2, cx + b / 2, cy + b / 2, S, h, 'rock', d);
      I.roof(cx - b * .2, cy - b * .2, cx + b * .2, cy + b * .2, S + h * .6, h * .4, 'snow', d + .2);
    });
    I.custom(-2.7e5, (p, P) => {                                 // the cascade, down the massif's face
      const [y0, y1] = Mt.cascade;
      el('polygon', { points: pts([P(-E, y0, 0), P(-E, y1, 0), P(-E, y1, S), P(-E, y0, S)]), class: 'i-falls' }, p);
      for (const y of [y0 + 6, (y0 + y1) / 2, y1 - 6]) el('line', { x1: P(-E, y, S)[0], y1: P(-E, y, S)[1], x2: P(-E, y, 0)[0], y2: P(-E, y, 0)[1], class: 'i-fallsline m-fall' }, p);
    });
  };

  // the whole town at a tier, into an ISO; `build` names what the six plots hold (null: bare rings).
  // o.inset: the town alone on its plateau, for a bigger drawing (M-101) that draws the ground around it
  const town = (I, tier, build, o = {}) => {
    const E = MG, CL = M.cliff;
    if (M.mountains && !o.inset) massif(I);
    I.flat([[-E, -E], [W + E, -E], [W + E, H + E], [-E, H + E]], 'i-grass-t', -1e5);
    if (!o.inset) I.custom(-1e5 + 1, (p, P) => {               // the high ground's cliffs, north and east (1.5)
      el('polygon', { points: pts([P(-E, -E, 0), P(W + E, -E, 0), P(W + E, -E, -CL), P(-E, -E, -CL)]), class: 'i-grass-n' }, p);
      el('polygon', { points: pts([P(W + E, -E, 0), P(W + E, H + E, 0), P(W + E, H + E, -CL), P(W + E, -E, -CL)]), class: 'i-grass-e' }, p);
      for (const z of [-46, -92, -128]) el('polyline', { points: pts([P(-E, -E, z), P(W + E, -E, z), P(W + E, H + E, z)]), class: 'i-strata' }, p);
    });
    I.flat([[600, 0], [644, 0], [636, 400], [592, 400]], 'i-soil', -9e4);
    I.flat(riverOutline(46), 'i-water', -8e4);
    I.custom(-8e4 + 1, (p, P) => el('polyline', { points: pts(M.river.map(([x, y]) => P(x, y, 1))), class: 'i-flow m-flow' }, p));
    if (!o.inset) I.custom(-1e5 + 2, (p, P) => {               // the falls, off the east cliff
      const y = M.falls.y;
      el('polygon', { points: pts([P(W + E, y - 22, 0), P(W + E, y + 22, 0), P(W + E, y + 22, -CL), P(W + E, y - 22, -CL)]), class: 'i-falls' }, p);
      for (const dy of [-12, 0, 12]) el('line', { x1: P(W + E, y + dy, 0)[0], y1: P(W + E, y + dy, 0)[1], x2: P(W + E, y + dy, -CL)[0], y2: P(W + E, y + dy, -CL)[1], class: 'i-fallsline m-fall', style: `animation-delay:${(dy + 12) / 40}s` }, p);
    });
    if (M.lowRiver && !o.inset) {                               // below the falls: the pool, and the river on down to the valley
      const low = M.lowRiver.map(([x, y]) => [W + E + x, y]);
      I.flat(riverOutline(52, low), 'i-water', -4e5, -CL);
      I.flat([[W + E, 236], [W + E + 70, 232], [W + E + 104, 270], [W + E + 70, 310], [W + E, 306]], 'i-water', -4e5 + 1, -CL);
      I.custom(-4e5 + 2, (p, P) => el('polyline', { points: pts(low.map(([x, y]) => P(x, y, -CL))), class: 'i-flow m-flow' }, p));
    }
    I.box(586, 236, 650, 290, 0, 8, 'wood', I.depth(618, 263) - 30);   // the little bridge on the hall road
    walls(I);
    KIND.gate(I);
    M.scouts.forEach(([x, y]) => (tier >= 0 && build ? KIND.scout(I, x, y) : I.ring(x, y, 24, 'i-plot')));
    KIND.hall(I, tier, M.hall);
    M.spine.forEach((s) => spineKind[s.id](I, s));
    M.plots.forEach((pl, i) => {
      if (pl.ring > tier + 1) return;
      KIND.plot(I, pl.x, pl.y);
      if (build) OPTION[build[i]](I, pl.x, pl.y);
    });
    for (const [x, y, h] of [[-40, 120, 150], [-44, 480, 170], [-30, 700, 140], [120, H + 40, 160], [380, H + 44, 150], [700, H + 36, 170], [W + 30, H + 30, 150], [W + 36, 520, 150]])
      I.sprite(treeParts(h, h * .75), x, y, .7);
  };

  /* ════════════ the box: the finished set ════════════ */
  // o: { title, sub, fit: {x, y, w, h}, badges: [x, y0, gap] }; band: false and no badges draw it as a
  // plain framed render (T-101, after the owner found the toy box too literal)
  const box = (svg, o) => {
  const vb = svg.getAttribute('viewBox').split(' ').map(Number), BW = vb[2], BH = vb[3];
  el('rect', { width: BW, height: BH, class: 'f-sky2', style: 'fill:var(--fd-sky-2)' }, svg);
  el('rect', { y: BH * .65, width: BW, height: BH * .35, style: 'fill:var(--fd-sky-3)' }, svg);
  for (const [cx, cy, s] of [[BW * .15, BH * .24, 1], [BW * .74, BH * .19, .8], [BW * .44, BH * .28, .7]]) {
    const g = el('g', { transform: `translate(${cx} ${cy}) scale(${s})` }, svg);
    for (const [dx, dy, r] of [[-60, 10, 34], [-20, -14, 44], [30, 0, 38], [70, 14, 28]]) el('circle', { cx: dx, cy: dy, r, class: 'f-smoke', style: 'fill:var(--f-moon);stroke-width:3' }, g);
  }
  // fit the diorama into the box below its band, from the projection's own bounds
  const probe = ISO(null, { H, k: 1, ox: 0, oy: 0 });
  const Mt = M.mountains, west = Mt ? Mt.west : -MG, south = Mt ? Mt.south : H + MG, top = Mt ? Mt.shoulder + 280 : 0;
  const corners = [[west, -MG, -M.cliff], [W + MG, -MG, -M.cliff], [W + MG, H + MG, 0], [W + MG, south, -M.cliff], [west, south, top], [west, -MG, top], [W / 2, H / 2, 330]];
  const xs = corners.map((c) => probe.P(...c)[0]), ys = corners.map((c) => probe.P(...c)[1]);
  const fit = o.fit;
  const k = Math.min(fit.w / (Math.max(...xs) - Math.min(...xs)), fit.h / (Math.max(...ys) - Math.min(...ys)));
  const art = ISO(el('g', {}, svg), { H, k, ox: fit.x + (fit.w - (Math.max(...xs) - Math.min(...xs)) * k) / 2 - Math.min(...xs) * k, oy: fit.y + (fit.h - (Math.max(...ys) - Math.min(...ys)) * k) / 2 - Math.min(...ys) * k });
  town(art, 2, M.build);
  // the people: the garrison at the gate (2.3), the hill's special unit by the Castle (2.1), hands at the sites (6.1)
  for (const x of [596, 626, 656]) art.sprite(F.footman(0, 0), x, 70, .75);
  art.sprite(F.siege(0, 0), ...M.specialAt, .7);
  art.sprite(F.peasant(0, 0, true), 900, 700, .75);
  art.sprite(F.peasant(0, 0, true), 200, 380, .75);
  art.draw();
  el('rect', { width: BW, height: BH, class: 'view-frame', style: 'stroke-width:8' }, svg);
  if (o.band === false) return;
  // the band and the badges (X-003's box)
  el('rect', { width: BW, height: 120, class: 'i-band' }, svg);
  text(svg, 40, 82, o.title, 'i-band-t', null, 62);
  text(svg, BW - 40, 76, o.sub, 'i-band-t', 'end', 24).style.letterSpacing = '.08em';
  const [bx, by, gap] = o.badges;
  const badge = (cx, cy, big, small) => { el('circle', { cx, cy, r: 76, class: 'i-badge' }, svg); text(svg, cx, cy + 14, big, 'i-badge-t', null, 72); text(svg, cx, cy + 46, small, 'i-badge-s', null, 24); };
  badge(bx, by, String(M.plots.length), 'plots');
  badge(bx, by + gap, String(M.options.length), 'choices');
  el('rect', { x: bx - 110, y: BH - 124, width: 220, height: 92, rx: 16, class: 'i-badge' }, svg);
  text(svg, bx, BH - 86, 'one build', 'i-badge-s', null, 26); text(svg, bx, BH - 52, 'of many', 'i-badge-s', null, 26);
  el('rect', { width: BW, height: BH, class: 'view-frame', style: 'stroke-width:8' }, svg);
  };

  // the three roles' marks (2.6): a blade for the move spend, a shield for the hold, a coin for the pay
  const ROLE = {
    off: (g, x, y) => { el('path', { d: `M${x - 12} ${y + 12} L${x + 12} ${y - 12} M${x - 6} ${y + 2} L${x + 2} ${y + 10}`, class: 'sc-glyph', style: 'stroke-width:3.4' }, g); },
    def: (g, x, y) => { el('path', { d: `M${x - 12} ${y - 12} H${x + 12} V${y} C${x + 12} ${y + 8} ${x} ${y + 14} ${x} ${y + 14} C${x} ${y + 14} ${x - 12} ${y + 8} ${x - 12} ${y} Z`, class: 'sc-glyph', style: 'stroke-width:2.6' }, g); },
    res: (g, x, y) => { el('circle', { cx: x, cy: y, r: 12, class: 'sc-glyph', style: 'stroke-width:2.6' }, g); el('circle', { cx: x, cy: y, r: 5, class: 'sc-glyph', style: 'stroke-width:2' }, g); }
  };

  /* ════════════ the parts' icons: the same buildings, small ════════════ */
  const icon = (g, part, cx, cy, s, tier) => {
    const I = ISO(el('g', {}, g), { H: 0, k: s, ox: cx, oy: cy });
    const f = (w, d) => ({ x0: -w / 2, y0: -d / 2, x1: w / 2, y1: d / 2 });
    ({
      hall: () => KIND.hall(I, tier, f(180, 150)),
      barracks: () => KIND.barracks(I, f(160, 90)),
      farm: () => KIND.farmPlot(I, 0, 0),
      smithy: () => KIND.smithy(I, f(90, 70)),
      mill: () => KIND.mill(I, f(90, 70)),
      mine: () => KIND.mine(I, f(110, 100)),
      gate: () => { I.box(-44, -30, 44, 30, 0, 104, 'stone'); I.custom(1, (p, P) => el('polygon', { points: pts([P(-24, -30, 0), P(24, -30, 0), P(24, -30, 56), P(-24, -30, 56)]), class: 'i-door' }, p)); },
      scout: () => { I.ring(0, 0, 26, 'i-plot'); },
      plot: () => KIND.plot(I, 0, 0),
      special: () => KIND.special(I, 0, 0),
      garrison: () => KIND.garrison(I, 0, 0),
      ultimate: () => KIND.ultimate(I, 0, 0),
      ...Object.fromEntries(Object.entries(OPTION).map(([id, fn]) => [id, () => fn(I, 0, 0)]))
    })[part]();
    I.draw();
  };

  const arrow = (g, x1, y1, x2, y2, bend) => {
    const mx = (x1 + x2) / 2 + (bend || 0), my = (y1 + y2) / 2 - Math.abs(bend || 0) * .3;
    el('path', { d: `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`, class: 'arrow' }, g);
    const a = Math.atan2(y2 - my, x2 - mx);
    el('path', { d: `M${x2} ${y2} L${x2 - 20 * Math.cos(a - .4)} ${y2 - 20 * Math.sin(a - .4)} L${x2 - 20 * Math.cos(a + .4)} ${y2 - 20 * Math.sin(a + .4)} Z`, class: 'arrow-h' }, g);
  };
  const plans = {};

  // o: { lego: parts box, new parts bold, arrows (X-003's trial); caption(si): a line under the tier (R10) }
  const step = (svg, si, o = {}) => {
    const S = M.steps[si], tier = S.tier, PW = +svg.getAttribute('viewBox').split(' ')[2], PH = +svg.getAttribute('viewBox').split(' ')[3];
    const g = el('g', { class: 'hand-vellum' }, svg);
    el('rect', { width: PW, height: PH, class: 'view-frame' }, g);
    const defs = el('defs', {}, svg);
    const hatch = el('pattern', { id: `${svg.id}-h`, width: 10, height: 10, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    el('line', { x1: 0, y1: 1, x2: 10, y2: 1, class: 'ln-fine', style: 'stroke:var(--dv-line);stroke-width:2' }, hatch);

    // the number, the tier
    text(g, 26, 150, String(si + 1), 'st-num');

    // the parts box: icons with counts (X-003 only)
    const cells = {};
    if (o.lego) {
    const parts = S.parts, cw = Math.min(140, (PW - 190) / parts.length), bx = 150, by = 22, bh = 190;
    el('rect', { x: bx, y: by, width: cw * parts.length + 20, height: bh, rx: 16, class: 'pli' }, g);
    parts.forEach(([part, n, note], i) => {
      const cx = bx + 10 + cw * i + cw / 2;
      icon(g, part, cx, by + 112, part === 'hall' ? .34 : ['special', 'garrison', 'ultimate'].includes(part) ? .9 : .46, tier);
      if (n) text(g, cx - cw / 2 + 10, by + 176, `${n}×`, 'pli-q');
      if (note) text(g, cx + cw / 2 - 10, by + 176, note, 'pli-s', 'end');
      cells[part] = [cx, by + bh];
    });
    }

    const top = o.lego ? 250 : 216;
    text(g, o.lego ? 30 : 150, o.lego ? 250 : 92, M.tiers[tier].toUpperCase(), 'st-name', null, o.lego ? 30 : 40);
    if (o.caption) text(g, 150, 138, o.caption(si), 'pl-lbl', 'start', 28);

    // the plan: the town at this tier
    const area = { x: 30, y: top + 12, w: PW - 60, h: PH - top - 42 }, OUT = MG + 110;
    const kp = Math.min(area.w / (W + 2 * OUT), area.h / (H + 2 * OUT));
    const ox = area.x + (area.w - (W + 2 * OUT) * kp) / 2 + OUT * kp, oy = area.y + (area.h - (H + 2 * OUT) * kp) / 2 + OUT * kp;
    const X = (x) => ox + x * kp, Y = (y) => oy + y * kp;
    plans[svg.id] = { X, Y, kp };
    const cls = (isNew) => isNew && o.lego ? { class: 'pl-new', fill: `url(#${svg.id}-h)` } : { class: 'pl-old' };
    const rect = (x0, y0, x1, y1, isNew) => el('rect', { x: X(x0), y: Y(y0), width: (x1 - x0) * kp, height: (y1 - y0) * kp, ...cls(isNew) }, g);
    // the high ground (1.5, clarified): the mountains ring it west, north-west and south-west; the contours
    // come out of them and step down north, east and south, so the river is seen to run downhill
    const NWx = 240, SWx = 360;
    for (const o of [MG + 30, MG + 70, MG + 110]) {
      const r = o * .8;
      el('path', { d: `M${X(NWx)} ${Y(-o)} H${X(W + o - r)} Q${X(W + o)} ${Y(-o)} ${X(W + o)} ${Y(-o + r)} V${Y(H + o - r)} Q${X(W + o)} ${Y(H + o)} ${X(W + o - r)} ${Y(H + o)} H${X(SWx)}`, class: 'ln-fine', style: 'stroke-width:1.6' }, g);
    }
    const peak = (x, y) => el('path', { d: `M${X(x - 13)} ${Y(y + 10)} L${X(x)} ${Y(y - 12)} L${X(x + 13)} ${Y(y + 10)}`, class: 'ln-thin', style: 'stroke-width:1.6' }, g);
    for (let y = -OUT + 22, i = 0; y < H + OUT - 8; y += 32, i++) for (let x = -OUT + 16 + (i % 2) * 14; x < -MG - 10; x += 30) if (Math.abs(y - 112) > 44) peak(x, y);
    for (let y = -OUT + 22, i = 0; y < -MG - 10; y += 30, i++) for (let x = -MG + (i % 2) * 15; x < NWx; x += 32) peak(x, y);
    for (let y = H + MG + 22, i = 0; y < H + OUT - 4; y += 30, i++) for (let x = -MG + (i % 2) * 15; x < SWx; x += 32) peak(x, y);
    // the road, the river, the bridge
    el('polyline', { points: pts([[X(622), Y(-10)], [X(614), Y(400)]]), class: 'pl-river', style: `stroke-width:${40 * kp}` }, g);
    el('polyline', { points: pts([[X(622), Y(-10)], [X(614), Y(400)]]), class: 'pl-riverp', style: `stroke-width:${40 * kp - 5}` }, g);
    const rv = pts(M.river.map(([x, y]) => [X(x), Y(y)]));
    el('polyline', { points: rv, class: 'pl-river', style: `stroke-width:${50 * kp}` }, g);
    el('polyline', { points: rv, class: 'pl-riverp', style: `stroke-width:${50 * kp - 5}` }, g);
    el('polyline', { points: rv, class: 'ln-fine', style: 'stroke-dasharray:6 10;stroke-width:1.6' }, g);
    for (let i = 1; i < M.river.length - 2; i++) {                // downstream, every reach
      const [ax, ay] = M.river[i], [bx2, by2] = M.river[i + 1], mx = X((ax + bx2) / 2), my = Y((ay + by2) / 2), t = Math.atan2(by2 - ay, bx2 - ax);
      el('path', { d: `M${mx - 11 * Math.cos(t - .6)} ${my - 11 * Math.sin(t - .6)} L${mx} ${my} L${mx - 11 * Math.cos(t + .6)} ${my - 11 * Math.sin(t + .6)}`, class: 'ln-thin', style: 'stroke-width:2.4' }, g);
    }
    text(g, X(44), Y(M.river[0][1]) - 34, 'from the mountains', 'pl-lbl', 'start', 20);
    rect(586, 236, 650, 290, false);
    for (let i = 0; i < 6; i++) el('line', { x1: X(W + 8 + i * 8), y1: Y(M.falls.y - 24), x2: X(W + 8 + i * 8), y2: Y(M.falls.y + 24), class: 'ln-thin' }, g);
    text(g, X(W + 40), Y(M.falls.y + 64), 'falls', 'pl-lbl');
    // the walls, cut and filled (poché), with their gaps
    const T = 28;
    const wall = (x0, y0, x1, y1) => el('rect', { x: X(x0), y: Y(y0), width: (x1 - x0) * kp, height: (y1 - y0) * kp, class: 'pl-wall' }, g);
    const [gw0, gw1] = M.riverGaps.west, [ge0, ge1] = M.riverGaps.east;
    wall(0, 0, M.gate.x0, T); wall(M.gate.x1, 0, W, T); wall(W - T, 0, W, ge0); wall(W - T, ge1, W, H); wall(0, H - T, W, H); wall(0, 0, T, gw0); wall(0, gw1, T, H);
    rect(M.gate.x0 - 14, -16, M.gate.x1 + 14, 44, tier === 0);
    text(g, X((M.gate.x0 + M.gate.x1) / 2), Y(-44), 'gate', 'pl-lbl');
    M.scouts.forEach(([x, y]) => el('circle', { cx: X(x), cy: Y(y), r: 22 * kp, ...cls(tier === 0) }, g));
    // the spine and the sites
    M.spine.forEach((s) => {
      rect(s.x0, s.y0, s.x1, s.y1, tier === 0);
      if (s.field) { const [a, b2, c, d] = s.field; el('rect', { x: X(a), y: Y(b2), width: (c - a) * kp, height: (d - b2) * kp, class: 'pl-dim' }, g); }   // the pumpkin field
      text(g, X((s.x0 + s.x1) / 2), Y(s.y1) + 24, s.name, 'pl-lbl');
    });
    // the hall, new on every step: it is what each step upgrades
    const h = M.hall;
    rect(h.x0, h.y0, h.x1, h.y1, true);
    if (tier >= 1) [[h.x0 - 8, h.y0 - 8], [h.x1 - 36, h.y0 - 8], ...(tier === 2 ? [[h.x0 - 8, h.y1 - 36], [h.x1 - 36, h.y1 - 36]] : [])].forEach(([x, y]) => el('rect', { x: X(x), y: Y(y), width: 44 * kp, height: 44 * kp, class: o.lego ? 'pl-new' : 'pl-old', fill: 'var(--dv-paper)' }, g));
    const tl = text(g, X((h.x0 + h.x1) / 2), Y((h.y0 + h.y1) / 2) + 9, M.tiers[tier].toUpperCase(), 'pl-tier', null, 26);
    tl.setAttribute('paint-order', 'stroke'); tl.style.stroke = 'var(--dv-paper)'; tl.style.strokeWidth = '8px';
    if (tl.getComputedTextLength() > (h.x1 - h.x0) * kp - 8) { tl.setAttribute('y', Y(h.y1) + 28); tl.style.fontSize = '22px'; }
    // the plots: the newest ring bold, older rings standing, rings to come dashed
    const newest = S.rings[S.rings.length - 1];
    M.plots.forEach((pl) => {
      const r = M.plotR * kp, cx = X(pl.x), cy = Y(pl.y);
      const open = S.rings.includes(pl.ring), lit = o.lego ? pl.ring === newest : open;   // the rings light with the hall (6.2)
      if (!open) el('circle', { cx, cy, r, class: o.lego ? 'pl-dim' : 'pl-old' }, g);
      else if (lit) {
        el('circle', { cx, cy, r, ...cls(true) }, g);
        for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; el('line', { x1: cx + (r + 6) * Math.cos(a), y1: cy + (r + 6) * Math.sin(a), x2: cx + (r + 16) * Math.cos(a), y2: cy + (r + 16) * Math.sin(a), class: 'ln-thin', style: 'stroke-width:2.4' }, g); }
      } else el('circle', { cx, cy, r, class: 'pl-old' }, g);
      const n = text(g, cx, cy + 9, ROMAN[pl.ring - 1], 'pl-tier', null, 24);
      n.setAttribute('paint-order', 'stroke'); n.style.stroke = 'var(--dv-paper)'; n.style.strokeWidth = '7px';
    });
    // the hill's special unit, opened by the Castle (2.1 · 5.1), where the box art stands it
    if (tier === 2) {
      const ux = X(M.specialAt[0]), uy = Y(M.specialAt[1]), u = 22 * kp / .65;
      el('rect', { x: ux - u, y: uy - u * .7, width: u * 2, height: u * 1.1, rx: 4, ...cls(true) }, g);
      for (const dx of [-u * .6, 0, u * .6]) el('circle', { cx: ux + dx, cy: uy + u * .55, r: u * .26, class: 'pl-old', style: 'stroke-width:2.6' }, g);
      el('line', { x1: ux - u, y1: uy - u * .25, x2: ux - u * 1.6, y2: uy - u * .25, class: 'ln-heavy', style: 'stroke-width:5' }, g);
      text(g, ux + u + 10, uy + 8, 'siege', 'pl-lbl', 'start');
    }
    // north
    const nx = PW - 70, ny = PH - 80;
    el('circle', { cx: nx, cy: ny, r: 26, class: 'ln-thin', style: 'stroke-width:2' }, g);
    el('path', { d: `M${nx} ${ny - 34} L${nx + 9} ${ny + 6} L${nx} ${ny} L${nx - 9} ${ny + 6} Z`, class: 'arrow-h' }, g);
    text(g, nx, ny - 42, 'N', 'pl-tier', null, 22);
    // the arrows, to where the parts go: the hall, and the ring this step opens (X-003 only)
    if (!o.lego) return;
    const into = (tx, ty, side) => arrow(g, tx + side * 46, ty - 78, tx + side * 6, ty - 8, side * 14);
    into(X(h.x0 + 40), Y(h.y0) - 4, -1);
    M.plots.filter((p) => p.ring === newest).forEach((p) => into(X(p.x), Y(p.y) - M.plotR * kp - 18, p.x < W / 2 ? -1 : 1));
    if (cells.special) into(X(M.specialAt[0]), Y(M.specialAt[1]) - 22 * kp / .65 * .7 - 4, -1);
  };

  window.TOWN = { text, KIND, OPTION, town, box, icon, arrow, step, plans, ROMAN, treeParts, ROLE };
})();
