// src/_data/processAccordion.js
//
// Home-page accordion (the "Vehicle & Safety Standards" section in the
// original NEMT build, generalized to "whatever quality/process claims this
// business wants to expand on"). Any number of items — the template loops
// over whatever's here. Delete the whole section on a client site that
// doesn't need this level of process detail on the home page.
//
// See examples/nemt-cold-community/data/processAccordion.js for a filled-in
// real-world reference (5 items: disinfection, fragrance-free, non-smoking,
// climate control, equipment inspection).

module.exports = [
    {
        title: "[PROCESS/STANDARD ITEM 1]",
        text: "[One or two sentences of detail — why this matters, what the client can expect.]",
    },
    {
        title: "[PROCESS/STANDARD ITEM 2]",
        text: "[Detail 2]",
    },
];
