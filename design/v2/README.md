# v2 — the wall

The second version of the design document: one-page sheets you would pin on a wall, each a technical
drawing and a render of the same thing in one frame. The rules are in `RULES.md`, built by interview;
v1 (the scrolling warglass document) stays as it is.

Open a sheet in a browser; it loads Google fonts and falls back to Georgia offline. Print at 36 × 24 in
(ARCH D) or any 3:2 size. On screen, drag a cutaway's seam to wipe between the render and the drawing.

- `X-001.html` — trial sheet: the drawing half, one gate in four hands (Q4)
- `wallsheet_tokens.css` — every colour and font (GAME-07)
- `wallsheet_ds.css` — the skin: the sheet, the title block, the render's Flash style, the drawing hands, print
- `wallsheet.js` — draws every view from its model: the render, the drawing in a hand, the cutaway's seam
- `model_gate.js` — the gate (2.3 · 2.4 · 6.7) as one model
- `vendor/rough.js` — rough.js 4.6.6 (MIT, `vendor/LICENSE-roughjs.txt`), the pencil hand
- `shots/` — one screenshot per sheet
