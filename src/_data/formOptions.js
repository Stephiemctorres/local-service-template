// src/_data/formOptions.js
//
// Configurable dropdown options for the request/inquiry form on the
// schedule page. `serviceTypes` was a fixed NEMT list (Ambulatory,
// Wheelchair, Stretcher...) in the original build — now a client-configurable
// array so a coaching business, an irrigation company, a pet-inspection
// business, etc. can each supply their own options without touching the
// form's markup or the submit function.
//
// `fieldLabel` controls the visible label above the dropdown — "Service
// Type" made sense for NEMT, but "What do you need?" or "Session Type" or
// "Inspection Type" might fit a given client better.
//
// referralSources is left as-is below since "how did you hear about us"
// options are already generic across almost any local business.

module.exports = {
    fieldLabel: "[FIELD LABEL — e.g. 'What do you need?' / 'Service Type' / 'Session Type']",
    serviceTypes: [
        "[OPTION 1]",
        "[OPTION 2]",
        "[OPTION 3]",
    ],
    referralSources: [
        "Google Search",
        "Google Maps",
        "Referred by a friend or family member",
        "Facebook",
        "Received a flyer or rack card",
    ],
};
