# THE CORPORATE HUB — DEVELOPMENT GUIDELINES (FINAL)
**Public Website + Private Platform — front-end amendments**

---

## SCOPE NOTE (please read first)

All items below are **front-end amendments** to the existing Corporate Hub website and platform: branding, text, layout, static UI, client-side language switching, forms (capture + email), and a client-side cookie banner.

No back-end development is requested here. **Real authentication, account activation, administrator-approval workflow, activation emails, sessions and access control are handled separately by the back-end team.** Where an item could be read as back-end, the intended front-end scope is stated explicitly. This is the same split already applied to the Global Investment Hub and EquusChain.

---

## HOSTING & STACK (please confirm before proceeding)

The site will be hosted on a product where **a second Node.js runtime is not available** (the single Node.js slot is already used by another application). Therefore:

- The site must run as **static files** on the host (HTML/CSS/JS). A **React/JSX** build is acceptable **as a client-side SPA**: React/JSX compiles to static assets, and **Node.js is only used at build time on your side — not at runtime on the server**.
- **No Server-Side Rendering and no Node server** (e.g. no Next.js SSR / no running Node process). Please deploy the **static build output** (the `dist/` / `build/` folder).
- The **contact / Request Access form** must send email via a **PHP mail handler using SMTP authentication** (not a Node endpoint, not PHP `mail()`), exactly as on the other sites.
- For client-side routing, include an **`.htaccess` rewrite** so that all routes and page refreshes serve `index.html` (no 404 on deep links).
- The **Private Platform must be deployed in its own dedicated subfolder** (e.g. `/private/`), set to **`noindex`** and disallowed in **`robots.txt`**, so access can be restricted at hosting level until the back-end access control is in place.

Please confirm the build is a client-side static SPA (no Node runtime) before starting.

---

# PUBLIC WEBSITE

## 1. Header & Branding
- Replace the logo in the top-left corner with the attached logo.
- Remove the text "PART OF THE EQUUSCHAIN ECOSYSTEM" entirely.
- Ensure the gold used throughout matches exactly the gold of the official EquusChain logo.
- Customise the cursor into a subtle branded dot using the site's green palette. **Implement it in CSS (lightweight) — not a heavy image — to avoid lag.**

## 2. Navigation Menu
Rename the menu items to: **Overview · The Network · Capabilities · Membership · Ecosystem · Request Access**.
- Make sure the on-page **section titles match these labels exactly**.

## 3. Hero Section
- Remove the box containing the four squares ("Multi-Industry Sectors" and "Capability Pillars").
- The "Curated, not open" text should appear in a natural, integrated way (not in the current highlighted/light box) — part of the design composition rather than a separate callout.

## 4. "What We Are" Section
- Remove the sentence beginning "This is not an open marketplace …".

## 5. Emojis
- Remove **all emojis** across the entire website, including the **Member Capabilities** and **Built on Trust** sections.
- Ensure a consistent premium, professional visual language throughout.

## 6. Member Capabilities
- Remove all emojis.
- Improve spacing and typography where necessary to maintain a luxury feel.

## 7. Built on Trust
- Keep the existing principles and content.
- Remove all emojis.
- Remove the frame/border around the statement while keeping the statement itself.
- Improve the overall presentation — more elegant, refined, aligned with a high-end private network.

## 8. Part of EquusChain
- Remove the table currently displayed in this section.
- Remove the dash in the "Collective Capability" section.

## 9. Footer
- Remove the footer menu title currently labeled "EquusChain".
- Under it, create a single footer item named "EquusChain" linking directly to the EquusChain website.
- In the Contact section, link the contact form.
- (The legal entity line with the UAE address is specified in section 16 below.)

---

# PRIVATE PLATFORM

## 10. Sign-In Page
- Remove the dash ( - ) appearing after "Market Intelligence" on the left side of the sign-in page.
- Replace the logo in the top-left corner with the attached logo.
- Remove the four statistic cards entirely: **Verified Members**, **Opportunities**, **Intelligence**, **Countries**.

## 11. Dashboard / Platform Structure
- Remove the current "Network" section.
- Rename the current "Providers" section to "Network".

## 12. New Section — "Trainings & Courses"
Add a new section below "Opportunities" named **"Trainings & Courses"**, designed consistently with the rest of the platform, presenting:
- Professional trainings · Executive education · Industry masterclasses · Certification programs
- The user should be able to **select one option**.

**Scope:** this is a **static front-end section with a simple selector** that displays the corresponding **static content**. **No course-management, enrollment, payment, or LMS back-end** is required in this phase.

---

# SHARED (both platforms)

## 13. Languages
Add a language selector on **both** the Public Website and the Private Platform (client-side switching), supporting:
English · French · Italian · Spanish · German · Portuguese · Arabic · Russian · Mandarin Chinese · Hindi · Japanese

- The selector should be elegant, discreet, and fully integrated into the navigation.
- Both platforms use the **same language structure**; the architecture should be scalable for future languages.
- **Arabic must display correctly in right-to-left (RTL)** without breaking the layout, on both platforms.

## 14. Request Access — Terms, Privacy & Newsletter
**Scope note:** the "Request Access" form is the **existing Apply / Join access form, renamed and adjusted — not a new build.**

On the "Request Access" form, add two checkboxes:
- ☐ *"I would like to subscribe to The Corporate Hub's curated newsletter."* — **optional**
- ☐ *"I confirm that I have read and agree with the Terms & Conditions and Privacy Policy."* — **mandatory** (the form cannot be submitted unless ticked)
- "Terms & Conditions" and "Privacy Policy" must each link to their respective standalone pages.
- **Legal pages (Privacy Policy, Terms & Conditions, Cookies) — configurable links, not hard-coded text:** do **not** hard-code any placeholder or AI-generated legal text into the site. Implement these as **configurable links** (external URLs or placeholder destinations) so we can connect our own final legal documents later by simply updating the link targets — **no redesign or redevelopment required**. Until the final documents are provided, the links should point to designated external URLs or placeholder destinations. The same applies to the "Learn more about our cookies" link in the cookie banner (section 17).
- **Newsletter (scope):** implement as a **front-end capture only** (checkbox + email submitted with the form). **No third-party email-marketing integration** in this phase.

## 15. Favicon
Use the attached logo emblem as the favicon, consistently across the Public Website, Private Platform, browser tabs, and mobile bookmarks/shortcuts where applicable.

## 16. Footer Disclaimer
Replace the existing disclaimer with the following. Display the two identity lines first (the UAE flag precedes the address), then the legal paragraph:
> © 2026 The Corporate Hub — a brand of EquusChain Ltd. All rights reserved.
> 🇦🇪 EquusChain Ltd, ADGM, Al Maryah Island, Abu Dhabi, United Arab Emirates
>
> The information contained on this website is provided for informational purposes only and does not constitute investment, legal, tax, or financial advice, nor an offer or solicitation to buy or sell any security, financial instrument, or asset. Access to certain services and opportunities may be restricted based on jurisdiction, investor classification, and applicable laws. Investments involve risk, including the possible loss of capital. Users are responsible for ensuring compliance with the laws and regulations applicable to them.

## 17. Cookie Management
Implement a cookie consent banner — **client-side only (localStorage), no back-end**. It appears on first visit and remains until the user accepts or refuses; accessible (readable contrast, mobile-clickable buttons, keyboard-navigable).

**Text (use exactly):**
- Title: *"We use cookies"*
- Body: *"We use cookies to improve your experience, analyze site usage, and, if you wish, to offer you personalized content and offers. Some cookies are essential for the site to function (session, security). Other cookies (analytics, marketing, tracking) require your prior consent."*

**Buttons (use exactly):** **"Refuse non-essential cookies"** · **"Accept non-essential cookies"** · *(optional)* **"Customize"**
- Link below the buttons: *"Learn more about our cookies"* → Privacy Policy (or a dedicated Cookies page).

**Consent / behaviour:**
- Active opt-in only — no "by continuing you accept". Nothing non-essential is enabled by default.
- "Refuse" sits at the **same level** as "Accept".
- No analytics / marketing / tracking script runs **before** consent; such scripts load only after "accept".
- Store consent in `localStorage` (e.g. key `corporatehub_cookies_consent` = `"accepted"` / `"rejected"`), valid ~6–12 months; the user can change it at any time.
- Cookie preferences accessible from the **footer**.
- Consistent visual identity with the rest of the platform.

## 18. Public Website ↔ Private Platform Integration (front-end scope)
The intended end-to-end model is: a visitor submits the **Request Access** form → an administrator reviews and approves → the user receives activation/credentials → the user can access the private platform; unauthorised users are redirected to login and platform content stays inaccessible without authentication.

**Front-end scope for these amendments:**
- Build the **Request Access** form (capture + email via PHP/SMTP).
- Wire the public site to the **private platform's Sign-In screen** (front-end UI).
- **The account activation, administrator-approval workflow, activation emails, sessions and real access control are handled by the back-end team — not in these front-end amendments.**
- **Interim:** until the back-end access control is live, the private platform (in its own `/private/` subfolder) is **access-restricted at hosting level** (password-protected directory) and set to `noindex`.

---

## Brand marks
If a trademark symbol is shown on "The Corporate Hub" or "EquusChain", use **™** (not ®), unless/until the mark is officially registered with a trademark office.

## Note on this document
Minor refinements may follow **within the same front-end scope**. Any **new functionality** (back-end, authentication logic, dynamic data, third-party integrations) is **out of scope** and will be quoted separately.

## Attachments referenced
- The Corporate Hub logo (header + sign-in)
- Logo emblem (favicon)
