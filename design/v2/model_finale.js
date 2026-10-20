/* model_finale.js — NIGHT 13 (1.3 · 9.3–9.5, sealed 17 Oct; amended by the owner, 19 Oct; docs/HORDE.md), as one
   model. Sheet W-102 draws it: the art plays one night 13 (one boss of three, one ritual broken), the detail gives the
   boss chosen at the fire and his herald, the rituals and their lieutenants, and the endings with their last screens.
   The night, the army's timer and the prongs' towns come from MODELS.clock.finale; nothing here is a balance value. */
(function () {
  (window.MODELS = window.MODELS || {}).finale = {
    // the boss, chosen at the fire by the host or rolled (owner, 19 Oct): on his stock campaign model, scaled
    // larger, his abilities beefed up. His matching event hero is his herald all match, renamed for him
    bosses: [
      { id: 'malganis', name: "Mal'Ganis", model: 'the Dreadlord', fig: 'dreadlord', herald: 'dreadlord', event: 'the air raid' },
      { id: 'arthas', name: 'Arthas, fallen', model: 'the Death Knight', fig: 'deathknight', herald: 'deathknight', event: 'the fog' },
      { id: 'kelthuzad', name: "Kel'Thuzad", model: 'the Lich', fig: 'lich', herald: 'lich', event: 'the insurgents',
        note: "the forest's lieutenant becomes his apprentice, a smaller Lich" }
    ],
    // the rituals in the north and their lieutenants (9.1–9.4): each lieutenant is built to blunt the town nearest
    // its ritual; a broken ritual keeps its lieutenant home, an empty road. The Spider Lord and the Lich are the
    // event heroes, at level 10 (owner, 19 Oct)
    rituals: [
      { side: 'west', town: 'hill', name: 'the Rotting Brute', fig: 'abom', what: 'acid shreds armour, hunts engines' },
      { side: 'middle', town: 'valley', name: 'the Spider Lord', fig: 'cryptlord', what: "the burrow's Crypt Lord" },
      { side: 'east', town: 'forest', name: 'the Lich', fig: 'lich', what: "the insurgents' Lich" }
    ],
    level: 10,
    // night 13 has no dawn of its own; it ends one of three ways, each with its own last screen, or is lost (1.3,
    // amended 19 Oct; 9.5; 2.7)
    endings: [
      { id: 'players', name: 'the players kill the boss', dec: '1.3', when: 'night 13', last: 'the fire by day, his crown in the ash' },
      { id: 'relief', name: "the King's army arrives", dec: '9.5', when: 'on a timer', last: "the fire by day, the King's banners" },
      { id: 'rituals', name: 'the three rituals broken', dec: '1.3', when: 'any day before', last: 'the fire by day, the obelisks down' },
      { id: 'lost', name: 'all three halls fall', dec: '1.3 · 2.7', when: 'any night', last: 'the fire, cold' }
    ],
    // the night the art plays: Mal'Ganis chosen; the east ritual broken, so the forest's road is empty
    example: { boss: 'malganis', broken: ['east'] }
  };
})();
