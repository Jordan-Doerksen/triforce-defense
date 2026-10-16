# HANDOFF — Triforce-Defense

## State card (2026-10-16, open questions worked; Plate III at the council)
- **Where:** Design. Nothing built. No map file yet. Programmer hat LOCKED. Plate I's map is called accurate (2026-10-16). Plate II (The Clock): the council ran (`records/council-2026-10-16-plate-2-clock.md`), Decision 1.4 is amended, the owner picked option C (by day and by night) from `design/options/plate-2-visuals.html`, and Plate II is built into `design/index.html` (screenshot `design/shots/plate-2.png`). He called it right on 2026-10-16.
- **Kit:** design-first 0.1.39 (the running copy, 2026-10-16). The kit has no per-repo adopt step; the repo is under the kit when the Doctor (`C:\projects\AI-Brain\Doctor.bat`) reports nothing for it. Known blind spot: the game scan claims (SCAN-GAME-21, -15, -16, SCAN-OBS-09) select a repo by a root `index.html`, `project.godot`, `package.json` or `src-tauri`, so they do not see this one. That is a brain `claims.json` change, not done. Last Doctor run (2026-10-15 22:00) still fails RULES-GAME-07 here, on `design/_retired/deck_dispatch_ds.css` only; the fix is an owner decision (exempt `_retired/` in the brain's claims, or accept it), not done.
- **Manifest:** `DECISIONS.md` — Chapters 1–3 sealed (1.1–1.5, 2.1–2.6, 3.1–3.2); Decision 1.4 amended 2026-10-16 by the Plate II council. Open questions table at the bottom.
- **Council records:** `records/council-2026-10-15-shape.md` (seats run by hand in chat); `records/council-2026-10-16-plate-2-clock.md` (the first run through the command, five seats, closed). The kit command `/design-first:council` exists; run it from a session rooted at `C:\projects`, where the seats live (`C:\projects\.claude\agents\council-*.md`). Write each seat's agent file name in the record — SCAN-GAME-21 greps for them.
- **The brief:** `design/index.html` — the living design document, one plate per sealed decision. Plates I and II exist. Tokens `design/deck_vellum_tokens.css` (every colour and font; the one exception, the paper mottling tint, is named in its header), skin `design/deck_vellum_ds.css`, motion + music `design/brief.js`, citations `design/SOURCES.md`.
- **Git:** `master`, tracking `origin/master` (Jordan-Doerksen/triforce-defense, PUBLIC since 2026-10-16 on the owner's word, for cloud sessions). Pushed through the Plate I commit on 2026-10-16. Commits after that are local only. Push again only when the owner says. Stale `stale*` files under `.git/` are moved-aside lock files from a session that could not delete.
- **Cloud sessions:** they get this repo only. The brain (`C:\projects\AI-Brain`), the design-first kit and the council seats (`C:\projects\.claude\agents`) are not in it, so a cloud session cannot convene the council (Plate II) or run the Doctor. Work that needs them runs locally from `C:\projects`.

## Next (in order)
1. ~~Plate I map accuracy pass~~ — called accurate by the owner, 2026-10-16.
2. **Plate II — The Clock** (Decision 1.4, amended by the council 2026-10-16). Built with option C; called right by the owner 2026-10-16. The title and subline are Spark's draft C.
3. ~~Open questions~~ — worked 2026-10-16 (`records/open-questions-2026-10-16.md`): T3 by town, custom commanders (2.7), undead air (3.3). Still open and routed: commanders' kits → Plate III council; plots → Plate IV; ritual mechanics → Plate V; night values → greybox.
3a. **Plate III — The Two Armies** (Decisions 2.3, 2.6, 2.7) through `/design-first:council`, including the three commanders' kits.
4. Toolchain recon (search GitHub first — owner rule): WC3 Lua / TypeScript-to-Lua tooling, map-as-folder, UI frame libraries, open co-op defence maps. Record in `docs/RESEARCH-TOOLCHAIN.md`.

## How the owner works (short)
Blunt, no cheerleading. One question at a time with concrete options. A verdict per element (APPROVE / REDACT / ADD / FLAVOUR). A running design log; DECISIONS.md written only after he says yes. One chunk, then show him. Every element on a page checked before moving on. Deliverables saved to the repo with one screenshot — not file cards. Commit per chunk with his approval; never push until he says.

## Next session
```
Work in C:/projects/games/triforce-defense, from a session rooted at C:/projects. Read docs/HANDOFF.md, DECISIONS.md and design/index.html. Hats: Programmer is LOCKED; announce the hat you wear. Plate II (The Clock) is built and waits for the owner's call on design/shots/plate-2.png: apply his corrections, then commit with his approval. Next after that: the open questions in DECISIONS.md, one at a time, 2-4 options, recommended first, each option with its reason, each ranked low/medium/high. Colours only in design/deck_vellum_tokens.css. One chunk, then a screenshot saved in the repo, then wait. Never push until he says.
```
