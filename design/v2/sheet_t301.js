/* sheet_t301.js — sheet T-301, a plot and its seven (2.5 · 2.6 · 6.3 · 6.5). Two faces from MODELS.town:
   THE ART    one ground, seven futures: an empty plot among the seven it can become, the eighth slot empty.
              Running, the ground tries each in turn; the still is the ground before the choice.
   THE DETAIL the plot's card (v1's seven buttons, the eighth empty); what each answers, and the check that
              none is strictly best (2.5's change rule); every way to fill six plots, as a ternary heatmap of
              hold, move and pay (python-ternary's hexagonal heatmap, MIT, ported), and the fork v1 names,
              duplicates against variety; and the plot building itself in view, in three steps (6.5 · R10). */
(function () {
  // every face loaded first: labels here are placed by their measured widths
  (document.fonts ? Promise.all([...document.fonts].map((f) => f.load().catch(() => null))).then(() => document.fonts.ready) : Promise.resolve()).then(draw);
  function draw() {
  const { el, pts, render } = window.WALL;
  const M = window.MODELS.town, F = window.FIG, ISO = window.ISO;
  const { text, OPTION, treeParts, ROLE } = window.TOWN;
  const lbl = (g, x, y, s, anchor, size) => text(g, x, y, s, 'pl-lbl', anchor, size || 24);
  const OPT = Object.fromEntries(M.options.map((o) => [o.id, o]));
  const N = M.plots.length, K = M.options.length;
  const C = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const multisets = (size, types) => C(size + types - 1, types - 1);       // ways to fill `size` plots from `types` buildings, repeats allowed

  /* ════════════ THE ART: one ground, seven futures ════════════ */
  const A = document.getElementById('art'), AW = 1900, AH = 1130;
  el('rect', { width: AW, height: AH, style: 'fill:var(--fd-sky-2)' }, A);
  el('rect', { y: AH * .62, width: AW, height: AH * .38, style: 'fill:var(--fd-sky-3)' }, A);
  for (const [cx, cy, s] of [[AW * .12, AH * .2, 1], [AW * .8, AH * .14, .85], [AW * .5, AH * .1, .6]]) {
    const g = el('g', { transform: `translate(${cx} ${cy}) scale(${s})` }, A);
    for (const [dx, dy, r] of [[-60, 10, 34], [-20, -14, 44], [30, 0, 38], [70, 14, 28]]) el('circle', { cx: dx, cy: dy, r, class: 'f-smoke', style: 'fill:var(--f-moon);stroke-width:3' }, g);
  }
  const G0 = 70, G1 = 930, DEEP = 110, HH = 1000, CX = 500, CY = 500, RR = 345, PR = 66;
  const probe = ISO(null, { H: HH, k: 1, ox: 0, oy: 0 });
  const cs = [[G0, G0, -DEEP], [G1, G0, -DEEP], [G1, G1, -DEEP], [G0, G1, 300], [G0, G0, 300], [G1, G1, 0]];
  const xs = cs.map((c) => probe.P(...c)[0]), ys = cs.map((c) => probe.P(...c)[1]);
  const fit = { x: 60, y: 60, w: AW - 120, h: AH - 90 };
  const k = Math.min(fit.w / (Math.max(...xs) - Math.min(...xs)), fit.h / (Math.max(...ys) - Math.min(...ys)));
  const view = { H: HH, k, ox: fit.x + (fit.w - (Math.max(...xs) - Math.min(...xs)) * k) / 2 - Math.min(...xs) * k, oy: fit.y + (fit.h - (Math.max(...ys) - Math.min(...ys)) * k) / 2 - Math.min(...ys) * k };
  // eight places round the ground, in the card's order clockwise from the west; the eighth stays empty
  const spots = Array.from({ length: K + 1 }, (_, i) => { const a = Math.PI + i * Math.PI / 4; return [CX + RR * Math.cos(a), CY + RR * Math.sin(a), M.options[i]]; });
  const depth = (x, y) => (HH - y) + x, dC = depth(CX, CY);
  const back = ISO(el('g', {}, A), view);
  // the ground: a slab, its strata; paths from the middle to every place, a wheel; the rings
  back.box(G0, G0, G1, G1, -DEEP, DEEP, 'grass', -1e6);
  back.custom(-1e6 + 1, (p, P) => { for (const z of [-40, -80]) el('polyline', { points: pts([P(G0, G0, z), P(G1, G0, z), P(G1, G1, z)]), class: 'i-strata' }, p); });
  spots.forEach(([x, y]) => { const dx = x - CX, dy = y - CY, n = Math.hypot(dx, dy), w = 16, ux = -dy / n * w, uy = dx / n * w; back.flat([[CX + ux, CY + uy], [x + ux, y + uy], [x - ux, y - uy], [CX - ux, CY - uy]], 'i-soil', -9e5 + 3); });
  back.ring(CX, CY, RR, 'i-soil', -9e5 + 1);
  back.ring(CX, CY, RR - 28, 'i-grass-t', -9e5 + 2);
  spots.forEach(([x, y]) => back.ring(x, y, PR, 'i-plot', -8e5));
  back.ring(CX, CY, PR + 14, 'i-plot', -8e5);
  // the seven, behind the middle and in front of it
  const front = [];
  spots.forEach(([x, y, o]) => { if (!o) return; if (depth(x, y) < dC) OPTION[o.id](back, x, y); else front.push([x, y, o]); });
  for (const [x, y] of [[G0 + 40, 180], [G0 + 30, 520], [G0 + 50, 860], [200, G1 - 30], [520, G1 - 40], [840, G1 - 30], [G1 - 30, 900]]) back.sprite(treeParts(170, 128), x, y, .8);
  back.draw();
  // the middle: the ground before the choice; running, it tries each of the seven in turn
  M.options.forEach((o, i) => {
    const g = el('g', { class: 'm-cycle', style: `--d:${(i * 1.2).toFixed(1)}s` }, A);
    const I = ISO(g, view); OPTION[o.id](I, CX, CY); I.draw();
  });
  const fr = ISO(el('g', {}, A), view);
  front.forEach(([x, y, o]) => OPTION[o.id](fr, x, y));
  fr.sprite(F.peasant(0, 0, true), CX + 110, CY - 40, .9);
  fr.sprite(F.peasant(0, 0, false), CX + 60, CY - 120, .9);
  for (const [x, y] of [[G1 - 40, 120], [G1 - 20, 330], [640, G0 + 30], [380, G0 + 30]]) fr.sprite(treeParts(160, 120), x, y, .8);
  fr.draw();
  el('rect', { width: AW, height: AH, class: 'view-frame', style: 'stroke-width:8' }, A);

  /* ════════════ THE CARD: v1's seven buttons, the eighth empty (2.5 · 6.3) ════════════ */
  const CD = document.getElementById('card'), CW2 = 960, CH2 = 560;
  const Q = el('g', { class: 'hand-vellum' }, CD);
  el('rect', { width: CW2, height: CH2, class: 'view-frame' }, Q);
  text(Q, 30, 46, "the plot's card · 2.5", 'sc-kick');
  const bw = 196, bh = 178, gx0 = 66, gy0 = 82, gap = 16;
  for (let i = 0; i < 8; i++) {
    const x = gx0 + (i % 4) * (bw + gap), y = gy0 + Math.floor(i / 4) * (bh + gap), o = M.options[i];
    el('rect', { x, y, width: bw, height: bh, rx: 14, class: o ? 'pl-old' : 'pl-dim', style: o ? 'stroke-width:4' : '' }, Q);
    if (!o) { lbl(Q, x + bw / 2, y + bh / 2 - 4, 'the eighth', 'middle', 23); lbl(Q, x + bw / 2, y + bh / 2 + 26, 'stays empty', 'middle', 23); continue; }
    el('path', { d: o.icon, class: 'sc-glyph', style: 'stroke-width:1.5', transform: `translate(${x + bw / 2 - 42} ${y + 26}) scale(3.5)` }, Q);
    el('rect', { x: x + 10, y: y + 10, width: 34, height: 34, rx: 6, class: 'pl-wall' }, Q);
    text(Q, x + 27, y + 37, o.key, 'pl-tier', null, 24).style.fill = 'var(--dv-paper)';
    ROLE[o.role](Q, x + bw - 28, y + 30);
    lbl(Q, x + bw / 2, y + bh - 16, o.name.toLowerCase(), 'middle', 22);
  }
  lbl(Q, gx0, CH2 - 76, 'the whole menu, on every plot', 'start', 23);
  lbl(Q, gx0, CH2 - 46, 'rings gate plots, not options · 6.2', 'start', 23);
  lbl(Q, CW2 - 30, CH2 - 46, '[ ] hotkeys, placeholders', 'end', 21);

  /* ════════════ WHAT EACH ANSWERS: and the check that none is strictly best ════════════ */
  const AN = document.getElementById('answers'), AW2 = 960, AH2 = 620;
  const W2 = el('g', { class: 'hand-vellum' }, AN);
  el('rect', { width: AW2, height: AH2, class: 'view-frame' }, W2);
  text(W2, 30, 46, 'what each answers', 'sc-kick');
  const mx0 = 330, my0 = 222, cw = 56, rh = 44, needs = M.needs;
  needs.forEach((nd, j) => { const x = mx0 + j * cw + cw / 2; const t = lbl(W2, x + 6, my0 - 14, nd.name, 'start', 20); t.setAttribute('transform', `rotate(-56 ${x + 6} ${my0 - 14})`); });
  M.options.forEach((o, i) => {
    const y = my0 + i * rh;
    if (i % 2 === 0) el('rect', { x: 30, y, width: mx0 - 30 + needs.length * cw, height: rh, style: 'fill:var(--dv-line);opacity:.06' }, W2);
    ROLE[o.role](W2, 54, y + rh / 2);
    lbl(W2, 86, y + rh / 2 + 8, o.name.toLowerCase(), 'start', 23);
    needs.forEach((nd, j) => { const x = mx0 + j * cw + cw / 2; if (o.answers.includes(nd.id)) el('circle', { cx: x, cy: y + rh / 2, r: 11, class: 'pl-wall' }, W2); else el('circle', { cx: x, cy: y + rh / 2, r: 2.5, class: 'pl-wall', style: 'opacity:.35' }, W2); });
  });
  for (let j = 0; j <= needs.length; j++) el('line', { x1: mx0 + j * cw, y1: my0, x2: mx0 + j * cw, y2: my0 + K * rh, class: 'ln-fine', style: 'stroke-width:1' }, W2);
  // 2.5's change rule, checked: no option may answer everything another does (and more)
  const covers = (a, b) => b.answers.every((n) => a.answers.includes(n));
  const strict = M.options.flatMap((a) => M.options.filter((b) => a !== b && covers(a, b)).map((b) => `${a.name} covers ${b.name}`));
  const yN = my0 + K * rh + 42;
  const ok = lbl(W2, 30, yN, strict.length ? `✗ ${strict[0]}` : 'no option covers another: none strictly best ✓ · 2.5', 'start', 23);
  if (strict.length) ok.style.fill = 'var(--redline)';
  lbl(W2, 30, yN + 32, '[ ] read off v1\'s card; numbers come at balance', 'start', 20);

  /* ════════════ EVERY WAY TO FILL SIX PLOTS ════════════ */
  const SP = document.getElementById('space'), SW2 = 1240, SH2 = 890;
  const S = el('g', { class: 'hand-vellum' }, SP);
  el('rect', { width: SW2, height: SH2, class: 'view-frame' }, S);
  text(S, 30, 46, `every way to fill ${N} plots`, 'sc-kick');
  const types = { off: 0, def: 0, res: 0 }; M.options.forEach((o) => types[o.role]++);
  // the mix of a build: how many plots move, hold and pay. Each cell counts the builds with that mix
  const cells = [];
  for (let a = 0; a <= N; a++) for (let b = 0; a + b <= N; b++) { const c = N - a - b; cells.push([a, b, c, multisets(a, types.off) * multisets(b, types.def) * multisets(c, types.res)]); }
  const total = cells.reduce((s2, q) => s2 + q[3], 0), vmax = Math.max(...cells.map((q) => q[3]));
  // python-ternary's hexagons: a corner, an edge or an interior point each takes its own clipped shape
  const hx = (() => {
    const z = [0, 0, 0], al = [-1 / 3, 2 / 3, 0], up = [1 / 3, 1 / 3, 0], dn = [2 / 3, -1 / 3, 0], iv = [0, .5, -.5], ivd = [.5, -.5, 0], dX = [.5, 0, -.5], neg = (v) => v.map((q) => -q);
    return { 100: [z, neg(dX), neg(dn), neg(ivd)], '010': [z, ivd, neg(al), neg(iv)], '001': [z, iv, up, dX], '011': [iv, up, dn, neg(al), neg(iv)], 101: [neg(dX), neg(dn), al, up, dX], 110: [ivd, neg(al), neg(up), neg(dn), neg(ivd)], 111: [al, up, dn, neg(al), neg(up), neg(dn)] };
  })();
  const U = 88, TX = 104, TY = 716, R3 = Math.sqrt(3) / 2;
  const proj = ([a, b]) => [TX + (a + b / 2) * U, TY - R3 * b * U];          // move to the right, hold to the top, pay to the left
  const css = getComputedStyle(document.documentElement), hex2 = (h) => h.trim().match(/\w\w/g).map((q) => parseInt(q, 16));
  const [p0, p1] = [hex2(css.getPropertyValue('--dv-paper')), hex2(css.getPropertyValue('--dv-line'))];
  const ramp = (t) => `rgb(${p0.map((v, i) => Math.round(v + (p1[i] - v) * t)).join(',')})`;
  const build = M.build.map((id) => OPT[id].role), mine = [build.filter((r) => r === 'off').length, build.filter((r) => r === 'def').length, build.filter((r) => r === 'res').length];
  cells.forEach(([a, b, c, v]) => {
    const sig = [a, b, c].map((q) => (q ? 1 : 0)).join('');
    const poly = hx[sig].map((d) => proj([a + d[0], b + d[1]]));
    const t = v / vmax, cell = el('polygon', { points: pts(poly), style: `fill:${ramp(.08 + .86 * t)};stroke:var(--dv-paper);stroke-width:3` }, S);
    el('title', {}, cell).textContent = `move ${a} · hold ${b} · pay ${c}: ${v} builds`;
    const [x, y] = proj([a, b]), here = a === mine[0] && b === mine[1];
    if (v === vmax || here || a === N || b === N || c === N) { const tl = text(S, x, y + 9, String(v), 'pl-tier', null, 24); tl.style.fill = t > .5 ? 'var(--dv-paper)' : ''; }
    if (here) el('circle', { cx: x, cy: y, r: 40, class: 'ln-heavy', style: 'stroke-width:4;fill:none;stroke-dasharray:10 6' }, S);
  });
  const corner = (role, [x, y], dx, dy) => { ROLE[role](S, x + dx, y + dy); lbl(S, x + dx + 22, y + dy + 8, `all ${M.roles[role].spend}`, 'start', 24); };
  corner('def', proj([0, N]), 50, -14); corner('off', proj([N, 0]), -30, 52); corner('res', proj([0, 0]), -10, 52);
  { const [x, y] = proj(mine), xe = TX + (N - mine[1] / 2) * U + 30; el('line', { x1: x + 40, y1: y, x2: xe - 6, y2: y, class: 'ln-thin', style: 'stroke-width:2' }, S); lbl(S, xe, y + 8, "T-101's build", 'start', 22); }
  lbl(S, TX, 120, `${types.def} ways to hold · ${types.off} to move · ${types.res} to pay`, 'start', 23);
  lbl(S, TX, 150, 'each cell, a mix of six · darker, more builds', 'start', 21);
  // the ramp's legend
  { const lx = TX + 40, ly = TY + 104, lw = 400; const gd = el('linearGradient', { id: 's-ramp' }, el('defs', {}, SP)); [0, 1].forEach((o) => el('stop', { offset: o, style: `stop-color:${ramp(.08 + .86 * o)}` }, gd));
    el('rect', { x: lx, y: ly, width: lw, height: 18, fill: 'url(#s-ramp)', style: 'stroke:var(--dv-line);stroke-width:1.4' }, S);
    lbl(S, lx - 10, ly + 16, String(Math.min(...cells.map((q) => q[3]))), 'end', 21); lbl(S, lx + lw + 10, ly + 16, `${vmax} builds`, 'start', 21); }
  // the hero number, by hall tier: each tier opens two plots (6.2)
  const RX = 760;
  text(S, RX, 160, String(total), 'st-num', 'start', 120);
  lbl(S, RX + 6, 204, `builds of ${N} plots from ${K} · repeats allowed`, 'start', 22);
  lbl(S, RX + 6, 234, `${(K ** N).toLocaleString('en')} if each plot's place counts`, 'start', 20);
  M.tiers.forEach((tier, i) => { const n2 = 2 * (i + 1), y = 294 + i * 40; lbl(S, RX + 6, y, `${tier.toLowerCase()} · ${n2} plots`, 'start', 22); text(S, RX + 420, y, String(multisets(n2, K)), 'pl-tier', 'end', 24); });
  // the fork v1 names: duplicates against variety. How many different buildings a build holds
  const dist = Array.from({ length: N }, (_, i) => C(K, i + 1) * C(N - 1, i));
  const bx0 = RX + 20, by0 = 760, bwid = 62, bmax = Math.max(...dist), bH = 260;
  text(S, RX, 470, 'duplicates against variety', 'st-name', 'start', 24);
  dist.forEach((v, i) => {
    const h = v / bmax * bH, x = bx0 + i * (bwid + 8), r = el('rect', { x, y: by0 - h, width: bwid, height: h, rx: 4, class: 'pl-wall', style: `opacity:${i + 1 === new Set(M.build).size ? 1 : .55}` }, S);
    el('title', {}, r).textContent = `${v} builds hold ${i + 1} different buildings`;
    text(S, x + bwid / 2, by0 - h - 10, String(v), 'pl-tier', null, 21);
    text(S, x + bwid / 2, by0 + 30, String(i + 1), 'pl-tier', null, 22);
  });
  el('line', { x1: bx0 - 8, y1: by0, x2: bx0 + N * (bwid + 8), y2: by0, class: 'ln-thin', style: 'stroke-width:2' }, S);
  lbl(S, bx0, by0 + 64, 'different buildings in a build', 'start', 21);
  lbl(S, bx0 + N * (bwid + 8) - 8, by0 + 98, "T-101's holds all six", 'end', 21);

  /* ════════════ IT BUILDS ITSELF IN VIEW: three steps (6.5 · R10) ════════════ */
  const ST = document.getElementById('steps'), TW = 1640, TH = 890, FW = TW / 3;
  const T = el('g', { class: 'hand-vellum' }, ST);
  el('rect', { width: TW, height: TH, class: 'view-frame' }, T);
  for (let i = 1; i < 3; i++) el('line', { x1: FW * i, y1: 30, x2: FW * i, y2: TH - 30, class: 'rule-2' }, T);
  const steps = [['choose', 'the card, on the ground'], ['it builds', 'scaffolds, peasants walk in'], ['it stands', 'alive: workers, smoke, a window']];
  steps.forEach(([name, cap], i) => { const x = FW * i + 30; text(T, x, 120, String(i + 1), 'st-num', 'start', 110); text(T, x + 96, 80, name.toUpperCase(), 'st-name', 'start', 34); lbl(T, x + 98, 118, cap, 'start', 23); });
  const stage = (i) => ISO(el('g', {}, ST), { H: 0, k: 1.5, ox: FW * i + FW / 2, oy: 600 });
  // 1 · the empty ring, a peasant, and the card above it with the choice lit
  { const I = stage(0); I.ring(0, 0, M.plotR + 8, 'i-plot'); I.sprite(F.peasant(0, 0, false), 70, 40, 1); I.draw();
    const x0 = FW / 2 - 150, y0 = 186; el('rect', { x: x0 - 12, y: y0 - 12, width: 324, height: 168, rx: 12, class: 'pl-old', style: 'stroke-width:3' }, T);
    M.options.forEach((o, j) => { const x = x0 + (j % 4) * 76, y = y0 + Math.floor(j / 4) * 76, hot = o.id === 'sanctum';
      el('rect', { x, y, width: 68, height: 68, rx: 8, class: hot ? 'pl-wall' : 'pl-old', style: 'stroke-width:2.4' }, T);
      el('path', { d: o.icon, class: 'sc-glyph', style: `stroke-width:1.6;${hot ? 'stroke:var(--dv-paper)' : ''}`, transform: `translate(${x + 10} ${y + 10}) scale(2)` }, T); });
    el('rect', { x: x0 + 3 * 76, y: y0 + 76, width: 68, height: 68, rx: 8, class: 'pl-dim' }, T);
    lbl(T, FW / 2, 840, 'the sanctum, as v1 shows it', 'middle', 22); }
  // 2 · the timer: the scaffold, peasants hammering; v1's tooltip gives the sanctum [60 s]
  { const I = stage(1); I.ring(0, 0, M.plotR + 8, 'i-plot');
    I.custom(10, (p, P) => {
      for (const [x, y] of [[-46, -36], [46, -36], [-46, 36], [46, 36]]) el('line', { x1: P(x, y, 0)[0], y1: P(x, y, 0)[1], x2: P(x, y, 110)[0], y2: P(x, y, 110)[1], class: 'f-wood' }, p);
      for (const z of [50, 100]) el('polygon', { points: pts([P(-52, -42, z), P(52, -42, z), P(52, 42, z), P(-52, 42, z)]), class: 'f-plank', style: 'opacity:.85' }, p);
    });
    I.sprite(F.peasant(0, 0, true), 10, -10, 1, 50); I.sprite(F.peasant(0, 0, true), -60, 70, 1); I.sprite(F.peasant(0, 0, false), 110, -70, 1);
    I.draw();
    const bx = FW + 110, byy = 772, bw2 = FW - 220; el('rect', { x: bx, y: byy, width: bw2, height: 22, class: 'pl-old', style: 'stroke-width:2.4' }, T);
    el('rect', { x: bx, y: byy, width: bw2 * .55, height: 22, class: 'pl-wall' }, T);
    lbl(T, FW + FW / 2, 840, 'the build timer · [60 s]', 'middle', 22); }
  // 3 · it stands; no camera move, ever (6.5)
  { const I = stage(2); OPTION.sanctum(I, 0, 0); I.sprite(F.peasant(0, 0, false), 120, 80, 1); I.draw();
    lbl(T, 2 * FW + FW / 2, 840, 'no camera move, ever · 6.5', 'middle', 22); }

  /* ════════════ the key, in the title block ════════════ */
  const kt = document.getElementById('keyt'); kt.setAttribute('class', 'hand-vellum');
  const row = (i, drawIt, label) => { const y = 22 + i * 36; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (q, x, y) => ROLE.off(q, x, y), 'offensive: the move spend · 2.6');
  row(1, (q, x, y) => ROLE.def(q, x, y), 'defensive: the hold spend');
  row(2, (q, x, y) => ROLE.res(q, x, y), 'resource: the pay spend');
  row(3, (q, x, y) => { el('rect', { x: x - 15, y: y - 15, width: 30, height: 30, rx: 5, class: 'pl-wall' }, q); text(q, x, y + 8, 'A', 'pl-tier', null, 20).style.fill = 'var(--dv-paper)'; }, 'a hotkey · placeholder');
  row(4, (q, x, y) => el('rect', { x: x - 20, y: y - 14, width: 40, height: 28, rx: 5, class: 'pl-dim' }, q), 'an empty slot');
  row(5, (q, x, y) => el('circle', { cx: x, cy: y, r: 11, class: 'pl-wall' }, q), 'answers it');
  row(6, (q, x, y) => { for (let j = 0; j < 4; j++) el('rect', { x: x - 22 + j * 11, y: y - 10, width: 11, height: 20, style: `fill:${ramp(.08 + .86 * j / 3)};stroke:var(--dv-line);stroke-width:1` }, q); }, 'fewer to more builds');
  row(7, (q, x, y) => text(q, x, y + 8, '[ ]', 'pl-tier', null, 20), 'drawn, not sealed');
  }
})();
