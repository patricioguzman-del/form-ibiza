import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import type { PlaceholderKey } from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export type LangParams = { params: Promise<{ lang: string }> };

/** Read the language from the address, or show the 404 page. */
export async function readLang(params: LangParams["params"]): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}

/** Page title for a placeholder page. */
export function placeholderMetadata(page: PlaceholderKey) {
  return async ({ params }: LangParams): Promise<Metadata> => {
    const lang = await readLang(params);
    return page === "home" ? {} : { title: getDictionary(lang).placeholder.titles[page] };
  };
}
