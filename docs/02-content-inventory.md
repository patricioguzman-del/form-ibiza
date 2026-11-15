# 02 · Content & URL Inventory: FORM | ibiza (formibiza.com)

**Audited:** 15 Nov 2026 · **Method:** sitemap, server HTML of all 29 URLs, the site's own listing database as published in the page code, and the live pages in Chrome.
**Reliability:** everything marked **(checked)** was read from the live site today. Anything I could not verify is in section 9.

---

## The 8 things to know first

1. **29 public URLs:** 6 pages plus 23 listings. No other pages exist (no contact page, no legal pages, no blog posts).
2. **Home, Sales and Rentals are set to "noindex"**, so search engines are told not to list them. They are also missing from the sitemap. Almost certainly a leftover setting. This is the biggest SEO problem on the site (checked on the live page).
3. **3 of the 23 listings are hidden from the Sales page but still publicly reachable** and listed in the sitemap: Can Terra, Ses Calas, Casa del Mar. Anyone with the link can open them. This matters for the new gated off-market section.
4. **The "Sort by" dropdown on the Sales page is empty.** It has zero options, so it does nothing.
5. **The listing database is already well structured** (about 45 fields). It's a good blueprint for the new CMS. Section 2 has the full list.
6. **No analytics, no tracking pixels, no cookie banner, no chat widget.** Only Wix's internal tools and an error monitor. So there's no tracking setup to migrate, and no data on what visitors do.
7. **Nothing is multilingual.** The language is English only. The blog page even says "No posts published in this language yet".
8. **The data has small errors** (inconsistent prices, spellings, trailing spaces). Fix them during migration. Section 2 lists them.

---

## 1. Sitemap

| URL | Page title (as shown in the tab) | Purpose | In sitemap | Indexable | Recommendation |
|---|---|---|---|---|---|
| `/` | Home \| F O R M \| i b i z a | Brand intro, featured properties, CTA | No | **No (noindex)** | **Keep.** Make indexable |
| `/sales` | Sales \| F O R M \| i b i z a | Off-market newsletter, all 20 public listings | No | **No (noindex)** | **Keep.** Add filters |
| `/rentals` | Rentals \| F O R M \| i b i z a | One paragraph and a button. No properties | No | **No (noindex)** | **Keep**, but needs real content |
| `/developers` | Developers \| F O R M \| i b i z a | Services for developers and investors | Yes | Yes | **Keep.** Add a call to action |
| `/about` | About \| F O R M \| i b i z a | Brand story, services | Yes | Yes | **Keep.** Add the 3 agents |
| `/blog` | Blog \| F O R M \| i b i z a | Empty: "No posts published" | Yes | Yes | **Remove** (or replace with a Journal later) |
| `/sales-listing/{slug}` ×23 | {Name} \| F O R M \| i b i z a | Property detail pages | Yes (all 23) | Yes | **Keep as `/sales/{slug}`**, 3 hidden ones need a decision |
| *Contact* | n/a | A popup on every page, no URL of its own | n/a | n/a | **Replace with a real page** |

**Menu (checked):** Home · Sales · Rentals · Developers · About · Contact Us. Plus Instagram and LinkedIn icons. The LinkedIn icon links to Wix's own company page, not FORM's.
**Footer (checked):** wordmark, newsletter signup, phone **+34 626 01 54 17**, "formibiza.com" as text (no email address shown), Sales · Rentals · About · Contact, Instagram.
**Footer link gap:** the Developers page is missing from the footer links.

**robots.txt (checked):** allows everything except gallery popup links (`?lightbox=`), blocks Huawei's PetalBot crawler, slows two SEO crawlers, and points to the sitemap.

---

## 2. Property listings

**Totals (checked):** 23 listings · 20 shown on the Sales page · 3 hidden · 21 with a numeric price · prices from **€3.95M to €24M**, median **€8.0M** · 20 have a brochure · 5 have a video · about **980 gallery photos** in total (891 full gallery + 91 hero).
**By municipality:** Santa Eulària des Riu 14 · Sant Josep de sa Talaia 5 · Sant Joan de Labritja 2 · Sant Antoni de Portmany 2.

| # | Name | Slug | Area (municipality) | Price | Bed / Bath | Build / Plot (m²) | Shown on Sales? | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Dragonfly | dragonfly | San Josep (Sant Josep) | €8,750,000 | 6 / 6 | 388 / 3,000 | Yes | Featured, on home, video, 40 photos |
| 2 | Villa Iberica | villa-iberica | Es Cubells (Sant Josep) | Price on Application | 5 / 5 | 600 / 2,900 | Yes | Featured, on home, video |
| 3 | Can Morna | can-morna | Morna Valley, San Carles (Santa Eulària) | €7,777,777 | 7 / 7 | 680 / 43,000 | Yes | Video. Price looks like a placeholder |
| 4 | Can Bonita | can-bonita | S'Estanyol, Jesús (Santa Eulària) | €23,000,000 | 4 / 4 | 700 / 33,500 | Yes | |
| 5 | Villa 34 | villa-34 | Roca Llisa (Santa Eulària) | €7,500,000 | 6 / 6 | 690 / 1,900 | Yes | New build |
| 6 | Can Bee | can-bee | Morna Valley, San Carles (Santa Eulària) | €12,000,000 | 6 / 6 | 1,212 / 41,374 | Yes | |
| 7 | Villa Forma | villa-forma | San Josep (Sant Josep) | €24,000,000 | 6 / 8 | 1,100 / 3,394 | Yes | David Chipperfield. **Only 6 photos** |
| 8 | Can Draco | can-draco | Cala Xarraca (Sant Joan) | €17,500,000 | 7 / 7 | 520 / 15,000 | Yes | Featured, on home, video, 79 photos |
| 9 | Villa Piedra | villa-piedra | Cala Tarida (Sant Josep) | €19,750,000 | 7 / 7 | 904 / 4,100 | Yes | John Pawson. **Only 9 photos** |
| 10 | Casa Bloom | casa-bloom | Santa Gertrudis (Santa Eulària) | €7,750,000 | 5 / 4 | 410 / 23,000 | Yes | |
| 11 | Villa Miramar | villa-miramar | San Carlos (Santa Eulària) | €8,900,000 | 5 / 5 | 421 / 1,700 | Yes | Featured |
| 12 | Villa Amaya | villa-amaya | Santa Gertrudis (Santa Eulària) | €10,950,000 | 7 / 7 | 920 / 11,300 | Yes | |
| 13 | Villa Paradiso | villa-paradiso | Punta Galera (Sant Antoni) | €6,500,000 | 6 / 6 | 327 / 2,220 | Yes | |
| 14 | Villa Senda | villa-senda | Jesús (Santa Eulària) | €11,800,000 | 6 / 7 | 750 / 71,972 | Yes | No tags at all |
| 15 | Bunker House | bunker-house | Cala Tarida (Sant Josep) | €8,000,000 | 5 / 6 | 436 / 1,158 | Yes | Tag "Q4 2026" |
| 16 | Can Roda | can-roda | Jesús (Santa Eulària) | €7,950,000 | 7 / 7 | 650 / 6,212 | Yes | |
| 17 | Can Serena | can-serena | San Carles (Santa Eulària) | €6,250,000 | 5 / 4 | 732 / 10,382 | Yes | |
| 18 | Casa del Alma | casa-del-alma | Can Furnet (Santa Eulària) | €3,950,000 | 4 / 6 | 328 / 826 | Yes | Gated community |
| 19 | Casa Three Hills | casa-three-hills | Jesús (Santa Eulària) | €7,495,000 | 5 / 5 | 485 / 1,136 | Yes | Project. **Only 13 photos** |
| 20 | Villa Martinet | villa-martinet | Cap Martinet (Santa Eulària) | €7,495,000 | 6 / 6 | 438 / 1,063 | Yes | Project |
| 21 | **Can Terra** | can-terra | Santa Gertrudis (Sant Antoni) | €7,950,000 | 5 / 5 | 661 / 15,000 | **Hidden** | Tourist licence tag. No brochure |
| 22 | **Ses Calas** | ses-calas | Santa Eulària (Santa Eulària) | €12,750,000 | 8 / 9 | 1,155 / 22,000 | **Hidden** | Video. No brochure |
| 23 | **Casa del Mar** | casa-del-mar | Portinatx (Sant Joan) | "Under Offer" | 4 / 4 | 170 / 1,353 | **Hidden** | No brochure, no location map |

### The database fields (this becomes the new CMS model)

| Group | Fields | Note |
|---|---|---|
| Identity | propertyName · municipality · area · page link | |
| Price | salePrice (text) · salePriceNumber (number) | Number missing on 2 listings |
| Specs | bedrooms · bathrooms · buildSize · plotSize (all **text**, e.g. "388 m²") · floors (number, 9 filled) · yearBuilt (number, **never filled**) · propertyType (9 filled, all "Villa" in the sample) · architectDesigner (5 filled) | Text specs can't be filtered or sorted. Make them numbers |
| Copy | shortDescription · longDescription1 · longDescription2 · location (rich text) · location_short_intro | |
| Photos | card image · hero gallery (3–6) · full gallery (6–79) · five single-image slots · alt-text fields for two of them (**not filled**) · island location map image | Alt text is the weak spot |
| Media | propertyVideo (5) · videoLink (**never used**) · propertyBrochure (20) | |
| Tags | sale_property_tags (a free list of labels) | Messy, see below |
| Flags | listOnWebsite · featuredProperty (4 on) · showOnHome (3 on) · **publishToJamesEdition (8 on)** · jeFeatures (9 filled) | |
| System | id · created · updated · owner · manual sort order | Earliest record created 8 Sept 2026 |

**JamesEdition:** the database already has fields for it. Eight listings are flagged. I could not tell whether a live feed is running, so ask the owner. If it is, the new site has to keep it going.

### Data errors to clean up while migrating
- **Price format:** Dragonfly and Villa Miramar are written with a dot as thousands separator and a comma before the last three digits ("€8.750,000"). The other 19 priced listings use "€8,750,000".
- **Placeholder price?** Can Morna "€7,777,777".
- **Trailing spaces** in the place names of Ses Calas, Casa Bloom and Can Roda.
- **Naming:** "Sant Josep De Sa Talaia" vs "Sant Josep de sa Talaia". The area is "San Josep" on some listings and "Sant Josep" on others. Pages use "San Carles", "San Carlos", "San Josep" (Spanish spelling) next to Catalan names.
- **Can Terra** is filed under Sant Antoni de Portmany, but Santa Gertrudis normally sits in Santa Eulària. Worth confirming.
- **Tags** have 22 different values with mixed capitalisation: "SEA VIEW" ×13 and "Sea View" ×4. "BLAKSTAD" ×4 and "Blackstad" ×1 (a typo). "24hr Secruity" is misspelled. Architects appear as tags (Bloom Studio, David Chipperfield, John Pawson) *and* in a separate architect field. Use one.
- **Photo depth:** Villa Forma (6), Villa Piedra (9) and Casa Three Hills (13) are thin next to the others (40–79). For €19–24M homes this is a gap.

---

## 3. Content blocks

| Block | Where it appears | Notes |
|---|---|---|
| Wordmark header + menu icon | Every page | Header scrolls away, not sticky |
| Hero image, framed | Home, Sales, Rentals | Home: black-and-white Es Vedrà. Sales: Dragonfly. Rentals: a sunset terrace |
| Intro heading + paragraph + button | Home, Sales, Rentals, About | |
| Featured Properties (2 cards) | Home, bottom of each listing | Driven by the "showOnHome" / featured flags |
| Property card | Sales, Home, listings | Photo carousel (3 dots), name, location, price, bedrooms, tags |
| "Sell your villa, finca or plot in Ibiza" band | Bottom of Sales | Button opens the contact popup |
| Off-market newsletter ("Join the list") | Top of Sales | Email only |
| Dark band "A considered approach…" + "Get in Touch" | Home | |
| Dark band "Arrange a viewing, or tell us what you're looking for" | Bottom of every listing | |
| Newsletter strip | Footer, every page | Email only |
| Listing: spec bar | Every listing | Bedrooms · Bathrooms · Build · Plot · Location |
| Listing: description, photo grid, video, "The Location" with travel times and island map | Every listing | Map shows a single dot for the property |
| Listing buttons: Request Info · Brochure · Floor Plans | Every listing | Brochure is an attached document (probably PDF) on 20 listings. **"Floor Plans" has no matching database field** |
| About: two editorial rows with text and a photo | About | The man with the dog is **not named** |
| Developers: text + a photo of plans | Developers | No call to action |

**Not on the site at all:** testimonials, press logos or press quotes, team bios, awards, a track record, case studies, neighbourhood guides, FAQs, any legal or privacy page.

---

## 4. Forms and lead capture

| Form | Where | Fields | Notes |
|---|---|---|---|
| **Contact popup** | "Contact", "Get in Touch", "Request Info", "Tell us what you are looking for" buttons | First name\* · Last name\* · Email\* · Phone · How did you find us (dropdown) · Message · Send | Titled **"Request info for this property" on every page**, even on About and Developers. It doesn't pass the property name |
| **Newsletter** | Footer, every page | Email → "Join the list" | Footer text: "Occasional emails only. Unsubscribe at any time." |
| **Off-market newsletter** | Top of Sales | Email → "Join the list" | Same, with different copy |
| Sort dropdown | Sales | none | **Empty: zero options** |

- **No consent checkbox and no privacy-policy link** on any form.
- **Where submissions go:** not visible from the page. Wix usually emails the site owner and keeps a copy in its own inbox. Ask the owner (see section 9).
- **No lead routing:** one generic form for buyers, sellers and renters, all arriving in one place.

---

## 5. Integrations spotted

| Tool | Found? |
|---|---|
| Google Analytics / Tag Manager | **No** |
| Facebook / LinkedIn / TikTok pixels | **No** |
| Hotjar / Clarity | **No** |
| Cookie banner or consent tool | **No** |
| WhatsApp button | **No** |
| Live chat | **No** |
| Booking or calendar tool | **No** |
| Newsletter service (Mailchimp, Klaviyo…) | **No** (forms feed Wix) |
| Map service | **No** (the island map is a plain image) |
| Wix internal analytics | Yes (can't be exported to the new site) |
| Sentry (error monitoring, installed by Wix) | Yes |
| Instagram | Link to @form.ibiza |
| LinkedIn | Icon in the menu linking to **Wix's** company page (wrong) |
| JamesEdition | Database fields only. Feed status unknown |

**Phone and email:** +34 626 01 54 17 is shown. No email address is shown anywhere.

---

## 6. Languages

- **English only.** The page language is set to English. No Spanish version, no switcher.
- Developers, About, Blog and the listings carry an `x-default` / `en-gb` marker. Home, Sales and Rentals have none.
- The empty blog says "No posts published in this language yet", which suggests Wix's multi-language tool may have been switched on at some point.
- **URL pattern:** plain English slugs. Nothing to preserve for Spanish.

---

## 7. SEO baseline

| Check | Result |
|---|---|
| Meta description | **Missing on all 29 pages** |
| Page titles | Fixed pattern "{Page} \| F O R M \| i b i z a". The brand is written **with spaces between the letters**, which is hard for search engines to read |
| Social sharing image (og:image) | **Home, Sales, Rentals, Developers, About, Blog: none.** Listings have one |
| Structured data | Home: `WebSite` only. Listings: only `ImageObject`. **No property or organisation data** |
| H1 headings | About 10 H1s per listing and 5 on Home. The design uses H1 for everything |
| Image alt text | 29 of 31 images on the Can Draco page have none |
| Canonical tags | Correct on all 29 pages |
| Noindex | **Home, Sales, Rentals** |
| Sitemap | 26 URLs. Missing Home, Sales, Rentals |
| Status codes | All 29 pages return 200 |
| Legal pages | None found |

---

## 8. Redirect map (old Wix URL → proposed new URL)

Proposal: keep the main page URLs as they are, and tidy the listings. This is **a proposal to confirm in phase 4**. English stays at the root; Spanish would sit under `/es/` later.

| # | Old URL | Proposed new URL | Type | Note |
|---|---|---|---|---|
| 1 | `/` | `/` | Same | |
| 2 | `/sales` | `/sales` | Same | |
| 3 | `/rentals` | `/rentals` | Same | |
| 4 | `/developers` | `/developers` | Same | |
| 5 | `/about` | `/about` | Same | |
| 6 | `/blog` | `/` | 301 | Empty page. Use `/journal` if we build one |
| 7 | `/sales-listing/dragonfly` | `/sales/dragonfly` | 301 | |
| 8 | `/sales-listing/villa-iberica` | `/sales/villa-iberica` | 301 | |
| 9 | `/sales-listing/can-morna` | `/sales/can-morna` | 301 | |
| 10 | `/sales-listing/can-bonita` | `/sales/can-bonita` | 301 | |
| 11 | `/sales-listing/villa-34` | `/sales/villa-34` | 301 | |
| 12 | `/sales-listing/can-bee` | `/sales/can-bee` | 301 | |
| 13 | `/sales-listing/villa-forma` | `/sales/villa-forma` | 301 | |
| 14 | `/sales-listing/can-draco` | `/sales/can-draco` | 301 | |
| 15 | `/sales-listing/villa-piedra` | `/sales/villa-piedra` | 301 | |
| 16 | `/sales-listing/casa-bloom` | `/sales/casa-bloom` | 301 | |
| 17 | `/sales-listing/villa-miramar` | `/sales/villa-miramar` | 301 | |
| 18 | `/sales-listing/villa-amaya` | `/sales/villa-amaya` | 301 | |
| 19 | `/sales-listing/villa-paradiso` | `/sales/villa-paradiso` | 301 | |
| 20 | `/sales-listing/villa-senda` | `/sales/villa-senda` | 301 | |
| 21 | `/sales-listing/bunker-house` | `/sales/bunker-house` | 301 | |
| 22 | `/sales-listing/can-roda` | `/sales/can-roda` | 301 | |
| 23 | `/sales-listing/can-serena` | `/sales/can-serena` | 301 | |
| 24 | `/sales-listing/casa-del-alma` | `/sales/casa-del-alma` | 301 | |
| 25 | `/sales-listing/casa-three-hills` | `/sales/casa-three-hills` | 301 | |
| 26 | `/sales-listing/villa-martinet` | `/sales/villa-martinet` | 301 | |
| 27 | `/sales-listing/can-terra` | `/private-office` (sign-in page) | 301 | Moves to the gated section. The old link must no longer show the property |
| 28 | `/sales-listing/ses-calas` | `/private-office` (sign-in page) | 301 | Same |
| 29 | `/sales-listing/casa-del-mar` | `/private-office` (sign-in page) | 301 | Same. Currently "Under Offer" |

**Also handle at launch:**
- Pick one host and redirect the other: `www.formibiza.com` is the current standard.
- `/sales-listing` with a trailing slash or capital letters should also work.
- Gallery pop-up links with `?lightbox=` are blocked in robots.txt. Ignore them.
- **Get read access to Google Search Console** from the owner. It tells us which old URLs actually get visitors, so we can check the map against real traffic. The database was created on 8 Sept 2026, so I'd expect little search history, but only Search Console can confirm that.

---

## 9. What I could not verify

- **Mobile layout:** the browser window wouldn't shrink to phone width. Wix serves phones a separate layout.
- **Where the forms send** (an email address, Wix's inbox or something else) and the **options in "How did you find us"**. The popup didn't open on my second try.
- **Where the "Brochure" and "Floor Plans" buttons lead.**
- **What Google has indexed.** A search for the site returned nothing useful.
- **Whether the JamesEdition feed is live.**
- **Whether Wix redirects the non-www address**, and what the 404 page looks like.
- **Page speed.**

## 10. Owner's answers (15 Nov 2026)

1. **Hidden listings:** Can Terra, Ses Calas and Casa del Mar move into the **gated off-market section**.
2. **JamesEdition / portals:** no feed running, as far as the owner knows.
3. **Form submissions today:** arrive at Rupert's email.
4. **Public contact email:** info@formibiza.com
5. **About photo:** Rupert (Rupert Baird Murray).
6. **Search Console / Wix access:** not available at this time. The redirect map stays as proposed.
7. **Rentals:** stays an enquiry page for now.

### Original questions

1. The 3 hidden listings: bring them into the new **gated off-market section**, or drop them from the public site?
2. Is there a JamesEdition feed running today? Do other portals receive these listings?
3. Where do contact form submissions arrive today, and who reads them?
4. A **contact email address** to show on the site (none appears now).
5. Who is the man in the About photo? (Needs a name once the three agents appear.)
6. Can we get **read access to Google Search Console** and the Wix dashboard?
7. Rentals: any rental properties to list? Or does it stay an enquiry page?
