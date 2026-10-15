# Decisions Manifest — triforce-defense
**Started:** 2026-10-15  ·  **Last Updated:** 2026-10-15  ·  **Status:** In Design

> The single source of truth, written *for the next agent* — not a doc Jordan maintains by hand.
> Every future agent consults this before an architectural/behavioral change. Never silently rewrite
> a locked decision — supersede it via a Change Request and note the successor. THE LAW (v2):
> `C:\projects\AI-Brain\instructions\design-methodology.md`.

---

## Core Goal
<One paragraph: what this system does and the problem it solves.>

## Non-Negotiable Constraints
<The cardinal rules for THIS project — lines that must never be crossed. Examples:>
- <e.g. read-only — never places an order>
- <e.g. fail-closed — any missing/stale/ambiguous input => no action>
- <e.g. secrets only in a gitignored .env, never committed>

---

## Chapter 1: Core Architecture

### Decision 1.1: <the question asked>
**Chosen Answer:** <answer>
**Rationale:** <why it matters>
**Date Locked:** 2026-10-15  ·  **Affects:** `/core` · `/config` · `/tests`
**Change Rule:** <what must be reviewed if this decision changes>

### Decision 1.2: <question>
**Chosen Answer:** <answer>
**Rationale:** <why>
**Date Locked:** 2026-10-15  ·  **Affects:** <domains / files>
**Change Rule:** <what to re-check if this changes>

## Chapter 2: <next area — e.g. Data / Scope / Risk / UI>

### Decision 2.1: <question>
**Chosen Answer:** <answer>
**Rationale:** <why>
**Date Locked:** 2026-10-15  ·  **Affects:** <…>
**Change Rule:** <…>

---

## Build Timeline
| Phase | Chunk | Dependencies | Status | Review Date |
|-------|-------|--------------|--------|-------------|
| 1 | <core chunk> | None | In Design | — |
| 2 | <next chunk> | Phase 1 | Planned | — |

Status ∈ **Planned · In Design · Locked · Built · Superseded**. Update at every decision + milestone.

## Open Questions
| Question | Why It Matters | Owner | Status |
|----------|----------------|-------|--------|
| <question> | <reason> | Human / Agent | Open |

## Change Log
| Date | Change | Reason | Affected Areas |
|------|--------|--------|----------------|
| 2026-10-15 | Initial scaffold | — | (whole tree) |
