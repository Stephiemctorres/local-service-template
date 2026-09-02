// src/_data/client.js
//
// Single source of truth for this client's identity/contact info. Fill in
// every [BRACKETED] value below at new-client setup. See the Phase 3
// checklist in template-extraction-plan.md.
//
// `owners` is intentionally a single free-text field, not a fixed-count
// structure — it works equally well as "Jane Doe" (one owner), "Jane Doe &
// John Smith" (two), or "The Rivera Family" / "Our Team" for anything larger.
// Templates build sentences like "Founded by {{ client.owners }}" around
// this, so the copy never assumes a specific ownership structure.
//
// See examples/nemt-cold-community/data/client.js for a filled-in
// real-world reference.
module.exports = {
    name: "[BUSINESS NAME]",
    legalName: "[LEGAL BUSINESS NAME]",
    tagline: "[SHORT TAGLINE]",
    email: "[PUBLIC CONTACT EMAIL]",
    // Booking/inquiry-form email config — used by functions/api/submit.js,
    // if this client site uses that form at all (see README's note on the
    // form being optional). Modeled as two separate fields because they do
    // two genuinely different jobs:
    bookingEmail: {
        // SENDER address for notification + confirmation emails. Only needs
        // to exist as a verified sending identity in Resend — it does NOT
        // need to be a real monitored inbox.
        from: "[SENDER EMAIL — e.g. notifications@clientdomain.com]",
        // RECIPIENT address for new-inquiry notifications — the real inbox
        // a person actually checks. Often the same as `email` above, but
        // kept separate since some clients may want inquiries routed
        // somewhere other than their public contact address.
        dispatch: "[RECIPIENT/INBOX EMAIL]",
    },
    phoneForTel: "[PHONE — digits only, e.g. 3345551234]",
    phoneFormatted: "[PHONE — formatted, e.g. (334) 555-1234]",
    owners: "[OWNER NAME(S) — one owner, two, or a team/family name — see comment above]",
    address: {
        lineOne: "[SHORT SERVICE-AREA LINE — e.g. 'Serving Anytown, ST']",
        lineTwo: "[LONGER SERVICE-AREA DETAIL — e.g. county/region list, or delete if not needed]",
        city: "[CITY]",
        state: "[STATE]",
        zip: "",
        country: "US",
        mapLink: "[GOOGLE MAPS LINK]",
    },
    hours: {
        weekday: "[WEEKDAY HOURS]",
        weekend: "[WEEKEND HOURS, or 'Closed weekends']",
    },
    // Structured data support — used by home-schema.html for the site's
    // LocalBusiness JSON-LD (this is what GEO/AEO and Google's AI Overviews
    // actually read). Kept separate from the friendly `hours` strings above
    // because schema.org needs machine-parseable days/times, not prose.
    //
    // schemaType: the schema.org business type. "LocalBusiness" is a safe
    // generic default that works for any client. Use a more specific type
    // when one clearly applies (e.g. "MedicalBusiness", "SportsActivityLocation",
    // "ProfessionalService") — more specific types give AI systems a clearer
    // signal, but only use one that's actually accurate.
    schemaType: "LocalBusiness",
    // serviceAreas: plain list of areas served, e.g. ["Lee County, AL"].
    // Leave empty to omit areaServed from the schema entirely.
    serviceAreas: [],
    // hoursSchema: structured version of the hours above, for JSON-LD only.
    // Each entry: { days: [...], opens: "HH:MM", closes: "HH:MM" }. Leave
    // empty to omit openingHoursSpecification from the schema entirely.
    hoursSchema: [],
    socials: {
        facebook: "[FACEBOOK URL, or delete]",
        instagram: "[INSTAGRAM URL, or delete]",
    },
    //! Make sure you include the file protocol (e.g. https://) and no trailing slash
    domain: "[https://www.clientdomain.com]",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
}
