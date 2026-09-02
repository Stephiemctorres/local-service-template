# Pattern Note: Recurring-Discount / Loyalty Programs

## Where this came from
The original NEMT build had a real example of this: dialysis patients need
three round trips a week, every week, indefinitely — a genuinely predictable,
recurring need. In response, the business offered private-pay patients a
10% discount for pre-paying a full month of trips at once, in exchange for
predictable revenue and simpler scheduling on the business's side.

## Why this is documentation, not a template field
This is a **business-model choice a client makes occasionally**, not a
property every service needs a slot for. Baking a `loyaltyProgram` field
into every entry in `src/_data/services.js` would mean most clients carry
around an empty/unused field — noise for the common case, to save a few
minutes in the rare case. It's cheaper to document the pattern once here
and let a client add a paragraph to a specific service's `body` array in
`services.js` if and when they actually build a program like this.

## The pattern, generalized
This works whenever a client has customers with a **predictable, recurring
need** and wants to trade a small discount for **payment predictability and
scheduling stability**:

- A pre-paid block of sessions/visits/trips (a month, a quarter, a set
  count) at a modest discount (the original example: 10%) off the
  per-visit rate.
- The trade being made explicit to the customer: they get a lower
  effective rate and simpler renewal; the business gets predictable
  revenue and easier scheduling.
- Usually private-pay only, since insurance/third-party-payer situations
  (Medicaid in the original example) complicate pre-payment structures.

## Where it could show up for the pipeline's actual clients
- **Coaching business:** a pre-paid package of sessions (4, 8, 12) at a
  discount over single-session pricing — a very natural fit.
- **Irrigation company:** a seasonal maintenance contract (pre-paid for
  the season) instead of per-visit billing.
- **Pet-inspection business:** less natural fit unless inspections are
  genuinely recurring (e.g. a monthly check-in program) rather than
  one-off.
- **Booster club / portfolio site:** no natural fit — this pattern assumes
  an ongoing paid-service relationship, which these aren't.

## How to add it back into the template if a client wants it
Add a sentence to the relevant service's `note` field (or an extra `body`
paragraph) in `src/_data/services.js` — don't add a new global field or
component for this. It's a paragraph of copy specific to one service, not
a site-wide feature.
