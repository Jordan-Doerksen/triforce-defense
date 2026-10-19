# The wall — the ruleset for v2

v2 of the design document is a set of sheets you would pin on a wall. Every sheet has two faces,
**the detail and the art**, so the nerds, the architects, the creatives and the dreamers read the same
sheet. Pictures come first, symbols second and words third, the way a LEGO manual works with no words
at all. The world and the art stay Warcraft, not LEGO.

These rules come out of the design-first interview with the owner, one question at a time. A rule is
sealed when the owner picks it, and only sealed rules bind a sheet. Inside them a sheet is free: the
rules are the grammar, not the sentence, so no two sheets need be copies.

## Sealed (interview, 19 Oct 2026)

| # | Rule | Why |
|---|------|-----|
| R1 | **A sheet is about one thing**: a place, a building, a unit, an event or a system (the hill town, the gate, the fire, a ritual, the clock). The decisions it shows are cited in its title block. | A thing can be drawn; a bare decision often cannot. About 20–25 sheets for v1's content. |
| R2 | **Every sheet has two faces: the detail and the art.** How they share the sheet is the sheet's own choice, made for its subject: a cutaway, a board, a tree, a vector map, an illustration over a score, a heatmap. No sheet is a copy of another's layout. | Amended at Q4. The cutaway (X-001) is one approved template, not the rule. |
| R3 | **ARCH D landscape, 36 × 24 in, 3:2.** The screen and the print are the same sheet. | The architect's standard sheet, the same shape as a screen; it scales to any 3:2 print. |
| R4 | **A big visual choice is shown, never only asked.** A question about how something looks comes with a trial sheet (the X series) that draws every option. | The owner's ruling at Q4. Words cannot carry a look. |
| R5 | **The detail drives the art where it can.** On a technical sheet the art is computed from the same data as the detail, so changing a number repaints the picture (X-002: the painting splits where day : night splits; a heatmap could come from a decision tree). Where a picture says it better than any chart, the art is an illustration: night they come, day we rebuild. | The owner's ruling at Q4. |
| R6 | **Every mockup is built from real decisions.** No arbitrary pictures and no invented numbers. A value cites its decision, or it is a test value and wears brackets: `[4]`. | The owner's ruling at Q4, after X-001's placeholder dimensions. |
| R7 | **The palette is drafting vellum.** The sheet and the detail face are sepia ink on cream; the art keeps v1's Flash style. | Q4, chosen from X-001. |
| R8 | **No paragraphs on a sheet.** A label is six words or fewer; numbers are cited or bracketed; keys sit in the title block; a red note says only what the sheet itself found. The why lives on the back of the sheet: `DECISIONS.md` by number, and `SOURCES.md`. | Q5, X-002's budget. Words stay tertiary, the LEGO rule kept strictly. |

## Carried over, not re-asked

- **One token file.** Every colour and font lives in `wallsheet_tokens.css` (GAME-07).
- **Every animation has a still, and the still is the print** (SAFE-05). Reduced motion shows the still.
- **No sheet before its decision is sealed** in the manifest. v1 is the source for chapters 4–9 until they reach `DECISIONS.md`.
- **The art is v1's Flash style**: black ink outlines, flat fills, stepped (never tweened) motion, v1's scene palette.

## Defaults the agent chose (the owner may redact any)

- **One model, many views.** An object's geometry or a system's numbers are written once (`model_*.js`), and every face is drawn from them, so the faces can never disagree. This is how BIM tools keep plans and renders in step, and it is how R5 is kept.
- **One entourage.** Every figure (footman, peasant, ghoul, rider, engine, ritual) is one function in `figures.js`, so every sheet draws the same footman.
- **Drafting conventions, used straight**: a title block down the right edge, zone marks in the border, split view bubbles (view over sheet), hexagon keynote tags with the key in the title block, the architect's slash on dimensions, dashed hidden lines, and a red revision cloud with a delta flag around anything the sheet itself turns up.
- **On screen, a sheet may run**: X-001's seams drag, and X-002's one clock drives the sun, the moon and the score's playhead together. In print every sheet is its still.
- **Sheet numbers**: X-series sheets are trials and mockups, not part of the set. The set's numbering is not yet decided.

## Still open (the interview continues)

| Q | Fork | Trial sheet |
|---|------|-------------|
| Q6 | Motion: where a sheet moves, and how | needs one from real data (R4 · R6) |
| Q7 | Which LEGO devices to adopt: steps, the parts box, callouts, box art | needs one from real data (R4 · R6) |

## The sheets so far

| Sheet | Thing | Template | State |
|-------|-------|----------|-------|
| X-001 | the gate (2.3 · 2.4 · 6.7) | the cutaway, four drawing hands | trial; chose the palette (Q4). Its dimensions are placeholders, which R6 now forbids |
| X-002 | the clock (1.4 · 3.3 · 4 · 6.5 · 7.1–7.5 · 9.1–9.5) | an illustration over a score; the detail drives the art | **approved** by the owner, 19 Oct. Its finding (13 × 6 = 78 min) moved the test cycle to 4 min, 2:40 + 1:20; the sheet redrew itself from the model |

## Sources

- Stone Librande, *One-Page Designs*, GDC 2010, and *Simulating a City, One Page at a Time*, GDC 2013: one central image, white space, callouts, print large, date every sheet, make something people want on the wall. On SimCity the sheets caught flawed systems early, as X-002 did with the match length.
- Ian Schreiber, *The Four One-Page Design Docs You Need*, GDC 2025: vision, pillars, loops, resource flow.
- US National CAD Standard sheet conventions (title block, sheet types, reference bubbles, revision clouds).
- LEGO building instructions as LPub3D (github.com/trevorsandy/lpub3d) models them: the step image, the parts list, callouts, the bill of materials.
- rough.js (github.com/rough-stuff/rough, MIT), the pencil hand on X-001, vendored in `vendor/`.
