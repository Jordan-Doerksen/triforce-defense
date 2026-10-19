# v2 — the wall

The second version of the design document: one-page sheets you would pin on a wall, each with two
faces, the detail and the art, of one thing. The rules are in `RULES.md`, built by interview; v1 (the
scrolling warglass document) stays as it is.

Online, every sheet is on the wall at https://jordan-doerksen.github.io/triforce-defense/ (the root
`index.html`): open one live, zoom its print, download one or all. Locally, open a sheet in a browser;
it loads Google fonts and falls back to Georgia offline. Print at 36 × 24 in
(ARCH D) or any 3:2 size. On screen, X-001's seams drag and X-002's clock runs; print shows the still.
Add `?motion=data` to keep only what the numbers drive, or `?motion=still` to see the print on screen.

## The set (architect's numbering: a letter for the subject, a number in the family)

| Sheet | Thing | Decisions | State |
|-------|-------|-----------|-------|
| G-001 | the set: the one sentence, the index, the key | — | to come |
| S-101 | the fire, before the first day | 4.1–4.4 · 5.1 · `docs/HORDE.md` | **drawn**, for review |
| M-101 | the province, three towns | 1.2 · 1.5 | **approved** |
| T-101 | the hill | 1.5 · 2.1 · 2.4–2.6 · 5.1 · 6.1–6.6 | **approved** |
| T-102 | the valley | 1.5 · 6 | to come |
| T-103 | the forest | 1.5 · 6 | to come |
| T-201 | the gate | 2.3 · 2.4 · 6.7 | **approved** |
| T-202 | the gate at night | 2.3 · 2.7 · 6.7 · 7 | **approved** |
| T-301 | a plot and its seven | 2.5 · 2.6 · 6.3 | **approved** |
| T-401 | the forge and the market | 6.4 · 6.6 | **approved** |
| A-101 | hold or move: the garrison and the field force | 2.3 | to come |
| A-102 | defeat: the breach and the sack | 2.7 | to come |
| H-101 · H-102 · H-103 | the Bombardier · the Marshal · the Prelate | 8 | to come |
| H-201 | the free ability, the stat chase | 8.5 | to come |
| C-101 | the clock | 1.3–1.4 · 3.3 · 6.5 · 7 · 9 · `docs/HORDE.md` | **approved** (revision 5: four events and their heroes) |
| C-102 | the horde, night by night | 1.4 · 7 · `docs/HORDE.md` | **approved** |
| C-201 | the event nights and their heroes | 7.1–7.5 · `docs/HORDE.md` | **approved** |
| W-101 | a ritual and its bell | 9.1 · 9.2 | to come |
| W-102 | night 13: the boss, three prongs, three endings | 1.3 · 9.3–9.5 · `docs/HORDE.md` | **approved** |
| W-103 | the camps and the bounties | 3.3 | to come |
| X-001 · X-003 | trials: the drawing hand (Q4), the LEGO devices (Q7) | — | records |

## The files

- `X-001.html` — trial: the gate as a cutaway, in four drawing hands (Q4, chose drafting vellum)
- `C-101.html` — the clock (approved; it was the mockup X-002)
- `M-101.html` — the province (approved): a diorama at dusk, the graph, the plan, section A–A, the two roads raced
- `T-201.html` — the gate (approved): the first blow at night; its card; one gate, three towns, one language; the crew's run in plan; who does what at the gate
- `T-202.html` — the gate at night (approved): three nights at the gate, a storyboard that plays like an animatic; what's at your gate tonight, a tree
- `C-102.html` — the horde, night by night (approved): the horde on the road growing, night 13's boss as a shadow; every night more and stronger, a new unit every second; the roll at the fire; the table, a pair each add night; WC3's tiers as a staircase of three buildings
- `C-201.html` — the event nights and their heroes (approved): one draw played as a board, four event nights across three towns, each hero at one; the draw; the heroes night by night, normal and hard; the four events and their heroes as cards
- `W-102.html` — night 13 (approved): three roads from the wild to the three towns, the boss on the middle one, a broken ritual's road empty; the boss chosen at the fire and his herald; the rituals and their lieutenants; the endings and their last screens
- `S-101.html` — the fire (for review): the screen itself, two heroes in the firelight and the third a shadow, the Lua frames at the edges; the host's panel; the three charges; the fire in four numbered steps, no clocks
- `T-401.html` — the forge and the market (approved): a street by day; the forge's window; the market's shelf; the ladder on the footman himself
- `T-301.html` — the plot and its seven (approved): one ground, seven futures; the card; what each answers; the questions a plot asks; the build in view
- `T-101.html` — the hill (approved): the town under its mountains, a key plan, the river source to lake, the hill's charge, three numbered steps
- `X-003.html` — trial for Q7: the hill town with every LEGO device it tried
- `wallsheet_tokens.css` — every colour and font (GAME-07)
- `wallsheet_ds.css` — the skin: the sheet, the title block, the art's Flash style, the drawing hands, the score, print
- `wallsheet.js` — draws views from a model: the render, the drawing in a hand, the cutaway's seam
- `figures.js` — the entourage: every person, beast and machine, one function each
- `model_gate.js` — the gate (2.3 · 2.4 · 6.7) as one model
- `model_horde.js` — the horde night by night (the owner, 19 Oct): the base wave, the unit table of pairs rolled at setup, the units' stock models, the night's aura by difficulty
- `model_clock.js` — the clock (1.4 · 3.3 · 7.1–7.5 · 9.3 · 9.5) as data, every value cited
- `model_town.js` — the hill town (1.5 · 2.4–2.6 · 6.1–6.6): walls, river, hall, spine, plots, the seven choices (with v1's card: hotkeys, icons, what each answers), the steps
- `iso.js` — the isometric renderer for 3D art: boxes, roofs, rings, sprites, drawn far to near
- `town.js` — the town drawn from its model: buildings in iso, the box, part icons, the plans per tier (shared)
- `sheet_x003.js` · `sheet_t101.js` · `sheet_m101.js` · `sheet_t301.js` · `sheet_t201.js` · `sheet_t202.js` · `sheet_t401.js` · `sheet_c102.js` — each sheet's own layout; M-101's draws the province's relief from one height function (plan hachures, section, the art's ground)
- `model_province.js` — the province (1.2 · 1.5, clarified on T-101), Plate I's map as data with the river from the ridge, the relief and section line: T-101's key plan, M-101
- `sheet_clock.js` — C-101's two faces, both computed from `model_clock.js`, and the one clock that runs them
- `vendor/rough.js` — rough.js 4.6.6 (MIT, `vendor/LICENSE-roughjs.txt`), the pencil hand
- `vendor/photoswipe*.js` · `vendor/photoswipe.css` — PhotoSwipe 5.4.4 (MIT, `vendor/LICENSE-photoswipe.txt`), the wall's zoom
- `vendor/jszip.min.js` — JSZip 3.10.1 (MIT, `vendor/LICENSE-jszip.txt`), the wall's download-all
- `../../index.html` — the wall: every sheet in the set's order, its print, its art running, the records; the set is listed in its script, one line a sheet
- `shots/` — one screenshot per sheet, the clock's art running (`C-101-art.gif`), M-101's race (`M-101-race.gif`), T-301's ground trying its seven (`T-301-art.gif`), T-201's first blow (`T-201-art.gif`), T-202's animatic (`T-202-art.gif`), T-401's street (`T-401-art.gif`), C-102's horde (`C-102-art.gif`), C-201's board (`C-201-art.gif`), W-102's night 13 (`W-102-art.gif`), S-101's fire (`S-101-art.gif`), and what a question was asked with (the motion GIFs, the night-growth options, T-301's and T-201's panel options); `shots/thumbs/` holds each PNG at 720 px wide (WebP) for the wall
