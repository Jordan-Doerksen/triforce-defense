/* model_events.js — THE EVENT NIGHTS AND THEIR HEROES (7.1–7.5, amended by the owner's interview of 19 Oct;
   docs/HORDE.md), as one model. Sheet C-201 draws it: the art plays one draw of the four event nights across the
   three towns, the detail gives the draw, hard's every-night heroes, and each event with its hero as a card.
   The event nights and night 13 come from MODELS.clock; nothing here is a balance value. */
(function () {
  (window.MODELS = window.MODELS || {}).events = {
    // the pool (7.1, amended 19 Oct: three events become four): nights 3, 6 and 9 draw three of the four, no
    // repeats, so each match misses one; night 12 draws any, at full strength. Announced at dusk with a visible tell
    pool: [
      { id: 'fog', name: 'the evil fog', dec: '7.2', hero: 'deathknight',
        does: ['sight shrinks for the night;', 'the wave faster, harder, tougher'], answer: 'hold: the garrison, the crew' },
      { id: 'insurgents', name: 'the insurgents', dec: '7.4', hero: 'lich',
        does: ["cultists at each town's graveyard;", 'every 20 s the dead rise'], answer: 'kill the cultists: the field force' },
      { id: 'air', name: 'the air raid', dec: '7.3', hero: 'dreadlord',
        does: ['gargoyles over the wall', 'for the buildings, the farms first'], answer: 'riflemen, the Arcane Tower, the Aviary' },
      { id: 'burrow', name: 'the burrow', dec: 'new, 19 Oct', hero: 'cryptlord',
        does: ['a mound breaks out inside the walls;', 'the pack pours out till it dies'], answer: 'units or towers inside, or ride home' }
    ],
    // the event everywhere, its hero at one town (owner, 19 Oct): the dusk roll names the town; the event is at its
    // worst there, and that town gets the drop (3.1 amended: the defender's; uneven by design, the players trade)
    towns: ['hill', 'valley', 'forest'],
    // a kit: one active, one passive, an ultimate and stats, all stock abilities remixed (owner, 19 Oct)
    heroes: {
      deathknight: { name: 'the Death Knight', passive: 'Unholy Aura', active: 'Death Coil', ult: 'Animate Dead', ultNote: 'its raised killable',
        stats: 'a tank', drop: { item: 'Gloves of Necromancy', rarity: 'uncommon', does: 'attacks raise skeletons' }, herald: 'Arthas' },
      lich: { name: 'the Lich', passive: 'Brilliance Aura', active: 'Raise Dead', ult: 'Death and Decay', stats: 'a caster',
        drop: { item: 'Lich Orb', rarity: 'rare', does: 'revives its wearer' }, herald: "Kel'Thuzad", night13: "the forest's lieutenant" },
      dreadlord: { name: 'the Dreadlord', passive: 'Vampiric Aura', active: 'Sleep', ult: 'Inferno', stats: 'tanky, fast attack',
        drop: { item: 'Dreaded Chestplate', rarity: 'uncommon', does: 'Vampiric Aura' }, herald: "Mal'Ganis" },
      cryptlord: { name: 'the Crypt Lord', passive: 'Spiked Carapace', active: 'Impale · Carrion Beetles', ult: 'Locust Swarm', stats: 'really tanky',
        drop: { item: 'Nerubian Necklace', rarity: 'rare', does: 'lifesteal' }, pack: 'beetles, burrowing crypt fiends', night13: "the valley's Spider Lord" }
    },
    // a hero's level: half the night, rounded up; night 13's lieutenants, 10 (owner, 19 Oct)
    level: (night) => Math.ceil(night / 2),
    // one draw the art plays: three of four on 3, 6, 9 (here the air raid is missed), night 12 any at full strength
    example: [
      { night: 3, event: 'fog', town: 'hill' },
      { night: 6, event: 'insurgents', town: 'forest' },
      { night: 9, event: 'burrow', town: 'valley' },
      { night: 12, event: 'air', town: 'hill', full: true }
    ],
    // hard: a hero every night 1-12; the event nights keep their event's hero; between, the four in turn, the order
    // rolled at the fire (owner, 19 Oct). One order the detail shows
    hardOrder: ['deathknight', 'lich', 'dreadlord', 'cryptlord']
  };
})();
