# Triforce-Defense

games · warcraft 3 · lua

<2–4 plain sentences: what it is and who it's for. Deadpan, no hype.>

**No build tools, no frameworks by default.** Domain-split, config-driven. <run instructions>

## What it is
<the honest description, including what it doesn't do yet.>

## How it gets built
Design first, then build in layers. Every decision is locked in `DECISIONS.md` before anything is
built; the build then goes one layer across the whole project at a time (structure, then data,
then behavior), never one feature end to end. **A chunk is a review boundary, not a feature slice:**
one piece of work, then stop and show the owner. The research pass before each decision is the kit
reading other people's scars, not a stakeholder interview.

The full explanation, with a diagram, a glossary of the loaded words and a worked example, is at
`docs/index.html` (served by GitHub Pages from `/docs`).

## Structure
Domain folders, each pairing logic with a `.json` config (see `ARCHITECTURE.md`).
Tweakable values live in config — change behavior without touching code.

## Run
```
<how to run it locally>
```

## Status
<what works, what's next — honest gaps by design.>

## Disclaimer / notes
<any honest caveat.>

## License
Private; all rights reserved. See LICENSE.
