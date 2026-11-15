/**
 * Site-wide facts. In milestone 2 these move into Sanity ("Site settings") so the team can edit them.
 * Anything not yet supplied by FORM is a [BRACKETED PLACEHOLDER], never an invention.
 */
export const site = {
  name: "FORM | ibiza",
  phoneDisplay: "+34 626 01 54 17",
  phoneHref: "tel:+34626015417",
  email: "info@formibiza.com",
  instagramUrl: "https://www.instagram.com/form.ibiza/",
  /** Empty until FORM confirms the WhatsApp Business number (architecture open question 5). */
  whatsappUrl: "",
  legalCompanyName: "[LEGAL COMPANY NAME]",
  nif: "[NIF]",
  year: 2026,
  /** Named by the owner (docs/01-brand-dna.md, owner's answers). Roles and photo to come. */
  team: ["Rupert Baird Murray", "Cat Cheshire", "Patricio Guzman"],
  /**
   * While false, every page tells search engines not to list it. Flip to true at launch (milestone 9).
   * Nothing goes live before then.
   */
  isLive: false,
} as const;
