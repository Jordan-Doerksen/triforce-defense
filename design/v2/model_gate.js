/* model_gate.js — THE GATE (Decisions 2.3 · 2.4 · 6.7), north elevation, as one model.
   Every view of the gate is drawn from this geometry: the render (v1's Flash style) and each
   drawing hand. Change the gate here and every view changes with it.
   Coordinates: a 1440 x 960 view (3:2); the ground line is y = 760. Units are drawing units, not
   game units: no dimension on a sheet is a game value until the terrain pass (Phase 2) seals one.

   A part: { t: shape type, ...geometry, rc: render class, dc: drawing class, hatch, anim }
     rc: null  -> the render skips it (hidden lines, the earth strip)
     dc: null  -> the drawing skips it (the sky, the stars, the moon)
     hatch    -> 'bond' (masonry), 'roof' (shingles), 'earth' (ground)
     t: 'g'   -> a group of kids; anim + origin set its stepped motion in the render
     layer    -> 'towers', 'trees', 'people': so a sheet can stand the scene on its other side (T-201) */
(function () {
  const W = 1440, H = 960, G = 760;
  const parts = [];
  const add = (p) => (parts.push(p), p);

  /* the sky: render only */
  add({ t: 'rect', x: 0, y: 0, w: W, h: G, rc: 'f-sky1', dc: null });
  add({ t: 'rect', x: 0, y: 500, w: W, h: G - 500, rc: 'f-sky2', dc: null });
  add({ t: 'rect', x: 0, y: 650, w: W, h: G - 650, rc: 'f-sky3', dc: null });
  [[60, 70], [250, 44], [330, 130], [470, 80], [560, 170], [640, 52], [110, 260], [392, 214], [24, 380],
   [900, 60], [1060, 120], [1220, 50], [1380, 140], [1300, 260], [820, 150]].forEach(([cx, cy], i) =>
    add({ t: 'circle', cx, cy, r: 2.6, rc: 'f-star', dc: null, anim: 'm-star', delay: (i % 5) * .6 }));
  add({ t: 'circle', cx: 168, cy: 150, r: 46, rc: 'f-moon', dc: null });
  add({ t: 'circle', cx: 152, cy: 140, r: 9, rc: 'f-crater', dc: null });
  add({ t: 'circle', cx: 182, cy: 166, r: 6, rc: 'f-crater', dc: null });

  /* the land behind: hills, then the ground and the road */
  add({ t: 'path', d: 'M0 640 C 120 590, 220 580, 330 615 S 560 600, 700 590 S 980 570, 1110 605 S 1330 600, 1440 585 V760 H0 Z', rc: 'f-hill', dc: 'ln-fine' });
  add({ t: 'rect', x: 0, y: G, w: W, h: H - G, rc: 'f-ground', dc: null });
  add({ t: 'rect', x: 0, y: G, w: W, h: 28, rc: null, dc: 'ln-none', hatch: 'earth' });
  add({ t: 'poly', pts: [[640, G], [800, G], [1010, H], [430, H]], rc: 'f-road', dc: 'ln-thin' });

  /* the two scout towers, behind the wall (2.4, amended: two scout-tower plots behind the wall flanking the gate) */
  for (const cx of [430, 1010]) {
    add({ t: 'rect', x: cx - 60, y: 330, w: 120, h: G - 330, rc: 'f-tower', dc: 'ln', layer: 'towers' });
    add({ t: 'poly', pts: [[cx - 78, 330], [cx, 212], [cx + 78, 330]], rc: 'f-roof', dc: 'ln', hatch: 'roof', layer: 'towers' });
    add({ t: 'rect', x: cx - 12, y: 372, w: 24, h: 44, rc: 'f-win', dc: 'ln', anim: 'm-win', layer: 'towers' });
  }

  /* the curtain wall and its merlons */
  add({ t: 'rect', x: 0, y: 470, w: W, h: G - 470, rc: 'f-wall', dc: 'ln', hatch: 'bond' });
  for (let x = 0; x < W; x += 64) if (x + 50 < 560 || x > 880) add({ t: 'rect', x: x + 14, y: 436, w: 36, h: 34, rc: 'f-merlon', dc: 'ln' });
  for (let y = 528; y < G; y += 58) add({ t: 'line', x1: 0, y1: y, x2: W, y2: y, rc: 'f-course', dc: null });

  /* the gatehouse (2.4: one fixed gate structure per town, identical in every town) */
  add({ t: 'rect', x: 560, y: 330, w: 320, h: G - 330, rc: 'f-wall', dc: 'ln', hatch: 'bond' });
  for (let i = 0; i < 6; i++) add({ t: 'rect', x: 560 + i * 56, y: 296, w: 40, h: 34, rc: 'f-merlon', dc: 'ln' });
  for (let y = 388; y < G; y += 58) add({ t: 'line', x1: 560, y1: y, x2: 880, y2: y, rc: 'f-course', dc: null });
  add({ t: 'path', d: 'M640 760 V600 A80 80 0 0 1 800 600 V760 Z', rc: 'f-arch', dc: 'ln-heavy-fill' });
  for (const x of [656, 688, 720, 752, 784]) {
    const top = 600 - Math.sqrt(80 * 80 - (x - 720) * (x - 720)) + 6;
    add({ t: 'line', x1: x, y1: top, x2: x, y2: G, rc: 'f-bars', dc: 'ln-thin' });
  }
  for (const y of [616, 656, 696, 736]) add({ t: 'line', x1: 644, y1: y, x2: 796, y2: y, rc: 'f-bars', dc: 'ln-thin' });
  add({ t: 'rect', x: 594, y: 388, w: 34, h: 58, rc: 'f-win', dc: 'ln', anim: 'm-win' });
  add({ t: 'rect', x: 812, y: 388, w: 34, h: 58, rc: 'f-win', dc: 'ln', anim: 'm-win' });
  for (const cx of [615, 825]) {
    add({ t: 'rect', x: cx - 5, y: 548, w: 10, h: 26, rc: 'f-iron', dc: 'ln' });
    add({ t: 'path', d: `M${cx} 516 C ${cx - 13} 531, ${cx - 9} 545, ${cx} 548 C ${cx + 9} 545, ${cx + 13} 531, ${cx} 516 Z`, rc: 'f-flame', dc: 'ln-thin', anim: 'm-flame' });
  }
  add({ t: 'line', x1: 720, y1: 296, x2: 720, y2: 186, rc: 'f-pole', dc: 'ln-open' });
  add({ t: 'poly', pts: [[724, 192], [812, 202], [792, 222], [814, 244], [724, 238]], rc: 'f-flag', dc: 'ln', anim: 'm-flag' });

  /* the landscaping: conifers and bushes either side of the road */
  const tree = (cx, base, h, w) => {
    add({ t: 'rect', x: cx - 9, y: base - 34, w: 18, h: 34, rc: 'f-trunk', dc: 'ln', layer: 'trees' });
    for (let i = 0; i < 3; i++) {
      const bot = base - 28 - i * h * .22, top = bot - h * .42, hw = (w / 2) * (1 - i * .22);
      add({ t: 'poly', pts: [[cx - hw, bot], [cx, top], [cx + hw, bot]], rc: 'f-tree', dc: 'ln', layer: 'trees' });
    }
  };
  tree(140, G + 6, 236, 196); tree(252, G + 4, 182, 150); tree(1188, G + 4, 182, 150); tree(1300, G + 6, 236, 196);
  add({ t: 'ellipse', cx: 336, cy: G - 4, rx: 46, ry: 24, rc: 'f-bush', dc: 'ln', layer: 'trees' });
  add({ t: 'ellipse', cx: 1104, cy: G - 4, rx: 46, ry: 24, rc: 'f-bush', dc: 'ln', layer: 'trees' });

  /* the people: two of the garrison at the gate (2.3), two of the repair crew (6.7). Scale figures (figures.js). */
  parts.push(...[...FIG.footman(604, G), ...FIG.footman(836, G), ...FIG.peasant(520, G, true), ...FIG.peasant(924, G, false)].map((p) => ({ ...p, layer: 'people' })));

  /* hidden lines: the towers run down behind the wall (drawing only, dashed, drawn last) */
  for (const cx of [430, 1010]) {
    add({ t: 'line', x1: cx - 60, y1: 470, x2: cx - 60, y2: G, rc: null, dc: 'ln-hidden', last: true });
    add({ t: 'line', x1: cx + 60, y1: 470, x2: cx + 60, y2: G, rc: null, dc: 'ln-hidden', last: true });
  }

  /* the drawing's notes: centrelines, levels, a dimension chain, keyed tags. The key lives in the title block. */
  const notes = {
    centres: [{ x: 720, y1: 150, y2: 935, grid: '1' }, { x: 1010, y1: 150, y2: 935, grid: '2' }],
    levels: [
      { y: 212, from: 1010, label: '[+548]' },
      { y: 330, from: 1088, label: '[+430]' },
      { y: 470, from: null, label: '[+290]' },
      { y: G, from: null, label: '[±0]' }
    ],
    levelX: 1412,
    dims: [{ y: 905, from: 792, xs: [720, 950, 1070], labels: ['[230]', '[120]'] }],
    tags: [
      { n: 1, at: [756, 676], tag: [934, 560] },   // the gate
      { n: 2, at: [1040, 296], tag: [1150, 232] }, // a scout-tower plot
      { n: 3, at: [930, 712], tag: [1034, 690] },  // the repair crew
      { n: 4, at: [840, 716], tag: [784, 846] }    // the garrison
    ]
  };

  (window.MODELS = window.MODELS || {}).gate = { W, H, G, parts, notes, seam: 684 };
})();
