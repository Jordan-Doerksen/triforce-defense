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
