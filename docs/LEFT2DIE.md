# Left 2 Die — reference notes
**Gathered:** 2026-10-19 · **Why:** the owner: "we are kinda basing the game off that, with some changes of course."

> The first pass (what it is, the loop, the kit, the map) was read from search excerpts and one public
> guide: the session's network refused most wiki and forum hosts. The roster (second pass) comes mostly
> from Blizzard's own data, published on GitHub. Numbers are "per that source". **Unconfirmed** marks what
> no source settled.

## What it is
- A 2-player co-op custom map made by Blizzard for StarCraft II. Shown at BlizzCon 2010, Battle.net beta in January 2011, released with achievements on 6 April 2011. Still in the Arcade as "Left 2 Die", by Blizzard. ([Liquipedia](https://liquipedia.net/starcraft2/Left_2_die), [Shacknews](https://www.shacknews.com/article/68028/starcraft-2-official-mods-now), [chrisjeng/left2die](https://github.com/chrisjeng/left2die))
- Built from the Wings of Liberty campaign mission **Outbreak** (Meinhoff): infested come out at night; by day you burn their buildings. ([Liquipedia, Outbreak](https://liquipedia.net/starcraft2/Campaign/Outbreak))
- Blizzard remade it in 2017 as the co-op mission **Dead of Night**, "a remake of the Arcade game Left2Die". ([starcraft2.com](https://starcraft2.com/en-us/news/20581819))
- Difficulties: the sources disagree. Liquipedia: four, plus **Night 2 Die**. The Stank's numbers run "casual" to "brutal". Learning SC2 names Normal, Hard, Brutal. No "Insane" or community "Extreme" version was found; the nearest to "made more extreme" is Blizzard's own Night 2 Die.

## The loop
| | Left 2 Die |
|---|---|
| Night | Infested waves attack the two bases |
| Day | Attacks stop; build up, go out and destroy infested structures |
| Why day is safe | Outbreak's lore: the infested burrow by day, hurt by the star's UV. In Dead of Night "the horde cannot travel in daylight" |
| Day / night length | **Unconfirmed** for Left 2 Die. Outbreak ≈ 3:00 day, 5:00 night; Dead of Night 3:30 day, 4:00 night |
| Win | Destroy every infested structure (Outbreak: 144; Dead of Night: 151) |
| Lose | **Unconfirmed** (incl. one base falling) |
| Night 2 Die | Structures invulnerable, day never comes: survive as long as you can |

## The enemy
- Special infested, named after Left 4 Dead's: **Kaboomer** (baneling), **Hunterling** (brutalisk), **Choker** (infestor), **Spotter** (overseer), **Stank** (ultralisk). ([StarCraft Wiki](https://starcraft.fandom.com/wiki/Left_2_Die))
- Escalation by night: night 1, Hunterlings and two Kaboomers; night 2, the rocks at the 1 o'clock entrance break, then 7 o'clock, and two Hunterling waves go straight for the Command Centres. ([Learning SC2](https://learningsc2.com/tag/left-2-die/))
- A timed run (survival time, likely Night 2 Die): Hunterlings 8:20 · northern breakthrough 10:47 · Spotters 11:33 · Chokers 15:40 · southern breakthrough 16:33 · Nydus worm ≈ 20:00 · Stank ≈ 23:00. ([chrisjeng/left2die](https://github.com/chrisjeng/left2die))
- Difficulty scales stats, purse and behaviour: Stank HP 2,000 casual → 5,000 brutal; starting biomass 30, or 20 on Brutal; on Hard and Brutal, Spotters and Hunterlings raid workers. ([Stank](https://starcraft.fandom.com/wiki/Stank), [StarCraft Wiki](https://starcraft.fandom.com/wiki/Left_2_Die))
- Night 2 Die: every wave stronger than the last; the Stank and Nydus worm gain HP each time they come.
- Dead of Night: **two random special infested types per run**; a per-night composition table (night 3: one Stank); Hybrids added to uncleared areas each day; broodlings out of dying structures. ([starcraft2coop.com](https://starcraft2coop.com/missions/deadofnight))

## The enemy roster
> Gathered 2026-10-19, second pass, mostly from Blizzard's own data as published on GitHub. Keys:
> **[L2DX]** Left 2 Die's unit data ([BeedeBdoo/Sc2HotkeyData](https://github.com/BeedeBdoo/Sc2HotkeyData), `data/left2die/UnitData.xml`: HP, armour, speed; no weapons) ·
> **[COOP]** co-op mission data ([sc2-arcade-watcher/star-tools-wiki](https://github.com/sc2-arcade-watcher/star-tools-wiki), [hometlt/starcraft-all-races-mods](https://github.com/hometlt/starcraft-all-races-mods); the two agree) ·
> **[S2C]** starcraft2coop.com's Dead of Night page, from its source ([SerineMolecule/starcraft2coop.com](https://github.com/SerineMolecule/starcraft2coop.com); Brutal only) ·
> **[OB]** Outbreak's mission script and **[LIB]** Wings of Liberty data ([SC2Mapster/SC2GameData](https://github.com/SC2Mapster/SC2GameData)) ·
> **[CJ]** [chrisjeng/left2die](https://github.com/chrisjeng/left2die) · **[NAMU]** the Korean wiki's page, mirrored ([forkwikiman/enha_monimarkup](https://github.com/forkwikiman/enha_monimarkup), community-written) ·
> **[FAN] [TL] [LSC2]** search excerpts only. Speeds are raw data, Normal game speed. Weapon numbers are co-op (Dead of Night) values; Left 2 Die's own are **unconfirmed**.

| Unit | On | Role | What it does · the answer | First comes | HP |
|---|---|---|---|---|---|
| Infested civilian | InfestedCivilian | fodder | melee swarm, 8 dmg [LIB][COOP] | night 1, all three maps | 35 [LIB] |
| Infested Terran | InfestedTerranCampaign | wave | ranged 5 dmg, range 4, hits air [LIB] | Outbreak at 14+ buildings killed; DoN night 2 | 50 [LIB] |
| Aberration | InfestedAbomination | heavy wave | melee 20 [LIB]; Night 2 Die's late waves are all Aberrations [NAMU] | Outbreak at 31+ killed; DoN night 2 | 450 Outbreak [LIB]; 275 DoN [COOP] |
| Volatile Infested (DoN) | InfestedExploder | wave | suicide, 40 splash [COOP] | DoN night 3 | 60 [COOP] |
| **Kaboomer** | Baneling model | special | slow acid sprayer, can't move while spraying; double vs structures; bursts on death · shoot it before it reaches the bunkers [COOP][S2C][NAMU] | L2D night 1 [LSC2][TL] | 600 L2D [L2DX]; 1000 DoN [COOP] |
| **Hunterling** | Brutalisk model | special | fast, jumps cliffs, leaps for 100 + a 5 s stun; raids workers · defences inside the mineral line [COOP][NAMU] | L2D night 1 [LSC2] | 100 L2D [L2DX]; 250 DoN [COOP] |
| **Spotter** | Overseer | special, the only flyer | disables structures (one Spotter, two structures); detector; gives the horde sight up cliffs · turrets [COOP][S2C][NAMU] | L2D night 2 [TL] | 350 L2D [L2DX]; 500 DoN [COOP] |
| **Choker** | Infestor | special | range 8 spit; grabs up to 5 units and holds them till it dies; picks workers first · siege tanks, send cheap units in first [COOP][S2C][NAMU] | L2D night 3 [TL] | 350 L2D [L2DX]; 600–700 DoN |
| **Nydus worm** | Nydus | boss, spawner | bursts out at or inside the base, unloads Aberrations and zerg till killed · kill it at once [NAMU][CJ] | L2D night 3–4 [TL] (sources differ) | 1500 Normal; grows each time in Night 2 Die [FAN][NAMU] |
| **Stank** | Ultralisk | boss | doesn't burn by day; splash melee; a 300-vs-structures headbutt; chases the nearest unit · kite it through tank range [S2C][COOP][CJ] | L2D night 4, a second just before dawn [TL] | 3500 [L2DX]; 2000 Casual → 5000 Brutal [FAN] |
| Broodling | Broodling | from dying structures | Outbreak 2/3/4/6 per structure by difficulty [OB]; DoN 6 from a biodome, 3 otherwise [S2C] | any time | 30 [COOP] |
| Infested structures | huts, biodomes, CCs… | spawners | spawn the night's trickle; hit at night, they spit defenders | start | 500–1500 [LIB] |
| Zerg bases (L2D) | lings, roaches, hydras, mutas, spines | defenders | hold the 12–1 and 4–5 o'clock zones; never attack unless attacked [NAMU] | start | — |

**The shape:** a few plain wave units that thicken every night, and a handful of specials, each a different problem with a different answer, arriving one or two a night: L2D Brutal brings Kaboomers and Hunterlings on night 1, Spotters on 2, Chokers on 3, the Stank on 4 [TL][LSC2].

### Dead of Night, night by night (Brutal, [S2C])
- Two of the four specials (Choker, Hunterling, Kaboomer, Spotter) are drawn each run: the first comes night 1, the second night 2. From night 3, either the Nydus or the Stanks; the other never comes.
- The trickle, spawns a second: night 1, 0.91 infested terrans only; night 2 adds marines (0.63) and aberrations (0.1); night 3 volatiles (0.16); by night 6, 0.48 / 0.91 / 0.91 / 0.83.
- Specials a night: night 1, 3–11 of each drawn type; night 2, 10–32; night 3 the first Stank; night 6+, 32–66 and 11 Stanks.
- Hit a structure at night and it spits defenders: 6 terrans on night 1, growing to 6 + 12 marines + 3 volatiles + 3 aberrations from night 6.
- Hybrids join the uncleared areas each day: none on day 1, two light by day 2, five light and two heavy from day 5.

### Outbreak: escalation by buildings burned, not by the night ([OB])
- The horde's tier rises with infested buildings destroyed (≤13, ≤30, ≤50, ≤70, ≤90, ≤110, more); on Hard and Brutal the night caps it (night 2 at the second tier, night 3 at the third…), and the zerg get +1, then +2, weapons and armour.
- Each tier's attack wave, Brutal: 130 civilians → 152 + 32 infested terrans → 107 + 55 + 7 aberrations → 135 + 75 + 11.
- Day and night by difficulty: days 480 / 360 / 240 / 180 s, nights 300 / 300 / 270 / 270 s (Casual → Brutal). Casual plays the enemy at a 50% handicap.

**Unconfirmed:** Left 2 Die's night-by-night counts (its script isn't public); the Stank's HP on Normal and Hard; per-difficulty HP for the other specials; Left 2 Die's weapon numbers; Night 2 Die's scaling formula; Dead of Night below Brutal.

## The players' kit
- Terran. Each player one Command Center and 200 supply; host south-east, second player south-west; a solo player runs both. Resource trading unlocks later (the guide guesses ≈ 15:00).
- **Biomass:** earned by killing special infested and destroying structures, spent at the Science Facility. A unit researched drops special versions of it; a structure researched drops extra SCVs; both players get them. Siege Tank 150, Perdition Turret 70, Omnisteel Bunkers 50.
- The held line: Planetary Fortress at the entrance with 2–3 SCVs repairing it, Siege Tanks behind, missile turrets at every choke. ([TL guide](https://tl.net/forum/sc2-maps/222300-left-2-die-guide-and-brutal-strategy))
- Boss handling: kill each Nydus worm at once; the Stank chases the nearest unit, so kite it through tank range.

## The map
- Each main has 4 entrances, one bunker at the main one to start; outer bases have 2 and hold more easily.
- Rocks block the 1 and 7 o'clock entrances until night 2.
- Zerg bases at 1 o'clock (2 bunkers, mutalisks, roaches, hydras) and 5 o'clock ("the hardest point… best saved till last").
- **Unconfirmed:** distances; where the waves spawn.

## Beside our design
| Left 2 Die | Triforce-Defense | |
|---|---|---|
| 2 players, 2 bases | 3 captains, 3 towns (1.1, 1.5) | changed |
| Terran | Human (2.1) | changed |
| Waves at night, push by day | the same; undead debuffed by day, buffed on blight (1.4) | same |
| Day safe by lore: the infested burrow | a large day debuff, visible (1.4) | same idea |
| Win: burn every infested structure (144–151) | Win: break three rituals (1.3) | fewer, bigger |
| No fixed night count; benchmark "win before night 5" | 13 nights, then the boss or the King's army (1.3) | changed |
| Fortress at the entrance, SCVs repairing it | the gate, its repair crew inside (2.4, T-201) | same |
| Two random special infested per run (Dead of Night) | one of a pair every second night, rolled at setup, shown at the fire (C-102) | same idea |
| Difficulty: Stank HP 2,000 → 5,000 | the night's aura, normal and hard (C-102) | same idea |
| Rocks open new entrances on night 2 | event nights (C-101) | could borrow |
| Biomass from specials and structures → research for both | loot from champions and side objectives, team-fair (3.1) | differs |
| Hybrids join uncleared areas each day | — | could borrow |
| Night 2 Die: endless, structures invulnerable | — | could borrow |

## For the owner
- What changes from Left 2 Die, beyond three players, Humans and the King's army? (Open question in `DECISIONS.md`.)
- Three "could borrow" rows above: entrances that open on a set night; the wild hardening where it isn't cleared; an endless mode.
