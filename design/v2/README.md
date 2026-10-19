# v2 — the wall

The second version of the design document: one-page sheets you would pin on a wall, each with two
faces, the detail and the art, of one thing. The rules are in `RULES.md`, built by interview; v1 (the
scrolling warglass document) stays as it is.

Open a sheet in a browser; it loads Google fonts and falls back to Georgia offline. Print at 36 × 24 in
(ARCH D) or any 3:2 size. On screen, X-001's seams drag and X-002's clock runs; print shows the still.
Add `?motion=data` to keep only what the numbers drive, or `?motion=still` to see the print on screen.

## The set (architect's numbering: a letter for the subject, a number in the family)

| Sheet | Thing | Decisions | State |
|-------|-------|-----------|-------|
| G-001 | the set: the one sentence, the index, the key | — | to come |
| S-101 | the fire, before the first day | 4 | to come |
| M-101 | the province, three towns | 1.2 · 1.5 | **approved** |
| T-101 | the hill | 1.5 · 2.1 · 2.4–2.6 · 5.1 · 6.1–6.6 | **approved** |
| T-102 | the valley | 1.5 · 6 | to come |
| T-103 | the forest | 1.5 · 6 | to come |
| T-201 | the gate | 2.4 · 6.7 | to come |
| T-301 | a plot and its seven | 2.5 · 2.6 · 6.3 | **drawn**, for review |
| T-401 | the forge and the market | 6.4 · 6.6 | to come |
| A-101 | hold or move: the garrison and the field force | 2.3 | to come |
| A-102 | defeat: the breach and the sack | 2.7 | to come |
| H-101 · H-102 · H-103 | the Bombardier · the Marshal · the Prelate | 8 | to come |
| H-201 | the free ability, the stat chase | 8.5 | to come |
| C-101 | the clock | 1.3–1.4 · 3.3 · 6.5 · 7 · 9 | **approved** (was X-002) |
| C-201 | the event nights | 7.1–7.5 | to come |
| W-101 | a ritual and its bell | 9.1 · 9.2 | to come |
| W-102 | night 13, three endings | 9.3–9.5 · 1.3 | to come |
| W-103 | the camps and the bounties | 3.3 | to come |
| X-001 · X-003 | trials: the drawing hand (Q4), the LEGO devices (Q7) | — | records |

## The files

- `X-001.html` — trial: the gate as a cutaway, in four drawing hands (Q4, chose drafting vellum)
- `C-101.html` — the clock (approved; it was the mockup X-002)
- `M-101.html` — the province (approved): a diorama at dusk, the graph, the plan, section A–A, the two roads raced
- `T-301.html` — the plot and its seven (for review): one ground, seven futures; the card; what each answers; every way to fill six plots; the build in view
- `T-101.html` — the hill (approved): the town under its mountains, a key plan, the river source to lake, the hill's charge, three numbered steps
- `X-003.html` — trial for Q7: the hill town with every LEGO device it tried
- `wallsheet_tokens.css` — every colour and font (GAME-07)
- `wallsheet_ds.css` — the skin: the sheet, the title block, the art's Flash style, the drawing hands, the score, print
- `wallsheet.js` — draws views from a model: the render, the drawing in a hand, the cutaway's seam
- `figures.js` — the entourage: every person, beast and machine, one function each
- `model_gate.js` — the gate (2.3 · 2.4 · 6.7) as one model
- `model_clock.js` — the clock (1.4 · 3.3 · 7.1–7.5 · 9.3 · 9.5) as data, every value cited
- `model_town.js` — the hill town (1.5 · 2.4–2.6 · 6.1–6.6): walls, river, hall, spine, plots, the seven choices (with v1's card: hotkeys, icons, what each answers), the steps
- `iso.js` — the isometric renderer for 3D art: boxes, roofs, rings, sprites, drawn far to near
- `town.js` — the town drawn from its model: buildings in iso, the box, part icons, the plans per tier (shared)
- `sheet_x003.js` · `sheet_t101.js` · `sheet_m101.js` · `sheet_t301.js` — each sheet's own layout; M-101's draws the province's relief from one height function (plan hachures, section, the art's ground)
- `model_province.js` — the province (1.2 · 1.5, clarified on T-101), Plate I's map as data with the river from the ridge, the relief and section line: T-101's key plan, M-101
- `sheet_clock.js` — C-101's two faces, both computed from `model_clock.js`, and the one clock that runs them
- `vendor/rough.js` — rough.js 4.6.6 (MIT, `vendor/LICENSE-roughjs.txt`), the pencil hand
- `shots/` — one screenshot per sheet, the clock's art running (`C-101-art.gif`), M-101's race (`M-101-race.gif`), T-301's ground trying its seven (`T-301-art.gif`), and what a question was asked with (the motion GIFs, the night-growth options)
