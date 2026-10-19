# Decisions Manifest — Triforce-Defense
**Started:** 2026-10-15  ·  **Last Updated:** 2026-10-15  ·  **Status:** In Design

> The single source of truth, written *for the next agent* — not a doc Jordan maintains by hand.
> Every future agent consults this before an architectural/behavioral change. Never silently rewrite
> a locked decision — supersede it via a Change Request and note the successor. THE LAW (v2):
> `C:\projects\AI-Brain\instructions\design-methodology.md`. Hats, gates and the council:
> `C:\projects\AI-Brain\instructions\game-dev-workflow-law.md`.

---

## The one sentence
**Hearthglen, but three of us, with side quests and less macro.**
(Warcraft III Human campaign chapter 5, *March of the Scourge*: hold the town until Uther arrives.)
**The other parent (owner, 2026-10-19):** StarCraft II's *Left 2 Die* — hold by night, burn the infested by day —
"with some changes of course". Reference notes, sources and a side-by-side: `docs/LEFT2DIE.md`.

## Core Goal
A Warcraft III Reforged custom map for Jordan's Discord group: three players, each holding a walled
province against an undead AI that owns the wild to the north, until the final wave is held or the
cultist rituals summoning its boss are destroyed. Everyone already owns WC3, so the engine, the data
editor, the trigger editor and Lua scripting are the toolchain; the ceiling is "a map the group plays",
said out loud so it never becomes a disappointment.

## Non-Negotiable Constraints
- **Lua first.** Scripting in Lua; the trigger editor for what GUI does better; JASS only where Lua cannot reach.
- **Authored terrain.** Every resource site, build plot, gate and tower slot is placed by the map author. The player decides *what*, never *where*.
- **Never hijack a camera mid-wave.** Vignettes are between-wave dressing. A co-op partner losing camera control while a wall breaches uninstalls the map.
- **The garrison buys time, never safety.** It holds normal waves at its level and never holds a spike or a boss alone.
- **Design before data editor.** No unit, building or trigger is built before its slide is locked here.
- **The bridge.** The hill↔valley road crosses the river at a bridge (Decision 1.5, amended; owner: non-negotiable).

---

## Chapter 1: Shape of the game

### Decision 1.1: What engine and who plays it?
**Chosen Answer:** Warcraft III Reforged custom map. 3 players v undead AI. Audience: the Discord group.
**Rationale:** Solves the three things that killed the last games — no players, no level design, engine work. Friends own it and will play it.
**Date Locked:** 2026-10-15  ·  **Affects:** everything
**Change Rule:** None — this is the premise.

### Decision 1.2: What is the map?
**Chosen Answer (amended 2026-10-15, terms):** ONE province, THREE TOWNS — one per player. The bordering province to the north has been overrun by the undead; it is the wild, both where the waves come from and the fast shortcut between towns. Towns are linked indirectly by chokepoints. The players are **captains** charged with the defence of their towns until the **King's army** arrives.
**Rationale:** Node graph first: three nodes, chokepoint edges, one hostile hub. The safe path is slow and narrow; the fast path runs through the enemy — a real decision every time someone reinforces a friend. "Province" now means the realm the three share; a town is a captain's charge.
**Date Locked:** 2026-10-15  ·  **Affects:** terrain, pathing, wave spawns
**Change Rule:** Any new region must say which edge of the graph it is.

### Decision 1.3: What ends a match?
**Chosen Answer:** Two wins. **A:** survive to the final wave and hold until relief. **B:** destroy the three cultist rituals in the north (an obelisk with acolytes, or similar); each ritual destroyed weakens the final boss; all three destroyed ends the match early.
**Rationale:** Both endings live in the same region the players already have reasons to enter. Partial credit means a 1-for-3 team feels the difference; all-or-nothing would not.
**Date Locked:** 2026-10-15  ·  **Affects:** wave table, boss, ritual units, win triggers
**Change Rule:** Re-run the council if the rituals move out of the north or stop feeding the boss.
**Amended 2026-10-19 (owner):** three victories, each with its own last screen. Night 13 never dawns on its own: the captains kill the boss (the captains' victory), or they hold until the King's army arrives on a timer and kills it (the relief, 9.5's scene), or, any day before, all three rituals are broken (the rituals' victory). Lost when all three halls fall. The army's timer is a test value in config, [3:00] into night 13.

### Decision 1.4: What is the clock?
**Chosen Answer:** Day/night. Waves come at night; a match is N nights (~12, ~35–40 min, tunable). Undead take a large debuff by day and a large buff on blight. Rituals and undead bases sit on blight.
**Rationale:** The map teaches the push window — you push in daylight — with no rule text. Closes "match length" and "ritual hardening" at once.
**Date Locked:** 2026-10-15  ·  **Affects:** `config/` (night count, day length, buff values), the day/night Lua periodic, blight placement
**Change Rule:** The night buff needs a visible tell on the unit or a player who dies at dusk learns nothing.

### Decision 1.5: The three towns
**Chosen Answer:** **The hill town** — on high ground, a river running through it, a waterfall at its eastern border. **The valley town** — in the middle, a lake inside its walls. **The forest town** — in thick forest, thinner woods connecting it to the valley. Edges: hill ↔ valley (down beside the falls), valley ↔ forest (the thin woods). Hill ↔ forest only through the overrun north.
**Rationale:** Each town is a place before it is a base; the terrain gives the three captains different ground to hold and makes the graph legible on sight.
**Date Locked:** 2026-10-15  ·  **Affects:** terrain, chokepoints, T3-to-town assignment (open)
**Amended 2026-10-15 (owner, after Plate I's sketch):** the river WINDS; the towns sit farther apart; there is a BRIDGE on the hill↔valley road (non-negotiable — the owner loves bridges); a MOUNTAIN RIDGE runs down the entire west border of the map; a THICK FOREST BORDER runs down the entire east. The Plate I sketch must be redrawn to this before it is called accurate.
**Clarified 2026-10-19 (owner, on sheet T-101):** the MOUNTAINS RING THE HILL — the west ridge, with spurs north-west and south-west of the town; the hill is their foothill, and its high ground falls away east and south. The RIVER RUNS DOWNHILL the whole way: from a spring in the ridge, out of the mountains into the hill's west wall, across the town, over the falls at its east wall, past the bridge, into the valley's lake. Plate I's upper reach (out of the north) is replaced; the lower reach, the falls and the bridge are unchanged.
**Change Rule:** A new edge between hill and forest re-opens the whole graph.

## Chapter 2: The town (formerly "the province")

### Decision 2.1: Who are the three?
**Chosen Answer:** All Human. Shared T1–T2 roster. Each province's main hall (Town Hall → Keep → Castle) carries small flair, and Castle unlocks that province's T3: **Knight** (move) · **Siege Engine** (break — win B runs through this player) · **Templar** (hold — custom holy infantry: footman body, priest heal/dispel; working name).
**Rationale:** Three roles, three kits to balance, the lock lives in a building every WC3 player understands. Gryphons were REDACTED: Hearthglen had no air, and air bypasses the chokepoint graph. No player air T3.
**Date Locked:** 2026-10-15  ·  **Affects:** data editor (main halls, Templar), tech tree
**Change Rule:** Adding any player air unit re-opens the chokepoint graph question (undead anti-air in the wild was the fallback).

### Decision 2.2: Resources
**Chosen Answer:** Sites never deplete (trees stand, the mine never runs out). Collection is hands-off from pre-placed sites that upgrade through a finite ladder. Asymmetry comes from terrain — one province lumber-rich, one gold-rich, one balanced — which feeds WC3's existing gift/trade.
**Rationale:** The economy's tension is rate vs upgrade cost, not scarcity. A "collects faster" province was REDACTED: an economy buff is the role nobody wants.
**Date Locked:** 2026-10-15  ·  **Affects:** site placement, upgrade ladder in `config/`, the site vignette UI
**Change Rule:** None of the three provinces may out-earn another in total; only the mix differs.

### Decision 2.3: Two armies
**Chosen Answer:** Each province has (a) an autonomous **garrison** — the Barracks produces soldiers on its own that rally to the gate; Barracks level sets rate and quality; owned by a separate (allied computer) player per province: own tint, not selectable, no food cost — and (b) the player's **field force**, built and controlled by the player, led by the hero, taken to help a friend or raid the wild.
**Rationale:** Chores to the garrison, the interesting part to the player. Every wave the spend is one question: hold (gate/garrison) or move (field army). You cannot fund both.
**Date Locked:** 2026-10-15  ·  **Affects:** garrison Lua, player slots, food, Barracks tiers
**Change Rule:** Garrison tuning must keep the non-negotiable: time, never safety. The field army leaving should visibly thin the gate.

### Decision 2.4: The gate
**Chosen Answer:** One fixed gate structure per province with HP and armour upgrades and two Circle-of-Power tower slots. Identical in every province.
**Rationale:** The shared language — "gate tier 2, towers up" means the same thing to all three.
**Date Locked:** 2026-10-15  ·  **Affects:** gate unit, tower slots, upgrade table
**Change Rule:** —

### Decision 2.5: Plots
**Chosen Answer:** Buildings go on authored plots only. A plot is an owned Circle of Power unit; its command card lists the buildings it can become (stock unit-upgrade mechanism: choose → build timer → the plot *is* that building). Tiers live on the building's own card. Fewer plots than options. Same plot count and same menus in all three provinces; only arrangement, terrain and T3 differ. Demolish-to-circle is absent or costly (decide at balance).
**Rationale:** The fork is visible before spending (stock tooltips), no placement, scarcity is literal, and it stops three Human bases converging on one build. Native data-editor work; Lua stays for what only Lua can do.
**Date Locked:** 2026-10-15  ·  **Affects:** plot units, building menus, main-hall flair
**Change Rule:** No plot menu may contain a strictly-best option — that is one fewer plot, not a fork.

### Decision 2.6: Building roles
**Chosen Answer:** Every plot building is one of three roles: **Offensive** (trains units the player controls), **Defensive** (towers, and buildings that spawn uncontrolled defenders — the Aviary becomes defensive-only: gryphon patrols at the gate), **Resource** (the sites). One keystone exception, named not categorised: the **Barracks** does both — its level feeds the garrison, its queue trains the player's footmen.
**Rationale:** The three roles are the hold / move / pay spend made legible on the plot menu. A "Hybrid" category with one member is an exception wearing a label.
**Date Locked:** 2026-10-15  ·  **Affects:** plot menus, Aviary data, Barracks
**Change Rule:** A second hybrid building makes Hybrid a real category; until then, no.

## Chapter 3: The wild

### Decision 3.1: Loot
**Chosen Answer:** Custom items (new, or juiced edits of stock) earned by side objectives in the wild and by killing undead champions. Drops are team-fair (shared stash or a drop per player), never to whoever clicked.
**Rationale:** The wild's third reason to exist (shortcut, rituals, loot); loot is what the group talks about afterwards.
**Date Locked:** 2026-10-15  ·  **Affects:** item table, champion units, side-objective triggers
**Change Rule:** —

### Decision 3.2: Camera vignettes
**Chosen Answer:** Clicking a resource site (between waves) may lock the camera to an authored shot of the site with a Lua frame showing rate and the next upgrade. Dressing, approved as dressing.
**Rationale:** The "alive" moment Jordan wants; constrained by the no-hijack non-negotiable.
**Date Locked:** 2026-10-15  ·  **Affects:** camera setups, Lua UI frames
**Change Rule:** Must be skippable and never fire during a wave.

---

## Build Timeline
| Phase | Chunk | Dependencies | Status | Review Date |
|-------|-------|--------------|--------|-------------|
| 0 | The deck: one sentence · node graph · two armies · province · wild (design/, one slide per locked decision) | this manifest | In Design | — |
| 1 | Toolchain recon: Lua/TypeScript-to-Lua tooling, map-as-folder, UI frame libs, open-source co-op defence maps to learn from | Phase 0 | Planned | — |
| 2 | Terrain: the node graph as real geometry, plots, gates, sites, blight | Phase 0 | Planned | — |
| 3 | Data editor: plots, gate, main halls, Templar, garrison owner | Phase 2 | Planned | — |
| 4 | Lua: day/night buffs, garrison, rituals → boss, win conditions | Phase 3 | Planned | — |
| 5 | Items, vignettes, side objectives | Phase 4 | Planned | — |

Status ∈ **Planned · In Design · Locked · Built · Superseded**.

## Open Questions
| Question | Why It Matters | Owner | Status |
|----------|----------------|-------|--------|
| Which captain / T3 holds which town | Decides the map's roles | Human | **Sealed in v1, 17 Oct:** hill Siege, valley Knight, forest Templar (v1 ch. 2, 8) |
| The hero: one fixed per province, pick-from-four, or custom commander | It is what the player *is* | Human | **Sealed in v1, 17 Oct:** one fixed hero per town, level cap 20: the Bombardier, the Marshal, the Prelate (v1 ch. 8) |
| Where the Templar sits if it is not the T3 | Decision 2.1 took it as T3 | Human | **Sealed in v1, 17 Oct:** the forest's T3; the forest's hero is the Prelate (v1 ch. 8) |
| Plot count and menu contents | Defines the fork | Human | Open |
| Night count / day length / buff values | Match length | Human | Open (defaults in Decision 1.4) |
| The quick road isn't quicker on the sketch: hill to forest through the wild measures 1.13× the safe road, wall to wall. Every gate faces north while the roads leave the towns' sides; where do the roads meet the gates? (sheet M-101) | Decision 1.2's choice, every reinforcement | Human | Open. Owner, 19 Oct: the safe road is safe because you lose no units on it (a speed-aura road was raised and dropped) |
| The night ladder: how many more each night, which stats the night's aura raises, and by how much, normal and hard; and the hard set's own curve (sheet C-102) | The horde's growth, the two difficulties | Human | Open (the shape is sealed; see the Change Log, 19 Oct) |
| What we change from Left 2 Die, beyond three players, Humans and the King's army; and whether to borrow its entrances that open on a set night, the wild hardening where it isn't cleared, or its endless mode (`docs/LEFT2DIE.md`) | The game's other parent | Human | Open |
| The horde's heroes: how each signature item climbs in rarity (stock variants, else retuned copies). The burrow's numbers (the mound's HP, the pack) | The heroes, new 19 Oct | Human | Open (the rest is sealed: see `docs/HORDE.md`) |
| Ritual mechanics: what weakens the boss per ritual, acolyte behaviour | Win B | Human | **Sealed in v1, 17 Oct:** each broken ritual removes a lieutenant; acolytes channel a shield, the bell sends packs (9.1–9.4). The boss: chosen at setup, 19 Oct |

## Change Log
| Date | Change | Reason | Affected Areas |
|------|--------|--------|----------------|
| 2026-10-15 | Initial scaffold | — | (whole tree) |
| 2026-10-15 | Chapters 1–3 from the first council session (chat, voice + text) | Design-first pass | DECISIONS.md |
| 2026-10-15 | Terms: three TOWNS of one province; the overrun province is the wild; players are CAPTAINS awaiting the KING'S ARMY. Decision 1.5 (the towns' terrain). Deck becomes one living HTML brief (no PNG plates). | Owner, after Plate I | DECISIONS.md 1.2, 1.5; design/ |
| 2026-10-15 | Decision 1.5 amended: winding river; towns farther apart; a bridge on the hill↔valley road; a mountain ridge down the whole west border; a thick forest border down the whole east. | Owner, after Plate I's sketch | DECISIONS.md 1.5; design/index.html Plate I |
| 2026-10-15 | Repo brought under design-first 0.1.38: the brief's colours and fonts move to `design/deck_vellum_tokens.css` (GAME-07, look unchanged); `.gitattributes` (DES-09, late); `## Next session` in the hand-off (DES-14); the empty catch in `brief.js` carries its reason (OBS-04). | Kit Doctor RED on this repo | design/, docs/HANDOFF.md, .gitattributes |
| 2026-10-15 | Owner ruling: the brief keeps the deck_vellum skin and its animations — an exception to the default skin (SKIN-02) and to the no-ambient-motion rules (WEB-06, SKIN-06, DISP-02). Every animation has a static form under reduced motion (SAFE-05). The bridge joins Non-Negotiable Constraints. | Owner, 2026-10-15 session prompt | design/; DECISIONS.md constraints |
| 2026-10-19 | Test cycle cut from six minutes (4:00 day + 2:00 night) to four, keeping the 2 : 1 shape: 2:40 day + 1:20 night. Thirteen nights now run 52 min; the forty minutes stays unsealed, and day length stays in config for the walk to decide (1.4; v1 chapter 7). | Owner, after sheet X-002 showed 13 × 6 = 78 min against v1's "~40 min" label | config (day/night length), `design/v2/model_clock.js` |
| 2026-10-19 | The nights grow: days start at 3:00 and shrink evenly to 1:30 by the last night; nights start at 1:30 and grow to 3:00. Every cycle is 4:30; thirteen nights run 58:30. Test values, in config (1.4; v1 chapter 7). | Owner, watching sheet X-002 run | config (day/night length per night), `design/v2/model_clock.js` |
| 2026-10-19 | Decision 1.3 amended, with 9.5: three victories. Night 13 has no dawn of its own; the captains kill the boss, or the King's army arrives on a timer ([3:00] into night 13, a test value) and kills it, or the rituals were broken earlier. Each ending has its own last screen. | Owner, from the clock sheet: flavour for different victories | win triggers, the boss, the relief scene, `design/v2/model_clock.js` |
| 2026-10-19 | Decision 1.5 clarified: the mountains ring the hill (the west ridge, spurs north-west and south-west), and the river runs downhill the whole way — a spring in the ridge, into the hill's west wall, through the town, over the east falls, past the bridge, into the valley's lake. Plate I's upper reach, out of the north, is replaced. | Owner, on sheet T-101: the mountains must read as around the hill, and the river must not run uphill | terrain (the hill's west approach, the river's course), `design/v2/model_town.js`, `design/v2/model_province.js` |
| 2026-10-19 | New (owner): the horde, night by night. Each night carries an aura per difficulty that raises the horde's stats in data, no unit edited (one hidden caster per gate, its level set at dusk), in two sets, normal and hard. Each night of the unit table adds one unit of a pair, rolled at setup and shown at the fire before night 1 (named so far: night 2, spitters or necromancers; night 3, necromancers or shades), on stock models (the Crypt Fiend, the Necromancer, the Shade with Blink). Shades are a regular unit once rolled: weak, they blink inside the walls, so a tower or units inside have a job. Precedents: WC3 maps' dummy-aura casters; Mindustry's wave generator (random unit lines, scaling by shields). | Owner, 19 Oct, answering three questions | the nights (1.4, 7), the wave data, `design/v2/model_horde.js`, sheet C-102 |
| 2026-10-19 | Decisions 2.3 and 6.7 clarified: the garrison holds the gate from outside it (footmen cannot fight through a closed gate), the repair crew mends it from inside the walls, and the scout towers shoot over the wall from behind it. The garrison's captain stays behind the gate (2.3, amended in v1). | Owner, on sheet T-201: the crew was drawn outside, then the garrison inside | the garrison's rally point, the crew's path, `design/v2/sheet_t201.js`, `design/v2/sheet_t202.js` |
| 2026-10-19 | The owner names StarCraft II's *Left 2 Die* (Blizzard, 2011; from WoL's *Outbreak*; remade 2017 as co-op *Dead of Night*) as a base, "with some changes of course". Researched and noted: the same night/day push loop; its win burns every infested structure where ours breaks three rituals; its fortress-and-repairing-SCVs line is our gate and crew; Dead of Night's two random special infested per run and its HP-per-difficulty match C-102's roll and auras. No decision changed; one open question. | Owner, 19 Oct | `docs/LEFT2DIE.md`; the one sentence (a second parent named, the sentence unchanged) |
| 2026-10-19 | The horde's growth, corrected, and the unit table's rules. **Every night** the horde grows in count and in strength (the night's aura); **a new unit only every second night**, staggered: nights 2, 4, 6, 8, 10, 12, before the boss (the owner: "I don't have 14 different units worked out"). The named pairs fall on nights 2 and 4 (spitters or necromancers; necromancers or shades); 6 to 12 are to come. **Repeat:** a unit already in is struck from its pair and the other comes (night 2 necromancers, so night 4 shades); three rolls, not four. **Tiers:** units are staged by how strong they are, and none comes before its tier's night ("you can't get abomination round 1 or 2"): ghouls and skeletons from night 1, spitters and necromancers from 2, shades from 4, the abomination 4 at the earliest. Precedents: Mindustry's unit ladders (a line climbs a tier a step, the top tier kept for bosses) and Shattered Pixel Dungeon's mob rotation by depth (each mob enters at a set depth). Supersedes the 19 Oct row's "each night of the unit table" and its night-3 pair. | Owner, 19 Oct, on sheet C-102 | the wave data, `design/v2/model_horde.js`, sheet C-102 |
| 2026-10-19 | Six new units it is: one on each of nights 2, 4, 6, 8, 10 and 12. The abomination's tier comes from night 8 on, on normal and hard alike ("abom tier units come night 8+, regardless of difficulty"): the tiers never move with the difficulty; only the night's aura does. | Owner, 19 Oct, on sheet C-102 | the wave data, `design/v2/model_horde.js`, sheet C-102 |
| 2026-10-19 | Interview on the horde's tiers, after the rosters (`docs/UNDEAD.md`, `docs/LEFT2DIE.md`). **The tier rule:** a unit's tier is WC3's own tech tier, the building that unlocks it in melee (Necropolis, Halls of the Dead, Black Citadel); campaign and neutral undead slot in by level. It holds every pick so far: the spitter (Crypt Fiend) tier 1, the necromancer and the shade tier 2, the abomination tier 3 (night 8+). **Air:** normal, no flyers; hard, one flyer, as a special. **Heroes (new):** undead heroes march with the horde, every night on hard and every third night on normal, scripted from a table; stock hero models with custom kits (the owner's examples: the Lich, a necromancer with an aura; the Dreadlord, tanky, fast-attacking, a vampiric aura; the Death Knight, a tank with a regeneration aura); each drops an item, used or sold at the market by the captain's hero. The items are undecided. Precedent: Blizzard's campaign AI builds each wave from a per-difficulty count per unit, heroes included (`CampaignAttackerEx(easy, normal, hard, unit)` in `common.ai`, [lep/jassdoc](https://github.com/lep/jassdoc/blob/master/common.ai)); its melee AI sends its hero with every attack. | Owner, 19 Oct, interview | the wave table, the hero table, the item table, hard mode, `design/v2/model_horde.js` |
| 2026-10-19 | Interview, continued. **One hero for the map** on a hero night: it leads the night's horde to one gate, and the other two captains choose to hold home or ride to help (1.2, M-101's roads). **On normal, the hero is the event's leader:** each event night (3, 6, 9, 12) is led by a hero who fits its event, so event and hero are one thing and the table pairs them; on hard, a hero every night. **The air raid stays on normal as the exception:** "no flyers" governs the nightly unit table; the air raid's Gargoyles belong to the event, one night, announced at dusk, led by its hero; on hard, stronger. Decision 7.3 unchanged. | Owner, 19 Oct, interview | the hero table, the event nights (7.1–7.4), the wave table |
| 2026-10-19 | Interview, continued. **Each event has its hero, by kit:** the fog (the wave buffed, vision cut) is led by the Death Knight, a tank with a regeneration aura; the insurgents (cultists at a graveyard) by the Lich, a necromancer with an aura, raising the graveyard; the air raid (Gargoyles at the farms) by the Dreadlord, tanky, fast-attacking, a vampiric aura. **A fourth event, the burrow, led by the Crypt Lord:** his pack of Carrion Beetles and burrowing spiders, really tanky as their thing (Spiked Carapace); a burrow mound breaks out inside the walls and keeps unloading the pack until it is killed (Left 2 Die's Nydus worm). The answer: units or towers inside, or the field force riding home. **7.1 amended:** the event pool grows from three to four; nights 3, 6 and 9 draw three of the four, no repeats, so each match misses one; night 12 draws any, at full strength. | Owner, 19 Oct, interview | the event nights (7.1–7.4, and a new one), the hero table, `design/v2/model_clock.js` (the pool) |
| 2026-10-19 | Interview, continued. **Hard's in-between nights:** the four heroes take turns from the table (order rolled at the fire), each leading a plain wave with its own pack; each time one returns, it is a level higher. The event nights keep their event's hero. | Owner, 19 Oct, interview | the hero table, hard mode |
| 2026-10-19 | Interview, continued. **3.1 amended for the horde's heroes:** a hero's item drops at the gate it attacked, for that town's captain alone (the defender's), to use or sell at the market with the captain's hero. 3.1 stands for the wild's loot (side objectives, champions). | Owner, 19 Oct, interview | 3.1, the hero table, the item table |
| 2026-10-19 | Interview, continued. **The hero's gate is rolled at dusk**, announced with the night's tell. Drops may come out uneven, by design: the captains trade or give each other items, and the friction is part of the game ("maybe one of your buddies is a bit greedy and wants them all, maybe you don't help him the next night"). | Owner, 19 Oct, interview | the hero table, the dusk tell |
| 2026-10-19 | Interview, the unit table by tier. **Night 6 (tier 2):** the Nerubian Webspinner (level 3; web pins units, raises the dead) or the Ghost (level 3; hovers on the ground, hits air and ground, Possession). **Night 8 (tier 3 opens):** the Abomination (level 4, 1175 HP, disease cloud: breaks the gate) or the Frost Revenant (level 4, hovers; Blizzard over the wall onto the crew and the towers). **Horde casters, engine first:** the horde is owned by a computer player and attack-moves, so WC3's built-in spell AI casts (it runs without an AI script, on fixed conditions, e.g. enough enemies bunched for an area spell); the first terrain test spawns one Frost Revenant at a wall with a crew behind it; if it won't cast reliably, one Lua caster brain (every second, if it has mana, cast at the thickest knot of enemies in range) serves every horde caster. Sources: Hive Workshop threads [252260](https://www.hiveworkshop.com/threads/how-to-make-the-ai-take-certain-units-seriously.252260/), [302024](https://www.hiveworkshop.com/threads/why-are-computer-controlled-units-not-using-abilities.302024), [347998](https://www.hiveworkshop.com/threads/ai-ground-target-skill-help.347998) (search excerpts). `design/v2/model_horde.js` and C-102 trail the interview: they still show nights 2 and 4 only, until the sheets are redrawn. | Owner, 19 Oct, interview | the wave table, the horde's casters (Lua, phase 4), the first terrain test |
| 2026-10-19 | Interview, the unit table complete. **Night 10:** night 8's pair again, so by the repeat rule whichever of the Abomination and the Frost Revenant did not come on 8 comes on 10: every match has both by night 10. **Night 12:** the Lightning Revenant (level 6, hovers; Chain Lightning, Purge) or the Skeletal Orc Grunt (level 5, 850 HP, 3 armour; no casting). The table: night 1, ghouls and skeletons; 2, spitters (Crypt Fiend) or necromancers; 4, necromancers or shades; 6, webspinners or ghosts; 8, abominations or frost revenants; 10, the other of the two; 12, lightning revenants or skeletal orc grunts. | Owner, 19 Oct, interview | the wave table, `design/v2/model_horde.js` (to follow) |
| 2026-10-19 | Interview. **Hard's flyer is the Frost Wyrm**, Left 2 Die's Spotter: tier 3, it joins hard's horde from night 8, a few at a time, on top of the roll; it flies over the wall and its Freezing Breath stops a tower or a barracks. Riflemen and towers answer it. Distinct from the air raid's Gargoyles, which go for the farms. | Owner, 19 Oct, interview | hard mode, the wave table |
| 2026-10-19 | Interview. **Night 13's lieutenants are the same characters as the event heroes:** the Crypt Lord who leads the burrow is the valley's Spider Lord; the Lich who leads the insurgents is the forest's lieutenant; both return for the end at their highest level. The Rotting Brute stays an Abomination; the Death Knight and the Dreadlord are not on night 13. Breaking a ritual still removes its lieutenant. 9.3 and 9.4 unchanged, only linked. | Owner, 19 Oct, interview | night 13, the hero table |
| 2026-10-19 | Interview. **A hero's level is half the night, rounded up:** nights 1–2 level 1, 3–4 level 2, 5–6 level 3, 7–8 level 4, 9–10 level 5, 11–12 level 6 (the first with its ultimate); night 13's lieutenants level 10. Normal meets its event heroes at 2, 3, 5 and 6; on hard the rotation spaces returns three or more nights apart, so each comes back higher. | Owner, 19 Oct, interview | the hero table |
| 2026-10-19 | Interview. **The heroes' kits are stock abilities, remixed:** every ability is a stock WC3 ability object, moved onto a different hero and retuned in the object editor (e.g. the Necromancer's Raise Dead on the Lich). The engine's spell AI already casts them; no Lua for the kits. | Owner, 19 Oct, interview | the object editor (phase 3), the hero table |
| 2026-10-19 | Interview. **A kit is one active, one passive, an ultimate, and stats.** **The Death Knight (the fog):** passive Unholy Aura (the wave's speed and regeneration), active Death Coil, ultimate Animate Dead with "Raised Units Are Invulnerable" switched off in the object editor (the stock ability's own field; stock values 6 corpses, area 900, 40 s, cooldown 180 s, from the game's `abilitydata.slk` / `abilitymetadata.slk`), a tank by his stats. | Owner, 19 Oct, interview | the object editor (phase 3), the hero table |
| 2026-10-19 | Interview. **The Lich (the insurgents):** active Raise Dead (the Necromancer's), passive Brilliance Aura, ultimate Death and Decay, a caster's stats; 9.3's "curses that blunt damage" drop out. **The Dreadlord (the air raid):** passive Vampiric Aura, active Sleep, ultimate Inferno, tanky and fast-attacking by his stats. **The Crypt Lord (the burrow):** passive Spiked Carapace, actives Impale and Carrion Beetles (the one hero with two: "raising summons and the undead is the best and coolest thing about undead things, we don't need to shy away from it"), ultimate Locust Swarm, really tanky; his pack, Carrion Beetles and burrowing Crypt Fiends. **A principle for the horde:** summons and the raised dead are the undead's best thing; lean in. | Owner, 19 Oct, interview | the object editor (phase 3), the hero table, 9.3 (the Lich's kit) |
| 2026-10-19 | Interview. **Each hero drops its own item**, a signature matched to its kit, in stronger versions as the nights go (four items, several strengths, to be designed). It is the defender's (3.1 amended above). | Owner, 19 Oct, interview | the item table, the market (T-401) |
| 2026-10-19 | Interview. **Two settings, as v1 4.x has them:** the length (13 nights; or 26, later, renamed so only one thing is "hard": working name *the long night*) and the difficulty dial, whose notches are now answered: two, normal and hard (the hard aura set, a hero every night, the Frost Wyrm). Every table designed today is for 13 nights; the long night extends them when it is built. `design/v2/model_clock.js`'s `hard` (26 nights) is the long night. | Owner, 19 Oct, interview | the setup screen (4.x), `design/v2/model_clock.js` |
| 2026-10-19 | Interview. **An event night: the event everywhere, its hero at one town.** The event hits all three towns as 7.2–7.4 sealed it; its hero joins at the one town the dusk roll names, where the event is at its worst (the Death Knight at that gate in the fog, the Lich among that town's cultists, the Dreadlord with that town's Gargoyles, the Crypt Lord out of that town's mound), and that town gets the drop. | Owner, 19 Oct, interview | the event nights, the hero table |
| 2026-10-19 | Interview. **Night 13's boss is one of three, chosen at setup, selected or random:** Mal'Ganis, Arthas fallen, or Kel'Thuzad, on their stock campaign models, scaled larger, abilities beefed up. It gives the lobby another thing to discuss at the fire. **The fire lingers, by design:** the owner does not want the opening raced through; it is a crafted scene that shows off the Lua buttons and the selections (4.x: the setup gains a third setting, the boss; v1's ten-second countdown with a host skip to be revisited when the fire is drawn). | Owner, 19 Oct, interview | night 13 (9.4), the setup screen (4.x), the fire |
| 2026-10-19 | Interview. **The boss's matching hero is his herald:** Mal'Ganis's is the Dreadlord (the air raid), Arthas's the Death Knight (the fog), Kel'Thuzad's the Lich (the insurgents), renamed for him and met all match; if Kel'Thuzad is chosen, night 13's forest lieutenant is his apprentice, a smaller Lich. **The signature drops are Reforged's stock rarity items**, rarity climbing with the night: the Lich drops the Lich Orb (rare; revives its wearer), the Dreadlord the Dreaded Chestplate (uncommon; Vampiric Aura, "raiment worn by the nathrezim"), the Crypt Lord the Nerubian Necklace (rare; lifesteal), the Death Knight the Gloves of Necromancy (uncommon; attacks raise skeletons). From the game's `itemstrings.txt` (the current Reforged export). Open: the climb, through stock variants where they exist, else retuned copies in the object editor. | Owner, 19 Oct, interview | the hero table, the item table, the market (T-401) |
| 2026-10-19 | Interview. **The fire runs on Ready, not clocks:** no timers on the town picks, no countdown, no host skip. Each captain takes a town with one button in slot order; the host sets the length, the difficulty and the boss (chosen or rolled) in view of all three; the roll is shown (the pairs, the boss); dusk falls only when all three press Ready. The scene lasts as long as the table talks. 4.2's timers and 4.x's ten-second countdown are removed. | Owner, 19 Oct, interview | the fire (4.x), the setup screen |
