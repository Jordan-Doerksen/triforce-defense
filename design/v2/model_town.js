/* model_town.js — THE HILL TOWN, as one model. Sheet X-003 draws it twice from here: as the box art
   (an isometric render in v1's Flash style, the finished set) and as the steps (plans in the sealed
   hand, one per hall tier). Plan coordinates: x east, y south, the town's walls from 0,0 to W,H; the
   north wall, with the gate, faces the wild. Units are drawing units, not game units.
   Sources: v1 chapter 6 (6.1–6.6, sealed 17 Oct), DECISIONS.md 1.5 (the hill), 2.4 (the gate), 2.5
   (plots), 2.6 (roles); v1 chapter 2 · 5 (the hill's special unit, the Castle's gate on it). */
(function () {
  const W = 1000, H = 800;
  (window.MODELS = window.MODELS || {}).town = {
    W, H, name: 'the hill', margin: 70, cliff: 150,

    // 1.5: high ground, a river running through the town, a waterfall at its eastern border. Clarified
    // by the owner on T-101: the mountains ring the hill on the west, north-west and south-west, and the
    // river comes down out of them, so it enters from the west, crosses the town and drops off the east.
    river: [[-70, 112], [70, 124], [190, 170], [310, 228], [450, 250], [600, 262], [800, 250], [W + 70, 270]],
    riverGaps: { west: [86, 150], east: [240, 300] },
    falls: { y: 270 },
    // the massif behind the plateau (drawing units): its reach west and south, its shoulder, its peaks
    mountains: { west: -340, south: H + 300, shoulder: 70, cascade: [98, 126] },
    // and below the falls, at the cliff's foot: the river runs on, east and down, toward the valley
    // (measured from the east cliff, east of the town)
    lowRiver: [[60, 270], [220, 330], [420, 300], [700, 380], [1000, 360]],

    // 2.4: one fixed gate, two scout-tower plots behind the wall flanking it
    gate: { x0: 590, x1: 650 },
    scouts: [[528, 66], [712, 66]],

    // 6.2: the main hall, Town Hall -> Keep -> Castle; each tier opens a ring of two plots
    hall: { x0: 470, y0: 400, x1: 650, y1: 550 },
    tiers: ['Town Hall', 'Keep', 'Castle'],

    // 6.3: the spine stands on the first day: Barracks I, a Farm, the Blacksmith; 6.1: the sites,
    // the Lumber Mill and the gold mine, one peasant each to start, five at most
    spine: [
      { id: 'barracks', name: 'barracks', x0: 90, y0: 560, x1: 250, y1: 650 },
      { id: 'farm', name: 'farm', x0: 470, y0: 640, x1: 540, y1: 700, field: [440, 700, 660, 770] },
      { id: 'smithy', name: 'smithy', x0: 840, y0: 330, x1: 930, y1: 400 },
      { id: 'mill', name: 'mill', x0: 860, y0: 610, x1: 950, y1: 680 },
      { id: 'mine', name: 'mine', x0: 60, y0: 260, x1: 170, y1: 360 }
    ],

    // 6.3: six plots, two to a ring; the rings light with the hall (6.2)
    plots: [
      { ring: 1, x: 340, y: 470 }, { ring: 1, x: 770, y: 480 },
      { ring: 2, x: 360, y: 690 }, { ring: 2, x: 740, y: 690 },
      { ring: 3, x: 470, y: 130 }, { ring: 3, x: 850, y: 140 }
    ],
    plotR: 52,

    // 6.3 · 2.6: what a plot can become. Seven, sealed; the eighth slot stays empty.
    options: [
      { id: 'farm', name: 'Farm', role: 'res' },
      { id: 'guard', name: 'Guard Tower', role: 'def' },
      { id: 'arcane', name: 'Arcane Tower', role: 'def' },
      { id: 'sanctum', name: 'Arcane Sanctum', role: 'off' },
      { id: 'workshop', name: 'Workshop', role: 'off' },
      { id: 'market', name: 'Market', role: 'res' },
      { id: 'aviary', name: 'Aviary', role: 'def' }
    ],

    // the box art shows one build of many: six of the seven, the Arcane Tower left out
    build: ['sanctum', 'workshop', 'farm', 'market', 'guard', 'aviary'],

    // the steps: what each hall tier adds (6.2 · 6.4 · 5.1); `new` is drawn bold on that step
    steps: [
      { tier: 0, rings: [1], parts: [['hall', 1], ['barracks', 1], ['farm', 1], ['smithy', 1, 'I–II'], ['mill', 1, '1/5'], ['mine', 1, '1/5'], ['gate', 1], ['scout', 2], ['plot', 2]] },
      { tier: 1, rings: [1, 2], parts: [['hall', 1], ['plot', 2], ['smithy', 0, 'III–IV'], ['garrison', 0, '▲']] },
      { tier: 2, rings: [1, 2, 3], parts: [['hall', 1], ['plot', 2], ['special', 1], ['smithy', 0, 'V–VI'], ['ultimate', 1], ['garrison', 0, '▲']] }
    ],

    // the hill's special unit, opened by the Castle (2.1 · 5.1)
    special: 'siege', specialAt: [318, 582]
  };
})();
