# v2 — the wall

The second version of the design document: one-page sheets you would pin on a wall, each with two
faces, the detail and the art, of one thing. The rules are in `RULES.md`, built by interview; v1 (the
scrolling warglass document) stays as it is.

Open a sheet in a browser; it loads Google fonts and falls back to Georgia offline. Print at 36 × 24 in
(ARCH D) or any 3:2 size. On screen, X-001's seams drag and X-002's clock runs; print shows the still.
Add `?motion=data` to keep only what the numbers drive, or `?motion=still` to see the print on screen.

- `X-001.html` — trial: the gate as a cutaway, in four drawing hands (Q4, chose drafting vellum)
- `X-002.html` — approved: the clock, an illustration (half and half, its own loop) over a score that carries every number
- `X-003.html` — trial for Q7: the hill town in three steps, LEGO-manual devices, box art and plans from one model
- `wallsheet_tokens.css` — every colour and font (GAME-07)
- `wallsheet_ds.css` — the skin: the sheet, the title block, the art's Flash style, the drawing hands, the score, print
- `wallsheet.js` — draws views from a model: the render, the drawing in a hand, the cutaway's seam
- `figures.js` — the entourage: every person, beast and machine, one function each
- `model_gate.js` — the gate (2.3 · 2.4 · 6.7) as one model
- `model_clock.js` — the clock (1.4 · 3.3 · 7.1–7.5 · 9.3 · 9.5) as data, every value cited
- `model_town.js` — the hill town (1.5 · 2.4–2.6 · 6.1–6.6): walls, river, hall, spine, plots, the seven choices, the steps
- `iso.js` — the isometric renderer for 3D art: boxes, roofs, rings, sprites, drawn far to near
- `sheet_town.js` — X-003: the box, the three steps, the callout
- `sheet_clock.js` — X-002's two faces, both computed from `model_clock.js`, and the one clock that runs them
- `vendor/rough.js` — rough.js 4.6.6 (MIT, `vendor/LICENSE-roughjs.txt`), the pencil hand
- `shots/` — one screenshot per sheet, X-002's art running (`X-002-art.gif`), and what a question was asked with (the motion GIFs, the night-growth options)
