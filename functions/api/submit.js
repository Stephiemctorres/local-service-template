// functions/api/submit.js
// Cloudflare Pages Function — handles the Schedule page booking form.
// Sends an email via Resend and logs the submission to a Google Sheet.
//
// This function runs on the Cloudflare Workers runtime, NOT through Eleventy's
// build — it can't safely import src/_data/client.js directly (that file uses
// process.env.ELEVENTY_ENV, which doesn't exist here). Instead, every
// business-specific value below is read from context.env. When setting up a
// new client site, copy the matching values from src/_data/client.js into the
// Cloudflare Pages dashboard (Settings > Environment Variables):
//
//   RESEND_API_KEY          — from resend.com after verifying the client's domain
//   GOOGLE_SHEET_WEBHOOK     — the Google Apps Script web app URL
//   BOOKING_EMAIL_FROM       — client.bookingEmail.from  (sender identity, Resend-verified)
//   BOOKING_EMAIL_DISPATCH   — client.bookingEmail.dispatch  (real inbox staff checks)
//   BUSINESS_NAME            — client.name
//   BUSINESS_LEGAL_FOOTER    — client.legalName + city/state, e.g.
//                              "COLD Community Non-Emergency Medical Transportation, LLC · Phenix City, AL"
//   BUSINESS_PHONE_FORMATTED — client.phoneFormatted
//   BUSINESS_PHONE_TEL       — client.phoneForTel (digits only, no dashes)
//   BUSINESS_DOMAIN          — client.domain, no trailing slash, e.g. "https://www.example.com"
//   BUSINESS_LOGO_URL        — absolute URL to the DARK-BACKGROUND logo variant
//                              (these emails use a navy header, same reason the
//                              site needs a separate light-bg/dark-bg logo — see
//                              pattern-notes/logo-contrast.md)
//   BUSINESS_HOURS_WEEKDAY   — client.hours.weekday
//   BUSINESS_HOURS_WEEKEND   — client.hours.weekend
//
// Never hard-code any of the above in this file.

export async function onRequestPost(context) {
    try {
        const input = await context.request.formData();
        const data = {};
        for (const [key, value] of input) {
            if (data.hasOwnProperty(key)) {
                // Repeated keys (e.g. multiple checked "recurringdays" boxes) become an array
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // Very basic required-field check so we don't send blank emails
        const required = ["firstname", "lastname", "phone", "pickup", "destination", "date", "time", "servicetype"];
        for (const field of required) {
            if (!data[field]) {
                return new Response(
                    JSON.stringify({ success: false, error: `Missing required field: ${field}` }),
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            }
        }

        const env = context.env;

        // Send notification email via Resend, if the API key is configured
        if (env.RESEND_API_KEY) {
            const icsContent = buildIcsAttachment(data, env);
            const resendPayload = {
                from: env.BOOKING_EMAIL_FROM,
                to: env.BOOKING_EMAIL_DISPATCH,
                subject: `New Ride Request — ${data.firstname} ${data.lastname} — ${data.date} ${formatTime12Hour(data.time)} ${formatTimezoneName(data.timezone)}`,
                html: buildDispatchHtml(data, env),
                text: buildEmailBody(data, env),
            };
            if (icsContent) {
                resendPayload.attachments = [
                    {
                        filename: "ride-request.ics",
                        content: btoa(icsContent),
                    },
                ];
            }
            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${env.RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resendPayload),
            });
        }

        // Send a confirmation email to the rider, if they provided one.
        // This is a "we received it" acknowledgment, NOT a booking confirmation —
        // staff still confirm availability by phone/text separately.
        if (data.email && env.RESEND_API_KEY) {
            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${env.RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: env.BOOKING_EMAIL_FROM,
                    to: data.email,
                    subject: `We received your ride request — ${env.BUSINESS_NAME}`,
                    html: buildRiderConfirmationHtml(data, env),
                }),
            });
        }

        // Log to Google Sheet backup, if the webhook is configured
        if (env.GOOGLE_SHEET_WEBHOOK) {
            await fetch(env.GOOGLE_SHEET_WEBHOOK, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        return new Response(
            JSON.stringify({ success: false, error: err.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

function formatTime12Hour(timeStr) {
    if (!timeStr) return "";
    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    if (isNaN(hour)) return timeStr;
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour}:${minuteStr} ${ampm}`;
}

function formatTimezoneName(tz) {
    if (tz === "EST") return "Eastern Time";
    if (tz === "CST") return "Central Time";
    return tz || "";
}

function shiftHour(timeStr, hoursDelta) {
    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    if (isNaN(hour)) return timeStr;
    hour = ((hour + hoursDelta) % 24 + 24) % 24;
    return `${String(hour).padStart(2, "0")}:${minuteStr}`;
}

function formatTimeWithBothZones(timeStr, tz) {
    if (!timeStr) return "";
    const primary = formatTime12Hour(timeStr);
    if (tz === "EST") {
        // Central is always 1 hour behind Eastern
        const central = formatTime12Hour(shiftHour(timeStr, -1));
        return `${primary} Eastern (${central} Central)`;
    }
    if (tz === "CST") {
        // Eastern is always 1 hour ahead of Central
        const eastern = formatTime12Hour(shiftHour(timeStr, 1));
        return `${primary} Central (${eastern} Eastern)`;
    }
    return primary;
}

// Converts a rider's selected time to its Eastern-equivalent, since this
// business's own calendar/dispatch runs on Eastern Time regardless of which
// zone the rider picked. NOTE: this dual-timezone logic is only needed for
// clients whose service area actually straddles a timezone line (this
// project's original client served AL/GA across Eastern & Central). A
// single-timezone client should have this simplified away — see
// pattern-notes/dual-timezone-email.md.
function toEasternTime(timeStr, tz) {
    if (tz === "CST") return shiftHour(timeStr, 1);
    return timeStr;
}

function buildIcsAttachment(data, env) {
    if (!data.date || !data.time) return null;
    const [year, month, day] = data.date.split("-");
    const easternTime = toEasternTime(data.time, data.timezone);
    const [hour, minute] = easternTime.split(":");
    const pad = (n) => String(n).padStart(2, "0");
    const dtStart = `${year}${month}${day}T${pad(hour)}${pad(minute)}00`;
    const endHour = (parseInt(hour, 10) + 1) % 24;
    const dtEnd = `${year}${month}${day}T${pad(endHour)}${pad(minute)}00`;

    const summary = `Ride: ${data.firstname || ""} ${data.lastname || ""}`.trim();
    const descLines = [
        `Pickup: ${data.pickup || ""}`,
        `Destination: ${data.destination || ""}`,
        `Phone: ${data.phone || ""}`,
        `Service: ${data.servicetype || ""}`,
    ];
    const description = descLines.join("\\n");
    const location = data.pickup || "";

    return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        `PRODID:-//${env.BUSINESS_NAME}//Booking//EN`,
        "BEGIN:VEVENT",
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");
}

function buildGoogleCalendarLink(data) {
    if (!data.date || !data.time) return "";
    const [year, month, day] = data.date.split("-");
    const easternTime = toEasternTime(data.time, data.timezone);
    const [hour, minute] = easternTime.split(":");
    const pad = (n) => String(n).padStart(2, "0");
    const startStr = `${year}${month}${day}T${pad(hour)}${pad(minute)}00`;
    const endHour = (parseInt(hour, 10) + 1) % 24;
    const endStr = `${year}${month}${day}T${pad(endHour)}${pad(minute)}00`;

    const text = encodeURIComponent(`Ride: ${data.firstname || ""} ${data.lastname || ""}`.trim());
    const details = encodeURIComponent(
        `Pickup: ${data.pickup || ""}\nDestination: ${data.destination || ""}\nPhone: ${data.phone || ""}\nService: ${data.servicetype || ""}`
    );
    const location = encodeURIComponent(data.pickup || "");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startStr}/${endStr}&details=${details}&location=${location}&ctz=America/New_York`;
}

function buildDispatchHtml(data, env) {
    const riderName = `${data.firstname || ""} ${data.lastname || ""}`.trim();
    const phoneDigits = (data.phone || "").replace(/[^\d+]/g, "");
    const googleCalLink = buildGoogleCalendarLink(data);

    const recurringDays = data.recurringdays
        ? (Array.isArray(data.recurringdays) ? data.recurringdays.join(", ") : data.recurringdays)
        : "";

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&family=Lora:wght@600;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background-color:#E6EEF2; font-family: 'Quicksand', Verdana, Geneva, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#E6EEF2; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color:#ffffff; border-radius: 12px; overflow: hidden;">

          <tr>
            <td style="background-color:#0B2D4D; padding: 20px 32px; text-align:center;">
              <img src="${env.BUSINESS_LOGO_URL}" alt="${env.BUSINESS_NAME}" width="160" style="display:block; margin: 0 auto 8px; max-width: 160px; height: auto;">
              <span style="font-family: 'Lora', Georgia, serif; color:#ffffff; font-size: 14px; font-weight: 700;">New Ride Request</span>
            </td>
          </tr>

          <tr>
            <td style="padding: 28px 32px 8px;">
              <p style="margin:0 0 4px; font-family: 'Lora', Georgia, serif; font-size: 20px; font-weight: 700; color:#0B2D4D;">${riderName || "New rider"}</p>
              <p style="margin:0 0 20px; font-size: 15px; color:#666666;">${formatTimeWithBothZones(data.time, data.timezone)} &middot; ${data.date || ""}</p>
            </td>
          </tr>

          <!-- Quick actions -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  ${phoneDigits ? `
                  <td style="padding-right: 8px;">
                    <a href="tel:${phoneDigits}" style="display:block; text-align:center; background-color:#3FA6A6; border-radius: 8px; padding: 12px 8px; color:#ffffff; font-size: 14px; font-weight: 700; text-decoration: none;">&#128222; Call</a>
                  </td>
                  <td style="padding-right: 8px;">
                    <a href="sms:${phoneDigits}" style="display:block; text-align:center; background-color:#0B2D4D; border-radius: 8px; padding: 12px 8px; color:#ffffff; font-size: 14px; font-weight: 700; text-decoration: none;">&#128172; Text</a>
                  </td>` : ""}
                  ${data.email ? `
                  <td style="${phoneDigits ? "" : "padding-right: 8px;"}">
                    <a href="mailto:${data.email}" style="display:block; text-align:center; background-color:#666666; border-radius: 8px; padding: 12px 8px; color:#ffffff; font-size: 14px; font-weight: 700; text-decoration: none;">&#9993; Email</a>
                  </td>` : ""}
                  ${googleCalLink ? `
                  <td>
                    <a href="${googleCalLink}" style="display:block; text-align:center; background-color:#125B6E; border-radius: 8px; padding: 12px 8px; color:#ffffff; font-size: 14px; font-weight: 700; text-decoration: none;">&#128197; Add to Cal</a>
                  </td>` : ""}
                </tr>
              </table>
              <p style="margin: 8px 0 0; font-size: 12px; color:#999999;">A calendar file is also attached to this email for Outlook, Apple Calendar, or others.</p>
            </td>
          </tr>

          <tr><td style="padding: 0 32px;"><hr style="border:none; border-top:1px solid #E6EEF2; margin:0;"></td></tr>

          <tr>
            <td style="padding: 24px 32px;">
              <p style="margin:0 0 12px; font-family: 'Lora', Georgia, serif; font-size: 14px; font-weight: 700; color:#0B2D4D; text-transform: uppercase; letter-spacing: 0.04em;">Trip Details</p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color:#333333;">
                <tr><td style="padding: 4px 0; color:#666666; width: 130px;">Pickup</td><td style="padding: 4px 0;">${data.pickup || ""}</td></tr>
                <tr><td style="padding: 4px 0; color:#666666;">Destination</td><td style="padding: 4px 0;">${data.destination || ""}</td></tr>
                <tr><td style="padding: 4px 0; color:#666666;">Service Type</td><td style="padding: 4px 0;">${data.servicetype || ""}</td></tr>
                <tr><td style="padding: 4px 0; color:#666666;">Round Trip</td><td style="padding: 4px 0;">${data.roundtrip || "Not specified"}</td></tr>
                <tr><td style="padding: 4px 0; color:#666666;">Recurring</td><td style="padding: 4px 0;">${data.recurring || "One-time"}${recurringDays ? " (" + recurringDays + ")" : ""}</td></tr>
                <tr><td style="padding: 4px 0; color:#666666;">Urgency</td><td style="padding: 4px 0;">${data.urgency || "Not specified"}</td></tr>
                <tr><td style="padding: 4px 0; color:#666666;">Preferred Contact</td><td style="padding: 4px 0;">${data.contactmethod || "Not specified"} ${data.oktotext === "Yes" ? "(OK to text)" : ""}</td></tr>
              </table>
            </td>
          </tr>

          ${data.notes ? `
          <tr><td style="padding: 0 32px;"><hr style="border:none; border-top:1px solid #E6EEF2; margin:0;"></td></tr>
          <tr>
            <td style="padding: 24px 32px;">
              <p style="margin:0 0 8px; font-family: 'Lora', Georgia, serif; font-size: 14px; font-weight: 700; color:#0B2D4D; text-transform: uppercase; letter-spacing: 0.04em;">Special Notes</p>
              <p style="margin:0; font-size: 14px; color:#333333;">${data.notes}</p>
            </td>
          </tr>` : ""}

          <tr>
            <td style="background-color:#E6EEF2; padding: 16px 32px; text-align:center;">
              <span style="font-size: 12px; color:#666666;">Submitted ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST via ${env.BUSINESS_DOMAIN.replace(/^https?:\/\//, "").replace(/^www\./, "")}</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
}

function buildEmailBody(data, env) {
    const domain = env.BUSINESS_DOMAIN.replace(/^https?:\/\//, "").replace(/^www\./, "");
    return `
New ride request submitted via ${domain}

RIDER INFORMATION
Name: ${data.firstname} ${data.lastname}
Phone: ${data.phone}
Email: ${data.email || "Not provided"}
Preferred contact method: ${data.contactmethod || "Not specified"}
OK to text: ${data.oktotext || "Not specified"}

TRIP DETAILS
Pickup Address: ${data.pickup}
Destination: ${data.destination}
Date: ${data.date}
Time: ${formatTimeWithBothZones(data.time, data.timezone)}
Service Type: ${data.servicetype}
Round Trip: ${data.roundtrip || "Not specified"}
Recurring Ride: ${data.recurring || "One-time"}
${data.recurringdays ? `Recurring Days: ${Array.isArray(data.recurringdays) ? data.recurringdays.join(", ") : data.recurringdays}` : ""}
Urgency: ${data.urgency || "Not specified"}

ADDITIONAL INFO
How they heard about us: ${data.referralsource || "Not specified"}
${data.referralname ? `Referred by: ${data.referralname}` : ""}
${data.facilityname ? `Facility: ${data.facilityname}` : ""}
Special Notes: ${data.notes || "None"}

Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST
    `.trim();
}

function buildRiderConfirmationHtml(data, env) {
    const firstName = data.firstname || "there";
    const phoneFormatted = env.BUSINESS_PHONE_FORMATTED;
    const phoneForTel = env.BUSINESS_PHONE_TEL;

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&family=Lora:wght@600;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background-color:#E6EEF2; font-family: 'Quicksand', Verdana, Geneva, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#E6EEF2; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; background-color:#ffffff; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="background-color:#0B2D4D; padding: 24px 32px; text-align:center;">
              <img src="${env.BUSINESS_LOGO_URL}" alt="${env.BUSINESS_NAME}" width="180" style="display:block; margin: 0 auto 12px; max-width: 180px; height: auto;">
              <span style="font-family: 'Lora', Georgia, 'Times New Roman', serif; color:#ffffff; font-size: 16px; font-weight: 700;">${env.BUSINESS_NAME}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="margin:0 0 16px; font-family: 'Quicksand', Verdana, Geneva, sans-serif; font-size: 16px; color:#333333; line-height: 1.6;">Hi ${firstName},</p>
              <p style="margin:0 0 16px; font-family: 'Quicksand', Verdana, Geneva, sans-serif; font-size: 16px; color:#333333; line-height: 1.6;">
                Thank you for requesting a ride with ${env.BUSINESS_NAME}. We've received your request for
                <strong>${data.date || "your requested date"}</strong> at <strong>${formatTimeWithBothZones(data.time, data.timezone) || "your requested time"}</strong>,
                and we'll be contacting you shortly to confirm availability and finalize your booking.
              </p>
              <p style="margin:0 0 24px; font-family: 'Quicksand', Verdana, Geneva, sans-serif; font-size: 16px; color:#333333; line-height: 1.6;">
                If you need us before you hear from us, please give us a call:
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 0 24px;">
                <tr>
                  <td style="background-color:#3FA6A6; border-radius: 8px; padding: 14px 24px;">
                    <a href="tel:${phoneForTel}" style="font-family: 'Lora', Georgia, serif; color:#ffffff; font-size: 18px; font-weight: 700; text-decoration: none;">
                      &#128222; ${phoneFormatted}
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0; font-family: 'Quicksand', Verdana, Geneva, sans-serif; font-size: 14px; color:#666666; line-height: 1.6;">
                ${env.BUSINESS_HOURS_WEEKDAY}<br>
                ${env.BUSINESS_HOURS_WEEKEND}.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#E6EEF2; padding: 20px 32px; text-align:center;">
              <span style="font-family: 'Quicksand', Verdana, Geneva, sans-serif; font-size: 12px; color:#666666;">${env.BUSINESS_LEGAL_FOOTER}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
}
