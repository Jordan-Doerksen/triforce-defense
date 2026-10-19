/* model_clock.js — THE CLOCK, as data. Both faces of sheet X-002 are computed from this file: the art
   (one cycle, split day | night in proportion) and the detail (the match, to scale). Change the day's
   length here and the painting re-proportions with the score.
   Every value cites its decision. `test: true` marks a value that is a first test, not sealed: the
   sheet brackets it, [4]. Sources: DECISIONS.md 1.4, and v1 (Triforce-Defense.html) chapters 3, 4,
   6, 7 and 9, which hold the decisions sealed 16–17 Oct that are not yet in DECISIONS.md. */
(function () {
  (window.MODELS = window.MODELS || {}).clock = {
    // 1.4 day/night is the clock. The test cycle, in seconds: the owner, 19 Oct, after X-002's finding,
    // cut it from six minutes (4:00 + 2:00) to four, keeping the 2 : 1 shape. Day length lives in config
    // and is still open (7.5); the walk decides it.
    cycle: { day: 160, night: 80, test: true },

    // v1 ch.7: "A match is thirteen nights" (sealed 16 Oct); hard mode doubles it, planned for later.
    nights: 13,

    // v1's mode card read "13 nights · ~40 min"; the council of 17 Oct unsealed the forty minutes.
    v1Label: { minutes: 40, sealed: false },

    // 7.1 · 7.5: event nights 3, 6, 9 and 12, known in advance, announced at dusk with a visible tell.
    // Nights 3, 6, 9 draw the three events in a random order, no repeats; night 12 draws any, at full
    // strength. Everything scales with which event night it is: weakest first, strongest last.
    events: {
      pool: ['fog', 'air', 'insurgents'],          // 7.2 the evil fog · 7.3 the air raid · 7.4 the insurgents
      draws: [3, 6, 9],
      last: 12,
      announced: 'dusk'
    },

    // 9.3 · 9.4: night 13, the boss and three lieutenants, three prongs. The boss takes the middle road
    // to the valley; each lieutenant still standing marches on the town it was built to blunt.
    finale: { night: 13, boss: 'valley', lieutenants: [['brute', 'hill'], ['spider', 'valley'], ['lich', 'forest']] },

    // 3.3: every dawn, one bounty champion at one of six marked spots, worth loot if dead by dusk.
    bounty: { spots: 6 },

    // 4.x: the match opens at the fire, before the first day. 9.5: night 13 held, at dawn, the relief.
    opens: 'fire', closes: 'relief',

    // 1.4: the undead take a large debuff by day and a large buff on blight; the night buff needs a
    // visible tell on the unit. The values live in config and are open.
    undead: { day: -1, night: 1, blight: 2, values: null },

    // v1 ch.7: hard mode, 26 nights, an event every third night, repeats allowed. Planned.
    hard: { nights: 26, every: 3, planned: true }
  };
})();
