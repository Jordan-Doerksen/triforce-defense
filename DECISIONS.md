# Decisions Manifest — Triforce-Defense
**Started:** 2026-10-15  ·  **Last Updated:** 2026-10-17  ·  **Status:** In Design

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
- **A setup phase.** The match opens with a calm, planned setup for the host, built with Lua frames: modes, modifiers, settings, a full presentation layer. The game is simple in essence; the presentation goes all out. (Owner, 2026-10-16. The *how* is open: `records/owner-notes-2026-10-16.md` has three options.)

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
**Chosen Answer:** Day/night. Waves come at night; a match is **13 nights** (amended 2026-10-16, owner: "the number for sure"; ~40 min). A second mode, planned for later, doubles it: a hard mode of 26 nights. Undead take a large debuff by day and a large buff on blight. Rituals and undead bases sit on blight.
**Rationale:** The map teaches the push window — you push in daylight — with no rule text. Closes "match length" and "ritual hardening" at once.
**Date Locked:** 2026-10-15  ·  **Affects:** `config/` (night count, day length, buff values), the day/night Lua periodic, blight placement
**Change Rule:** The night buff needs a visible tell on the unit or a player who dies at dusk learns nothing.

### Decision 1.5: The three towns
**Chosen Answer:** **The hill town** — on high ground, a river running through it, a waterfall at its eastern border. **The valley town** — in the middle, a lake inside its walls. **The forest town** — in thick forest, thinner woods connecting it to the valley. Edges: hill ↔ valley (down beside the falls), valley ↔ forest (the thin woods). Hill ↔ forest only through the overrun north.
**Rationale:** Each town is a place before it is a base; the terrain gives the three captains different ground to hold and makes the graph legible on sight.
**Date Locked:** 2026-10-15  ·  **Affects:** terrain, chokepoints, T3-to-town assignment (open)
**Amended 2026-10-15 (owner, after Plate I's sketch):** the river WINDS; the towns sit farther apart; there is a BRIDGE on the hill↔valley road (non-negotiable — the owner loves bridges); a MOUNTAIN RIDGE runs down the entire west border of the map; a THICK FOREST BORDER runs down the entire east. The Plate I sketch must be redrawn to this before it is called accurate.
**Amended 2026-10-16 (owner):** the valley's lake is not wholly inside the walls — it straddles the south wall, half in and half out, and the river ends in it.
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
**Chosen Answer:** One fixed gate structure per province with HP and armour upgrades and two tower slots. Identical in every province.
**Amended 2026-10-17 (owner):** the two slots are **scout-tower plots behind the wall**, flanking the gate, not on the gate itself. Repair: Decision 6.7.
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

## Chapter 4: The war council (the setup phase)

### Decision 4.1: How the setup phase is built
**Chosen Answer:** **The war council.** The default UI is hidden; full-screen Lua/FDF frames carry the setup. Stock dialogs are wired as a fallback behind one flag in `config/`. The host's choices are synced to every client (`BlzSendSyncData`) before the first day.
**Rationale:** The law says a full presentation layer; frames are the only way to one. Dialogs cost days and keep the map playable if frames break on a patch.
**Date Locked:** 2026-10-17  ·  **Affects:** Lua (frames, sync), FDF/TOC imports, `config/`
**Change Rule:** The fallback must always start a legal match with the same settings.

### Decision 4.2: Seats
**Chosen Answer (amended 2026-10-17, owner):** **Each captain takes a charge** with one button: three charges (the hill, the valley, the forest), first come first served, no swapping, no host override. The charge shows the town's T3 so the pick is a role pick. On the click, your champion walks into the firelight and stands with the others.
**Rationale:** The other two must do something at the council. Swapping was dropped as trouble for a feature that does not matter among friends.
**Date Locked:** 2026-10-17  ·  **Affects:** council frames, player ↔ town mapping
**Change Rule:** —

### Decision 4.3: The host's panel at version one
**Chosen Answer:** Two settings only: **mode** (13 nights, or the hard mode's 26) and **one difficulty dial** that scales wave size and undead stats. Night-event toggles and purse/timer presets wait.
**Rationale:** The prototype syncs one setting first; a dial keeps modifiers from sprawling.
**Date Locked:** 2026-10-17  ·  **Affects:** `config/` (mode, difficulty table), wave table
**Change Rule:** A new setting needs a reason it cannot be a notch on the dial.

### Decision 4.4: The scene
**Chosen Answer (amended 2026-10-17, owner):** **A love letter to Diablo II's character screen.** The dark; a fire; the captains' champions standing around it as they are chosen; the frames float at the edges. A real scene, not a flat image: embers rising, the fire's flicker on the figures, a hound, crows on a dead tree, the towns' standards, distant thunder. The round table and the hall are dropped. Never seen again in play.
**Rationale:** The one place the no-hijack law does not bind, so the set piece goes here; the Diablo II screen is the group's shared memory of what "choose your character" should feel like.
**Date Locked:** 2026-10-17  ·  **Affects:** terrain (the hall), camera setup, council frames
**Change Rule:** —

## Chapter 5: The captains

### Decision 5.1: The hero
**Chosen Answer:** **One fixed hero per town**, custom, whose kit matches the town's T3 and flavour. Three heroes to build and balance. **Level cap 20.** Castle unlocks the hero's final ability tier (Decision 6.2).
**Rationale:** You are your town. Three kits is the most the group can balance.
**Date Locked:** 2026-10-17  ·  **Affects:** data editor (three heroes), XP table, Castle
**Change Rule:** A fourth hero re-opens the roster.

### Decision 5.2: Town ↔ T3
**Chosen Answer:** **The hill: Siege Engine (break). The valley: Knight (move). The forest: Templar (hold).**
**Rationale:** Owner's call. Engines come down off the high ground by the safe road; the middle town's riders reach either neighbour; the forest holds in cover.
**Date Locked:** 2026-10-17  ·  **Affects:** main halls, terrain roles, the heroes
**Change Rule:** Swapping any two re-opens 5.1's kits.

### Decision 5.3: Town flavour
**Chosen Answer:** The shared roster leans slightly per town: **the hill, armour; the valley, speed; the forest, damage.** Slight: the units stay very similar.
**Rationale:** Each lean rhymes with the T3 and the ground.
**Date Locked:** 2026-10-17  ·  **Affects:** data editor (three unit variants per shared unit, or per-town upgrades)
**Change Rule:** No lean may exceed what a single blacksmith tier gives.

## Chapter 6: The living town

### Decision 6.1: The site ladder
**Chosen Answer:** Each lumber mill and gold mine starts with one peasant and takes **up to five; each next peasant costs more.** Every bought peasant appears and works the site. Total income per town is capped the same everywhere; only the gold/lumber mix differs (Decision 2.2 holds).
**Rationale:** The ladder is visible as people, and the cap keeps 2.2's rule.
**Date Locked:** 2026-10-17  ·  **Affects:** `config/` (peasant prices and rates), site Lua, the site window
**Change Rule:** —

### Decision 6.2: Main-hall tiers
**Chosen Answer:** **Town Hall** opens the first ring of plots. **Keep** opens the second ring and the blacksmith's tiers 3–4. **Castle** opens the last plots, the T3, the blacksmith's tiers 5–6 and the hero's final ability tier. **Each tier also raises the garrison's** rate and quality beside the Barracks.
**Rationale:** The hall is the town's growth, visible on the ground as rings of plots light up.
**Date Locked:** 2026-10-17  ·  **Affects:** plot units (ring gating), garrison Lua, blacksmith research gating
**Change Rule:** —

### Decision 6.3: The plot menu and the plot count
**Chosen Answer:** Nine options: **Barracks · Blacksmith · Farm · Market · Workshop · Arcane Sanctum · Guard Tower · Arcane Tower · Aviary.** **Six plots per town, 2 / 2 / 2 by hall tier.** The sites (mill, mine) are not plots; they stay pre-placed. Same count and menu in every town.
**Rationale:** Six of nine, and the Barracks takes one: five real choices.
**Date Locked:** 2026-10-17  ·  **Affects:** plot units, building menus
**Change Rule:** Decision 2.5's rule stands: no strictly-best option.

### Decision 6.4: The blacksmith
**Chosen Answer:** **Six tiers** of weapons and six of armour, flat steps: tiers 1–2 at Town Hall, 3–4 at Keep, 5–6 at Castle. The unit's look changes at tiers 3 and 5.
**Rationale:** Late nights scale by upgrades, not by spamming units; six steps carry a footman through thirteen nights.
**Date Locked:** 2026-10-17  ·  **Affects:** research table, unit art variants
**Change Rule:** —

### Decision 6.5: Set pieces
**Chosen Answer:** **Every plot builds itself in view, then stays alive.** Choose on the plot's card; its authored scene plays where you already are: scaffolds, peasants walking in, doodads filling (fields, anvil and sparks, stalls). No camera move, ever. Built, it stays alive (workers, smoke, animals), and a click opens a small Lua window: rate or stock and the next upgrade. Decision 3.2's camera vignette stays optional and between waves.
**Rationale:** The living window the owner wants, inside the no-hijack law.
**Date Locked:** 2026-10-17  ·  **Affects:** every plot building's build sequence, doodad sets, Lua window frames
**Change Rule:** A scene that moves the camera is a 3.2 vignette, not a set piece.

### Decision 6.6: The market
**Chosen Answer:** Consumables and starter gear, stock growing by hall tier: Town Hall potions, scrolls of town portal (home only), a boot and a ring; Keep the next step of each; Castle one rare per market, rolled at setup. The wild's loot stays the only source of the good items.
**Rationale:** The market never competes with going north.
**Date Locked:** 2026-10-17  ·  **Affects:** item table, market stock by tier
**Change Rule:** —

### Decision 6.7: Repair
**Chosen Answer:** **A Barracks crew that sallies.** The Barracks houses a repair crew: two peasants at Barracks I, three at II, four at III. When the gate takes damage they run out and repair it, and run back when it stops. Repair costs gold and lumber per hit point (the engine's own rule), drawn from the captain's purse as they work. No clicks; no separate upgrade; the crew rides the Barracks level.
**Rationale:** Holding swarms needs repair; the garrison was meant to spare the captain the micro; the cost is visible on the purse and the crew is visible on the ground, like an orc burrow emptying.
**Date Locked:** 2026-10-17  ·  **Affects:** Barracks data (crew per tier), repair Lua (sally on damage, return on calm), `config/` (crew sizes, repair cost per HP)
**Change Rule:** The crew repairs the gate only, never towers or buildings, unless a decision says so.

## Chapter 7: The nights

### Decision 7.1: Event nights
**Chosen Answer:** **Nights 3, 6, 9 and 12 are event nights**, known in advance. The event is drawn from a pool (undead air raid; cultist insurgents raising the dead inside a base; an evil fog that cuts vision; more later) and announced at dusk with a visible tell. Hard mode: every third night of 26.
**Rationale:** Predictable rhythm, surprising content; the hold-or-move decision survives because the group can plan the night.
**Date Locked:** 2026-10-17  ·  **Affects:** event Lua, the event pool in `config/`, the dusk tell
**Change Rule:** An event must leave the garrison able to buy time: never a wipe by itself.

---

## Build Timeline
| Phase | Chunk | Dependencies | Status | Review Date |
|-------|-------|--------------|--------|-------------|
| 0 | The deck: one sentence · node graph · two armies · province · wild (design/, one slide per locked decision) | this manifest | In Design | — |
| 1 | Toolchain recon, then the war council prototype: one synced setting (13/26) on full-screen frames, dialogs behind the fallback flag | Phase 0 | Planned | — |
| 2 | Terrain: the node graph as real geometry, plots, gates, sites, blight | Phase 0 | Planned | — |
| 3 | Data editor: plots, gate, main halls, Templar, garrison owner | Phase 2 | Planned | — |
| 4 | Lua: day/night buffs, garrison, rituals → boss, win conditions | Phase 3 | Planned | — |
| 5 | Items, vignettes, side objectives | Phase 4 | Planned | — |

Status ∈ **Planned · In Design · Locked · Built · Superseded**.

## Open Questions
| Question | Why It Matters | Owner | Status |
|----------|----------------|-------|--------|
| The three heroes' kits (abilities, the final tier at Castle) | Decision 5.1 names them; nothing is designed | Human | Open |
| Day length and the buff values; the difficulty dial's notches | Match feel; Decision 4.3's one dial | Human | Open (13 nights sealed) |
| Undead air: how much, so Riflemen + towers + the Aviary are enough | No player air T3 | Agent | Open |
| Ritual mechanics: what weakens the boss per ritual, acolyte behaviour | Win B | Human | Open |
| The event pool: the three named events' mechanics, and what else joins the pool | Decision 7.1 | Human | Open |
| The fire scene: its dressing and environmental touches, where in the world it sits | Decision 4.4 | Human | Open |
| Peasant prices and site rates; the hall's garrison bonus per tier | Decisions 6.1, 6.2; lives in `config/` | Agent | Open |

## Change Log
| Date | Change | Reason | Affected Areas |
|------|--------|--------|----------------|
| 2026-10-15 | Initial scaffold | — | (whole tree) |
| 2026-10-15 | Chapters 1–3 from the first council session (chat, voice + text) | Design-first pass | DECISIONS.md |
| 2026-10-15 | Terms: three TOWNS of one province; the overrun province is the wild; players are CAPTAINS awaiting the KING'S ARMY. Decision 1.5 (the towns' terrain). Deck becomes one living HTML brief (no PNG plates). | Owner, after Plate I | DECISIONS.md 1.2, 1.5; design/ |
| 2026-10-15 | Decision 1.5 amended: winding river; towns farther apart; a bridge on the hill↔valley road; a mountain ridge down the whole west border; a thick forest border down the whole east. | Owner, after Plate I's sketch | DECISIONS.md 1.5; design/index.html Plate I |
| 2026-10-15 | Repo brought under design-first 0.1.38: the brief's colours and fonts move to `design/deck_vellum_tokens.css` (GAME-07, look unchanged); `.gitattributes` (DES-09, late); `## Next session` in the hand-off (DES-14); the empty catch in `brief.js` carries its reason (OBS-04). | Kit Doctor RED on this repo | design/, docs/HANDOFF.md, .gitattributes |
| 2026-10-17 | Decision 6.7 repair: a Barracks crew that sallies (2 / 3 / 4 peasants by Barracks tier), gate only, cost per HP from the purse. | Owner | DECISIONS.md 6.7 |
| 2026-10-17 | Owner, after the mockups: 4.2 no swapping, one button, your champion walks to the fire; 4.4 the scene is a Diablo II character-screen love letter around a fire, not a round table; 2.4 the tower slots are scout-tower plots behind the wall; repair opened as a question. | Owner | DECISIONS.md 2.4, 4.2, 4.4 |
| 2026-10-17 | The notebook interviewed, one question at a time (`records/interview-2026-10-17.md`): chapters 4–7 sealed (the war council; the captains; the living town; the nights). Open questions rewritten. | Owner | DECISIONS.md ch. 4–7 |
| 2026-10-16 | Owner's ideas dump recorded in `records/owner-notes-2026-10-16.md`. Sealed: 13 nights (1.4 amended; hard mode of 26 planned), and a setup phase as a non-negotiable constraint. Ten new open questions. | Owner | DECISIONS.md 1.4, constraints, Open Questions; records/ |
| 2026-10-16 | Decision 1.5 amended: the valley's lake half inside the walls, half out. The map redrawn in a Tolkien hand (sepia ink, uncial region names, hill bumps, a compass rose, a cartouche); a thread of Middle-earth through the design document (uncial drop caps, leaf-and-vine rules, a verse on the cover, a ring on the clock). | Owner | DECISIONS.md 1.5; design/ |
| 2026-10-16 | The brief is redone as one scrolling site on glass panels in a Warcraft III look (`design/index.html`, tokens `warglass_tokens.css`); the vellum plates retire. Desktop only. | Owner: "not cards like a PowerPoint"; personal, read often | design/ |
| 2026-10-15 | Owner ruling: the brief keeps the deck_vellum skin and its animations — an exception to the default skin (SKIN-02) and to the no-ambient-motion rules (WEB-06, SKIN-06, DISP-02). Every animation has a static form under reduced motion (SAFE-05). The bridge joins Non-Negotiable Constraints. | Owner, 2026-10-15 session prompt | design/; DECISIONS.md constraints |
