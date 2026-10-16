# Council record — 2026-10-16 — Plate III, The Two Armies

Status: CLOSED 2026-10-16. The owner said yes; Decisions 2.3 and 2.7 are amended, 3.1 carries a note, and the Open Questions table is updated. Run with the kit command `/design-first:council` (kit 0.1.39), from a session
rooted at `C:\projects`. DECISIONS.md is not changed until the owner says yes.

## The pitch

Plate III of the brief, "The Two Armies" — Decisions 2.3, 2.6 and 2.7, with 2.1 as amended (hill =
Siege Engine, valley = Knights, forest = Templars) and the non-negotiable "the garrison buys time,
never safety". Elements:
- E1 The garrison: autonomous, from the Barracks, rallies to the gate; an allied computer owner per town; own tint, unselectable, no food.
- E2 Barracks level sets the garrison's rate and quality (the Barracks also trains the player's footmen, 2.6).
- E3 The garrison buys time, never safety (non-negotiable).
- E4 The field force: built and controlled by the player, led by the town's custom commander.
- E5 The spend: hold or move; a captain cannot fund both.
- E6 The field army leaving visibly thins the gate (2.3's change rule).
- E7 Three custom commanders (2.7), kits proposed by this council: hill (Siege; break), valley (Knights; move), forest (Templars; hold).
- E8 Plate III itself: one brief plate in the skin of Plates I and II.

## Seats that returned a table

| Hat | Seat (agent file) | Verdict line |
|---|---|---|
| Creative Director | council-spark | "It means something. The garrison buys time but never safety, so every hour a captain is away is paid for by men he cannot command." / "Not yet. Nothing says what a night leaves at the gate, so 'hold or move' is asked fresh every day." |
| Game Designer | council-systems-pacing | "The two armies fit the loop, because the garrison turns a normal night into rest for the pusher. But the spend has no price, the spike rule has no test, and the three kits have no cap." |
| Game Designer (map) | council-level-architect | "You placed the Knights in the valley, and the graph backs you … Plate III is not sound yet. It needs safe-road posterns, a gate post for the field force, a no-teleport check and a day task for the valley." |
| QA | council-skeptic | "APPROVE the two-army shape and the plate. REDACT the garrison's two-dial ladder, 'cannot fund both' as a rule, and the twelve-ability kits (start at 3 abilities, then 5). ADD a garrison cap, a commander revive rule, the Aviary as a garrison source, and a wording sync." |
| Onboarding | council-player-guide | "APPROVE with ADDs. The gate that thins when your army leaves (Decision 2.3's change rule) is the strongest lesson in this pitch, and it needs no text. It works only if your footmen stand at the gate by default and the garrison reads as 'not mine' at one glance." |

### council-spark (Creative Director)

| Element | Verdict | Reason |
|---|---|---|
| E1 The garrison | APPROVE | Unselectable and tinted is right. The captain cannot order the men who pay for his choices; he can only leave them. |
| E2 Barracks level | APPROVE | One building is both the slow layer (garrison) and the fast layer (the footmen queue). |
| E3 Time, never safety | APPROVE | It sets up the garrison on normal nights and takes it away on the spike. |
| E4 The field force | APPROVE | The fast layer: north by day, to a friend by night. |
| E5 The spend | APPROVE | It becomes a timing question only when the cost shows at the gate later (P1). |
| E6 Field army thins the gate | APPROVE | What the field gains, the gate loses. It only counts if the captain sees it while he is away. |
| E7 Three commanders | APPROVE | The roles fit the towns. |
| Hill · Master of Works | ADD | Charge (a blast that hurts his own men too) · Field Repair (channel, repairs Siege Engines) · Crews (passive: each engine outside takes its crew from the garrison) · Sap (ult: a charge under a ritual that goes off at dusk). |
| Valley · Marshal | ADD | Ride (road speed, then fatigue) · Banner (a friend's garrison fights better, his own worse) · Ride Ahead (he alone, faster) · Muster (ult: riders for each night he stood at a friend's gate). |
| Forest · Preceptor | ADD | Tithe (heal from his own health) · Post (root at the gate, gate takes less damage) · Bury (corpses removed) · Stand In (ult: the gate takes no damage, he takes it). |
| E8 Plate III | APPROVE | Static; one gate at night with the field force home and gone, side by side. No kit numbers. Three seals at most. |
| The dead stay dead (P1) | ADD | The Barracks replaces at its rate and never tops up at dusk, so a hard night still shows at the next dusk. |
| The captain who left can see his gate | ADD | The time the garrison buys must be a clock he can see from away. |
| The office outlives the man (P2) | ADD | A commander who dies returns under a new proper name in the same office; the end screen lists each town's roll. |
| A resurrection on any kit | REDACT | It deletes the night that earned the death. |
| Two calls on one night | ADD (route to the wave table) | A night when two towns spike at once asks which one goes unanswered. |
| Write down what E3 protects | ADD (owner's call) | "Safety is bought by the captain, by being there or by spending; the garrison never gives it." |
| The gate keeps the count | FLAVOUR | Load-bearing only with Bury and corpse-raising waves. |

Biggest hole (Half B): the pitch does not say whether the garrison's dead stay dead. Title drafts:
A "Time, never safety." · B "Someone stays at the gate." · C "Hold, or move." (Plate I's last bold line).

### council-systems-pacing (Game Designer)

| Element | Verdict | Reason |
|---|---|---|
| E1 Garrison | APPROVE | It gives the pusher rest on normal nights. Needs a cap, a ranged share by night 4, and scripted rally orders. |
| E2 Barracks level | REDACT (part) | Level sets cap and unit tier. Refill is fixed at 75 s, so rate = cap ÷ 75 s. Keep level off the player's footman stats. |
| E3 Time, never safety | APPROVE | Make it a load-time assert: hold ratio 1.0 on normal nights, at most 0.6 of spike strength. |
| E4 Field force | APPROVE | Add a food cap and unlock it on night 2. |
| E5 The spend | REDACT | "Cannot fund both" is a promise, not a mechanism. Replace it with a pressure ratio R(n) and a hold-side reward. |
| E6 Thinning gate | APPROVE | Add the cost gradient: about 5% gate loss with the army home, 15% away. |
| E7 Three commanders | APPROVE | One lever each (break, move, hold). Two actives, a passive and an ultimate. Floors in config. |
| E7 Hill | APPROVE | Sunder (+25% damage taken) · Field Repair · Siegecraft (passive, +15% to structures) · Collapse (ult, % max HP, absolute boss cap). |
| E7 Valley | APPROVE | Forced March (+40% speed) · Dispatcher's Eye (passive: dusk pings with each gate's wave size) · Hard Arrival (+30% damage) · The King's Road (ult: speed on authored roads). |
| E7 Forest | APPROVE | Stand Fast (−25% damage taken, commander present) · Muster the Watch (up to 3 garrison units, within the cap) · Vigil (passive gate regen in calm) · Dawn at the Gate (ult: undead nearby use the day multiplier). |
| E8 Plate III | APPROVE (scope) | Static; the gate twice, army home and away; kits by role and name, no magnitudes; at most 3 seals; the garrison tint in the token file. |
| ADD spike schedule | ADD | Spike nights 3/6/9, boss 12, spike factor 1.8, boss 2.5. E3 cannot be tested without them. |
| ADD garrison cap and ranged share | ADD | Cap by level; ranged share ≥ 0.34 from night 4 (3.3). |
| ADD hold-side reward | ADD | Dawn bounty at 15% of cycle income; decide whether garrison kills pay the captain. |
| ADD gate repair rule | ADD | No file names one. Lead: 60% repaired by day. |
| ADD hero death and XP | ADD | Revive time, cost and XP curve. |
| ADD kit caps | ADD | Floors: break 0.50, walk 0.60, damage taken 0.60, plus an absolute boss cap. |
| ADD staged reveal | ADD | Field army on night 2, one skill per night, one new demand per night until night 4. |
| ADD greybox readouts | ADD | R1 army home ≈5% gate loss; R2 away ≈15%; R3 spike, garrison alone, falls before 44 s; R4 the hill breaks an 80 s ritual in one window only with the ultimate up. |

### council-level-architect (Game Designer, map)

| Row | Verdict | Reason |
|---|---|---|
| E1 Garrison | APPROVE | A unit bound to a node. A separate owner gives "no food cost" for free (memory). |
| E2 Barracks sets rate and quality | APPROVE | A `config/` table by Barracks level. |
| E3 Time, never safety | APPROVE | As a number: hold at least one Knight trip (about 40 s) and lose before the wave ends. |
| E4 Field force | APPROVE | By day the safe road (270) beats the wild (394–435); the wild helps only hill↔forest. |
| E5 The spend | APPROVE (goal) | Power abroad costs stability at home (Shogun 2, sourced). See the running-cost row. |
| E6 Thinning | APPROVE | The gate is the hub where state shows. |
| E7 Mobility | ADD | No ability, item or building moves a unit between two graph points without walking the edge. Allowed: speed along edges, a dash ≤ one gate width along pathing, a rally point. Refused: teleport, blink over walls, pulling another captain's units, return-to-town, editing the clock. A load-time check in `config/` (`teleport = false`, `displacement_max ≤ 1 gate width`); no stock teleport item in the loot table. |
| E7 Hill | ADD | Breach · Fuse (delayed charge) · Engine Guard (aura) · Bring It Down (ult, channel). |
| E7 Valley | ADD | Road Pace (aura, roads only) · Charge (dash ≤ one gate width) · Caltrops (slow zone on a lane) · Open Road (ult: every allied field force on a safe road moves faster). |
| E7 Forest | ADD | Mend Gate · Hallowed Ground · Standard (aura) · Unbroken Gate (ult: the gate takes no damage for a short time). |
| E8 Plate III | APPROVE | Reuse Plate II's two panels; a garrison mark per gate and a field-force arrow per army; no distances; render look options first (GATE-14). |
| Posterns (hill 1, valley 2, forest 1) | ADD | E4's route to a friend needs entrances; the wave never paths there. |
| Field force's night post is the gate | ADD | Makes E6 readable. |
| Garrison cap, leash, one owner for Aviary gryphons | ADD | A rate with no cap becomes safety. |
| Garrison running cost | ADD | With zero cost the spend is a one-time purchase. |
| Gate repair rule | ADD | 2.4 is silent. |
| Camp-v: a 3.1 side objective ≈130 up the valley's short road | ADD | Gives the valley a day task the others have. |
| Wave spawn and a broken ritual's lane | ADD | Plate V decides. |
| Unselectable garrison must stay attackable | ADD | Toolchain recon (memory: Locust). |
| 1.2 rationale CR | ADD | The short road is not a shortcut between towns for 2 of 3 pairs. |

Graph facts (hand-measured from Plate I, ±15%): valley gate to hill gate and to forest gate both ≈270
(Knights ≈40 s); the valley is the cut vertex of the safe line; one rescue cascade fits a night.

### council-skeptic (QA)

| Element | Verdict | Reason |
|---|---|---|
| E1 Garrison | APPROVE | One Lua system (spawn, walk to the gate, return after a chase) and three computer owners. "Unselectable but attackable" is unproven (memory). |
| E2 Barracks level sets rate and quality | REDACT | Two dials; quality needs three or more 0-food unit types. Keep one dial: level sets garrison size. |
| E3 Time, never safety | APPROVE, ADD a number | A load-time assert: the garrison's maximum pool is below every spike night and the boss night; log both until the wave table exists. |
| E4 Field force led by the commander | APPROVE | No new system. |
| E5 The spend | REDACT as a rule; keep as a target | Nothing enforces it. Make it playtest readout B. |
| E6 Army leaving thins the gate | FLAVOUR (build nothing) | It follows from E1 plus E4. Set the Barracks rally to the gate. |
| E7 Three custom commanders | REDACT scope | Twelve custom abilities is three quarters of one race's roster for one author. |
| E7 Hill | REDACT to 1 ability now, 2 at V1 | Breach (armour cut, structures allowed); V1 adds Sapper's Edge (aura). No ultimate, no placed charge. |
| E7 Valley | REDACT to 1 ability, and stop there | Forced March (speed aura). Ban every relocation. |
| E7 Forest | REDACT to 1 ability now, 2 at V1 | Bulwark (damage cut on a unit or the gate); V1 adds Stand Fast (aura). No heal (the Templar heals), no Resurrection, no blight cleanse. |
| E8 Plate III | APPROVE, REDACT scope | Two-panel gate figure; three seals; kits not printed; seal 2.7 as verbs only. |
| ADD-1 Garrison cap = authored rally slots | ADD | Barracks level opens N slots at each gate, each with a refill timer. |
| ADD-2 Aviary is a second garrison source | ADD | Same owner, same cap. |
| ADD-3 Commander death and revive | ADD | Revive at the town, cost and delay in `config/`. |
| ADD-4 Ability rules | ADD | Stock bases; no relocation; no touching blight or the day state; no summon or Resurrection; (recommendation) no persistent placed objects; decide once whether auras reach the garrison. |
| ADD-5 Wording sync | ADD | Field force / field army / field company → one word; hero / commander → one word. |
| ADD-6 Playtest gates | ADD | A: name the commander you want at a breach, a march, a gate. B: does anyone still weigh hold against move after night 6? C: does the gate look thinner without a number? |
| ADD-7 Commander XP and level cap | ADD | Open Question; close at the greybox. |

True cost: the plate is one session; the pitch is two Lua systems (garrison spawner with rally and
leash; commander revive), three computer owners, a Barracks chain, one to three garrison unit types,
three heroes and up to twelve abilities.

### council-player-guide (Onboarding)

| Element | Verdict | Reason |
|---|---|---|
| E1 Garrison | APPROVE | One drag-select teaches "not mine". Recon must prove unselectable-but-attackable. |
| E2 Barracks level | APPROVE | Show the tier on the building and the soldier. |
| E3 Time, never safety | APPROVE | Taught by layering plus visible decline. |
| E4 Field force | APPROVE | No lesson needed; default rally at the gate. |
| E5 Hold or move | APPROVE | The plot menu carries it (2.6). |
| E6 Army leaving thins the gate | APPROVE | The best beat in the pitch. |
| E7 Three commanders | APPROVE | One verb each; the first skill works on night 1. |
| Hill | APPROVE | Sunder · Shatter Line · Crew Drill · Breach (ult). |
| Valley | APPROVE | Charge · Gallop · Flare (lifts fog on a road, pings allies) · Relief March (ult, never a teleport). |
| Forest | APPROVE | Mend (garrison can be healed) · Ward (shell that cracks) · Cleanse · Stand Fast (ult, anchored, ends when he moves). |
| E8 Plate III | APPROVE | Two panels, "at home" and "army away"; the field force blue as Plate II's push arrows; one garrison mark in the token file; commanders as silhouettes by role. |
| ADD-1 Seed town watch | ADD | A few garrison soldiers at the gate at dawn of day 1. Owner's call. |
| ADD-2 Default rally | ADD | The player's footmen gather at the gate beside the garrison. |
| ADD-3 Shared garrison look | ADD | One look for all three towns plus the town's colour on a banner. |
| ADD-4 Door and tier ceremony | ADD | A mark at the door on each spawn; banners per tier. |
| ADD-5 Decline readout | ADD | Garrison dots on the minimap; a last-stand horn and ping; no counter, no camera move. |
| ADD-6 Dusk re-entry | ADD | The deferred question needs a visible answer at the gate. |
| ADD-7 Dead-click gate | ADD | If testers call the unselectable click a bug, a CR on 2.3 for read-only selectable. |
| ADD-8 Tell budget on undead | ADD | Day tell on the body, debuff glyph overhead, cleanse as a pulse. |
| ADD-9 Wave teaching order | ADD | Early nights: the garrison holds and visibly loses bodies. |
| ADD-10 Commander death | ADD | Where a fallen commander returns. |

## Element verdicts

| Element | Verdict | Which seats, and why |
|---|---|---|
| E1 Garrison | APPROVE | All five. Needs a cap; "unselectable but attackable" is an engine check for the recon. |
| E2 Barracks level sets rate and quality | Owner's question | Spark, architect, guide approve; pacing (cap and tier, fixed refill) and skeptic (one dial: size) redact part. |
| E3 Time, never safety | APPROVE + ADD a number | All five; a load-time assert once the wave table exists (pacing, skeptic, architect). |
| E4 Field force | APPROVE | All five. |
| E5 The spend | APPROVE as a target; its price is an owner's question | Pacing and skeptic: nothing enforces it; architect: a running cost; pacing: a hold-side reward. |
| E6 Thinning gate | APPROVE | Four approve; skeptic: it follows from E1+E4 if the field force stands at the gate (default rally). |
| E7 Kit scope | Owner's question | Skeptic: one ability each now, five in V1; the others: three basic and an ultimate. |
| E7 The kits | Owner's question | Five proposals; the verbs converge: hill = armour break on a target (Sunder / Breach), valley = speed for the company (Forced March / Road Pace / Gallop / Ride), forest = damage cut at the gate (Stand Fast / Bulwark / Ward / Post). |
| Mobility rule | ADD | Architect's ruling, echoed by pacing, skeptic, spark, guide: no relocation; speed along roads; a dash ≤ one gate width; a load-time config check; no teleport items in the loot table. |
| Resurrection on any kit | REDACT | Spark, skeptic. |
| Garrison cap (authored rally slots) | ADD | Pacing, skeptic, architect. |
| Aviary gryphons under the garrison's owner and cap | ADD | Skeptic, architect. |
| Field force's default rally at its gate | ADD | Guide, architect, skeptic. |
| Commander death and revive at the town | ADD | Skeptic, guide, pacing; spark's "office outlives the man" is its FLAVOUR form. |
| Wording sync (field force; commander) | ADD | Skeptic. |
| Night residue at the gate (the dead stay dead) | Owner's question | Spark (refill at rate, never topped up at dusk) vs pacing (refill full in 75 s). |
| Captain sees his gate from away; decline readout | Owner's question (ADD bundle) | Spark, guide, pacing (Dispatcher's Eye). |
| Seed town watch; Camp-v | Owner's question (ADD bundle) | Guide; architect. |
| Spike schedule, two calls on one night, gate repair, posterns, 1.2 rationale | Deferred | Wave table (pacing, spark); Plate IV (gate repair); terrain pass (posterns, closed interior); CR (1.2). |
| Engine checks (unselectable-but-attackable, speed cap, revive, XP routing, dispel vs day mark) | Deferred to the toolchain recon | All from memory. |
| E8 Plate III | APPROVE | Two panels, army home and army away, in Plate II's format; static; no magnitudes; kits as verbs. |

## Design log

| Date | Question | Answer |
|---|---|---|
| 2026-10-16 | Q1 (high). How big are the kits? First asked as staged / full / middle. The owner answered with new information instead: the World Editor is the tool he is good at, custom units are no problem with mostly modified stock abilities, and JASS by the agent "feels sketchy". Reassessed: the skeptic's cost case (12 custom abilities) mostly falls away for data-edit abilities; a stock-base rule cuts the scripted proposals (Sap, Fuse, Banner, conditional Muster, Charge dash, roads-only speed, Dispatcher's Eye, Vigil, Muster the Watch, Dawn at the Gate as a day-multiplier). Re-asked: full kits with stock bases only · staged with stock bases · full kits with Lua where needed. | **Full kits, stock bases only.** 3 basic + ultimate per commander; every ability a copy of a named stock ability with edited fields; no trigger, no JASS; the agent names each base and guides the data edits. |
| 2026-10-16 | Q2 (high), first asking: take the three drafted kits (stock bases)? | The owner asked first for a research pass on Forsaken Kingdom, its new heroes, and the inventory system. |
| 2026-10-16 | Research pass (agent-reach: Exa web search, Jina reader). Sources: Blizzard News (Forsaken Kingdom deep dive and What's Next recaps), the Blizzard forum patch notes thread, warcraft.wiki.gg, Wikipedia, Hive Workshop ("Reforged 3.0 new Equipment, Stats and Talent system", "Warcraft III 3.0 Bugs & issues"). | Forsaken Kingdom = Reforged patch 3.0 (2026-09-12). For custom maps: a new Tavern hero, the Forsaken Paladin (Righteous Fury: charge, damage, slow; Consecration: ground heal + damage; Sacred Aura: magic resistance; Cleansing Fire: ult — heal, buff, stun, dispel, heavy damage to summons); campaign heroes Garek and Anya bring more abilities into the data. Native equipment (9 slots + a 30-slot bag; Object Editor: Stats - Equipment Type; works on non-heroes) and talents (≤ 6 tiers × 3 choices; points from Tome of Talent items). Limits: talents cannot add a new hero ability; morphing wipes talents; equipment stat bugs; the campaign's 300+ equipment items show only in DE graphics and are random-drop by default. Meaning here: Righteous Fury is the stock Charge the valley lacked; equipment fits 3.1's loot; a Tome of Talent at each dawn a gate held makes each night leave a mark the next day reads. |
| 2026-10-16 | Q2 (high), re-asked after the research: take the kits, with the valley's W changed from Hard Arrival (Roar) to Charge (Righteous Fury base, range ≤ one gate width)? | **Taken.** Hill: Sunder (Faerie Fire, structures allowed) · Field Repair (Healing Wave, mechanical only) · Siegecraft (Command Aura, mechanical only) · Bring It Down (Storm Bolt, structures allowed). Valley: Forced March (Endurance Aura, move speed only) · Charge (Righteous Fury, range ≤ one gate width) · Flare (Flare / Far Sight) · Relief Column (Feral Spirit). Forest: Bulwark (Inner Fire, structures allowed) · Stand Fast (Devotion Aura) · Hold the Line (Thunder Clap) · Dawn at the Gate (Howl of Terror). Rules: stock bases only; no relocation; no Resurrection; nothing touches blight or the day state; no heal on the forest commander; auras and casts reach the garrison. Bases from memory, to check in the editor. |
| 2026-10-16 | Q3 (medium). Do the commanders use the 3.0 equipment and talent systems? Options: equipment + dawn talents · equipment only · neither, classic inventory. | **Equipment + dawn talents.** Loot (3.1) is gear in the 9 equipment slots (custom gear built from classic items, random-drop off); each commander has a talent tree (≤ 6 tiers); a Tome of Talent at every second dawn the captain's gate held, six in a full match. One small GUI trigger delivers the tome. Commanders never morph (talents are wiped on morph). |
| 2026-10-16 | Q4 (medium). What does the Barracks level control? Options: size only, fixed mix · size and tier · tier only. | **The owner's own answer:** a **Blacksmith** with custom upgrades carries quality (balance and flavour); **Barracks tiers add units and types** — level 1 footmen; level 2 footmen + ranged; level 3 melee + ranged + casters. Consequences recorded: (a) upgrades are per player (memory), so one small GUI trigger mirrors the captain's Blacksmith levels to his garrison's computer owner — check at the toolchain recon; (b) a Blacksmith that upgrades both armies is a second hybrid building, which fires 2.6's change rule (Hybrid becomes a category) — routed to the Plate IV council; (c) ranged at level 2 fits 3.3 (air from night 4). |
| 2026-10-16 | Q5 (high). Does the garrison refill fully before each dusk? Options: refill slower than a day · full before every dusk. | **Refill slower than a day.** Each post refills on its own timer, slower than a day; a garrison wiped at night is about two thirds back by the next dusk (timer in `config/`). A hard night shows at the next dusk. |
| 2026-10-16 | Q6 (low–medium). Which optional additions go in (pick any)? Options: see your gate from away · Camp-v · seed town watch · the office outlives the man. | **See your gate from away; Camp-v; seed town watch.** Not taken: the office outlives the man. |
| 2026-10-16 | Q7 (low). What are the three commanders called? Options: Master of Works, Marshal, Preceptor · Engineer, Knight-Marshal, Castellan · role names until the plate. | **Engineer (hill), Knight-Marshal (valley), Castellan (forest).** |

## Outcome

Written into DECISIONS.md on the owner's yes (2026-10-16):
- **2.3 amended (the garrison):** Barracks tiers add posts and types — level 1 footmen; level 2 + ranged; level 3 + casters. Quality comes from a Blacksmith with custom upgrades, mirrored to the garrison's computer owner by one small GUI trigger. Each post refills on its own timer, slower than a day (about two thirds back by the next dusk; `config/`). A seed town watch stands at each gate on day 1. The field force's default rally is its own gate. Aviary gryphons, if built, belong to the garrison's owner and count against its posts. "Time, never safety" becomes a load-time check once the wave table exists. "Cannot fund both" stays a target, checked by a playtest (does anyone still weigh hold against move after night 6?). A captain sees his gate from away: garrison dots on the minimap, a horn and ping when it is nearly gone, no camera move. Terms: "field force" and "commander" (not field army, field company, hero).
- **2.7 amended (the commanders):** titles Engineer, Knight-Marshal, Castellan; the three kits as taken in Q2; rules (stock bases only; no relocation, with a load-time config check and no teleport item in the loot table; no Resurrection; nothing touches blight or the day state; auras and casts reach the garrison; commanders never morph); revive at the town after a delay, cost and delay in `config/`, no altar; 3.0 equipment and talents as taken in Q3.
- **3.1 note:** loot is gear in the 3.0 equipment slots; Camp-v, a side objective about 130 up the valley's short road.
- **Open Questions:** the commanders' kits row closes; new rows — the Blacksmith's role under 2.6 (Plate IV); spike schedule and factors (wave table); gate repair (Plate IV); commander XP and level curve (greybox); engine checks (toolchain recon: unselectable-but-attackable garrison, upgrade mirroring, Righteous Fury's range, the speed cap, every ability base).

Not taken: the office outlives the man; Hard Arrival; full refill before dusk; the 3.0 systems left out.

Deferred: posterns and the closed interior (terrain pass); the 1.2 rationale review (CR); two calls on one night (wave table); a broken ritual's lane (Plate V).
