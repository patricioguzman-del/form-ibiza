import { defaultLocale, type Locale } from "./config";

/**
 * Page names in each language. The folder names in /app are the English ones.
 * Anything not listed here (for example a property slug) is left as it is.
 * Spanish names are a first draft for a native speaker to check (milestone 10).
 */
const segments: Record<string, { en: string; es: string }> = {
  sales: { en: "sales", es: "ventas" },
  rentals: { en: "rentals", es: "alquileres" },
  developers: { en: "developers", es: "promotores" },
  about: { en: "about", es: "nosotros" },
  sell: { en: "sell", es: "vender" },
  contact: { en: "contact", es: "contacto" },
  "private-office": { en: "private-office", es: "oficina-privada" },
  legal: { en: "legal", es: "legal" },
  privacy: { en: "privacy", es: "privacidad" },
  cookies: { en: "cookies", es: "cookies" },
  "legal-notice": { en: "legal-notice", es: "aviso-legal" },
};

const spanishToCanonical = new Map(
  Object.entries(segments).map(([canonical, names]) => [names.es, canonical]),
);

function split(path: string): string[] {
  return path.split("/").filter(Boolean);
}

/** "/sales/dragonfly" in the canonical (English) form -> the public path in that language. */
export function localizePath(canonicalPath: string, lang: Locale): string {
  const parts = split(canonicalPath).map((part) => segments[part]?.[lang] ?? part);
  const prefix = lang === defaultLocale ? [] : [lang];
  return "/" + [...prefix, ...parts].join("/");
}

/**
 * Read any public path ("/", "/es/ventas/dragonfly", "/sales") and say which language it is in
 * and what the canonical (English) path is. A leading "/en" is tolerated and reported.
 */
export function parsePublicPath(pathname: string): {
  lang: Locale;
  hadEnglishPrefix: boolean;
  canonicalPath: string;
} {
  const parts = split(pathname);
  let lang: Locale = defaultLocale;
  let hadEnglishPrefix = false;

  if (parts[0] === "es") {
    lang = "es";
    parts.shift();
  } else if (parts[0] === "en") {
    hadEnglishPrefix = true;
    parts.shift();
  }

  const canonical = parts.map((part) => (lang === "es" ? spanishToCanonical.get(part) ?? part : part));
  return { lang, hadEnglishPrefix, canonicalPath: "/" + canonical.join("/") };
}

/** The same page in another language. Used by the EN / ES switch. */
export function switchLanguagePath(pathname: string, to: Locale): string {
  return localizePath(parsePublicPath(pathname).canonicalPath, to);
}
