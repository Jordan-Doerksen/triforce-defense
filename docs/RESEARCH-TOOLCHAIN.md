# Toolchain research — Triforce-Defense

Phase 1 of the Build Timeline. What gets the agent's Lua and data into the owner's map (Decision 1.6).
Newest first. A tool is "vetted" only when its source was read at a named commit.

## wc3-mcp — vetted 2026-10-19 at `6b124f963742a204bcb53448070b42124b9607bb`

**What it is.** An MCP server plus Claude Code plugin by BenqsXd (MIT, Python 3.13, v1.17.0,
https://github.com/BenqsXd/wc3-mcp). Edits map files directly (map info, imports, object data, GUI/JASS/Lua
triggers, terrain, regions, cameras, placed units), builds `war3map.lua` the way the World Editor does, lints Lua,
drives the World Editor, and runs a map in the game (`game_test`) with probes and screenshots. Windows 10/11 and
Reforged 3.x only. A cloud session cannot run it.

**Read in a cloud session (source only, nothing executed):**
- **No network code.** No HTTP client, socket or telemetry anywhere in `src/`. `wc3_usage` writes token counts to
  a local `usage.jsonl`.
- **No dynamic code.** No `eval`/`exec`/`pickle`/base64 blobs. `ctypes` is used only for Win32 window messages.
- **Processes it starts:** `tasklist`, `taskkill`, the World Editor, the game, the Battle.net app, and pjass /
  JassHelper from the install.
- **Writes:** maps are edited as working copies under `%LOCALAPPDATA%\wc3mcp`; a save backs up the original there
  first and replaces it atomically; any write inside the game install is refused (`pathguard.py`). Its deletes are
  its own working copies and half-made new maps after a failure.
- **Battle.net (only `game_test`):** force-stops `Battle.net.exe`, writes the Warcraft III "Additional command line
  arguments" in `%APPDATA%\Battle.net\Battle.net.config` so the app launches its test map, starts the app again,
  and restores your arguments when the run ends. It never reads, types or stores credentials. If a run dies
  half-way, the arguments can stay pointed at its test map: run `game_close`, or clear that field in Battle.net →
  Warcraft III → Game Settings.
- **Skill text** (`skills/wc3-map-making/`, 861 lines): WC3 map-making knowledge and tool usage; nothing that
  steers the agent outside the task.

**Risks that remain.** One author, the whole project built Sept–Oct 2026, no track record. No `uv.lock`, so PyPI
versions float within `mcp>=1.27,<2`, `pywin32>=306`, `numpy>=2`, `pillow>=11` (mainstream packages). The plugin
marketplace install tracks the latest commit; the manual install below pins the one that was read.

**Verdict:** install, pinned. Re-read the diff before moving the pin.

### Rules for using it on this map (Decision 1.6)
- It can edit terrain, regions and placed units. **It does not, here.** Those are the owner's, by hand. The agent
  uses it for Lua, object data from the repo's numbers, validation, and `game_test`.
- **One writer at a time.** Save and close the map in the World Editor before the agent saves through the tool,
  and reopen it after. Two writers on one file is how a terrain session gets lost.
- Prove the loop on a scratch Lua map (`game_test` runs, a probe reports back) before pointing it at the province.
- `objdata_edit previous_ops_file` applies only what changed since the previous run, so hand edits in the Object
  Editor survive a re-apply. That is the path for balance tables.

### Install (owner's PC, PowerShell)
```powershell
# uv, the official installer (skip if `uv --version` works)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# any folder outside the game install
cd C:\projects\tools
git clone https://github.com/BenqsXd/wc3-mcp
cd wc3-mcp
git checkout 6b124f963742a204bcb53448070b42124b9607bb
uv sync
claude mcp add wc3 --scope user -e PYTHONPATH="$PWD\src" -- uv run --directory "$PWD" python -m wc3mcp.server
Copy-Item -Recurse skills\wc3-map-making "$env:USERPROFILE\.claude\skills\"
```
Restart Claude Code; `/mcp` lists `wc3`. The first start takes a minute (uv fetches Python 3.13 and the packages).
For `game_test`: the Battle.net app logged in once with "Keep me logged in".

## ceres / WLPM — not vetted
Lua build tools for map-as-folder projects (https://github.com/SamuelMoriarty/ceres-wc3,
https://github.com/Indaxia/WLPM). Older; Reforged 2.x support not confirmed. Fallback if wc3-mcp fails on the
owner's machine. The zero-tool fallback below that: one bundled Lua file pasted into one Custom Script.
