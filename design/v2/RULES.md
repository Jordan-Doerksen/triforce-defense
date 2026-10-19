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
| R5 | **The detail drives the art where it can.** On a technical sheet the art is computed from the same data as the detail, so changing a number repaints the picture (X-002: the painting splits where day : night splits; a heatmap could come from a decision tree). Where a picture says it better than any chart, the art is an illustration: night they come, day we rebuild. | The owner's ruling at Q4. Refined on X-002: when the art is the story, it is not bound to the numbers. X-002's art is a clean half and half with its own loop (by day the march on a ritual, by night the gate held), and the detail carries the change (the days shrinking, the nights growing). |
| R6 | **Every mockup is built from real decisions.** No arbitrary pictures and no invented numbers. A value cites its decision, or it is a test value and wears brackets: `[4]`. | The owner's ruling at Q4, after X-001's placeholder dimensions. |
| R7 | **The palette is drafting vellum.** The sheet and the detail face are sepia ink on cream; the art keeps v1's Flash style. | Q4, chosen from X-001. |
| R8 | **No paragraphs on a sheet.** A label is six words or fewer; numbers are cited or bracketed; keys sit in the title block; a red note says only what the sheet itself found. The why lives on the back of the sheet: `DECISIONS.md` by number, and `SOURCES.md`. | Q5, X-002's budget. Words stay tertiary, the LEGO rule kept strictly. |
| R9 | **Everything moves, and the still is the print.** Data motion first: the numbers drive the faces (X-002's one clock). Then v1's Flash loops: stepped, never tweened. Interaction where it reveals something (X-001's seam). Reduced motion, print, and `?motion=still` show the still; `?motion=data` keeps only what the numbers drive. | Q6, chosen from X-002's two GIFs. |
| R10 | **From a LEGO manual, two devices: the box art and big numbered steps.** Where a thing is built in stages, the art face can be its box (the finished set, one build of many) and the detail shows the build in big numbered steps. Parts boxes with counts, new parts in bold with arrows, and ×N callouts were shown on X-003 and not adopted. Refined on T-101: the box is a framed render with an ordinary view title, not a product box; no title band, no round badges, the counts go in the view's subtitle. | Q7, chosen from X-003; refined by the owner on T-101 (too literal). |

## Carried over, not re-asked

- **One token file.** Every colour and font lives in `wallsheet_tokens.css` (GAME-07).
- **Every animation has a still, and the still is the print** (SAFE-05). Reduced motion shows the still.
- **No sheet before its decision is sealed** in the manifest. v1 is the source for chapters 4–9 until they reach `DECISIONS.md`.
- **The art is v1's Flash style**: black ink outlines, flat fills, stepped (never tweened) motion, v1's scene palette.

## Defaults the agent chose (the owner may redact any)

- **One model, many views.** An object's geometry or a system's numbers are written once (`model_*.js`), and every face is drawn from them, so the faces can never disagree. This is how BIM tools keep plans and renders in step, and it is how R5 is kept.
- **One entourage.** Every figure (footman, peasant, ghoul, rider, engine, ritual, gryphon) is one function in `figures.js`, so every sheet draws the same footman.
- **One projection for 3D art.** `iso.js` draws a model as an isometric diorama (the camera to the north-east, the north and east faces lit), so a plan and its box art come from the same coordinates.
- **Drafting conventions, used straight**: a title block down the right edge, zone marks in the border, split view bubbles (view over sheet), hexagon keynote tags with the key in the title block, the architect's slash on dimensions, dashed hidden lines, and a red revision cloud with a delta flag around anything the sheet itself turns up.
- **On screen, a sheet may run**: X-001's seams drag, and X-002's one clock drives the sun, the moon and the score's playhead together. In print every sheet is its still.
- **Sheet numbers** (owner, 19 Oct): the architect's set, a letter for the subject and a number in its family: G general, S setup, M map, T towns, A armies, H heroes, C clock, W wild; X for trials, which stay as records. The index is in `README.md`.
- **A sheet's state is its seal**: *for review* until the owner approves it, then *approved* with the date (v1's wax seals for verdicts).

## The interview is complete

Q1–Q7 are answered and sealed as R1–R10 (19 Oct 2026). A new rule, or a change to one, goes the same way: one question, the options shown on a trial sheet from real data (R4 · R6), the owner's pick.

## The sheets so far

| Sheet | Thing | Template | State |
|-------|-------|----------|-------|
| X-001 | the gate (2.3 · 2.4 · 6.7) | the cutaway, four drawing hands | trial; chose the palette (Q4). Its dimensions are placeholders, which R6 now forbids |
| C-101 (was X-002) | the clock (1.3–1.4 · 3.3 · 4 · 6.5 · 7.1–7.5 · 9.1–9.5) | an illustration over a score | **approved** 19 Oct. Rev 1: its finding cut the test cycle to 4 min. Rev 2: the nights grow (day 3:00 → 1:30, night 1:30 → 3:00, 58:30). Rev 3: three endings. Rev 4: the owner detached the art from the clock: half and half, its own loop; a lengths row in the detail shows the days shrink and the nights grow |
| X-003 | the hill town (1.5 · 2.4–2.6 · 5.1 · 6.1–6.6) | box art (isometric, from the town model) over three steps and a callout (plans from the same model) | trial; chose R10 (Q7): the box art and the numbered steps stay, the parts boxes, bold-new with arrows and callouts go |
| T-101 | the hill (1.5 · 2.1 · 2.4–2.6 · 5.1 · 6.1–6.6) | the box (R10, as a framed render) beside a key plan, the river's section, the hill's charge, over three numbered steps (R10) | **approved** 19 Oct. Rev 1: the mountains around the hill, the river downhill (1.5 clarified), the box plainer (R10 refined). Its town layout is drawn, not sealed (2.5) |
| M-101 | the province (1.2 · 1.5) | a diorama at dusk beside the graph, over the plan (hachured from one model of the ground), section A–A and the two roads unrolled | **approved** 19 Oct. Its finding stays open: as drawn, the quick road is 1.13× the safe road (`DECISIONS.md`) |
| T-301 | a plot and its seven (2.5 · 2.6 · 6.2 · 6.3 · 6.5) | the art (one ground, seven futures) beside the card and a grid of what each answers, over the questions a plot asks (a tree) and three numbered steps (R10) | for review. Checks 2.5's rule: no option covers another. Rev 1: the owner turned down the build-space heatmap and picked the questions tree from three shown (`shots/T-301-panel-options.png`) |

## Sources

- Stone Librande, *One-Page Designs*, GDC 2010, and *Simulating a City, One Page at a Time*, GDC 2013: one central image, white space, callouts, print large, date every sheet, make something people want on the wall. On SimCity the sheets caught flawed systems early, as X-002 did with the match length.
- Ian Schreiber, *The Four One-Page Design Docs You Need*, GDC 2025: vision, pillars, loops, resource flow.
- US National CAD Standard sheet conventions (title block, sheet types, reference bubbles, revision clouds).
- LEGO building instructions as LPub3D (github.com/trevorsandy/lpub3d) models them: the step image, the parts list, callouts, the bill of materials.
- rough.js (github.com/rough-stuff/rough, MIT), the pencil hand on X-001, vendored in `vendor/`.
