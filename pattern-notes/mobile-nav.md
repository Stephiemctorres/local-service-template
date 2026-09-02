# Pattern Note: Mobile Navigation — Three Options & When to Use Each

## What's actually built in this template right now
Confirmed by direct inspection of `header.html`, `mobile-action-bar.html`,
and `root.scss`: this template currently implements **one** of the three
patterns below — the hybrid (bottom action bar on phones, restored
hamburger-capable nav at tablet width and up). The other two patterns
described here are real, valid options for future client builds, but they
do **not** exist as separate ready-made components or a config toggle in
this codebase yet. Choosing one of the other two means adapting
`header.html`/`mobile-action-bar.html` directly, not flipping a setting.

## The three patterns and the actual decision criteria

**Bottom action bar:** 3-4 core pages/actions, one dominant user goal
(booking, calling, requesting a quote). The bar IS the navigation; simplify
the header to logo-only.

**Hamburger-only:** 5+ pages, or no single dominant action (a PTA/booster
site with Board, Funds, Gallery, Contact as equally-weighted destinations).

**Hybrid (rare):** hamburger for full navigation, plus one persistent bottom
button for a single standout action that shouldn't get buried in a menu
(e.g. a "Donate" button on an otherwise browsing-focused site).

## Why COLD Community NEMT ended up on the hybrid pattern
Applying the criteria above to the actual site: 3 core pages (Home,
Services, Schedule) with one clearly dominant action ("Schedule a Ride"),
which by the criteria above points at a **bottom action bar**, not a hybrid.
The implementation went slightly further than a pure bottom bar — the
bottom bar carries four actions (Home, Services, Call Now, Schedule) rather
than a single standout button, and a full hamburger-capable nav is restored
at tablet width rather than staying bar-only up through desktop. Worth
naming plainly: this is closer to a bar-only site with a richer action set
than the "hybrid" pattern as strictly defined above (hamburger + one
standout button). Flagging the mismatch rather than quietly relabeling the
existing build to fit the cleaner three-category story.

## Applying this at new-client setup
1. Count core pages/destinations first, before touching any code.
2. Ask whether there's one dominant user action or several equally-weighted
   ones.
3. Match against the three patterns above using those two facts — not
   design taste, not "what the last client had."
4. If the answer is bottom-bar-only or hamburger-only and the client's site
   doesn't need the restored-desktop-nav behavior this template currently
   has baked in, that's a real edit to `header.html` and
   `mobile-action-bar.html`, not a toggle — budget time for it accordingly.
