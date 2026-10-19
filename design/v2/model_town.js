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

    // 6.3 · 2.6: what a plot can become. Seven, sealed; the eighth slot stays empty. From v1's plot card
    // (chapter 6 II): each button's hotkey (placeholders, v1 says), its icon (24-unit line art), and what
    // its tooltip says it answers, as the needs below. The answers are read off the tooltips, not balanced.
    options: [
      { id: 'farm', name: 'Farm', role: 'res', key: 'F', icon: 'M3 20h18 M5 20v-8l5-4 5 4v8 M4 14l-1 6 M20 14l1 6 M16 12h5', answers: ['food', 'gold'] },
      { id: 'guard', name: 'Guard Tower', role: 'def', key: 'G', icon: 'M8 21V7h8v14 M6 7V4h3v2h2V4h2v2h2V4h3v3', answers: ['ranged'] },
      { id: 'arcane', name: 'Arcane Tower', role: 'def', key: 'T', icon: 'M9 21V9l3-5 3 5v12 M6 21h12', answers: ['casters', 'air'] },
      { id: 'sanctum', name: 'Arcane Sanctum', role: 'off', key: 'A', icon: 'M12 2l3 7h7l-5.5 4 2 7-6.5-4-6.5 4 2-7L2 9h7z', answers: ['magic', 'garrison'] },
      { id: 'workshop', name: 'Workshop', role: 'off', key: 'W', icon: 'M12 9a3 3 0 1 0 0.01 0 M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3', answers: ['siege', 'garrison'] },
      { id: 'market', name: 'Market', role: 'res', key: 'M', icon: 'M3 9l2-5h14l2 5 M3 9h18v3H3z M5 12v8h14v-8 M10 20v-5h4v5', answers: ['items'] },
      { id: 'aviary', name: 'Aviary', role: 'def', key: 'V', icon: 'M3 12c4-6 8-6 9 0 1-6 5-6 9 0 M12 12v8', answers: ['air', 'patrols'] }
    ],
    // what a plot can answer, in the tooltips' words (v1 6 II; the air raid, v1 7: "Riflemen, the Arcane
    // Tower and the Aviary's patrols are the answer")
    needs: [
      { id: 'food', name: 'a bigger army' }, { id: 'gold', name: 'a trickle of gold' }, { id: 'items', name: 'items' },
      { id: 'ranged', name: 'ranged on the wall' }, { id: 'casters', name: 'enemy casters' }, { id: 'air', name: 'the air raid' },
      { id: 'patrols', name: 'patrols at the gate' }, { id: 'magic', name: 'casters, to lead' }, { id: 'siege', name: 'siege, to lead' },
      { id: 'garrison', name: 'feeds the garrison' }
    ],
    roles: { off: { name: 'offensive', spend: 'move' }, def: { name: 'defensive', spend: 'hold' }, res: { name: 'resource', spend: 'pay' } },

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
