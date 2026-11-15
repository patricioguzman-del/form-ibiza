# 04 · Technical architecture: FORM | ibiza

**Written for:** Patricio (non-developer) and Claude Code (the builder).
**Inputs:** `01-brand-dna.md`, `02-content-inventory.md`, `03-design-system.md`, the direction A canvas.
**Rule for Claude Code:** this file is the plan. Build milestone by milestone (section 10), stop after each, and wait for approval.

---

## The plan on one page

| Piece | Choice | In plain words |
|---|---|---|
| Website | **Next.js 16** (App Router, TypeScript) | The site itself. Fast, and the best-supported framework for AI-assisted building |
| Look | **Tailwind CSS** with FORM's design tokens | Every colour, size and space comes from the design system, nowhere else |
| Hosting | **Vercel Pro** | Where the site lives. Made by the same company as Next.js |
| Content | **Sanity** | Where the team edits listings, pages and team bios. No developer needed |
| Private Office and enquiries | **Supabase** | Stores registered clients, approvals and a backup copy of every enquiry |
| Email | **Resend** | Sends enquiry alerts and the "you're approved" emails |
| CRM | **Inmovilla**, via a connector built so it can be switched on later | Enquiries flow in once Inmovilla confirms it accepts them |
| Analytics | **Vercel Web Analytics** | Visitor numbers without tracking cookies |

---

## 1. Why this stack

- **Next.js** is the most widely used framework for this kind of site, and Claude Code builds it reliably. The current major version is 16, with 16.4.1 released on 15 October 2026 ([versio.io](https://www.versio.io/de/product-release-end-of-life-eol-vercel-nextjs.html)).
- **Vercel** is the natural host for Next.js. The free Hobby plan is only for personal, non-commercial projects, so a business site needs Pro ([modelence](https://modelence.com/compare/vercel-pricing)).
- **Sanity** gives the team a clean editing screen for listings and pages. Its free plan includes 20 user seats, 10,000 documents and 2 public datasets ([dev.to](https://dev.to/mr_manushukla/15-a-seat-plus-the-build-what-a-sanity-and-astro-content-platform-costs-in-2026-2j3p)). That's far more than FORM needs (23 listings today). There's also a Sanity connection available in this workspace.
- **Supabase** handles the two things Sanity shouldn't: people's personal data (registered clients, enquiries) and sign-in for the Private Office.
- **Why not stay on Wix:** Wix can't give clients a gated area with approvals, can't route enquiries to three places, and can't connect to Inmovilla the way FORM wants.

---

## 2. Where each kind of data lives

| Data | Lives in | Why |
|---|---|---|
| Listings, photos, descriptions, tags | Sanity | The team edits these. Sanity handles images well |
| Pages (Home, About, Sell, Rentals, Developers), team bios | Sanity | Same |
| Site settings (phone, email, WhatsApp link, footer text) | Sanity | One place to change them |
| Registered clients and their approval status | Supabase | Personal data. Needs secure sign-in |
| Enquiries (a backup copy of each one) | Supabase | So no lead is ever lost, even if email or Inmovilla fails |
| Newsletter subscribers | Supabase for now | Can move to a newsletter tool later |

**Decision for the owner (later, not blocking):** once Inmovilla is set up, does it become the master record for listings, with the website reading from it? For now, **Sanity is the master** for the website. The design keeps a field for the Inmovilla reference number on every listing, so the two can be linked later without a rebuild.

---

## 3. Content model (Sanity)

Built from the fields already in the Wix database (`02-content-inventory.md`, section 2), cleaned up.

**Property**
- Identity: name · slug · reference number · Inmovilla reference (empty for now)
- Status: **Public / Private Office / Under Offer / Sold / Hidden**. This replaces Wix's "listOnWebsite" switch
- Place: municipality (fixed list of Catalan names) · area · rough map position for the island map
- Price: **number** in euros · "Price on Application" switch. The site formats it as €8,750,000 automatically, so the "€8.750,000" errors can't happen again
- Specs, all **numbers**: bedrooms · bathrooms · built m² · plot m² · floors · year built
- Architect or designer (a linked list, so "Blakstad" is spelled once)
- Features (fixed list: Sea view, Sunset, Turnkey, Front line, Tennis court, Gated community, New build, Project, Tourist licence)
- Copy: short line · description (rich text) · location intro · travel times (place + minutes, repeatable)
- Media: card image · hero gallery · full gallery · video · brochure PDF · floor plans PDF. **Alt text is required on every image**
- Flags: featured on Home · order
- SEO: optional title and description overrides
- Translations: Spanish version of each text field (section 4)

**Also:** Page · Team member (name, role, languages, photo, email) · Site settings · Legal page (Privacy, Cookies, Legal Notice).

**Migration:** a one-off script copies the 23 Wix listings across, fixes the data errors listed in the inventory, and moves Can Terra, Ses Calas and Casa del Mar to **Private Office**. Photos are re-downloaded at full size from Wix's image server.

---

## 4. Languages

- **English at the root, Spanish under `/es/`.** For example `/sales/dragonfly` and `/es/ventas/dragonfly`.
- Each page tells search engines about its other-language version (the "hreflang" tags), so Google shows the right one.
- In Sanity, every text field has an English and a Spanish box side by side. English is required, Spanish optional. If a Spanish text is missing, that page simply has no Spanish version yet.
- The EN / ES switch keeps the visitor on the same page.
- Launch plan: English at launch, Spanish switched on once the translations are in. French and others later, with no rebuild needed.

---

## 5. The Private Office (gated section)

**How it works for a client**
1. Fills in the registration form.
2. Sees "Thank you. Your request is with us."
3. The team gets an email alert. One of them clicks **Approve** in a simple admin screen (`/admin`, team only).
4. The client gets an email with a sign-in link.
5. They sign in with a **one-time link sent to their email**. No passwords to remember or leak.
6. They see the private listings.

**How it stays private**
- Private listings are fetched **only on the server, only after checking the visitor is approved**. They're never sent to the browser otherwise.
- They are never in the sitemap and are marked "noindex", so search engines never list them.
- The three old Wix links for the private homes redirect to the Private Office sign-in page.
- Brochure PDFs for private homes are served through a protected link, not a public file address.

---

## 6. Enquiries: where they go

Every form (Buying, Selling, Renting, Request Information, Private Office, newsletter) follows the same path:

1. **Saved in Supabase first.** The safety net: no lead is ever lost.
2. **Emailed** to info@formibiza.com, with the form type and the property in the subject line, for example *"Buying enquiry · Dragonfly"*.
3. **Instant alert to the three agents.** Phase one: an email alert. WhatsApp alerts can come later.
4. **Sent to Inmovilla** once confirmed (below).

Plus: spam protection without CAPTCHAs (a hidden trap field and rate limits), a consent checkbox on every form with the time of consent stored, and the page the visitor came from recorded with each lead.

**Inmovilla: what's known and what isn't**
- Inmovilla offers a REST API with a token that the account holder creates in the CRM under *Ajustes > Opciones > Token para API Rest* ([glama.ai](https://glama.ai/mcp/servers/bfi60haez3)).
- A public open-source connector shows it reading property leads through that API ([glama.ai](https://glama.ai/mcp/servers/@laica-ayudavets/mcp-inmovilla/blob/7f9661c543fb984659f8beb9f876e5e094a4b049/src/tools/GetPropertyLeadsTool.ts)).
- **Not confirmed:** whether a website can *create* a new client or enquiry in Inmovilla through the API. Ask Inmovilla support directly before building this part.
- So the site is built with an "Inmovilla adapter" that is **off at launch**. Once confirmed, it's switched on with the token. Nothing else changes.

---

## 7. Integrations, now and later

| Integration | At launch | Later |
|---|---|---|
| Inmovilla (enquiries in) | Adapter ready, switched off | Switch on once confirmed |
| Inmovilla (listings, portals) | No | Optional sync by reference number |
| WhatsApp | Link to the agency's WhatsApp Business number | Alerts to agents |
| Newsletter | Stored in Supabase, exportable | A newsletter tool (e.g. Mailchimp) |
| JamesEdition / other portals | No (no feed today) | An XML feed from the site, or via Inmovilla |
| Analytics | Vercel Web Analytics | Google Search Console (owner to set up) |
| Viewing bookings | No | Calendar link per agent |

**Cookies:** Vercel Web Analytics doesn't use cookies. If nothing else on the site sets cookies, the banner can be very light. Have FORM's lawyer confirm what's required, as I'm not a lawyer.

---

## 8. Images

- Original photos go into Sanity at full size. Sanity resizes and serves the right size for each screen, in modern formats.
- Every image needs alt text before it can be published.
- The hero image loads first. Everything else loads as the visitor scrolls.
- **Needed from FORM:** original photo files for every listing. The Wix copies can be used as a stopgap.

---

## 9. SEO, speed and accessibility

**SEO**
- Fix the inherited problems: no "noindex" on Home, Sales or Rentals; a meta description on every page; one H1 per page; alt text everywhere.
- Structured data that Google reads: `RealEstateAgent` for FORM, a listing type for each property, `BreadcrumbList` on property pages.
- A sitemap that updates automatically, robots.txt, an `llms.txt` file for AI assistants, and a social sharing image for every page.
- All 29 redirects from the phase 2 map, live from day one.

**Speed targets**
- Lighthouse 95 or higher on all four scores, mobile and desktop.
- Largest image visible within 2.0 seconds on mobile.

**Accessibility**
- WCAG 2.1 AA: contrast, keyboard use, visible focus, labels on every field, reduced-motion respected.

---

## 10. Build milestones (phase 5)

Each milestone ends with a preview link and a short summary. Nothing goes live until milestone 9.

| # | Milestone | You review |
|---|---|---|
| 1 | Project setup: Next.js, design tokens, fonts, header, footer, menu, EN / ES switch | The shell on a preview link |
| 2 | Sanity set up with the content model; the 23 listings migrated and cleaned | The editing screen with real listings |
| 3 | Home and Sales (with filters) | Both pages, desktop and mobile |
| 4 | Property page (all 20 public listings) | Dragonfly plus two others |
| 5 | About, Sell, Rentals, Developers, Contact, legal pages, 404 | All content pages |
| 6 | Enquiries: all forms, Supabase backup, email alerts | Send a test enquiry of each type |
| 7 | Private Office: registration, approval screen, sign-in, private listings | Register, approve and sign in yourself |
| 8 | SEO, analytics, redirects, speed and accessibility pass | The QA report (phase 6) |
| 9 | Launch: domain moved from Wix, email (MX records) checked | Live site |
| 10 | Spanish switched on, once translations are in | The `/es/` pages |

---

## 11. Folder structure (for Claude Code)

```
form-ibiza/
├── app/
│   ├── [lang]/              (en at root, es under /es)
│   │   ├── page.tsx                Home
│   │   ├── sales/page.tsx          Sales with filters
│   │   ├── sales/[slug]/page.tsx   Property
│   │   ├── private-office/         Register, awaiting, listings, sign-in
│   │   ├── about/ sell/ rentals/ developers/ contact/
│   │   └── legal/[slug]/           Privacy, Cookies, Legal Notice
│   ├── admin/                      Team-only approval screen
│   ├── api/enquiry/                One endpoint for every form
│   ├── sitemap.ts  robots.ts  not-found.tsx
├── components/                     Header, Footer, PropertyCard, SpecBar, forms…
├── lib/
│   ├── sanity/                     Queries and image helpers
│   ├── supabase/                   Clients, leads, approvals
│   ├── email/                      Resend templates
│   ├── crm/inmovilla.ts            The adapter (off by default)
│   └── i18n/                       Dictionaries for interface text
├── sanity/                         Studio and schemas
├── scripts/migrate-wix.ts          One-off import of the 23 listings
├── styles/tokens.css               From the FORM design system
└── next.config.ts                  Includes the redirect map
```

---

## 12. Running costs per month (estimate)

| Item | Cost | Note |
|---|---|---|
| Vercel Pro | $20 per deploying seat, plus usage | One seat is enough. Includes $20 of usage credit ([stork.ai](https://www.stork.ai/blog/vercel-pricing-2026)). A site this size should stay within it |
| Sanity | $0 | Free plan is enough. Growth is $15 per seat per month if ever needed ([flowninja](https://www.flowninja.com/blog/sanity-cms-pricing)) |
| Supabase | $0 to start | Free tier likely enough. Check current limits before launch |
| Resend | $0 to start | Free tier likely enough. Check current limits |
| Domain | Already owned | Renewal stays with the current registrar |
| Fonts | **Unknown** | Depends on the licences FORM holds or buys |
| **Total** | **About $20/month plus font licences** | Not counting the build itself |

---

## 13. Open questions (none block milestones 1 to 5)

1. **Inmovilla:** can a website create enquiries through the API? Ask their support. *(Blocks switching on the adapter only.)*
2. **Fonts:** which licences does FORM hold? *(Blocks final typography; stand-ins work until then.)*
3. **Original photos** for all listings. *(Stand-ins until then.)*
4. **Who approves Private Office registrations:** all three agents, or one?
5. **WhatsApp Business number** for the agency.
6. **Domain access:** who controls the registrar and DNS for formibiza.com? *(Needed for milestone 9.)*
7. **Legal texts and company details** from FORM's lawyer. *(Needed before launch.)*
8. **Team details:** roles, languages and the group photo.
