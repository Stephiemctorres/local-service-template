# Pattern Note: Why the Logo Needs Two Versions

## The bug this is based on
This isn't a theoretical concern — it's a real bug this project hit.
The client's logo was fine on a white background but effectively invisible
once placed on the navy (`--navy: #0B2D4D`) footer background. The logo
file existed and rendered — it just couldn't be read.

## Why one logo file isn't enough
A single logo asset is designed against one background. Move it to a
background with different (or inverted) luminance, and the parts of the
mark that depended on contrast against the *first* background stop working
against the second. This is true even when the logo "shows up" — an image
tag with a valid `src` and correct dimensions passes plenty of technical
checks (broken image? no. correct size? yes.) while still being functionally
unreadable to an actual human looking at the page.

Automated tooling doesn't reliably catch this either: a Lighthouse/axe/WAVE
pass checks *text* contrast ratios against WCAG thresholds, not the internal
contrast of a raster or vector logo image sitting inside an `<img>` tag.
This bug can ship clean through an automated audit and only surface when a
person actually looks at the live page.

## Where this shows up in the code
Confirmed by direct inspection — this template already carries the fix as
two separate logo assets, used in two different places:

- **Light-background variant** (`cold-logo-header.png`, `logo-black.svg`) —
  used in `header.html`, on the default white nav background.
- **Dark-background variant** (`cold-logo-white.png`, `logo-light.svg`) —
  used in `footer.html`, on the navy footer background, and in the booking
  emails (`functions/api/submit.js`), which also use a navy header block.

Both live in the source structure as of this template pass, but as
**placeholder graphics** — each clearly labeled "YOUR LOGO," swapped in
during the extraction pass specifically to remove the client's real logo art
from the template. The slot structure (light version + dark version, wired
to the right template in the right place) is real and ready; the actual
artwork is not.

## What breaks if a future client build skips this
If only one logo file gets provided at new-client setup:

- Using the light-bg version everywhere → footer and email logos become
  unreadable on navy, reproducing the exact original bug.
- Using the dark-bg (light-colored) version everywhere → the header logo on
  white background washes out and becomes equally unreadable, just in the
  opposite direction.

Either way, the failure is silent — nothing errors, nothing looks
"broken" in a build log, it just quietly fails the moment a human looks at
the live page. This is exactly the class of issue the accessibility
standards doc calls out in its contrast section: **re-check contrast for
every color pairing that appears on a non-default background — don't
assume it carries over.**

## New-client checklist implication
When onboarding a new client (Phase 3 of the extraction plan), get **both**
logo versions — one built to sit on the site's lightest background, one
built to sit on its darkest — before launch, not just "the logo file."
