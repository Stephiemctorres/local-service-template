# Pattern Note: GEO/AEO — Writing for AI Search Without Sounding Like a Marketer

## What GEO/AEO actually is
SEO gets a page *ranked*. GEO (generative engine optimization) and AEO
(answer engine optimization) get a business *cited or recommended* when
someone asks ChatGPT, Gemini, or Claude a question directly — sometimes
without the person ever clicking a link at all.

## The useful accident: plain, direct writing is BOTH the anti-marketing-speak instinct AND the GEO-correct one
This is worth stating plainly, because it resolves a tension that looks
real but isn't: the instinct to avoid sounding like a salesperson or an
"AI guru" is not in conflict with optimizing for AI search — it's the same
skill. AI systems extract and cite content that states things plainly and
directly. Hype language, vague superlatives ("industry-leading,"
"unparalleled," "cutting-edge") and marketing throat-clearing are exactly
the kind of content that's hard for an AI system to quote cleanly, because
there's no actual claim to extract. Direct, specific, honest writing is
easier to cite, not harder — which means writing in a voice that avoids
sounding like a marketer is a legitimate technical advantage here, not a
tradeoff against one.

## Where this is implemented in the template
- **`src/_data/faq.js`** — the highest-leverage GEO asset on the site.
  Loops into a visible FAQ section (`index.html`) and into FAQPage
  structured data (`components/home-schema.html`) from the same source.
- **`client.schemaType` / `client.serviceAreas` / `client.hoursSchema`**
  (`client.js`) — structured data that tells AI systems plainly what kind
  of business this is, where it operates, and when it's open. Accuracy
  here matters more than most content on the site, since this is what gets
  parsed directly rather than read.

## How to write an FAQ answer (or any direct-answer copy) well
1. **Answer first, in the first sentence.** Not "Great question — a lot of
   people wonder about this..." Just the answer.
2. **Write the question the way a real person actually asks it**, not the
   way a business would phrase it internally. "How much does this cost?"
   not "What is your pricing structure?"
3. **40–60 words per answer is the sweet spot** — enough to be complete,
   short enough to be quotable as a self-contained unit.
4. **State specifics, not categories.** "We respond within 1 business day"
   beats "We pride ourselves on fast communication." A vague claim gives an
   AI system nothing concrete to cite; a specific one gives it something to
   quote directly.
5. **If a sentence would sound the same on every competitor's site, cut
   it.** ("We're passionate about quality." "Customer satisfaction is our
   top priority.") These don't help a human reader trust the business, and
   they don't give an AI system anything distinguishing to extract either —
   they fail at both jobs for the same reason.

## Keeping business identity consistent (NAP consistency)
AI systems cross-reference the business name, address, and phone number
across the website, Google Business Profile, and any other listings to
judge trustworthiness. Keep these byte-for-byte identical everywhere —
"123 Main St" on the website and "123 Main Street" on a directory listing
is a small inconsistency that can measurably hurt this. `client.js` is the
single source of truth for these values on the site side; the new-client
setup checklist should include verifying the Google Business Profile
listing matches it exactly.
