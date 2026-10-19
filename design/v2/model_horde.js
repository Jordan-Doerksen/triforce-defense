/* model_horde.js — THE HORDE, night by night (the owner's ideas of 19 Oct, shaped by the owner's answers; 1.4 ·
   7 · 9), as one model: every night more and stronger, every second night a new unit. Sheet C-102 draws it twice:
   as the art (the horde on the road, growing night by night, one roll of many) and as the detail (the nights'
   growth, the table rolled at the fire, the tiers, the shade's answer).
   The nights, the event nights and night 13 come from MODELS.clock; nothing here is a balance value. */
(function () {
  (window.MODELS = window.MODELS || {}).horde = {
    // every night's wave starts from the stock horde (v1's dioramas: ghouls and skeletons)
    base: ['ghoul', 'skeleton'],
    // every night the horde grows in count and in strength; a new unit only every second night, staggered (owner,
    // 19 Oct: "every 2 nights we add a unit"; six new units is good): nights 2, 4, 6, 8, 10, 12, before night 13's boss
    adds: { first: 2, every: 2 },
    // the unit table: each add night brings one of a pair, rolled at setup and shown at the fire (owner, 19 Oct).
    // The owner named two pairs (said for nights 2 and 3, before adds came every second night); the rest is to come
    table: [{ night: 2, pair: ['fiend', 'necro'] }, { night: 4, pair: ['necro', 'shade'] }],
    // the repeat rule (owner, 19 Oct): a unit already in is struck from its pair, and the other comes
    // (night 2 necromancers, so night 4 shades)
    repeat: 'the other of the pair',
    // the tiers (owner, 19 Oct): units are staged by how strong they are, and none comes before its tier's night,
    // the same on normal and hard ("abom tier units come night 8+, regardless of difficulty"). As Mindustry's unit
    // ladders and Shattered Pixel Dungeon's mob rotation by depth stage theirs
    tiers: [
      { from: 1, units: ['ghoul', 'skeleton'] },
      { from: 2, units: ['fiend', 'necro'] },
      { from: 4, units: ['shade'] },
      { from: 8, units: ['abom'], name: "the abomination's tier" }
    ],
    units: {
      ghoul: { name: 'ghouls', model: 'Ghoul' }, skeleton: { name: 'skeletons', model: 'Skeleton Warrior' },
      fiend: { name: 'spitters', model: 'Crypt Fiend', does: 'spits from range' },
      necro: { name: 'necromancers', model: 'Necromancer', does: 'raises the dead' },
      // a regular unit once rolled (owner, 19 Oct): weak, it blinks inside the walls; a tower or units inside answer it
      shade: { name: 'shades', model: 'Shade, with Blink', does: 'blinks inside the walls' },
      abom: { name: 'abominations', model: 'Abomination' }
    },
    // the night's aura: one aura per night per difficulty raises the horde's stats in data, no unit edited; one
    // hidden caster per gate, its level set at dusk (owner, 19 Oct: normal and hard). Which stats, how much: open
    difficulties: ['normal', 'hard'],
    aura: { caster: 'one hidden caster per gate', set: 'its level, at dusk', stats: null },
    // the roll the art draws: one of the three (night 2 necromancers, so night 4 shades, the other of the pair)
    example: { 2: 'necro', 4: 'shade' }
  };
})();
