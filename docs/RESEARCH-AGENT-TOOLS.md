# Agent tooling recon — what lets Claude drive tools, apps and the build

**Asked 2026-10-21:** search GitHub for the best open-source tools that let Claude control tools, services and other apps, or help build video games. Follows `docs/RESEARCH-TOOLCHAIN.md` (2026-10-17), which covered map toolchains; this note covers what has appeared since and the general-purpose layer. Star counts as of 2026-10-21.

## 1. Warcraft III, specifically (new since the 17 Oct recon)

Five MCP servers for Warcraft III maps exist now. None existed when the toolchain recon was written. All are young (May–October 2026) and small; all are Windows-first because the game and CascLib are.

| Project | Stars | Stack · licence | What it does | Fit |
|---|---|---|---|---|
| `BenqsXd/wc3-mcp` | 6 | Python (uv, pywin32) | A **Claude Code plugin** (`/plugin marketplace add BenqsXd/wc3-mcp`). Creates maps in JASS **or Lua**; edits map info, imports, object data, GUI/JASS/Lua triggers, terrain, regions, cameras, sounds, placed units; builds `war3map.lua` the way the editor does; validates with pjass/JassHelper; **drives the World Editor and launches the game through Battle.net (`game_test`)**. Ships a `wc3-map-making` skill. Needs Reforged 3.x installed. | **Best fit.** The only one that closes the loop to the human's "two buttons" (Test Map) from the agent's side. Lua named. Alpha-grade; expect breakage. |
| `StephenSHorton/wc3-forge` | 13 | Go + Svelte (Wails), embedded MCP | A native map editor with a GUI and an MCP server sharing one session and one undo stack: units/doodads, terrain, full Object Editor (7 kinds), full Trigger Editor with GUI→Lua/JASS codegen, Convert-Map-to-Lua, Test Map. Windows releases. | Strong second. An editor a human and an agent share; the HiveWE "no CLI" gap from the 17 Oct table is closed by this. |
| `GodMephisto/wc3ctl` + `GodMephisto/wc3-mcp` | 0 / 3 | C# (.NET, self-contained) | Byte-faithful read/check/edit of `.w3x`/`.w3m`: a CLI, a Studio editor, and an MCP server (also in the MCP Registry, `.mcpb` for Claude Desktop). Bundles docs search over the WC3 references, the UI-Frame tutorial and the Ability Insight doc, with optional local RAG. | The CLI is what CI wants: `wc3ctl` in a build step. The bundled UI-Frame docs matter for the frames law (4.1). Newest of the five (October 2026). |
| `YElwiddi/warcraft-3-mcp-server` | 9 | TypeScript | Edits `.w3x`/`.w3m` files directly: place units, change object data, add GUI triggers; writes to a copy by default. | Simplest; file-only; no editor or game control. |
| `phmilk/reforged-ts-template` | 1 | TypeScript→Lua (typescript-to-lua), pnpm | The **3.0.0-era** successor to `cipherxof/wc3-ts-template`: the World Editor owns the map data, the repo owns the code, `pnpm build` appends the compiled Lua to the editor's script and packs the map, `pnpm test:map` launches the game. Under construction; libraries on npm `next`. | Replaces the `wc3-ts-template` row of the 17 Oct table once it stabilises. Watch, do not adopt yet. |

Also seen, not tools for this build: `RobinKa/warcraftsim` and `offpolicyinc/wc3env` (headless WC3 1.29 under Wine / an injected DLL, for reinforcement learning on Legacy; neither runs Reforged or Lua); `elevchyt/openwar3` (a TypeScript engine reimplementation, 15 stars, early); `PeonPing/peon-ping` (5k stars; Peon voice lines when Claude Code finishes a task; a toy, but on theme).

The 17 Oct rows still stand: `Drake53/War3Net` (167★, the .NET toolkit the GodMephisto tools likely sit on), `ChiefOfGxBxL/WC3MapTranslator` (123★), `cipherxof/w3ts` (88★), `stijnherfst/HiveWE` (486★), `Retera/WarsmashModEngine` (582★), `wurstscript/WurstScript` (250★).

## 2. Claude controlling the desktop, apps and services (general)

| Layer | Pick | Stars | Why |
|---|---|---|---|
| Directory | `punkpeye/awesome-mcp-servers` | 97k | The index. Search it before building any connector. |
| Build your own MCP server | `modelcontextprotocol/python-sdk` / `typescript-sdk`; `PrefectHQ/fastmcp` | 25k / 14k / 28k | Official SDKs; FastMCP is the fastest way to wrap a script as tools. |
| Windows desktop control | `CursorTouch/Windows-MCP` | 9.8k | Computer use on Windows via MCP: windows, clicks, typing, screenshots. The generic fallback for the World Editor when no map-specific server covers an action. |
| Windows, by element not pixel | `sbroenne/mcp-windows`; `AmrDab/clawdcursor` | 120 / 406 | UI Automation API: act on controls by name, DPI- and theme-proof. Smaller but the right idea for a dialog-heavy editor. |
| Terminal and files | `wonderwhy-er/DesktopCommanderMCP` | 10k | Shell, file search, diff edits from Claude Desktop. Claude Code already has this; Desktop does not. |
| Browser | `microsoft/playwright-mcp` (38k); `hangwin/mcp-chrome` (12.5k); `browser-use/browser-use` (119k) | | Playwright MCP for headless capture (the wiki screenshots); mcp-chrome rides the user's real Chrome. |
| GitHub | `github/github-mcp-server` | 34k | Official; already wired in cloud sessions. |
| Cross-OS sandboxed computer use | `trycua/cua` | 31k | VM sandboxes for agents on macOS/Windows/Linux, with benchmarks. Heavy; for when an agent must run the game unattended. |
| Full computer-use agents | `simular-ai/Agent-S` (12.7k); `bytedance/UI-TARS-desktop` (39k) | | Research-grade GUI agents. Not for a one-person map project. |
| Personal "does things" agent | `openclaw/openclaw` | 393k | Any OS, any platform; 5,400+ skills (`VoltAgent/awesome-openclaw-skills`). The biggest general agent on GitHub; a different runtime from Claude Code, not an add-on to it. |
| Workflow automation with MCP | `activepieces/activepieces` | 25k | ~400 MCP servers, n8n-alternative. For Discord/Battle.net-adjacent glue if the group ever wants bots. |
| 3D assets | `ahujasid/mcp-for-blender` | 32k | Blender from Claude. Irrelevant under the stock-models law unless that law moves. |

Claude Code skill and plugin frameworks that top the charts (`obra/superpowers` 303k, `anthropics/skills` 183k, `affaan-m/ECC` 286k, `mattpocock/skills` 300k) are methodology, not tool control; the design-first kit already fills that seat here.

## 3. Game engines in general (for reference, not this project)

Every mainstream engine has an MCP server now: Godot (`tugcantopaloglu/godot-mcp` 493★, 157 tools; `satelliteoflove/godot-mcp` for input injection and deterministic playtesting), Unity (`AnkleBreaker-Studio/unity-mcp-server` 522★, 268 tools), Unreal (`IvanMurzak/Unreal-MCP`), Blender (above). `rehan-remade/universal-modder` (8.6k★) is a Claude Code plugin for modding arbitrary PC games: recon, reverse engineering, generated art, in-game testing. `HermeticOrmus/claude-code-game-development` bundles 22 game plugins (Godot, Unity, Unreal). None of this changes Decision 1.1; the engine is Reforged.

## Verdict

The 17 Oct split ("an agent writes everything that is text; a human presses two buttons") is now too conservative. Two of the five WC3 MCP servers press the buttons: `BenqsXd/wc3-mcp` opens the World Editor and launches the game through Battle.net; `wc3-forge` runs Test Map from its own editor. Both are alpha and Windows-only, which matches the owner's desk, not the cloud.

Recommended, in order, for the Phase 1 build when the Programmer hat unlocks:
1. **Try `BenqsXd/wc3-mcp` as a Claude Code plugin on the owner's machine** against a scratch map: create a Lua map, add one frame, `game_test`. One session. If it holds, it is the build's hands; the war council prototype (frames + FDF) becomes an agent-driven loop with the owner watching.
2. **Keep `wc3ctl` as the CI check**: byte-faithful read and lint of the `.w3x` in a cloud session, where no game is installed.
3. **Keep the 17 Oct data layout** (map as JSON + TypeScript→Lua) as the ground truth in git regardless of which editor touches it; `reforged-ts-template` is the path to 3.0.0 for the script half once it leaves alpha.
4. **`CursorTouch/Windows-MCP` only as the fallback** for editor dialogs no map server covers.

Not recommended: OpenClaw, cua, Agent-S or UI-TARS for this project. They are general agents and sandboxes; the map needs map tools.

No decision is taken here. This is recon for the toolchain row of Open Questions; the owner picks.
