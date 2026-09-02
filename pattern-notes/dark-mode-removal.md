# Pattern Note: Dark Mode — Removed, Not Fixed

## What actually happened
The base kit this template started from (CodeStitch's Intermediate Website Kit)
ships with a dark mode toggle built in by default: a `dark.js` script, a
`#dark-mode-toggle` button in the header, `--dark`/`--medium`/`--accent`
tokens in `root.scss`, and `.cs-dark`/`.dark` utility classes scattered
through the component styles.

For the COLD Community NEMT build, all of it was removed — not patched,
not left disabled behind a flag, fully deleted — via `scripts/remove-dark-mode.js`.
Confirmed by direct inspection: zero references to dark mode, `.cs-dark`, or
`prefers-color-scheme` remain anywhere in `src/`.

## Why removal, not a fix
**Being straightforward about the limits of this note:** there isn't a
recorded decision doc from the original build explaining *why* dark mode was
pulled rather than kept and fixed. What follows is a reasonable inference
from the situation, not a documented fact — flagging that distinction on
purpose rather than presenting a guess as settled history.

The most defensible reasoning available from the situation itself:

- A dark mode toggle adds a **second color-contrast surface** to maintain
  for every future change. Every new brand palette, every new section,
  every new component needs its contrast checked twice — once for light,
  once for dark — instead of once.
- This project already hit a real, live bug from *exactly this kind of
  multi-surface problem*, just via a different mechanism: the client logo
  was readable on white but invisible on navy (see `logo-contrast.md`).
  Dark mode multiplies that same risk class across the entire site rather
  than one section.
- A small local-service site (3 pages, one dominant CTA: book a ride) gets
  little practical benefit from a dark mode toggle compared to the ongoing
  cost of maintaining it correctly.

## What this means for future client builds
- Dark mode is gone by default in this template. If a specific client
  genuinely wants it, it's a deliberate re-add, not a re-enable — there's
  no dormant toggle sitting behind a flag waiting to be flipped back on.
- If it does get re-added for a client, budget real time for a full
  contrast audit across **every** section in **both** modes, not just a
  spot-check. The logo-contrast bug is the cautionary example of what
  slips through when a second surface isn't checked as carefully as the
  first.
