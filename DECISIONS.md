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

## The look
**Diablo II meets Warcraft III meets The Lord of the Rings, with a Halloween lean, all drawn in the aesthetic of the Madness flash animations.** (Owner, 2026-10-17.) Diablo II: the dark, firelight, gothic gravity. Warcraft III: the forts, the gold trim, the command card. The Lord of the Rings: the ridge, the standards, the map hand, the verse. Halloween: the moon, bats, pumpkins at the gate, tombstones, hooded cultists, purple blight. Madness: flat shapes with thick black outlines, a tight dark palette, snappy stepped motion, no faces.
**Where it governs (owner, 2026-10-17, after the council):** the paper and the frames: this document, the war council's frames, the living windows, every tooltip and banner. **In play the world is Reforged's own art at night** (stock models only); the look reaches the match as **one authored Halloween beat per town** that stock doodads can carry (a graveyard, a ruined chapel, jack-o'-lanterns on the gate, blight), and the north's villages and bases dressed from the same kit.

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
- **Stock models only.** Nothing is downloaded or installed. Anything already in the game's files is fair, and the campaign models (Garithos, Arthas, the Captain, the named heroes) are a must: all the variety the game has, changed only by data (tint, scale, abilities, names). (Owner, 2026-10-17.)
- **A setup phase.** The match opens with a calm, planned setup for the host, built with Lua frames: modes, modifiers, settings, a full presentation layer. The game is simple in essence; the presentation goes all out. (Owner, 2026-10-16. The *how* is open: `records/owner-notes-2026-10-16.md` has three options.)

---

## Chapter 1: Shape of the game

### Decision 1.1: What engine and who plays it?
**Chosen Answer:** Warcraft III Reforged custom map. 3 players v undead AI. Audience: the Discord group.
**Rationale:** Solves the three things that killed the last games — no players, no level design, engine work. Friends own it and will play it.
**Date Locked:** 2026-10-15  ·  **Affects:** everything
**Change Rule:** None — this is the premise.

### Decision 1.2: What is the map?
**Chosen Answer (amended 2026-10-15, terms):** ONE province, THREE TOWNS — one per player. The bordering province to the north has been overrun by the undead; it is the wild, both where the waves come from and the fast shortcut between towns. Towns are linked indirectly by chokepoints. The players are charged with the defence of their towns until the **King's army** arrives (the word "captain" for the player retired 2026-10-17; see 2.1).
**Rationale:** Node graph first: three nodes, chokepoint edges, one hostile hub. The safe path is slow and narrow; the fast path runs through the enemy — a real decision every time someone reinforces a friend. "Province" now means the realm the three share; a town is a player's charge.
**Date Locked:** 2026-10-15  ·  **Affects:** terrain, pathing, wave spawns
**Change Rule:** Any new region must say which edge of the graph it is.

### Decision 1.3: What ends a match?
**Chosen Answer:** Two wins. **A:** survive to the final wave and hold until relief. **B:** destroy the three cultist rituals in the north (an obelisk with acolytes, or similar); each ritual destroyed weakens the final boss; all three destroyed ends the match early.
**Rationale:** Both endings live in the same region the players already have reasons to enter. Partial credit means a 1-for-3 team feels the difference; all-or-nothing would not.
**Date Locked:** 2026-10-15  ·  **Affects:** wave table, boss, ritual units, win triggers
**Change Rule:** Re-run the council if the rituals move out of the north or stop feeding the boss.

### Decision 1.4: What is the clock?
**Chosen Answer:** Day/night. Waves come at night; a match is **13 nights** (amended 2026-10-16, owner: "the number for sure"). A second mode, planned for later, doubles it: a hard mode of 26 nights.
**Amended 2026-10-17 (after the council):** the "~40 minutes" is unsealed; three minutes a cycle cannot hold a ritual strike, a Castle, six smith tiers or twenty levels. **The cycle is set from the walk, not from a wish:** the day must hold a ritual strike (walk to the nearest ritual, kill the acolytes inside the bell's window, break the obelisk, walk home) with margin; the night must hold a Warcraft-sized wave (90–120 s of fighting). **First test value: a 6-minute cycle, 4 of day and 2 of night** (~90 min with the council and a longer night 13); fallback 5 minutes. Measured at the editor desk against the actual walk. The difficulty dial never touches the cycle. Research: `docs/RESEARCH-PACING.md`. Undead take a large debuff by day and a large buff on blight. Rituals and undead bases sit on blight.
**Rationale:** The map teaches the push window — you push in daylight — with no rule text. Closes "match length" and "ritual hardening" at once.
**Date Locked:** 2026-10-15  ·  **Affects:** `config/` (night count, day length, buff values), the day/night Lua periodic, blight placement
**Change Rule:** The night buff needs a visible tell on the unit or a player who dies at dusk learns nothing.

### Decision 1.5: The three towns
**Chosen Answer:** **The hill town** — on high ground, a river running through it, a waterfall at its eastern border. **The valley town** — in the middle, a lake inside its walls. **The forest town** — in thick forest, thinner woods connecting it to the valley. Edges: hill ↔ valley (down beside the falls), valley ↔ forest (the thin woods). Hill ↔ forest only through the overrun north.
**Rationale:** Each town is a place before it is a base; the terrain gives the three players different ground to hold and makes the graph legible on sight.
**Date Locked:** 2026-10-15  ·  **Affects:** terrain, chokepoints, T3-to-town assignment (open)
**Amended 2026-10-15 (owner, after Plate I's sketch):** the river WINDS; the towns sit farther apart; there is a BRIDGE on the hill↔valley road (non-negotiable — the owner loves bridges); a MOUNTAIN RIDGE runs down the entire west border of the map; a THICK FOREST BORDER runs down the entire east. The Plate I sketch must be redrawn to this before it is called accurate.
**Amended 2026-10-16 (owner):** the valley's lake is not wholly inside the walls — it straddles the south wall, half in and half out, and the river ends in it.
**Change Rule:** A new edge between hill and forest re-opens the whole graph.

## Chapter 2: The town (formerly "the province")

### Decision 2.1: Who are the three?
**Chosen Answer:** All Human. Shared T1–T2 roster. Each province's main hall (Town Hall → Keep → Castle) carries small flair, and Castle unlocks that province's T3: **Knight** (move) · **Siege Engine** (break — win B runs through this player) · **Templar** (hold — custom holy infantry: footman body, priest heal/dispel; working name).
**Amendment (2026-10-17, owner):** the three are the towns' **special units**: stock units with bonuses and **one baked-in unit ability**, no hero levels, no hero card. The Templar is a holy warrior with **Dispel Magic and Heal** baked in. The words, from today: the **player** is the person; the **hero** is the player's hero (chapter 8); the **special unit** is the town's T3. "Captain" and "champion" are retired as words for people or heroes; the Captain is only the stock model.
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
**Amendment (2026-10-17, owner): the garrison's captain.** Each garrison has **one captain**: a stronger version of the town's special unit (2.1), in the garrison's tint, bigger, standing behind the gate. **Not a hero**: no levels, no abilities beyond the special unit's baked-in one, no card. When he dies the Barracks **produces another the way it produces every garrison soldier**, at its rate. The agent proposed a levelling captain with a floor; the owner scrapped levels: a captain that levels is a death spiral for the town that loses him.
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
**Amended 2026-10-17 (owner):** the exception becomes the rule: **every Offensive building feeds the garrison by its level**: the Barracks footmen, the Arcane Sanctum priests and sorceresses, the Workshop mortar teams; which units and how many is set by the building's level. "Hybrid" is simply what Offensive means now; 2.6's change rule is spent.
**Rationale:** The three roles are the hold / move / pay spend made legible on the plot menu. A "Hybrid" category with one member is an exception wearing a label.
**Date Locked:** 2026-10-15  ·  **Affects:** plot menus, Aviary data, Barracks
**Change Rule:** A second hybrid building makes Hybrid a real category; until then, no.

### Decision 2.7: Defeat
**Chosen Answer:** **The gate's fall is a breach, not a defeat**: the horde is in the streets and the Town Hall is the last stand. **A hero who dies revives at his own Town Hall** (timer and gold, by level). **When the Town Hall falls the town is sacked, for good:** it becomes its own overrun village, undead ground, blighted, and **the wave that would have attacked it attacks one of the standing towns instead, chosen at random at each wave's start: it spawns at the sacked town and marches the roads to its target** (the bridge road, the thin woods, or the north), the bell naming the target at wave start, so the field forces can meet it on the road. The sacked player keeps his hero, his field force and his purse, and fights on from a friend's town; his sites and plots are gone. The match is lost when all three halls have fallen.
**Rationale:** Owner: the hall, not the gate, is the town. The agent's pushback, accepted by the owner: a town lost for good means a friend without a home for the rest of the hour; the owner takes that for the drama, and the redirected wave makes the loss everyone's.
**Date Locked:** 2026-10-17  ·  **Affects:** the hall's death trigger, ownership flip and blight of the sacked town, the wave table's redirect, the revive Lua, win/lose triggers
**Change Rule:** A sacked town is never retaken at version one; a retake rule is a new decision.

## Chapter 3: The wild

### Decision 3.1: Loot
**Chosen Answer:** Custom items (new, or juiced edits of stock) earned by side objectives in the wild and by killing undead champions. Drops are team-fair (shared stash or a drop per player), never to whoever clicked.
**Rationale:** The wild's third reason to exist (shortcut, rituals, loot); loot is what the group talks about afterwards.
**Date Locked:** 2026-10-15  ·  **Affects:** item table, champion units, side-objective triggers
**Change Rule:** —

### Decision 3.3: The wild's side content
**Chosen Answer:** **Three authored places, one nearest each town, plus a daily bounty.** The orc camp among **the old stones** by the hill; the night elf camp in **the thin woods** by the forest; **the ruined mill** by the valley as a nest: hitting it rings a small bell and brings its own pack, a readiness bet. Each camp holds a quest-giver; taking the quest **spawns a named undead champion** that exists only because the quest was taken, at an authored spot; the kill pays experience to all three (5.4) and the camp's reward. The orc camp's reward is **the Claw**: Bloodlust on the wielder on hit, by a small damage-event routine (the roster's third Lua piece after Charge and the stat bracket); data-only fallback, the claw as an active that casts Bloodlust on an ally with charges. The night elf camp's reward is **the Moonglaive**: Rejuvenation on the wielder on hit, the Claw's mirror on the same routine. Then the repeatable layer: at each dawn **one undead champion appears at one of six authored spots**, marked on the map, and pays loot and experience if killed before dusk. **Ritual loot stays strictly better than any bounty.**
**Rationale:** The scaling route (ruling 1, 5.4) needs content for thirteen days; three one-offs are three events, not a route, so the bounty repeats. Age of Darkness: side content is a bet, not a chore. They Are Billions: poking a nest is a readiness decision. Owner's additions: the two camps and the Claw. Agent's folds, accepted unless the owner says five: the camps sit on the sites already drawn, so three places, three kinds.
**Date Locked:** 2026-10-17  ·  **Affects:** terrain (three places, six bounty spots), quest triggers, two champions, the bounty spawner, the item table, one Lua on-hit routine
**Change Rule:** A bounty never out-pays a ritual. A quest champion exists only after its quest is taken. On-hit procs on the wielder are Lua; the fallback is always a data-only active.

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
**Chosen Answer (amended 2026-10-17, owner, twice):** **Each player takes a charge** with one button: three charges (the hill, the valley, the forest), no swapping, no host override. **Picks go in lobby-slot order, one player at a time, each with a short timer** (council ruling 8): no race by construction, nothing to arbitrate, and the fire takes turns instead of a scramble. The host's two settings still travel as synced values. The charge shows the town's T3 so the pick is a role pick. On the click, your champion walks into the firelight and stands with the others.
**Rationale:** The other two must do something at the council. Swapping was dropped as trouble for a feature that does not matter among friends.
**Date Locked:** 2026-10-17  ·  **Affects:** council frames, player ↔ town mapping
**Change Rule:** —

### Decision 4.3: The host's panel at version one
**Chosen Answer:** Two settings only: **mode** (13 nights, or the hard mode's 26) and **one difficulty dial** that scales wave size and undead stats. Night-event toggles and purse/timer presets wait.
**Rationale:** The prototype syncs one setting first; a dial keeps modifiers from sprawling.
**Date Locked:** 2026-10-17  ·  **Affects:** `config/` (mode, difficulty table), wave table
**Change Rule:** A new setting needs a reason it cannot be a notch on the dial.

### Decision 4.4: The scene
**Chosen Answer (amended 2026-10-17, owner):** **A love letter to Diablo II's character screen.** The dark; a fire; the players' heroes standing around it as they are chosen; the frames float at the edges. A real scene, not a flat image: embers rising, the fire's flicker on the figures, a hound, crows on a dead tree, the towns' standards, distant thunder. The round table and the hall are dropped. Never seen again in play.
**Rationale:** The one place the no-hijack law does not bind, so the set piece goes here; the Diablo II screen is the group's shared memory of what "choose your character" should feel like.
**Date Locked:** 2026-10-17  ·  **Affects:** terrain (the fire scene, off the playable map), camera setup, council frames
**Change Rule:** —

## Chapter 5: The heroes

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

### Decision 5.4: Shared experience
**Chosen Answer:** **Hero experience is shared across the three heroes**, wherever the kill happens, and **the wild pays experience too**: its champions and side objectives. The hero who rides out never falls behind the one who stays at the gate.
**Rationale:** Waves die at the gate, so unshared XP rewards sitting and punishes the moving play the design wants. Without this, 9.4's "out-scale it" is a sentence, not a system.
**Date Locked:** 2026-10-17  ·  **Affects:** XP Lua (shared pool), the wild's champion and objective data (3.1)
**Change Rule:** 3.1's side objectives must be designed before the scaling route is called real; they are an open question.

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
**Chosen Answer (amended 2026-10-17, owner, after the council):** **The town's spine is pre-built**, authored and standing on the first day: **a Barracks at level I, one Farm, the Lumber Mill, the Blacksmith** (and the gold mine as a site). **The six plots are for choices**, 2 / 2 / 2 by hall tier, and the menu is seven: **Farm · Guard Tower · Arcane Tower · Arcane Sanctum · Workshop · Market · Aviary.** The questions a plot asks: more army, so more farms? weak ranged, so a tower inside the walls? priests, sorceresses, spell breakers, so a Sanctum? siege, so the Workshop? The Workshop trains **Mortar Teams for every town (slow siege) and no Flying Machine** (the air law); the Siege Engine stays the hill's fast siege (2.1, 5.2). Same spine, count and menu in every town.
**Agent's pushback, recorded:** six plots against seven options is not a fork of omission; the fork is **duplicates against variety**: a second and third Farm for a bigger field force, or the Sanctum and the Workshop. That is a real trade and it is the one to balance; the page stops saying "six of nine".
**Rationale:** The spine is the same everywhere so the fork is only ever the plots; the owner's questions above are the fork made plain.
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
**Chosen Answer (amended 2026-10-17, owner, after the council):** **A Barracks crew that sallies.** When the gate takes damage the crew runs out and repairs it, and runs back when it stops. **The crew is not player-controlled** (it belongs to the garrison's player, like the garrison). **Repair costs nothing per hit point; instead the crew's size is an upgrade bought with gold and lumber**, and **repair is rate-capped** (so many hit points a second per peasant, in config), so mass repair cannot be abused and the cost did not need to be. No clicks.
**Rationale:** Holding swarms needs repair; the garrison was meant to spare the player the micro; the crew is visible on the ground, like an orc burrow emptying. The council's risk (a per-hit-point bill draining a losing player mid-wave) is gone with the bill.
**Date Locked:** 2026-10-17  ·  **Affects:** Barracks data (crew per tier), repair Lua (sally on damage, return on calm), `config/` (crew sizes, repair cost per HP)
**Change Rule:** The crew repairs the gate only, never towers or buildings, unless a decision says so.

## Chapter 7: The nights

### Decision 7.1: Event nights
**Chosen Answer:** **Nights 3, 6, 9 and 12 are event nights**, known in advance. The event is drawn from a pool (undead air raid; cultist insurgents raising the dead inside a base; an evil fog that cuts vision; more later) and announced at dusk with a visible tell. Hard mode: every third night of 26.
**Rationale:** Predictable rhythm, surprising content; the hold-or-move decision survives because the group can plan the night.
**Date Locked:** 2026-10-17  ·  **Affects:** event Lua, the event pool in `config/`, the dusk tell
**Change Rule:** An event must leave the garrison able to buy time: never a wipe by itself.

---

## Chapter 8: The heroes

### Decision 8.1: The kit shape
**Chosen Answer:** Every hero has **two actives, one flavoured aura, Attribute Bonus, and one ultimate**: five ranks each for the four, one rank for the ultimate, which Castle gates (6.2). 21 ranks for 20 levels: a hero never maxes everything. Every ability is a stock ability with new ranks and numbers; one moderate Lua ability in the whole roster (the Marshal's Charge), with a stock fallback.
**Amendment (2026-10-17, 8.5):** every hero also carries **one free stock unit ability**, no rank to buy, driven by a secondary stat. The roster's Lua is therefore one ability (Charge) and one routine (the stat bracket, 8.5).
**Rationale:** Owner: the most ambitious thing planned yet, with harder things still to solve; keep the heroes simple. Items get the fun abilities later.
**Date Locked:** 2026-10-17  ·  **Affects:** three hero units, ability data, the XP table to 20
**Change Rule:** A new ability must name the stock ability it is built on.

### Decision 8.2: The Bombardier (the hill)
**Chosen Answer:** The stock **Mortar Team** model at hero scale. **Shell** (Flame Strike: long-range area shot) · **Shrapnel** (Fan of Knives: a burst around the hero, the mortar's self-defence) · **Trueshot Aura** (ranged damage: riflemen and engines) · Attribute Bonus · **Bombardment** (Starfall: channelled waves of shells over an area, siege damage). Free (8.5): **Flare**, the Mortar Team's own, on Intelligence.
**Amendment (2026-10-17):** Flare moved from the second active to the free slot; Shrapnel takes the active.
**Rationale:** The siege hero who sees and softens; the engines break.
**Date Locked:** 2026-10-17  ·  **Affects:** data editor
**Change Rule:** —

### Decision 8.3: The Marshal (the valley)
**Chosen Answer:** The campaign **Garithos** model, mounted. **Charge** (a Lua dash that knocks the first enemy down; the roster's one moderate ability; fallback **Lance** = Shockwave, a line of damage, behind a config flag) · **Rallying Cry** (Roar: allies near the hero hit harder for a while) · **Endurance Aura** (move and attack speed) · Attribute Bonus · **Stampede** (a line of charging beasts that trample; riderless horses if the beast field takes it). Free (8.5): **Defend**, the Footman's, on Agility.
**Rationale:** The hero of the road: the one who answers the call.
**Date Locked:** 2026-10-17  ·  **Affects:** data editor; one Lua ability
**Change Rule:** If Charge is not built by the end of Phase 4, Lance ships.

### Decision 8.4: The Prelate (the forest)
**Chosen Answer:** The stock **Captain** model at hero scale (1.3), in forest colours, Devotion Aura's ring under his feet for want of a hero glow. **Holy Light** (heals an ally or burns an undead) · **Holy Ward** (Healing Ward: a planted ward that regenerates allies around it) · **Devotion Aura** (armour) · Attribute Bonus · **Judgement** (Storm Bolt: one huge blow and a stun). Free (8.5): **Dispel Magic**, the Priest's, on Intelligence.
**Rationale:** The anvil at the gate.
**Amendment (2026-10-17):** the model was the campaign Arthas with the hammer; the owner changed his mind: the Captain, made bigger. Stock cannot add a hero glow to a unit mesh; the aura's ring stands in, with eyes open.
**Date Locked:** 2026-10-17  ·  **Affects:** data editor
**Change Rule:** —

### Decision 8.5: The free ability and the stat chase
**Chosen Answer:** Every hero carries **one stock unit ability from the data editor, free**: no rank to buy, on the card from level 1. It is the hero's flavour. Each is **driven by a secondary stat, by bracket**: the ability has ten levels in the editor, and one Lua routine sets its level from the stat whenever the hero levels or an item changes his stats. The Prelate: **Dispel Magic** on Intelligence (wider, harder on summons and the Lich's work). The Marshal: **Defend** on Agility (piercing shrugged off: the Spider Lord, the archers). The Bombardier: **Flare** on Intelligence (bigger, longer). Items that carry stats therefore feed the free ability; the market's ring and the wild's loot have a job.
**Rationale:** Owner: a reason to stat chase, and a hook for items to buff the flavour skill through stats. The agent's pushback taken: the secondary stat, not the primary, or there is no chase; levels by bracket, not live field writes, so it is data plus one routine. The command card is now full: six orders, four learned, the ultimate, the free one.
**Date Locked:** 2026-10-17  ·  **Affects:** data editor (three ten-level abilities), one Lua routine, items
**Change Rule:** A free ability is always a stock unit ability; the stat it reads is never the hero's primary.

### Decision 7.2: The evil fog
**Chosen Answer:** A fog rolls down at dusk. Every player's **vision radius drops** for the night, and the night's **wave takes low all-round buffs**: move speed, attack speed, damage, health, a light regeneration. Never godlike. The buffs **scale with which event night it is**: weakest on the first, strongest on the last.
**Rationale:** Owner's own design. The fog is the event that makes an ordinary wave frightening without new units.
**Date Locked:** 2026-10-17  ·  **Affects:** stock buff abilities applied to the wave, sight-radius change, `config/` (buff values per event night)
**Change Rule:** No single buff may exceed what one blacksmith tier gives the players.

### Decision 7.3: The air raid
**Chosen Answer:** The night's wave is normal at the gate, and **a flight of gargoyles comes over the wall from the north** to hit buildings, **the farms first**. Counter: riflemen, the Arcane Tower, the Aviary's gryphon patrols. The count scales with the event night.
**Rationale:** The one event that ignores the gate, so the hold-or-move spend has a third answer: anti-air inside the walls.
**Date Locked:** 2026-10-17  ·  **Affects:** stock Gargoyle; a Lua order to the raid target; `config/` (count per event night)
**Change Rule:** Gargoyles never target the gate or the garrison; buildings only.

### Decision 7.4: The insurgents
**Chosen Answer:** At dusk, **hooded cultists appear at an authored graveyard inside each town** (by the chapel, placed by the map author) and channel. **Every 20 seconds skeletons rise around them**; killing the cultists ends it. The garrison does not leave the gate for them: this is the field force's or the hero's job. The cultist count scales with the event night.
**Rationale:** The event that punishes an empty town: the hero who rode out has to come home, or trust the towers.
**Date Locked:** 2026-10-17  ·  **Affects:** stock Acolyte model, stock Raise Dead; a Lua channel timer; one authored graveyard plot per town (terrain)
**Change Rule:** The graveyard is authored ground, never a plot the player chose.

### Decision 7.5: The draw
**Chosen Answer:** Nights 3, 6 and 9 draw the three events **in a random order with no repeats**, so every match sees all three. **Night 12 draws any of the three at full strength.** When the pool has four, every night is unique. Hard mode: every third night of 26, repeats allowed.
**Rationale:** Guaranteed variety, surprise order.
**Date Locked:** 2026-10-17  ·  **Affects:** event Lua (the draw), `config/` (the pool)
**Change Rule:** A new event joins the pool only with its own decision here.

## Chapter 9: The rituals and the boss

### Decision 9.1: The ritual
**Chosen Answer:** Each ritual is **an obelisk in a destroyed village** on blight, **shielded while any acolyte channels** at it. Kill the acolytes, then break the obelisk (siege damage). **Amended 2026-10-17 (owner, after the council):** siege is **expensive in gold and food, so one town rarely affords a strike alone before the late nights, but it is never impossible alone**; a strike is meant to be two towns' work (engines and escort), and **the towns pay the hill for the engines they want fielded** through Warcraft's own gifting (2.2). The bell's window is tuned in config against hill engines plus escort versus obelisk health, so a two-town strike is not punished for being slow. Three rituals, west, middle and east; each lies nearest one town. **The undead bases are farther north and impenetrable** (a cliff and a sealed gate; they must read so at a glance): aesthetic, and the source of waves, the boss and the lieutenants.
**Rationale:** Two phases make a strike a plan, not a sprint; villages make the north a place that was ours.
**Date Locked:** 2026-10-17  ·  **Affects:** terrain (three ruined villages, the bases), obelisk and acolyte data, the shield (Lua or invulnerability toggle)
**Change Rule:** A ritual never moves out of the north (Decision 1.3).

### Decision 9.2: The bell
**Chosen Answer:** When an acolyte dies, **the ritual's bell rings for everyone and a pack leaves the nearest base**, arriving in about a minute. The second death sends a bigger pack; the third adds a champion. The difficulty dial scales the packs. Kill every acolyte before the first pack lands and the obelisk phase is earned.
**Rationale:** Owner: the game must react to what a player predictably does, without eliminating every cheese. Agent: the response needs a shape and a window, or it is either a nuisance or a wall.
**Date Locked:** 2026-10-17  ·  **Affects:** Lua (death trigger, bell, spawn and march), `config/` (pack sizes by dial, travel time)
**Change Rule:** The window between the bell and the pack is never shorter than the walk from the ritual's edge to its obelisk.

### Decision 9.3: The lieutenants
**Chosen Answer:** The boss comes with **three lieutenants, one per ritual, each built to blunt the town nearest its ritual**: the west ritual's **Rotting Brute** (Abomination model; acid shreds the hill's armour, hunts engines); the middle ritual's **Spider Lord** (Crypt Lord model; webs and impales root the valley's riders); the east ritual's **Lich** (Lich model; curses blunt the forest's damage). **A broken ritual removes its lieutenant.** All three broken ends the match early (Decision 1.3).
**Rationale:** Owner: a group that will not break all three can break the one near its weakest town and ease its final wave. Agent's condition, accepted: a lieutenant marches on the town it counters, so the choice is legible on the map.
**Date Locked:** 2026-10-17  ·  **Affects:** three hero units (stock models, stock abilities retuned), the night-13 script
**Change Rule:** Swapping a town's lean (5.3) swaps its lieutenant's kit.

### Decision 9.4: Night 13
**Chosen Answer:** **The boss takes the middle road to the valley**; each surviving lieutenant marches on its own town. Night 13 is a three-pronged wave with the boss at the centre, and every broken ritual removes a prong. Relief arrives when the night is held.
**Amended 2026-10-17 (owner, after the council):** night 13 is **never a scripted loss**. The balance target: **at the default notch, a group that scales well (levels, items, upgrades) and breaks no ritual holds night 13.** The enemy is not weakened to make this so; the players are allowed to grow past it. Two axes of play: break the prongs, or out-scale them, or both; the dial's Legend notch assumes both. The garrison law (2.3) stands: heroes and field forces hold the boss, the garrison buys time.
**Rationale:** The valley is the hub; the others can ride to it by the safe roads. Owner: mitigation-only makes ritual-breaking a chore; scaling gives the choice the one sentence promised ("side quests").
**Date Locked:** 2026-10-17  ·  **Affects:** the night-13 script, the boss unit, the relief trigger
**Change Rule:** —

### Decision 9.5: The relief
**Chosen Answer:** When night 13 is held, at dawn: **the horns sound, the King's standards rise along the whole western ridge, a column of knights rides down the hill road and through each gate, the garrison's bell rings, and the three heroes are drawn back to the fire where it began, now in daylight**, for the last screen: the charges held, the nights survived, the rituals broken. Stock units and doodads. The one camera move the no-hijack law allows, because the match is over.
**Rationale:** The opening is a love letter; the relief that defines Hearthglen deserved more than a trigger line (council, Creative Director seat).
**Date Locked:** 2026-10-17  ·  **Affects:** the win-A script, the standards' doodads on the ridge, the knights' column, the fire scene reused by day, the last frame
**Change Rule:** The relief never fires while any wave is alive.

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
| Day length (test 6 min: 4 day / 2 night) and the buff values; the difficulty dial's notches | Match feel; Decision 4.3's one dial; measured at the editor desk | Human | Open (13 nights sealed; the cycle set from the walk) |
| Undead air: how much, so Riflemen + towers + the Aviary are enough | No player air T3 | Agent | Open |
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
| 2026-10-17 | Ruling 9: the relief (9.5). Ruling 10: the housekeeping done on the page. The council's ten questions are closed. | Owner | DECISIONS.md 9.5; design/ |
| 2026-10-17 | Ruling 8: picks at the fire in lobby-slot order, one at a time, with a timer (4.2 amended). | Owner | DECISIONS.md 4.2 |
| 2026-10-17 | Ruling 7: repair without a bill; the crew non-player-controlled; its size an upgrade; the rate capped (6.7 amended). | Owner | DECISIONS.md 6.7 |
| 2026-10-17 | Ruling 6: the town's spine (Barracks I, a Farm, the Lumber Mill, the Blacksmith) is pre-built; six plots for seven choices; every Offensive building feeds the garrison by level (2.6 amended). Ruling 5: Decision 2.7 defeat. Ruling 4: where the look governs. | Owner | DECISIONS.md 2.6, 2.7, 6.3, The look |
| 2026-10-17 | After the council, the owner's rulings on findings A–C with the agent's pushback: 9.4 night 13 holdable by scaling at the default notch; 5.4 shared XP and the wild pays XP; 1.4 the forty minutes unsealed, the cycle set from the walk (test 6 min); 6.3 Mortar Teams for all, no Flying Machine; 9.1 siege expensive, never impossible alone, gifting named. | Owner | DECISIONS.md 1.4, 5.4, 6.3, 9.1, 9.4 |
| 2026-10-17 | Chapter 9 the rituals and the boss: obelisks shielded by acolytes in destroyed villages; impenetrable bases; the bell and escalating packs; three lieutenants each blunting the town nearest its ritual, removed by breaking it; night 13 three-pronged with the boss on the valley. | Owner, with the agent's pushback taken | DECISIONS.md ch. 9 |
| 2026-10-17 | The event pool sealed: 7.2 the evil fog (wave buffs + vision cut, scaling), 7.3 the air raid (gargoyles over the wall at the farms), 7.4 the insurgents (cultists at an authored graveyard, skeletons every 20 s), 7.5 the draw (each once on 3/6/9, any on 12). The owner enjoys the flash-animation visuals: every verdict that can be drawn gets a diorama. | Owner | DECISIONS.md 7.2–7.5; design/ |
| 2026-10-17 | The look written down: Diablo II × Warcraft III × The Lord of the Rings, Halloween lean, Madness flash-animation aesthetic. The design document's cover becomes clean text; a living animated card of three forts holding against the horde sits under it. | Owner | DECISIONS.md (The look); design/ |
| 2026-10-17 | 3.3: the elves' Moonglaive, Rejuvenation on hit, the Claw's mirror. | Owner | DECISIONS.md 3.3 |
| 2026-10-17 | 3.3 the wild's side content: three authored places (orc camp at the old stones, night elf camp in the thin woods, the mill as a nest) plus a daily bounty; quest champions; the Claw with Bloodlust on hit (Lua, data fallback). | Owner (A plus the camps), the agent's folds | DECISIONS.md 3.3 |
| 2026-10-17 | 2.3 amended: the garrison's captain, a stronger special unit in the garrison's tint, not a hero; the Barracks replaces him like any soldier. | Owner, after the agent's death-spiral pushback on a levelled captain | DECISIONS.md 2.3 |
| 2026-10-17 | Words: player, hero, special unit; captain and champion retired (2.1 amended; the Templar's baked-in Dispel Magic and Heal). | Owner | DECISIONS.md, the page |
| 2026-10-17 | 8.5 the free ability and the stat chase: one stock unit ability per hero, free, driven by a secondary stat by bracket; the Prelate on the Captain model, bigger; Dispel Magic, Defend, Flare; Shrapnel takes the Bombardier's second active. | Owner, with the agent's pushback (secondary stat; levels not field writes; no hero glow) | DECISIONS.md 8.1 to 8.5 |
| 2026-10-17 | Chapter 8 the heroes: kit shape (2 actives + aura + Attribute Bonus + ultimate, all stock bases), the Bombardier, the Marshal, the Prelate; stock-models-only joins the constraints; item abilities noted as the fun layer for later. | Owner, after a buildability audit | DECISIONS.md ch. 8, constraints |
| 2026-10-17 | Decision 6.7 repair: a Barracks crew that sallies (2 / 3 / 4 peasants by Barracks tier), gate only, cost per HP from the purse. | Owner | DECISIONS.md 6.7 |
| 2026-10-17 | Owner, after the mockups: 4.2 no swapping, one button, your hero walks to the fire; 4.4 the scene is a Diablo II character-screen love letter around a fire, not a round table; 2.4 the tower slots are scout-tower plots behind the wall; repair opened as a question. | Owner | DECISIONS.md 2.4, 4.2, 4.4 |
| 2026-10-17 | The notebook interviewed, one question at a time (`records/interview-2026-10-17.md`): chapters 4–7 sealed (the war council; the heroes; the living town; the nights). Open questions rewritten. | Owner | DECISIONS.md ch. 4–7 |
| 2026-10-16 | Owner's ideas dump recorded in `records/owner-notes-2026-10-16.md`. Sealed: 13 nights (1.4 amended; hard mode of 26 planned), and a setup phase as a non-negotiable constraint. Ten new open questions. | Owner | DECISIONS.md 1.4, constraints, Open Questions; records/ |
| 2026-10-16 | Decision 1.5 amended: the valley's lake half inside the walls, half out. The map redrawn in a Tolkien hand (sepia ink, uncial region names, hill bumps, a compass rose, a cartouche); a thread of Middle-earth through the design document (uncial drop caps, leaf-and-vine rules, a verse on the cover, a ring on the clock). | Owner | DECISIONS.md 1.5; design/ |
| 2026-10-16 | The brief is redone as one scrolling site on glass panels in a Warcraft III look (`design/index.html`, tokens `warglass_tokens.css`); the vellum plates retire. Desktop only. | Owner: "not cards like a PowerPoint"; personal, read often | design/ |
| 2026-10-15 | Owner ruling: the brief keeps the deck_vellum skin and its animations — an exception to the default skin (SKIN-02) and to the no-ambient-motion rules (WEB-06, SKIN-06, DISP-02). Every animation has a static form under reduced motion (SAFE-05). The bridge joins Non-Negotiable Constraints. | Owner, 2026-10-15 session prompt | design/; DECISIONS.md constraints |
