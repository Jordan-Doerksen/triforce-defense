# Open questions — 2026-10-16

The Open Questions table in DECISIONS.md, worked one at a time in dependency order (GATE-15).
Each answer is the owner's. Status: CLOSED 2026-10-16 — the owner said yes and the answers are in DECISIONS.md (2.1 amended, 2.7, 3.3, the Open Questions table).

## Design log

| # | Rank | Question | Options | Answer |
|---|---|---|---|---|
| 1 | low | Does the Templar stay the third T3? (2.1 sealed it; the row asked to confirm) | Templar is T3 · Templar as flair, stock third T3 | **Templar is T3.** Knight (move), Siege Engine (break), Templar (hold). |
| 2 | medium | Which T3 does each town's captain get? Research: Plate I distances (architect, ±10%): hill gate ≈130 and forest gate ≈120 from the nearest ritual, valley ≈260 from all; the valley is the only town with two safe roads; since 1.4's amendment, night reinforcement uses the safe roads. From memory: Knights fastest Human melee, Siege Engine slow. | Hill Siege / valley Knights / forest Templars · hill Siege / valley Templars / forest Knights (the recorded instinct) · hill Templars / valley Knights / forest Siege | **Hill = Siege Engine, valley = Knights, forest = Templars.** |
| 3 | high | What hero does each captain have? Research (memory): *March of the Scourge* is a Paladin's mission; stock Human heroes are Paladin, Archmage, Mountain King, Blood Mage; the Archmage's Mass Teleport bypasses the road graph. | One fixed hero per town · pick one of the four · a custom commander per town | **A custom commander per town.** Three custom heroes, each kit built for its town's role. New open item: the three commanders' kits. |
| 4 | low | How do the remaining rows get answered? | Route each to its plate · answer them here | **Route each to its plate.** Commanders' kits → Plate III council; plot count and menus → Plate IV council; ritual mechanics → Plate V council; night count, day length, buff values → the council's defaults until the greybox test. |
| — | agent (OWN-05) | Undead air (the table assigns it to the agent) | — | **Light and late.** No fliers nights 1–3; from night 4 a small flying group of at most one fifth of a wave; the boss night may bring one large flier. Values in `config/` (`air.first_night`, `air.max_share`). Reason: no player air T3 (2.1), so Riflemen and the gate's two tower slots must be enough; air ignores the chokepoint graph, so it stays a minority. The flier type (gargoyles) is from memory. |
