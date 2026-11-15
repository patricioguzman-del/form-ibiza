import type { Dictionary } from "@/lib/i18n";

/** The menu, in order. "path" is the canonical (English) path; the label comes from the dictionary. */
export function getMenuItems(dict: Dictionary) {
  return [
    { path: "/", label: dict.nav.home },
    { path: "/sales", label: dict.nav.sales },
    { path: "/rentals", label: dict.nav.rentals },
    { path: "/developers", label: dict.nav.developers },
    { path: "/about", label: dict.nav.about },
    { path: "/contact", label: dict.nav.contact },
  ];
}
