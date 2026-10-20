/* sheet_t202.js — sheet T-202, the gate at night (2.3 · 2.7 · 6.7 · 7). The owner split the gate in two and kept
   all three of T-201's night options: the storyboard is this sheet's art, the tree its detail, and who does what
   went to T-201.
   THE ART    three nights at the gate, dusk to dawn, an animatic in v1's Flash style: a normal wave held, a
              spike held only when the field force comes home, a boss that breaks the gate. Running, it plays
              frame by frame; the still is the whole board.
   THE DETAIL what's at your gate tonight: from dusk, what is coming, what it means, and what you do. */
(function () {
  (document.fonts ? Promise.all([...document.fonts].map((f) => f.load().catch(() => null))).then(() => document.fonts.ready) : Promise.resolve()).then(draw);
  function draw() {
  const { el, pts, render } = window.WALL, F = window.FIG, { text, icon } = window.TOWN;
  const lbl = (g, x, y, s, anchor, size) => text(g, x, y, s, 'pl-lbl', anchor, size || 24);
  const motion = document.documentElement.dataset.motion;
  const moving = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && motion !== 'still';
  const mirror = (x, parts) => ({ t: 'g', transform: `translate(${2 * x} 0) scale(-1 1)`, kids: parts });
  const sc = (parts, cx, base, k) => ({ t: 'g', transform: `translate(${cx} ${base}) scale(${k}) translate(${-cx} ${-base})`, kids: parts });

  // one frame: a night at the gate in v1's Flash style, drawn at 420 x 180 and scaled by f.
  // o = { garrison, horde, boss, crew, field, broken, inside, hp }: who is there, and the gate's bar as the game shows it
  const FW0 = 420, FH0 = 180;
  const frame = (svg, x, y, f, o, id) => {
    const g = el('g', { transform: `translate(${x} ${y}) scale(${f})` }, svg), w = FW0, h = FH0, G = h * .7, gx = w * .3, parts = [];
    el('rect', { width: w, height: h }, el('clipPath', { id }, el('defs', {}, g)));
    const s = el('g', { 'clip-path': `url(#${id})` }, g);
    parts.push({ t: 'rect', x: 0, y: 0, w, h: G, rc: 'f-sky1' }, { t: 'rect', x: 0, y: G, w, h: h - G, rc: 'f-ground' });
    for (const [sx, sy] of [[40, 18], [150, 30], [300, 14], [380, 40], [250, 52]]) parts.push({ t: 'circle', cx: sx, cy: sy, r: 1.6, rc: 'f-star', anim: 'm-star' });
    parts.push({ t: 'rect', x: 0, y: G - 70, w, h: 70, rc: 'f-wall' }, { t: 'rect', x: gx - 50, y: G - 110, w: 100, h: 110, rc: 'f-wall' });
    parts.push(o.broken ? { t: 'path', d: `M${gx - 26} ${G} V${G - 40} L${gx - 10} ${G - 58} L${gx + 4} ${G - 44} L${gx + 18} ${G - 60} L${gx + 26} ${G - 40} V${G} Z`, rc: 'f-gate' } : { t: 'path', d: `M${gx - 26} ${G} V${G - 40} A26 26 0 0 1 ${gx + 26} ${G - 40} V${G} Z`, rc: 'f-arch' });
    if (o.broken) parts.push({ t: 'poly', pts: [[gx - 30, G - 4], [gx - 60, G + 10], [gx - 20, G + 14]], rc: 'f-wood' });
    if (o.crew) for (const dx of [-40, -84]) parts.push(sc(F.peasant(gx + dx, G + 4, true), gx + dx, G + 4, .55));   // inside the walls (6.7; the owner's correction on T-201)
    // the garrison, out front, facing the wave (the owner, on T-201)
    for (let i = 0; i < (o.garrison || 0); i++) { const cx = gx + 46 + i * 28; parts.push(mirror(cx, [sc(F.footman(cx, G + 14), cx, G + 14, .5)])); }
    for (let i = 0; i < o.horde; i++) { const cx = gx + 110 + i * 34, base = G + 18 + (i % 2) * 14; parts.push(sc((i % 2 ? F.skeleton : F.ghoul)(cx, base, i * .1), cx, base, .5)); }
    if (o.boss) parts.push(sc([{ t: 'ellipse', cx: gx + 150, cy: G + 24, rx: 46, ry: 10, rc: 'f-aura', anim: 'm-tell' }, ...F.ghoul(gx + 150, G + 24, 0)], gx + 150, G + 24, 1.3));
    if (o.field) { parts.push(sc(F.rider(w - 70, G + 30), w - 70, G + 30, .5)); for (const dx of [-60, -100]) parts.push(sc(F.footman(w + dx, G + 34), w + dx, G + 34, .5)); }
    if (o.inside) for (let i = 0; i < 3; i++) { const cx = gx - 70 - i * 30; parts.push(mirror(cx, [sc(F.ghoul(cx, G - 8, i * .1), cx, G - 8, .45)])); }
    render(parts, s);
    // the break through the gate, as on T-201: behind it the town (left), in front the wild (right)
    el('polyline', { points: pts([[gx, 0], [gx, G - 60], [gx + 9, G - 50], [gx - 9, G - 36], [gx, G - 26], [gx, h]]), class: 'seam', style: 'stroke-width:2;stroke:var(--f-moon)' }, g);
    if (o.tags) for (const [x, t, an] of [[10, 'behind', 'start'], [w - 10, 'in front', 'end']]) { const tt = text(g, x, 66, t, 'pl-lbl', an, 15); tt.style.fill = 'var(--f-moon)'; tt.style.stroke = 'none'; }
    el('rect', { width: w, height: h, class: 'view-frame', style: 'stroke-width:2.4' }, g);
    el('rect', { x: 8, y: h + 10, width: w - 16, height: 12, class: 'pl-old', style: 'stroke-width:1.6' }, g);
    el('rect', { x: 8, y: h + 10, width: (w - 16) * o.hp, height: 12, class: 'pl-wall', style: o.hp < .3 ? 'fill:var(--redline)' : '' }, g);
    return g;
  };

  /* ════════════ THE ART: three nights at the gate, dusk to dawn ════════════ */
  const A = document.getElementById('art'), AW = 2920, AH = 1130;
  const B = el('g', { class: 'hand-vellum' }, A);
  el('rect', { width: AW, height: AH, class: 'view-frame', style: 'stroke-width:6' }, B);
  const f = 1.5, fw = FW0 * f, fh = FH0 * f, gap = 44, labW = 330, x0 = (AW - labW - 3 * fw - 2 * gap) / 2, rowH = 362;
  const nights = [
    ['a normal wave', 'held · 2.3', [[{ garrison: 2, horde: 4, crew: true, hp: .8, tags: true }, 'dusk: the wave hits'], [{ garrison: 2, horde: 2, crew: true, hp: .6 }, 'the crew mends · 6.7'], [{ garrison: 2, horde: 0, crew: true, hp: 1 }, 'dawn: held']]],
    ['a spike', 'held, with help', [[{ garrison: 2, horde: 8, crew: true, hp: .6 }, 'more than it holds'], [{ garrison: 1, horde: 6, crew: true, field: true, hp: .3 }, 'the field force comes home'], [{ garrison: 2, horde: 0, crew: true, hp: .9 }, 'dawn: held, with help']]],
    ['a boss', 'the breach · 2.7', [[{ garrison: 2, horde: 3, boss: true, crew: true, hp: .5 }, 'the boss at the door'], [{ horde: 2, boss: true, hp: .1 }, 'the gate breaks'], [{ horde: 2, broken: true, inside: true, hp: 0 }, 'the breach: to the hall']]]];
  const frames = [];
  nights.forEach(([name, end, row], r) => {
    const y = 34 + r * rowH;
    text(B, x0, y + fh / 2, name.toUpperCase(), 'st-name', 'start', 30);
    lbl(B, x0, y + fh / 2 + 40, end, 'start', 24).style.fill = r === 2 ? 'var(--redline)' : '';
    row.forEach(([o, cap], c) => {
      const x = x0 + labW + c * (fw + gap);
      frames.push([x, y]);
      frame(A, x, y, f, o, `t202-${r}${c}`);
      text(A, x + 14, y + 46, String(r * 3 + c + 1), 'st-num', 'start', 40).style.fill = 'var(--f-moon)';
      lbl(B, x + fw / 2, y + fh + 62, cap, 'middle', 25);
      if (c < 2) el('path', { d: `M${x + fw + 10} ${y + fh / 2 - 12} l18 12 l-18 12`, class: 'ln-heavy', style: 'stroke-width:4;fill:none' }, B);
    });
  });
  // the animatic: running, a red frame walks the board, dusk to dawn, night after night
  const now = el('rect', { width: fw + 16, height: fh + 16, rx: 6, class: 'rl', style: 'stroke-width:6;fill:none;display:none' }, B);
  if (moving) { let k = 0; const step = () => { const [x, y] = frames[k]; now.setAttribute('x', x - 8); now.setAttribute('y', y - 8); now.style.display = ''; k = (k + 1) % frames.length; }; step(); setInterval(step, 1400); }

  /* ════════════ WHAT'S AT YOUR GATE TONIGHT? (2.3 · 2.7 · 7) ════════════ */
  // v1 2.3: "every wave the spend is one question: hold, or move"
  const TR = document.getElementById('tree'), TW = 2920, TH = 890;
  const T = el('g', { class: 'hand-vellum' }, TR);
  el('rect', { width: TW, height: TH, class: 'view-frame' }, T);
  text(T, 30, 46, "what's at your gate tonight?", 'sc-kick');
  const rx = 110, ry = 450, qx = 380, ax = 1260, wx = 2300;
  el('circle', { cx: rx, cy: ry, r: 16, class: 'pl-wall' }, T); lbl(T, rx, ry + 50, 'dusk', 'middle', 28);
  const who = {
    normal: (x, y) => [sc(F.footman(x - 40, y), x - 40, y, 1), sc(F.peasant(x + 30, y, true), x + 30, y, 1)],
    spike: (x, y) => [sc(F.rider(x, y), x, y, .8), sc(F.footman(x + 80, y), x + 80, y, .9)],
    event: (x, y) => [...[[-50, -40, 26], [-10, -56, 32], [30, -40, 26]].map(([dx, dy, r]) => ({ t: 'circle', cx: x + dx, cy: y + dy, r, rc: 'f-smoke' })), ...F.acolyte(x + 70, y)]
  };
  const branches = [
    ['a normal wave', 'the garrison holds; the crew mends', 'stay out: raid, or help a friend', '2.3 · 6.7 · A-101', 'normal'],
    ['a spike', 'more than the garrison holds', 'call the field force home', 'A-101', 'spike'],
    ['a boss', 'the gate will break', 'everyone home; the hall, the last stand', '2.7 · A-102', 'boss'],
    ['an event night', 'fog, the air raid, the insurgents', 'the night has its own answer', '7 · C-201', 'event']];
  branches.forEach(([q, means, act, ref, k], i) => {
    const y = 150 + i * 190;
    el('path', { d: `M${rx} ${ry} H${(rx + qx) / 2} V${y} H${qx - 18}`, class: 'ln-heavy', style: 'stroke-width:3.4;fill:none' }, T);
    text(T, qx, y + 10, q.toUpperCase(), 'st-name', 'start', 30);
    lbl(T, qx, y + 52, means, 'start', 26);
    el('line', { x1: qx + 600, y1: y, x2: ax - 36, y2: y, class: 'ln-thin', style: 'stroke-width:2.4;stroke-dasharray:3 8' }, T);
    el('path', { d: `M${ax - 36} ${y} l-16 -9 v18 Z`, class: 'arrow-h' }, T);
    const t = text(T, ax, y + 12, act, 'pl-lbl', 'start', 34); t.style.fontWeight = '700';
    lbl(T, ax, y + 52, ref, 'start', 23);
    el('line', { x1: wx - 200, y1: y, x2: wx - 60, y2: y, class: 'ln-thin', style: 'stroke-width:2;stroke-dasharray:3 8' }, T);
    if (k === 'boss') icon(T, 'hall', wx + 60, y + 40, .42, 2);
    else render(who[k](wx + 60, y + 48), el('g', {}, TR));
  });
  lbl(T, wx + 60, 92, 'who answers', 'middle', 24);
  lbl(T, 30, TH - 20, "v1 2.3: every wave the spend is one question, hold or move · the gate itself, T-201", 'start', 21);

  /* ════════════ the key, in the title block ════════════ */
  const kt = document.getElementById('keyt'); kt.setAttribute('class', 'hand-vellum');
  const row = (i, drawIt, label) => { const y = 22 + i * 36; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (q, x, y) => { el('rect', { x: x - 22, y: y - 6, width: 44, height: 12, class: 'pl-old', style: 'stroke-width:1.6' }, q); el('rect', { x: x - 22, y: y - 6, width: 30, height: 12, class: 'pl-wall' }, q); }, "the gate's hit points, as shown");
  row(1, (q, x, y) => { el('rect', { x: x - 22, y: y - 6, width: 44, height: 12, class: 'pl-old', style: 'stroke-width:1.6' }, q); el('rect', { x: x - 22, y: y - 6, width: 8, height: 12, style: 'fill:var(--redline)' }, q); }, 'about to break');
  row(2, (q, x, y) => el('path', { d: `M${x - 8} ${y - 12} l18 12 l-18 12`, class: 'ln-heavy', style: 'stroke-width:4;fill:none' }, q), 'the next frame, dusk to dawn');
  row(3, (q, x, y) => el('rect', { x: x - 22, y: y - 14, width: 44, height: 28, rx: 4, class: 'rl', style: 'stroke-width:4;fill:none' }, q), 'running: the frame playing');
  row(4, (q, x, y) => { el('line', { x1: x - 22, y1: y, x2: x + 8, y2: y, class: 'ln-thin', style: 'stroke-width:2;stroke-dasharray:3 7' }, q); el('path', { d: `M${x + 22} ${y} l-14 -8 v16 Z`, class: 'arrow-h' }, q); }, 'what it means, to what you do');
  row(5, (q, x, y) => el('polyline', { points: pts([[x, y - 16], [x, y - 6], [x + 7, y - 2], [x - 7, y + 4], [x, y + 8], [x, y + 16]]), class: 'seam', style: 'stroke-width:2.4' }, q), 'the break: behind it, the town');
  row(6, (q, x, y) => text(q, x, y + 8, 'A-101', 'pl-tier', null, 14), 'a sheet, to come');
  row(7, (q, x, y) => text(q, x, y + 8, '[ ]', 'pl-tier', null, 20), 'drawn, not sealed');
  }
})();
