# Inventory of styled surfaces — audit every row when the look changes

The look (DECISIONS.md): Diablo II × Warcraft III × The Lord of the Rings, Halloween lean, Madness flash-animation aesthetic: flat shapes, thick black lines, tight dark palette, snappy stepped motion, no faces.
Layers: **glass** (the Warcraft frame of the document: gold-lined glass panels, tooltips, the rail) · **ink** (every drawn thing) · **console** (the stock Warcraft III in-game chrome inside the screens, kept as the game's own).

| Surface | Where | Layer | Status 2026-10-17 |
|---|---|---|---|
| The cover | `index.html` #hero | glass | pass |
| The living card (the province at night) | #scene | ink | pass (the reference piece) |
| The parchment map | #province `.map` | ink on paper | pass (same drawing as the card) |
| The gate figure | #dusk `.gate-fig` | ink | pass |
| The three event dioramas | #clock-panel `.dioramas` | ink | pass |
| The ritual and night-13 dioramas | #wild `.dioramas` | ink | pass |
| The relief diorama | #wild `.diorama` | ink | pass (2026-10-17) |
| The nights strip | #clock-panel `.nights` | glass | pass |
| The plot command card (on the page) | #town `.cmd` | glass | pass |
| The subsection heads and the spine grid | `.subhead`, `.spine` (#town) | glass | pass (2026-10-17, new) |
| The screens: the worlds (7) | `.shot .world svg.w` | ink | pass (2026-10-17) |
| The screens: the fire scene (2) | `.shot .world.camp` | ink | **restyled 2026-10-17** (was soft gradients) |
| The screens: the Lua frames (host panel, charges, living windows, forge, market) | `.shot .lframe`, `.charge`, `.fbtn`, `.dial`, `.ready` | ink | **restyled 2026-10-17** (was glossy WC3-black; the owner: clashes) |
| The screens: the console and tooltips | `.shot .console`, `.gtip` | console | pass by rule (the game's own chrome) |
| The glass panels, rail, tooltips of the page | `warglass_ds.css` | glass | pass |
| The heroes' cards, the laws, the council rows | #captains, #laws, #council | glass | pass |
