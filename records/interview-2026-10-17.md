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
