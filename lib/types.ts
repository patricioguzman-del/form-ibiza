/** The shape of a listing. Mirrors the Sanity content model in docs/04-architecture.md section 3. */

export type FeatureId =
  | "seaView"
  | "sunset"
  | "turnkey"
  | "frontLine"
  | "tennisCourt"
  | "gatedCommunity"
  | "newBuild"
  | "project"
  | "touristLicence";

/** Fixed list of municipalities, in their Catalan names. */
export type Municipality =
  | "Santa Eulària des Riu"
  | "Sant Josep de sa Talaia"
  | "Sant Joan de Labritja"
  | "Sant Antoni de Portmany";

export type PropertyContent = {
  /** The short line shown as the heading above the description. */
  headline: string;
  paragraphs: string[];
  locationIntro: string;
  travelTimes: { place: string; minutes: number }[];
};

export type Property = {
  slug: string;
  name: string;
  /** Place name shown on cards, in Catalan spelling. */
  area: string;
  municipality: Municipality;
  /** Euros, as a number. null means "Price on Application". */
  price: number | null;
  bedrooms: number;
  bathrooms: number;
  builtM2: number;
  plotM2: number;
  features: FeatureId[];
  featuredOnHome: boolean;
  /** Shown in "Featured properties" at the bottom of other listings. */
  featured: boolean;
  /** Text, in English. Missing until the copy is migrated (milestone 2); the page shows [BRACKETED] slots. */
  content?: PropertyContent;
  /** Position in the current manual order on the Wix site. */
  order: number;
};
