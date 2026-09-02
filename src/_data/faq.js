// src/_data/faq.js
//
// Frequently asked questions, shown visibly on the home page AND output as
// FAQPage structured data (see components/home-schema.html). This is the
// single highest-leverage thing a small local-service site can do for
// AI-search visibility (GEO/AEO) in 2026 — see
// pattern-notes/geo-aeo-answer-copy.md for why, and how to write these well.
//
// Write each question the way a real customer would actually type or ask
// it aloud — not the way a business would phrase it internally. Keep each
// answer direct and complete in 40-60 words: state the actual answer in
// the first sentence, then add detail after. This is what both AI systems
// and skimming humans need — lead with the answer, not the setup.
//
// Set to an empty array to hide the FAQ section entirely (also removes the
// FAQPage schema automatically, since the template checks faq.length).

module.exports = [
    {
        question: "[QUESTION A REAL CUSTOMER WOULD ASK — e.g. 'How much does X cost?']",
        answer: "[DIRECT ANSWER FIRST, in one sentence. Then one more sentence of relevant detail if needed. No filler, no throat-clearing.]",
    },
    {
        question: "[QUESTION 2]",
        answer: "[ANSWER 2]",
    },
    {
        question: "[QUESTION 3]",
        answer: "[ANSWER 3]",
    },
];
