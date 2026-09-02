// src/_data/services.js
//
// Single source of truth for what this business offers. Loop over this once
// on the home page (icon + title + one-line teaser, in "servicesOverview" on
// index.html) and again on the services page (full article: body paragraphs,
// bullets, an optional note, and a CTA).
//
// Fully generic count — a coaching business might have 3 of these, an
// irrigation company might have 6. The templates loop over whatever's here.
//
// Fields:
//   slug        — used for the "Schedule X" style CTA text if you want one
//   icon        — path to a generic icon, or omit entirely
//   title       — service name
//   teaser      — one short sentence, used on the home page card
//   body        — array of paragraphs, used on the full services-page article
//   bullets     — optional array of short list items
//   note        — optional single-line callout (e.g. a scheduling note,
//                 NOT a pricing/discount-program paragraph — see
//                 pattern-notes/recurring-discount-program.md for that)
//   ctaText     — button label on the services-page article
//
// See examples/nemt-cold-community/data/services.js for a filled-in
// real-world reference (7 full NEMT service articles).

module.exports = [
    {
        slug: "service-1",
        icon: "/assets/svgs/icon-care.svg",
        title: "[SERVICE 1 NAME]",
        teaser: "[One short sentence describing this service for the home page card.]",
        body: [
            "[First paragraph of the full services-page description — what this service is and why it matters to the client's customer.]",
            "[Optional second paragraph — specifics, process, or what makes this business's version of the service different.]",
        ],
        bullets: [
            "[Specific detail or feature 1]",
            "[Specific detail or feature 2]",
        ],
        note: "",
        ctaText: "Schedule [SERVICE 1 NAME]",
    },
    {
        slug: "service-2",
        icon: "/assets/svgs/icon-clock.svg",
        title: "[SERVICE 2 NAME]",
        teaser: "[SERVICE 2 teaser sentence]",
        body: ["[SERVICE 2 body paragraph]"],
        bullets: [],
        note: "",
        ctaText: "Schedule [SERVICE 2 NAME]",
    },
    {
        slug: "service-3",
        icon: "/assets/svgs/icon-phone.svg",
        title: "[SERVICE 3 NAME]",
        teaser: "[SERVICE 3 teaser sentence]",
        body: ["[SERVICE 3 body paragraph]"],
        bullets: [],
        note: "",
        ctaText: "Schedule [SERVICE 3 NAME]",
    },
];
