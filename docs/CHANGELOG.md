# Changelog

Phase log for triforce-defense. Newest first. Group by chunk/milestone; keep entries
concrete (what changed, what it proves), with absolute dates (YYYY-MM-DD).
Mirrors the Build Timeline in `DECISIONS.md`.

## Unreleased
- …

## 2026-10-16 — Plate III council (Decisions 2.3 and 2.7 amended)
- Five seats, a research pass on Forsaken Kingdom (Reforged patch 3.0: the Forsaken Paladin, native equipment and talents), seven owner answers. Record `records/council-2026-10-16-plate-3-two-armies.md`.
- 2.3: Barracks tiers add posts and types, quality from a Blacksmith, slow refill, seed watch, default rally at the gate, see your gate from away; terms field force and commander. 2.7: the three kits on stock bases (Engineer, Knight-Marshal, Castellan), no relocation, no Resurrection, revive at the town, 3.0 equipment and dawn talents. 3.1: loot as gear, Camp-v.

## 2026-10-16 — Open questions worked
- Templar confirmed as T3; T3 by town: hill Siege Engine, valley Knights, forest Templars (2.1 amended). Decision 2.7: a custom commander per town, kits to Plate III's council. Decision 3.3: undead air light and late (agent's call). Plots → Plate IV council; ritual mechanics → Plate V council; night values stay the council's defaults until the greybox. Log: `records/open-questions-2026-10-16.md`.

## 2026-10-16 — Plate II, The Clock (called right by the owner)
- Plate II added to `design/index.html` with the owner's pick, option C: Plate I's graph by day and by night. Kicker, title and subline (Spark's draft C), four paragraphs, three seals, `SOURCES.md` § II. The rail's Plate II link is live; the colophon now names Plates III–V as unsealed.
- The clock's svg classes moved from `design/options/options.css` into `deck_vellum_ds.css` (one vocabulary, one file); the options page screenshots byte-identical before and after.
- Checks, headless Chrome: Plate II's figure has no label overlapping another, crossing a box edge or leaving the figure, at 1400 px and 390 px, with no horizontal scroll; Plate I's map probe still returns `ok: true`. Screenshot `design/shots/plate-2.png`.

## 2026-10-16 — Plate II council (Decision 1.4 amended)
- First real convening through `/design-first:council` (kit 0.1.39): five seats, five owner questions. Record `records/council-2026-10-16-plate-2-clock.md`.
- Three candidate visuals for Plate II rendered side by side (GATE-14): `design/options/plate-2-visuals.html`, screenshot `design/shots/plate-2-options.png`. A: one day and one night with the strength grid. B: twelve nights to the relief, and the rituals. C: Plate I's graph by day and by night. Label check (headless Chrome): no label overlaps another, crosses a box edge or leaves its figure, at 1500 px and 390 px; no horizontal scroll at either width. The same check fails on a copy with option C's old label position.
- Three clock colours added to the token file (`--sky-day`, `--sky-dusk`, `--sky-night`).
- Decision 1.4 amended: two capped modifiers on damage dealt (night = baseline), the undead bases are the ritual compounds, blight retreats when a ritual falls, a dusk warning and ramp, a nights-left board line, start at dawn and relief at the dawn after the last night, scripted wave spawns.

## 2026-10-15 — Plate I map accuracy pass (Decision 1.5 amendment)
- The map is redrawn: a winding river out of the north, through the hill town, over the falls and into the valley's lake; the towns smaller and farther apart; the hill↔valley road runs down beside the falls and crosses the river at a bridge; a mountain ridge down the whole west border; a thick forest down the whole east, around the forest town. Neatline, and a bridge entry in the legend.
- Animations kept (blight, river flow, falls, lake glint, night waves); no new motion. The falls get a water bed so they read. Map colours are tokens; the map's inline colours moved to classes.
- Map probe, headless Chrome, 2026-10-15: no label overlaps another, crosses a town wall or runs off its road; the river ends inside the lake; the hill road crosses the river once, with the bridge on the crossing; each short road starts in the overrun province and ends at a gate; ridge and forest span the frame. Result `ok: true`; the same probe returned `ok: false` on a copy with the river cut short and a short road moved out of the wild. The probe is session scratch, not in the repo. Two read-only reviewers found the river short of the lake, an "only way" line that contradicted the short road, a short road outside the wild and borders short of the frame; all four fixed.
- Body text: the falls road is "the safe road" to the valley, not "the only way" — the short road through the north was always the other way.
- Screenshot `design/shots/plate-1.png`. Called accurate by the owner on 2026-10-16.
- 2026-10-16: the repo is pushed and made public on the owner's word, so a cloud session can open it.

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
