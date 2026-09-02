// Real values used for the original COLD Community NEMT build.
// See src/_data/services.js in the main template for the generic version.
//
// NOTE: the Dialysis Loyalty Program mention that originally lived in the
// Dialysis Transportation `note` field is intentionally omitted here — that's
// documented separately as a reusable pattern in
// pattern-notes/recurring-discount-program.md, not baked into this example
// data. If rebuilding a real NEMT site from this example, re-add a note like:
// "Dialysis Loyalty Program: Private-pay patients who pre-pay a full month
// of trips receive a 10% discount, with consistent scheduling and
// predictable costs." — see that pattern note for the reasoning behind it.

module.exports = [
    {
        slug: "dialysis",
        icon: "/assets/svgs/icon-clock.svg",
        title: "Dialysis Transportation",
        teaser: "Consistent, on-time transport, three times a week, every week, without exception.",
        body: [
            "Getting to dialysis isn't optional. Three appointments a week, every week, and a missed ride isn't just an inconvenience. It can be a medical emergency.",
            "We specialize in dialysis transport because we understand what's at stake. We arrive on time, every time, and we start as early as 4:00 AM Monday through Friday so you never miss an early morning treatment. Because we're family-operated, you always know who's picking you up.",
        ],
        bullets: [],
        note: "",
        ctaText: "Schedule Dialysis Transport",
    },
    {
        slug: "wheelchair",
        icon: "/assets/svgs/icon-wheelchair.svg",
        title: "Wheelchair Accessible Transportation",
        teaser: "Fully accessible vehicle with certified tie-down equipment and a trained driver.",
        body: [
            "Our vehicle is fully wheelchair accessible with certified tie-down equipment and a trained driver. Every wheelchair transport is handled with care, patience, and professionalism.",
        ],
        bullets: [
            "Wheelchair tie-down inspected before every trip",
            "Driver trained in wheelchair securement and passenger assistance",
            "Door-through-door service, from your front door to your destination and back",
            "Fragrance-free, hospital-grade clean vehicle",
        ],
        note: "",
        ctaText: "Schedule Wheelchair Transport",
    },
    {
        slug: "hospital-discharge",
        icon: "/assets/svgs/icon-stretcher.svg",
        title: "Hospital Discharge Transportation",
        teaser: "Same-day and scheduled discharge transport with door-through-door assistance.",
        body: [
            "When it's time to go home, the last thing your family needs is an unreliable ride. We provide same-day and scheduled hospital discharge transportation with direct communication to family members or caregivers.",
        ],
        bullets: [
            "Confirmed before every pickup, with no surprises",
            "Door-through-door assistance, safely inside rather than left at the curb",
            "Climate-controlled, clean vehicle for comfort after a hospital stay",
            "Available Monday through Friday from 4:00 AM EST",
        ],
        note: "",
        ctaText: "Schedule Discharge Transport",
    },
    {
        slug: "doctor-appointments",
        icon: "/assets/svgs/icon-medical.svg",
        title: "Doctor Appointment Transportation",
        teaser: "Reliable rides to specialist visits, follow-ups, labs, and imaging.",
        body: [
            "Missing a specialist visit or follow-up can set back care significantly. We provide dependable, on-time transportation to all medical appointments, including specialist visits, labs, imaging, and follow-ups.",
        ],
        bullets: [
            "On-time arrival, ten minutes before your scheduled pickup",
            "Patient, unhurried service with no rushing",
            "Ambulatory and wheelchair accessible",
        ],
        note: "",
        ctaText: "Schedule an Appointment Ride",
    },
    {
        slug: "physical-therapy",
        icon: "/assets/svgs/icon-care.svg",
        title: "Physical Therapy Transportation",
        teaser: "Dependable scheduling so patients never miss a session.",
        body: [
            "Physical therapy only works when patients show up consistently. We provide reliable, same-driver scheduling so your physical therapy patients arrive on time and ready to work.",
        ],
        bullets: [
            "Same driver, same routine, to build comfort and trust",
            "Door-through-door assistance, especially important for post-surgical patients",
            "Available Monday through Friday from 4:00 AM EST",
        ],
        note: "",
        ctaText: "Schedule Physical Therapy Transport",
    },
    {
        slug: "pharmacy",
        icon: "/assets/svgs/icon-medical.svg",
        title: "Pharmacy Pickup Transportation",
        teaser: "Convenient prescription and supply pickup so you never arrange a separate trip.",
        body: [
            "Don't let a prescription wait. We provide convenient pharmacy pickup transportation so managing medications is one less thing to worry about.",
        ],
        bullets: [],
        note: "",
        ctaText: "Schedule Pharmacy Transport",
    },
    {
        slug: "personal-trips",
        icon: "/assets/svgs/icon-care.svg",
        title: "Private Pay & Special Occasion Transportation",
        teaser: "Weddings, graduations, church, and family visits. Life doesn't stop at the front door.",
        body: [
            "Life doesn't stop at the front door. We provide personal transportation for seniors and mobility-limited riders who want to stay active, connected, and independent.",
        ],
        bullets: [
            "Grocery shopping and personal errands",
            "Church services and community events",
            "Family visits and special occasions, including weddings, graduations, and celebrations",
            "Restaurant outings and personal appointments",
        ],
        note: "Weekend and holiday trips are available with 7-day advance booking.",
        ctaText: "Schedule a Personal Trip",
    },
];
