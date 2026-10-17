# Changelog

Phase log for triforce-defense. Newest first. Group by chunk/milestone; keep entries
concrete (what changed, what it proves), with absolute dates (YYYY-MM-DD).
Mirrors the Build Timeline in `DECISIONS.md`.

## Unreleased
- …

## 2026-10-17 — The first day's work in subsections; the relief's standards
- "The first day's work" was one wall of cards (owner: "a complete mess"). It is now five numbered subsections under thin gold heads: I what stands on the first day (the pre-built spine as a four-tile strip, the site ladder, the hall tiers) · II the plots, six choices among seven (what a plot can become, the plot's card) · III the forge and the market · IV every building is a scene · V the screens. The plot card's caption had been caught inside the card's grid and wrapped in one column; freed.
- The relief diorama's standards now rise along the ridge by fading in, one after another (the scale animation had fought the positioning transform); the dawn ground is the lighter green.

## 2026-10-17 — The council's ten rulings
- 9.4 night 13 holdable by scaling; 5.4 shared XP; 1.4 the cycle set from the walk (test 6 min); 6.3 the pre-built spine and six plots for seven, Mortar Teams for all; 2.6 every Offensive building feeds the garrison; 9.1 siege never impossible alone, gifting; The look governs the paper and the frames; 2.7 defeat (breach, sacking, the overrun village, the marching redirected wave, revive at the hall); 6.7 repair without a bill; 4.2 picks in slot order; 9.5 the relief, drawn. Research: `docs/RESEARCH-PACING.md`.

## 2026-10-17 — The style audit rule, the first audit, the council's inventory review
- `CLAUDE.md`: the standing rules for every session, chief among them the style audit rule (a change to the look is audited against every row of `design/INVENTORY.md`, never patched one surface at a time). `design/INVENTORY.md` lists every styled surface and its layer.
- `records/style-audit-2026-10-17.md`: the first audit. The screens' Lua frames (host panel, charges, dial, ready, living windows, forge, market) and the fire scene failed the locked look and were restyled flat with thick ink and hard shadows. A scoping slip in `screens.css` that had dropped several rules' `.shot` prefix is repaired.
- `records/council-2026-10-17-inventory.md`: the council ran against the whole game as three independent seats. Three agreed findings, ten questions for the owner.

## 2026-10-17 — The screens' worlds, inked
- The grey placeholder boxes inside the seven in-game screens are replaced by drawn worlds in the map's ink: a castle with towers and a flag, a timber mill with its wheel and log piles, a smithy with anvil, sparks and chimney smoke, market stalls with awnings, the wall with its gate and scout tower, plots as gold rings on the ground, footmen, peasants that walk, and the Bombardier as a bearded dwarf behind a mortar. Owner: "I have no idea what I'm looking at if I'm not literally me building a WC3 map."
- Fixed: the screens' stylesheet had lost its colour variables to a scoping slip, which left the console transparent.

## 2026-10-17 — Chapter 9: the rituals and the boss
- 9.1 shielded obelisks in destroyed villages, impenetrable bases; 9.2 the bell and escalating packs; 9.3 three lieutenants (the Rotting Brute, the Spider Lord, the Lich), each blunting the town nearest its ritual and removed by breaking it; 9.4 night 13 three-pronged, the boss on the valley. Two dioramas in the wild section; the ritual buttons now remove lieutenants.

## 2026-10-17 — The event pool, drawn
- Decisions 7.2–7.5: the evil fog (wave buffs and a vision cut, scaling by event night), the air raid (gargoyles over the wall at the farms), the insurgents (cultists at an authored graveyard, skeletons every 20 s), the draw (each once on 3/6/9, any on 12). Three animated dioramas in the nights section, in the card's ink.

## 2026-10-17 — Chapter 8: the heroes
- After a buildability audit (every ability named against its stock base; five headaches redacted): kit shape 2 actives + aura + Attribute Bonus + ultimate; the Bombardier (Mortar Team), the Marshal (Garithos), the Prelate (Arthas). Stock models only, campaign models included, joins the constraints. Also sealed today: repair (6.7), the fire scene (4.4), no seat swapping (4.2), scout towers behind the wall (2.4). Toolchain recon in `docs/RESEARCH-TOOLCHAIN.md`. Mockups in `design/mockups.html`.

## 2026-10-17 — The interview: chapters 4–7
- `records/interview-2026-10-17.md`: fifteen verdicts, one question at a time. Sealed in `DECISIONS.md`: Chapter 4 the war council (frames, seats, the host's two settings, the war-table hall); Chapter 5 the captains (one fixed hero per town, cap 20; hill Siege / valley Knight / forest Templar; armour / speed / damage leans); Chapter 6 the living town (five peasants per site, hall tiers, six plots of nine, six blacksmith tiers, set pieces in view, the market by tier); Chapter 7 event nights 3, 6, 9, 12 from a pool.
- The site: the notebook becomes the war council panel; towns, captains, town, clock, open questions, council and change log updated; event nights marked on the strip.

## 2026-10-16 — The brief becomes a site (owner: not cards like a deck)
- `design/index.html` redone as one scrolling design document in a Warcraft III Human command-screen look on glass panels: steel-blue sky with stars and embers, gold-framed glass, the parchment map as an inset, gold-titled tooltips, and a day/night clock that turns the page from night to day. Every sealed decision in chapters 1–3 is on it, plus the laws, the open questions, the build and the council's verdicts.
- Dynamic parts: the clock (remembered per viewer), map towns tied to tabs, a nights slider, rituals that weaken the boss bar, a council filter, Warcraft-style tooltips on hover and focus.
- Tokens move to `design/warglass_tokens.css`, skin to `design/warglass_ds.css`, script to `design/gdd.js`. The vellum plates brief, its tokens, skin, script and screenshot move to `design/_retired/`.
- Desktop only by the owner's word; the phone layout is not maintained. Screenshot `design/shots/site.png` (headless Chromium, no console errors).

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

## 2026-10-16 — The owner's ideas dump
- `records/owner-notes-2026-10-16.md`: thirteen items as said, with status. Sealed: 13 nights (Decision 1.4 amended; a hard mode of 26 planned) and a setup phase as a non-negotiable. Ten new open questions. Three options for the setup phase after a GitHub/Hive search (A: Lua war-council frames, recommended; B: dialogs; C: in-world circles).
- The site: a Notebook section, the setup-phase options, the clock's mode buttons (13 / 26), the new law, the open questions.

## 2026-10-17 — The page in the player's order, the screens inline, a cover that is a place
- `design/index.html` reordered as a match is met: cover · the one sentence · the fire · the province · your captain · the first day's work · dusk · the nights · the wild · the back matter. The nine mockup screens now sit inline at their moments, one shown at a time per section (`design/screens.css`, scoped under `.shot`); the standalone mockups page retires to `_retired/`.
- The cover is a drawn night landscape of the province (the ridge west, the forest east, three town lights, the river to the lake, the blighted north with the waves coming down), the verse between leaf ornaments, and two buttons; the clock turns it to day.

## 2026-10-17 — The look, the clean cover, the living card
- `DECISIONS.md` gains "The look": Diablo II × Warcraft III × The Lord of the Rings, a Halloween lean, the Madness flash-animation aesthetic.
- The cover is text on glass again (crest, title, the one sentence, the verse, two buttons, four tiles). Under it, a living card: the province from above in the parchment map's layout, inked flat (the ridge down the west, the thick forest east, the river through the hill town over the falls and under the bridge into the lake that splits the valley's wall; three towns drawn differently: a keep on the rock, round walls on the lake, a palisade in the trees). The horde comes down the three short roads from the blighted north as purple blips in uneven packs and pops at the gates; the towers answer; cultists sway at three obelisks; a pumpkin field by the valley's farms, a scarecrow by the hill, bats over the forest, a ghost in the graveyard, lightning now and then. Always night; reduced motion freezes it. The owner's note: no symmetry, a map not a diorama.

## 2026-10-17 — Continuity pass: one drawing, twice
- The province section's parchment map is now the same inked drawing as the living card, rendered on paper by day: the night-only layers (horde, shots, moon, bats, ghost, fog, lightning, glows) are dropped and the cartography added (place names, a compass rose, the cartouche, a double neatline). The towns stay clickable. The old thin-line map and its `c-*` vocabulary retire.
- The gate diagram is redrawn in the same ink: the wall, the two scout towers behind it, the arch, one pumpkin, the repair crew at its foot. The map goes full width in its section.
