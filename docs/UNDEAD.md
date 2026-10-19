# The Undead of Warcraft III — reference notes
**Gathered:** 2026-10-19 · **Why:** the owner: map the horde's tiers from WC3's undead, standard and campaign, and Left 2 Die's (`docs/LEFT2DIE.md`).

> Every number is from the game's own data tables, exported from a current Reforged install and published at
> [hachamacha106/w3x2lni-reforged](https://github.com/hachamacha106/w3x2lni-reforged) (`data/warcraft-current/mpq/units/`:
> `unitdata`, `unitbalance`, `unitui`, `unitweapons`, `unitabilities` `.slk`; `undeadunitfunc`, `campaignunitfunc`,
> `neutralunitfunc`, `undeadupgradefunc` `.txt`). The data postdates the 1.36.2 balance patch (Abomination damage 32 → 34,
> [PTR notes](https://us.forums.blizzard.com/en/warcraft3/t/136221146-ptr-3-patch-notes/31943)); the exact build is **unconfirmed**.
> Cross-checked against [thatkyle/2xsurvival](https://github.com/thatkyle/2xsurvival) (the "custom" balance set) and
> [pqhuy98/war3mpq-extractor](https://github.com/pqhuy98/war3mpq-extractor) (an older Reforged dump).
> **Lvl** is the unit's level, WC3's own measure of power (creep camps are built from it). Damage is base + dice.
> Armour types are the editor's names. [G] ground, [A] air. Cost gold / lumber / food.

## The melee roster, by WC3's own tech tier
| Tier | Unit | Raw | Lvl | HP | Armour | Attack | Move | Cost | Role (the game's tooltip) |
|---|---|---|---|---|---|---|---|---|---|
| 1 · Necropolis | Acolyte | uaco | 1 | 230 | 1 Medium | 9–10 melee [G] | 235 | 75/0/1 | worker; sacrificed, it becomes a Shade |
| 1 | Ghoul | ugho | 2 | 340 | 0 Large | 12–14 melee [G] | 270 | 120/0/2 | basic melee, cuts lumber; Ghoul Frenzy (T3 research), Cannibalize |
| 1 | Crypt Fiend | ucry | 3 | 550 | 0 Medium | 26–31 pierce, 550 range [G] | 270 | 215/40/3 | ranged, land only; Web, Burrow |
| 2 · Halls of the Dead | Gargoyle | ugar | 2 | 410 | 3 Unarmored | 61–70 [A] / 18–21 [G] | 350 air | 175/30/2 | flyer, anti-air; Stone Form |
| 2 | Necromancer | unec | 2 | 315 | 0 Unarmored | 10–11 magic, 600 range [G/A] | 270 | 145/20/2 | raises two skeletons from a corpse; Unholy Frenzy, Cripple |
| 2 | Banshee | uban | 2 | 285 | 0 Unarmored | 9–13 magic, 600 range [G/A] | 270 hover | 155/30/2 | Curse, Anti-magic Shell, Possession |
| 2 | Meat Wagon | umtw | 2 | 380 | 2 Large | 71–88 siege, 1150 range, splash [G] | 240 | 230/50/4 | siege; carries corpses; Disease Cloud |
| 2 | Obsidian Statue | uobs | 3 | 500 | 4 Large | 7–8 magic [G/A] | 270 | 200/35/3 | heals and restores mana; becomes a Destroyer |
| 2 | Shade | ushd | 1 | 125 | 0 Medium | **none** | 350 hover | from a sacrificed Acolyte | invisible scout, True Sight; **cannot attack** |
| 3 · Black Citadel | Abomination | uabo | 4 | 1175 | 2 Large | 35–41 melee [G] | 270 | 240/70/4 | heavy melee; Disease Cloud |
| 3 | Destroyer | ubsp | 5 | 850 | 3 Small | 19–21 magic [G/A] | 320 air | morphed from a Statue | eats magic, kills casters; spell immune |
| 3 | Frost Wyrm | ufro | 6 | 1350 | 1 Small | 93–115 magic, splash [G]; 84–94 [A] | 270 air | 385/120/7 | flying heavy; Freezing Breath stops buildings |

The heroes (Death Knight, Dreadlord, Lich, Crypt Lord) come from the Altar: the second needs the Halls, the third the Black Citadel.

## Summoned undead
| Unit | Raw | Lvl | HP | Attack | From |
|---|---|---|---|---|---|
| Skeleton Warrior | uske | 1 | 180 | 14–15 melee | the Necromancer's Raise Dead (two, 45 s) |
| Skeletal Mage | uskm | 1 | 240 | 11–12 pierce, 500 range | Raise Dead after Skeletal Mastery |
| Carrion Beetle I / II / III | ucs1–3 | 1–3 | 170 / 300 / 440 | 8–9 / 15–18 / 22–27 | the Crypt Lord; II and III burrow |
| Lesser / Dark / Greater Dark Minion | ndr1–3 | 2–4 | 215 / 290 / 405 | 9–10 / 15–17 / 16–19 | the Dark Ranger's Black Arrow |
| Giant Skeleton Warrior / Skeletal Marksman | oisg / oism | 3 | 800 / 650 | 40–46 / 45–53, 500 range | campaign items |

## Campaign, editor and neutral undead, by level
| Lvl | Unit | Raw | HP | Attack | Abilities | Kind |
|---|---|---|---|---|---|---|
| 1 | Zombie (male / female) | nzom / nzof | 240 | 10–11 melee | — | creep |
| 1 | Skeleton Warrior / Skeleton Archer | nske / nska | 190 | 14–15 melee / 13–15 pierce, 500 [G/A] | — | creep |
| 1 | Spider (and Black, Forest; Spiderling) | nspr… | 240 | 10–11 melee | — | creep |
| 2 | Cult Zealot ("Brute") / Cult Assassin | ucze / uass | 340 / 240 | 12–13 / 15–24, crits | Critical Strike | Reforged campaign |
| 2 | Forsaken Deathguard / Ranger | fdtg / fdkr | 650 / 550 | 15–16 / 20–22, 500 range | — | Reforged campaign |
| 3 | Ghost | ngh1 | 300 | 23–27 pierce, 400 [G/A] | Possession | creep, hovers |
| 3 | Nerubian Warrior / Webspinner | nnwa / nnwl | 400 / 350 | 14–15 / 21–25, 600 range | Spawn Spiderlings / Web, Raise Dead | creep |
| 3 | Giant Skeleton Warrior | nskg | 380 | 12–18, 4 armour | — | creep |
| 3 | Skeletal Marksman / Burning Archer | nskm / nskf | 300 | 21–29 pierce, 500 [G/A] | Cold / Searing Arrows | creep |
| 3 | Skeletal Orc / Revenant of the Tides | nsko / ntrv | 375 | 14–15 | — | creep |
| 3 | Fire Revenant | nrvf | 340 | 14–15 | Immolation | creep, hovers |
| 3 | Spitting Spider | nssp | 350 | 25–32 pierce, 600 [G/A] | Envenomed Weapons | creep |
| 3 | Cult Blightweaver / Forsaken Apothecary | ublw / fapo | 315 / 400 | magic 10–11 / 25–26 splash | Disease Cloud / Healing Spray, Acid Bomb | Reforged campaign |
| 4 | Frost Revenant | nrvs | 450 | 18–20 | Blizzard | creep, hovers |
| 4 | Giant Spider | nsgt | 500 | 18–21 | Envenomed Weapons, Ensnare | creep |
| 4 | Garithos Abomination | ugbo | 2200 | 130–136 | Cannibalize | campaign |
| 5 | Nerubian Seer / Spider Lord | nnwr / nnws | 600 / 750 | 30–36, 500 range / 24–27 | Raise Dead, Abolish Magic / Spawn Spiderlings | creep |
| 5 | Skeletal Orc Grunt / Revenant of the Seas | nsog / nsrv | 850 / 900 | 24–27 | — | creep |
| 6 | Wraith | ngh2 | 750 | 31–41 pierce, 500 [G/A] | Possession, Curse | creep, hovers |
| 6 | Lightning Revenant | nrvl | 750 | 29–33 | Purge, Chain Lightning | creep, hovers |
| 6 | Sapphiron (dead) | ubdd | 1100 | 85–105 splash [G] | — | campaign, air |
| 7 | Nerubian Queen | nnwq | 950 | 31–40 chaos, 600 range | Unholy Aura, Carrion Swarm, Raise Dead | creep |
| 8 | Ice Revenant / Revenant of the Depths | nrvi / ndrv | 1100 / 1000 | 49–55 chaos | Vampiric Aura, Frost Nova / Summon Sea Elemental | creep, hovers |
| 8 | Skeletal Orc Champion | nsoc | 1100 | 49–55 chaos | Cripple, Vampiric Aura | creep |
| 9 | Death Revenant | nrvd | 1500 | 61–68 chaos | Raise Dead, Death Coil, Animate Dead | creep, hovers |
| 10 | Deeplord Revenant | nlrv | 2100 | 69–77 chaos | Crushing Wave, Frost Armor | creep, hovers |
| 10 | Sapphiron | ubdr | 1800 | 48–81 chaos, splash | — | campaign, air |

## Campaign heroes (level set where placed)
Arthas (evil `Uear`; with Frostmourne `Uarf`) · Kel'Thuzad (Lich `Uktl`; as a necromancer `uktn`, level 2, Raise Dead) · Anub'arak `Uanb` · Sylvanas (Dark Ranger `Usyl`; banshee `uswb`) · the Dreadlords Tichondrius `Utic`, Mal'Ganis `Umal`, Varimathras `Uvar`, Balnazzar `Ubal`, Detheroc `Udth` · and Reforged's new ones (Baron Rivendare, Putress, Ras Frostwhisper, Sir Zeliek…).

## What bears on the horde
- **WC3's own tiers already hold the owner's picks:** the Crypt Fiend (the spitter) is tier 1; the Necromancer and the Shade, tier 2; the Abomination, tier 3, a Black Citadel unit at level 4, which agrees with "night 8+".
- **The stock Shade cannot attack.** The owner's shade, weak and blinking inside the walls, is a data edit: an attack and Blink on the Shade's model.
- **Air:** Gargoyles (tier 2), Destroyers and Frost Wyrms (tier 3). Decision 2.1 keeps players without air; undead air is an open question.
- **Levels run 1 to 10.** The neutral undead give a level 7–10 band (the Nerubian Queen, the Revenants, the Skeletal Orc Champion, Sapphiron) above anything in the melee roster.
- **Left 2 Die's roles, in WC3's undead:** fodder like its infested civilians (zombies, skeletons, ghouls); ranged like its infested terrans (Crypt Fiends, Skeleton Archers, Spitting Spiders); heavies like its Aberrations (Abominations, Giant Skeletons); and for its specials: a grabber like the Choker (the Crypt Fiend's Web, the Giant Spider's Ensnare); a wall-breaker like the Kaboomer (the Meat Wagon); a disabler like the Spotter (the Frost Wyrm's Freezing Breath); a raider behind the line like the Hunterling (the owner's blinking Shade); raisers (Necromancers, Nerubian Webspinners); bosses (level 9–10).

**Unconfirmed:** the exact game build; which balance set a new map uses (Map Options → Game Data Set: the "custom" set gives e.g. the Abomination 1080 HP, the Obsidian Statue level 2); whether the new Forsaken units have classic-graphics models.
