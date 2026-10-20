/* model_horde.js — THE HORDE, night by night (the owner's ideas and interview of 19 Oct; docs/HORDE.md; 1.4 · 7 · 9),
   as one model: every night more and stronger, every second night a new unit, on WC3's own tiers. Sheet C-102 draws
   it twice: as the art (the horde on the road, growing night by night, one roll of many) and as the detail (the
   nights' growth, the roll at the fire, the table, the tiers). Levels and HP are the game's own data (docs/UNDEAD.md).
   The nights, the event nights and night 13 come from MODELS.clock; nothing here is a balance value. */
(function () {
  (window.MODELS = window.MODELS || {}).horde = {
    // every night's wave starts from the stock horde (v1's dioramas: ghouls and skeletons)
    base: ['ghoul', 'skeleton'],
    // every night the horde grows in count and in strength; a new unit only every second night, staggered (owner,
    // 19 Oct: "every 2 nights we add a unit"; six new units is good): nights 2, 4, 6, 8, 10, 12, before night 13's boss
    adds: { first: 2, every: 2 },
    // the unit table: each add night brings one of a pair, rolled at setup and shown at the fire (owner, 19 Oct).
    // Night 10 is night 8's pair again, so by the repeat rule both come by night 10
    table: [
      { night: 2, pair: ['fiend', 'necro'] },
      { night: 4, pair: ['necro', 'shade'] },
      { night: 6, pair: ['webspinner', 'ghost'] },
      { night: 8, pair: ['abom', 'frostrev'] },
      { night: 10, pair: ['abom', 'frostrev'] },
      { night: 12, pair: ['lightrev', 'grunt'] }
    ],
    // the repeat rule (owner, 19 Oct): a unit already in is struck from its pair, and the other comes
    repeat: 'the other of the pair',
    // the tiers (owner, 19 Oct): WC3's own tech tiers, the building that unlocks a unit in melee; campaign and neutral
    // undead slot in by level. None comes before its tier's night, on normal and hard alike (the abomination's, 8)
    tiers: [
      { tier: 1, building: 'Necropolis', from: 1, units: ['ghoul', 'skeleton', 'fiend'] },
      { tier: 2, building: 'Halls of the Dead', from: 2, units: ['necro', 'shade', 'webspinner', 'ghost'] },
      { tier: 3, building: 'Black Citadel', from: 8, units: ['abom', 'frostrev', 'grunt', 'lightrev'], hard: ['wyrm'] }
    ],
    // lvl, hp: the game's data (docs/UNDEAD.md); does: what it is to the players
    units: {
      ghoul: { name: 'ghouls', model: 'Ghoul', lvl: 2, hp: 340 },
      skeleton: { name: 'skeletons', model: 'Skeleton Warrior', lvl: 1, hp: 190 },
      fiend: { name: 'spitters', model: 'Crypt Fiend', lvl: 3, hp: 550, does: 'spits from range' },
      necro: { name: 'necromancers', model: 'Necromancer', lvl: 2, hp: 315, does: 'raises the dead' },
      // a regular unit once rolled: weak, it blinks inside the walls (the stock Shade has no attack: one is added in data)
      shade: { name: 'shades', model: 'Shade, with Blink', lvl: 1, hp: 125, does: 'blinks inside the walls' },
      webspinner: { name: 'webspinners', model: 'Nerubian Webspinner', lvl: 3, hp: 350, does: 'webs pin, raises the dead' },
      ghost: { name: 'ghosts', model: 'Ghost', lvl: 3, hp: 300, does: 'hovers; possesses' },
      abom: { name: 'abominations', model: 'Abomination', lvl: 4, hp: 1175, does: 'breaks the gate' },
      frostrev: { name: 'frost revenants', model: 'Frost Revenant', lvl: 4, hp: 450, does: 'blizzard over the wall' },
      lightrev: { name: 'lightning revenants', model: 'Lightning Revenant', lvl: 6, hp: 750, does: 'chain lightning, purge' },
      grunt: { name: 'skeletal orc grunts', model: 'Skeletal Orc Grunt', lvl: 5, hp: 850, does: 'a plain heavy' },
      // hard's one flyer (owner, 19 Oct): Left 2 Die's Spotter; from night 8, a few at a time, on top of the roll
      wyrm: { name: 'frost wyrms', model: 'Frost Wyrm', lvl: 6, hp: 1350, does: 'freezes a tower or barracks', hard: true }
    },
    // the night's aura: one aura per night per difficulty raises the horde's stats in data, no unit edited; one
    // hidden caster per gate, its level set at dusk (owner, 19 Oct: normal and hard). Which stats, how much: open
    difficulties: ['normal', 'hard'],
    aura: { caster: 'one hidden caster per gate', set: 'its level, at dusk', stats: null },
    // the roll the art draws: one of the 24 (night 2 necromancers, so night 4 shades; night 8 abominations, so
    // night 10 frost revenants)
    example: { 2: 'necro', 4: 'shade', 6: 'ghost', 8: 'abom', 10: 'frostrev', 12: 'lightrev' }
  };
})();
