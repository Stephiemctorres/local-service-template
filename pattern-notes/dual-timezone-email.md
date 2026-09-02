# Pattern Note: Dual-Timezone Email Formatting

## Why this exists
COLD Community NEMT's real service area straddles a timezone line: Lee &
Russell Counties, Alabama (Eastern Time) and Muscogee & Harris Counties,
Georgia (Central Time) — two adjacent counties, one hour apart. A rider
booking from the Georgia side of the service area picks a time in *their*
local clock, but the business's own calendar and dispatch operations run
entirely on Eastern Time regardless of which side of the line the rider is
on.

Without handling this explicitly, a ride requested for "2:00 PM" from a
Central-time rider would either get logged as 2:00 PM Eastern (an hour
early, in the rider's actual expectation) or require dispatch staff to
mentally convert every single Central-time booking by hand — a guaranteed
eventual scheduling mistake.

## What the code actually does
Confirmed in `functions/api/submit.js`:

- `formatTimeWithBothZones()` — used in outward-facing rider/dispatch text —
  shows **both** zones side by side whenever a timezone is known, e.g.
  `"2:00 PM Central (3:00 PM Eastern)"`, so nobody has to do the conversion
  in their head.
- `toEasternTime()` — used internally, for the `.ics` calendar attachment
  and the Google Calendar link — silently converts every booking to Eastern
  before it goes into any calendar system, since that's the zone the
  business's own calendar actually runs on.
- The shift is a flat one-hour offset (`shiftHour`), which is correct for
  the Eastern/Central pair specifically, not a general timezone library —
  this is a purpose-built two-zone converter, not a drop-in for arbitrary
  timezones.

## When a future client needs this vs. when they don't
- **Needs it:** any client whose actual service radius crosses a timezone
  boundary — a metro area that straddles a state or timezone line, a
  business serving both sides of a river-adjacent twin-city pair, etc.
- **Doesn't need it:** the large majority of local service businesses,
  whose service area sits entirely inside one timezone. For those clients,
  this whole layer is unnecessary complexity that should be stripped, not
  adapted.

## What to do at new-client setup
1. Check whether the client's actual service area (not just their mailing
   address) crosses a timezone line.
2. If **no** — delete `formatTimeWithBothZones`, `toEasternTime`,
   `shiftHour`, `formatTimezoneName`, and the `timezone` form field
   entirely. Replace their call sites with plain `formatTime12Hour()`.
   Carrying unused dual-zone logic into a single-timezone client site is
   dead complexity that just makes the function harder to read for no
   benefit.
3. If **yes** — keep the pattern, but confirm the specific hour offset is
   still a flat 1-hour Eastern/Central gap. A different timezone pair (say,
   Pacific/Mountain) is *also* a flat 1-hour gap and would work unmodified;
   a pair with a non-integer or seasonally-inconsistent offset would not,
   and `shiftHour`'s simple integer-hour math would need to be revisited.
