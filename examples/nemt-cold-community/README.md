# Worked Example: COLD Community NEMT

This folder preserves the real, filled-in content from the original
COLD Community NEMT build — the client this template was extracted from —
as a fast-start reference for a **future NEMT/medical-transport client**,
so that build doesn't have to reverse-engineer real content back out of
generic bracket placeholders.

The main template (`src/_data/*.js`, `src/index.html`, `src/content/pages/`)
was generalized to serve any local service business, per the decision to
build for this pipeline's actual reality (booster club, pet-inspection,
coaching, irrigation, portfolio — overwhelmingly non-NEMT). This folder is
where the original industry-specific content went instead of being deleted.

## What's here

`data/` mirrors `src/_data/` exactly, file for file, but with the original
COLD Community NEMT content instead of generic placeholders:

| File | What it fills |
|---|---|
| `client.js` | Business identity/contact — real values, including the two-field email split |
| `trustBadges.js` | The 7 real certification badges |
| `differentiators.js` | The 6 real "why choose us" cards |
| `services.js` | All 7 full service articles (dialysis, wheelchair, hospital discharge, doctor appointments, physical therapy, pharmacy pickup, personal trips) |
| `standards.js` | The Certifications + Vehicle Standards columns |
| `processAccordion.js` | The 5-item Vehicle & Safety Standards accordion |
| `paymentMethods.js` | Private Pay + Medicaid |
| `formOptions.js` | The original Service Type options (Ambulatory/Wheelchair/Stretcher/etc.) and referral sources |

The three NEMT-specific icons (`icon-medical.svg`, `icon-wheelchair.svg`,
`icon-stretcher.svg`) live in `assets/svgs/` here rather than in the
default `src/assets/svgs/`, since they're not universal icons.

## How to use this for a future NEMT client

1. Copy each file from `data/` over its counterpart in `src/_data/`.
2. Copy the three icons from `assets/svgs/` into `src/assets/svgs/`.
3. Update the identity fields in `client.js` that are specific to the
   *original* client (name, address, phone, owners) to the new client's
   actual details — everything else (the service articles, standards,
   badges) is legitimate starting content for another NEMT business, not
   just structural scaffolding.
4. Check `pattern-notes/recurring-discount-program.md` if the new client
   wants a pre-paid discount program — that content was deliberately kept
   out of this example data and documented separately.
5. Check `pattern-notes/differentiators-voice.md` before reusing the
   "Family-Operated" differentiator or the "we treat every client like
   family" About-section line verbatim — those were true for COLD
   Community NEMT specifically, not automatically true for the next NEMT
   client just because the industry matches.

## What this is not

This is a content reference, not a second copy of the whole site. Layout,
components, CSS, the booking-form architecture, and the accessibility
baseline all live once, in the main template — this folder only holds the
industry-specific *content* that was extracted out of it.
