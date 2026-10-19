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

  /* the unit table's new arrivals (the owner, 19 Oct: one of a pair each night, rolled at setup), on stock
     models: the spitter on the Crypt Fiend, the necromancer, the shade (weak, it blinks inside the walls) */
  FIG.fiend = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 34, ry: 7, rc: 'f-aura', dc: null, anim: 'm-tell' },
    { t: 'g', anim: 'm-shamble', delay, kids: [
      ...[-26, -10, 10, 26].map((dx) => ({ t: 'line', x1: cx + dx * .5, y1: base - 22, x2: cx + dx, y2: base, rc: 'f-limb', dc: 'ln-open' })),
      { t: 'ellipse', cx: cx + 8, cy: base - 30, rx: 24, ry: 15, rc: 'f-obelisk', dc: 'ln' },
      { t: 'circle', cx: cx - 18, cy: base - 34, r: 11, rc: 'f-obelisk', dc: 'ln' },
      { t: 'line', x1: cx - 26, y1: base - 30, x2: cx - 34, y2: base - 22, rc: 'f-bones', dc: 'ln-open' },
      { t: 'circle', cx: cx - 22, cy: base - 37, r: 2.6, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'circle', cx: cx - 15, cy: base - 38, r: 2.6, rc: 'f-eye', dc: null, anim: 'm-tell' }
    ] }
  ];
  FIG.necro = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 22, ry: 5, rc: 'f-aura', dc: null, anim: 'm-tell' },
    { t: 'g', anim: 'm-shamble', delay, kids: [
      { t: 'line', x1: cx - 20, y1: base, x2: cx - 26, y2: base - 74, rc: 'f-haft', dc: 'ln-open' },
      { t: 'circle', cx: cx - 26, cy: base - 80, r: 8, rc: 'f-bone', dc: 'ln' },
      { t: 'ellipse', cx: cx - 26, cy: base - 80, rx: 14, ry: 14, rc: 'f-ward', dc: null, anim: 'm-tell' },
      { t: 'poly', pts: [[cx - 16, base], [cx, base - 56], [cx + 16, base]], rc: 'f-robe', dc: 'ln' },
      { t: 'circle', cx, cy: base - 58, r: 11, rc: 'f-robe', dc: 'ln' },
      { t: 'circle', cx: cx - 2, cy: base - 57, r: 6, rc: 'f-bone', dc: null }
    ] }
  ];
  FIG.shade = (cx, base, delay) => [
    { t: 'g', anim: 'm-tell', delay, kids: [
      { t: 'path', d: `M${cx - 16} ${base - 6} C ${cx - 22} ${base - 40}, ${cx - 14} ${base - 70}, ${cx} ${base - 72} C ${cx + 14} ${base - 70}, ${cx + 22} ${base - 40}, ${cx + 16} ${base - 6} L ${cx + 8} ${base - 14} L ${cx} ${base - 4} L ${cx - 8} ${base - 14} Z`, rc: 'f-ward', dc: 'ln' },
      { t: 'circle', cx: cx - 5, cy: base - 56, r: 2.6, rc: 'f-eye', dc: null },
      { t: 'circle', cx: cx + 5, cy: base - 56, r: 2.6, rc: 'f-eye', dc: null }
    ] }
  ];
  /* the abomination: the owner's example of a strong unit held to a later tier (19 Oct). The gut, its stitches,
     a small head, the cleaver */
  FIG.abom = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 40, ry: 9, rc: 'f-aura', dc: null, anim: 'm-tell' },
    { t: 'g', anim: 'm-shamble', delay, kids: [
      { t: 'rect', x: cx - 18, y: base - 26, w: 13, h: 26, rc: 'f-ghoul', dc: 'ln' },
      { t: 'rect', x: cx + 8, y: base - 26, w: 13, h: 26, rc: 'f-ghoul', dc: 'ln' },
      { t: 'line', x1: cx + 24, y1: base - 62, x2: cx + 38, y2: base - 34, rc: 'f-limb', dc: 'ln-open' },
      { t: 'ellipse', cx: cx + 2, cy: base - 54, rx: 32, ry: 30, rc: 'f-ghoul', dc: 'ln' },
      { t: 'path', d: `M${cx - 2} ${base - 74} l8 7 l-8 7 l8 7 l-8 7 l8 7`, rc: 'f-limb', dc: 'ln-open', style: 'stroke:var(--f-ink);stroke-width:2;fill:none' },
      { t: 'circle', cx: cx - 8, cy: base - 88, r: 10, rc: 'f-ghoul', dc: 'ln' },
      { t: 'circle', cx: cx - 12, cy: base - 89, r: 2.6, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'circle', cx: cx - 5, cy: base - 90, r: 2.6, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'line', x1: cx - 26, y1: base - 62, x2: cx - 42, y2: base - 44, rc: 'f-limb', dc: 'ln-open' },
      { t: 'rect', x: cx - 58, y: base - 54, w: 20, h: 26, rx: 2, rc: 'f-steel', dc: 'ln' }
    ] }
  ];

  /* the rest of the unit table (the owner's interview, 19 Oct; docs/HORDE.md), on their stock models: the Nerubian
     Webspinner, the Ghost, the Frost and Lightning Revenants, the Skeletal Orc Grunt, and hard's Frost Wyrm */
  FIG.webspinner = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 32, ry: 7, rc: 'f-aura', dc: null, anim: 'm-tell' },
    { t: 'g', anim: 'm-shamble', delay, kids: [
      ...[[-26, -4], [-12, 6], [12, 12], [28, 20]].map(([dx, k]) => ({ t: 'line', x1: cx + k, y1: base - 24, x2: cx + dx + k * .4, y2: base, rc: 'f-limb', dc: 'ln-open', style: 'stroke:var(--f-obelisk);stroke-width:5;stroke-linecap:round' })),
      { t: 'ellipse', cx: cx + 18, cy: base - 30, rx: 18, ry: 12, rc: 'f-obelisk', dc: 'ln' },
      { t: 'ellipse', cx: cx - 2, cy: base - 44, rx: 11, ry: 18, rc: 'f-obelisk', dc: 'ln' },
      { t: 'circle', cx: cx - 6, cy: base - 66, r: 9, rc: 'f-obelisk', dc: 'ln' },
      ...[[-10, -68], [-5, -70], [-2, -66]].map(([dx, dy]) => ({ t: 'circle', cx: cx + dx, cy: base + dy, r: 2, rc: 'f-eye', dc: null, anim: 'm-tell' })),
      { t: 'line', x1: cx - 8, y1: base - 48, x2: cx - 24, y2: base - 48, rc: 'f-bones', dc: 'ln-open', style: 'stroke:var(--f-obelisk);stroke-width:4;stroke-linecap:round' },
      { t: 'circle', cx: cx - 34, cy: base - 48, r: 12, rc: 'f-ward', dc: null },
      { t: 'path', d: `M${cx - 46} ${base - 48} H${cx - 22} M${cx - 34} ${base - 60} V${base - 36}`, rc: 'f-beam', dc: null, style: 'fill:none' }
    ] }
  ];
  FIG.ghost = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 20, ry: 5, rc: 'f-shadow', dc: null },
    { t: 'g', anim: 'm-hover', delay, kids: [
      { t: 'line', x1: cx - 8, y1: base - 62, x2: cx - 30, y2: base - 54, rc: 'f-limb', dc: 'ln-open', style: 'stroke:var(--f-ghost);stroke-width:7;stroke-linecap:round' },
      { t: 'path', d: `M${cx - 16} ${base - 20} C ${cx - 22} ${base - 54}, ${cx - 12} ${base - 86}, ${cx} ${base - 88} C ${cx + 12} ${base - 86}, ${cx + 20} ${base - 54}, ${cx + 18} ${base - 20} L ${cx + 10} ${base - 26} L ${cx + 4} ${base - 16} L ${cx - 4} ${base - 26} L ${cx - 10} ${base - 16} Z`, rc: 'f-ghost', dc: 'ln' },
      { t: 'ellipse', cx: cx - 3, cy: base - 70, rx: 6, ry: 7, rc: 'f-obelisk', dc: null },
      { t: 'circle', cx: cx - 5, cy: base - 71, r: 2.2, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'circle', cx: cx, cy: base - 71, r: 2.2, rc: 'f-eye', dc: null, anim: 'm-tell' }
    ] }
  ];
  // the revenants share a body: a hovering, legless warrior in plate; frost or lightning by its skin
  const revenant = (cx, base, delay, skin, extra) => [
    { t: 'ellipse', cx, cy: base, rx: 26, ry: 6, rc: 'f-shadow', dc: null },
    { t: 'g', anim: 'm-hover', delay, kids: [
      { t: 'path', d: `M${cx - 18} ${base - 50} L ${cx + 18} ${base - 50} L ${cx + 8} ${base - 18} L ${cx} ${base - 10} L ${cx - 8} ${base - 18} Z`, rc: skin, dc: 'ln' },
      { t: 'rect', x: cx - 16, y: base - 78, w: 32, h: 30, rx: 5, rc: skin, dc: 'ln' },
      { t: 'circle', cx: cx - 18, cy: base - 74, r: 8, rc: 'f-steel', dc: 'ln' },
      { t: 'circle', cx: cx + 18, cy: base - 74, r: 8, rc: 'f-steel', dc: 'ln' },
      { t: 'circle', cx, cy: base - 88, r: 10, rc: 'f-steel', dc: 'ln' },
      { t: 'line', x1: cx - 8, y1: base - 94, x2: cx - 16, y2: base - 106, rc: 'f-bones', dc: 'ln-open' },
      { t: 'line', x1: cx + 8, y1: base - 94, x2: cx + 16, y2: base - 106, rc: 'f-bones', dc: 'ln-open' },
      { t: 'circle', cx: cx - 4, cy: base - 89, r: 2.4, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'circle', cx: cx + 4, cy: base - 89, r: 2.4, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'line', x1: cx - 22, y1: base - 66, x2: cx - 42, y2: base - 98, rc: 'f-blade', dc: 'ln-open' },
      ...extra
    ] }
  ];
  FIG.frostrev = (cx, base, delay) => revenant(cx, base, delay, 'f-frost',
    [[-34, -40], [28, -96], [36, -56], [-40, -110]].map(([dx, dy], i) => ({ t: 'circle', cx: cx + dx, cy: base + dy, r: 3, rc: 'f-star', dc: null, anim: 'm-tell', delay: i * .3 })));
  FIG.lightrev = (cx, base, delay) => revenant(cx, base, delay, 'f-robe', [
    { t: 'path', d: `M${cx - 44} ${base - 104} l10 14 l-8 4 l12 16`, rc: 'f-spark', dc: null, anim: 'm-tell' },
    { t: 'path', d: `M${cx + 30} ${base - 96} l8 12 l-8 4 l10 14`, rc: 'f-spark', dc: null, anim: 'm-tell', delay: .7 }
  ]);
  FIG.grunt = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 32, ry: 7, rc: 'f-aura', dc: null, anim: 'm-tell' },
    { t: 'g', anim: 'm-shamble', delay, kids: [
      { t: 'line', x1: cx - 8, y1: base, x2: cx - 4, y2: base - 34, rc: 'f-bones', dc: 'ln-open', style: 'stroke:var(--f-bone);stroke-width:7;stroke-linecap:round' },
      { t: 'line', x1: cx + 12, y1: base, x2: cx + 6, y2: base - 34, rc: 'f-bones', dc: 'ln-open', style: 'stroke:var(--f-bone);stroke-width:7;stroke-linecap:round' },
      { t: 'rect', x: cx - 18, y: base - 72, w: 36, h: 36, rx: 7, rc: 'f-bone', dc: 'ln' },
      { t: 'path', d: `M${cx - 14} ${base - 62} H${cx + 14} M${cx - 14} ${base - 52} H${cx + 14} M${cx - 14} ${base - 42} H${cx + 14}`, rc: 'f-bones', dc: null, style: 'fill:none;stroke:var(--f-ink);stroke-width:2' },
      { t: 'circle', cx: cx - 20, cy: base - 70, r: 9, rc: 'f-iron', dc: 'ln' },
      { t: 'circle', cx: cx + 20, cy: base - 70, r: 9, rc: 'f-iron', dc: 'ln' },
      { t: 'circle', cx: cx - 2, cy: base - 86, r: 13, rc: 'f-bone', dc: 'ln' },
      { t: 'line', x1: cx - 10, y1: base - 76, x2: cx - 12, y2: base - 84, rc: 'f-bones', dc: 'ln-open', style: 'stroke:var(--f-bone);stroke-width:3' },
      { t: 'circle', cx: cx - 7, cy: base - 88, r: 2.8, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'circle', cx: cx + 2, cy: base - 88, r: 2.8, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'line', x1: cx - 22, y1: base - 56, x2: cx - 34, y2: base - 104, rc: 'f-haft', dc: 'ln-open' },
      { t: 'poly', pts: [[cx - 34, base - 104], [cx - 54, base - 112], [cx - 52, base - 88], [cx - 32, base - 92]], rc: 'f-steel', dc: 'ln' }
    ] }
  ];
  // hard's flyer: high over the ground, its shadow far below
  FIG.wyrm = (cx, base, delay, alt = 110) => {
    const y = base - alt;
    return [
      { t: 'ellipse', cx, cy: base, rx: 40, ry: 7, rc: 'f-shadow', dc: null },
      { t: 'g', anim: 'm-hover', delay, kids: [
        // the wings: bone spars, the membrane torn between them
        { t: 'poly', pts: [[cx - 6, y - 4], [cx - 30, y - 50], [cx - 40, y - 30], [cx - 58, y - 34], [cx - 46, y - 12], [cx - 22, y + 2]], rc: 'f-frost', dc: 'ln' },
        { t: 'poly', pts: [[cx + 8, y - 4], [cx + 34, y - 54], [cx + 44, y - 32], [cx + 64, y - 36], [cx + 50, y - 12], [cx + 24, y + 2]], rc: 'f-frost', dc: 'ln' },
        { t: 'path', d: `M${cx - 6} ${y - 4} L${cx - 30} ${y - 50} M${cx - 14} ${y - 2} L${cx - 58} ${y - 34} M${cx + 8} ${y - 4} L${cx + 34} ${y - 54} M${cx + 16} ${y - 2} L${cx + 64} ${y - 36}`, rc: 'f-bones', dc: null, style: 'fill:none;stroke:var(--f-bone);stroke-width:3;stroke-linecap:round' },
        { t: 'line', x1: cx + 26, y1: y, x2: cx + 60, y2: y + 14, rc: 'f-bones', dc: 'ln-open' },
        { t: 'ellipse', cx, cy: y, rx: 30, ry: 10, rc: 'f-bone', dc: 'ln' },
        { t: 'line', x1: cx - 26, y1: y - 2, x2: cx - 46, y2: y - 14, rc: 'f-bones', dc: 'ln-open' },
        { t: 'poly', pts: [[cx - 44, y - 22], [cx - 70, y - 18], [cx - 66, y - 10], [cx - 44, y - 8]], rc: 'f-bone', dc: 'ln' },
        { t: 'line', x1: cx - 48, y1: y - 24, x2: cx - 54, y2: y - 34, rc: 'f-bones', dc: 'ln-open', style: 'stroke:var(--f-bone);stroke-width:3;stroke-linecap:round' },
        { t: 'circle', cx: cx - 48, cy: y - 16, r: 2.6, rc: 'f-eye', dc: null, anim: 'm-tell' }
      ] }
    ];
  };

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

  /* the horde's four heroes, on their stock hero models (docs/HORDE.md; C-201): each leads its event at one town */
  // the Death Knight leads the fog: armoured, on a dark horse, a frost-lit runeblade
  FIG.deathknight = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 50, ry: 8, rc: 'f-aura', dc: null, anim: 'm-tell' },
    { t: 'g', anim: 'm-march', delay, kids: [
      ...[-32, -16, 16, 30].map((dx) => ({ t: 'rect', x: cx + dx, y: base - 34, w: 8, h: 34, rc: 'f-obelisk', dc: 'ln' })),
      { t: 'line', x1: cx + 44, y1: base - 56, x2: cx + 62, y2: base - 28, rc: 'f-mane', dc: 'ln-open', style: 'stroke:var(--f-eye);stroke-width:5;stroke-linecap:round' },
      { t: 'ellipse', cx, cy: base - 50, rx: 46, ry: 20, rc: 'f-obelisk', dc: 'ln' },
      { t: 'poly', pts: [[cx - 34, base - 58], [cx - 54, base - 92], [cx - 72, base - 84], [cx - 52, base - 50]], rc: 'f-obelisk', dc: 'ln' },
      { t: 'circle', cx: cx - 60, cy: base - 84, r: 2.6, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'poly', pts: [[cx - 4, base - 66], [cx + 26, base - 66], [cx + 34, base - 40], [cx - 8, base - 44]], rc: 'f-robe', dc: 'ln' },
      { t: 'rect', x: cx - 10, y: base - 106, w: 26, h: 40, rx: 6, rc: 'f-steel', dc: 'ln' },
      { t: 'circle', cx: cx + 3, cy: base - 116, r: 11, rc: 'f-steel', dc: 'ln' },
      { t: 'poly', pts: [[cx - 6, base - 124], [cx - 10, base - 138], [cx + 1, base - 126], [cx + 6, base - 140], [cx + 10, base - 125]], rc: 'f-steel', dc: 'ln' },
      { t: 'circle', cx: cx - 2, cy: base - 116, r: 2.4, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'line', x1: cx - 6, y1: base - 88, x2: cx - 40, y2: base - 128, rc: 'f-blade', dc: 'ln-open', style: 'stroke:var(--f-frost);stroke-width:6;stroke-linecap:round' }
    ] }
  ];
  // the Lich leads the insurgents: hovering, icy, crowned, an orb of frost in hand
  FIG.lich = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 26, ry: 6, rc: 'f-shadow', dc: null },
    { t: 'g', anim: 'm-hover', delay, kids: [
      { t: 'path', d: `M${cx - 22} ${base - 14} L ${cx - 12} ${base - 78} L ${cx + 12} ${base - 78} L ${cx + 22} ${base - 14} L ${cx + 8} ${base - 22} L ${cx} ${base - 10} L ${cx - 8} ${base - 22} Z`, rc: 'f-robe', dc: 'ln' },
      { t: 'path', d: `M${cx - 12} ${base - 78} L ${cx} ${base - 50} L ${cx + 12} ${base - 78}`, rc: 'f-frost', dc: 'ln' },
      { t: 'circle', cx, cy: base - 90, r: 12, rc: 'f-frost', dc: 'ln' },
      { t: 'poly', pts: [[cx - 10, base - 98], [cx - 12, base - 112], [cx - 4, base - 102], [cx, base - 116], [cx + 4, base - 102], [cx + 12, base - 112], [cx + 10, base - 98]], rc: 'f-steel', dc: 'ln' },
      { t: 'circle', cx: cx - 4, cy: base - 91, r: 2.4, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'circle', cx: cx + 4, cy: base - 91, r: 2.4, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'line', x1: cx - 10, y1: base - 70, x2: cx - 32, y2: base - 64, rc: 'f-limb', dc: 'ln-open', style: 'stroke:var(--f-frost);stroke-width:6;stroke-linecap:round' },
      { t: 'circle', cx: cx - 38, cy: base - 66, r: 9, rc: 'f-frost', dc: 'ln', anim: 'm-tell' }
    ] }
  ];
  // the Dreadlord leads the air raid: a tall nathrezim, bat wings, horns, claws
  FIG.dreadlord = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 40, ry: 8, rc: 'f-aura', dc: null, anim: 'm-tell' },
    { t: 'g', anim: 'm-shamble', delay, kids: [
      { t: 'poly', pts: [[cx - 6, base - 86], [cx - 50, base - 120], [cx - 44, base - 96], [cx - 58, base - 92], [cx - 36, base - 74], [cx - 8, base - 70]], rc: 'f-obelisk', dc: 'ln' },
      { t: 'poly', pts: [[cx + 6, base - 86], [cx + 50, base - 124], [cx + 46, base - 98], [cx + 60, base - 94], [cx + 38, base - 74], [cx + 8, base - 70]], rc: 'f-obelisk', dc: 'ln' },
      { t: 'line', x1: cx - 8, y1: base, x2: cx - 4, y2: base - 40, rc: 'f-limb', dc: 'ln-open', style: 'stroke:var(--f-robe);stroke-width:8;stroke-linecap:round' },
      { t: 'line', x1: cx + 10, y1: base, x2: cx + 4, y2: base - 40, rc: 'f-limb', dc: 'ln-open', style: 'stroke:var(--f-robe);stroke-width:8;stroke-linecap:round' },
      { t: 'path', d: `M${cx - 14} ${base - 40} L ${cx - 16} ${base - 88} L ${cx + 16} ${base - 88} L ${cx + 14} ${base - 40} Z`, rc: 'f-robe', dc: 'ln' },
      { t: 'circle', cx, cy: base - 98, r: 11, rc: 'f-robe', dc: 'ln' },
      { t: 'path', d: `M${cx - 8} ${base - 106} Q ${cx - 20} ${base - 116} ${cx - 14} ${base - 128} M${cx + 8} ${base - 106} Q ${cx + 20} ${base - 116} ${cx + 14} ${base - 128}`, rc: 'f-bones', dc: null, style: 'fill:none;stroke:var(--f-bone);stroke-width:4;stroke-linecap:round' },
      { t: 'circle', cx: cx - 4, cy: base - 99, r: 2.4, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'circle', cx: cx + 4, cy: base - 99, r: 2.4, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'line', x1: cx - 14, y1: base - 80, x2: cx - 34, y2: base - 56, rc: 'f-limb', dc: 'ln-open', style: 'stroke:var(--f-robe);stroke-width:6;stroke-linecap:round' },
      { t: 'path', d: `M${cx - 34} ${base - 56} l-8 -4 M${cx - 34} ${base - 56} l-8 4 M${cx - 34} ${base - 56} l-6 8`, rc: 'f-bones', dc: null, style: 'fill:none;stroke:var(--f-bone);stroke-width:2.4;stroke-linecap:round' }
    ] }
  ];
  // the Crypt Lord leads the burrow: a great beetle, its carapace spiked (Spiked Carapace)
  FIG.cryptlord = (cx, base, delay) => [
    { t: 'ellipse', cx, cy: base, rx: 62, ry: 10, rc: 'f-aura', dc: null, anim: 'm-tell' },
    { t: 'g', anim: 'm-shamble', delay, kids: [
      ...[[-44, -30], [-24, -10], [0, 8], [24, 26], [44, 40]].map(([dx, k]) => ({ t: 'line', x1: cx + dx * .5, y1: base - 30, x2: cx + dx + k * .2, y2: base, rc: 'f-limb', dc: 'ln-open', style: 'stroke:var(--f-obelisk);stroke-width:6;stroke-linecap:round' })),
      { t: 'ellipse', cx: cx + 10, cy: base - 46, rx: 50, ry: 30, rc: 'f-obelisk', dc: 'ln' },
      ...[-20, 0, 20, 40].map((dx, i) => ({ t: 'poly', pts: [[cx + dx - 8, base - 70 + (i % 2) * 2], [cx + dx, base - 92 + (i % 2) * 4], [cx + dx + 8, base - 70 + (i % 2) * 2]], rc: 'f-bone', dc: 'ln' })),
      { t: 'path', d: `M${cx - 30} ${base - 60} Q ${cx + 10} ${base - 40} ${cx + 52} ${base - 58}`, rc: 'f-bones', dc: null, style: 'fill:none;stroke:var(--f-ghoul);stroke-width:2.4' },
      { t: 'circle', cx: cx - 42, cy: base - 44, r: 14, rc: 'f-obelisk', dc: 'ln' },
      { t: 'path', d: `M${cx - 52} ${base - 38} q -12 4 -16 16 M${cx - 48} ${base - 32} q -6 8 -6 18`, rc: 'f-bones', dc: null, style: 'fill:none;stroke:var(--f-bone);stroke-width:3;stroke-linecap:round' },
      { t: 'circle', cx: cx - 48, cy: base - 48, r: 2.6, rc: 'f-eye', dc: null, anim: 'm-tell' },
      { t: 'circle', cx: cx - 41, cy: base - 50, r: 2.6, rc: 'f-eye', dc: null, anim: 'm-tell' }
    ] }
  ];
  // his pack: a carrion beetle
  FIG.beetle = (cx, base, delay) => [
    { t: 'g', anim: 'm-shamble', delay, kids: [
      ...[-14, -4, 6, 14].map((dx) => ({ t: 'line', x1: cx + dx * .5, y1: base - 10, x2: cx + dx, y2: base, rc: 'f-limb', dc: 'ln-open', style: 'stroke:var(--f-obelisk);stroke-width:3;stroke-linecap:round' })),
      { t: 'ellipse', cx: cx + 2, cy: base - 14, rx: 16, ry: 10, rc: 'f-obelisk', dc: 'ln' },
      { t: 'circle', cx: cx - 14, cy: base - 14, r: 6, rc: 'f-obelisk', dc: 'ln' },
      { t: 'circle', cx: cx - 16, cy: base - 16, r: 1.8, rc: 'f-eye', dc: null }
    ] }
  ];
  // the air raid's Gargoyle, in flight (cx, cy: its body in the air)
  FIG.gargoyle = (cx, cy, delay) => [
    { t: 'g', anim: 'm-hover', delay, kids: [
      { t: 'poly', pts: [[cx - 2, cy - 4], [cx - 30, cy - 30], [cx - 26, cy - 10], [cx - 38, cy - 8], [cx - 16, cy + 4]], rc: 'f-tower', dc: 'ln' },
      { t: 'poly', pts: [[cx + 4, cy - 4], [cx + 32, cy - 32], [cx + 28, cy - 10], [cx + 40, cy - 8], [cx + 18, cy + 4]], rc: 'f-tower', dc: 'ln' },
      { t: 'ellipse', cx, cy, rx: 14, ry: 8, rc: 'f-tower', dc: 'ln' },
      { t: 'circle', cx: cx - 14, cy: cy - 4, r: 6, rc: 'f-tower', dc: 'ln' },
      { t: 'circle', cx: cx - 16, cy: cy - 5, r: 1.8, rc: 'f-eye', dc: null }
    ] }
  ];
  // the burrow's mound, broken out inside the walls
  FIG.mound = (cx, base) => [
    { t: 'path', d: `M${cx - 50} ${base} Q ${cx - 30} ${base - 40} ${cx} ${base - 44} Q ${cx + 30} ${base - 40} ${cx + 50} ${base} Z`, rc: 'f-ruin', dc: 'ln' },
    { t: 'ellipse', cx, cy: base - 22, rx: 18, ry: 10, rc: 'f-gate', dc: null },
    ...[[-34, -14], [28, -18], [-8, -40]].map(([dx, dy]) => ({ t: 'poly', pts: [[cx + dx - 5, base + dy], [cx + dx, base + dy - 12], [cx + dx + 5, base + dy]], rc: 'f-bone', dc: 'ln' }))
  ];
  // a grave in a town's graveyard (7.4: one authored graveyard per town)
  FIG.tomb = (cx, base) => [
    { t: 'path', d: `M${cx - 9} ${base} V${base - 20} A9 9 0 0 1 ${cx + 9} ${base - 20} V${base} Z`, rc: 'f-tower', dc: 'ln' }
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
