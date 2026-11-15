"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { switchLanguagePath } from "@/lib/i18n/routes";

/** "EN / ES" at the top right. Keeps the visitor on the same page. Current language in ink, the other in ink-soft. */
export function LanguageSwitch({
  lang,
  label,
  names,
}: {
  lang: Locale;
  label: string;
  names: Record<Locale, string>;
}) {
  const pathname = usePathname() || "/";

  return (
    <nav aria-label={label} className="flex justify-end gap-[6px] text-[13px] tracking-[0.06em] md:gap-[10px]">
      {locales.map((code, index) => (
        <span key={code} className="inline-flex items-center gap-[6px] md:gap-[10px]">
          {index > 0 && (
            <span aria-hidden="true" className="text-line-control">
              /
            </span>
          )}
          <Link
            href={switchLanguagePath(pathname, code)}
            lang={code}
            hrefLang={code}
            title={names[code]}
            aria-current={code === lang ? "true" : undefined}
            className={`inline-flex min-h-[44px] min-w-[24px] items-center justify-center no-underline ${
              code === lang ? "text-ink" : "text-ink-soft"
            }`}
          >
            {code.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
