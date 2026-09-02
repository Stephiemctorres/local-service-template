# Accessibility Standards — Reusable Across All Site Builds
*The Insight Age · Add this to the Studio template and every new client's KB*

---

## How to Use This
This isn't a one-time checklist for a single project, it's a standing practice. Fold this into the Studio starter template's build conventions, and reference it in every new client's `00-master-checklist.md` so accessibility is a default, not an afterthought caught during review.

---

## 1. Images & Alt Text
- Every meaningful image gets real, descriptive alt text — describe what's happening, not the filename or a generic label ("Booster club members setting up new bleachers, fall 2026," not "photo1")
- Purely decorative images (background textures, spacer graphics) get `alt=""` (empty, not missing) so screen readers correctly skip them instead of reading a filename
- If an image conveys information nowhere else on the page (a chart, an infographic), the alt text or nearby caption needs to convey that same information in words

## 2. Links
- Link text should make sense out of context — never bare "click here" or "read more" with nothing else identifying the destination
- Links that open a new tab or leave the site (like linking a photo out to Instagram) get an `aria-label` clarifying that, e.g. `aria-label="View this post on Instagram"`, plus `rel="noopener"` for security
- Never convey a link purely through color, underline or another visible indicator (not necessarily always-on, but present on hover/focus at minimum)

## 3. Color & Contrast
- All text/background color pairings must meet WCAG AA contrast minimums (4.5:1 for normal text, 3:1 for large/bold text) — check this whenever a new brand palette comes in, not just for the default light-background case
- **Explicitly re-check contrast for every color pairing that appears on a non-default background** — this project already hit a real bug here (a logo readable on white but invisible on navy; see `pattern-notes/logo-contrast.md`) — assume any new background color needs its own contrast check, don't assume it carries over
- Never rely on color alone to convey meaning (e.g., "red text means required field") — pair it with an icon, label, or symbol too

## 4. Headings & Structure
- One `<h1>` per page, describing that page's main content
- Headings nest in order (`h2` before `h3`, never skipping a level) — headings are a navigation structure for screen reader users, not just a font-size tool
- Use real semantic HTML elements (`<nav>`, `<main>`, `<footer>`, `<button>`) instead of generic `<div>`s styled to look the part

## 5. Forms
- Every input has a real, associated `<label>`, not just placeholder text (placeholder text disappears once typing starts, and isn't reliably read by all screen readers)
- Required fields are marked in a way that isn't purely visual (an asterisk alone isn't enough — pair it with `aria-required` or a text note)
- Error messages are associated with their field (`aria-describedby`) and announced, not just shown as a color change
- Focus order follows a logical, visual top-to-bottom path through the form

## 6. Keyboard & Focus
- Everything clickable must also be reachable and operable via keyboard alone (Tab, Enter, Space) — test this by actually unplugging the mouse and trying it
- Visible focus indicators stay on — never remove the default focus outline without replacing it with an equally visible custom one
- Any custom interactive component (accordions, custom dropdowns) needs the same keyboard behavior a native element would have

## 7. Motion & Media
- Respect `prefers-reduced-motion` for any animation or transition beyond simple, small hover effects
- Any video includes captions; any audio-only content has a text transcript available

## 8. Testing Before Launch
- Run an automated pass (browser Lighthouse accessibility audit, or a tool like axe or WAVE) on every page before it ships — catches a large share of issues in minutes
- Do at least one manual pass per site: navigate the whole thing using only the keyboard, and check every image has alt text that actually describes the image
- Re-check contrast specifically any time a new color is introduced mid-project, not just at initial brand setup

---

## Why This Matters Beyond Compliance
Accessible design consistently overlaps with *better* design for everyone: clear link text helps all users scan faster, real contrast helps anyone viewing a screen in bright sunlight, keyboard operability matters for anyone with a broken trackpad, not just assistive-technology users. Treating this as a core practice rather than a checkbox tends to produce a better site across the board, not a narrower one.
