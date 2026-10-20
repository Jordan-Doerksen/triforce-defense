/* sheet_t301.js — sheet T-301, a plot and its seven (2.5 · 2.6 · 6.3 · 6.5). Two faces from MODELS.town:
   THE ART    one ground, seven futures: an empty plot among the seven it can become, the eighth slot empty.
              Running, the ground tries each in turn; the still is the ground before the choice.
   THE DETAIL the plot's card (v1's seven buttons, the eighth empty); what each answers, and the check that
              none is strictly best (2.5's change rule); the questions a plot asks, a tree from the night's
              trouble through the spend to the answer (the owner's pick of three, A); and the plot building
              itself in view, in three steps (6.5 · R10). */
(function () {
  // every face loaded first: labels here are placed by their measured widths
  (document.fonts ? Promise.all([...document.fonts].map((f) => f.load().catch(() => null))).then(() => document.fonts.ready) : Promise.resolve()).then(draw);
  function draw() {
  const { el, pts, render } = window.WALL;
  const M = window.MODELS.town, F = window.FIG, ISO = window.ISO;
  const { text, OPTION, treeParts, ROLE, icon } = window.TOWN;
  const lbl = (g, x, y, s, anchor, size) => text(g, x, y, s, 'pl-lbl', anchor, size || 24);
  const OPT = Object.fromEntries(M.options.map((o) => [o.id, o]));
  const K = M.options.length;

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

  /* ════════════ THE QUESTIONS A PLOT ASKS: the night's trouble, the spend, the answer ════════════ */
  // v1 6 II asks them ("more army, so more farms? weak ranged, so a tower?"); the tooltips ask the rest
  const QS = document.getElementById('asks'), QW = 1240, QH = 890;
  const S = el('g', { class: 'hand-vellum' }, QS);
  el('rect', { width: QW, height: QH, class: 'view-frame' }, S);
  text(S, 30, 46, 'the questions a plot asks', 'sc-kick');
  { const groups = ['def', 'off', 'res'].map((r) => [r, M.options.filter((o) => o.role === r)]);
    const rx = 80, ry = 470, sx = 250, qx = 430, ix = 960, step = 104; let y = 140;
    el('circle', { cx: rx, cy: ry, r: 14, class: 'pl-wall' }, S); lbl(S, rx, ry + 46, 'the night asks', 'middle', 22);
    groups.forEach(([role, opts]) => {
      const ys = opts.map((_, i) => y + i * step), my = (ys[0] + ys[ys.length - 1]) / 2;
      el('path', { d: `M${rx} ${ry} H${(rx + sx) / 2} V${my} H${sx - 26}`, class: 'ln-heavy', style: 'stroke-width:3;fill:none' }, S);
      ROLE[role](S, sx, my); lbl(S, sx, my + 44, M.roles[role].spend, 'middle', 24);
      opts.forEach((o, i) => {
        const yy = ys[i];
        el('path', { d: `M${sx + 26} ${my} H${(sx + qx) / 2} V${yy} H${qx - 14}`, class: 'ln-thin', style: 'stroke-width:2.4;fill:none' }, S);
        const t = lbl(S, qx, yy + 9, o.asks, 'start', 28), tw = t.getComputedTextLength();
        el('line', { x1: qx + tw + 16, y1: yy, x2: ix - 70, y2: yy, class: 'ln-thin', style: 'stroke-width:2;stroke-dasharray:3 7' }, S);
        el('path', { d: `M${ix - 70} ${yy} l-14 -8 v16 Z`, class: 'arrow-h' }, S);
        icon(S, o.id, ix, yy + 26, .34, 2);
        lbl(S, ix + 70, yy + 9, o.name.toLowerCase(), 'start', 26);
      });
      y += opts.length * step + 26;
    });
    S.querySelectorAll('.m-circle').forEach((n) => n.remove());   // the Aviary's gryphon circles the art, not the tree
    lbl(S, 30, QH - 24, "v1 6 II: “more army, so more farms? weak ranged, so a tower?” · the rest, the tooltips", 'start', 20); }

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
  row(6, (q, x, y) => { el('line', { x1: x - 22, y1: y, x2: x + 8, y2: y, class: 'ln-thin', style: 'stroke-width:2;stroke-dasharray:3 7' }, q); el('path', { d: `M${x + 22} ${y} l-14 -8 v16 Z`, class: 'arrow-h' }, q); }, 'the question, to its answer');
  row(7, (q, x, y) => text(q, x, y + 8, '[ ]', 'pl-tier', null, 20), 'drawn, not sealed');
  }
})();
