# triforce-defense — Design Spec

> The full design: what it is, how it works, and the tech spec / data model.
> `ARCHITECTURE.md` is the one-page map; `DECISIONS.md` is the locked-choices
> manifest; this is the source of truth for *what* and *why*.

## 0. One-paragraph pitch
<what it is, who it's for, why it exists.>

## 1. Goals / non-goals
- **Goals:** …
- **Non-goals:** … (what this deliberately won't do — name the hard constraints, e.g. "read-only, never X").

## 2. The core model / mechanic
<the central idea, scoring, or data model — the thing everything else serves. Be concrete.>

## 3. Features
<each feature: what it does, and any rule it must obey.>

## 4. Tech spec / architecture
- Stack: <vanilla JS + Canvas / Node + discord.js / Python…>, no build by default.
- **Domains** (each a folder pairing logic + a `.json` config — see `ARCHITECTURE.md`):
  | Domain | Purpose | Config |
  |--------|---------|--------|
  | <core> | <…> | `<core.json>` |
  | <data> | <…> | `<data.json>` |
- Data shapes: <schemas, config files, state.>
- Config separation: every tweakable value lives in a `.json`, never hardcoded in logic.

## 5. Sources / rules (if applicable)
<citations, references, the authority this defers to.>

## 6. Open questions / future
<deferred ideas, low-priority polish, things to pin down with a real source.>

## Status (2026-10-15)
<what's built and verified, what's next.>
