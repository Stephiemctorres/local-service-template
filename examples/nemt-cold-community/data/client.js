module.exports = {
    name: "COLD Community NEMT",
    legalName: "COLD Community Non-Emergency Medical Transportation, LLC",
    tagline: "Safe, Reliable, Compassionate Transportation",
    email: "dispatch@coldcommunitynemt.com",
    // Booking-form email config — used by functions/api/submit.js.
    // Modeled as two separate fields because they do two genuinely
    // different jobs, and collapsing them caused real confusion on this project:
    bookingEmail: {
        // SENDER address for notification + confirmation emails. Only needs
        // to exist as a verified sending identity in Resend — it does NOT
        // need to be a real monitored inbox.
        from: "bookings@coldcommunitynemt.com",
        // RECIPIENT address for new-ride-request notifications — the real
        // inbox a person actually checks. Often the same business as
        // `email` above, but kept separate since some clients may want
        // booking notifications routed somewhere other than their public
        // contact address.
        dispatch: "dispatch@coldcommunitynemt.com",
    },
    phoneForTel: "334-520-4779",
    phoneFormatted: "(334) 520-4779",
    owners: "Abdul Wali Siddiq & Doris Siddiq",
    address: {
        lineOne: "Serving Phenix City, AL & Columbus, GA",
        lineTwo: "Lee & Russell Counties, AL · Muscogee & Harris Counties, GA",
        city: "Phenix City",
        state: "AL",
        zip: "",
        country: "US",
        mapLink: "https://maps.google.com/?q=Phenix+City+Alabama",
    },
    hours: {
        weekday: "Monday–Friday, 4:00 AM – 6:00 PM EST",
        weekend: "Weekends & holidays available with 7-day advance booking",
    },
    socials: {
        facebook: "https://www.facebook.com/",
        instagram: "https://www.instagram.com/",
    },
    //! Make sure you include the file protocol (e.g. https://) and no trailing slash
    domain: "https://www.coldcommunitynemt.com",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
}
