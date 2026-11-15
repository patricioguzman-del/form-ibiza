import type { Property } from "@/lib/types";

/**
 * The 20 PUBLIC listings, typed in from docs/02-content-inventory.md section 2.
 * This file is a stand-in: in milestone 2 the same shape is filled from Sanity.
 *
 * Deliberately NOT here: Can Terra, Ses Calas and Casa del Mar. They are Private Office listings
 * and must never be sent to a visitor's browser (CLAUDE.md, "Never"). They arrive in milestone 7,
 * fetched on the server only after approval.
 *
 * Data notes (for the owner to confirm):
 * - Features are filled only where the docs or the approved designs state them. The rest are empty
 *   until the Wix tags are cleaned up and migrated (milestone 2).
 * - Can Morna's price (€7,777,777) is as published on Wix, but the inventory says it looks like a placeholder.
 * - Place names use the Catalan spelling (Sant Josep, Sant Carles), as the design system asks.
 */
const properties: Property[] = [
  { slug: "dragonfly", name: "Dragonfly", area: "Sant Josep", municipality: "Sant Josep de sa Talaia", price: 8750000, bedrooms: 6, bathrooms: 6, builtM2: 388, plotM2: 3000, features: ["seaView", "sunset"], featured: true, featuredOnHome: true, order: 1,
    content: {
      headline: "A contemporary retreat overlooking Ibiza’s southwest coastline, with sea views, year-round sunsets and landscaped gardens.",
      paragraphs: [
        "Few positions on Ibiza’s southwest coast offer the sense of seclusion found at Dragonfly. At the end of a quiet cul-de-sac near Sant Josep, the property overlooks an uninterrupted expanse of Mediterranean. Protected natural land surrounds the residence, preserving its peaceful setting.",
        "Recently redesigned by Bloom Studio, the house combines contemporary architecture with natural stone, handcrafted oak and softly textured finishes.",
        "The main residence has four en-suite bedrooms, complemented by an independent two-bedroom guest apartment and a separate cinema pavilion that can also accommodate guests.",
      ],
      locationIntro: "At the end of a quiet lane on the southwest coast, Dragonfly looks straight out to sea, where the sun sets all year.",
      travelTimes: [
        { place: "Sant Josep village", minutes: 5 },
        { place: "Cala Molí", minutes: 10 },
        { place: "Cala Tarida", minutes: 10 },
        { place: "Cala d’Hort and Es Vedrà", minutes: 10 },
        { place: "Ibiza Airport", minutes: 20 },
        { place: "Ibiza Town", minutes: 25 },
      ],
    }, },
  { slug: "villa-iberica", name: "Villa Iberica", area: "Es Cubells", municipality: "Sant Josep de sa Talaia", price: null, bedrooms: 5, bathrooms: 5, builtM2: 600, plotM2: 2900, features: ["seaView"], featured: true, featuredOnHome: true, order: 2 },
  { slug: "can-morna", name: "Can Morna", area: "Morna Valley, Sant Carles", municipality: "Santa Eulària des Riu", price: 7777777, bedrooms: 7, bathrooms: 7, builtM2: 680, plotM2: 43000, features: [], featured: false, featuredOnHome: false, order: 3 },
  { slug: "can-bonita", name: "Can Bonita", area: "S'Estanyol, Jesús", municipality: "Santa Eulària des Riu", price: 23000000, bedrooms: 4, bathrooms: 4, builtM2: 700, plotM2: 33500, features: [], featured: false, featuredOnHome: false, order: 4 },
  { slug: "villa-34", name: "Villa 34", area: "Roca Llisa", municipality: "Santa Eulària des Riu", price: 7500000, bedrooms: 6, bathrooms: 6, builtM2: 690, plotM2: 1900, features: ["newBuild", "seaView"], featured: false, featuredOnHome: false, order: 5 },
  { slug: "can-bee", name: "Can Bee", area: "Morna Valley, Sant Carles", municipality: "Santa Eulària des Riu", price: 12000000, bedrooms: 6, bathrooms: 6, builtM2: 1212, plotM2: 41374, features: ["seaView"], featured: false, featuredOnHome: false, order: 6 },
  { slug: "villa-forma", name: "Villa Forma", area: "Sant Josep", municipality: "Sant Josep de sa Talaia", price: 24000000, bedrooms: 6, bathrooms: 8, builtM2: 1100, plotM2: 3394, features: [], featured: false, featuredOnHome: false, order: 7 },
  { slug: "can-draco", name: "Can Draco", area: "Cala Xarraca", municipality: "Sant Joan de Labritja", price: 17500000, bedrooms: 7, bathrooms: 7, builtM2: 520, plotM2: 15000, features: [], featured: true, featuredOnHome: false, order: 8 },
  { slug: "villa-piedra", name: "Villa Piedra", area: "Cala Tarida", municipality: "Sant Josep de sa Talaia", price: 19750000, bedrooms: 7, bathrooms: 7, builtM2: 904, plotM2: 4100, features: [], featured: false, featuredOnHome: false, order: 9 },
  { slug: "casa-bloom", name: "Casa Bloom", area: "Santa Gertrudis", municipality: "Santa Eulària des Riu", price: 7750000, bedrooms: 5, bathrooms: 4, builtM2: 410, plotM2: 23000, features: [], featured: false, featuredOnHome: false, order: 10 },
  { slug: "villa-miramar", name: "Villa Miramar", area: "Sant Carles", municipality: "Santa Eulària des Riu", price: 8900000, bedrooms: 5, bathrooms: 5, builtM2: 421, plotM2: 1700, features: [], featured: true, featuredOnHome: false, order: 11 },
  { slug: "villa-amaya", name: "Villa Amaya", area: "Santa Gertrudis", municipality: "Santa Eulària des Riu", price: 10950000, bedrooms: 7, bathrooms: 7, builtM2: 920, plotM2: 11300, features: [], featured: false, featuredOnHome: false, order: 12 },
  { slug: "villa-paradiso", name: "Villa Paradiso", area: "Punta Galera", municipality: "Sant Antoni de Portmany", price: 6500000, bedrooms: 6, bathrooms: 6, builtM2: 327, plotM2: 2220, features: [], featured: false, featuredOnHome: false, order: 13 },
  { slug: "villa-senda", name: "Villa Senda", area: "Jesús", municipality: "Santa Eulària des Riu", price: 11800000, bedrooms: 6, bathrooms: 7, builtM2: 750, plotM2: 71972, features: [], featured: false, featuredOnHome: false, order: 14 },
  { slug: "bunker-house", name: "Bunker House", area: "Cala Tarida", municipality: "Sant Josep de sa Talaia", price: 8000000, bedrooms: 5, bathrooms: 6, builtM2: 436, plotM2: 1158, features: [], featured: false, featuredOnHome: false, order: 15 },
  { slug: "can-roda", name: "Can Roda", area: "Jesús", municipality: "Santa Eulària des Riu", price: 7950000, bedrooms: 7, bathrooms: 7, builtM2: 650, plotM2: 6212, features: [], featured: false, featuredOnHome: false, order: 16 },
  { slug: "can-serena", name: "Can Serena", area: "Sant Carles", municipality: "Santa Eulària des Riu", price: 6250000, bedrooms: 5, bathrooms: 4, builtM2: 732, plotM2: 10382, features: [], featured: false, featuredOnHome: false, order: 17 },
  { slug: "casa-del-alma", name: "Casa del Alma", area: "Can Furnet", municipality: "Santa Eulària des Riu", price: 3950000, bedrooms: 4, bathrooms: 6, builtM2: 328, plotM2: 826, features: ["gatedCommunity"], featured: false, featuredOnHome: false, order: 18 },
  { slug: "casa-three-hills", name: "Casa Three Hills", area: "Jesús", municipality: "Santa Eulària des Riu", price: 7495000, bedrooms: 5, bathrooms: 5, builtM2: 485, plotM2: 1136, features: ["project"], featured: false, featuredOnHome: false, order: 19 },
  { slug: "villa-martinet", name: "Villa Martinet", area: "Cap Martinet", municipality: "Santa Eulària des Riu", price: 7495000, bedrooms: 6, bathrooms: 6, builtM2: 438, plotM2: 1063, features: ["project"], featured: false, featuredOnHome: false, order: 20 },
];

// Async on purpose: the Sanity version will be too, so the pages don't change.
export async function getPublicProperties(): Promise<Property[]> {
  return properties;
}

export async function getPublicProperty(slug: string): Promise<Property | undefined> {
  return properties.find((property) => property.slug === slug);
}

/** Two featured listings to close a property page, never the page's own listing. */
export async function getRelatedProperties(slug: string): Promise<Property[]> {
  return properties
    .filter((property) => property.featured && property.slug !== slug)
    .sort((a, b) => a.order - b.order)
    .slice(0, 2);
}

export async function getFeaturedProperties(): Promise<Property[]> {
  return properties.filter((property) => property.featuredOnHome).sort((a, b) => a.order - b.order);
}
