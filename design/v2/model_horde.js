/* model_horde.js — THE HORDE, night by night (the owner's ideas of 19 Oct, shaped by the owner's three answers; 1.4 ·
   7 · 9), as one model. Sheet C-102 draws it twice: as the art (the horde on the road, growing night by night,
   one roll of many) and as the detail (the table rolled at the fire, the night's aura, the shade's answer).
   The nights, the event nights and night 13 come from MODELS.clock; nothing here is a balance value. */
(function () {
  (window.MODELS = window.MODELS || {}).horde = {
    // every night's wave starts from the stock horde (v1's dioramas: ghouls and skeletons)
    base: ['ghoul', 'skeleton'],
    // the unit table: each listed night adds one of a pair, rolled at setup and shown at the fire (owner, 19 Oct).
    // The owner named two; the rest of the table is to come
    table: [{ night: 2, pair: ['fiend', 'necro'] }, { night: 3, pair: ['necro', 'shade'] }],
    units: {
      ghoul: { name: 'ghouls', model: 'Ghoul' }, skeleton: { name: 'skeletons', model: 'Skeleton Warrior' },
      fiend: { name: 'spitters', model: 'Crypt Fiend', does: 'spits from range' },
      necro: { name: 'necromancers', model: 'Necromancer', does: 'raises the dead' },
      // a regular unit once rolled (owner, 19 Oct): weak, it blinks inside the walls; a tower or units inside answer it
      shade: { name: 'shades', model: 'Shade, with Blink', does: 'blinks inside the walls' }
    },
    // the night's aura: one aura per night per difficulty raises the horde's stats in data, no unit edited; one
    // hidden caster per gate, its level set at dusk (owner, 19 Oct: normal and hard). Which stats, how much: open
    difficulties: ['normal', 'hard'],
    aura: { caster: 'one hidden caster per gate', set: 'its level, at dusk', stats: null },
    // the roll the art draws: one of the four (night 2 necromancers, so night 3 shades)
    example: { 2: 'necro', 3: 'shade' }
  };
})();
