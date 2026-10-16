# Owner's notes — 2026-10-16 — the ideas dump

Written down the moment they were said, so they are in memory. Nothing here is sealed unless the row
says so; each unsealed item goes to the Open Questions table in `DECISIONS.md` and waits for its
interview (one question at a time, 2–4 options, recommended first).

| # | The owner said | Status | Where it lands |
|---|---|---|---|
| 1 | **13 nights.** "The number for sure." A second mode, planned for later, doubles it: a hard mode, 26 nights. | **SEALED** (Decision 1.4 amended); hard mode = planned | DECISIONS 1.4; the site's clock |
| 2 | **Lumber mill** collects wood; you spend money to increase the number of peasants working there. | Open — confirms Decision 2.2's "finite upgrade ladder" as *peasants per site* | Open Q: the site ladder |
| 3 | **Gold mines** the same: pay to add peasants. | Open, as above | Open Q: the site ladder |
| 4 | **Farms** are plots that populate with doodads when the farmhouse beside them is built, through the Circle-of-Power plot system. | Open — a Resource-role plot (Decision 2.6) | Open Q: plot menus |
| 5 | **Every building placement is a set piece**: a scene, a living window. Every place is planned. (Extends Decision 3.2's site vignette to every plot; the no-hijack-mid-wave law still binds.) | Open — the principle is the owner's; the mechanics need the interview | Open Q: set pieces |
| 6 | **Blacksmith** handles armour and weapon upgrades. | Open | Open Q: plot menus; upgrades |
| 7 | **Town Hall → Keep → Castle** tiers should have a purpose; maybe they unlock plots. "Haven't thought it all the way through." | Open | Open Q: main-hall tiers |
| 8 | **A market** that sells the basic low-level hero items. | Open | Open Q: plot menus; loot (3.1) |
| 9 | **More than three tiers** of weapon and armour upgrades, plus a few other upgrades, so late nights scale by upgrades, not by spamming units. | Open | Open Q: upgrades |
| 10 | **Heroes reach level 20**, not 10. | Open (needs the hero decision first) | Open Q: the hero |
| 11 | **Scripted events on set night intervals.** Example, night 3: an undead air raid, OR cultist insurgents raising the dead inside your base, OR an evil fog that cuts vision while something else happens. "Needs an interview." | Open | Open Q: night events |
| 12 | **The three towns' units differ slightly** but stay very similar: one a bit more armour-heavy, one a bit faster, one hits harder. | Open — sits beside Decision 2.1's shared roster | Open Q: town flavour |
| 13 | **A setup phase at the start, built with Lua windows**: modifiers, settings, a full presentation layer, a calm planned setup for the host. "Non-negotiable." "Aim high: the game is simple in essence, so we can go all out on presentation." | **SEALED as a non-negotiable constraint**; the *how* is open, options below | DECISIONS constraints; Open Q: the setup phase |

## The setup phase — how other maps do it, and three ways to build it

Searched first (owner rule). What exists:

- **Custom UI by code** exists since patch 1.31: Lua `BlzCreateFrame` natives plus FDF/TOC frame definition files. Hive Workshop's *The Big UI Frame Tutorial* and Tasyen's systems are the canon: **TasFullScreenFrame** (frames past the 4:3 safe area, Lua and vJASS, works on 1.36) and **TasButtonList** (a data-driven button list from an FDF). The default console can be hidden and replaced.
- **Toolchains on GitHub:** `cipherxof/w3ts` (TypeScript API, 87★) and `cipherxof/wc3-ts-template` (67★) for TypeScript-to-Lua; `Drake53/War3Net` (C# toolkit, 167★); `wurstscript/WurstScript` (249★); `warcraft-iii/warcraft-vscode` (Lua, 40★); `nazarpunk/cheapack` (Lua map bundler for Reforged). No open-source map with a fancy Lua setup screen was found on GitHub; the fancy ones (Custom Hero Survival, Direct Strike, Survival Chaos) are closed. Phase 1 recon should download and open a few to read their frames.
- **One hard rule for any option:** frames are local to each player's client. The host's choices must be synced to everyone (`BlzSendSyncData` / `SyncStoredInteger`) before the match starts, or the game desyncs.

| Option | What it is | Ceiling | Cost | Risk |
|---|---|---|---|---|
| **A · The war council (recommended)** | Default UI hidden; camera locked on an authored set (the council table in a hall); full-screen Lua/FDF frames: a host panel (mode: 13 or 26 nights; modifiers; toggles), seat picking (each captain chooses a town), ready checks and a countdown; non-hosts see a live mirror plus their own pick. | Highest — this is the "go all out" option | FDF + TOC imports, a sync layer, a camera set, ~weeks of Lua | Frame bugs are per-patch; test on the group's live version |
| **B · Dialogs** | Stock `DialogCreate` button dialogs in sequence for the host; others see "the host is choosing". Legion TD-era. | Low — ugly, robust | Days | None, but it fails the "presentation layer" brief; keep as the emergency fallback |
| **C · In-world setup** | Captains walk a hero onto Circles of Power to pick a town and vote; the host clicks pedestals for modes; a slim Lua HUD shows the state (Castle Fight / Hero Siege style). | Medium — charming, players act during setup | Less UI work than A; terrain work instead | Hard to present many settings; voting units can be griefed |

Recommendation: **A**, prototyped in Phase 1 as the first Lua deliverable (a screen with one real setting, the 13/26 mode, synced), with **B** wired as the fallback behind a single flag in `config/`.
