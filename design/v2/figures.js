/* figures.js — the entourage: every person, beast and machine a sheet's render draws, as model parts
   (see model_gate.js for the part format). One figure, one function, so every sheet draws the same
   footman. cx is the figure's centre, base the ground under its feet. Facing left unless noted. */
(function () {
  const FIG = {};

  FIG.footman = (cx, base) => [
    { t: 'ellipse', cx, cy: base, rx: 22, ry: 5, rc: 'f-shadow', dc: null },
    { t: 'rect', x: cx - 12, y: base - 22, w: 9, h: 22, rc: 'f-steel', dc: 'ln' },
    { t: 'rect', x: cx + 3, y: base - 22, w: 9, h: 22, rc: 'f-steel', dc: 'ln' },
    { t: 'line', x1: cx + 16, y1: base - 30, x2: cx + 30, y2: base - 66, rc: 'f-blade', dc: 'ln-open' },
    { t: 'rect', x: cx - 16, y: base - 54, w: 32, h: 34, rx: 6, rc: 'f-tunic', dc: 'ln' },
    { t: 'circle', cx, cy: base - 64, r: 11, rc: 'f-skin', dc: 'ln' },
    { t: 'path', d: `M${cx - 13} ${base - 64} A13 13 0 0 1 ${cx + 13} ${base - 64} Z`, rc: 'f-steel', dc: 'ln' },
    { t: 'poly', pts: [[cx - 32, base - 52], [cx - 14, base - 52], [cx - 14, base - 32], [cx - 23, base - 20], [cx - 32, base - 32]], rc: 'f-shield', dc: 'ln' }
  ];

  FIG.peasant = (cx, base, swing) => [
    { t: 'ellipse', cx, cy: base, rx: 20, ry: 5, rc: 'f-shadow', dc: null },
    { t: 'rect', x: cx - 11, y: base - 20, w: 8, h: 20, rc: 'f-smock', dc: 'ln' },
    { t: 'rect', x: cx + 3, y: base - 20, w: 8, h: 20, rc: 'f-smock', dc: 'ln' },
    { t: 'rect', x: cx - 15, y: base - 48, w: 30, h: 30, rx: 8, rc: 'f-smock', dc: 'ln' },
    { t: 'circle', cx, cy: base - 58, r: 10, rc: 'f-skin', dc: 'ln' },
    { t: 'g', anim: swing ? 'm-hammer' : null, origin: [cx + 12, base - 36], kids: [
      { t: 'line', x1: cx + 12, y1: base - 36, x2: cx + 34, y2: base - 58, rc: 'f-haft', dc: 'ln-open' },
      { t: 'rect', x: cx + 26, y: base - 70, w: 20, h: 12, rc: 'f-iron', dc: 'ln' }
    ] }
  ];

  /* the horde: a ghoul, hunched, reaching left. The aura and the eyes are the night buff's tell (1.4). */
  FIG.ghoul = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 28, ry: 7, rc: 'f-aura', dc: null, anim: 'm-tell' },
    { t: 'g', anim: 'm-shamble', delay, kids: [
      { t: 'rect', x: cx - 9, y: base - 22, w: 7, h: 22, rc: 'f-ghoul', dc: 'ln' },
      { t: 'rect', x: cx + 5, y: base - 20, w: 7, h: 20, rc: 'f-ghoul', dc: 'ln' },
      { t: 'ellipse', cx: cx + 3, cy: base - 36, rx: 17, ry: 19, rc: 'f-ghoul', dc: 'ln' },
      { t: 'line', x1: cx - 6, y1: base - 42, x2: cx - 30, y2: base - 34, rc: 'f-limb', dc: 'ln-open' },
      { t: 'circle', cx: cx - 10, cy: base - 54, r: 11, rc: 'f-ghoul', dc: 'ln' },
      { t: 'circle', cx: cx - 15, cy: base - 56, r: 2.8, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'circle', cx: cx - 7, cy: base - 57, r: 2.8, rc: 'f-eye', dc: null, anim: 'm-tell' }
    ] }
  ];

  FIG.skeleton = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 24, ry: 6, rc: 'f-aura', dc: null, anim: 'm-tell' },
    { t: 'g', anim: 'm-shamble', delay, kids: [
      { t: 'line', x1: cx - 6, y1: base, x2: cx - 2, y2: base - 26, rc: 'f-bones', dc: 'ln-open' },
      { t: 'line', x1: cx + 8, y1: base, x2: cx + 2, y2: base - 26, rc: 'f-bones', dc: 'ln-open' },
      { t: 'rect', x: cx - 11, y: base - 52, w: 22, h: 26, rx: 4, rc: 'f-bone', dc: 'ln' },
      { t: 'line', x1: cx - 10, y1: base - 44, x2: cx - 34, y2: base - 60, rc: 'f-blade', dc: 'ln-open' },
      { t: 'circle', cx, cy: base - 62, r: 10, rc: 'f-bone', dc: 'ln' },
      { t: 'circle', cx: cx - 4, cy: base - 63, r: 2.6, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'circle', cx: cx + 4, cy: base - 63, r: 2.6, rc: 'f-eye', dc: null, anim: 'm-tell' }
    ] }
  ];

  /* a captain on horseback with the town's banner (the field force's head) */
  FIG.rider = (cx, base) => [
    { t: 'ellipse', cx, cy: base, rx: 48, ry: 7, rc: 'f-shadow', dc: null },
    { t: 'g', anim: 'm-march', kids: [
      { t: 'rect', x: cx - 32, y: base - 34, w: 8, h: 34, rc: 'f-horse', dc: 'ln' },
      { t: 'rect', x: cx - 16, y: base - 34, w: 8, h: 34, rc: 'f-horse', dc: 'ln' },
      { t: 'rect', x: cx + 16, y: base - 34, w: 8, h: 34, rc: 'f-horse', dc: 'ln' },
      { t: 'rect', x: cx + 30, y: base - 34, w: 8, h: 34, rc: 'f-horse', dc: 'ln' },
      { t: 'line', x1: cx + 44, y1: base - 56, x2: cx + 60, y2: base - 30, rc: 'f-mane', dc: 'ln-open' },
      { t: 'ellipse', cx, cy: base - 50, rx: 46, ry: 20, rc: 'f-horse', dc: 'ln' },
      { t: 'poly', pts: [[cx - 34, base - 58], [cx - 54, base - 92], [cx - 72, base - 84], [cx - 52, base - 50]], rc: 'f-horse', dc: 'ln' },
      { t: 'line', x1: cx - 50, y1: base - 92, x2: cx - 34, y2: base - 62, rc: 'f-mane', dc: 'ln-open' },
      { t: 'rect', x: cx - 10, y: base - 104, w: 24, h: 38, rx: 6, rc: 'f-tunic', dc: 'ln' },
      { t: 'circle', cx: cx + 2, cy: base - 114, r: 11, rc: 'f-skin', dc: 'ln' },
      { t: 'path', d: `M${cx - 11} ${base - 114} A13 13 0 0 1 ${cx + 15} ${base - 114} Z`, rc: 'f-steel', dc: 'ln' },
      { t: 'line', x1: cx + 8, y1: base - 70, x2: cx - 6, y2: base - 178, rc: 'f-pole', dc: 'ln-open' },
      { t: 'poly', pts: [[cx - 6, base - 176], [cx - 52, base - 166], [cx - 38, base - 154], [cx - 54, base - 142], [cx - 6, base - 146]], rc: 'f-flag', dc: 'ln', anim: 'm-flag' }
    ] }
  ];

  /* a siege engine (the hill's special unit; Win B runs through it, 2.1 · 9.2) */
  FIG.siege = (cx, base) => [
    { t: 'ellipse', cx, cy: base, rx: 70, ry: 8, rc: 'f-shadow', dc: null },
    { t: 'g', anim: 'm-march', kids: [
      { t: 'circle', cx: cx + 40, cy: base - 112, r: 12, rc: 'f-smoke', dc: null, anim: 'm-puff' },
      { t: 'rect', x: cx + 30, y: base - 104, w: 16, h: 36, rc: 'f-iron', dc: 'ln' },
      { t: 'rect', x: cx - 100, y: base - 66, w: 46, h: 16, rc: 'f-steel', dc: 'ln' },
      { t: 'rect', x: cx - 62, y: base - 78, w: 124, h: 50, rx: 10, rc: 'f-bronze', dc: 'ln' },
      { t: 'circle', cx: cx - 38, cy: base - 16, r: 16, rc: 'f-wheel', dc: 'ln' },
      { t: 'circle', cx, cy: base - 16, r: 16, rc: 'f-wheel', dc: 'ln' },
      { t: 'circle', cx: cx + 38, cy: base - 16, r: 16, rc: 'f-wheel', dc: 'ln' }
    ] }
  ];

  FIG.acolyte = (cx, base) => [
    { t: 'poly', pts: [[cx - 15, base], [cx, base - 48], [cx + 15, base]], rc: 'f-robe', dc: 'ln' },
    { t: 'circle', cx, cy: base - 46, r: 10, rc: 'f-robe', dc: 'ln' },
    { t: 'circle', cx: cx - 2, cy: base - 45, r: 5, rc: 'f-gate', dc: null }
  ];

  /* a ritual: the obelisk on blight, shielded while its acolytes channel (9.1) */
  FIG.ritual = (cx, base, h) => {
    const p = [
      { t: 'ellipse', cx, cy: base + 6, rx: 250, ry: 52, rc: 'f-blight', dc: 'ln' },
      { t: 'ellipse', cx: cx + 30, cy: base + 12, rx: 150, ry: 26, rc: 'f-blight2', dc: null },
      // the destroyed village it stands in (9.1)
      { t: 'poly', pts: [[cx - 230, base - 2], [cx - 230, base - 70], [cx - 214, base - 58], [cx - 200, base - 84], [cx - 186, base - 50], [cx - 170, base - 62], [cx - 170, base - 2]], rc: 'f-ruin', dc: 'ln' },
      { t: 'poly', pts: [[cx + 150, base + 4], [cx + 150, base - 52], [cx + 166, base - 40], [cx + 180, base - 66], [cx + 196, base - 30], [cx + 196, base + 4]], rc: 'f-ruin', dc: 'ln' },
      { t: 'ellipse', cx, cy: base - h / 2, rx: 70, ry: h / 2 + 40, rc: 'f-ward', dc: 'ln-hidden', anim: 'm-tell' },
      { t: 'poly', pts: [[cx - 24, base], [cx - 15, base - h], [cx, base - h - 30], [cx + 15, base - h], [cx + 24, base]], rc: 'f-obelisk', dc: 'ln' },
      { t: 'line', x1: cx, y1: base - h + 14, x2: cx, y2: base - 24, rc: 'f-rune', dc: null, anim: 'm-tell' }
    ];
    for (const [dx, dy] of [[-120, 18], [110, 22], [-10, 40]]) {
      p.push({ t: 'line', x1: cx + dx, y1: base + dy - 40, x2: cx, y2: base - h / 2, rc: 'f-beam', dc: null, anim: 'm-tell' });
      p.push(...FIG.acolyte(cx + dx, base + dy));
    }
    return p;
  };

  /* a gryphon of the Aviary's patrol, in flight (2.6: defensive only, uncontrolled) */
  FIG.gryphon = (cx, cy) => [
    { t: 'path', d: `M${cx - 6} ${cy - 6} C ${cx - 10} ${cy - 40}, ${cx + 26} ${cy - 46}, ${cx + 34} ${cy - 30} C ${cx + 18} ${cy - 28}, ${cx + 10} ${cy - 16}, ${cx + 8} ${cy - 4} Z`, rc: 'f-horse', dc: 'ln' },
    { t: 'ellipse', cx: cx + 6, cy, rx: 30, ry: 12, rc: 'f-flag', dc: 'ln' },
    { t: 'line', x1: cx + 34, y1: cy, x2: cx + 50, y2: cy + 8, rc: 'f-limb', dc: 'ln-open' },
    { t: 'circle', cx: cx - 26, cy: cy - 6, r: 10, rc: 'f-horse', dc: 'ln' },
    { t: 'poly', pts: [[cx - 35, cy - 8], [cx - 46, cy - 2], [cx - 34, cy - 1]], rc: 'f-flag', dc: 'ln' },
    { t: 'path', d: `M${cx - 2} ${cy - 4} C ${cx - 20} ${cy - 30}, ${cx - 4} ${cy - 50}, ${cx + 14} ${cy - 44} C ${cx + 6} ${cy - 30}, ${cx + 8} ${cy - 16}, ${cx + 12} ${cy - 6} Z`, rc: 'f-horse', dc: 'ln' }
  ];

  FIG.sun = (cx, cy) => [
    ...Array.from({ length: 8 }, (_, i) => {
      const a = i * Math.PI / 4;
      return { t: 'line', x1: cx + 58 * Math.cos(a), y1: cy + 58 * Math.sin(a), x2: cx + 78 * Math.cos(a), y2: cy + 78 * Math.sin(a), rc: 'f-ray', dc: null };
    }),
    { t: 'circle', cx, cy, r: 46, rc: 'f-sun', dc: null }
  ];

  FIG.moon = (cx, cy) => [
    { t: 'circle', cx, cy, r: 44, rc: 'f-moon', dc: null },
    { t: 'circle', cx: cx - 15, cy: cy - 10, r: 9, rc: 'f-crater', dc: null },
    { t: 'circle', cx: cx + 14, cy: cy + 16, r: 6, rc: 'f-crater', dc: null }
  ];

  window.FIG = FIG;
})();
