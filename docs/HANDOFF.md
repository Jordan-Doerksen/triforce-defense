# HANDOFF — Triforce-Defense

## State card (2026-10-19, the two faces merged on master; the reconciliation under way)
- **Where:** Design. Nothing built. No map file yet. Programmer hat LOCKED. The wall (`design/v2/`) is approved sheet by sheet through S-101 (for review); the wiki (`design/index.html`) is being brought up to the wall's verdicts of 19 Oct, one ruling at a time, in the order under "Two faces, one ledger" below. Plate I was called accurate on 2026-10-16; the vellum brief is retired.
- **Kit:** design-first 0.1.38. The kit has no per-repo adopt step; the repo is under the kit when the Doctor (`C:\projects\AI-Brain\Doctor.bat`) reports nothing for it. Known blind spot: the game scan claims (SCAN-GAME-21, -15, -16, SCAN-OBS-09) select a repo by a root `index.html`, `project.godot`, `package.json` or `src-tauri`, so they do not see this one. That is a brain `claims.json` change, not done. Last Doctor run (2026-10-15 22:00) still fails RULES-GAME-07 here, on `design/_retired/deck_dispatch_ds.css` only; the fix is an owner decision (exempt `_retired/` in the brain's claims, or accept it), not done.
- **Manifest:** `DECISIONS.md` — Chapters 1–9 sealed; the wall's verdicts of 19 Oct are Change Log rows not yet folded into the decisions they amend. Open questions table at the bottom; its last row holds the orphans of the 16 Oct local councils, asked last.
- **Council record:** `records/council-2026-10-15-shape.md` (seats run by hand in chat). The kit command `/design-first:council` exists; run it from a session rooted at `C:\projects`, where the seats live (`C:\projects\.claude\agents\council-*.md`). Write each seat's agent file name in the record — SCAN-GAME-21 greps for them.
- **The design document:** `design/index.html` — one scrolling site in a Warcraft III look on glass panels (2026-10-16, owner: not cards like a deck). Every sealed decision is on it. Tokens `design/warglass_tokens.css` (night on `:root`, day under `[data-day]`), skin `design/warglass_ds.css`, script `design/gdd.js`, citations `design/SOURCES.md`, screenshot `design/shots/site.png`. Desktop only by the owner's word. The vellum plates brief is in `design/_retired/`.
- **Git:** `master`, tracking `origin/master` (Jordan-Doerksen/triforce-defense, PUBLIC since 2026-10-16 on the owner's word, for cloud sessions). On 2026-10-19 the local master (eight commits of 16 Oct that GitHub never got) merged with origin (the wiki, PR #1; the wall, PR #4) and the wiki branch tip; master is ahead of origin and NOT pushed. Push only when the owner says.
- **Cloud sessions:** they get this repo only. The brain (`C:\projects\AI-Brain`), the design-first kit and the council seats (`C:\projects\.claude\agents`) are not in it, so a cloud session cannot convene the council (Plate II) or run the Doctor. Work that needs them runs locally from `C:\projects`. Stale `stale*` files under `.git/` are moved-aside lock files from a session that could not delete; safe to remove.

## Two faces, one ledger (2026-10-19, owner)
The repo carries two design faces on purpose: **the wall** (`design/v2/`, sheets you put on a wall, approved one by one, with `docs/HORDE.md`, `docs/UNDEAD.md`, `docs/LEFT2DIE.md`) and **the wiki** (`design/index.html`, the polished living document, also the ledger and manifest with `DECISIONS.md`). Both are good work. The wiki must absorb the wall's verdicts of 19 Oct, which this merge keeps but does not reconcile on the page. Rule on these locally, in the wiki's words (player, hero, special unit):
- The clock: the wall sealed a 4:30 cycle with growing nights (3:00 day to 1:30; 1:30 night to 3:00; 58:30 for thirteen); the wiki still shows the 6-minute test cycle (1.4) and its nights readout in `gdd.js`.
- The fire: the wall runs on Ready, no timers, no host skip, the boss chosen or rolled at the fire; the wiki's 4.2 has slot-order picks with a short timer and a ten-second countdown.
- The endings: the wall's 1.3/9.5 amendment is three victories (kill the boss; hold until the King's army kills it on a timer; the rituals broken earlier), each with a last screen; the wiki shows two wins.
- The boss: the wall chooses one of three at setup (Mal'Ganis, Arthas fallen, Kel'Thuzad) with his herald met all match; the wiki's 9.4 sends an unnamed boss to the valley.
- The horde: the wall's night-by-night unit table, the night auras, the four undead heroes and their kits, hard's Frost Wyrm, the burrow as a fourth event, lieutenants who are the event heroes; none of it is on the wiki yet (chapter 7 and 9 need it).
- 3.1 amended for the horde's heroes: a hero's drop is the defender's; the wiki's loot card says team-fair only.
- 2.3 and 6.7 clarified on the wall: the garrison holds the gate from outside, the crew mends from inside; the wiki's gate figure and dusk cards should say so.
- Words: decided 19 Oct: player, everywhere, no alias; the wall's docs and sheets swept too.
The owner works from local sessions from here; the cloud session's PR (#1) is the wiki branch, merged with master as of this note.

## Next (in order)
-3. **The interview is closed (2026-10-17).** Sealed today: 8.5 the free ability and the stat chase; the words (player, hero, special unit); 2.3 the garrison's captain; 3.3 the wild's side content (the camps, the bounty, the Claw and the Moonglaive); 4.4 the fire at the ruined watch. Open: numbers only, measured at the desk. Next is the build: Phase 1 per the QA seat's order in `records/council-2026-10-17-inventory.md` (the config table and the sync bus, stock dialogs, then the frames).
-2. **Pacing research is mandatory before the clock is re-sealed:** `docs/RESEARCH-PACING.md` (Warcraft's own 8-minute cycle, They Are Billions, Age of Darkness). The owner's pushback on the council's three findings is in the chat log of 2026-10-17 and in `records/council-2026-10-17-inventory.md` once ruled.
-1. **The council's inventory review is ruled:** `records/council-2026-10-17-inventory.md`, all ten questions, 2026-10-17. Open after it: the difficulty dial's notches and the day length (measured at the editor desk), the fire scene's dressing, undead air, the wild's side objectives and champions (3.1, now load-bearing for 5.4), the config numbers.
0. **The interview is done** (`records/interview-2026-10-17.md`; chapters 4–7 sealed). Chapter 8 (the heroes) sealed after a buildability audit. The event pool (7.2–7.5) sealed and drawn as dioramas. Chapter 9 (the rituals and the boss) sealed with the agent's pushback taken; the owner asked for pushback always. Four open questions remain in `DECISIONS.md`: the difficulty dial and day length (next), the fire scene's dressing, undead air, the config numbers. Standing instruction from the owner: every verdict that can be drawn gets a diorama in the same ink (flat shapes, thick black lines, stepped motion).
1. **Plate I — the owner's verdict.** Built: winding river, towns farther apart, a bridge on the hill↔valley road (the road runs down beside the falls, then crosses at the bridge near the valley), mountain ridge down the whole west border, thick forest border down the whole east. Apply his corrections; he calls it accurate before anything moves on.
2. **Plate II — The Clock** (Decision 1.4), through `/design-first:council`: day/night as the wave clock, undead weak by day / strong on blight, the push window taught by the map.
3. Open questions, one at a time, 2–4 options, recommended first: town ↔ T3 assignment · the hero · plot count and menus · night count / buff values · undead air · ritual mechanics.
4. Toolchain recon (search GitHub first — owner rule): WC3 Lua / TypeScript-to-Lua tooling, map-as-folder, UI frame libraries, open co-op defence maps. Record in `docs/RESEARCH-TOOLCHAIN.md`.

## The words (2026-10-17; one word everywhere, 2026-10-19)
The player is the person; the hero is the player's hero; the special unit is the town's T3. Captain and champion are retired, except the Captain as a stock model, the garrison's captain as a unit, and the wild's undead champions. On 2026-10-19 the owner ruled one word everywhere, player, no alias: the wall's docs and sheets were swept too. Never write captain for the person again, on either face.

## Standing rules (see CLAUDE.md)
- The style audit rule: a change to the look is audited against every row of `design/INVENTORY.md`, recorded in `records/style-audit-<date>.md`; never a one-surface patch.
- Every verdict that can be drawn gets a diorama in the locked ink.

## Words that get misread
- **Chunk:** one domain, built only after every decision is locked and every domain is on the map, and cross-checked against all the others at its outer gate. Never one department built end to end; not a time box.
- **Interview:** the agent interviewing the request with the owner: one verdict per element, rank and research, one question at a time, facts found by the agent. Not a stakeholder interview, not requirements gathering.
- The public explanation with the diagram and glossary is `docs/index.html`.

## How the owner works (short)
Blunt, no cheerleading. One question at a time with concrete options. A verdict per element (APPROVE / REDACT / ADD / FLAVOUR). A running design log; DECISIONS.md written only after he says yes. One chunk, then show him. Every element on a page checked before moving on. Deliverables saved to the repo with one screenshot — not file cards. Commit per chunk with his approval; never push until he says.

## Next session (local, from 2026-10-19)
```
Work in C:\projects\games\triforce-defense on master, from a session rooted at C:\projects. First merge the wiki branch if it is not merged yet: git fetch origin && git merge --no-ff origin/claude/charming-johnson-wut687 && git push (PR #1 is clean). Read CLAUDE.md, docs/HANDOFF.md ("Two faces, one ledger"), DECISIONS.md and design/index.html before anything else. Hats: Programmer is LOCKED; announce the hat you wear.

The repo has two faces of one ledger: the wall (design/v2, sheets approved one by one; docs/HORDE.md, UNDEAD.md, LEFT2DIE.md) and the wiki (design/index.html, the polished living document; DECISIONS.md is the manifest). Both are good; neither is retired. The wiki is behind the wall's verdicts of 19 Oct. Your job this session: reconcile, one question at a time, 2 to 4 options, the recommended one first, push back, never yes-man, DECISIONS.md written only after the owner says yes. The list to walk, in this order, is in HANDOFF.md under "Two faces, one ledger": the clock, the fire's timers, three victories, the boss chosen from three, the horde's table and heroes onto chapters 7 and 9, the defender's drop, the garrison outside the gate, the word captain. For each ruling: amend DECISIONS.md, update the wiki page in the wiki's words (player, hero, special unit), draw a diorama in the locked ink where a verdict can be drawn (CLAUDE.md drawing rule), add any new surface to design/INVENTORY.md, log it in docs/CHANGELOG.md and records/interview-<date>.md. If the look changes, run the style audit rule in CLAUDE.md across every INVENTORY row before calling it done.

Publishing the wiki: python design/build-artifact.py writes design/dist/triforce-defense.html (git-ignored); set CHROME_PATH or run playwright install chromium for the render check, or skip it. Screenshot design/shots/site.png with headless Chromium after page changes; no console errors is the bar. Desktop only. Stock models only.

Do not touch design/v2 or the wall's docs except to cite them. One chunk, then show the owner. Commit per chunk with his approval; push when he says.
```
