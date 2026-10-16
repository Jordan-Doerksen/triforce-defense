# Decisions Manifest — Triforce-Defense
**Started:** 2026-10-15  ·  **Last Updated:** 2026-10-16  ·  **Status:** In Design

> The single source of truth, written *for the next agent* — not a doc Jordan maintains by hand.
> Every future agent consults this before an architectural/behavioral change. Never silently rewrite
> a locked decision — supersede it via a Change Request and note the successor. THE LAW (v2):
> `C:\projects\AI-Brain\instructions\design-methodology.md`. Hats, gates and the council:
> `C:\projects\AI-Brain\instructions\game-dev-workflow-law.md`.

---

## The one sentence
**Hearthglen, but three of us, with side quests and less macro.**
(Warcraft III Human campaign chapter 5, *March of the Scourge*: hold the town until Uther arrives.)

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

### Decision 1.4: What is the clock?
**Chosen Answer (superseded 2026-10-16 by the amendment below):** ~~Day/night. Waves come at night; a match is N nights (~12, ~35–40 min, tunable). Undead take a large debuff by day and a large buff on blight. Rituals and undead bases sit on blight.~~
**Amended 2026-10-16 (council, Plate II — `records/council-2026-10-16-plate-2-clock.md`):**
- Waves come at night only. A match starts at dawn with a longer day 1, runs N nights (default 12, ~35–40 min; night count and day length stay Open and are printed as defaults), and the King's army arrives at the dawn after the last night.
- Undead strength is two modifiers on damage dealt: a day debuff and a blight buff. Night is baseline. A load-time check keeps undead on blight in daylight below baseline (day × blight ≤ 0.80). Values live in `config/`.
- The undead bases are the three ritual compounds (acolytes and guards).
- Blight is authored and fixed; a destroyed ritual takes its blight with it.
- Dusk: the sky shifts, a horn sounds, the minimap pings each gate, and the day debuff fades over a ramp. No camera move.
- Nights left: one board line, "Night N of M", at a screen edge, never over a gate.
- Waves are scripted spawns, not the stock melee AI.
**Rationale:** The map teaches the push window — you push in daylight — with no rule text. Closes "match length" and "ritual hardening" at once. The cap keeps the window paying off at the rituals, where both modifiers meet; a ritual broken changes the ground, so partial credit (1.3) is visible.
**Date Locked:** 2026-10-15  ·  **Amended:** 2026-10-16  ·  **Affects:** `config/` (night count, phase lengths, day and blight multipliers, the cap, the dusk ramp), the day/night Lua periodic, the scripted wave spawner, blight placement and its removal on a ritual's fall, the nights-left board line
**Change Rule (amended):** The day state has a visible tell on the unit, and its fading at dusk is visible, or a player who dies at dusk learns nothing. Blight is told by the ground.

### Decision 1.5: The three towns
**Chosen Answer:** **The hill town** — on high ground, a river running through it, a waterfall at its eastern border. **The valley town** — in the middle, a lake inside its walls. **The forest town** — in thick forest, thinner woods connecting it to the valley. Edges: hill ↔ valley (down beside the falls), valley ↔ forest (the thin woods). Hill ↔ forest only through the overrun north.
**Rationale:** Each town is a place before it is a base; the terrain gives the three captains different ground to hold and makes the graph legible on sight.
**Date Locked:** 2026-10-15  ·  **Affects:** terrain, chokepoints, T3-to-town assignment (open)
**Amended 2026-10-15 (owner, after Plate I's sketch):** the river WINDS; the towns sit farther apart; there is a BRIDGE on the hill↔valley road (non-negotiable — the owner loves bridges); a MOUNTAIN RIDGE runs down the entire west border of the map; a THICK FOREST BORDER runs down the entire east. The Plate I sketch must be redrawn to this before it is called accurate.
**Change Rule:** A new edge between hill and forest re-opens the whole graph.

## Chapter 2: The town (formerly "the province")

### Decision 2.1: Who are the three?
**Chosen Answer:** All Human. Shared T1–T2 roster. Each province's main hall (Town Hall → Keep → Castle) carries small flair, and Castle unlocks that province's T3: **Knight** (move) · **Siege Engine** (break — win B runs through this player) · **Templar** (hold — custom holy infantry: footman body, priest heal/dispel; working name).
**Rationale:** Three roles, three kits to balance, the lock lives in a building every WC3 player understands. Gryphons were REDACTED: Hearthglen had no air, and air bypasses the chokepoint graph. No player air T3.
**Date Locked:** 2026-10-15  ·  **Affects:** data editor (main halls, Templar), tech tree
**Change Rule:** Adding any player air unit re-opens the chokepoint graph question (undead anti-air in the wild was the fallback).
**Amended 2026-10-16 (open questions, `records/open-questions-2026-10-16.md`):** the Templar is confirmed as the third T3. T3 by town: **hill = Siege Engine, valley = Knights, forest = Templars.** The siege sits near a ritual for win B; the Knights sit at the only town with two safe roads, so the mover reaches both friends fastest at night; the Templars hold the far end.

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
**Amended 2026-10-16 (council, Plate III — `records/council-2026-10-16-plate-3-two-armies.md`):**
- Barracks tiers add garrison posts and unit types: level 1 footmen; level 2 + ranged; level 3 + casters. Quality comes from a **Blacksmith** with custom upgrades; one small GUI trigger mirrors the captain's upgrade levels to his garrison's computer owner.
- Each post refills on its own timer, slower than a day: a garrison wiped at night is about two thirds back by the next dusk (`config/`). A hard night shows at the next dusk.
- A seed town watch stands at each gate at the dawn of day 1. The field force's default rally is its own gate. Aviary gryphons, if built, belong to the garrison's owner and count against its posts.
- "Time, never safety" becomes a load-time check once the wave table exists (the garrison's full strength below every spike and the boss). "Cannot fund both" stays a target, checked by a playtest: does anyone still weigh hold against move after night 6?
- A captain sees his gate from away: garrison dots on the minimap, and a horn and ping when its garrison is nearly gone. No camera move.
- Terms: **field force** (not field army or field company) and **commander** (not hero).

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

### Decision 2.7: The commander
**Chosen Answer:** Each town's captain has a custom commander hero, one per town, its kit built for the town's role (hill: break, valley: move, forest: hold). No stock hero.
**Rationale:** The players are captains; the commander is what the player is. A stock hero brings kits built for another game (the Archmage's Mass Teleport moves an army off the road graph).
**Date Locked:** 2026-10-16  ·  **Affects:** data editor (three custom heroes), Plate III
**Change Rule:** The kits are decided at Plate III's council.
**Amended 2026-10-16 (council, Plate III — `records/council-2026-10-16-plate-3-two-armies.md`):** the kits. Every ability is a copy of a stock ability with edited fields (bases from memory, to check in the editor).

| Town · title | Q | W | E | R (ultimate) |
|---|---|---|---|---|
| Hill · **Engineer** (break, with the Siege Engines) | Sunder — armour cut on one target, structures allowed (Faerie Fire) | Field Repair — mechanical units only (Healing Wave) | Siegecraft — siege units nearby hit harder (Command Aura, mechanical only) | Bring It Down — one heavy blow on a structure (Storm Bolt, structures allowed) |
| Valley · **Knight-Marshal** (move, with the Knights) | Forced March — the company moves faster (Endurance Aura, move speed only) | Charge — a short charge that damages and slows (Righteous Fury, range at most one gate width) | Flare — reveals a point (Flare / Far Sight) | Relief Column — riders for a short time (Feral Spirit) |
| Forest · **Castellan** (hold, with the Templars) | Bulwark — armour on a friendly unit or the gate (Inner Fire, structures allowed) | Stand Fast — armour aura, garrison included (Devotion Aura) | Hold the Line — damages and slows the press at the gate (Thunder Clap) | Dawn at the Gate — undead nearby deal less damage (Howl of Terror) |

Rules for every kit: stock bases only, no trigger, no JASS; no relocation of any kind — speed along roads and a dash of at most one gate width are allowed, teleport, blink, recall and pulls are not — checked at load from `config/`, and no teleport item in the loot table; no Resurrection; nothing touches blight or the day state; auras and casts reach the garrison; commanders never morph. A dead commander revives at his town after a delay (cost and delay in `config/`; no altar). Each commander carries the 3.0 equipment slots and bag and a talent tree (at most 6 tiers); a Tome of Talent arrives at every second dawn the captain's gate held, six in a full match.

## Chapter 3: The wild

### Decision 3.1: Loot
**Chosen Answer:** Custom items (new, or juiced edits of stock) earned by side objectives in the wild and by killing undead champions. Drops are team-fair (shared stash or a drop per player), never to whoever clicked.
**Rationale:** The wild's third reason to exist (shortcut, rituals, loot); loot is what the group talks about afterwards.
**Date Locked:** 2026-10-15  ·  **Affects:** item table, champion units, side-objective triggers
**Change Rule:** —
**Note 2026-10-16 (Plate III council):** loot is gear in the 3.0 equipment slots — custom gear built from classic items, with "Include as Random Choice" off. Camp-v: a side objective about 130 up the valley's short road gives the valley's captain a daylight trip like the others'.

### Decision 3.2: Camera vignettes
**Chosen Answer:** Clicking a resource site (between waves) may lock the camera to an authored shot of the site with a Lua frame showing rate and the next upgrade. Dressing, approved as dressing.
**Rationale:** The "alive" moment Jordan wants; constrained by the no-hijack non-negotiable.
**Date Locked:** 2026-10-15  ·  **Affects:** camera setups, Lua UI frames
**Change Rule:** Must be skippable and never fire during a wave.

### Decision 3.3: Undead air (agent's call, OWN-05)
**Chosen Answer:** Light and late. No fliers on nights 1–3; from night 4 a small flying group of at most one fifth of a wave; the boss night may bring one large flier. Values in `config/` (`air.first_night`, `air.max_share`), tuned at the greybox.
**Rationale:** There is no player air T3 (2.1), so Riflemen and the gate's two tower slots must be enough; air ignores the chokepoint graph, so it stays a minority and the gate stays the fight. The flier type (gargoyles) is from memory.
**Date Locked:** 2026-10-16  ·  **Affects:** wave table, `config/`
**Change Rule:** Raising the air share past one fifth re-opens the player anti-air question.

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
| Which captain / T3 holds which town | Decides the map's roles | Human | Closed 2026-10-16 → Decision 2.1 amendment |
| The hero | It is what the player *is* | Human | Closed 2026-10-16 → Decision 2.7 (custom commander per town) |
| Where the Templar sits if it is not the T3 | Decision 2.1 took it as T3; confirm | Human | Closed 2026-10-16 → confirmed as T3 |
| The three commanders' kits | What each captain does with his own hands | Human | Closed 2026-10-16 → Decision 2.7 amendment |
| The Blacksmith's role under 2.6 (it upgrades both armies: a second hybrid makes Hybrid a category) | Plot menus | Human | Open → Plate IV council |
| Gate repair between nights | 2.4 is silent | Human | Open → Plate IV council |
| Spike nights and their strength; two towns spiking on one night | "Time, never safety" cannot be checked without them | Human | Open → the wave table |
| Commander XP and level curve | When kits and talents arrive | Agent | Open → greybox |
| Engine checks: unselectable-but-attackable garrison; Blacksmith upgrades mirrored to the garrison owner; Righteous Fury's range; the move-speed cap; every ability base | All from memory | Agent | Open → toolchain recon |
| Plot count and menu contents | Defines the fork | Human | Open → Plate IV council |
| Night count / day length / buff values | Match length | Human | Open → the council's defaults until the greybox test (12 nights of 188 s, day 92 s, day 0.60 × blight 1.25 — fewer nights buy a longer day) |
| Undead air: how much, so Riflemen + towers are enough | No player air T3 | Agent | Closed 2026-10-16 → Decision 3.3 |
| Ritual mechanics: what weakens the boss per ritual, acolyte behaviour | Win B | Human | Open → Plate V council (decided 2026-10-16: a destroyed ritual takes its blight with it) |

## Change Log
| Date | Change | Reason | Affected Areas |
|------|--------|--------|----------------|
| 2026-10-15 | Initial scaffold | — | (whole tree) |
| 2026-10-15 | Chapters 1–3 from the first council session (chat, voice + text) | Design-first pass | DECISIONS.md |
| 2026-10-15 | Terms: three TOWNS of one province; the overrun province is the wild; players are CAPTAINS awaiting the KING'S ARMY. Decision 1.5 (the towns' terrain). Deck becomes one living HTML brief (no PNG plates). | Owner, after Plate I | DECISIONS.md 1.2, 1.5; design/ |
| 2026-10-15 | Decision 1.5 amended: winding river; towns farther apart; a bridge on the hill↔valley road; a mountain ridge down the whole west border; a thick forest border down the whole east. | Owner, after Plate I's sketch | DECISIONS.md 1.5; design/index.html Plate I |
| 2026-10-15 | Repo brought under design-first 0.1.38: the brief's colours and fonts move to `design/deck_vellum_tokens.css` (GAME-07, look unchanged); `.gitattributes` (DES-09, late); `## Next session` in the hand-off (DES-14); the empty catch in `brief.js` carries its reason (OBS-04). | Kit Doctor RED on this repo | design/, docs/HANDOFF.md, .gitattributes |
| 2026-10-15 | Owner ruling: the brief keeps the deck_vellum skin and its animations — an exception to the default skin (SKIN-02) and to the no-ambient-motion rules (WEB-06, SKIN-06, DISP-02). Every animation has a static form under reduced motion (SAFE-05). The bridge joins Non-Negotiable Constraints. | Owner, 2026-10-15 session prompt | design/; DECISIONS.md constraints |
| 2026-10-16 | Plate I's map called accurate. The repository is made public and pushed, so a cloud session can open it; the brain, the kit and the council seats stay local. | Owner | design/index.html Plate I; GitHub visibility |
| 2026-10-16 | Decision 1.4 amended by council (Plate II): two capped modifiers on damage dealt (night = baseline), bases = the ritual compounds, blight retreats when a ritual falls, dusk warning and ramp, nights-left board line, start at dawn and relief at the dawn after the last night, scripted wave spawns. Change rule reworded to the day state. | Council, `records/council-2026-10-16-plate-2-clock.md`; owner's yes | DECISIONS.md 1.4; Open Questions |
| 2026-10-16 | Open questions worked: Templar confirmed as T3; T3 by town (hill Siege, valley Knights, forest Templars); Decision 2.7, a custom commander per town (kits → Plate III council); Decision 3.3, undead air light and late (agent's call); plots → Plate IV council; ritual mechanics → Plate V council; night values stay defaults until the greybox. | Owner's answers and yes, `records/open-questions-2026-10-16.md` | DECISIONS.md 2.1, 2.7, 3.3; Open Questions |
| 2026-10-16 | Decisions 2.3 and 2.7 amended by council (Plate III): Barracks tiers add posts and types, quality from a Blacksmith; slow refill; seed watch; default rally at the gate; see your gate from away; terms field force and commander; the three kits on stock bases (Engineer, Knight-Marshal, Castellan); no relocation, no Resurrection; revive at the town; 3.0 equipment and dawn talents. 3.1 note: loot as gear, Camp-v. | Council, `records/council-2026-10-16-plate-3-two-armies.md`; owner's yes | DECISIONS.md 2.3, 2.7, 3.1; Open Questions |
