# Sources — the design document's citations

Sister document to `design/index.html`. The page carries no citations; they live here so the page keeps
its room. One section per chapter, plus one for the look.

## § 0 — The look (the site itself)

- Warcraft III's own UI is the reference: the Human steel-and-gold frames, gold-titled tooltips with a sky-blue cost line, the day/night clock. Hand-built in CSS; nothing is copied from the game.
- Studied before building (owner rule: search GitHub first): `TheOrcDev/warcraftcn-ui` (MIT, ~716 stars; RTS-styled components on shadcn/Tailwind tokens, not drop-in CSS) and `themesberg/glass-ui` (glassmorphism recipe: translucent fill, backdrop blur, 1px edge, inset highlight). The recipe was adopted; no code was taken from either.
- Glass fallbacks: `@supports`-free, with `prefers-reduced-transparency` dropping the blur to a solid fill.

## § I — The One Sentence (Decisions 1.1 · 1.2 · 1.5)

- Warcraft III: Reign of Chaos, Human campaign chapter 5, *March of the Scourge* — hold Hearthglen until Uther arrives. https://warcraft.wiki.gg/wiki/March_of_the_Scourge_(WC3_Human)
- `DECISIONS.md` — Decision 1.1 (engine, the three captains), Decision 1.2 (one province, three towns, the overrun north), Decision 1.5 (the hill, the valley, the forest)
- `records/council-2026-10-15-shape.md` — the seat verdicts behind the three seals
- Level-design canon: node graph before geometry — `C:\projects\reference\game-design-canon` (RTS / strategy, Warcraft 3 campaign)
- Co-op defence maps to study at the toolchain recon (not yet read): Legion TD, Castle Fight, Hero Siege, Helm's Deep variants
- The retired vellum brief's Plates II and III (2026-10-16) keep their citations in `design/_retired/SOURCES-vellum.md`
