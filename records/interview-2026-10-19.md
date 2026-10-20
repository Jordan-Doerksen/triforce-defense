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

Done for the clock: 1.4 amended; the page's lead, the length buttons, the readout and the night tooltips (`gdd.js` computes the per-night lengths: 58:30); the cover's nights tooltip; "hard mode" renamed the long night wherever the page said it; a clock diorama in the locked ink (`#clock-panel .clock-dio`), added to `design/INVENTORY.md`. The look did not change, so no style audit. Committed on the owner's yes.

## 2 · The fire's timers

| Question | Rank | Options | Verdict | Note |
|---|---|---|---|---|
| The wall sealed the fire on Ready with no clocks (one button per town in slot order, the host's three settings in view of all, the roll shown, the first day on three Readys). The wiki's 4.2 has a short timer per pick and the screen a ten-second countdown with a host skip. What happens when one of the three never presses Ready? | low; sealed by the owner's interview of 19 Oct | **A** nothing, the fire waits; an idle friend is a Discord problem, written down · B the host may begin after a long idle, [5:00] in config (a clock back, hidden; a CR on S-101) · C keep the wiki's short timers | **A** | Pushback given: Ready with no skip means one friend who tabs out holds all three; the owner rules it a social fix and no timer comes back "to be safe". |

Done for the fire: 4.2 and 4.3 amended (Ready, no clocks; three settings: the length, the dial's two notches normal and hard, the boss); the page's fire cards, both screens (the Length and the boss rows, Ready in place of "Begin the first day" and the countdown), the "what this screen assumes" lists, the still-unsealed chips; a fire-in-four-steps diorama in the locked ink (`#fire .fire-dio`), added to `design/INVENTORY.md`. Committed on the owner's yes.

## 3 · Three victories

| Question | Rank | Options | Verdict | Note |
|---|---|---|---|---|
| Three victories go on the wiki (the players kill the boss; the King's army kills him 3:00 into night 13; the rituals broken any day before). The rituals' victory ends the match before night 13, so the boss chosen at the fire is never met. Keep that? | medium; sealed on W-102 the same day | **A** keep it: breaking the rituals denies the boss, his herald was met all match · B the third ritual brings night 13 forward, the boss alone (a CR on W-102) | **A** | Pushback given: the biggest model in the map is never seen by the group that played best; the owner: that is the reward. |

Done for the victories: 1.3 reconciled, 9.4 and 9.5 amended (no dawn of its own; four last screens at the fire); the cover's tile, the wild's three victory cards and the loss, the hill's card, the night-13 diorama and tooltip, the relief card; a four-last-screens diorama (`#wild .ends-dio`), added to `design/INVENTORY.md`. Committed on the owner's yes.

## 4 · The boss from three

| Question | Rank | Options | Verdict | Note |
|---|---|---|---|---|
| The boss from three goes on the wiki with his herald "met all match". On normal, 7.5 draws three of four events on nights 3, 6 and 9, so the herald's event can be the one left out. How does the herald get met? | medium; the boss sealed 19 Oct, the draw sealed 17 Oct | **A** the herald leads night 12, the full-strength night; 3, 6, 9 stay a free draw · B the herald's event is always among 3, 6, 9 · C keep the pure draw; "met all match" holds only on hard | **A** | A contradiction between two sealed rules, not a new idea: 7.5's draw and the herald's "all match". |

Done for the boss: 9.4 and 7.5 amended; the night-13 diorama and the rituals' buttons, the clock panel's draw paragraph and the night-12 tooltip; a three-bosses diorama (`#wild .boss-dio`), added to `design/INVENTORY.md`. Committed on the owner's yes.

## 5 · The horde onto chapters 7 and 9

| Question | Rank | Options | Verdict | Note |
|---|---|---|---|---|
| No design question: every line of `docs/HORDE.md` is sealed by the owner's interview of 19 Oct, and the owner named the destination (chapters 7 and 9). The agent's call (OWN-05): the 19 Oct rows become decisions 7.6, 7.7 and 7.8, with 7.1 and 9.3 amended, and the page gets one new subsection under the nights. | low | — | built, shown for the commit | Checked for contradictions before building: the burrow and the insurgents are both inside-the-walls events with different answers (a structure to break; casters to kill); the Aviary still answers ground at the gate on normal, so it is not a dead plot. Neither needed a ruling. |

Done for the horde: 7.1 and 9.3 amended; 7.6, 7.7, 7.8 new; the undead-air row sealed; the page's chapter 7 (the pool of four, the burrow diorama, the horde subsection with the roll diorama, the table, normal and hard, the four heroes' cards), chapter 9 (the lieutenants as the event heroes), the nights strip's add-night tooltips; rows in `design/INVENTORY.md`.
