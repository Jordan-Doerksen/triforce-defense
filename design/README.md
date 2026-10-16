# The brief

`index.html` is the living design document — one scrolling brief, one plate per sealed decision in `../DECISIONS.md`.
Open it in a browser (it loads three Google fonts; offline it falls back to Georgia and still reads).

- `deck_vellum_tokens.css` — every colour and font, the one token file (GAME-07). Change a colour here.
- `deck_vellum_ds.css` — the skin: night ground, vellum plates, gilt rules, wax seals, the map's vocabulary, a little motion (respects reduced-motion). Its one raw colour is the paper mottling's tint, inside a data-URI filter that cannot read a variable.
- `shots/` — one screenshot per plate, taken when the plate is built or redrawn
- `options/` — side-by-side renders of a plate's candidate visuals, for the owner to pick from before the plate is built (GATE-14); `options.css` holds their layout only; the clock's and the two armies' svg classes live in `deck_vellum_ds.css`
- `brief.js` — the sky, plates waking on scroll, the rail, and the hall's music (generated in-browser; swap for a real track if one is chosen)
- `SOURCES.md` — citations, one section per plate; never on the plate itself
- `_retired/` — earlier attempts, kept for the record

Each plate: kicker · title · one or more figures (SVG) · 3–5 paragraphs · wax seals for the verdicts. A plate shows as many figures as its decision needs (owner, 2026-10-16: the brief is a scrolling document, not a slide deck; one figure per plate was a way to chunk the work).
Build order: I the one sentence → II the clock → III the two armies → IV the town → V the wild.
No plate is written before its decision is sealed.
