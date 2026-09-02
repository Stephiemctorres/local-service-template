// src/_data/testimonials.js
//
// Customer testimonials/reviews, shown on the home page. Generic repeatable
// slot — any number of entries.
//
// SHIPS EMPTY ON PURPOSE. A new business with no customers yet has nothing
// real to put here, and a fabricated or placeholder testimonial is worse
// than no section at all — it's the kind of thing that damages trust with
// both real visitors and AI systems evaluating credibility (see
// pattern-notes/geo-aeo-answer-copy.md on why specific and honest beats
// generic and inflated every time).
//
// The home page section and the optional Review schema in
// components/home-schema.html both check `testimonials.length` — so this
// section simply doesn't exist on the live site until you add a real entry
// here. Nothing else needs to be toggled on.
//
// Only add a real customer's own words, with their permission. Fields:
//   quote   — the testimonial text, in the customer's own words
//   name    — customer's name (first name + last initial is a reasonable
//             privacy-conscious default if a client prefers that)
//   context — optional short descriptor, e.g. "Client since 2024" or
//             the service they used — omit if it doesn't add anything
//   rating  — optional, 1-5. Only include this if the customer actually
//             gave a star rating (e.g. via Google) — don't estimate or
//             assume one. Powers the Review structured data in
//             components/home-schema.html when present.

module.exports = [
    // {
    //     quote: "Real customer quote goes here, in their own words.",
    //     name: "Jane D.",
    //     context: "",
    //     rating: 5,
    // },
];
