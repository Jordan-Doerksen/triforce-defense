/* sheet_s101.js — sheet S-101, the fire, before the first day (v1 ch. 4, sealed 17 Oct; amended by the owner, 19 Oct;
   docs/HORDE.md). Two faces from MODELS.fire, MODELS.horde, MODELS.events and MODELS.finale:
   THE ART    the screen itself: a love letter to Diablo II's character screen. The dark, the ruined watchtower, a
              dead tree and its crows, a sleeping hound, the three standards, the fire and its embers; two heroes in
              the firelight, the valley's charge a shadow; the Lua frames at the edges: the banner, the roll, the
              host's panel, the three charges.
   THE DETAIL the host's panel, setting by setting; the three charges; and the fire in four numbered steps (R10),
              no clocks. */
(function () {
  (document.fonts ? Promise.all([...document.fonts].map((f) => f.load().catch(() => null))).then(() => document.fonts.ready) : Promise.resolve()).then(draw);
  function draw() {
  const { el, render } = window.WALL, F = window.FIG, { text } = window.TOWN;
  const FI = window.MODELS.fire, HM = window.MODELS.horde, EV = window.MODELS.events, FN = window.MODELS.finale;
  const lbl = (g, x, y, s, anchor, size) => text(g, x, y, s, 'pl-lbl', anchor, size || 24);
  const sc = (parts, cx, base, k) => ({ t: 'g', transform: `translate(${cx} ${base}) scale(${k}) translate(${-cx} ${-base})`, kids: parts });
  const mirror = (x, parts) => ({ t: 'g', transform: `translate(${2 * x} 0) scale(-1 1)`, kids: parts });
  const HEROFIG = { bombardier: F.bombardier, marshal: F.marshal, prelate: F.prelate };
  const UNITFIG = { fiend: F.fiend, necro: F.necro, shade: F.shade, webspinner: F.webspinner, ghost: F.ghost, abom: F.abom, frostrev: F.frostrev, lightrev: F.lightrev, grunt: F.grunt };
  const setting = (id) => FI.settings.find((s) => s.id === id), chosen = (id) => { const s = setting(id); return s.options[s.set]; };
  // the Lua frames, as the screen floats them at its edges: dark glass, a gold edge, moonlight lettering
  const ui = (g, x, y, w, h) => el('rect', { x, y, width: w, height: h, rx: 10, style: 'fill:var(--f-sky1);fill-opacity:.88;stroke:var(--f-flag);stroke-width:3' }, g);
  const ut = (g, x, y, s, size, anchor, color) => { const t = text(g, x, y, s, 'pl-lbl', anchor || 'start', size || 20); t.style.fill = color || 'var(--f-moon)'; t.style.stroke = 'none'; return t; };
  const uh = (g, x, y, s, size, anchor) => { const t = text(g, x, y, s, 'st-name', anchor || 'start', size || 20); t.style.fill = 'var(--f-flag)'; return t; };
  const chip = (g, x, y, w, label, on, later, size) => {
    el('rect', { x, y, width: w, height: 40, rx: 8, style: on ? 'fill:var(--f-flag);stroke:var(--f-flag);stroke-width:2' : `fill:none;stroke:var(--f-moon);stroke-width:2${later ? ';stroke-dasharray:5 5;opacity:.5' : ''}` }, g);
    ut(g, x + w / 2, y + 27, label, size || 18, 'middle', on ? 'var(--f-ink)' : 'var(--f-moon)').style.opacity = later ? .5 : 1;
  };

  /* ════════════ THE ART: the screen, two of three at the fire ════════════ */
  const A = document.getElementById('art'), AW = 1900, AH = 1130, GY = 790;
  const sp = [{ t: 'rect', x: 0, y: 0, w: AW, h: GY, rc: 'f-sky1' }, { t: 'rect', x: 0, y: GY - 170, w: AW, h: 170, rc: 'f-sky2' }];
  for (let i = 0; i < 40; i++) sp.push({ t: 'circle', cx: (i * 389) % AW, cy: 20 + (i * 151) % 420, r: 2, rc: 'f-star', anim: 'm-star', delay: (i % 5) * .5 });
  for (let i = 0; i < 26; i++) { const tx = i * 76 + (i % 2) * 20, h = 90 + (i % 4) * 30; sp.push({ t: 'poly', pts: [[tx - 40, GY], [tx, GY - h], [tx + 40, GY]], rc: 'f-tree' }); }
  // the ruined watchtower on the thin woods road (4.4, amended), behind; the dead tree and its crows
  sp.push({ t: 'poly', pts: [[440, GY], [452, GY - 330], [490, GY - 368], [518, GY - 322], [562, GY - 380], [582, GY - 290], [600, GY]], rc: 'f-ruin' }, { t: 'rect', x: 502, y: GY - 260, w: 26, h: 40, rc: 'f-gate' });
  sp.push({ t: 'rect', x: 0, y: GY, w: AW, h: AH - GY, rc: 'f-hill' });
  sp.push({ t: 'path', d: `M1400 ${GY + 40} V${GY - 220} M1400 ${GY - 140} L1340 ${GY - 230} M1400 ${GY - 180} L1460 ${GY - 260} M1430 ${GY - 220} L1466 ${GY - 214} M1370 ${GY - 180} L1336 ${GY - 192}`, rc: 'f-trunk', style: 'fill:none;stroke:var(--f-trunk);stroke-width:14;stroke-linecap:round' });
  for (const [cx, cy] of [[1344, GY - 240], [1456, GY - 272], [1462, GY - 226]]) sp.push(...F.crow(cx, cy));
  // the towns' standards, each behind its hero
  sp.push(sc(F.standard(560, GY + 100, 'hill'), 560, GY + 100, 1.1), sc(F.standard(880, GY + 30, 'valley'), 880, GY + 30, .9), sc(F.standard(1300, GY + 100, 'forest'), 1300, GY + 100, 1.1));
  const scene = el('g', {}, A);
  render(sp, scene);
  // the heroes: the hill's and the forest's in the firelight; the valley's charge unclaimed, a shadow behind the
  // fire (4.2), drawn black and faint
  const pos = { hill: [690, GY + 160, 1.8, true], valley: [1010, GY + 70, 1.35, false], forest: [1220, GY + 160, 1.6, false] };
  const front = [sc(F.campfire(950, GY + 120), 950, GY + 120, 1.4), sc(F.hound(1100, GY + 120), 1100, GY + 120, 1.15)];
  FI.charges.forEach((c) => {
    const [x, b, k, face] = pos[c.town], fig = sc(HEROFIG[c.fig](x, b), x, b, k);
    if (c.player) front.push(face ? mirror(x, [fig]) : fig);
    else render([fig], el('g', { style: 'filter:brightness(0);opacity:.4' }, scene));
  });
  render(front, scene);
  // the Lua frames at the edges (4.1 · 4.3: the default UI hidden)
  const U = el('g', {}, A);
  ui(U, 600, 26, 700, 80); uh(U, 950, 62, 'THE FIRE IS LIT', 26, 'middle');
  ut(U, 950, 92, `${FI.charges.filter((c) => c.player).length} of 3 stand at the fire · the ${FI.charges.find((c) => !c.player).town}'s charge is open`, 18, 'middle');
  const you = FI.charges.find((c) => c.you), [yx] = pos[you.town];
  ui(U, yx - 40, GY - 60, 80, 36); ut(U, yx, GY - 35, 'you', 20, 'middle');
  // the host's panel, right
  ui(U, 1480, 130, 392, 530); uh(U, 1500, 172, "THE HOST'S PANEL", 22);
  FI.settings.forEach((s, i) => {
    const y = 214 + i * 130;
    ut(U, 1500, y, s.name.toUpperCase(), 16, 'start', 'var(--f-flag)');
    const n = s.options.length, cw = (352 - (n - 1) * 8) / n;
    s.options.forEach((o, j) => chip(U, 1500 + j * (cw + 8), y + 14, cw, o.name, j === s.set, o.later, n > 2 ? 14 : 18));
    if (s.options[s.set].note || s.note) ut(U, 1500, y + 78, (s.options[s.set].note || s.note), 14);
  });
  ut(U, 1500, 640, `${FI.charges.find((c) => c.host).player} is host · every player sees each change`, 15);
  // the roll, shown, left: the table's pairs as rolled, the boss, the heroes' order on hard
  ui(U, 28, 130, 392, 470); uh(U, 48, 172, 'THE ROLL, SHOWN', 22);
  const rp = [];
  HM.table.forEach((r, i) => { const cx = 90 + (i % 3) * 120, b = 290 + Math.floor(i / 3) * 120; rp.push(sc(UNITFIG[HM.example[r.night]](cx, b, 0), cx, b, .55)); });
  render(rp, el('g', {}, U));
  HM.table.forEach((r, i) => ut(U, 90 + (i % 3) * 120, 306 + Math.floor(i / 3) * 120, `night ${r.night}`, 15, 'middle'));
  ut(U, 48, 470, `the boss: ${chosen('boss').name}`, 18);
  ut(U, 48, 500, `his herald: ${EV.heroes[FN.bosses.find((b) => b.name === chosen('boss').name).herald].name}`, 16);
  if (chosen('difficulty').name === 'hard') { ut(U, 48, 534, "hard, the heroes' order:", 16); ut(U, 48, 558, EV.hardOrder.map((h) => EV.heroes[h].name.replace('the ', '')).join(' · '), 14); }
  // the three charges, bottom
  FI.charges.forEach((c, i) => {
    const x = 330 + i * 420, y = 930;
    ui(U, x, y, 400, 172); uh(U, x + 20, y + 40, `THE ${c.town.toUpperCase()}`, 22);
    ut(U, x + 20, y + 70, `${c.t3} · ${c.role} · ${c.lean} lean`, 17); ut(U, x + 20, y + 96, c.hero, 18);
    if (c.player) { ut(U, x + 20, y + 146, `${c.player}${c.host ? ' · host' : ''}`, 21); ut(U, x + 380, y + 146, c.you ? 'READY ✓' : 'not ready', 18, 'end', c.you ? 'var(--f-flag)' : 'var(--f-moon)'); }
    else { el('rect', { x: x + 20, y: y + 112, width: 360, height: 46, rx: 8, style: 'fill:var(--f-flag)' }, U); ut(U, x + 200, y + 143, 'TAKE THIS CHARGE', 20, 'middle', 'var(--f-ink)').style.letterSpacing = '.08em'; }
  });
  el('rect', { width: AW, height: AH, class: 'view-frame', style: 'stroke-width:8' }, A);

  /* ════════════ THE HOST'S PANEL (4.x, amended 19 Oct) ════════════ */
  const HP = document.getElementById('host'), HW = 960, HH = 560;
  const H = el('g', { class: 'hand-vellum' }, HP);
  el('rect', { width: HW, height: HH, class: 'view-frame' }, H);
  text(H, 30, 46, "the host's panel", 'sc-kick');
  FI.settings.forEach((s, i) => {
    const y = 104 + i * 118;
    text(H, 30, y + 26, s.name.toUpperCase(), 'st-name', 'start', 20);
    const n = s.options.length, cw = Math.min(200, (HW - 260 - (n - 1) * 12) / n);
    s.options.forEach((o, j) => {
      const x = 230 + j * (cw + 12);
      el('rect', { x, y, width: cw, height: 40, rx: 8, class: j === s.set ? 'pl-wall' : 'pl-old', style: `stroke-width:2.4${o.later ? ';stroke-dasharray:5 5' : ''}${j === s.set ? '' : ';fill:var(--dv-paper)'}` }, H);
      const t = lbl(H, x + cw / 2, y + 27, o.name, 'middle', n > 2 ? 17 : 19); if (j === s.set) { t.style.fill = 'var(--dv-paper)'; t.style.stroke = 'none'; }
    });
    const note = s.id === 'difficulty' ? 'hard: ' + s.options[1].note : s.id === 'length' ? `${s.options[0].note} · ${s.options[1].name}: ${s.options[1].note}` : s.note;
    lbl(H, 230, y + 70, note, 'start', 17);
  });
  lbl(H, 30, 470, 'only the host changes them; every player sees each change', 'start', 19);
  lbl(H, 30, 498, 'synced to every client before the first day (4.1)', 'start', 19);
  lbl(H, 30, HH - 18, 'the fallback: stock dialogs behind one flag in config (4.3)', 'start', 17);

  /* ════════════ THE THREE CHARGES (4.2, amended 19 Oct) ════════════ */
  const CP = document.getElementById('charges'), CW = 960, CH = 620;
  const C = el('g', { class: 'hand-vellum' }, CP);
  el('rect', { width: CW, height: CH, class: 'view-frame' }, C);
  text(C, 30, 46, 'the three charges', 'sc-kick');
  FI.charges.forEach((c, i) => {
    const cx = 170 + i * 310, b = 300;
    render([sc(HEROFIG[c.fig](cx, b), cx, b, c.fig === 'marshal' ? .95 : 1.3)], el('g', {}, CP));
    text(C, cx, 352, `THE ${c.town.toUpperCase()}`, 'st-name', 'middle', 22);
    lbl(C, cx, 380, `${c.t3} · ${c.role}`, 'middle', 18);
    lbl(C, cx, 404, `${c.lean} lean`, 'middle', 17);
    lbl(C, cx, 432, c.hero, 'middle', 19);
  });
  lbl(C, 30, 486, 'one button each, in slot order; no swapping, no override', 'start', 19);
  lbl(C, 30, 514, 'on the click, your hero walks into the firelight', 'start', 19);
  lbl(C, 30, 542, "the unclaimed stands as a shadow; your own is marked 'you'", 'start', 19);
  lbl(C, 30, CH - 18, 'the pick is a role pick: the town, its T3 and its lean (v1 ch. 2, 8)', 'start', 17);

  /* ════════════ THE FIRE, STEP BY STEP (R10) ════════════ */
  const SP = document.getElementById('steps'), SW = 2920, SH = 890;
  const S = el('g', { class: 'hand-vellum' }, SP);
  el('rect', { width: SW, height: SH, class: 'view-frame' }, S);
  text(S, 30, 46, 'the fire, step by step', 'sc-kick');
  // a small screen: the fire, three heroes, the frames as blocks; the step's own frame lit gold
  const mini = (x, y, w, h, k) => {
    const g = el('g', {}, SP), p = [{ t: 'rect', x, y, w, h: h * .72, rc: 'f-sky1' }, { t: 'rect', x, y: y + h * .72, w, h: h * .28, rc: 'f-hill' }];
    p.push(sc(F.campfire(x + w / 2, y + h * .78), x + w / 2, y + h * .78, .35));
    FI.charges.forEach((c, i) => { const hx = x + w * (.36 + i * .14), hb = y + h * .8; if (c.player || k >= 1) p.push(sc(HEROFIG[c.fig](hx, hb), hx, hb, .35)); });
    render(p, g);
    const box = (bx, by, bw, bh, lit) => el('rect', { x: bx, y: by, width: bw, height: bh, rx: 4, style: lit ? 'fill:var(--f-flag);fill-opacity:.55;stroke:var(--f-flag);stroke-width:3' : 'fill:var(--f-sky1);fill-opacity:.7;stroke:var(--f-moon);stroke-width:1.4' }, g);
    box(x + w * .33, y + 8, w * .34, 22, false);
    box(x + 10, y + 42, w * .2, h * .5, k === 2);
    box(x + w * .78, y + 42, w * .2, h * .56, k === 1);
    for (let i = 0; i < 3; i++) box(x + w * (.17 + i * .23), y + h - 48, w * .2, 38, k === 0 ? i === 1 : k === 3);
    if (k === 3) for (let i = 0; i < 3; i++) { const t = text(g, x + w * (.27 + i * .23), y + h - 22, '✓', 'st-name', 'middle', 22); t.style.fill = 'var(--f-ink)'; }
    el('rect', { x, y, width: w, height: h, class: 'view-frame', style: 'stroke-width:3' }, g);
  };
  const colW = (SW - 60) / FI.steps.length;
  FI.steps.forEach((st, i) => {
    const x = 30 + i * colW, fx = x + 100, fy = 120, fw = colW - 130, fh = fw * .62;
    text(S, x + 10, fy + 92, String(i + 1), 'st-num');
    text(S, fx, 100, st.name.toUpperCase(), 'st-name', 'start', 24);
    mini(fx, fy, fw, fh, i);
    st.what.forEach((w, j) => lbl(S, fx, fy + fh + 46 + j * 32, w, 'start', 23));
    if (i < FI.steps.length - 1) el('path', { d: `M${fx + fw + 14} ${fy + fh / 2 - 14} l20 14 l-20 14`, class: 'ln-heavy', style: 'stroke-width:4;fill:none' }, S);
  });
  // after the fourth: the first day (C-101)
  lbl(S, 30, SH - 82, 'no clocks: no pick timers, no countdown, no skip; the scene lasts as long as the table talks (4.2, 4.x, amended 19 Oct)', 'start', 21);
  lbl(S, 30, SH - 52, `the scene: ${FI.scene}, off the playable map, dressed once (4.4) · the default UI hidden, the Lua frames at the edges (4.1)`, 'start', 21);
  lbl(S, 30, SH - 22, 'then the first day: the clock, C-101', 'start', 21);

  /* ════════════ the key, in the title block ════════════ */
  const kt = document.getElementById('keyt'); kt.setAttribute('class', 'hand-vellum');
  const row = (i, drawIt, label) => { const y = 22 + i * 36; drawIt(kt, 40, y); text(kt, 88, y + 8, label, 'tb-text', null, 22); };
  row(0, (q, x, y) => el('rect', { x: x - 22, y: y - 14, width: 44, height: 28, rx: 6, style: 'fill:var(--f-sky1);stroke:var(--f-flag);stroke-width:3' }, q), 'a Lua frame (4.1)');
  row(1, (q, x, y) => el('rect', { x: x - 22, y: y - 12, width: 44, height: 24, rx: 6, style: 'fill:var(--f-flag)' }, q), 'chosen, or a button to press');
  row(2, (q, x, y) => el('rect', { x: x - 22, y: y - 12, width: 44, height: 24, rx: 6, style: 'fill:none;stroke:var(--dv-line);stroke-width:2;stroke-dasharray:5 5' }, q), 'later, not at version one');
  row(3, (q, x, y) => { const g = el('g', { style: 'filter:brightness(0);opacity:.4' }, q); render([sc(F.prelate(x, y + 14), x, y + 14, .3)], g); }, 'an unclaimed charge, a shadow');
  row(4, (q, x, y) => text(q, x, y + 12, '1', 'st-num', 'middle').style.fontSize = '34px', 'a step (R10)');
  row(5, (q, x, y) => text(q, x, y + 8, 'C-101', 'pl-tier', null, 13), 'a sheet');
  }
})();
