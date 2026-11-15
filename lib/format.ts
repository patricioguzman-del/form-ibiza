import type { Locale } from "@/lib/i18n/config";

/** €8,750,000 in English, 8.750.000 € in Spanish. Built from a number, so the old "€8.750,000" errors can't return. */
export function formatPrice(amount: number, lang: Locale): string {
  return new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Fill {placeholders} in an interface string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

/** 3,000 in English, 3.000 in Spanish. */
export function formatNumber(value: number, lang: Locale): string {
  return new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-IE", { useGrouping: "always" }).format(value);
}
