# Decisions Manifest — Triforce-Defense
**Started:** 2026-10-15  ·  **Last Updated:** 2026-10-19  ·  **Status:** In Design

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
**Amended 2026-10-19 (owner):** three victories, each with its own last screen. Night 13 never dawns on its own: the players kill the boss (the players' victory), or they hold until the King's army arrives on a timer and kills it (the relief, 9.5's scene), or, any day before, all three rituals are broken (the rituals' victory). Lost when all three halls fall. The army's timer is a test value in config, [3:00] into night 13. **Reconciled 2026-10-19 (owner):** the rituals' victory ends the match at once, before night 13, so the boss chosen at the fire (4.3) is never met; that is the reward, and his herald (9.4) was met all match. The agent raised the unmet boss; the owner kept the wall's W-102. Each ending's last screen is at the fire (9.5).

### Decision 1.4: What is the clock?
**Chosen Answer:** Day/night. Waves come at night; a match is **13 nights** (amended 2026-10-16, owner: "the number for sure"). A second mode, planned for later, doubles it: a hard mode of 26 nights.
**Amended 2026-10-17 (after the council):** the "~40 minutes" is unsealed; three minutes a cycle cannot hold a ritual strike, a Castle, six smith tiers or twenty levels. **The cycle is set from the walk, not from a wish:** the day must hold a ritual strike (walk to the nearest ritual, kill the acolytes inside the bell's window, break the obelisk, walk home) with margin; the night must hold a Warcraft-sized wave (90–120 s of fighting). **First test value: a 6-minute cycle, 4 of day and 2 of night** (~90 min with the council and a longer night 13); fallback 5 minutes. Measured at the editor desk against the actual walk. The difficulty dial never touches the cycle. Research: `docs/RESEARCH-PACING.md`. Undead take a large debuff by day and a large buff on blight. Rituals and undead bases sit on blight.
**Amended 2026-10-19 (owner, from the wall's C-101 and the reconciliation of the two faces):** **the cycle is 4:30, and the nights grow.** Days start at 3:00 on day 1 and shrink evenly to 1:30 by day 13; nights start at 1:30 and grow to 3:00 by night 13; thirteen cycles run 58:30, before the fire and night 13's timer (1.3). Test values, in `config/`, measured at the desk; the flat 6-minute test is retired. **The walk rule bends to the clock:** day 1 is set from the walk and holds a ritual strike (the walk out, the acolytes inside the bell's window, siege on the obelisk, the walk home) with margin; the days shrink by design, so the push window closes as the match goes, and a late strike is begun before dusk or not at all. The shrinking day is the second pressure beside the growing horde (C-102). The 26-night mode is **the long night**, later; "hard" is the difficulty dial (4.3), and the dial never touches the cycle. The wall's sheet: `design/v2/C-101.html`, its data `design/v2/model_clock.js`.
**Rationale:** The map teaches the push window — you push in daylight — with no rule text. Closes "match length" and "ritual hardening" at once. The growing nights tighten the match with no new rule; the rule about the strike had to bend, or the page would promise what the clock cannot give.
**Date Locked:** 2026-10-15  ·  **Amended:** 2026-10-16, 2026-10-17, 2026-10-19  ·  **Affects:** `config/` (night count, the day and night lengths per night, buff values), the day/night Lua periodic, blight placement
**Change Rule:** The night buff needs a visible tell on the unit or a player who dies at dusk learns nothing. Day 1 never shrinks below the strike's walk.

### Decision 1.5: The three towns
**Chosen Answer:** **The hill town** — on high ground, a river running through it, a waterfall at its eastern border. **The valley town** — in the middle, a lake inside its walls. **The forest town** — in thick forest, thinner woods connecting it to the valley. Edges: hill ↔ valley (down beside the falls), valley ↔ forest (the thin woods). Hill ↔ forest only through the overrun north.
**Rationale:** Each town is a place before it is a base; the terrain gives the three players different ground to hold and makes the graph legible on sight.
**Date Locked:** 2026-10-15  ·  **Affects:** terrain, chokepoints, T3-to-town assignment (open)
**Amended 2026-10-15 (owner, after Plate I's sketch):** the river WINDS; the towns sit farther apart; there is a BRIDGE on the hill↔valley road (non-negotiable — the owner loves bridges); a MOUNTAIN RIDGE runs down the entire west border of the map; a THICK FOREST BORDER runs down the entire east. The Plate I sketch must be redrawn to this before it is called accurate.
**Amended 2026-10-16 (owner):** the valley's lake is not wholly inside the walls — it straddles the south wall, half in and half out, and the river ends in it.
**Clarified 2026-10-19 (owner, on sheet T-101):** the MOUNTAINS RING THE HILL — the west ridge, with spurs north-west and south-west of the town; the hill is their foothill, and its high ground falls away east and south. The RIVER RUNS DOWNHILL the whole way: from a spring in the ridge, out of the mountains into the hill's west wall, across the town, over the falls at its east wall, past the bridge, into the valley's lake. Plate I's upper reach (out of the north) is replaced; the lower reach, the falls and the bridge are unchanged.
**Change Rule:** A new edge between hill and forest re-opens the whole graph.

## Chapter 2: The town (formerly "the province")

### Decision 2.1: Who are the three?
**Chosen Answer:** All Human. Shared T1–T2 roster. Each province's main hall (Town Hall → Keep → Castle) carries small flair, and Castle unlocks that province's T3: **Knight** (move) · **Siege Engine** (break — win B runs through this player) · **Templar** (hold — custom holy infantry: footman body, priest heal/dispel; working name).
**Amendment (2026-10-17, owner):** the three are the towns' **special units**: stock units with bonuses and **one baked-in unit ability**, no hero levels, no hero card. The Templar is a holy warrior with **Dispel Magic and Heal** baked in. The words, from today: the **player** is the person; the **hero** is the player's hero (chapter 8); the **special unit** is the town's T3. "Captain" and "champion" are retired as words for people or heroes; the Captain is only the stock model. **Reconciled 2026-10-19 (owner): one word everywhere, player, no alias.** The wall's docs (`docs/HORDE.md`, `docs/LEFT2DIE.md`) and the wall's sheets and models (`design/v2/`) are swept, captain → player; the owner got lost reviewing two words for one person and will not have it again. The only "captain" left is the garrison's captain, a unit (2.3), and the Captain, a stock model (8.4). The sheets' prints in `design/v2/shots/` still show the old word until they are re-shot.
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
**Clarified 2026-10-19 (owner, on the wall's T-201 and T-202; reconciled): the garrison holds the gate from outside it.** Footmen cannot fight through a closed gate, so the garrison rallies on the wild's side of the gate and meets the wave there; the garrison's captain stays behind the gate; the repair crew (6.7) mends from inside the walls; the scout towers (2.4) shoot over the wall from behind it.
**Amended 2026-10-19 (owner; orphans of the 16 Oct Plate III council, kept):** **the garrison refills on its own timer**, slower than a day: a garrison wiped at night is about two thirds back by the next dusk (a default in `config/`), so a hard night shows at the next dusk. **A seed town watch stands at each gate at the dawn of day 1.** **The player sees his gate from away:** garrison dots on the minimap, and a horn and a ping when the garrison is nearly gone; no camera move.
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
**Amended 2026-10-19 (owner, interview; reconciled):** **the horde's heroes' drops are the defender's.** A hero's signature item (7.8) drops at the gate it attacked, for that town's player alone, to use or to sell at the market with the player's hero. Drops may come out uneven, by design: the players trade or give each other items, and the friction is part of the game ("maybe one of your buddies is a bit greedy and wants them all, maybe you don't help him the next night"). Team-fair stands for the wild's loot: side objectives and champions.
**Rationale:** The wild's third reason to exist (shortcut, rituals, loot); loot is what the group talks about afterwards. The heroes' drops are what the group argues about afterwards.
**Date Locked:** 2026-10-15  ·  **Amended:** 2026-10-19  ·  **Affects:** item table, champion units, side-objective triggers, the hero table's drop trigger
**Change Rule:** A hero's drop never goes to a shared stash.

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
**Amended 2026-10-19 (owner, interview; reconciled with the wall's S-101):** **the fire runs on Ready, not clocks.** Each player takes a town with one button in lobby-slot order, one at a time, no timer; the host's settings (4.3) change in view of all three; the roll is shown (the horde's pairs, the boss); **the first day begins only when all three press Ready.** No countdown, no host skip. The fire lingers as long as the table talks, by design. **A friend who never presses Ready is a Discord problem, not a rule:** the agent raised the idle player; the owner's ruling is that the fire waits, and no timer comes back "to be safe". The only exit from a stuck fire is leaving the game.
**Rationale:** The other two must do something at the council. Swapping was dropped as trouble for a feature that does not matter among friends. The timers were dropped because the owner wants the opening seen, not raced: it is the crafted scene that shows off the Lua buttons and the selections.
**Date Locked:** 2026-10-17  ·  **Amended:** 2026-10-19  ·  **Affects:** council frames, player ↔ town mapping, the Ready sync
**Change Rule:** No clock at the fire. A timer or a skip is a change request against this amendment and the wall's S-101.

### Decision 4.3: The host's panel at version one
**Chosen Answer:** Two settings only: **mode** (13 nights, or the hard mode's 26) and **one difficulty dial** that scales wave size and undead stats. Night-event toggles and purse/timer presets wait.
**Amended 2026-10-19 (owner, interview; the wall's S-101):** **three settings.** **The length:** 13 nights; the long night, 26, later (1.4). **The difficulty dial, two notches: normal and hard** (the hard aura set, a hero every night, the Frost Wyrm; `docs/HORDE.md`); the notch names on the page were placeholders and are now these. **The boss:** Mal'Ganis, Arthas fallen or Kel'Thuzad, chosen by the host or rolled (9.4, amended 19 Oct). All three in view of every player as they change, synced before the first day.
**Rationale:** The prototype syncs one setting first; a dial keeps modifiers from sprawling. The boss is a setting because it gives the lobby one more thing to discuss at the fire.
**Date Locked:** 2026-10-17  ·  **Amended:** 2026-10-19  ·  **Affects:** `config/` (length, the difficulty table, the boss), wave table, the night-13 script
**Change Rule:** A new setting needs a reason it cannot be a notch on the dial.

### Decision 4.4: The scene
**Chosen Answer (amended 2026-10-17, owner):** **A love letter to Diablo II's character screen.** The dark; a fire; the players' heroes standing around it as they are chosen; the frames float at the edges. A real scene, not a flat image: embers rising, the fire's flicker on the figures, a hound, crows on a dead tree, the towns' standards, distant thunder. The round table and the hall are dropped. Never seen again in play.
**Rationale:** The one place the no-hijack law does not bind, so the set piece goes here; the Diablo II screen is the group's shared memory of what "choose your character" should feel like.
**Amendment (2026-10-17, owner): where it sits.** **The ruined watchtower on the thin woods road**, off the playable map: the fire in its roofless base, the three standards planted at the gap in the wall, the hound, a dead tree with crows, the old road running past into the dark, distant thunder from the north. One authored spot, dressed once; the camera never returns. The drawing already has "the ruined watch".
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
**Clarified 2026-10-19 (owner, on the wall's T-201):** the crew mends the gate **from inside the walls**, at the gate's inner face, never among the horde; the garrison holds out front (2.3).
**Rationale:** Holding swarms needs repair; the garrison was meant to spare the player the micro; the crew is visible on the ground, like an orc burrow emptying. The council's risk (a per-hit-point bill draining a losing player mid-wave) is gone with the bill.
**Date Locked:** 2026-10-17  ·  **Affects:** Barracks data (crew per tier), repair Lua (sally on damage, return on calm), `config/` (crew sizes, repair cost per HP)
**Change Rule:** The crew repairs the gate only, never towers or buildings, unless a decision says so.

## Chapter 7: The nights

### Decision 7.1: Event nights
**Chosen Answer:** **Nights 3, 6, 9 and 12 are event nights**, known in advance. The event is drawn from a pool (undead air raid; cultist insurgents raising the dead inside a base; an evil fog that cuts vision; more later) and announced at dusk with a visible tell. Hard mode: every third night of 26.
**Amended 2026-10-19 (owner, interview; reconciled from `docs/HORDE.md`):** **the pool is four:** the fog (7.2), the air raid (7.3), the insurgents (7.4) and **the burrow (7.6)**. **An event night is the event everywhere, its hero at one town:** the event hits all three towns; its hero (7.8) joins at the one town the dusk roll names, where the event is at its worst, and that town gets the drop (3.1). The draw is 7.5's. "Hard mode: every third night of 26" is the long night's rule (1.4).
**Rationale:** Predictable rhythm, surprising content; the hold-or-move decision survives because the group can plan the night.
**Date Locked:** 2026-10-17  ·  **Amended:** 2026-10-19  ·  **Affects:** event Lua, the event pool in `config/`, the dusk tell and the dusk roll
**Change Rule:** An event must leave the garrison able to buy time: never a wipe by itself.

### Decision 7.6: The burrow
**Chosen Answer:** The fourth event, led by **the Crypt Lord**: **a burrow mound breaks out inside the walls** at dusk and keeps unloading his pack, Carrion Beetles and burrowing Crypt Fiends, really tanky as their thing (Spiked Carapace), **until the mound is killed**. The answer: units or towers inside the walls, or the field force riding home. After *Left 2 Die*'s Nydus worm (`docs/LEFT2DIE.md`).
**Rationale:** Owner, 19 Oct. The second event that punishes an empty town, with a different answer from the insurgents: a structure to break, not casters to kill; sustained, not a burst.
**Date Locked:** 2026-10-19  ·  **Affects:** the event pool, one authored breakout spot per town (terrain), the mound unit, the pack's spawner (Lua)
**Change Rule:** The mound's numbers (its hit points, the pack's size) are open, in `config/`. The mound never breaks out at the gate or on the garrison's rally.

### Decision 7.7: The horde, night by night
**Chosen Answer:** **Every night the horde grows in count and in strength:** one aura per night per difficulty raises its stats in data, no unit edited, cast by one hidden caster per gate whose level is set at dusk; two sets, normal and hard. **A new unit every second night, one of a pair, for good:** nights 2, 4, 6, 8, 10 and 12; the pairs are rolled at setup and shown at the fire before night 1; a unit already in is struck from its pair and the other comes. **The tiers are Warcraft's own:** a unit's tier is the building that unlocks it in melee (the Necropolis from night 1, the Halls of the Dead from night 2, the Black Citadel from night 8), campaign and neutral undead by level; none comes before its tier's night, on normal and hard alike. **The table:** night 1 ghouls and skeletons (the base); 2 spitters (Crypt Fiend) or necromancers; 4 necromancers or shades (an attack added in data; it blinks inside the walls); 6 Nerubian Webspinners or Ghosts; 8 Abominations or Frost Revenants; 10 the one night 8 did not bring; 12 Lightning Revenants or Skeletal Orc Grunts. **Air:** on normal, no flyers in the table; the air raid's Gargoyles on its night only. **Hard adds the Frost Wyrm from night 8**, a few at a time, on top of the roll: its Freezing Breath stops a tower or a barracks; riflemen and towers answer it. **Casting:** the horde belongs to a computer player and attack-moves, so Warcraft's own spell AI casts for it; the first terrain test checks it with one Frost Revenant at a wall, and one Lua caster brain is the fallback. **Summons and the raised dead are the undead's best thing: lean in.** The full table with levels and hit points: `docs/HORDE.md`; the sheet: `design/v2/C-102.html`.
**Rationale:** Owner, 19 Oct, corrected twice on the sheet: "I don't have 14 different units worked out", and "you can't get abomination round 1 or 2". Precedents: Blizzard's campaign AI (`common.ai`), Mindustry's unit ladders, Shattered Pixel Dungeon's mobs by depth.
**Date Locked:** 2026-10-19  ·  **Affects:** the wave data, the aura casters, the roll at the fire (4.3), hard mode, the first terrain test
**Change Rule:** The tiers never move with the difficulty; only the night's aura does. **Open:** how many more each night; which stats the aura raises and by how much, normal and hard. This decision closes the "undead air" question of 2.1.

### Decision 7.8: The horde's heroes
**Chosen Answer:** **Undead heroes march with the horde**, one a hero night for the map: it leads the night's horde to **one gate, rolled at dusk** and announced with the night's tell; the other two players choose to hold home or ride to help. **On normal the hero nights are the event nights, each led by its event's hero;** on hard a hero comes every night, the event nights by their event's hero and, between, the four in turn (order rolled at the fire), each a level higher each time it returns. **Four heroes on stock models, kits of stock abilities remixed in the object editor, one active, one passive, an ultimate and stats:** the Death Knight (the fog): Unholy Aura, Death Coil, Animate Dead with its raised not invulnerable (the stock field switched off), a tank. The Lich (the insurgents): Brilliance Aura, Raise Dead (the Necromancer's), Death and Decay, a caster. The Dreadlord (the air raid): Vampiric Aura, Sleep, Inferno, tanky and fast-attacking. The Crypt Lord (the burrow): Spiked Carapace, Impale and Carrion Beetles (the one hero with two actives), Locust Swarm, really tanky. **A hero's level is half the night, rounded up** (nights 1–2 level 1 … 11–12 level 6, the ultimate from 11); night 13's lieutenants, level 10. **Each hero drops its own signature item** at the gate it attacked, Reforged's stock rarity items, rarity climbing with the night: the Death Knight the Gloves of Necromancy, the Lich the Lich Orb, the Dreadlord the Dreaded Chestplate, the Crypt Lord the Nerubian Necklace; whose it is: 3.1. The boss's matching hero is his herald (9.4).
**Rationale:** Owner, 19 Oct: the heroes are the horde's face and the loot's source; the engine's spell AI already casts stock abilities, so no Lua for the kits. Precedent: Blizzard's campaign AI sends heroes with its waves.
**Date Locked:** 2026-10-19  ·  **Affects:** the hero table, the object editor (phase 3), the dusk roll, the item table, hard mode
**Change Rule:** Stock abilities only; a kit change names the stock ability it is built on. **Open:** how each signature item climbs in rarity (stock variants, else retuned copies).

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
**Amended 2026-10-19 (owner, interview, reconciled):** the pool is four (7.1, 19 Oct); nights 3, 6 and 9 draw three of the four, no repeats, so each match misses one. **Night 12 is the boss's own event at full strength, led by his herald** (9.4), one night before his master; on normal this is how the herald is met all match, since the free draw could otherwise leave his event out. The long night (26) keeps the old rule: every third night, repeats allowed.
**Rationale:** Guaranteed variety, surprise order. The last event night is the herald's so the pick at the fire is felt before the finale.
**Date Locked:** 2026-10-17  ·  **Amended:** 2026-10-19  ·  **Affects:** event Lua (the draw), `config/` (the pool), the herald
**Change Rule:** A new event joins the pool only with its own decision here.

## Chapter 9: The rituals and the boss

### Decision 9.1: The ritual
**Chosen Answer:** Each ritual is **an obelisk in a destroyed village** on blight, **shielded while any acolyte channels** at it. Kill the acolytes, then break the obelisk (siege damage). **Amended 2026-10-17 (owner, after the council):** siege is **expensive in gold and food, so one town rarely affords a strike alone before the late nights, but it is never impossible alone**; a strike is meant to be two towns' work (engines and escort), and **the towns pay the hill for the engines they want fielded** through Warcraft's own gifting (2.2). The bell's window is tuned in config against hill engines plus escort versus obelisk health, so a two-town strike is not punished for being slow. Three rituals, west, middle and east; each lies nearest one town. **The undead bases are farther north and impenetrable** (a cliff and a sealed gate; they must read so at a glance): aesthetic, and the source of waves, the boss and the lieutenants.
**Amended 2026-10-19 (owner; an orphan of the 16 Oct Plate II council, kept):** **a destroyed ritual takes its blight with it.** Blight is authored and fixed; when the obelisk falls, its ground is cleared, so partial credit (1.3) is visible on the map. The same council's "the undead bases are the ritual compounds" is **dropped**: this decision's impenetrable bases farther north, sealed a day later, supersede it.
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
**Amended 2026-10-19 (owner, interview; reconciled):** **the lieutenants are the event heroes (7.8), at level 10:** the valley's Spider Lord is the Crypt Lord who leads the burrow; the forest's Lich is the Lich who leads the insurgents, with 7.8's kit (Raise Dead, Brilliance Aura, Death and Decay), so "curses that blunt damage" drops out; the hill's Rotting Brute stays an Abomination. The Death Knight and the Dreadlord are not on night 13. If Kel'Thuzad is the boss, the forest's lieutenant is his apprentice, a smaller Lich (9.4). A broken ritual still keeps its lieutenant home.
**Rationale:** Owner: a group that will not break all three can break the one near its weakest town and ease its final wave. Agent's condition, accepted: a lieutenant marches on the town it counters, so the choice is legible on the map. The same characters all match: the night-13 faces are faces the group already fought.
**Date Locked:** 2026-10-17  ·  **Amended:** 2026-10-19  ·  **Affects:** three hero units (stock models, stock abilities retuned), the night-13 script, the hero table
**Change Rule:** Swapping a town's lean (5.3) swaps its lieutenant's kit.

### Decision 9.4: Night 13
**Chosen Answer:** **The boss takes the middle road to the valley**; each surviving lieutenant marches on its own town. Night 13 is a three-pronged wave with the boss at the centre, and every broken ritual removes a prong. Relief arrives when the night is held.
**Amended 2026-10-17 (owner, after the council):** night 13 is **never a scripted loss**. The balance target: **at the default notch, a group that scales well (levels, items, upgrades) and breaks no ritual holds night 13.** The enemy is not weakened to make this so; the players are allowed to grow past it. Two axes of play: break the prongs, or out-scale them, or both; the dial's Legend notch assumes both. The garrison law (2.3) stands: heroes and field forces hold the boss, the garrison buys time.
**Amended 2026-10-19 (owner; the wall's W-102, reconciled):** **night 13 never dawns on its own.** It ends when the boss dies: by the players' hand (the players' victory), or by the King's army, which arrives [3:00] into the night, a test value in config, the whole of the last night, and kills him (the relief, 9.5). "Relief arrives when the night is held" is superseded by 1.3's three victories. The dial's notches are normal and hard (4.3), so "the Legend notch" above reads hard.
**Amended 2026-10-19 (owner, interview; W-102, reconciled): the boss is one of three, chosen at the fire** (4.3), by the host or rolled: **Mal'Ganis, Arthas fallen, or Kel'Thuzad**, on their stock campaign models, scaled larger, abilities beefed up in data. **His matching hero is his herald** all match, renamed for him: the Dreadlord for Mal'Ganis (the air raid), the Death Knight for Arthas (the fog), the Lich for Kel'Thuzad (the insurgents); if Kel'Thuzad is chosen, night 13's forest lieutenant is his apprentice, a smaller Lich. **The herald leads night 12** (7.5 amended), so he is met before his master on normal and hard alike. The boss still takes the middle road to the valley; the lieutenants are 9.3's, now the event heroes of `docs/HORDE.md`.
**Rationale (the boss):** one more thing for the lobby to discuss at the fire; a herald makes the pick felt before night 13.
**Rationale:** The valley is the hub; the others can ride to it by the safe roads. Owner: mitigation-only makes ritual-breaking a chore; scaling gives the choice the one sentence promised ("side quests").
**Date Locked:** 2026-10-17  ·  **Amended:** 2026-10-19  ·  **Affects:** the night-13 script, the boss unit, the army's timer, the win triggers
**Change Rule:** —

### Decision 9.5: The relief
**Chosen Answer:** When night 13 is held, at dawn: **the horns sound, the King's standards rise along the whole western ridge, a column of knights rides down the hill road and through each gate, the garrison's bell rings, and the three heroes are drawn back to the fire where it began, now in daylight**, for the last screen: the charges held, the nights survived, the rituals broken. Stock units and doodads. The one camera move the no-hijack law allows, because the match is over.
**Amended 2026-10-19 (owner; W-102, reconciled):** the relief is **one of four last screens, all at the fire**: the players' victory, the boss's crown in the ash, by day; the relief, the King's banners, by day; the rituals' victory, the three obelisks down, by day; the loss, cold, at a dead fire. The scene above is the relief's. The others reuse the fire scene with their own dressing; no new camera.
**Rationale:** The opening is a love letter; the relief that defines Hearthglen deserved more than a trigger line (council, Creative Director seat).
**Date Locked:** 2026-10-17  ·  **Amended:** 2026-10-19  ·  **Affects:** the win scripts (three) and the loss, the standards' doodads on the ridge, the knights' column, the fire scene reused by day and by night, the last frames
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
| Which player / T3 holds which town | Decides the map's roles | Human | **Sealed in v1, 17 Oct:** hill Siege, valley Knight, forest Templar (v1 ch. 2, 8) |
| The hero: one fixed per province, pick-from-four, or custom commander | It is what the player *is* | Human | **Sealed in v1, 17 Oct:** one fixed hero per town, level cap 20: the Bombardier, the Marshal, the Prelate (v1 ch. 8) |
| Where the Templar sits if it is not the T3 | Decision 2.1 took it as T3 | Human | **Sealed in v1, 17 Oct:** the forest's T3; the forest's hero is the Prelate (v1 ch. 8) |
| Plot count and menu contents | Defines the fork | Human | Open |
| Night count / day length / buff values | Match length | Human | Open (defaults in Decision 1.4) |
| The quick road isn't quicker on the sketch: hill to forest through the wild measures 1.13× the safe road, wall to wall. Every gate faces north while the roads leave the towns' sides; where do the roads meet the gates? (sheet M-101) | Decision 1.2's choice, every reinforcement | Human | Open. Owner, 19 Oct: the safe road is safe because you lose no units on it (a speed-aura road was raised and dropped) |
| The night ladder: how many more each night, which stats the night's aura raises, and by how much, normal and hard; and the hard set's own curve (sheet C-102) | The horde's growth, the two difficulties | Human | Open (the shape is sealed; see the Change Log, 19 Oct) |
| What we change from Left 2 Die, beyond three players, Humans and the King's army; and whether to borrow its entrances that open on a set night, the wild hardening where it isn't cleared, or its endless mode (`docs/LEFT2DIE.md`) | The game's other parent | Human | Open |
| The horde's heroes: how each signature item climbs in rarity (stock variants, else retuned copies). The burrow's numbers (the mound's HP, the pack) | The heroes, new 19 Oct | Human | Open (the rest is sealed: see `docs/HORDE.md`) |
| Ritual mechanics: what weakens the boss per ritual, acolyte behaviour | Win B | Human | **Sealed in v1, 17 Oct:** each broken ritual removes a lieutenant; acolytes channel a shield, the bell sends packs (9.1–9.4). The boss: chosen at setup, 19 Oct |
| Undead air: how much, so Riflemen + towers + the Aviary are enough | No player air T3 | Agent | **Sealed 19 Oct (7.7):** on normal, no flyers in the table, the air raid's Gargoyles on its night only; on hard, the Frost Wyrm from night 8, a few at a time |
| Peasant prices and site rates; the hall's garrison bonus per tier | Decisions 6.1, 6.2; lives in `config/` | Agent | Open |
| The orphans of 16 Oct: the local Plate II and III councils (`records/council-2026-10-16-plate-2-clock.md`, `records/council-2026-10-16-plate-3-two-armies.md`) said yes to five things no later ruling re-decided: (1) the undead bases are the ritual compounds (9.1 now says the bases are farther north, impenetrable); (2) blight retreats when a ritual falls; (3) the garrison refills on its own timer, about two thirds back by the next dusk, and a seed town watch stands at each gate at the dawn of day 1; (4) the player sees his gate from away: garrison dots on the minimap, a horn and a ping when the garrison is nearly gone, no camera move; (5) Reforged 3.0 equipment slots and dawn talents on the heroes. The commanders, the T3 by town and undead air from the same councils were superseded on 17 and 19 Oct. | Yeses of the owner that the wiki and the wall never saw | Human | **Ruled 19 Oct:** (1) dropped, 9.1 stands; (2) kept, 9.1 amended; (3) and (4) kept, 2.3 amended; (5) parked, the row below |
| Reforged 3.0 equipment slots and talents on the heroes (a Tome of Talent at every second dawn the gate held; gear in the 3.0 slots), from the 16 Oct Plate III council | Chapter 8 said items get the fun abilities later; the 3.0 systems are from memory and unchecked in the editor | Human | Parked for the build; decide at Phase 5 (items) after the toolchain recon checks the 3.0 systems |

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
| 2026-10-17 | 4.4 amended: the fire sits at the ruined watchtower on the thin woods road, off the map; its dressing listed. The design interview closes: what is open is numbers measured at the desk. | Owner | DECISIONS.md 4.4 |
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
| 2026-10-19 | Interview, the unit table by tier. **Night 6 (tier 2):** the Nerubian Webspinner (level 3; web pins units, raises the dead) or the Ghost (level 3; hovers on the ground, hits air and ground, Possession). **Night 8 (tier 3 opens):** the Abomination (level 4, 1175 HP, disease cloud: breaks the gate) or the Frost Revenant (level 4, hovers; Blizzard over the wall onto the crew and the towers). **Horde casters, engine first:** the horde is owned by a computer player and attack-moves, so WC3's built-in spell AI casts (it runs without an AI script, on fixed conditions, e.g. enough enemies bunched for an area spell); the first terrain test spawns one Frost Revenant at a wall with a crew behind it; if it won't cast reliably, one Lua caster brain (every second, if it has mana, cast at the thickest knot of enemies in range) serves every horde caster. Sources: Hive Workshop threads [252260](https://www.hiveworkshop.com/threads/how-to-make-the-ai-take-certain-units-seriously.252260/), [302024](https://www.hiveworkshop.com/threads/why-are-computer-controlled-units-not-using-abilities.302024), [347998](https://www.hiveworkshop.com/threads/ai-ground-target-skill-help.347998) (search excerpts). `design/v2/model_horde.js` and C-102 trailed the interview until C-102's revision 3, the same day. | Owner, 19 Oct, interview | the wave table, the horde's casters (Lua, phase 4), the first terrain test |
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
| 2026-10-19 | Interview. **The fire runs on Ready, not clocks:** no timers on the town picks, no countdown, no host skip. Each captain takes a town with one button in slot order; the host sets the length, the difficulty and the boss (chosen or rolled) in view of all three; the roll is shown (the pairs, the boss); the first day begins only when all three press Ready (the agent's preview said "dusk falls"; the match opens on the first day, C-101). The scene lasts as long as the table talks. 4.2's timers and 4.x's ten-second countdown are removed. | Owner, 19 Oct, interview | the fire (4.x), the setup screen |
| 2026-10-19 | The two faces on one master. The local commits of 16 Oct (Plate I accurate; the Plate II and III councils on the vellum brief) merge with the wiki and the wall; the wiki's version wins the conflicts; the vellum brief with Plates I to III retires to `design/_retired/`. Of the 16 Oct councils' verdicts, the commanders, the T3 by town and undead air were superseded on 17 and 19 Oct; five details were never re-decided and stand in the Open Questions table, asked last. The reconciliation of the wiki with the wall's verdicts of 19 Oct begins: the clock, the fire's timers, three victories, the boss from three, the horde onto chapters 7 and 9, the defender's drop, the garrison outside the gate, the word captain. | Owner, 19 Oct: merge, the wiki wins, the orphans asked later | `DECISIONS.md` Open Questions; `design/_retired/`; `docs/CHANGELOG.md`; `docs/HANDOFF.md` |
| 2026-10-19 | Reconciliation 1, the clock: 1.4 amended. The wall's clock is sealed on the wiki (every cycle 4:30; days 3:00 → 1:30, nights 1:30 → 3:00; 58:30 for thirteen; test values in config), and the walk rule bends to it: day 1 holds a strike with margin, the push window closes as the match goes, a late strike is begun before dusk or not at all. The flat 6-minute test is retired; the 26-night mode is the long night, later. | Owner, 19 Oct, interview (`records/interview-2026-10-19.md`), with the agent's pushback: 1:30 cannot hold a strike, so the clock or the rule had to bend | `DECISIONS.md` 1.4; `design/index.html` (the clock panel, the cover, the fire's host panel), `design/gdd.js`, `design/warglass_ds.css`, `design/INVENTORY.md` |
| 2026-10-19 | Reconciliation 2, the fire: 4.2 and 4.3 amended. The fire runs on Ready, not clocks (no pick timer, no countdown, no host skip; the first day on three Readys; an idle friend is a Discord problem, not a rule). Three settings on the host's panel: the length, the dial's two notches (normal, hard), the boss. | Owner, 19 Oct, interview (`records/interview-2026-10-19.md`); the agent's pushback on the idle player taken as a written note, not a timer | `DECISIONS.md` 4.2, 4.3; `design/index.html` (the fire), `design/warglass_ds.css`, `design/INVENTORY.md` |
| 2026-10-19 | Reconciliation 3, three victories: 1.3's amendment of 19 Oct folded into 9.4 and 9.5. Night 13 never dawns on its own; the players kill the boss, or the King's army does [3:00] in; the rituals' victory ends the match at once and the chosen boss is never met, kept by the owner against the agent's pushback. Four last screens at the fire. | Owner, 19 Oct, interview (`records/interview-2026-10-19.md`) | `DECISIONS.md` 1.3, 9.4, 9.5; `design/index.html` (the cover, the wild), `design/gdd.js`, `design/warglass_ds.css`, `design/INVENTORY.md` |
| 2026-10-19 | Reconciliation 4, the boss from three: 9.4 amended (Mal'Ganis, Arthas fallen or Kel'Thuzad, chosen or rolled at the fire; his matching hero his herald, renamed; Kel'Thuzad's apprentice as the forest lieutenant). 7.5 amended: night 12 is the herald's event at full strength, led by the herald, so "met all match" holds on normal, where the draw of three of four could otherwise leave the herald's event out. | Owner, 19 Oct, interview; the agent's pushback (the herald could be the one event left out) taken as the night-12 rule | `DECISIONS.md` 7.5, 9.4; `design/index.html` (the wild, the clock panel), `design/gdd.js`, `design/warglass_ds.css`, `design/INVENTORY.md` |
| 2026-10-19 | Reconciliation 5, the horde onto chapters 7 and 9: the 19 Oct interview rows become decisions. 7.1 amended (the pool of four; the event everywhere, its hero at one town); 7.6 the burrow (new); 7.7 the horde night by night (new: the aura, the pairs, Warcraft's tiers, the table, no flyers on normal, hard's Frost Wyrm, the casting note); 7.8 the horde's heroes (new: the four kits on stock abilities, level half the night, the signature drops); 9.3 amended (the lieutenants are the event heroes at level 10; the Lich's kit; the Brute stays). The undead-air question closes. | Owner, 19 Oct, interview; no new ruling needed, all of it sealed on the wall | `DECISIONS.md` 7.1, 7.6–7.8, 9.3, Open Questions; `design/index.html` (the nights, the wild), `design/gdd.js`, `design/warglass_ds.css`, `design/INVENTORY.md` |
| 2026-10-19 | Reconciliations 6 and 7: 3.1 amended (a hero's drop is the defender's, at the gate it attacked; uneven by design; team-fair stands for the wild's loot); 2.3 and 6.7 clarified (the garrison holds the gate from outside, the captain behind it, the crew mends from inside, the towers shoot over the wall). | Owner, 19 Oct, interview and the gate sheets; no new ruling needed | `DECISIONS.md` 2.3, 3.1, 6.7; `design/index.html` (the dusk, the wild), `design/warglass_ds.css`, `design/INVENTORY.md` |
| 2026-10-19 | Reconciliation 8, the word: one word everywhere for the person, player, no alias (2.1). The wall's docs and the wall's sheets and models swept, captain → player (28 uses in 15 files); the garrison's captain and the Captain model keep their names. The prints in `design/v2/shots/` lag until re-shot. The change logs and the records keep the old word as history. | Owner, 19 Oct: "make all the names the same, no citation needed, and use PLAYER; even I got lost when reviewing it" | `DECISIONS.md` 1.3, 2.1, Open Questions; `docs/HORDE.md`, `docs/LEFT2DIE.md`, `design/SOURCES.md`, `design/v2/` (C-101, C-102, T-101, T-201, W-102 and their models); `docs/HANDOFF.md` |
| 2026-10-19 | The orphans of 16 Oct, ruled: the ritual compounds as the bases dropped (9.1 stands); blight retreating when a ritual falls kept (9.1 amended); the garrison's refill, the seed watch and the gate seen from away kept (2.3 amended); the 3.0 equipment and talents parked for the build (Open Questions). The reconciliation of the two faces is complete. | Owner, 19 Oct, took the agent's sort | `DECISIONS.md` 2.3, 9.1, Open Questions; `design/index.html` (the dusk, the wild) |
