# Pattern Note: Booking-Form Architecture — What's Generic, What Isn't, What's Optional

## The core distinction
This template bundles two different things under "the booking form," and
they generalize very differently:

1. **The plumbing** — `functions/api/submit.js` (Cloudflare Pages Function),
   the Resend email integration, the dual-timezone formatting, the `.ics`
   calendar attachment, the Google Calendar link, the Google Sheets backup
   webhook. This is genuinely generic. None of it assumes "transportation" —
   it's a general-purpose "collect a form submission, email it to staff,
   optionally confirm to the submitter, optionally log it" pipeline.
2. **The field set** — pickup address, destination, round trip, timezone.
   This *is* transportation-shaped. It assumes a trip with an origin and a
   destination, which most future clients in this pipeline don't have.

Genericizing the service-type dropdown (now driven by `src/_data/formOptions.js`)
solved the "what kind of service" question. It did **not** solve the "what
information does this business actually need to collect" question — that's
a separate, per-client decision.

## What to change per business type
- **Coaching business:** drop pickup/destination/round-trip entirely.
  Replace with session date/time (already generic — `date`/`time` fields
  stay), maybe a "session format" field (in-person/virtual) if relevant.
  No address fields needed at all unless sessions happen at a location.
- **Irrigation company:** replace pickup+destination with a single
  "Service Address" field — there's one location, not an origin/destination
  pair. Round-trip doesn't apply; drop it.
- **Pet-inspection business:** likely a single "Inspection Address" field,
  same as above. Round-trip doesn't apply.
- **Booster club:** probably doesn't need this form at all — see below.
- **Portfolio site (personal site):** doesn't need this form, `submit.js`,
  or the `functions/` directory at all.

## When to skip the form entirely
Not every future build is a service-request business. A portfolio site has
no bookings to request. For a client like that:
- Delete `/schedule/` and its content page.
- Delete `functions/api/submit.js` and the `functions/` directory.
- Delete the `bookingEmail` fields from `client.js` (they're only used by
  the deleted function).
- Remove the "Schedule a Ride" / booking CTAs from the header, mobile
  action bar, and any other page that links to `/schedule/`.

The Eleventy build, the design-token system (`root.scss`), the
critical/deferred CSS split, the accessibility-standards baseline, and the
mobile-nav decision guide are all useful **independent of whether a given
client needs a request form at all**. Don't treat the form as load-bearing
for the rest of the template — it's one optional feature among several.

## What stays constant regardless of field set
- The required-fields check pattern in `submit.js` (a plain array of field
  names) — just update the array to match whatever fields the new form
  actually has.
- The Resend email templates (`buildDispatchHtml`, `buildRiderConfirmationHtml`)
  — these read from `data.*` generically; as long as the new form's field
  `name` attributes match what these functions expect (or the functions are
  updated to match new field names), the email-building logic doesn't need
  a rewrite.
- The dual-timezone logic — only relevant if the new business's service
  area actually crosses a timezone line; see `dual-timezone-email.md`.
