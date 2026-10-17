# The design document

`index.html` is the living design document: one scrolling site, every sealed decision in `../DECISIONS.md`, read often.
Open it in a browser (it loads three Google fonts; offline it falls back to Georgia and still reads). Desktop only, by the owner's word.

The look is a Warcraft III Human command screen: steel-blue night sky with stars and embers, gold-framed glass panels (backdrop blur over the moving sky), the parchment province map as an inset, gold-titled Warcraft tooltips, and a day/night clock in the top bar that turns the whole page from night to day (Decision 1.4, made visible).

- `warglass_tokens.css` — every colour and font, the one token file (GAME-07). Night values on `:root`; the day values under `:root[data-day]`. Change a colour here.
- `warglass_ds.css` — the skin: the sky, the glass, the rail, the map's vocabulary, the gate, the nights strip, the rituals, the council, the tooltip. Respects reduced motion and reduced transparency. Its one raw colour is the map mottling's tint inside a data-URI filter, which cannot read a variable.
- `gdd.js` — the sky canvas, the clock, the rail, the towns' tabs tied to the map, the nights slider, the rituals and the boss bar, the council filter, the tooltip.
- `mockups.html` — nine in-game screens the sealed decisions imply (the war council host and captain views, a plot's card, the living window, the gate, the blacksmith, the market, the dusk tell, the captain), each with the verdict it depicts. Drawn as the Warcraft III console with the Lua frames on top; not the engine.
- `shots/site.png` — one full-page screenshot, retaken when the site changes.
- `SOURCES.md` — citations, one section per chapter; never on the page itself.
- `_retired/` — earlier attempts, kept for the record (the dispatch slide, then the vellum plates brief).

Sections, in order: the one sentence · the province (map + towns) · the clock · the two armies · the three captains · the town · the wild · the laws · open questions · the build · the council.
A section is written only from sealed decisions; open questions are listed as open, and illustrative content (the plot menu) says so.
