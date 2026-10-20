# HANDOFF — Triforce-Defense

## State card (2026-10-19, the two faces reconciled; master ahead of origin, not pushed)
- **Where:** Design. Nothing built. No map file yet. Programmer hat LOCKED. The wall (`design/v2/`) is approved sheet by sheet through S-101 (for review); the wiki (`design/index.html`) carries every verdict of the wall as of 19 Oct, reconciled one ruling at a time in `records/interview-2026-10-19.md` (the clock, the fire, three victories, the boss, the horde, the drop, the garrison out front, the word player, the orphans of 16 Oct). Plate I was called accurate on 2026-10-16; the vellum brief is retired. The wall's prints still show "captain" in two labels until re-shot.
- **Kit:** design-first 0.1.38. The kit has no per-repo adopt step; the repo is under the kit when the Doctor (`C:\projects\AI-Brain\Doctor.bat`) reports nothing for it. Known blind spot: the game scan claims (SCAN-GAME-21, -15, -16, SCAN-OBS-09) select a repo by a root `index.html`, `project.godot`, `package.json` or `src-tauri`, so they do not see this one. That is a brain `claims.json` change, not done. Last Doctor run (2026-10-15 22:00) still fails RULES-GAME-07 here, on `design/_retired/deck_dispatch_ds.css` only; the fix is an owner decision (exempt `_retired/` in the brain's claims, or accept it), not done.
- **Manifest:** `DECISIONS.md` — Chapters 1–9 sealed; the wall's verdicts of 19 Oct are folded into the decisions they amend (1.3, 1.4, 2.1, 2.3, 3.1, 4.2, 4.3, 6.7, 7.1, 7.5, 9.1, 9.3, 9.4, 9.5) and three new ones (7.6 the burrow, 7.7 the horde night by night, 7.8 the horde's heroes). Open questions table at the bottom: numbers for the desk, and the parked 3.0 equipment and talents.
- **Council record:** `records/council-2026-10-15-shape.md` (seats run by hand in chat). The kit command `/design-first:council` exists; run it from a session rooted at `C:\projects`, where the seats live (`C:\projects\.claude\agents\council-*.md`). Write each seat's agent file name in the record — SCAN-GAME-21 greps for them.
- **The design document:** `design/index.html` — one scrolling site in a Warcraft III look on glass panels (2026-10-16, owner: not cards like a deck). Every sealed decision is on it. Tokens `design/warglass_tokens.css` (night on `:root`, day under `[data-day]`), skin `design/warglass_ds.css`, script `design/gdd.js`, citations `design/SOURCES.md`, screenshot `design/shots/site.png`. Desktop only by the owner's word. The vellum plates brief is in `design/_retired/`.
- **Git:** `master`, tracking `origin/master` (Jordan-Doerksen/triforce-defense, PUBLIC since 2026-10-16 on the owner's word, for cloud sessions). On 2026-10-19 the local master (eight commits of 16 Oct that GitHub never got) merged with origin (the wiki, PR #1; the wall, PR #4) and the wiki branch tip; master is ahead of origin and NOT pushed. Push only when the owner says.
- **Cloud sessions:** they get this repo only. The brain (`C:\projects\AI-Brain`), the design-first kit and the council seats (`C:\projects\.claude\agents`) are not in it, so a cloud session cannot convene the council (Plate II) or run the Doctor. Work that needs them runs locally from `C:\projects`. Stale `stale*` files under `.git/` are moved-aside lock files from a session that could not delete; safe to remove.

## Two faces, one ledger (2026-10-19, owner)
The repo carries two design faces on purpose: **the wall** (`design/v2/`, sheets you put on a wall, approved one by one, with `docs/HORDE.md`, `docs/UNDEAD.md`, `docs/LEFT2DIE.md`) and **the wiki** (`design/index.html`, the polished living document, also the ledger and manifest with `DECISIONS.md`). Both are good work. The wiki absorbed the wall's verdicts of 19 Oct in the local session of the same day (`records/interview-2026-10-19.md`), one ruling at a time; the list below is what was reconciled, each now on both faces:
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
0. **The reconciliation is complete (2026-10-19).** Every item under "Two faces, one ledger" is on both faces; `records/interview-2026-10-19.md` is the log. Master is ahead of origin and not pushed; the owner pushes.
1. **Re-shoot the wall's prints** (`design/v2/shots/`, PNG, WebP thumbs, GIFs): the sheets were swept to "player" but C-102's "the roll as the captains see it" and T-101's "a captain's town" still show in the prints. The cloud session's capture method is not recorded; a local headless-Chrome capture at the sheets' 3:2 size is a session of its own. Do not touch the sheets' content.
2. **The numbers, at the desk:** the day and night lengths (1.4, test values), the aura's values and the count per night (7.7), the burrow's numbers (7.6), the drops' climb in rarity (7.8), the buff values, the quick road (M-101's finding). Each is a row in the Open Questions.
3. **The build: Phase 1** per the QA seat's order in `records/council-2026-10-17-inventory.md` (the config table and the sync bus, stock dialogs, then the frames), after the toolchain recon (`docs/RESEARCH-TOOLCHAIN.md`). The Programmer hat unlocks only on an owner-approved spec (GAME-11, GATE-04).
4. **Parked:** Reforged 3.0 equipment and talents (Open Questions), decided at Phase 5 after the recon checks the 3.0 systems in the editor.

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

## Next session (local, from 2026-10-19, evening)
```
Work in C:\projects\games\triforce-defense on master, from a session rooted at C:\projects. Read CLAUDE.md, docs/HANDOFF.md (the state card and "Next"), DECISIONS.md and design/index.html before anything else. Hats: Programmer is LOCKED; announce the hat you wear. The two faces of the ledger (the wall in design/v2 and docs/HORDE.md; the wiki in design/index.html with DECISIONS.md) were reconciled on 19 Oct (records/interview-2026-10-19.md); master is ahead of origin and NOT pushed, push only when the owner says.

Open with a state card from the repo's documents, then take "Next" in order, one chunk at a time, one question at a time with 2 to 4 options, the recommended one first with its reason, push back, never yes-man; DECISIONS.md is written only after the owner says yes. The one word for the person is player, everywhere, no alias; the garrison's captain is a unit and the Captain a stock model.

Publishing the wiki: python design/build-artifact.py writes design/dist/triforce-defense.html (git-ignored). Screenshot design/shots/site.png after page changes with headless Chromium over CDP (no preview pane; the page is taller than one Chrome surface, so capture in slices of 8000 px and stitch); no console errors is the bar. Desktop only. Stock models only. Every verdict that can be drawn gets a diorama in the locked ink; a new surface goes in design/INVENTORY.md; if the look changes, run the style audit across every row.

Do not touch design/v2's content except to cite it; re-shooting its prints is item 1 of "Next" and touches only design/v2/shots/. One chunk, then show the owner. Commit per chunk with his approval; push when he says.
```
