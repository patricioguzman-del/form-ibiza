# 03 · Design system: FORM | ibiza

**The system already exists.** It lives in your artifacts as **"FORM | ibiza" (Design System)**: https://claude.ai/artifact/U8kZbJGzCQgki6yzUsGn4D
The homepage directions are built from it. This file records the core rules in one place and the additions needed for the rebuild.

---

## 1. Core rules (from the existing system)

**Colour**

| Token | Hex | Use |
|---|---|---|
| paper | #f8f7f3 | Every page background |
| sand | #f1efe9 | Quiet bands, spec bar |
| ink | #100e1a | Text, primary buttons, footer |
| ink-soft | #43414a | Secondary text |
| rule | #cac8c8 | Decorative hairlines |
| line-control | #86848b | Form field borders |
| accent | #b5674a | Terracotta: active menu link and form errors only |

**Type**

| Role | Font | Size |
|---|---|---|
| Wordmark | Didot, 0.2em tracking | 18–24px |
| Opening statement | ITC Cheltenham Bold Italic | 30px (24px on phones). **Nothing on the site is larger** |
| Section heading | ITC Cheltenham Italic | 26px (22px on phones) |
| Names, numerals | ITC Cheltenham Italic | 18px |
| Body | Avenir Light | 16px, line height 1.75, max 38rem a line |
| Buttons, prices, links | Avenir Regular | 15px |
| Locations, labels | Avenir Light | 14px |
| Captions, legal line | Avenir Light | 13px (the smallest size) |

**Layout:** one centred column, 1100px at a 1512px window. Section padding 96px (64px on phones). Biggest pause 128px. Spacing steps: 8 · 16 · 24 · 40 · 64 · 96 · 128.
**Shape:** square everything. Hairlines, no shadows, no gradients.
**Controls:** buttons and fields are 48px tall everywhere.
**Images:** hero about 19:10, framed inside the column. Cards 3:2. Editorial portrait 4:5. One full-width band per page.
**Motion:** hovers fade in 0.4s. Sections fade in once, opacity only.

---

## 2. Additions for the rebuild

**Fonts and licences**
- First choice stays: ITC Cheltenham, Avenir, Didot.
- The headings need a real **Cheltenham Bold Italic** file. The live site loads only Book Italic and lets the browser fake the bold.
- Stand-ins if licensing fails: **Gelasio** for Cheltenham, **Nunito Sans** for Avenir, **GFS Didot** for Didot. The mockups use these wherever the licensed fonts aren't installed.

**Property filters (Sales page)**
- One line of text links above the grid: Area · Price · Bedrooms · Features. Collapsed by default.
- Opening one shows a hairline-framed panel with plain checkboxes or two number fields. No pills, no sliders.
- Active filters appear as text with a small ×. "Clear all" as a text link.
- Sort is a plain text menu: Price high to low, Price low to high, Newest.

**The Private Office (gated section)**
- Public invitation: a quiet centred band with a heading, one sentence and a text link "Request Access →". No lock icons.
- Registration: name, email, phone, what you're looking for, consent checkbox.
- Awaiting approval: one calm sentence and the contact details. No progress bars.
- Signed in: the same listing grid as Sales, with a small "Private Office" caption above.

**Forms**
- Labels above fields, 14px. Fields 48px tall, 1px line-control border, square.
- Errors: a terracotta line under the field and a short sentence in ink.
- Every form has an unticked consent checkbox with a link to the privacy policy.
- Three enquiry forms: Buying, Selling, Renting. "Request Information" on a listing carries the property name automatically.

**Header on long pages**
- The 120px header scrolls away. A slim 64px paper bar with the wordmark, Menu and EN / ES appears when the visitor scrolls up.

**Language switch**
- "EN / ES" in 13px at the top right. Current language in ink, the other in ink-soft. No flags.
- Layouts must hold with Spanish text about 20% longer.

**Contact details**
- Footer shows +34 626 01 54 17, info@formibiza.com and a plain-text WhatsApp link. No floating bubble.

**Legal**
- Footer: Privacy · Cookies · Legal Notice, plus the legal company name and NIF (both still to come from FORM).
- Cookie notice: a slim paper bar at the bottom with one sentence and two equal text buttons, Accept and Decline.

---

## 3. Do / Don't

| Do | Don't |
|---|---|
| Keep headings at 30px or under | Use giant hero type |
| Frame photos inside the column | Go full-bleed more than once a page |
| Use one terracotta touch per screen at most | Introduce any new colour |
| Write short, calm sentences | Use superlatives or exclamation marks |
| Show unknown facts as [BRACKETED] slots | Invent prices, names or credentials |
| Use Catalan place names (Sant Josep, Santa Eulària) | Mix Spanish and Catalan spellings |

---

## 4. Still needed from FORM
- Font licences or files (Cheltenham incl. Bold Italic, Avenir, Didot).
- Original photographs. The mockups use low-resolution screen captures.
- Team photograph and each agent's role.
- Legal company name and NIF.
