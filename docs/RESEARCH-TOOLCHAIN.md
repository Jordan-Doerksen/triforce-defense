# Toolchain recon — can an agent drive the whole build?

**Asked 2026-10-17:** is there a Warcraft III rebuild (the owner recalled "the Rust one") that could be the platform, so an agent builds and runs the whole map without a human at the World Editor?

## What exists (GitHub, searched 2026-10-17)

| Project | What it is | Language · licence | Runs the game? | Edits maps headlessly? | Notes |
|---|---|---|---|---|---|
| `Retera/WarsmashModEngine` (577★) | An emulation engine for Warcraft III: loads your own game assets, runs `.w3x` maps from the command line | Java (LibGDX) · AGPL-3.0 | **Yes, partly.** JASS parser; patches 1.22–1.32 only; no 1.33+ models; no Reforged voices; lighting memory leak; cliffs imperfect | — | The 2022 cease-and-desist story is denied in its README. **Lua is not mentioned.** |
| `corepunch/open-realm` (347★) | A C reimplementation that loads original MPQ assets; Warcraft III is its primary target; JASS, maps, campaign flow, FDF UI listed | C · MIT | **Yes, partly.** Campaign maps load; custom-map support not stated; Lua only for its WoW side | — | Linux/macOS first; the retail CASC data of Reforged is not what it reads |
| `stijnherfst/HiveWE` (483★) | An open-source World Editor: terrain, object editor, pathing, heightmap import | C++ (Qt) · AGPL-3.0 | No | **No CLI.** GUI only; no trigger editor; Windows build | The editor an agent cannot drive |
| `Drake53/War3Net` (167★) | A .NET toolkit: parse/serialise every `war3map.*` file, MPQ, BLP, SLK; "build complete maps programmatically, including script generation and asset packaging" | C# · MIT | No | **Yes.** The only tool here that writes a whole `.w3x` from code | CLI "coming soon"; JASS→Lua transpiler exists |
| `ChiefOfGxBxL/WC3MapTranslator` (122★) | `war3map.*` ⇄ JSON (terrain, units, doodads, objects, regions, cameras, sounds, strings) | TypeScript · MIT | No | **Yes**, for the data files; no script | Pairs with a Lua script written by hand |
| `cipherxof/wc3-ts-template` + `w3ts` (67★ / 87★) | TypeScript-to-Lua map scripting with typed natives | TypeScript · MIT | No | Script only | The scripting half |
| `ceres-wc3/ceres` (35★, archived) | A Rust build tool for Lua maps | Rust | No | Script only | **This is the "Rust" one: a build tool, not an engine.** Archived. |
| `wurstscript/WurstScript` (249★) | A language and toolkit for maps | Java · open | No | Script + object data | Mature; not Lua |

**There is no Rust rebuild of Warcraft III.** The Rust project in this space was Ceres, a map build tool, now archived. The two engines that exist are Java (Warsmash) and C (OpenRealm); both run JASS, neither states Lua support, and both lag the live Reforged client the group actually plays on.

## Viability of "an engine as the platform"

- **The group plays Reforged.** Whatever an agent builds must end as a `.w3x` the live client runs. A rebuild engine is at most a test rig; it is never the delivery target. Warsmash stops at patch 1.32 and OpenRealm reads classic MPQs, so neither can even promise that a map which runs there runs on 1.36+.
- **Lua first is a law (constraints).** Both engines run JASS. A Lua map cannot be tested on either today.
- **The frames law (4.1).** The war council is Lua `BlzCreateFrame` + FDF. OpenRealm lists FDF UI; Warsmash does not; neither claims the frame natives. The one feature that most needs a test rig is the one no rig has.
- **Licence.** Warsmash and HiveWE are AGPL; fine to use as tools, a weight if their code is ever embedded.

Verdict: **not viable as the platform.** Viable, later, as a smoke test for JASS-level logic only, which this map does not use.

## What an agent can drive today

The practical split: **an agent writes everything that is text; a human presses two buttons.**

1. **The map as a folder, not a binary.** Keep `war3map.w3i`, `.w3e` (terrain), `.doo`/`.w3u`/`.w3t`/… (units, doodads, object data), `.w3r`, `.w3c`, `.wts` as **JSON** in the repo via WC3MapTranslator, and the script as **TypeScript (w3ts) compiled to `war3map.lua`**. FDF/TOC files are plain text. Every one of these an agent can write, diff, review and regenerate.
2. **One build command** (Node): JSON → `war3map.*` + compiled Lua + imports → `.w3x` (MPQ), with War3Net or the translator's own packer. CI can run it; an agent can run it in a cloud session and commit the artefact's hash.
3. **The human's two buttons:** open the `.w3x` in Reforged (Test Map), and, for terrain beauty passes, open it in the World Editor or HiveWE and save back. Terrain *placement* (plots, gates, sites, blight, the three towns' walls) is data an agent writes; terrain *art* (cliff sculpting, doodad dressing, the fire scene) is a human pass. Each human pass is re-translated to JSON and committed, so the agent never loses the ground truth.
4. **Testing without the client:** unit tests on the Lua/TypeScript logic (wave tables, the clock, the garrison, the event pool, sync of the council's settings) under a native-stubbed harness; this is where the agent earns its keep. A Warsmash smoke test is an option only if the map ever has JASS logic, which it does not.

Recommended Phase 1 deliverable, unchanged by this recon: the war council prototype, built as (1)+(2), tested by (4), confirmed by one human press of Test Map.
