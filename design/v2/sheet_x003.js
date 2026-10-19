/* sheet_x003.js — sheet X-003, the hill town in three steps: the trial for Q7 (which devices of a LEGO
   manual to adopt). The owner kept two (R10): the box art and big numbered steps. This sheet keeps the
   devices it tried, as the record: a parts box with counts, new parts bold, arrows, a callout done six times.
   Both faces come from MODELS.town through town.js. */
(function () {
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(draw);
  function draw() {
  const { el, pts } = window.WALL;
  const M = window.MODELS.town, F = window.FIG, ISO = window.ISO;
  const { text, box, icon, arrow, step, plans } = window.TOWN;
  const ROMAN = window.TOWN.ROMAN; void ROMAN;

  box(document.getElementById('box'), { title: 'THE HILL TOWN', sub: 'the castle tier · the finished set', fit: { x: 40, y: 150, w: 1300, h: 900 }, badges: [1480, 250, 180] });
  ['step1', 'step2', 'step3'].forEach((id, i) => step(document.getElementById(id), i, { lego: true }));

  /* ════════════ the callout: one plot, done six times ════════════ */
  const co = document.getElementById('callout');
  const CW = 920, CH = 1006;
  const cg = el('g', { class: 'hand-vellum' }, co);
  el('rect', { x: 4, y: 4, width: CW - 8, height: CH - 8, rx: 26, class: 'co-frame' }, cg);
  text(cg, CW - 30, 86, `${M.plots.length}×`, 'co-mult', 'end');
  // 1 · a plot
  text(cg, 36, 96, '1', 'st-num', null, 80);
  icon(cg, 'plot', 250, 140, .9);
  arrow(cg, 400, 140, 520, 140, 0);
  // 2 · its card: the seven, the eighth slot empty (6.3 · 2.6)
  text(cg, 560, 96, '2', 'st-num', null, 80);
  const card = { x: 50, y: 250, sw: 205, sh: 230 };
  const ROLE = window.TOWN.ROLE;
  for (let i = 0; i < 8; i++) {
    const x = card.x + (i % 4) * card.sw, y = card.y + Math.floor(i / 4) * card.sh, o = M.options[i];
    el('rect', { x: x + 6, y: y + 6, width: card.sw - 12, height: card.sh - 12, rx: 14, class: o ? 'pli' : 'pl-dim' }, cg);
    if (!o) { text(cg, x + card.sw / 2, y + card.sh / 2 + 8, 'empty', 'pl-lbl', null, 22); continue; }
    icon(cg, o.id, x + card.sw / 2, y + card.sh / 2 + 18, .5);
    ROLE[o.role](cg, x + card.sw - 32, y + 34);
    text(cg, x + card.sw / 2, y + card.sh - 22, o.name.toLowerCase(), 'pl-lbl', null, 21);
  }
  // 3 · it builds itself in view (6.5): the scaffold, then the building
  text(cg, 36, 806, '3', 'st-num', null, 80);
  const sc = ISO(el('g', {}, cg), { H: 0, k: .62, ox: 300, oy: 900 });
  sc.ring(0, 0, M.plotR, 'i-plot');
  sc.custom(10, (p, P) => {
    for (const [x, y] of [[-40, -30], [40, -30], [-40, 30], [40, 30]]) el('line', { x1: P(x, y, 0)[0], y1: P(x, y, 0)[1], x2: P(x, y, 90)[0], y2: P(x, y, 90)[1], class: 'f-wood' }, p);
    el('polygon', { points: pts([P(-46, -36, 50), P(46, -36, 50), P(46, 36, 50), P(-46, 36, 50)]), class: 'f-plank', style: 'opacity:.85' }, p);
  });
  sc.sprite(F.peasant(0, 0, true), 10, -10, 1, 50);
  sc.draw();
  arrow(cg, 430, 860, 560, 860, 0);
  icon(cg, 'workshop', 730, 900, .62);
  text(cg, CW / 2, CH - 34, 'no strictly-best choice · 2.5', 'pl-lbl', null, 24);

  // the callout's pointer: to a plot of the ring the last step opened
  const sheet = co.ownerSVGElement;
  const s3 = document.getElementById('step3'), p3 = plans.step3, target = M.plots.filter((p) => p.ring === 3).sort((a, c) => c.x - a.x)[0];
  const tx = +s3.getAttribute('x') + p3.X(target.x), ty = +s3.getAttribute('y') + p3.Y(target.y);
  const sx0 = +co.getAttribute('x') + 4, sy0 = ty;
  const pg = el('g', { class: 'hand-vellum' }, sheet);
  el('path', { d: `M${sx0} ${sy0 - 20} L${tx + M.plotR * p3.kp + 22} ${ty} L${sx0} ${sy0 + 20} Z`, class: 'co-frame', style: 'stroke-width:3' }, pg);

  /* ════════════ the key, in the title block ════════════ */
  const kt = document.getElementById('keyt');
  const row = (i, draw, label) => { const y = 22 + i * 40; draw(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  const kdefs = el('defs', {}, kt), kh = el('pattern', { id: 'keyt-h', width: 10, height: 10, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, kdefs);
  el('line', { x1: 0, y1: 1, x2: 10, y2: 1, style: 'stroke:var(--dv-line);stroke-width:2' }, kh);
  row(0, (g, x, y) => el('rect', { x: x - 22, y: y - 14, width: 44, height: 28, class: 'pl-new', fill: 'url(#keyt-h)' }, g), 'new on this step');
  row(1, (g, x, y) => el('rect', { x: x - 22, y: y - 14, width: 44, height: 28, class: 'pl-old' }, g), 'built on a step before');
  row(2, (g, x, y) => el('circle', { cx: x, cy: y, r: 16, class: 'pl-dim' }, g), 'a plot not yet open');
  row(3, (g, x, y) => { el('circle', { cx: x, cy: y, r: 16, class: 'pl-old' }, g); text(g, x, y + 7, 'I', 'pl-tier', null, 18); }, 'a plot and its ring · 2.5');
  row(4, (g, x, y) => ROLE.off(g, x, y), 'offensive: the move spend · 2.6');
  row(5, (g, x, y) => ROLE.def(g, x, y), 'defensive: the hold spend');
  row(6, (g, x, y) => ROLE.res(g, x, y), 'resource: the pay spend');
  }
})();

