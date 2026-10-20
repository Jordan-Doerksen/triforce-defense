# Interview — 2026-10-19 — the two faces reconciled, one question at a time

Running design log of the local session that brought the wiki (`design/index.html`, `DECISIONS.md`) up to the wall's verdicts of 19 Oct (`design/v2/`, `docs/HORDE.md`). Options were offered 2–4 at a time, the recommended one first with its reason; every option carried what it gives and what it costs; the owner's pick is marked. `DECISIONS.md` was written only after each yes. Hat: Designer; the Programmer hat stays locked.

## Before the list: the merge

| Question | Rank | Options | Verdict | Note |
|---|---|---|---|---|
| The local master held eight commits of 16 Oct that GitHub never got (Plate I accurate; the Plate II and III councils on the vellum brief); origin held the wiki and the wall. How do they merge? | medium | **A** merge, the wiki wins the five conflicts, the orphaned 16 Oct details asked last · B merge and amend the orphans in now · C drop the eight commits | **A** | Of the 16 Oct verdicts, the three commanders, the T3 by town and undead air were superseded on 17 and 19 Oct; five details were never re-decided and stand in the Open Questions table. Option C would have broken SAFE-06. |

## 1 · The clock

| Question | Rank | Options | Verdict | Note |
|---|---|---|---|---|
| The wall's 4:30 cycle with growing nights (days 3:00 → 1:30, nights 1:30 → 3:00, 58:30 for thirteen) goes on the wiki. What happens to 1.4's rule that the day must hold a ritual strike with margin, when the last days are 1:30? | high; research on file, `docs/RESEARCH-PACING.md` | **A** seal the wall's clock; the strike window closes as the match goes, day 1 set from the walk · B seal the clock with a floor on the day (a change request on the wall's C-101) · C bracketed test values, the rule left unresolved | **A** | Pushback given before the ruling: a strike (the walk out, the acolytes inside the bell's window, siege on the obelisk, the walk home) does not fit in 1:30, so the clock and the rule contradicted and one had to bend. |

Done for the clock: 1.4 amended; the page's lead, the length buttons, the readout and the night tooltips (`gdd.js` computes the per-night lengths: 58:30); the cover's nights tooltip; "hard mode" renamed the long night wherever the page said it; a clock diorama in the locked ink (`#clock-panel .clock-dio`), added to `design/INVENTORY.md`. The look did not change, so no style audit.
