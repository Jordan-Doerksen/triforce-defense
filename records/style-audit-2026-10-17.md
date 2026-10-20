
## Second audit, the same day (owner: the fire screens and the paper map still read different)

The owner's two findings: the setup screen "needs a redraw, not a flip with thicker borders", and the parchment map's cream ground clashes with every other dark drawing and adds nothing. Both rows failed again and were not patched: the fire world is redrawn as an inked SVG in the diorama vocabulary (the ruins, the dead tree with crows, the pines, the three standards, the fire with the relief's flames, embers in steps, the hound, the three heroes as the Bombardier, the Prelate with his banner and the mounted Marshal; the unclaimed charge a dashed shadow). The parchment render is gone: the province section shows the living card's drawing stilled, dark, with the cartography on it (names, compass, cartouche, neatline in gold on black), so it is the annotated one, not a clone. A latent bug found on the way: `screens.css` declared its own `@keyframes rise`, which overrode the skeletons' rise in the skin.

| Row | Result |
|---|---|
| The fire scene (2 screens) | redrawn |
| The chart (was the parchment map) | restyled dark |
| Every other row | re-read against "every drawing is dark ink"; pass |
