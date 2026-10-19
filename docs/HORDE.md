# The horde — the design, gathered
**As of:** 2026-10-19 · **From:** the owner's ideas and the interview of 19 Oct, after the rosters (`docs/UNDEAD.md`, `docs/LEFT2DIE.md`).
Every line is sealed in `DECISIONS.md` (Change Log, 19 Oct) unless it says **open**. Sheet C-102 and `design/v2/model_horde.js`
still show only nights 2 and 4: they follow this page when the sheets are redrawn.

## The shape
| Every night | Every second night | Hero nights | Event nights |
|---|---|---|---|
| more of them, and stronger (the night's aura) | a new unit, one of a pair, for good | normal: the event nights, the hero leads the event · hard: every night | 3, 6, 9, 12: three of four events, then any at full strength |

- **The aura:** one aura per night per difficulty raises the horde's stats in data, no unit edited; one hidden caster per gate, its level set at dusk. Two sets, normal and hard.
- **The roll:** the pairs are rolled at setup and shown at the fire before night 1. A unit already in is struck from its pair and the other comes.
- **Summons and the raised dead are the undead's best thing:** lean in.

## The tiers: WC3's own
A unit's tier is the building that unlocks it in melee; campaign and neutral undead slot in by level. None comes before its tier's night, on normal and hard alike.

| Tier | Opens | Melee units | Campaign / neutral |
|---|---|---|---|
| 1 · Necropolis | night 1 | Ghoul, Crypt Fiend | zombies, skeletons, spiders (level 1) |
| 2 · Halls of the Dead | night 2 | Necromancer, Shade (and Banshee, Meat Wagon, Statue, Gargoyle) | level 3: Nerubian Webspinner, Ghost… |
| 3 · Black Citadel | night 8 | Abomination, Frost Wyrm (and Destroyer) | level 4–6: Frost Revenant, Lightning Revenant, Skeletal Orc Grunt… |
| the end | night 13 | — | level 10 lieutenants; the boss |

## The unit table
| Night | The pair | Level · HP | What it does |
|---|---|---|---|
| 1 | — (the base) ghouls, skeletons | 2 · 340 / 1 · 180 | bodies |
| 2 | **spitters** (Crypt Fiend) or **necromancers** | 3 · 550 / 2 · 315 | ranged / raises the dead |
| 4 | necromancers or **shades** | 2 · 315 / 1 · 125 | — / blinks inside the walls (an attack added in data: the stock Shade has none) |
| 6 | **Nerubian Webspinners** or **Ghosts** | 3 · 350 / 3 · 300 | webs pin units, raises the dead / hovers, hits air and ground, Possession |
| 8 | **Abominations** or **Frost Revenants** | 4 · 1175 / 4 · 450 | breaks the gate / Blizzard over the wall onto the crew and towers |
| 10 | abominations or frost revenants | | the one night 8 didn't bring: every match has both by 10 |
| 12 | **Lightning Revenants** or **Skeletal Orc Grunts** | 6 · 750 / 5 · 850 | Chain Lightning, Purge / a plain heavy |

Levels and HP from the game's data (`docs/UNDEAD.md`).

## Normal and hard
| | Normal | Hard |
|---|---|---|
| The aura | the normal set | the hard set |
| Flyers | none in the table; the air raid's Gargoyles on its night only, announced at dusk | + the **Frost Wyrm** from night 8, a few at a time, on top of the roll: Left 2 Die's Spotter, its Freezing Breath stops a tower or a barracks |
| Heroes | the event nights, each led by its event's hero | every night 1–12: the event nights by their event's hero; between, the four in turn (order rolled at the fire) |
| Tiers | the same | the same |

## The four events and their heroes
| Event | What it does | Its hero |
|---|---|---|
| The fog (7.2) | the wave buffed, vision cut | **the Death Knight** |
| The insurgents (7.4) | cultists at a graveyard | **the Lich** |
| The air raid (7.3) | Gargoyles over the wall for the farms | **the Dreadlord** |
| **The burrow** (new) | a mound breaks out inside the walls and unloads the pack until it is killed (Left 2 Die's Nydus worm); answered by units or towers inside, or the field force riding home | **the Crypt Lord** |

Nights 3, 6, 9 draw three of the four, no repeats, so each match misses one; night 12 draws any, at full strength (7.1 amended).

## The heroes
One a hero night, for the map: it leads the night's horde to one gate, **rolled at dusk** and announced with the night's tell; the other two captains choose to hold home or ride to help.

| Hero | Passive | Active | Ultimate | Stats |
|---|---|---|---|---|
| Death Knight | Unholy Aura | Death Coil | Animate Dead, its raised **not** invulnerable (the stock field switched off) | a tank |
| Lich | Brilliance Aura | Raise Dead (the Necromancer's) | Death and Decay | a caster |
| Dreadlord | Vampiric Aura | Sleep | Inferno | tanky, fast attack |
| Crypt Lord | Spiked Carapace | Impale **and** Carrion Beetles | Locust Swarm | really tanky; his pack: beetles and burrowing Crypt Fiends |

- Stock abilities only, remixed and retuned in the object editor; stock hero models.
- **Level:** half the night, rounded up: 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6 for nights 1–12 (the ultimate from 11); night 13, level 10.
- **The drop:** each hero drops **its own item**, stronger as the nights go, at the gate it attacked: the defender's, to use or sell at the market. Uneven by design: the captains trade and give items, and the friction is part of the game.

## Night 13
The boss takes the middle road to the valley; the lieutenants march on the towns they were built to blunt (9.3): the Rotting Brute (an Abomination) on the hill, **the Crypt Lord** (the burrow's hero) as the valley's Spider Lord, **the Lich** (the insurgents' hero) on the forest, at level 10. A broken ritual keeps its lieutenant home.

## Casting
The horde belongs to a computer player and attack-moves, so WC3's built-in spell AI casts for it (it runs without an AI script, on fixed conditions). The first terrain test spawns one Frost Revenant at a wall with a crew behind it; if it won't cast reliably, one Lua caster brain (every second, with mana: cast at the thickest knot of enemies in range) serves every horde caster.

## Open
- The four signature items, and their strengths.
- How many more each night; which stats the aura raises, and by how much, normal and hard.
- The burrow's numbers: the mound's HP, the pack's size.
- The boss of night 13 (9.4).

## Precedents
Blizzard's campaign AI builds each wave from a per-difficulty count per unit, heroes included (`CampaignAttackerEx(easy, normal, hard, unit)`, [common.ai](https://github.com/lep/jassdoc/blob/master/common.ai)) · Left 2 Die's specials, Nydus worm and Spotter, and Dead of Night's random specials (`docs/LEFT2DIE.md`) · Mindustry's unit tiers ([Waves.java](https://github.com/Anuken/Mindustry/blob/master/core/src/mindustry/game/Waves.java)) and Shattered Pixel Dungeon's mobs by depth ([MobSpawner.java](https://github.com/00-Evan/shattered-pixel-dungeon/blob/master/core/src/main/java/com/shatteredpixel/shatteredpixeldungeon/actors/mobs/MobSpawner.java)) · WC3's hard-coded spell AI (Hive Workshop, `DECISIONS.md`).
