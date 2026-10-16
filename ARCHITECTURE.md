# Architecture Overview: triforce-defense

> The one-page map — short enough to read before touching anything. Any agent should be able to change
> one thing after reading only this + the one domain it points to (context economy). Pairs with
> `DECISIONS.md`. THE LAW (v2): `C:\projects\AI-Brain\instructions\design-methodology.md` — the **DES** clauses in `AI-Brain\LAW.md`.

## System at a Glance
<2–3 sentences: what it is, the shape of it, the one constraint that matters most.>

## Core Flow
```text
<Input / Data Source>
        ↓
<Parse / Normalize>
        ↓
<Strategy / Business Logic>
        ↓
<Risk / Validation>
        ↓
<Execution / Output>
        ↓
<Logging / Monitoring>
```

## Core Domains
Each domain is a folder pairing logic with its own `.json` config. Tweakables live in the config,
never hardcoded in the logic.

| Domain | Purpose | Entry Point | Config File | Notes |
|--------|---------|-------------|-------------|-------|
| <core> | <what it does> | `<core/…>` | `<core/…json>` | <e.g. stable runtime> |
| <data> | <…> | `<…>` | `<…json>` | <…> |
| <ui / render> | <…> | `<…>` | `<…json>` | display only |
| tests | validation | `<tests/…>` | — | mirrors the domains |

## Key Design Decisions
- **Runtime Mode:** <real-time / batch / manual / hybrid>
- **Config Mutability:** <startup-only / runtime-updatable / external-triggered>
- **Risk Model:** <pre-check / post-check / both / n-a>
- **Storage Model:** <none / local files / database / cloud>
- **UI Model:** <none / dashboard / CLI / web>
- **File-Split Rule:** split by subject, never by size; there is no line count. The rule lives in
  ONE place — `LAW.md` **DES-03**. Do not restate it here.

## How to Modify a Domain
1. Read `DECISIONS.md` — is this already locked? Does a Non-Negotiable Constraint apply?
2. Read this map; open ONLY the owning domain folder.
3. Check that domain's config `.json` first — change a tweakable there, not in logic.
4. Change logic only if config can't solve it (one responsibility per file).
5. Run the relevant tests + the cross-check.
6. If it touches design / behavior / config / risk → file a Change Request + update the manifest's Change Log.
