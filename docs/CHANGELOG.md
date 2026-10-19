# Changelog

Phase log for triforce-defense. Newest first. Group by chunk/milestone; keep entries
concrete (what changed, what it proves), with absolute dates (YYYY-MM-DD).
Mirrors the Build Timeline in `DECISIONS.md`.

## Unreleased
- …

## 2026-10-19 — X-003, the trial for Q7: the hill town in three steps
- `X-003.html`, built from v1 chapter 6 (the spine, the sites, six plots for seven choices, the hall tiers opening rings I–III, the blacksmith tiers, the Castle's special unit) and 1.5 (the hill's high ground, the river, the falls). The art is a box: the Castle-tier town as an isometric diorama on its plateau, one build of many, with Flash loops (smoke, flags, the river, the falls, an Aviary gryphon circling). The detail is three steps in ink, one per tier: a big number, a parts box with counts, what is new drawn bold, short arrows to where it goes; and a callout done six times: a plot, its card of seven (the eighth empty), and the plot building itself in view.
- `model_town.js` holds the town once; `iso.js` (new, reusable) projects it for the box, and the plans draw it flat. Screenshot `shots/X-003.png`, the box running `shots/X-003-box.gif`. No console errors; no sideways scroll at 390 px.

## 2026-10-19 — three victories; X-002's art half and half
- Decision 1.3 amended with 9.5 (owner): three victories. Night 13 has no dawn of its own; it ends when the captains kill the boss, when the King's army arrives ([3:00] into the night, test value) and kills it, or earlier, when the rituals are broken. Each gets its own last screen. Amendment and Change Log row in `DECISIONS.md`; the score's end column shows the three.
- The owner detached X-002's art from the clock: a clean half and half with its own Flash loop. By day the field force marches out of the gate on the ritual (an engine shelling the obelisk, footmen on the acolytes); by night the captain, the field force and the garrison hold the gate while the horde comes down the road and falls. The ruler over the art is gone. The detail gains a lengths row: each cycle's day and night, the days falling from 3:00 to 1:30 and the nights rising, even by night 7. `?motion=data` stills the art and keeps the score's playhead. GIF `shots/X-002-art.gif`. Revision 4.

## 2026-10-19 — R8, R9; the nights grow
- Q5 sealed as R8: no paragraphs on a sheet (X-002's budget). Q6 sealed as R9: everything moves (the clock and v1's Flash loops), shown first as two GIFs of X-002 running (`shots/X-002-motion-all.gif`, `-data.gif`); `?motion=data` and `?motion=still` let a viewer choose.
- Watching X-002 run, the owner made the nights grow: days start at 3:00 and shrink to 1:30, nights start at 1:30 and grow to 3:00, every cycle 4:30, 58:30 a match. Shown first as three options drawn from the model (`shots/X-002-night-growth-options.png`). Change Log row in `DECISIONS.md`.
- X-002 now draws per-cycle lengths: the score is to scale across the match, and running, the painting's dusk slides along the wall cycle by cycle, more stars come out, and the ruler reads the cycle on show. The still prints cycle 1 with a dashed mark at night 13's dusk. Revision 2.

## 2026-10-19 — X-002 approved; the test cycle becomes four minutes
- The owner approved X-002, the clock, and ruled on its finding: the test cycle is cut from six minutes to four, keeping the 2 : 1 shape, 2:40 day + 1:20 night. Thirteen nights now run 52 min; the forty minutes stays unsealed. Change Log row in `DECISIONS.md`.
- One line changed in `design/v2/model_clock.js` (the cycle, now in seconds); both faces of X-002 redrew from it: the painting's split, the sun and moon arcs, the ruler, the score's cells, the minutes and the red note. Labels read m:ss where a value is not whole minutes. Screenshot re-taken.

## 2026-10-19 — v2: Q4 sealed, two faces, mockup X-002 (the clock) from real data
- Owner, on X-001: drafting vellum is the palette (R7), and the cutaway is an approved design, but one template, not the rule. Every sheet has two faces, the detail and the art (R2, amended); the detail drives the art where it can, and where a picture says it better the art is an illustration (R5); every mockup is built from real decisions, never an arbitrary picture (R6). The sheet paper and ink move to vellum in `wallsheet_tokens.css`.
- `X-002.html`, the clock: the art paints one cycle split day | night where the data splits it ([4] : [2], the first test), with the push window by day (a field force and an engine for a ritual on blight, a plot rising behind the wall) and the wave by night (the horde with the tell, the garrison at the gate); the detail is the 13-night match to scale (event nights 3 · 6 · 9 drawn without repeats, night 12 any at full strength, night 13's three prongs, a bounty every dawn, the fire and the relief, the undead's day/night shape, hard mode planned). Both are computed from `model_clock.js`; one clock runs the sun, the moon and the score's playhead.
- The sheet found something: at the six-minute test cycle, 13 nights run [78] min; v1's mode card says ~40 min (unsealed since 17 Oct). Flagged on the sheet in red, for the owner; no decision changed.
- `figures.js` holds the entourage for every sheet; the gate model now draws its people from it. Checked in headless Chromium: no errors on either sheet, X-002's clock runs and its still prints, no sideways scroll at 390 px. Screenshots `design/v2/shots/X-001.png`, `X-002.png`.

## 2026-10-19 — v2, the wall: the interview opens, trial sheet X-001
- v2 of the design document begins in `design/v2/`: one-page sheets for a wall (ARCH D, 36 × 24 in), each putting a technical drawing and a render of one thing in one frame. v1 stays as it is.
- Interview with the owner, one question at a time: R1 a sheet is about one thing, R2 the cutaway or the board, R3 ARCH D landscape. At Q4 the owner ruled R4: a big visual choice is shown as an example, never only asked. All recorded in `design/v2/RULES.md`.
- `X-001.html`, the trial for Q4: the gate (2.3 · 2.4 · 6.7) as four cutaways, v1's Flash render left of each seam and one drawing hand right of it (drafting vellum, blueprint, night glass, pencil). The seams drag on screen. Every view is drawn from one model (`model_gate.js`). The pencil hand is rough.js 4.6.6 (MIT), vendored. Screenshot `design/v2/shots/X-001.png`.
- Checked in headless Chromium: no console errors; the seam drags by pointer and arrow keys; no sideways scroll at 390 px. Not yet chosen by the owner.

## 2026-10-15 — Plate I map accuracy pass (Decision 1.5 amendment)
- The map is redrawn: a winding river out of the north, through the hill town, over the falls and into the valley's lake; the towns smaller and farther apart; the hill↔valley road runs down beside the falls and crosses the river at a bridge; a mountain ridge down the whole west border; a thick forest down the whole east, around the forest town. Neatline, and a bridge entry in the legend.
- Animations kept (blight, river flow, falls, lake glint, night waves); no new motion. The falls get a water bed so they read. Map colours are tokens; the map's inline colours moved to classes.
- Map probe, headless Chrome, 2026-10-15: no label overlaps another, crosses a town wall or runs off its road; the river ends inside the lake; the hill road crosses the river once, with the bridge on the crossing; each short road starts in the overrun province and ends at a gate; ridge and forest span the frame. Result `ok: true`; the same probe returned `ok: false` on a copy with the river cut short and a short road moved out of the wild. The probe is session scratch, not in the repo. Two read-only reviewers found the river short of the lake, an "only way" line that contradicted the short road, a short road outside the wild and borders short of the frame; all four fixed.
- Body text: the falls road is "the safe road" to the valley, not "the only way" — the short road through the north was always the other way.
- Screenshot `design/shots/plate-1.png`. Not yet called accurate by the owner.

## 2026-10-15 — Under the kit (design-first 0.1.38)
- Every colour and font of the brief moves to `design/deck_vellum_tokens.css` (GAME-07): the stylesheet's, and the sky canvas's two colours, which `brief.js` now reads from it. `deck_vellum_ds.css` and `brief.js` hold none, except the paper mottling tint inside a data-URI filter, which a variable cannot reach. Plate I under reduced motion screenshots byte-identical before and after the move (headless Chrome, compared with `cmp`).
- Reduced motion now also stops smooth scrolling, the seal, button and rail transitions, and the sky's frame loop (one still frame) (SAFE-05).
- `.gitattributes` added (DES-09; late — the first commit did not carry it).
- `design/brief.js`: the one empty catch carries its reason (OBS-04).
- `docs/HANDOFF.md` ends with `## Next session` (DES-14).
- Stale split-by-size text in `ARCHITECTURE.md` and `core/README.md` replaced by DES-03. README pointer and licence line corrected. Council record line 3 corrected.

## 2026-10-15 — The brief and council session 1
- Council session 1, run by hand in chat: manifest chapters 1–3 (`records/council-2026-10-15-shape.md`). Decision 2.6, building roles.
- Deck slide 01, then the living brief `design/index.html` on `deck_vellum_ds`: cover, rail, Plate I. Terms amended (towns, captains, the King's army). Decision 1.5, the three towns, then its amendment after Plate I's sketch.
- Hand-off written for the next session.

## 2026-10-15 — Chunk 1: skeleton
- Initial scaffold: domain-split repo, docs (ARCHITECTURE + DECISIONS manifest + SPEC + HANDOFF), per-domain config .json, .gitignore, license.
