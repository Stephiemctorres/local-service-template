// src/_data/standards.js
//
// Two (or more) columns of short list items on the services page — used for
// things like "Certifications" + "Our Process/Equipment Standards" in the
// original NEMT build, but the concept is generic: any business can list
// "what we're trained/certified in" and "what our process/equipment looks
// like" as parallel columns. Add, remove, or rename columns freely; the
// template loops over however many are here.
//
// See examples/nemt-cold-community/data/standards.js for a filled-in
// real-world reference (Certifications + Vehicle Standards, 7 and 6 items).

module.exports = [
    {
        heading: "[COLUMN 1 HEADING — e.g. Certifications]",
        items: [
            "[Certification / credential 1]",
            "[Certification / credential 2]",
        ],
    },
    {
        heading: "[COLUMN 2 HEADING — e.g. Our Process / Equipment]",
        items: [
            "[Process or equipment standard 1]",
            "[Process or equipment standard 2]",
        ],
    },
];
