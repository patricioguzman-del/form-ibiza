import type { FeatureId, Property } from "@/lib/types";

export type SortKey = "priceHigh" | "priceLow" | "newest";

export type Filters = {
  areas: string[];
  minPrice: string;
  maxPrice: string;
  /** "4", "5", "6" or "7" (7 means seven or more). */
  bedrooms: string[];
  features: FeatureId[];
  sort: SortKey;
};

export const emptyFilters: Filters = {
  areas: [],
  minPrice: "",
  maxPrice: "",
  bedrooms: [],
  features: [],
  sort: "priceHigh",
};

export const bedroomOptions = ["4", "5", "6", "7"] as const;

export function hasActiveFilters(f: Filters): boolean {
  return f.areas.length > 0 || f.minPrice !== "" || f.maxPrice !== "" || f.bedrooms.length > 0 || f.features.length > 0;
}

function toNumber(value: string): number | null {
  const n = Number(value.replace(/[^\d.]/g, ""));
  return value.trim() === "" || Number.isNaN(n) ? null : n;
}

export function filterAndSort(properties: Property[], f: Filters): Property[] {
  const min = toNumber(f.minPrice);
  const max = toNumber(f.maxPrice);

  const result = properties.filter((p) => {
    if (f.areas.length && !f.areas.includes(p.municipality)) return false;
    if (f.bedrooms.length && !f.bedrooms.some((b) => (b === "7" ? p.bedrooms >= 7 : p.bedrooms === Number(b)))) return false;
    if (f.features.length && !f.features.every((id) => p.features.includes(id))) return false;
    if (min !== null || max !== null) {
      // "Price on Application" has no number, so a price filter leaves it out.
      if (p.price === null) return false;
      if (min !== null && p.price < min) return false;
      if (max !== null && p.price > max) return false;
    }
    return true;
  });

  return result.sort((a, b) => {
    if (f.sort === "newest") return a.order - b.order;
    // Price sorts keep "Price on Application" at the end.
    if (a.price === null && b.price === null) return a.order - b.order;
    if (a.price === null) return 1;
    if (b.price === null) return -1;
    return f.sort === "priceHigh" ? b.price - a.price : a.price - b.price;
  });
}
