# Council record — 2026-10-17 — the inventory review

The owner asked for the council to run against the entire game as sealed (chapters 1–9, the constraints, the look) before anything new is built. Three seats ran as independent reviewers in parallel, each reading `DECISIONS.md`, the records and the research; none changed a file. Seats: Creative Director (fantasy and coherence) · Game Designer (systems and pacing) · QA / Skeptic (buildability). The owner's standing rule applied: push back, never yes-man.

Verdicts are the seats'. Nothing here is a decision until the owner rules; each item below is a question for the discussion that follows.

## Where the seats agree (the three strongest findings)

| # | Finding | Seats | Decisions touched |
|---|---|---|---|
| A | **Night 13 at zero rituals is a scripted loss, which makes win A (hold) the losing play and breaks the one sentence.** The boss plus three lieutenants against three towns, with the garrison forbidden by law from holding a boss, and the field forces unable to leave their own towns. | CD, GD | 1.3, 2.3, 9.3, 9.4 |
| B | **The clock does not fit its contents.** 13 nights in ~40 minutes is ~3 minutes a cycle; a ritual strike (walk, kill acolytes inside the bell's window, break the obelisk, walk home), Keep and Castle, six smith tiers, twenty hero levels and five peasants a site cannot all land in it. | CD, GD | 1.4, 5.1, 6.2, 6.4, 9.2 |
| C | **Win B belongs to one player.** Obelisks need siege; only the hill has it by T3, unless the Workshop gives every town Mortar Teams and Flying Machines, which would also break the no-player-air law. "The ritual nearest each town" is a slogan until every town can break one, slowly. | GD, QA | 2.1, 6.3, 8.2, 9.1 |

## The Creative Director's seat

- **CONFLICT: The look vs stock models only.** Madness-flat, Halloween, no faces cannot be drawn with stock Reforged models; the look clause claims to apply to the set pieces. Proposed: say plainly the look governs the paper and the council frames; the match looks like Warcraft III at night; then give each town one authored Halloween beat stock doodads can carry (graveyard, ruined villages, blight).
- **"Less macro" and "side quests" both lost to Chapter 6.** Six plots, nine buildings, twelve smith tiers, five-peasant ladders, gate and Barracks tiers, a three-tier market, a 21-rank hero; meanwhile 3.1's "side objectives in the wild" have no content. Proposed: cut the blacksmith to three tiers (one per hall), fold the Workshop out of non-hill menus, spend the saved decisions on three named wild objectives, one nearest each town.
- **The ending has no set piece.** The opening is a love letter; the relief is one trigger line. Proposed: the King's army earns an arrival (standards on the ridge, the garrison's bell, a second fire).
- **Questions:** 1.3 defeat is never defined (a fallen gate, a dead captain, a captain's revive with no Altar among the nine buildings). 2.1 the Templar duplicates the Arcane Sanctum's Priest. 2.6 the Aviary's patrols "at the gate" miss 7.3's farms. 7.4 "by the chapel": no chapel exists. 8.2 the hero is the Workshop's line unit scaled up.
- **Housekeeping:** the page still says "war table in a hall", "Hero: open", "seven chapters sealed"; 4.4 still lists "the hall"; captain, champion and hero are three words for one thing.

## The Game Designer's seat

Five systemic risks, each with the smallest fix:
1. **The clock (B above).** Fix: unseal "~40 min", not the 13; set the day as a multiple of the valley-to-farthest-ritual walk (roughly 4–5 min a cycle, ~65 min a match) and tune the ladders to it.
2. **Win B is one player's (C above).** Fix: strip the Flying Machine from the Workshop; Mortar Teams as everyone's slow siege; the Siege Engine as the hill's fast siege.
3. **Night 13 (A above).** Fix: a Change Rule on 9.4: at the dial's default notch, night 13 with no rituals broken is holdable by three captains at home; the dial makes it harder, never possible.
4. **Six of nine is three of six.** Barracks forced, Farm forced (food), Blacksmith forced (the stated scaling); the rings then fix the order. Fix: hall tiers grant food; the Farm becomes optional food-plus-income.
5. **Repair drains the loser mid-wave.** The crew bills per hit point until the purse is empty, with no click to stop it. Fix: a config floor below which the crew stops, shown on the purse.
- **Parity note (2.2 / 6.1):** "same total income" is equal rate, not equal value; surplus lumber buys nothing after six plots and twelve researches. Define parity at the market's exchange rate or the lumber town is the poor town.
- **Questions:** 4.2 first-come gives the only siege seat to the fastest clicker. 5.1 twenty levels in forty minutes needs an absurd XP curve. 8.1 the forgone 21st rank is always Attribute Bonus, so it is not a choice. 7.3 the Farm is one plot; losing it kills food for good.
- **What the dial must scale:** wave size and undead stats; bell packs and the champion; event strength per event night; lieutenant and boss stats, and whether night 13 at zero rituals is holdable; night and blight buffs; repair cost per HP or the purse floor. **Never pacing:** day length, peasant prices, site rates, the XP curve, or the notches stop comparing.

## The QA / Skeptic's seat

Seven riskiest things to build, ranked, each with its cheapest fallback:
1. **War council sync (4.1–4.3).** Every frame click is local; two captains clicking one charge on the same tick is a race; one unsynced variable desyncs the lobby at minute one. Fallback: every choice travels as a sync packet, the host's client arbitrates order and rebroadcasts; stock dialogs behind the flag from day one. **4.2 is marked CONFLICT:** 4.1 syncs only the host today.
2. **Plots as Circle of Power upgrades (2.5, 6.2, 6.3).** A target with a different footprint breaks placement; reverting to a circle is not stock. Fallback: Lua ReplaceUnit at the plot with a fake build timer; same card, same fork.
3. **Set pieces that build in view (6.5).** Nine options times a scene each; doodads cannot spawn at runtime (effects or destructables instead); the living window is a second frame system. Fallback: stock birth animation, one looping effect per building, a text window; author the full scene for the Barracks and Blacksmith only.
4. **The repair crew (6.7), marked CONFLICT.** The engine bills the repairer's owner, not the captain; a captain-owned crew is selectable. Fallback: captain-owned peasants with a Lua order guard.
5. **Garrison AI (2.3).** Three computer slots must have no AI script or they build; idle units need an order loop; the garrison must not swallow the wave's aggro. Fallback: captain-owned with a Lua guard if slots misbehave.
6. **Roster variants (5.3 with 6.4).** Three town variants times look changes at tiers 3 and 5 is up to nine unit types per shared unit. Fallback: one unit, three per-town upgrades for the lean, look changes by tint and scale only.
7. **Terrain (1.5, 9.1, 7.4).** The art pass (ridge, falls, winding river, sealed bases that read sealed, a graveyard per town) is the owner at the editor; Phase 2 stalls everything behind it. Fallback: a cliff-only blockout, plots and regions placed by data, dressing deferred.
- **Build order for the first playable.** Phase 1: the config table and the sync bus (one setting, host arbitration, every choice a packet) with stock dialogs; the frames on the same bus; the three charge buttons with the race resolved; the fire scene last. Phase 4: the clock and night counter; the wave spawner on three roads; the garrison order loop; win A. That is the first test. Then buffs and blight; the event scheduler and draw; fog, raid, insurgents; the ritual shield and bell packs; the repair crew; the lieutenants and night 13; win B; living windows; Charge last with Lance already in.

## Rulings so far (2026-10-17)

| # | Ruling |
|---|---|
| 1 | Night 13 is never a scripted loss: at the default notch a group that scales and breaks nothing holds it; the enemy is not weakened, the players grow. Shared XP across the three and XP from the wild (5.4). The agent's folly list accepted: XP flowed to the holder; the scaling route has no content until 3.1's objectives are designed; Legend assumes both axes. |
| 2 | The forty minutes unsealed; thirteen kept; the cycle set from the walk, first test 6 min (4 day / 2 night); research in `docs/RESEARCH-PACING.md`. |
| 3 | Siege expensive, never impossible alone; Mortar Teams for all and no Flying Machine; the Siege Engine the hill's fast siege; the towns pay the hill for engines through gifting; the bell's window tuned against engines plus escort. |

| 4 | The look governs the paper and the frames (the document, the war council, the living windows, tooltips and banners); in play the world is Reforged's own art at night; each town gets one authored Halloween beat stock doodads can carry, and the north's villages and bases are dressed from the same kit. |

| 5 | Decision 2.7: the gate's fall is a breach; captains revive at the Town Hall; when the hall falls the town is sacked for good and becomes its own overrun village; its wave attacks a random standing town each night; the sacked captain fights on from a friend's town with hero, field force and purse; lost when all three halls fall. The redirected wave marches from the sacked town across the graph, the bell naming its target (agent's pushback, accepted). The agent's objection (a friend without a home for an hour) was heard and overruled for the drama. |

| 6 | The town's spine is pre-built and authored (Barracks I, one Farm, the Lumber Mill, the Blacksmith); the six plots are for choices among seven (Farm, Guard Tower, Arcane Tower, Arcane Sanctum, Workshop, Market, Aviary); every Offensive building feeds the garrison by its level. The agent's pushback recorded: the fork is duplicates against variety, not omission. |

## For the discussion (the owner rules, one at a time)

1. Night 13 and win A (finding A): holdable at the default notch, or the sentence changes?
2. The clock (finding B): unseal the forty minutes and set the day by the walk, or cut the ladders to fit?
3. Win B and siege (finding C): Mortar Teams for all and the Flying Machine out, or siege stays the hill's alone and "the ritual nearest each town" is dropped?
4. The look vs stock models: does the look govern the paper and the frames only, with one authored Halloween beat per town in play?
5. Defeat: what a fallen gate and a dead captain mean, and where a captain revives.
6. The plot fork: food from the hall so the Farm is a choice, and the Workshop's contents.
7. Repair's purse floor, and who owns the crew.
8. The war council's seat race: host-arbitrated packets.
9. The ending's set piece.
10. The housekeeping list.
