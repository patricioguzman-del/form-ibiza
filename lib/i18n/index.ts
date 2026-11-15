import type { Locale } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import es from "./dictionaries/es";

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };
