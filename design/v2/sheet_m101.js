/* sheet_m101.js — sheet M-101, the province (1.2 · 1.5). Two faces, both from MODELS.province (the hill
   town from MODELS.town, through town.js):
   THE ART    the province as a diorama at dusk: the ridge and its spurs round the hill, the river off the
              mountains, through the hill town, over the falls, past the bridge, into the valley's lake;
              the forest; the overrun north, its rituals, and the first wave coming down on each gate.
   THE DETAIL the plan, its relief hachured from the model's heights (after mewo2/terrain, MIT: jittered
              samples, a stroke wherever the ground is steep; here each stroke runs downhill, as Lehmann's
              hachures do); section A–A, jogged through all three towns, from the same heights; the graph,
              three towns and the wild (1.2); and the two roads from the hill to the forest, unrolled to
              scale and raced on one clock. Reduced motion, print and ?motion=still show the still. */
(function () {
  // every face loaded first: fonts.ready alone can resolve before a face is even asked for, and the
  // labels here are placed and clouded by their measured widths
  (document.fonts ? Promise.all([...document.fonts].map((f) => f.load().catch(() => null))).then(() => document.fonts.ready) : Promise.resolve()).then(draw);
  function draw() {
  const { el, pts, render } = window.WALL;
  const P = window.MODELS.province, MT = window.MODELS.town, F = window.FIG, ISO = window.ISO;
  const { text, town, treeParts, KIND } = window.TOWN;
  const C30 = Math.cos(Math.PI / 6);
  const lbl = (g, x, y, s, anchor, size) => text(g, x, y, s, 'pl-lbl', anchor, size || 24);
  const motion = document.documentElement.dataset.motion;
  const moving = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && motion !== 'still';
  const rng = (seed) => () => { seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };   // mulberry32
  const clamp = (v) => Math.max(0, Math.min(1, v)), smooth = (v) => { v = clamp(v); return v * v * (3 - 2 * v); };
  const [fx0, fy0, fx1, fy1] = P.frame;

  /* ════════════ the model's ground: one relief for the plan, the section and the art ════════════ */
  const hidden = el('g', { style: 'opacity:0' }, document.getElementById('art'));
  const probe = el('path', { d: 'M0 0' }, hidden), lakePath = el('path', { d: P.lake }, hidden);
  const sample = (d, step = 1.5) => { probe.setAttribute('d', d); const L = probe.getTotalLength(), n = Math.max(2, Math.ceil(L / step)); return Array.from({ length: n + 1 }, (_, i) => { const q = probe.getPointAtLength(L * i / n); return [q.x, q.y]; }); };
  const plen = (d) => { probe.setAttribute('d', d); return probe.getTotalLength(); };
  const inLake = (x, y) => lakePath.isPointInFill(new DOMPoint(x, y));
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const RL = P.relief, PL = RL.plateau;
  const upper = sample(P.river[0]), lower = sample(P.river[1]);
  const nearUpper = (x, y, r) => upper.some((p) => dist(p, [x, y]) < r);
  // the ridge's peaks: two files down the ridge, none where the river cuts its gorge
  const peaks = [];
  for (let y = 22, i = 0; y < fy1 - 4; y += 24, i++) for (const x of [24, 50]) { const px = x + (i % 2) * 8; if (!nearUpper(px, y, 22)) peaks.push([px, y, 44 + ((i * 37 + x) % 36)]); }
  // the plateau: full height inside, running out over each edge's own slope (a frustum)
  const edges = PL.poly.map((a, i) => { const b = PL.poly[(i + 1) % PL.poly.length], L = dist(a, b); return { a, b, nx: (b[1] - a[1]) / L, ny: -(b[0] - a[0]) / L, w: PL.slope[i] }; });
  const plateauZ = (x, y) => { let t = -Infinity; for (const e of edges) { const dd = (x - e.a[0]) * e.nx + (y - e.a[1]) * e.ny; t = Math.max(t, e.w ? dd / e.w : dd > 0 ? 9 : -9); } return PL.z * clamp(1 - t); };
  const spurs = [...P.spurs.nw, ...P.spurs.sw];
  // the peaks and the spurs, each a cone lifting the ground within its own radius
  const peakZ = (x, y) => { let h = 0; for (const [px, py, ph] of peaks) { const d = Math.hypot(x - px, y - py); if (d < 13) h = Math.max(h, RL.ridge.z + ph * (1 - d / 13)); } for (const [sx, sy] of spurs) { const d = Math.hypot(x - sx, y - sy); if (d < RL.spur.r) h = Math.max(h, RL.spur.z * (1 - d / RL.spur.r)); } return h; };
  const ground = (x, y) => {                                   // the ground without its peaks: the plan hachures this
    let h = RL.floor * Math.min(1, Math.hypot(x - RL.low[0], y - RL.low[1]) / RL.bowl);   // the bowl, falling to the lake
    h = Math.max(h, plateauZ(x, y), RL.ridge.z * smooth((RL.ridge.x - x) / RL.ridge.face + .5));
    return h;
  };
  const relief = (x, y) => Math.max(ground(x, y), peakZ(x, y));
  // the check the owner asked for on T-101: does the river run downhill, every step of both reaches?
  const downhill = [upper, lower].every((r) => r.every(([x, y], i) => !i || relief(x, y) <= relief(...r[i - 1]) + .6));
  const towns = Object.entries(P.towns);
  const inTown = (x, y, m = 0) => towns.some(([, t]) => x > t.x - m && x < t.x + t.w + m && y > t.y - m && y < t.y + t.h + m);
  const nearPath = (list, x, y, r) => list.some((p) => dist(p, [x, y]) < r);
  const roadPts = [...Object.values(P.roads), ...P.shortRoads].map((d) => sample(d, 3));

  // the trees, placed once for the art and the plan: the thick forest down the east, round the forest
  // town, the thin woods along the road to the valley, a few on the valley floor
  const trees = [];
  { const R = rng(1505), ok = (x, y) => !inTown(x, y, 5) && !roadPts.some((r) => nearPath(r, x, y, 5)) && !nearPath(lower, x, y, 6);
    for (let y = 16; y < fy1 - 4; y += 9) for (let x = 592; x < fx1 - 3; x += 9) { const px = x + (R() - .5) * 5, py = y + (R() - .5) * 5; if (ok(px, py)) trees.push([px, py, 'thick']); }
    const ft = P.towns.forest;
    for (let i = 0; i < 70; i++) { const a = R() * Math.PI * 2, r = 8 + R() * 18, px = ft.x + ft.w / 2 + Math.cos(a) * (ft.w / 2 + r), py = ft.y + ft.h / 2 + Math.sin(a) * (ft.h / 2 + r); if (py > 176 && ok(px, py)) trees.push([px, py, 'thick']); }
    const vf = sample(P.roads.valleyForest, 12);
    vf.forEach(([x, y], i) => { for (const sd of [-1, 1]) { const px = x + sd * (8 + R() * 6), py = y + (R() - .5) * 8; if (i % 2 === (sd > 0 ? 0 : 1) && ok(px, py)) trees.push([px, py, 'thin']); } });
    for (const [x, y] of [[208, 380], [232, 410], [400, 410], [420, 392], [196, 340], [380, 300], [404, 214], [250, 232]]) if (ok(x, y)) trees.push([x, y, 'thin']);
  }

  /* ════════════ THE ART: the province at dusk ════════════ */
  const A = document.getElementById('art'), AW = 1900, AH = 1130;
  const ad = el('defs', {}, A);
  const sky = el('linearGradient', { id: 'm-dusk', x1: 0, y1: 0, x2: 0, y2: 1 }, ad);
  [['0', 'var(--f-sky-2)'], ['.42', 'var(--dusk-3)'], ['.76', 'var(--dusk-2)'], ['1', 'var(--dusk-1)']].forEach(([o, c]) => el('stop', { offset: o, style: `stop-color:${c}` }, sky));
  A.insertBefore(el('rect', { width: AW, height: AH, fill: 'url(#m-dusk)' }), hidden);
  { const R = rng(9); for (let i = 0; i < 46; i++) el('circle', { cx: R() * AW, cy: R() * AH * .36, r: 1.6 + R() * 2.2, class: 'f-star m-star', style: `--d:${(R() * 3).toFixed(2)}s` }, A); }
  const SL = 26, TOP = RL.ridge.z + 100, HH = P.H, KZ = .5, KZT = 2;   // the art's heights: the mountains halved, the towns doubled (not to scale)
  const probeI = ISO(null, { H: HH, k: 1, ox: 0, oy: 0, kz: KZ });
  const cs = [[fx0, fy0, -SL], [fx1, fy0, -SL], [fx1, fy1, -SL], [fx0, fy1, TOP], [fx0, fy0, TOP], [fx0, fy1, -SL]];
  const xs = cs.map((c) => probeI.P(...c)[0]), ys = cs.map((c) => probeI.P(...c)[1]);
  const fit = { x: 30, y: 84, w: AW - 60, h: AH - 104 };
  const k = Math.min(fit.w / (Math.max(...xs) - Math.min(...xs)), fit.h / (Math.max(...ys) - Math.min(...ys)));
  const view = { H: HH, k, kz: KZ, ox: fit.x + (fit.w - (Math.max(...xs) - Math.min(...xs)) * k) / 2 - Math.min(...xs) * k, oy: fit.y + (fit.h - (Math.max(...ys) - Math.min(...ys)) * k) / 2 - Math.min(...ys) * k };
  const I = ISO(el('g', {}, A), view), J = ISO(el('g', {}, A), view);
  // an inset: a town drawn in its own units (town.js's), stood on the province at x0, y0, z0
  const inset = (p, x0, y0, z0, a) => ISO(el('g', {}, p), { H: 0, k: k * a, kz: KZT, ox: view.ox + (HH - y0 - x0) * C30 * k, oy: view.oy + ((HH - y0 + x0) * .5 - z0 * KZ) * k });
  const ribbon = (c, w0, w1) => {                               // a river's banks from its centre line, widening downstream
    const L = [], R = [];
    c.forEach((p, i) => { const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1, w = (w0 + (w1 - w0) * i / Math.max(1, c.length - 1)) / 2; L.push([p[0] - dy / n * w, p[1] + dx / n * w]); R.push([p[0] + dy / n * w, p[1] - dx / n * w]); });
    return [...L, ...R.reverse()];
  };
  const flow = (list, z, d) => I.custom(d, (p, Pp) => el('polyline', { points: pts(list.map(([x, y]) => Pp(x, y, z(x, y) + .3))), class: 'i-flow m-flow' }, p));

  // the ground: the province as a slab; the forest's floor, the overrun north
  I.box(fx0, fy0, fx1, fy1, -SL, SL, 'grass', -1e6);
  I.custom(-1e6 + 1, (p, Pp) => { for (const z of [-9, -18]) el('polyline', { points: pts([Pp(fx0, fy0, z), Pp(fx1, fy0, z), Pp(fx1, fy1, z)]), class: 'i-strata' }, p); });
  I.flat([[P.forest[0], P.forest[1]], [P.forest[2], P.forest[1]], [P.forest[2], P.forest[3]], [P.forest[0], P.forest[3]]], 'i-forest', -9e5);
  I.flat(sample(P.wild, 4), 'i-blight', -9e5 + 1);
  // the ridge, its spring and stream, its peaks, the cascade down its face onto the hill
  const RZ = RL.ridge.z, stream = upper.filter(([x]) => x <= RL.ridge.x), ys0 = stream[stream.length - 1][1];
  I.box(fx0, fy0, RL.ridge.x, fy1, 0, RZ, 'rock', -8e5);
  I.flat(ribbon(stream, 2, 3.4), 'i-water', -8e5 + 1, RZ);
  flow(stream, () => RZ, -8e5 + 2);
  peaks.filter((q, i) => i % 2 === 0).forEach(([px, py, ph]) => { const d = -7.9e5 + I.depth(px, py) * .01, b = 21, h = ph + 34; I.roof(px - b, py - b, px + b, py + b, RZ, h, 'rock', d); I.roof(px - b * .36, py - b * .36, px + b * .36, py + b * .36, RZ + h * .64, h * .36, 'snow', d + .2); });
  I.custom(-7.7e5, (p, Pp) => {
    const x = RL.ridge.x, y0 = ys0 - 1.8, y1 = ys0 + 1.8;
    el('polygon', { points: pts([Pp(x, y0, RZ), Pp(x, y1, RZ), Pp(x, y1, PL.z), Pp(x, y0, PL.z)]), class: 'i-falls' }, p);
    el('line', { x1: Pp(x, ys0, RZ)[0], y1: Pp(x, ys0, RZ)[1], x2: Pp(x, ys0, PL.z)[0], y2: Pp(x, ys0, PL.z)[1], class: 'i-fallsline m-fall', style: 'stroke-width:2.4' }, p);
  });
  // the hill's high ground: a frustum, a slope to the north, a cliff where the falls drop, a ramp south of them
  const n = PL.poly.length;
  const foot = PL.poly.map((v, i) => {
    const e1 = edges[(i - 1 + n) % n], e2 = edges[i];
    const c1 = e1.a[0] * e1.nx + e1.a[1] * e1.ny + e1.w, c2 = e2.a[0] * e2.nx + e2.a[1] * e2.ny + e2.w, det = e1.nx * e2.ny - e1.ny * e2.nx;
    return [(c1 * e2.ny - c2 * e1.ny) / det, (e1.nx * c2 - e2.nx * c1) / det];
  });
  I.custom(-6e5, (p, Pp) => {
    edges.forEach((e, i) => {
      if (e.nx - e.ny <= 0) return;                               // faces away from the camera
      const j = (i + 1) % n;
      el('polygon', { points: pts([Pp(...PL.poly[i], PL.z), Pp(...PL.poly[j], PL.z), Pp(...foot[j], 0), Pp(...foot[i], 0)]), class: e.ny < -.5 ? 'i-grass-n' : 'i-grass-e' }, p);
    });
    el('polygon', { points: pts(PL.poly.map(([x, y]) => Pp(x, y, PL.z))), class: 'i-grass-t' }, p);
  });
  // the river on the plateau either side of the town, the falls down the east cliff, and the reach below
  const fallY = 224.3, fw = 1.9, cliff = edges[1], cx0 = cliff.a[0], cx1 = cx0 + cliff.w;
  I.flat([[70, ys0 - 1.7], [78, 210.6], [78, 214.2], [70, ys0 + 1.7]], 'i-water', -5.9e5, PL.z);
  I.flat([[162, fallY - fw], [cx0, fallY - fw], [cx0, fallY + fw], [162, fallY + fw]], 'i-water', -5.9e5 + 1, PL.z);
  I.custom(-5.9e5 + 2, (p, Pp) => {
    el('polygon', { points: pts([Pp(cx0, fallY - fw, PL.z), Pp(cx0, fallY + fw, PL.z), Pp(cx1, fallY + fw, 0), Pp(cx1, fallY - fw, 0)]), class: 'i-falls' }, p);
    for (const dy of [-1, 0, 1]) el('line', { x1: Pp(cx0, fallY + dy, PL.z)[0], y1: Pp(cx0, fallY + dy, PL.z)[1], x2: Pp(cx1, fallY + dy, 0)[0], y2: Pp(cx1, fallY + dy, 0)[1], class: 'i-fallsline m-fall', style: `stroke-width:2.4;animation-delay:${(dy + 1) * .15}s` }, p);
  });
  const below = [[cx1 + 1, fallY], [cx1 + 3, 236], ...lower.filter(([x, y]) => plateauZ(x, y) === 0 && y > 240)];
  I.flat(Array.from({ length: 16 }, (_, i) => [cx1 + 2.5 + 4 * Math.cos(i * Math.PI / 8), fallY + 1 + 3.4 * Math.sin(i * Math.PI / 8)]), 'i-water', -5.8e5);
  I.flat(ribbon(below, 3.6, 6.4), 'i-water', -5.8e5 + 1);
  flow(below, () => 0, -5.8e5 + 2);
  // the roads, on whatever ground they cross
  const road = (list, w) => I.custom(-5.7e5, (p, Pp) => { const q = pts(list.map(([x, y]) => Pp(x, y, plateauZ(x, y) + .2))); el('polyline', { points: q, class: 'i-road-edge', style: `stroke-width:${w + 3}` }, p); el('polyline', { points: q, class: 'i-road', style: `stroke-width:${w}` }, p); });
  Object.values(P.roads).forEach((d) => road(sample(d, 2), 6));
  P.shortRoads.forEach((d) => road(sample(d, 2), 4.4));
  I.draw();

  // the upright world, far to near: spurs, towns, trees, the bridge, the rituals, the wave, the garrisons
  spurs.forEach(([sx, sy], i) => { const h = RL.spur.z + 30 + (i * 13) % 24, b = 14; J.roof(sx - b, sy - b, sx + b, sy + b, 0, h, 'rock'); J.roof(sx - b * .36, sy - b * .36, sx + b * .36, sy + b * .36, h * .64, h * .36, 'snow', J.depth(sx, sy) + .2); });
  const a = .075, hx0 = P.towns.hill.x + (P.towns.hill.w - MT.W * a) / 2, hy0 = P.towns.hill.y;
  J.custom(J.depth(P.towns.hill.x + P.towns.hill.w / 2, P.towns.hill.y + P.towns.hill.h / 2), (p) => {
    const It = inset(p, hx0, hy0, PL.z, a);
    town(It, 2, MT.build, { inset: true });
    It.sprite(F.siege(0, 0), ...MT.specialAt, .7);
    It.draw();
  });
  // the valley and the forest towns: walls, the one gate (2.4), the hall at the Castle tier. Their
  // layouts are T-102's and T-103's, not drawn yet; the valley's lake is inside its walls (1.5)
  const burg = (p, t, hall, lake) => {
    const Wt = t.w / a, Ht = t.h / a, T = 28, Hh = 64, gx = (t.gate[0] - t.x) / a, It = inset(p, t.x, t.y, 0, a);
    if (lake) It.flat(sample(P.lake, 3).map(([x, y]) => [(x - t.x) / a, (y - t.y) / a]), 'i-water', -9e4, 1);
    for (const [a0, a1] of [[0, gx - 64], [gx + 64, Wt]]) It.box(a0, 0, a1, T, 0, Hh, 'stone', It.depth((a0 + a1) / 2, T / 2));
    It.box(Wt - T, 0, Wt, Ht, 0, Hh, 'stone', It.depth(Wt - T / 2, Ht / 2));
    It.box(0, Ht - T, Wt, Ht, 0, Hh, 'stone', It.depth(Wt / 2, Ht - T / 2));
    It.box(0, 0, T, Ht, 0, Hh, 'stone', It.depth(T / 2, Ht / 2));
    for (const [x, y] of [[-12, -12], [Wt - 40, -12], [-12, Ht - 40], [Wt - 40, Ht - 40]]) { const d = It.depth(x + 26, y + 26) + 2; It.box(x, y, x + 52, y + 52, 0, 92, 'stone', d); It.roof(x - 4, y - 4, x + 56, y + 56, 92, 44, 'roof', d); }
    const dg = It.depth(gx, 14) + 6;
    It.box(gx - 74, -16, gx + 74, 44, 0, 104, 'stone', dg);
    It.custom(dg + .2, (q, Pq) => el('polygon', { points: pts([Pq(gx - 34, -16, 0), Pq(gx + 34, -16, 0), Pq(gx + 34, -16, 56), Pq(gx - 34, -16, 56)]), class: 'i-door' }, q));
    KIND.hall(It, 2, { x0: hall[0] - 90, y0: hall[1] - 75, x1: hall[0] + 90, y1: hall[1] + 75 });
    It.draw();
  };
  const halls = { valley: [1250, 450], forest: [690, 420] };
  for (const id of ['valley', 'forest']) { const t = P.towns[id]; J.custom(J.depth(t.x + t.w / 2, t.y + t.h / 2), (p) => burg(p, t, halls[id], id === 'valley')); }
  trees.forEach(([x, y, kind], i) => { const h = kind === 'thick' ? 150 + (i * 29) % 50 : 120 + (i * 17) % 40; J.sprite(treeParts(h, h * .72), x, y, .085); });
  const [bx, by, br] = P.bridge;
  J.custom(J.depth(bx, by) + .5, (p, Pp) => {
    const r = br * Math.PI / 180, cr = Math.cos(r), sr = Math.sin(r), at = (u, v, z) => Pp(bx + u * cr - v * sr, by + u * sr + v * cr, z);
    el('polygon', { points: pts([at(-9, -3.4, 1.6), at(9, -3.4, 1.6), at(9, 3.4, 1.6), at(-9, 3.4, 1.6)]), class: 'i-wood-t' }, p);
    for (const v of [-3.4, 3.4]) el('polyline', { points: pts([at(-9, v, 1.6), at(-9, v, 4), at(9, v, 4), at(9, v, 1.6)]), class: 'i-road-edge', style: 'stroke-width:2' }, p);
  });
  P.rituals.forEach(([x, y]) => J.sprite(F.ritual(0, 0, 70), x, y, .17));
  // the first wave: down each short road out of the wild, onto each gate; the garrison waits there
  const gates = { hill: [hx0 + (MT.gate.x0 + MT.gate.x1) / 2 * a, hy0, PL.z], valley: [...P.towns.valley.gate, 0], forest: [...P.towns.forest.gate, 0] };
  P.shortRoads.forEach((d, ri) => {
    const r = sample(d, 1);
    for (let i = 0; i < 6; i++) { const [x, y] = r[Math.round(r.length * (.3 + i * .1))]; J.sprite(i % 2 ? F.skeleton(0, 0, i * .13) : F.ghoul(0, 0, i * .13), x, y, .3, plateauZ(x, y)); }
  });
  Object.values(gates).forEach(([gx, gy, gz]) => { for (const dx of [-5, 5]) J.sprite(F.footman(0, 0), gx + dx, gy - 4, .3, gz); });
  J.draw();
  A.appendChild(el('rect', { width: AW, height: AH, class: 'i-dusk' }));
  render(F.moon(0, 0), el('g', { transform: `translate(${AW * .88} ${AH * .14}) scale(1.1)` }, A));
  el('rect', { width: AW, height: AH, class: 'view-frame', style: 'stroke-width:8' }, A);

  /* ════════════ THE PLAN: the province in the sealed hand, its relief hachured ════════════ */
  const PN = document.getElementById('plan'), PW = 1240, PH = 890;
  const N = el('g', { class: 'hand-vellum' }, PN), nd = el('defs', {}, PN);
  const hatch = (id, rot, gap, w) => { const p = el('pattern', { id, width: gap, height: gap, patternUnits: 'userSpaceOnUse', patternTransform: `rotate(${rot})` }, nd); el('line', { x1: 0, y1: 1, x2: gap, y2: 1, style: `stroke:var(--dv-line);stroke-width:${w}` }, p); };
  hatch('m-wild', 35, 8, .9); hatch('m-cut', 45, 9, 1.3); hatch('m-wild-g', 35, 14, 1.6);
  el('rect', { width: PW, height: PH, class: 'view-frame' }, N);
  text(N, 30, 46, 'the plan', 'sc-kick');
  const s = Math.min((PW - 80) / (fx1 - fx0), (PH - 120) / (fy1 - fy0)), ox = (PW - (fx1 - fx0) * s) / 2, oy = 76;
  const at = (x, y) => [ox + (x - fx0) * s, oy + (y - fy0) * s];
  const g = el('g', { transform: `translate(${ox - fx0 * s} ${oy - fy0 * s}) scale(${s})` }, N);
  el('rect', { x: fx0, y: fy0, width: fx1 - fx0, height: fy1 - fy0, class: 'pl-old', style: 'stroke-width:1.2' }, g);
  el('path', { d: P.wild, class: 'ln-thin', style: 'stroke-width:.8;fill:url(#m-wild)' }, g);
  // the hachures: jittered samples (mewo2/terrain), a stroke downhill wherever the ground is steep,
  // heavier where it is steeper (Lehmann)
  { const R = rng(1015), buckets = [[], [], [], []];
    for (let y = fy0 + 1.5; y < fy1; y += 3.3) for (let x = fx0 + 1.5; x < fx1; x += 3.3) {
      const px = x + (R() - .5) * 2.6, py = y + (R() - .5) * 2.6;
      if (inTown(px, py, 1.5) || inLake(px, py)) continue;
      const e = .7, gx = (ground(px + e, py) - ground(px - e, py)) / (2 * e), gy = (ground(px, py + e) - ground(px, py - e)) / (2 * e), m = Math.hypot(gx, gy);
      if (m < .8 + R() * .5) continue;
      const L = Math.min(3, .9 + m * .3);
      buckets[Math.min(3, Math.floor(m / 2.4))].push(`M${px.toFixed(1)} ${py.toFixed(1)}l${(-gx / m * L).toFixed(2)} ${(-gy / m * L).toFixed(2)}`);
    }
    buckets.forEach((list, i) => { if (list.length) el('path', { d: list.join(''), class: 'pl-hach', style: `stroke-width:${(.32 + i * .2).toFixed(2)}` }, g); });
  }
  // the peaks and spurs as relief icons (after Azgaar's Fantasy Map Generator, MIT): drawn far to near,
  // each hiding the foot of the one behind, its east flank shaded
  [...peaks.map(([x, y, h]) => [x, y, 10.5, 9 + h / 9]), ...spurs.map(([x, y]) => [x, y, 9.5, 12])].sort((p, q) => p[1] - q[1]).forEach(([x, y, b, h]) => {
    const yb = y + b * .45;
    el('path', { d: `M${x - b} ${yb} L${x - b * .2} ${yb - h * .8} L${x} ${yb - h} L${x + b} ${yb}`, class: 'ln-thin', style: 'stroke-width:.8;fill:var(--dv-paper)' }, g);
    for (let i = 1; i < 4; i++) { const f = i / 4; el('line', { x1: x + b * f * .9, y1: yb - h * (1 - f) + .6, x2: x + b * f * .5, y2: yb, class: 'ln-thin', style: 'stroke-width:.45' }, g); }
  });
  trees.forEach(([x, y, kind]) => { const r = kind === 'thick' ? 2.3 : 1.9; el('path', { d: `M${x - r} ${y + r} L${x} ${y - r * 1.4} L${x + r} ${y + r} Z`, class: 'ln-thin', style: 'stroke-width:.5;fill:var(--dv-paper)' }, g); });
  for (const d of Object.values(P.roads)) el('path', { d, class: 'ln-thin', style: 'stroke-width:1.3;stroke-dasharray:5 2.6' }, g);
  for (const d of P.shortRoads) el('path', { d, class: 'ln-thin', style: 'stroke-width:1;stroke-dasharray:1.6 2.4' }, g);
  // the river, widening downstream: the spring a thread, the reach into the lake the widest
  const taper = (list, w0, w1) => {
    const chunks = []; for (let i = 0; i < list.length - 1; i += 6) chunks.push([list.slice(i, Math.min(list.length, i + 7)), w0 + (w1 - w0) * i / (list.length - 1)]);
    chunks.forEach(([c, w]) => el('polyline', { points: pts(c), class: 'pl-river', style: `stroke-width:${(w + 1.3).toFixed(2)}` }, g));
    chunks.forEach(([c, w]) => el('polyline', { points: pts(c), class: 'pl-riverp', style: `stroke-width:${(w * .5).toFixed(2)}` }, g));
  };
  taper(upper, .9, 2.6); taper(lower, 3, 4.6);
  el('circle', { cx: upper[0][0], cy: upper[0][1], r: 2.2, class: 'pl-old', style: 'stroke-width:.8' }, g);
  for (let i = 0; i < 4; i++) el('line', { x1: 168 + i * 1.6, y1: fallY - 2.6, x2: 168 + i * 1.6, y2: fallY + 2.6, class: 'ln-thin', style: 'stroke-width:.5' }, g);
  el('rect', { x: -7, y: -3.6, width: 14, height: 7.2, class: 'pl-old', style: 'stroke-width:1', transform: `translate(${bx} ${by}) rotate(${br})` }, g);
  // the towns: walls cut and filled, the gate a gap in the north wall, the hall; the hill's six plots
  const hallsP = { hill: [hx0 + (MT.hall.x0 + MT.hall.x1) / 2 * a, hy0 + (MT.hall.y0 + MT.hall.y1) / 2 * a], valley: [P.towns.valley.x + halls.valley[0] * a, P.towns.valley.y + halls.valley[1] * a], forest: [P.towns.forest.x + halls.forest[0] * a, P.towns.forest.y + halls.forest[1] * a] };
  towns.forEach(([id, t]) => {
    el('rect', { x: t.x, y: t.y, width: t.w, height: t.h, class: 'pl-wall' }, g);
    el('rect', { x: t.x + 2.2, y: t.y + 2.2, width: t.w - 4.4, height: t.h - 4.4, style: 'fill:var(--dv-paper)' }, g);
    if (id === 'valley') el('path', { d: P.lake, class: 'pl-old', style: 'stroke-width:.9' }, g);
    el('rect', { x: t.gate[0] - 5, y: t.y - .5, width: 10, height: 3.2, style: 'fill:var(--dv-paper)' }, g);
    for (const dx of [-5.5, 5.5]) el('rect', { x: t.gate[0] + dx - 1.4, y: t.y - 2, width: 2.8, height: 6, class: 'pl-wall' }, g);
    const [hx, hy] = hallsP[id]; el('rect', { x: hx - 6.75, y: hy - 5.6, width: 13.5, height: 11.2, class: 'pl-old', style: 'stroke-width:1.1;fill:url(#m-cut)' }, g);
  });
  MT.plots.forEach((pl) => el('circle', { cx: hx0 + pl.x * a, cy: hy0 + pl.y * a, r: MT.plotR * a, class: 'pl-old', style: 'stroke-width:.7' }, g));
  for (const [x, y] of [[290, 380], [304, 390], [296, 371]]) el('path', { d: `M${x - 5} ${y} q2.5 -1.6 5 0 t5 0`, class: 'ln-thin', style: 'stroke-width:.6' }, g);
  P.rituals.forEach(([x, y]) => { el('path', { d: `M${x} ${y - 7} l4.5 12 h-9 Z`, class: 'arrow-h' }, g); el('circle', { cx: x, cy: y + 1, r: 11, class: 'ln-thin', style: 'stroke-width:.6;stroke-dasharray:2 2' }, g); });
  // the waves: down each short road, onto each gate
  P.shortRoads.forEach((d) => {
    const r = sample(d, 1).reverse(), end = r.length - 7, q = r.slice(0, end + 1).map(([x, y]) => at(x, y));
    el('polyline', { points: pts(q), class: 'ln-heavy', style: 'stroke-width:4.2;fill:none' }, N);
    const [ex, ey] = q[q.length - 1], [px, py] = q[q.length - 4], t = Math.atan2(ey - py, ex - px);
    el('path', { d: `M${ex + 16 * Math.cos(t)} ${ey + 16 * Math.sin(t)} L${ex + 16 * Math.cos(t + 2.5)} ${ey + 16 * Math.sin(t + 2.5)} L${ex + 16 * Math.cos(t - 2.5)} ${ey + 16 * Math.sin(t - 2.5)} Z`, class: 'arrow-h' }, N);
  });
  // section A–A: a chain line, bubbles at its ends, looking north
  const cut = P.section.map(([x, y]) => at(x, y));
  el('polyline', { points: pts(cut), class: 'ln-heavy', style: 'stroke-width:3;fill:none;stroke-dasharray:22 6 4 6' }, N);
  [cut[0], cut[cut.length - 1]].forEach(([x, y], i) => {
    const cx = x + (i ? 30 : -30);
    el('path', { d: `M${cx - 14} ${y - 14} L${cx} ${y - 40} L${cx + 14} ${y - 14} Z`, class: 'arrow-h' }, N);
    el('circle', { cx, cy: y, r: 20, class: 'vt-ring', style: 'stroke-width:2.6' }, N);
    text(N, cx, y + 9, 'A', 'vt-id', null, 24);
  });
  // labels: the features set by hand; then the towns by mewo2's rule (four places tried, the least
  // crowded kept), which now avoids the hand-set ones too
  const L = (x, y, str, anchor, size) => lbl(N, ...at(x, y), str, anchor, size);
  const fixed = [L(330, 46, 'the overrun north · the wild'), L(406, 118, 'the rituals', 'start', 21), L(186, 238, 'the falls', 'start', 21), L(252, 318, 'bridge', 'start', 21),
    L(470, 330, 'the thin woods', 'start', 21), L(64, 150, 'the spring', 'end', 21), L(500, 186, 'waves, each night', 'start', 21)];
  { const [rx, ry] = at(40, 360); const t = lbl(N, rx, ry, 'the ridge', 'middle', 22); t.setAttribute('transform', `rotate(-90 ${rx} ${ry})`); }
  { const [rx, ry] = at(609, 360); const t = lbl(N, rx, ry, 'the forest', 'middle', 22); t.setAttribute('transform', `rotate(-90 ${rx} ${ry})`); }
  const placed = fixed.map((t) => { const b = t.getBBox(); return [b.x, b.y, b.x + b.width, b.y + b.height]; });
  for (const [x, y] of [at(...P.section[0]), at(...P.section[P.section.length - 1])]) placed.push([x - 56, y - 44, x + 56, y + 24]);   // the section's bubbles
  const cutPts = P.section.slice(1).flatMap((q, i) => { const p0 = P.section[i]; return Array.from({ length: 40 }, (_, j) => [p0[0] + (q[0] - p0[0]) * j / 40, p0[1] + (q[1] - p0[1]) * j / 40]); });
  const avoid = [...roadPts.flat(), ...upper, ...lower, ...peaks, ...spurs, ...cutPts].map(([x, y]) => at(x, y));
  towns.forEach(([id, t]) => {
    const s0 = text(N, 0, 0, `THE ${id.toUpperCase()}`, 'pl-tier', 'start', 26), tw = s0.getComputedTextLength(), th = 24;
    const [x0, y0] = at(t.x, t.y), [x1, y1] = at(t.x + t.w, t.y + t.h), cx = (x0 + x1) / 2;
    const cand = [[x1 + 14, (y0 + y1) / 2 + 9], [x0 - 14 - tw, (y0 + y1) / 2 + 9], [cx - tw / 2, y0 - 22], [cx - tw / 2, y1 + 34], [x1 + 12, y0 + 24], [x1 + 12, y1 - 4], [x0 - 12 - tw, y0 + 24], [x0 - 12 - tw, y1 - 4]];
    const score = ([x, y]) => {
      let pen = 0; const b = [x - 4, y - th, x + tw + 4, y + 6];
      if (b[0] < 10 || b[2] > PW - 10 || b[1] < 60 || b[3] > PH - 10) pen += 100;
      for (const o of placed) if (b[0] < o[2] && b[2] > o[0] && b[1] < o[3] && b[3] > o[1]) pen += 100;
      for (const [, u] of towns) { const [ux0, uy0] = at(u.x, u.y), [ux1, uy1] = at(u.x + u.w, u.y + u.h); if (b[0] < ux1 && b[2] > ux0 && b[1] < uy1 && b[3] > uy0) pen += 100; }
      for (const [px, py] of avoid) if (px > b[0] && px < b[2] && py > b[1] && py < b[3]) pen++;
      return pen;
    };
    const best = cand.reduce((m, c) => (score(c) < score(m) ? c : m));
    s0.setAttribute('x', best[0]); s0.setAttribute('y', best[1]); s0.setAttribute('paint-order', 'stroke'); s0.style.stroke = 'var(--dv-paper)'; s0.style.strokeWidth = '7px';
    placed.push([best[0] - 4, best[1] - th, best[0] + tw + 4, best[1] + 6]);
  });
  { const [nx, ny] = [PW - 50, PH - 52];
    el('circle', { cx: nx, cy: ny, r: 20, class: 'ln-thin', style: 'stroke-width:2' }, N);
    el('path', { d: `M${nx} ${ny - 27} L${nx + 7} ${ny + 5} L${nx} ${ny} L${nx - 7} ${ny + 5} Z`, class: 'arrow-h' }, N); }

  /* ════════════ SECTION A–A: jogged through the three towns, from the same heights ════════════ */
  const SE = document.getElementById('section'), SW = 1640, SH = 430;
  const S = el('g', { class: 'hand-vellum' }, SE), sd = el('defs', {}, SE);
  { const p = el('pattern', { id: 'm-poche', width: 10, height: 10, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, sd); el('line', { x1: 0, y1: 1, x2: 10, y2: 1, style: 'stroke:var(--dv-line);stroke-width:1.2' }, p); }
  el('rect', { width: SW, height: SH, class: 'view-frame' }, S);
  text(S, 30, 46, 'section a–a, jogged', 'sc-kick');
  const prof = [], joints = [0];
  { let acc = 0; for (let i = 0; i < P.section.length - 1; i++) { const [ax, ay] = P.section[i], [bx2, by2] = P.section[i + 1], Lg = Math.hypot(bx2 - ax, by2 - ay), m = Math.ceil(Lg); for (let j = i ? 1 : 0; j <= m; j++) { const f = j / m, x = ax + (bx2 - ax) * f, y = ay + (by2 - ay) * f; prof.push([acc + Lg * f, x, y, inLake(x, y) ? -5 : relief(x, y)]); } acc += Lg; joints.push(acc); } }
  const total = joints[joints.length - 1], sx = (SW - 160) / total, sy = 1.5, X = (u) => 80 + u * sx, Y = (h) => SH - 74 - h * sy, BOT = SH - 34;
  el('polygon', { points: pts([...prof.map(([u, , , h]) => [X(u), Y(h)]), [X(total), BOT], [X(0), BOT]]), class: 'pl-old', style: 'stroke-width:2.4;fill:url(#m-poche)' }, S);
  el('polyline', { points: pts(prof.map(([u, , , h]) => [X(u), Y(h)])), class: 'ln-heavy', style: 'stroke-width:3.4;fill:none' }, S);
  joints.slice(1, -1).forEach((u) => el('line', { x1: X(u), y1: Y(prof.find((q) => q[0] >= u)[3]) + 4, x2: X(u), y2: BOT, class: 'ln-thin', style: 'stroke-width:1.6;stroke-dasharray:8 5' }, S));
  // the towns where the cut crosses them: their walls, cut, and their halls beyond
  towns.forEach(([id, t]) => {
    const inT = prof.filter(([, x, y]) => x >= t.x && x <= t.x + t.w && y >= t.y && y <= t.y + t.h);
    if (!inT.length) return;
    for (const q of [inT[0], inT[inT.length - 1]]) el('rect', { x: X(q[0]) - 5, y: Y(q[3]) - 26, width: 10, height: 26, class: 'pl-wall' }, S);
    const mid = inT[Math.floor(inT.length * (id === 'valley' ? .85 : .5))], hx = X(mid[0]), hy = Y(Math.max(...inT.map((q) => q[3])));
    el('path', { d: `M${hx - 15} ${hy} V${hy - 22} H${hx + 15} V${hy} M${hx - 20} ${hy - 20} L${hx} ${hy - 40} L${hx + 20} ${hy - 20}`, class: 'pl-old', style: 'stroke-width:2.2;fill:none' }, S);
    lbl(S, X((inT[0][0] + inT[inT.length - 1][0]) / 2), hy - 58, `the ${id}`, 'middle', 24);
  });
  // water: the falls down the hill's east cliff, the river where the cut crosses it, the lake
  const wsym = (x, y) => { el('path', { d: `M${x - 9} ${y - 12} H${x + 9} L${x} ${y} Z`, class: 'ln-thin', style: 'stroke-width:2' }, S); for (const [w, dy] of [[14, 5], [8, 10]]) el('line', { x1: x - w / 2, y1: y + dy, x2: x + w / 2, y2: y + dy, class: 'ln-thin', style: 'stroke-width:1.6' }, S); };
  { const top = prof.find(([, x, y]) => y === P.section[0][1] && x >= cx0), botq = prof.find(([, x, y]) => y === P.section[0][1] && x >= cx1);
    for (let i = 0; i < 4; i++) el('line', { x1: X(top[0]) + 4 + i * 4, y1: Y(PL.z) + 2, x2: X(botq[0]) + 4 + i * 4, y2: Y(botq[3]) - 2, class: 'ln-thin', style: 'stroke-width:1.4' }, S);
    lbl(S, X(botq[0]) + 26, Y(PL.z) + 30, 'the falls', 'start', 22); }
  { const q = prof.find(([, x, y]) => nearPath(lower, x, y, 1.4)); if (q) wsym(X(q[0]), Y(q[3]) - 6); }
  { const inL = prof.filter(([, x, y]) => inLake(x, y)); if (inL.length) { const u0 = X(inL[0][0]), u1 = X(inL[inL.length - 1][0]), yW = Y(.6);
      el('rect', { x: u0, y: yW, width: u1 - u0, height: Y(-5) - yW, style: 'fill:var(--dv-paper)' }, S);
      el('line', { x1: u0, y1: yW, x2: u1, y2: yW, class: 'ln-thin', style: 'stroke-width:2' }, S);
      wsym((u0 + u1) / 2, yW - 4); lbl(S, (u0 + u1) / 2, yW + 34, 'the lake', 'middle', 22); } }
  // the forest, standing on the ground it covers; the ridge's peaks
  prof.forEach(([u, x, y, h], i) => { if (i % 5 === 0 && (x >= P.forest[0] || (x > 440 && !inTown(x, y)))) el('path', { d: `M${X(u) - 7} ${Y(h)} L${X(u)} ${Y(h) - 20} L${X(u) + 7} ${Y(h)}`, class: 'ln-thin', style: 'stroke-width:1.6' }, S); });
  lbl(S, X(30), Y(Math.max(...prof.filter((q) => q[1] < RL.ridge.x && q[2] === P.section[0][1]).map((q) => q[3]))) - 14, 'the ridge', 'middle', 24);
  for (const [u, side] of [[0, -1], [total, 1]]) { const cx = X(u) + side * 36, cy = 160; el('circle', { cx, cy, r: 20, class: 'vt-ring', style: 'stroke-width:2.6' }, S); text(S, cx, cy + 9, 'A', 'vt-id', null, 24); }
  lbl(S, SW - 30, 52, '[ ] heights drawn, not sealed', 'end', 21);
  lbl(S, SW - 30, 82, downhill ? 'the river runs downhill, every step ✓' : 'the river climbs somewhere ✗', 'end', 21).style.fill = downhill ? '' : 'var(--redline)';

  /* ════════════ THE GRAPH: three towns and the wild (1.2) ════════════ */
  const GR = document.getElementById('graph'), GW = 960, GH = 1210;
  const G = el('g', { class: 'hand-vellum' }, GR), gd = el('defs', {}, GR);
  { const p = el('pattern', { id: 'g-wild', width: 12, height: 12, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(35)' }, gd); el('line', { x1: 0, y1: 1, x2: 12, y2: 1, style: 'stroke:var(--dv-line);stroke-width:1.4' }, p); }
  el('rect', { width: GW, height: GH, class: 'view-frame' }, G);
  text(G, 30, 46, 'the graph · 1.2', 'sc-kick');
  const NODE = { hill: [210, 660], valley: [480, 930], forest: [750, 660] }, WY = 330, R0 = 62;
  el('rect', { x: 90, y: 120, width: 780, height: WY - 120, rx: 44, class: 'pl-old', style: 'stroke-width:4;fill:url(#g-wild)' }, G);
  { const t = text(G, GW / 2, 196, 'THE WILD', 'pl-tier', null, 34); t.setAttribute('paint-order', 'stroke'); t.style.stroke = 'var(--dv-paper)'; t.style.strokeWidth = '10px'; }
  lbl(G, GW / 2, 236, 'the overrun north · the quick road', 'middle', 23);
  [300, 480, 660].forEach((x) => el('path', { d: `M${x} 262 l11 28 h-22 Z`, class: 'arrow-h' }, G));
  const cased = (d, w) => { el('path', { d, class: 'ln-heavy', style: `stroke-width:${w};fill:none;stroke-linecap:butt` }, G); el('path', { d, style: `fill:none;stroke:var(--dv-paper);stroke-width:${w - 8}` }, G); };
  // the safe roads: down beside the falls, over the bridge, to the valley; the thin woods to the forest
  cased(`M${NODE.hill[0]} ${NODE.hill[1]} L${NODE.valley[0]} ${NODE.valley[1]}`, 24);
  cased(`M${NODE.valley[0]} ${NODE.valley[1]} L${NODE.forest[0]} ${NODE.forest[1]}`, 24);
  { const u = .5, x = NODE.hill[0] + 270 * u, y = NODE.hill[1] + 270 * u; el('path', { d: `M${x - 26} ${y + 4} Q${x} ${y - 30} ${x + 26} ${y + 4}`, class: 'ln-heavy', style: 'stroke-width:4;fill:none', transform: `rotate(45 ${x} ${y})` }, G); lbl(G, x + 22, y - 30, 'the bridge', 'start', 22); }
  { const x = NODE.hill[0] + 270 * .2, y = NODE.hill[1] + 270 * .2; for (let i = 0; i < 3; i++) el('line', { x1: x - 14 + i * 7, y1: y - 16 + i * 7, x2: x - 14 + i * 7 + 12, y2: y - 16 + i * 7 + 12, class: 'ln-thin', style: 'stroke-width:2', transform: `rotate(90 ${x} ${y})` }, G); lbl(G, x + 18, y - 22, 'the falls', 'start', 22); }
  for (let i = 1; i < 6; i++) { const x = NODE.valley[0] + 270 * i / 6, y = NODE.valley[1] - 270 * i / 6; el('path', { d: `M${x + 22} ${y + 22} l-7 -18 l-7 18 Z`, class: 'ln-thin', style: 'stroke-width:1.8;fill:var(--dv-paper)' }, G); }
  { const t = lbl(G, 0, 0, 'the safe road', 'middle', 26), x = (NODE.hill[0] + NODE.valley[0]) / 2 - 34, y = (NODE.hill[1] + NODE.valley[1]) / 2 + 34; t.setAttribute('transform', `translate(${x} ${y}) rotate(45)`); }
  { const t = lbl(G, 0, 0, 'the thin woods', 'middle', 26), x = (NODE.valley[0] + NODE.forest[0]) / 2 + 34, y = (NODE.valley[1] + NODE.forest[1]) / 2 + 34; t.setAttribute('transform', `translate(${x} ${y}) rotate(-45)`); }
  // the short roads up into the wild, dashed: enemy ground. The waves come down them, onto the gates
  for (const [id, [x, y]] of Object.entries(NODE)) {
    el('line', { x1: x, y1: WY, x2: x, y2: y - R0, class: 'ln-heavy', style: 'stroke-width:7;stroke-dasharray:18 10;stroke-linecap:butt' }, G);
    for (const yy of [WY + 60, (WY + y - R0) / 2 + 30]) el('path', { d: `M${x - 16} ${yy - 12} L${x} ${yy + 6} L${x + 16} ${yy - 12}`, class: 'ln-heavy', style: 'stroke-width:4;fill:none' }, G);
  }
  lbl(G, NODE.hill[0] - 24, (WY + NODE.hill[1]) / 2 - 40, 'waves', 'end', 22); lbl(G, NODE.hill[0] - 24, (WY + NODE.hill[1]) / 2 - 12, 'each night', 'end', 22);
  // no road between the hill and the forest but through the wild (1.5's change rule)
  { const y = NODE.hill[1], x0 = NODE.hill[0] + R0 + 10, x1 = NODE.forest[0] - R0 - 10;
    el('line', { x1: x0, y1: y, x2: NODE.valley[0] - 18, y2: y, class: 'ln-thin', style: 'stroke-width:2.4;stroke-dasharray:3 9' }, G);
    el('line', { x1: NODE.valley[0] + 18, y1: y, x2: x1, y2: y, class: 'ln-thin', style: 'stroke-width:2.4;stroke-dasharray:3 9' }, G);
    const xm = (NODE.valley[0] + x1) / 2; for (const sg of [-1, 1]) el('line', { x1: xm - 16, y1: y - 16 * sg, x2: xm + 16, y2: y + 16 * sg, class: 'ln-heavy', style: 'stroke-width:4' }, G);
    lbl(G, xm, y + 46, 'no road · 1.5', 'middle', 22); }
  // the towns: interchange rings, each with its one gate on the north, facing the wild (2.4)
  for (const [id, [x, y]] of Object.entries(NODE)) {
    el('circle', { cx: x, cy: y, r: R0, class: 'pl-old', style: 'stroke-width:7' }, G);
    el('rect', { x: x - 14, y: y - R0 - 9, width: 28, height: 16, class: 'pl-wall' }, G);
    text(G, x, y + 10, id.toUpperCase(), 'pl-tier', null, id === 'forest' || id === 'valley' ? 24 : 28);
  }
  lbl(G, NODE.hill[0] + 74, NODE.hill[1] - 70, 'the gate, north', 'start', 21);
  // the race's two routes, for its tokens: legs in graph space, paced by the plan's real lengths
  const Lhv = plen(P.roads.hillValley), Lvf = plen(P.roads.valleyForest), Lvx = dist(sample(P.roads.hillValley, 20).pop(), sample(P.roads.valleyForest, 20)[0]);   // past the valley, wall to wall
  const Ls0 = plen(P.shortRoads[0]), Ls2 = plen(P.shortRoads[2]), Lx = dist(...P.crossing);
  const rim = (from, to, r) => { const dx = to[0] - from[0], dy = to[1] - from[1], n2 = Math.hypot(dx, dy); return [from[0] + dx / n2 * r, from[1] + dy / n2 * r]; };
  const RT = R0 + 30;
  const routes = {
    safe:  { legs: [[rim(NODE.hill, NODE.valley, RT), NODE.valley, Lhv + Lvx / 2], [NODE.valley, rim(NODE.forest, NODE.valley, RT), Lvx / 2 + Lvf]] },
    quick: { legs: [[rim(NODE.hill, [NODE.hill[0], 0], RT), [NODE.hill[0], WY - 40], Ls0], [[NODE.hill[0], WY - 40], [NODE.forest[0], WY - 40], Lx], [[NODE.forest[0], WY - 40], rim(NODE.forest, [NODE.forest[0], 0], RT), Ls2]] }
  };
  Object.values(routes).forEach((r) => { r.L = r.legs.reduce((s2, l) => s2 + l[2], 0); });
  el('path', { d: `M${NODE.hill[0]} ${WY - 40} H${NODE.forest[0]}`, class: 'ln-heavy', style: 'stroke-width:4;stroke-dasharray:3 8;fill:none' }, G);
  const token = (lab, solid) => { const t = el('g', {}, G); el('circle', { r: 22, class: solid ? 'pl-wall' : 'pl-old', style: 'stroke-width:4' }, t); text(t, 0, 8, lab, 'pl-tier', null, 22).style.fill = solid ? 'var(--dv-paper)' : ''; return t; };
  const tokS = token('S', true), tokQ = token('Q', false);
  { const y = 1110, k1 = token('S', true), k2 = token('Q', false); k1.setAttribute('transform', `translate(120 ${y})`); k2.setAttribute('transform', `translate(500 ${y})`);
    lbl(G, 156, y + 8, 'by the safe road', 'start', 23); lbl(G, 536, y + 8, 'through the wild', 'start', 23); lbl(G, GW / 2, y + 64, 'one speed, one clock, from the hill', 'middle', 21); }
  const posOn = (r, d) => { let left = Math.min(d, r.L); for (const [p0, p1, l] of r.legs) { if (left <= l) { const f = left / l; return [p0[0] + (p1[0] - p0[0]) * f, p0[1] + (p1[1] - p0[1]) * f]; } left -= l; } const last = r.legs[r.legs.length - 1][1]; return last; };

  /* ════════════ THE TWO ROADS, unrolled to scale (strip maps), raced on one clock ════════════ */
  const ST = document.getElementById('strips'), TW = 1640, TH = 430;
  const T = el('g', { class: 'hand-vellum' }, ST);
  el('rect', { width: TW, height: TH, class: 'view-frame' }, T);
  text(T, 30, 46, 'the hill to the forest · two roads, unrolled', 'sc-kick');
  const u = (TW - 470) / Math.max(routes.safe.L, routes.quick.L), SX = 340;
  const strip = (y, name, segs, stops) => {
    text(T, 30, y + 12, name, 'st-name', 'start', 26);
    let x = SX;
    segs.forEach(([l, fill]) => { el('rect', { x, y: y - 16, width: l * u, height: 32, class: 'pl-old', style: `stroke-width:3;${fill ? `fill:url(#${fill})` : ''}` }, T); x += l * u; });
    stops.forEach(([d, s2], i) => { const xx = SX + d * u; el('line', { x1: xx, y1: y - 26, x2: xx, y2: y + 26, class: 'ln-heavy', style: 'stroke-width:3' }, T); lbl(T, xx, i % 2 ? y - 36 : y + 52, s2, 'middle', 21); });
    return y;
  };
  { const p = el('pattern', { id: 's-wild', width: 10, height: 10, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(35)' }, el('defs', {}, ST)); el('line', { x1: 0, y1: 1, x2: 10, y2: 1, style: 'stroke:var(--dv-line);stroke-width:1.3' }, p);
    const p2 = el('pattern', { id: 's-town', width: 7, height: 7, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(-45)' }, ST.querySelector('defs')); el('line', { x1: 0, y1: 1, x2: 7, y2: 1, style: 'stroke:var(--dv-line);stroke-width:1' }, p2); }
  const bridgeAt = (() => { const r = sample(P.roads.hillValley, 1); let best = 0; r.forEach((q, i) => { if (dist(q, [bx, by]) < dist(r[best], [bx, by])) best = i; }); return Lhv * best / (r.length - 1); })();
  const ySafe = strip(130, 'the safe road', [[Lhv, null], [Lvx, 's-town'], [Lvf, null]], [[0, 'the hill'], [bridgeAt, 'the bridge'], [Lhv, 'the valley'], [Lhv + Lvx + Lvf / 2, 'the thin woods'], [routes.safe.L, 'the forest']]);
  const yQuick = strip(262, 'the quick road', [[Ls0, null], [Lx, 's-wild'], [Ls2, null]], [[0, 'the hill'], [Ls0, 'into the wild'], [Ls0 + Lx / 2, 'past the rituals'], [routes.quick.L, 'the forest']]);
  const ratio = routes.quick.L / routes.safe.L;
  lbl(T, SX + routes.safe.L * u + 20, ySafe + 9, '1.00', 'start', 24);
  lbl(T, SX + routes.quick.L * u + 20, yQuick + 9, `[${ratio.toFixed(2)}×]`, 'start', 24);
  lbl(T, 30, TH - 52, 'measured on the plan, wall to wall', 'start', 20); lbl(T, 30, TH - 24, 'equal speeds · [ ] the sketch, not sealed', 'start', 20);
  const runner = (y, solid) => { const t = el('g', {}, T); el('circle', { cy: y, r: 13, class: solid ? 'pl-wall' : 'pl-old', style: 'stroke-width:3.4' }, t); return t; };
  const runS = runner(ySafe, true), runQ = runner(yQuick, false);
  // the finding, clouded as a reviewer would: 1.2 says the quick road is the quick one
  if (ratio >= 1) {
    const notes = [text(T, TW - 60, 360, `1.2: the quick road should be quicker;`, 'rl-lbl', 'end'), text(T, TW - 60, 392, `as drawn it is ${ratio.toFixed(2)}× the safe road`, 'rl-lbl', 'end')];
    const tw = Math.max(...notes.map((l) => l.getComputedTextLength())), c0 = TW - 60 - tw - 36, c1 = TW - 34, r0 = 330, r1 = 406;
    const nh = Math.ceil((c1 - c0) / 40), shh = (c1 - c0) / nh, nv = Math.ceil((r1 - r0) / 30), svv = (r1 - r0) / nv;
    let cl = `M${c0} ${r0}`; for (let i = 0; i < nh; i++) cl += ` a${shh / 2} 14 0 0 1 ${shh} 0`; for (let i = 0; i < nv; i++) cl += ` a14 ${svv / 2} 0 0 1 0 ${svv}`; for (let i = 0; i < nh; i++) cl += ` a${shh / 2} 14 0 0 1 ${-shh} 0`; for (let i = 0; i < nv; i++) cl += ` a14 ${svv / 2} 0 0 1 0 ${-svv}`;
    el('path', { d: cl, class: 'rl-cloud' }, T);
  }

  // one clock for the race: both leave the hill together, at one speed; the still shows the moment the
  // first arrives
  const V = 34, RUN = Math.max(routes.safe.L, routes.quick.L) / V, HOLD = 2.5, FPS = 12;
  const raceAt = (t) => {
    const d = Math.min(t, RUN) * V;
    tokS.setAttribute('transform', `translate(${posOn(routes.safe, d).join(' ')})`);
    tokQ.setAttribute('transform', `translate(${posOn(routes.quick, d).join(' ')})`);
    runS.setAttribute('transform', `translate(${SX + Math.min(d, routes.safe.L) * u} 0)`);
    runQ.setAttribute('transform', `translate(${SX + Math.min(d, routes.quick.L) * u} 0)`);
  };
  const still = () => raceAt(Math.min(routes.safe.L, routes.quick.L) / V);
  still();
  window.addEventListener('beforeprint', still);
  if (moving) { let t = 0; setInterval(() => { t += 1 / FPS; if (t > RUN + HOLD) t = 0; raceAt(t); }, 1000 / FPS); }

  /* ════════════ the key, in the title block ════════════ */
  const kt = document.getElementById('keyt'); kt.setAttribute('class', 'hand-vellum');
  { const p = el('pattern', { id: 'k-wild', width: 8, height: 8, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(35)' }, el('defs', {}, kt)); el('line', { x1: 0, y1: 1, x2: 8, y2: 1, style: 'stroke:var(--dv-line);stroke-width:1.2' }, p); }
  const row = (i, drawIt, label) => { const y = 22 + i * 36; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (q, x, y) => el('rect', { x: x - 22, y: y - 10, width: 44, height: 20, class: 'ln-thin', style: 'fill:url(#k-wild);stroke-width:1.4' }, q), 'the overrun north, the wild · 1.2');
  row(1, (q, x, y) => el('path', { d: `M${x} ${y - 11} l7 19 h-14 Z`, class: 'arrow-h' }, q), 'a ritual · 9.1');
  row(2, (q, x, y) => { for (let j = 0; j < 6; j++) el('line', { x1: x - 20 + j * 8, y1: y - 9, x2: x - 20 + j * 8, y2: y + 1 + (j % 2) * 6, class: 'ln-thin', style: `stroke-width:${1 + j * .3}` }, q); }, 'hachures run downhill, heavier steeper');
  row(3, (q, x, y) => { for (const [x0, x1, w] of [[-22, -6, 2], [-6, 8, 4], [8, 22, 6]]) el('line', { x1: x + x0, y1: y, x2: x + x1, y2: y, class: 'pl-river', style: `stroke-width:${w + 3}` }, q); for (const [x0, x1, w] of [[-22, -6, 2], [-6, 8, 4], [8, 22, 6]]) el('line', { x1: x + x0, y1: y, x2: x + x1, y2: y, class: 'pl-riverp', style: `stroke-width:${w * .55}` }, q); }, 'the river, widening downstream');
  row(4, (q, x, y) => el('line', { x1: x - 22, y1: y, x2: x + 22, y2: y, class: 'ln-thin', style: 'stroke-width:2.4;stroke-dasharray:9 5' }, q), 'a road · 1.5');
  row(5, (q, x, y) => { el('line', { x1: x - 22, y1: y, x2: x + 8, y2: y, class: 'ln-heavy', style: 'stroke-width:5' }, q); el('path', { d: `M${x + 22} ${y} l-14 -9 v18 Z`, class: 'arrow-h' }, q); }, 'the waves, onto each gate');
  row(6, (q, x, y) => el('line', { x1: x - 22, y1: y, x2: x + 22, y2: y, class: 'ln-heavy', style: 'stroke-width:3;stroke-dasharray:14 4 3 4' }, q), 'section cut, a–a');
  row(7, (q, x, y) => text(q, x, y + 8, '[ ]', 'pl-tier', null, 20), 'drawn, not sealed');
  }
})();
