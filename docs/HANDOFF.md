# triforce-defense — Build Handoff

> Read `ARCHITECTURE.md` first (the one-page map), then `SPEC.md` (the full design)
> and `DECISIONS.md` (the manifest of locked choices). This file is the kickoff:
> how to stand up the repo and build it chunk by chunk.
> Home repo: `triforce-defense` (/sessions/rcw-014qfvqroadwe58yqg8a21wb/scaffold/triforce-defense).

> **Progress (as built, 2026-10-15):** <one-line status — what's runnable, what's next.>

---

## What you're building
<2–4 sentences: the thing, who it's for, the one or two design decisions that matter most.>

## Stand up the repo
1. Repo: `triforce-defense`. <free & open? MIT LICENSE.> No GitHub Pages on this repo — the live page is a copy inside jordan-doerksen.github.io at `/<category>/triforce-defense/`, plus a `data/registry.json` entry.
2. No build step, no framework by default. **Design-first, domain-split** (THE LAW — `C:\projects\AI-Brain\instructions\design-methodology.md`): domain folders, each pairing logic with a `.json` config; tweakable values live in config, never hardcoded.
3. <what to copy/reference from prior work — and what to re-implement clean rather than fork.>
4. Footer + how-to keep any honest disclaimer and cite sources where relevant.

## Architecture (context economy)
The map is `ARCHITECTURE.md`. Shape:
- Domain folders (`/core/`, `/data/`, `/ui/` … per archetype), one responsibility each.
- Each domain pairs a logic file with a `<domain>.json` config.
- `/tests/` (or `/tools/`) mirrors the domains — verifiers/harnesses, not shipped.
- Split by the file-size rule in `AI-Brain\instructions\design-methodology.md` (`LAW.md` **DES-03**),
  or sooner when a part is independently tweakable AND substantial. A 5-line helper stays inline.

## Build order (chunk by chunk)
Each chunk ships something runnable, then gets **cross-checked against the manifest** before the next.
- **Chunk 1 — skeleton + the core action.** <smallest usable slice.>
- **Chunk 2 — …**
- **Chunk 3 — …**

## Cross-check (after each chunk, before the next)
- [ ] Matches every decision in `DECISIONS.md` that affects it.
- [ ] Contradicts no earlier chunk / decision / the core goal.
- [ ] Scope stable — no new requirements sneaking in.
- [ ] An agent could modify this chunk without reading outside its folder.
- [ ] All tweakable values in `.json` config, not hardcoded.
- [ ] No file past the split threshold (`LAW.md` **DES-03**) without a recorded reason; one responsibility each.

## Definition of done (per chunk/feature)
1. It runs and does the thing.
2. Any correctness claim has a check/harness that passes.
3. Docs updated (this file + `DECISIONS.md` timeline + `CHANGELOG`).
4. No secret in the repo; `.gitignore` covers `.env`.

## Source / citation quick-reference (if applicable)
| Thing | Source |
|---|---|
| … | … |

## Keep / Don't carry over
- **Keep:** <what worked before.>
- **Don't carry over:** <known mistakes to avoid repeating.>
