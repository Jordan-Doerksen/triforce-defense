# Triforce-Defense

games · warcraft 3 · lua

<2–4 plain sentences: what it is and who it's for. Deadpan, no hype.>

**No build tools, no frameworks by default.** Domain-split, config-driven. <run instructions>

## What it is
<the honest description, including what it doesn't do yet.>

## How it gets built
Interview every add, lock before code, build one domain at a time. Every decision is locked in
`DECISIONS.md` and every domain is named in `ARCHITECTURE.md` before anything is built; then each
chunk (one domain, smallest slice first) is cross-checked against the manifest, the map and every
other subsystem before the next starts. **A chunk is one domain after everything is decided, not a
department built end to end.** The interview is the agent interviewing the request with the owner,
one question at a time, not a round of stakeholder interviews.

The full explanation, with a diagram, a glossary of the loaded words and a worked example, is at
`docs/index.html`.

## The design sheets online
The wall, every v2 sheet pinned in the set's order, is `index.html` at the root, served by GitHub
Pages from the root (`.nojekyll`, no build): https://jordan-doerksen.github.io/triforce-defense/.
Open any sheet live, zoom its print, download one, or download all as a zip. The explanation above
is at `/docs/` on the same site.

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
