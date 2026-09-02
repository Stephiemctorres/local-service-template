// src/_data/differentiators.js
//
// "Why choose us" cards on the home page. Generic repeatable slots — a
// client can have as few or as many as make sense; the template loops over
// whatever is here, it doesn't assume a fixed count.
//
// `icon` should point at a generic, universally-usable icon (clock, phone,
// shield, star, checkmark, heart/care) from src/assets/svgs/ — NOT an
// industry-specific icon. If nothing generic fits a given card, omit `icon`
// entirely; the template handles a missing icon gracefully.
//
// "Family-operated" / "family-owned" is ONE POSSIBLE differentiator a
// client might have — it's not a structural assumption of this system.
// A single-owner business, a larger staff, or a non-family operation simply
// doesn't include that card. See pattern-notes/differentiators-voice.md for
// how to write these in a warm, personal voice without assuming a specific
// ownership structure.
//
// See examples/nemt-cold-community/data/differentiators.js for a filled-in
// real-world reference (6 cards, including how a family-operated business
// wrote its own version of this card).

module.exports = [
    {
        icon: "/assets/svgs/icon-clock.svg",
        title: "[DIFFERENTIATOR 1 TITLE]",
        text: "[DIFFERENTIATOR 1 — one or two sentences on what actually makes this business different, in its own voice.]",
    },
    {
        icon: "/assets/svgs/icon-care.svg",
        title: "[DIFFERENTIATOR 2 TITLE]",
        text: "[DIFFERENTIATOR 2 DESCRIPTION]",
    },
    {
        icon: "/assets/svgs/icon-phone.svg",
        title: "[DIFFERENTIATOR 3 TITLE]",
        text: "[DIFFERENTIATOR 3 DESCRIPTION]",
    },
];
