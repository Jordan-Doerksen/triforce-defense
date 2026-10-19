# Changelog

Phase log for triforce-defense. Newest first. Group by chunk/milestone; keep entries
concrete (what changed, what it proves), with absolute dates (YYYY-MM-DD).
Mirrors the Build Timeline in `DECISIONS.md`.

## Unreleased
- …

## 2026-10-19 — M-101, the province (for review); a finding on the quick road
- `M-101.html`, from `model_province.js` (Plate I's map, 1.5 as clarified) and the hill from `model_town.js`. The art: the province as a diorama at dusk, the ridge and its spurs round the hill, the river off the mountains, through the hill town, over the falls, past the bridge into the valley's lake; the forest; the overrun north with its rituals, and the first wave coming down a short road onto every gate, the garrisons waiting. Mountains are halved and towns doubled in height (not to scale; `iso.js` gains an optional height stretch). The valley and forest towns show walls, gate and hall only; their layouts are T-102's and T-103's.
- The detail, from one height function added to the model (`relief`: a bowl falling to the lake, the hill's plateau as a frustum, a cliff at the falls and a ramp beside them, the ridge, its peaks and spurs): the plan, its slopes hachured downhill and heavier where steeper (jittered sampling after mewo2/terrain, MIT; Lehmann's convention), peaks as relief icons drawn far to near (after Azgaar's Fantasy Map Generator, MIT), the river widening downstream, town labels placed by mewo2's four-candidate rule; section A–A, jogged through all three towns; the graph, three towns as rings with their gates north, no road between hill and forest but the wild; and the two roads from the hill to the forest unrolled to scale, raced on one clock (`shots/M-101-race.gif`). The section checks the river runs downhill every step, and says so.
- The finding: measured on the plan, wall to wall, the quick road through the wild is 1.13× the safe road. 1.2 says it should be the quicker. Every gate faces north while the roads leave the towns' sides, so it hangs on where the roads meet the gates. Logged as an open question in `DECISIONS.md`; nothing changed.
- Sheets now load every font face before measuring text (fonts.ready alone resolved before the hand was asked for, and clouds came out narrow). No errors on any sheet; no sideways scroll at 390 px; stills under reduced motion and `?motion=still`.

## 2026-10-19 — T-101 approved
- The owner approved T-101 at revision 1; its seal reads APPROVED, 19 Oct 2026. The town layout on it stays drawn, not sealed (2.5), and the river's heights are unsealed.

## 2026-10-19 — T-101 revision 1: the mountains, the river downhill, a plainer box
- Decision 1.5 clarified (owner, on T-101): the mountains ring the hill, the west ridge with spurs north-west and south-west, and the river runs downhill the whole way, from a spring in the ridge into the hill's west wall, through the town, over the east falls, past the bridge, into the valley's lake. Plate I's upper reach, out of the north, is replaced. Clarification and Change Log row in `DECISIONS.md`.
- The art: a snow-capped massif behind the plateau on the west and south, the river coming off it in a cascade, through the west wall, over the falls, and on below the cliff in a pool and a lowland reach running out of the frame. The plans: mountains hatched west, north-west and south-west, contours falling away north, east and south, the river with downstream arrows. The key plan: the spurs around the hill, contours, the spring, chevrons downstream. New: the river's section, source to lake, with the ground falling the whole way (heights drawn, not sealed).
- The box is plainer (R10 refined): no title band or round badges; a framed render with an ordinary view title, the counts in its subtitle. The steps keep their arrangement. The key's line marks now draw (they lacked the vellum pen); TOWN HALL sits under the hall where it does not fit inside.
- X-003 now renders the new terrain too (it shares `town.js`); its shot stays the trial record. No errors on any sheet; no sideways scroll at 390 px. Shot `shots/T-101.png` replaced.

## 2026-10-19 — the real set begins: C-101, T-101
- The owner chose the architect's numbering: a letter per subject (G, S, M, T, A, H, C, W), X for trials. The 21-sheet index is in `design/v2/README.md`.
- C-101, the clock: X-002 promoted and renumbered, under an approved seal, with related sheets in place of the trial's rule list. Its shots renamed (`C-101.png`, `C-101-art.gif`).
- T-101, the hill: the box (R10), a key plan of the province from Plate I's map (`model_province.js`, new) with the hill picked out, the hill's charge (the siege engine; Win B runs through here), and the town in three numbered steps (R10), no parts boxes, arrows or callouts. Under review; its town layout is drawn, not sealed (2.5).
- The town drawing is now `town.js`, shared by T-101 and X-003 (the trial keeps its devices behind a `lego` option). A text anchor given in code now wins over a class's own; it had been centring labels meant to start. No errors on any sheet; no sideways scroll at 390 px.

## 2026-10-19 — Q7 sealed: R10; the interview is complete
- From X-003 the owner kept two LEGO-manual devices, the box art and big numbered steps (R10); parts boxes with counts, new parts bold with arrows, and ×N callouts were not adopted. X-003 stays as the trial record. Q1–Q7 are sealed as R1–R10 in `design/v2/RULES.md`.

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
