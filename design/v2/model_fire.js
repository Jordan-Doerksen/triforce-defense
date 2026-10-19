/* model_fire.js — THE FIRE, before the first day (v1 ch. 4, sealed 17 Oct; amended by the owner, 19 Oct;
   docs/HORDE.md), as one model. Sheet S-101 draws it: the art is the screen itself, the scene and its Lua frames,
   two of three charges taken; the detail gives the host's panel, the three charges, and the fire step by step. */
(function () {
  (window.MODELS = window.MODELS || {}).fire = {
    // 4.2, amended: one button per charge, in lobby-slot order, no timer (19 Oct), no swapping, no override. On the
    // click the town's fixed hero walks into the firelight (5.1); the unclaimed charge stands as a shadow. The
    // charge shows the town's T3 and its lean, so the pick is a role pick. Lobby names are v1's placeholders
    charges: [
      { town: 'hill', t3: 'Siege Engine', role: 'break', lean: 'armour', hero: 'the Bombardier', fig: 'bombardier', player: 'Jordan', host: true, you: true },
      { town: 'valley', t3: 'Knight', role: 'move', lean: 'speed', hero: 'the Marshal', fig: 'marshal', player: null },
      { town: 'forest', t3: 'Templar', role: 'hold', lean: 'damage', hero: 'the Prelate', fig: 'prelate', player: 'Riley' }
    ],
    // the host's panel (4.x, amended 19 Oct): three settings; every player sees each change; only the host changes
    // them; synced to every client before the first day (4.1); stock dialogs behind one flag as the fallback (4.3)
    settings: [
      { id: 'length', name: 'length', set: 0, options: [{ name: '13 nights', note: 'the clock, C-101' }, { name: 'the long night', note: '26, later', later: true }] },
      { id: 'difficulty', name: 'difficulty', set: 1, options: [{ name: 'normal' }, { name: 'hard', note: 'the hard aura, a hero every night, the Frost Wyrm' }] },
      { id: 'boss', name: 'the boss', set: 0, options: [{ name: "Mal'Ganis" }, { name: 'Arthas' }, { name: "Kel'Thuzad" }, { name: 'roll' }], note: 'his herald all match, W-102' }
    ],
    // no clocks (owner, 19 Oct): no pick timers, no countdown, no skip; the scene lasts as long as the table talks,
    // and the first day begins when all three press Ready
    steps: [
      { name: 'take a charge', what: ['one button each, in slot order', 'your hero walks into the firelight'] },
      { name: 'the host sets the match', what: ['length, difficulty, the boss', 'every player sees each change'] },
      { name: 'the roll, shown', what: ["the table's pairs, the boss", "on hard, the heroes' order"] },
      { name: 'three Readys', what: ['the first day begins', 'no clock: as long as you talk'] }
    ],
    // the scene: the ruined watchtower on the thin woods road, off the playable map, dressed once (4.4, amended)
    scene: 'the ruined watchtower on the thin woods road'
  };
})();
