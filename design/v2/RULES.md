# The wall — the ruleset for v2

v2 of the design document is a set of sheets you would pin on a wall. Each sheet is one page, and
each puts a technical drawing and a render of the same thing in one frame, so the nerds, the
architects, the creatives and the dreamers read the same sheet. Pictures come first, symbols second
and words third, the way a LEGO manual works with no words at all. The world and the art stay
Warcraft, not LEGO.

These rules come out of the design-first interview with the owner, one question at a time. A rule is
sealed when the owner picks it, and only sealed rules bind a sheet. Inside them, a sheet is free: the
rules are the grammar, not the sentence, so no two sheets need be copies.

## Sealed (interview, 19 Oct 2026)

| # | Rule | Why |
|---|------|-----|
| R1 | **A sheet is about one thing**: a place, a building, a unit or an event (the hill town, the gate, the fire, a ritual, the Bombardier). The decisions it shows are cited in its title block. | A thing can be drawn and rendered; a decision often cannot. ~20–25 sheets for v1's content. |
| R2 | **Drawing and render share one frame, by one of two devices.** *The cutaway*: one image, rendered on one side and drawn on the other, with the seam cutting through the object. *The board*: a hero render with small plan, elevation or section views docked around it. Each sheet picks one. | The variety comes from the choice. The overlay and the exploded view were offered and not chosen. |
| R3 | **ARCH D landscape, 36 × 24 in, 3:2.** The screen and the print are the same sheet. | The architect's standard sheet, the same shape as a screen; it scales to any 3:2 print. |
| R4 | **A big visual choice is shown, never only asked.** A question about how something looks comes with a trial sheet (the X series) that draws every option on the same object. | The owner's ruling at Q4. Words cannot carry a look. |

## Carried over, not re-asked

- **One token file.** Every colour and font lives in `wallsheet_tokens.css` (GAME-07).
- **Every animation has a still, and the still is the print** (SAFE-05). Reduced motion shows the still.
- **No sheet before its decision is sealed** in the manifest. v1 is the source for chapters 4–9 until they reach `DECISIONS.md`.
- **The render half is v1's Flash style**: black ink outlines, flat fills, stepped (never tweened) motion, v1's scene palette.
- **A bracketed number is a placeholder**, not a game value: `[230]`. Dimensions on a sheet are drawing units until the terrain pass seals real ones.

## Defaults the agent chose (the owner may redact any)

- **One model, many views.** Each object's geometry is written once (`model_*.js`); the render and every drawing are drawn from it, so they can never disagree. This is how BIM tools keep plans and renders in step.
- **Drafting conventions, used straight**: a title block down the right edge, zone marks in the border, split view bubbles (view over sheet), numbered grid bubbles on centrelines, hexagon keynote tags with the key in the title block, level datums, the architect's slash on dimensions, dashed hidden lines, and a break line for the seam.
- **On screen, the cutaway's seam drags**, by pointer or arrow keys. In print it stands where the model puts it.
- **Sheet numbers**: X-series sheets are trials and not part of the set. The set's numbering is not yet decided.

## Still open (the interview continues)

| Q | Fork | Trial sheet |
|---|------|-------------|
| Q4 | Which hand draws the drawing half: drafting vellum, blueprint, night glass or pencil? | `X-001.html` |
| Q5 | The text budget per sheet | — |
| Q6 | Motion: where a sheet moves, and how | needs one (R4) |
| Q7 | Which LEGO devices to adopt: steps, the parts box, callouts, box art | needs one (R4) |

## Sources

- Stone Librande, *One-Page Designs*, GDC 2010, and *Simulating a City, One Page at a Time*, GDC 2013: one central image, white space, callouts, print large, date every sheet, make something people want on the wall.
- Ian Schreiber, *The Four One-Page Design Docs You Need*, GDC 2025: vision, pillars, loops, resource flow.
- US National CAD Standard sheet conventions (title block, sheet types, reference bubbles).
- LEGO building instructions as LPub3D (github.com/trevorsandy/lpub3d) models them: the step image, the parts list, callouts, the bill of materials.
- rough.js (github.com/rough-stuff/rough, MIT) for the pencil hand, vendored in `vendor/`.
