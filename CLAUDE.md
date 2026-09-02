# CLAUDE.md — Project Instructions for Claude Code

This file is read automatically by Claude Code at the start of every
session in this repo. It replaces the "new-client-site-setup" Skill used
in Claude.ai chat — same workflow, adapted for direct file access.

## What this repo is

A reusable Eleventy site template for local-service businesses, extracted
and genericized from an original NEMT client site. See `README.md` for the
full build, and `pattern-notes/` for the reasoning behind specific
technical decisions — read the relevant one before touching anything it
covers (dark mode, mobile nav, the booking form, GEO/AEO copy, etc.).

## When starting a new client build

Interview the user for real content — do not invent business specifics or
generic-sounding filler, even temporarily "to save time." If information
is missing, ask. Work through this sequence:

1. **Business basics** — name, legal name, tagline, contact info, address,
   hours, socials. Ask directly whether this is a single owner, a team, or
   an ownership structure that shouldn't be mentioned at all — don't
   default to a two-owner or family-run framing (see
   `pattern-notes/differentiators-voice.md`).

2. **Does this client need the booking/request form at all?** Ask before
   touching `functions/api/submit.js` or `/schedule/`. If it's an
   informational/portfolio site, these should be removed entirely — see
   `pattern-notes/booking-form-architecture.md`. If a form is needed, ask
   what the actual request looks like (single address? pickup+destination?
   no address, just a date/time?) — don't assume the original transportation
   -shaped fields carry over.

3. **Services** (`src/_data/services.js`) — interview for each one: name,
   teaser, real body paragraphs, bullets, CTA text. Push back on generic
   answers ("we provide quality service") and ask what's concretely
   different about how this business does it.

4. **Differentiators** (`src/_data/differentiators.js`) — ask "what's
   actually, specifically true about this business that a competitor
   couldn't equally claim?" Reject generic first answers and ask a
   follow-up. Short and specific beats long and generic.

5. **Trust badges / standards / payment methods** — ask directly what
   applies; none of these are required, and any can stay an empty array.
   Never default to the original NEMT example's specifics (e.g. "Private
   Pay & Medicaid" was healthcare-specific).

6. **FAQ** (`src/_data/faq.js`) — ask for 3-5 real questions customers
   actually ask, in their own words. Write answers 40-60 words,
   answer-first, no marketing tone. See `pattern-notes/geo-aeo-answer-copy.md`.
   Don't let this section get skipped — it's the highest-leverage file for
   AI-search visibility.

7. **Testimonials** (`src/_data/testimonials.js`) — ask directly whether
   real testimonials exist yet. **If no, leave this file empty.** Never
   write a placeholder or invented testimonial, even one clearly marked
   for later replacement — an empty array is the correct state for a new
   business, not an incomplete one.

## Editing behavior

- Edit the actual data files directly once content is confirmed — that's
  the entire point of working in Claude Code instead of a chat window.
  Show the diff before committing to it.
- After editing, offer to run `npm start` and report the local preview
  URL, so the user can see the change in a browser without asking.
- Re-check `functions/api/submit.js`'s required-fields array and the
  `client.js` `bookingEmail` fields any time the form's shape changes.

## What not to do

- Don't fabricate business specifics, even plausible-sounding ones.
- Don't assume any content from the original NEMT example carries over to
  a new client by default.
- Don't skip the testimonials question — silence there is correct, not an
  oversight to quietly fill in later.
