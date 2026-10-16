# Council record — 2026-10-16 — Plate II, The Clock

Status: CLOSED 2026-10-16. Questions answered; the owner said yes and Decision 1.4 is amended in DECISIONS.md. Run with the kit command `/design-first:council` (kit 0.1.39), from a session
rooted at `C:\projects`. DECISIONS.md is not changed until the owner says yes.

## The pitch

Plate II of the brief, "The Clock" — Decision 1.4. Elements:
- E1 Day/night is the wave clock: waves come at night only.
- E2 A match is N nights (~12 nights, ~35–40 min, tunable).
- E3 Undead take a large debuff by day.
- E4 Undead take a large buff on blight.
- E5 Rituals and undead bases sit on blight.
- E6 The map teaches the push window (push north in daylight) with no rule text.
- E7 The night buff has a visible tell on the unit (Decision 1.4's change rule).
- E8 Plate II itself: one brief plate in Plate I's skin.

## Seats that returned a table

| Hat | Seat (agent file) | Verdict line |
|---|---|---|
| Creative Director | council-spark | "It lands. The clock puts a price on the short road." / "Not yet. Eleven nights have the same shape. The only beat that reads a daylight push is the last night. Nothing on screen shows how many nights are left." |
| Game Designer | council-systems-pacing | "The clock fits the loop (night is hold, day is move). But at about 188 s a cycle with two stacking 'large' modifiers, the daylight push is short (about 50 s of fight, assuming a 25 s walk each way) and barely weaker than baseline at the rituals." |
| Game Designer (map) | council-level-architect | "Keep the clock! Your night-wave arrows already sit on the short roads, so one switch turns Plate I's loop into a line at night with no new node. Rule on three gaps first: how E3 and E4 stack at the rituals, what E5's 'undead bases' are, and the 'night buff' that Decision 1.4's rule names and its answer does not." |
| QA | council-skeptic | "APPROVE Plate II as a one-session, static plate. REDACT the printed numbers, the undead bases and the look of the tell. ADD four small clarifications. Defer blight from the first build slice." |
| Onboarding | council-player-guide | "Approve the clock and keep the shared road in Plate I … But E6 names no mechanism, E3 has no tell, and a dusk death off-screen still teaches nothing." |

The brief to each seat asked for one closing element table (APPROVE / REDACT / ADD / FLAVOUR) so
that every seat returns a verdict table (GAME-21); only council-skeptic's own file defines one.

### council-spark (Creative Director)

| Element | Verdict | Reason |
|---|---|---|
| E1 Day/night is the wave clock | APPROVE | The alternation is built in and comes in two kinds: danger chosen by day, danger imposed by night (rule 6). |
| E2 N nights (~12) | APPROVE | A bounded match shows its end (rules 3, 12). The number and the minutes belong to Systems. |
| E3 Day debuff | APPROVE | It enforces the push window in the system, not in text (`01` rule 6). |
| E4 Blight buff | APPROVE | With E3, the north at night becomes the worst ground on the map, which prices the short road. |
| E5 Rituals and bases on blight | APPROVE | The push targets sit where the window is narrowest. |
| E6 No rule text | APPROVE | `01` rule 5. It holds only if the day state is visible (ADD row below). |
| E7 Visible tell on the unit | APPROVE | It makes a death at dusk a choice the captain made. It needs a name for what it marks (ADD row below). |
| E8 Plate II | APPROVE | Same skin, one visual, few paragraphs. The visual shows both clocks, and its options go side by side first (GATE-14). |
| The blight moves | ADD | Gives each night a residue that every later day reads. Needs a CR against 1.4 (P1). |
| Nights left on screen | ADD | Rules 3 and 4: nothing shows the slow layer now. P2 is one form. |
| A tell for the daylight state, and the term | ADD | E6 teaches through the day debuff, which has no tell. The change rule says "night buff", but the chosen answer has only a day debuff and a blight buff. |
| The King's army arrives at the last dawn | ADD | Relief comes at a dawn, so eleven dawns rehearse the one that pays the promise. |
| The gate keeps the count | FLAVOUR | An in-world form of the nights-left row. The board line is the cheap form. |
| A dusk bell | FLAVOUR | Warns a captain who is mid-fight before the day debuff lifts and E7's tell appears. |

Biggest hole (Half B, time): a night leaves nothing that the next day reads, so the only beat that
collects eleven days of work is the last night. Title drafts for the owner: A "The dead are slow in
daylight." · B "Twelve nights, and the north by day." · C "Go north in daylight." (a callback to
Plate I's lead).

### council-systems-pacing (Game Designer)

| Element | Verdict | Reason |
|---|---|---|
| E1 Day/night is the wave clock | APPROVE | Night = hold and day = move gives a tension/rest split. A fixed dawn gives a visible end (Lock Arena, Open Exit, memory). |
| E2 ~12 nights, ~35–40 min | APPROVE | Keep it tunable. Total minutes must be derived from phases and nights, and it exceeds canon's longest timed run (30 min). |
| E3 Day debuff | APPROVE | It is a good lever. "Large" needs a number: lead is 0.60 on damage dealt. |
| E4 Blight buff | REDACT | As written, it stacks with E3 and cancels the push at the rituals (0.98 in the example). Cap day × blight ≤ 0.80, or apply blight at night only. |
| E5 Rituals and bases on blight | APPROVE | It gives the push a place. Authored terrain, so it fits the Non-Negotiables. |
| E6 Map teaches the push window | ADD | The goal is sound but has no mechanism. Add a day-1 reward on the push route and a dusk ramp. |
| E7 Visible tell on the unit | APPROVE | The Change Rule binds it. Use Telegraphed intent; Doom Eternal sped up its tells for readability (sourced). It must show the transition, not only the state. |
| E8 Plate II format | APPROVE | Same skin as Plate I (4 paragraphs, 3 seals). The SVG should show the cycle strip and the four-cell table. Label numbers "defaults" because the open question is still Open. |
| A1 Four-cell state table in config | ADD | One number per cell, with the ≤ 0.80 assert. |
| A2 Dusk horn and 15 s buff ramp | ADD | A death after the horn is then explicable. No camera move. |
| A3 Day-1 grace and staged reveal | ADD | +60 s on day 1. Teach one clock layer per night. |
| A4 Spike schedule and dawn preview | ADD | Nights 3, 6, 9 and boss 12. Night 2 stresses the gate first. |
| A5 Reward map | ADD | Dawn bounty ← holding. Loot ← pushing. Ritual ← siege. Cap 6 items per player. |
| A6 Stall cost | ADD | Optional `pressure.boss_growth_per_standing_ritual`, default off. Owner's call. |
| A7 Stock-rule check (from memory) | ADD | Stock creeps sleep at night, which would invert the window; decide on the night vision cut. |
| A8 Blight retreats when a ritual falls (from memory) | ADD | A visible map-state reward for each ritual. Ritual mechanics are still open. |

Lead numbers (none are in the files; all tunable): cycle 188 s = dawn 8 / day 92 / dusk 15 / night 73;
12 nights = 37.6 min; four-cell strength table day 0.60, night 1.15, blight 1.25 on damage dealt
only (day off blight 0.60, day on blight 0.75, night off blight 1.15, night on blight 1.44); assert
day × blight ≤ 0.80. Fewer nights buy a longer day: 10 nights → 110 s day.

### council-level-architect (Game Designer, map)

| Element | Verdict | Reason |
|---|---|---|
| E1 Day/night is the wave clock | APPROVE | One switch makes a night line and a day loop. The wave arrows are already on the gate mouths, so it adds no node. |
| E2 N nights, about 12 | APPROVE | Config only (DES-04). The cycle is 2.9–3.3 min, and the day share is unset. Set N after the greybox walk. |
| E3 Undead debuff by day | APPROVE | It creates the window. State whether it applies to units only or also to structures such as the obelisk. |
| E4 Undead buff on blight | APPROVE | Approved with the stacking checks (risk 1). Blight is a place modifier, so the ground tells it. |
| E5 Rituals and undead bases on blight | REDACT (part) | Keep "rituals on blight"; it is on Plate I. Cut "undead bases" until one names its edge (1.2). Recommends option A (bases = the ritual compounds). |
| E6 Map teaches the push window | APPROVE (goal) | The layout shows where, not when. Sequence, tell and sky teach when. Test it with readout C. |
| E7 Visible tell on the unit | APPROVE | The 1.4 rule names a night buff the answer does not state. Pick option 1 or 2 by Change Request. |
| E8 Plate II in Plate I's skin | APPROVE | Draw a two-state schematic of the same 7 nodes (night line, day loop) plus a 2×2 table. Do not copy or redraw Plate I. |
| Stacking table (time × blight) | ADD | It sets the net strength at the rituals, and Win B depends on it. |
| Edge weights per edge | ADD | The wild is slower than the safe road for 2 of 3 pairs on Plate I. |
| Dusk rule: may the field army re-enter its gate at night? | ADD | The gate mouth is where the wave and the returning army meet. |
| Match start and relief timing | ADD | Dawn or dusk start, and whether relief comes at dawn after night N, are unwritten. |
| Safe-road entry into the walls | ADD | Plate I draws one gate per town and no opening for the safe roads. |
| Lesson camp per short road | ADD (only if readout C fails) | It is the cheapest fix for a layout that cannot show "when". |

Greybox test proposed: stock units, a 180 s cycle with a 90 s day, two trigger multipliers; readouts
A (stopwatch: gate→ritual round trip vs the day), B (the 2×2 strength matrix), C (a first-time
friend pushes north at dawn unprompted by night 3).

### council-skeptic (QA)

| # | Element | Verdict | Reason |
|---|---|---|---|
| E1 | Waves at night only | APPROVE | One trigger. It needs scripted wave spawns; see ADD-3. |
| E2 | N nights, ~12, ~35–40 min, tunable | REDACT (numbers only) | Print them as "default, open"; a wax seal on them would be false. Waves must be a curve in `config/`, not 12 hand-written rows (DES-04). |
| E3 | Large undead debuff by day | APPROVE | It acts only on units awake by day: wild camps and ritual guards. A raid rule, not a defence rule. "Large" and the stat are undecided. |
| E4 | Large undead buff on blight | APPROVE on the plate, defer in the build | Waves fight at the gates, which are not on blight, so this acts only during a push. Nothing says how it combines with E3; see ADD-2. |
| E5 | Rituals and undead bases on blight | REDACT "undead bases" | Rituals on blight: APPROVE. No decision defines a base; a destroyable base that changes the waves is a third win path and needs a CR. |
| E6 | The map teaches the push window, no rule text | FLAVOUR | A goal, not a mechanism. Make it a playtest gate. |
| E7 | Visible tell on the unit | APPROVE, REDACT the look | Do not choose the look on the plate (GATE-14); show the tell as a role. Cheapest: a unit colour tint; check it reads at night. |
| E8 | Plate II itself | APPROVE, REDACT scope | Static plate, no animation, no printed magnitudes, at most 3 seals. |
| ADD-1 | Dusk warning: stock timer window plus a sound, no camera move | ADD | The other half of "dies at dusk learns nothing". |
| ADD-2 | A rule for how the day debuff and the blight buff combine | ADD | Decide before any data-editor work. |
| ADD-3 | Wave source = scripted spawns | ADD | From memory, the stock melee AI sets its own attack timing. |
| ADD-4 | Wording fix | ADD | The Chosen Answer has a day debuff and a blight buff; the Change Rule says "night buff". Needs a Change Log row. |

True cost: the plate is one session, no new tools; the clock it presents is three new systems later
(day/night timer, a three-state modifier loop over every undead unit, a unit tell), one new asset
class (painted blight) and one undefined content class (undead bases).

### council-player-guide (Onboarding)

| Element | Verdict | Reason |
|---|---|---|
| E1 Day/night is the wave clock | APPROVE | The player learns it by watching the horde come down the road; add a dusk warning. |
| E2 N nights, ~35 to 40 min | APPROVE | About 3 minutes per cycle; an even split leaves about 90 seconds of day, so tune day 1 longer. |
| E3 Undead debuff by day | APPROVE | Right effect, but it teaches only when seen; see the day-tell row. |
| E4 Undead buff on blight | APPROVE | A WC3 player already reads blight as undead ground (memory); keep it on a different stat from E3. |
| E5 Rituals and bases on blight | APPROVE | Glowing blighted rituals make the north a goal; reveal them at minute one. |
| E6 Map teaches the push window | ADD | A claim with no mechanism; add the day-1 camp, dawn survivors and the quick road as the pull. |
| E7 Visible tell on the night buff | APPROVE | Widen it to three stops, add a ramp and an off-screen alert. |
| E8 Plate II in Plate I's skin | APPROVE | Show Plate I's map twice, day and night; the static pair is also the reduced-motion form. |
| (missing) Modifier table, 2x2 | ADD | Resolves "night buff" against the Chosen Answer; one cause per result. |
| (missing) Day tell on the unit | ADD | E3 has none; the day is when the player acts and needs proof. |
| (missing) Day-1 blight camp with loot | ADD | A safe place to try the push, close to the gate. |
| (missing) Dawn survivors visibly weaken | ADD | The first free demonstration of E3, at the gate. |
| (missing) Dusk horn, minimap ping and buff ramp | ADD | Without these a dusk death teaches nothing; no camera move. |
| (missing) Rituals revealed from minute one | ADD | A visible goal the player cannot reach yet. |
| (missing) Day-push mark on Plate II | ADD | Plate I has only the night-wave arrow; the new colour belongs in `deck_vellum_tokens.css`. |

Playtest question: after night 3, with no rules written, "When is it safe to send your army north,
and what showed you?"

## Element verdicts

| Element | Verdict | Which seats, and why |
|---|---|---|
| E1 Waves at night only | APPROVE | All five. |
| E2 ~12 nights, 35–40 min, tunable | APPROVE, numbers printed as defaults | Spark, pacing, architect, guide approve; skeptic redacts sealing the numbers while the open question stands. Pacing: derive match minutes from phase seconds. |
| E3 Day debuff | APPROVE | All five. Needs a number and a stat (pacing lead: 0.60 on damage dealt). |
| E4 Blight buff | APPROVE, conditional on the stacking rule | Pacing redacts it as written (it cancels E3 at the rituals); architect, skeptic, guide approve only with a stacking rule. → Question 1. |
| E5 Rituals on blight | APPROVE | All five. |
| E5 "undead bases" | REDACT unless defined | Architect and skeptic: no decision defines a base or its edge. → Question. |
| E6 Map teaches the push window | ADD (mechanisms) | Pacing, guide: no mechanism; skeptic: a goal, make it a playtest gate; architect: the layout shows where, not when. |
| E7 Visible tell | APPROVE; the look is chosen later from rendered options (GATE-14) | All five; skeptic redacts choosing the look on the plate. |
| E7 wording ("night buff") | ADD (Change Log row) | All five: the change rule names a night buff the chosen answer does not have. Settled by Question 1. |
| E8 Plate II | APPROVE: static, one visual, numbers as defaults, visual options rendered side by side before choosing | All five. |
| Dusk warning + buff ramp, no camera move | ADD | Pacing, skeptic, guide; spark as FLAVOUR (dusk bell). |
| Day-state tell | ADD | Spark, guide. |
| Nights left visible on screen | ADD | Spark (the slow clock has nothing on screen). |
| Relief at the last dawn; match start | ADD | Spark, architect. |
| Day-1 grace / safe introduction near the gate | ADD | Pacing, guide. |
| Rituals revealed from minute one | ADD | Guide. |
| Scripted wave spawns, not the stock melee AI | ADD (implementation; agent's call, OWN-05) | Skeptic. |
| Blight moves with the rituals | ADD (owner's call; a CR on 1.4) | Spark (each night leaves a residue); pacing (blight retreats when a ritual falls). |
| Edge weights; dusk re-entry at the gate; safe-road entry into the walls | ADD, deferred to the terrain pass | Architect. Plate I has no scale. |
| Spike schedule, reward map, stall cost | Deferred to the wave table and balance | Pacing. |
| Stock-rule checks (creeps sleep at night, night vision, blight natives) | Deferred to the toolchain recon | Pacing, skeptic, guide — all from memory. |

## Design log

| Date | Question | Answer |
|---|---|---|
| 2026-10-16 | Q1 (high). How do the day/night and blight modifiers on undead strength combine? Options: two modifiers, capped · three states, capped · day overrides blight. | **Two modifiers, capped.** A day debuff and a blight buff, both on damage dealt; night is baseline; a cap keeps day-on-blight below baseline (day × blight ≤ 0.80). 1.4's change rule becomes "the day state has a visible tell". |
| 2026-10-16 | Q2 (medium). What are the "undead bases" that 1.4 puts on blight? Options: the ritual compounds · two toll bases on the corridor · cut the words for now. | **The ritual compounds.** The three ritual sites, with acolytes and guards, are the undead bases. No new node; Plate I stays exact. |
| 2026-10-16 | Q3 (medium). How does the match show how many nights are left? Base for every option: start at dawn with a longer day 1; the King's army arrives at the dawn after the last night. Options: a board line · banners on the gates · only the relief timer. | **A board line.** "Night 5 of 12", at a screen edge, never over the gate (game UI law governs it when built). Start at dawn, longer day 1, relief at the dawn after the last night: approved with it. |
| 2026-10-16 | Q4 (high). Does the blight move during a match? Options: retreats when a ritual falls · advances each night and retreats on a fall · static. | **Retreats when a ritual falls.** Blight is authored and fixed; a destroyed ritual takes its blight with it. A night still leaves no mark on the ground; the days do. |
| 2026-10-16 | Q5 (low–medium). Which pieces teach the push window without rule text? Options (pick any): dusk warning + ramp · a day-1 camp near each gate · dawn survivors weaken · rituals visible from minute one. | **Dusk warning + ramp only.** The sky shifts, a horn sounds, the minimap pings each gate, and the day debuff fades over a ramp; no camera move. Not taken: the day-1 camps, dawn survivors weakening, rituals revealed from minute one. |

## Outcome

Approved and written into DECISIONS.md (Decision 1.4, amended 2026-10-16, on the owner's yes):
- E1 waves at night only. Start at dawn with a longer day 1; relief at the dawn after the last night.
- E2 N nights, default 12 (~35–40 min), printed as defaults; night count and day length stay Open.
- E3 + E4 as two modifiers on damage dealt, night = baseline, cap day × blight ≤ 0.80 (Q1).
- E5 rituals on blight; the undead bases are the ritual compounds (Q2).
- Blight is authored and fixed; it retreats when a ritual falls (Q4).
- E7 reworded: the day state has a visible tell on the unit; blight is told by the ground (Q1).
- Dusk warning + ramp, no camera move (Q5). Nights left as one board line (Q3).
- E8 Plate II: static, one visual, numbers as defaults, visual options rendered side by side before the owner picks (GATE-14).
- Implementation (agent's call, OWN-05): waves are scripted spawns, not the stock melee AI (skeptic ADD-3).

Not taken: day-1 camps near the gates; dawn survivors weakening; rituals revealed from minute one;
blight advancing each night; a separate night buff; toll bases.

Deferred, with the owner of each:
- Terrain pass: edge weights (architect: on Plate I the wild is slower than the safe road for hill↔valley and valley↔forest, which bears on 1.2's "fast shortcut"); whether a field army may re-enter its gate at night; how the safe roads enter the walls.
- Decision 1.2's rationale ("a real decision every time someone reinforces a friend") — with waves only at night and the wild a wave lane at night, reinforcing during a wave uses the safe road (architect). Review by CR.
- Wave table and balance: spike nights, rewards, stall cost (pacing).
- Toolchain recon: stock creeps sleeping at night, the night vision cut, blight natives — all from memory (pacing, skeptic, guide).
- The look of the tell: rendered options side by side, then the owner picks (GATE-14).
