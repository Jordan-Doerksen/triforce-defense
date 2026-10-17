# Interview — 2026-10-17 — the notebook, one question at a time

Running design log. Verdicts as given; `DECISIONS.md` is written from this only after the chunk is done.
Options were offered 2–4 at a time, recommended first; the owner's pick is marked.

## The setup phase (the law, made concrete)

| Question | Verdict | Note |
|---|---|---|
| How to build it | **A · The war council** | Default UI hidden; full-screen Lua/FDF frames; dialogs (B) wired as a fallback behind one config flag |
| How captains get towns | **Each captain picks** | Three seats, first come first served, swap request; the host can override; the seat shows the town's T3 so the pick is a role pick |
| The host's panel at v1 | **Mode (13 / 26 nights) + one difficulty dial** | Nothing else ships first. Night events toggle and purse/timer presets wait |
| The scene | **A war table with the map** | An authored hall in the valley town; three captains' figures around a table, the province map on it; picking a seat moves your figure to that town on the table; candle-lit; never seen again in play |

## The hero

| Question | Verdict | Note |
|---|---|---|
| What each captain is | **One fixed hero per town** | A custom hero per town whose kit matches the town's T3 and flavour; three to build and balance; you are your town |
| Town ↔ T3 | **Hill = Siege Engine · Valley = Knight · Forest = Templar** | Owner's own answer, not an offered option: "cavalry are the valley's, siege is the hill, forest the templar" |
| Hero level cap | **20** | As said in the notebook; not re-asked |
| Town flavour | **Hill = armour · Valley = speed · Forest = damage** | Slight leans on the shared roster, each matching the T3 |

## The economy

| Question | Verdict | Note |
|---|---|---|
| The site ladder | **Five peasants per site, rising price** | A site starts with one peasant, takes up to five; each next one costs more; each bought peasant appears and works the site (the living window fills). Total income capped the same in every town; only the gold/lumber mix differs |
| Main-hall tiers | **Unlock plot rings and the T3, and each tier adds to the garrison** | Town Hall: first ring of plots. Keep: second ring, higher blacksmith tiers. Castle: last plots, the T3, the hero's final ability tier. Each tier also raises the garrison's rate/quality beside the Barracks (owner's addition to option 1). The town's growth is visible on the ground as rings of plots light up |
| The plot menu at v1 | **Barracks · Blacksmith · Farm · Market · Workshop · Arcane Sanctum · Guard Tower · Arcane Tower · Aviary** | Nine options. Lumber mill and gold mine are NOT plots: the sites stay pre-placed (Decision 2.2 holds) |
| Plot count | **Six plots per town: 2 / 2 / 2 by hall tier** | Town Hall two, Keep two, Castle two. Six of nine; the Barracks takes one, so five real choices. Same count in every town |

## Scaling

| Question | Verdict | Note |
|---|---|---|
| The blacksmith's ladder | **Six tiers of weapons and armour, gated by hall** | Tiers 1–2 at Town Hall, 3–4 at Keep, 5–6 at Castle; flat steps like stock; the unit's look changes at tiers 3 and 5 so it is visible |

## The nights

| Question | Verdict | Note |
|---|---|---|
| Night events | **Fixed event nights, random pick from a pool** | Nights 3, 6, 9 and 12 are event nights, known in advance; the event is drawn from a pool (undead air raid, cultist insurgents raising the dead in a base, evil fog; more later) and announced at dusk with a visible tell. Hard mode: every third night |

## The living town

| Question | Verdict | Note |
|---|---|---|
| Set pieces | **The plot builds itself in view, then stays alive** | Choose on the plot's card; its authored scene plays where you already are (scaffolds, peasants walking in, doodads filling: fields, anvil and sparks, stalls); no camera move, ever. Built, it stays alive (workers, smoke, animals) and a click opens a small Lua window: rate or stock and the next upgrade. The 3.2 vignette stays optional and between waves |
| The market | **Consumables and starter gear; stock grows by hall tier** | Town Hall: potions, scrolls of town portal (home only), a boot and a ring. Keep: the next step of each. Castle: one rare per market, rolled at setup. The wild's loot stays the only source of the good items |

Chapter closed 2026-10-17. Written to `DECISIONS.md` as chapters 4–7.

## After the mockups (2026-10-17)

| Question | Verdict | Note |
|---|---|---|
| Seat swapping | **Dropped** | Trouble for a feature that does not matter among friends. First come first served, one button per charge; your champion walks to the fire |
| The scene | **A Diablo II character-screen love letter**, not a round table | The dark, a fire, the champions around it, a real scene with environmental touches |
| The gate's towers | **Scout towers behind the wall**, flanking the gate | Not on the gate |
| Repair | Open; the owner leans to a Barracks crew that sallies like an orc burrow; it must carry a cost | Asked next |
| Repair | **A Barracks crew that sallies** | 2 / 3 / 4 peasants by Barracks tier run out when the gate takes damage and back when it stops; gold and lumber per HP from the purse; gate only; no separate upgrade (Decision 6.7) |

## The heroes' kits (2026-10-17, continued)

| Question | Verdict | Note |
|---|---|---|
| Kit shape | **Four abilities × 5 ranks + one ultimate** | Owner's own layout: three abilities with five ranks each, the fourth is the stock Attribute Bonus (all stats per rank) with five ranks, and one ultimate. 21 ranks for 20 levels: a captain can never max everything (recorded as the intended choice). The ultimate is what Castle gates (Decision 6.2) |
| Models | **Stock models only, campaign models included** | Owner: "stock as in no downloading skins"; anything already in the game's files is fair, and the campaign models (Garithos, Arthas, the Captain, the named heroes) are a must: use all the variety the game has without installing a thing. Goes to Non-Negotiable Constraints |
| The hill's captain | **The Bombardier** (stock Mortar Team model at hero scale) | Q Shell: long-range area shot. W Flare (stock): reveals ground, lights a target for engines. E Fragmentation Shards (stock passive). R Bombardment: channelled rain of shells on an area, enormous vs structures. All five ranks; the ultimate gated by Castle |
| The valley's captain | **The Marshal** (the Garithos campaign model, mounted) | Q Charge: a dash that knocks the first enemy down. W Rallying Cry: allies near the captain move and attack faster. E Banner Bearer (passive): the field force moves faster while the captain leads. R Cavalry Charge: every knight and footman near the captain charges a point together, trampling. The captain of the road |
| The forest's captain | **The Prelate** (the campaign Arthas model with the hammer) | Chosen with the owner's ask: audit every ability for buildability; auras instead of Attribute Bonus |

### The buildability audit (2026-10-17)

Easy = a stock ability with five ranks and new numbers. Moderate = a small, well-trodden Lua pattern. Hard = real systems work.

| Hero | Ability | As first suggested | Verdict | Built as |
|---|---|---|---|---|
| Bombardier | Shell | long-range area shot | Easy | Flame Strike retuned |
| Bombardier | Flare | reveal + lights a target for engines | Easy (bonus dropped) | Mortar Team's Flare as a hero ability |
| Bombardier | Fragmentation Shards | ranked hero passive | Headache (weapon-type switch) | **Heavy Shot** = Critical Strike retuned |
| Bombardier | Bombardment | channelled rain of shells | Easy | Starfall retuned, siege damage type |
| Bombardier | aura | — | Easy | **Trueshot Aura** (ranged damage: riflemen, engines) |
| Marshal | Charge | dash + knockdown | Moderate (Lua dash, the common pattern; knockdown = stun) | the one Lua ability on this hero; fallback **Lance** = Shockwave |
| Marshal | Rallying Cry | group speed + attack burst | Not one stock spell | Roar retuned: allies hit harder for a while |
| Marshal | Banner Bearer | passive speed | Easy, and it is an aura | **Endurance Aura** |
| Marshal | Cavalry Charge | mass dash | Hard | Stampede retuned (beast type is a data field → riderless horses); moderate if the field will not take it |
| Prelate | Holy Strike | blow that burns undead and heals around | Hard | **Holy Light** itself, five ranks |
| Prelate | Consecrate | zone: regen allies, burn undead, strip blight | Blight strip = Lua | Healing Ward retuned (regen); the burn can come later as a moderate add |
| Prelate | Zeal | damage rises as HP falls | Lua | Critical Strike retuned, same name |
| Prelate | Judgement | huge holy blow, doubled vs undead, stuns | Easy (doubling dropped) | Storm Bolt retuned, one rank |
| Prelate | aura | — | Easy | **Devotion Aura** (armour) |
| Auras and the final shape | **Two actives + aura + Attribute Bonus + ultimate**, all three | Owner: keep the scope simple; items get the fun abilities later. The agent picked the two easiest actives per captain (Shell + Flare; Charge + Rallying Cry with Lance as fallback; Holy Light + Holy Ward); the owner may swap any |
| Item abilities | Noted, later | "Some items will have fool abilities we can have fun designing and toying with later" |
| The look | **Diablo II × Warcraft III × The Lord of the Rings, Halloween lean, Madness flash-animation aesthetic** | Owner, on the cover: the lights in the dark are clever but not behind text; a living card under the cover instead: three forts defending against purple circles with black outlines, bats, spooky things |

## The event pool (2026-10-17, continued)

| Question | Verdict | Note |
|---|---|---|
| The evil fog | **A fog that buffs the wave and cuts the players' vision** | Owner's own answer: the night's wave gets low all-round buffs (move speed, attack speed, damage, health, light regeneration), never godlike; every player's vision radius drops; the buffs scale with which event night it is (weakest on the first, strongest on the last). Stock buff abilities on the wave; the vision cut by sight-radius |
| The air raid | **Gargoyles over the wall at the farms** | The night's wave is normal at the gate; a flight of gargoyles comes over the wall from the north to hit buildings, the farms first. Counter: riflemen, the Arcane Tower, the Aviary's patrols. Count scales with the event night. Stock Gargoyle; the raid target is a Lua order |
| The insurgents | **Hooded acolytes at the graveyard plot** | At dusk, hooded cultists appear at an authored spot inside each town (a small graveyard by the chapel) and channel; every 20 s skeletons rise around them; killing the cultists ends it. The garrison stays at the gate: the field force's or the hero's job. Stock Acolyte model, stock Raise Dead; the channel is a Lua timer; cultist count scales with the event night |
| The draw | **Each event once on nights 3, 6, 9 in random order; night 12 draws any at full strength** | When the pool has four, every night is unique. Hard mode: every third night, repeats allowed |
| The visuals | Owner: "really enjoying this flash animation style of visually displaying the choices and maps and dioramas" | Standing instruction: every verdict that can be drawn gets a diorama in the same ink |

## The rituals and the boss (2026-10-17, continued)

| Question | Verdict | Note |
|---|---|---|
| What a ritual is | **An obelisk shielded until its acolytes die, in a destroyed village** | Owner: rituals take place in destroyed villages, not undead bases. The undead bases are impenetrable, farther north, aesthetic plus wave / boss / hero generation. When an acolyte dies the enemy responds actively: not every cheese eliminated, but the game reacts to what a player predictably does |
| What a broken ritual takes from the boss | **One of three lieutenants**, each designed to reduce or nullify the advantage of one town | Owner's stoned thought, wanted: a group that will not get all three can break the ritual near the weakest captain to ease his final wave. Owner: "always push back on ideas, don't be a yes man" |
| Agent's pushback | The response needs a shape (a bell, a pack with travel time, escalation); bases must read impenetrable; a lieutenant must march on the town it counters or the choice is a slogan; boss + three lieutenants may be a wipe by design, so the dial must scale the packs | Put to the owner with the next two questions |
| The bell | **A bell, a pack with travel time, escalation** | First death rings the bell and sends a pack from the nearest base (~1 min); second a bigger pack; third adds a champion; the dial scales the packs (Decision 9.2) |
| Night 13 | **The boss takes the middle road to the valley**; lieutenants march on their own towns | Three prongs; each broken ritual removes one (Decision 9.4) |

## The free ability (2026-10-17, continued)

| Question | Verdict | Note |
|---|---|---|
| Drift | The page listed themed names only; 8.1's rule wants the stock base named | Fixed: brackets on every ability; the Templar (soldier) and the Prelate (captain) told apart |
| The Prelate's model | **The Captain, made bigger**, not Arthas | Owner changed his mind. Pushback: stock cannot add a hero glow to a unit mesh; scale 1.3 and Devotion's ring stand in, with eyes open |
| A free stock unit ability per captain, amplified by a stat | **Yes; the secondary stat, by bracket (option A)** | Owner's idea: a reason to stat chase, items buff the flavour skill through stats. Pushback taken: the primary stat gives no chase; levels by bracket (ten editor levels, one Lua routine) not live field writes; 8.1's "one Lua ability" becomes one ability and one routine; the command card is now full |
| The three | Prelate **Dispel Magic** on Intelligence · Marshal **Defend** on Agility · Bombardier **Flare** on Intelligence, with **Shrapnel** (Fan of Knives) taking his second active | Decision 8.5; 8.2–8.4 amended |
| The words | **Player, hero, special unit**; captain and champion retired | Owner: "captain and heroes in my head were the same thing"; there are heroes only. The T3s are the towns' special units: stock units with bonuses and one baked-in unit ability, no levels; the Templar a holy warrior with Dispel Magic and Heal baked in. 8.5 stays on the heroes, where the stats are |
| The garrison's captain | **A stronger special unit in the garrison's tint, not a hero; the Barracks replaces him like any soldier** (2.3 amended) | Owner first proposed a levelling captain with an aura and stats, respawning at level 1; the agent's pushback (death spiral, uncontrollable, aura bases, fat late) and three floor options; the owner scrapped the levels instead |

## The wild's side content (2026-10-17, continued)

| Question | Verdict | Note |
|---|---|---|
| The shape | **A: three authored places nearest each town plus a daily bounty** | Research first (owner's rule): Age of Darkness pays side content as a bet (break a crystal early: the night sooner, three times the reward; elites that each need a tactic); They Are Billions' Villages of Doom release a flood when poked, so a side objective is a readiness decision; the campaign's own side quests are authored one-offs at a named spot |
| The owner's additions | **An orc camp whose quest spawns a named undead champion; reward the Claw, Bloodlust on hit; a night elf camp the same way** | Pushback taken: "on hit" on the wielder is Lua (the stock orb casts on the target, which would buff the ghoul); data-only fallback is an active cast with charges. The camps folded onto the drawn sites (the old stones, the thin woods) so the content stays three places, unless the owner wants five |
| The elves' reward | **The Moonglaive, Rejuvenation on hit** | The Claw's mirror on the same on-hit routine; fury from the orcs, healing from the elves |
