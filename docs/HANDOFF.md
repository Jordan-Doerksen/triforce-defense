# HANDOFF — Triforce-Defense

## State card (2026-10-15, under the kit)
- **Where:** Design. Nothing built. No map file yet. Programmer hat LOCKED.
- **Kit:** design-first 0.1.38. The kit has no per-repo adopt step; the repo is under the kit when the Doctor (`C:\projects\AI-Brain\Doctor.bat`) reports nothing for it. Known blind spot: the game scan claims (SCAN-GAME-21, -15, -16, SCAN-OBS-09) select a repo by a root `index.html`, `project.godot`, `package.json` or `src-tauri`, so they do not see this one. That is a brain `claims.json` change, not done. Last Doctor run (2026-10-15 22:00) still fails RULES-GAME-07 here, on `design/_retired/deck_dispatch_ds.css` only; the fix is an owner decision (exempt `_retired/` in the brain's claims, or accept it), not done.
- **Manifest:** `DECISIONS.md` — Chapters 1–3 sealed (1.1–1.5, 2.1–2.6, 3.1–3.2). Open questions table at the bottom.
- **Council record:** `records/council-2026-10-15-shape.md` (seats run by hand in chat). The kit command `/design-first:council` exists; run it from a session rooted at `C:\projects`, where the seats live (`C:\projects\.claude\agents\council-*.md`). Write each seat's agent file name in the record — SCAN-GAME-21 greps for them.
- **The brief:** `design/index.html` — the living design document, one plate per sealed decision. Plate I exists. Tokens `design/deck_vellum_tokens.css` (every colour and font; the one exception, the paper mottling tint, is named in its header), skin `design/deck_vellum_ds.css`, motion + music `design/brief.js`, citations `design/SOURCES.md`.
- **Git:** `master`, tracking `origin/master` (private, Jordan-Doerksen/triforce-defense). Local is ahead and NOT backed up; push when the owner says. Stale `stale*` files under `.git/` are moved-aside lock files from a session that could not delete; safe to remove.

## Next (in order)
1. **Plate I map accuracy pass** per Decision 1.5's amendment: winding river, towns farther apart, a bridge on the hill↔valley road, mountain ridge down the whole west border, thick forest border down the whole east. Then the owner calls the sketch accurate.
2. **Plate II — The Clock** (Decision 1.4), through `/design-first:council`: day/night as the wave clock, undead weak by day / strong on blight, the push window taught by the map.
3. Open questions, one at a time, 2–4 options, recommended first: town ↔ T3 assignment · the hero · plot count and menus · night count / buff values · undead air · ritual mechanics.
4. Toolchain recon (search GitHub first — owner rule): WC3 Lua / TypeScript-to-Lua tooling, map-as-folder, UI frame libraries, open co-op defence maps. Record in `docs/RESEARCH-TOOLCHAIN.md`.

## How the owner works (short)
Blunt, no cheerleading. One question at a time with concrete options. A verdict per element (APPROVE / REDACT / ADD / FLAVOUR). A running design log; DECISIONS.md written only after he says yes. One chunk, then show him. Every element on a page checked before moving on. Deliverables saved to the repo with one screenshot — not file cards. Commit per chunk with his approval; never push until he says.

## Next session
```
Work in C:\projects\games\triforce-defense, from a session rooted at C:\projects. Read docs/HANDOFF.md, DECISIONS.md and design/index.html. Hats: Programmer is LOCKED; announce the hat you wear. Next is chunk 1: the Plate I map accuracy pass in design/index.html per Decision 1.5's amendment — winding river, towns farther apart, a BRIDGE on the hill↔valley road, a mountain ridge down the entire west border, a thick forest border down the entire east. Keep deck_vellum and the animations; colours go in design/deck_vellum_tokens.css. One chunk, then a screenshot saved in the repo, then wait for the owner to call it accurate. Commit with his approval; never push until he says.
```
