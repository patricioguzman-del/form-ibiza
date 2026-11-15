import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n/routes";

export type PlaceholderKey = keyof Dictionary["placeholder"]["titles"];

/** A quiet stand-in for pages that arrive in later milestones. Replaced page by page. */
export function PlaceholderPage({ lang, page }: { lang: Locale; page: PlaceholderKey }) {
  const dict = getDictionary(lang);
  return (
    <section className="column flex flex-1 flex-col items-center gap-s3 py-s5 text-center md:py-s7">
      <h1 className="t-statement m-0">{dict.placeholder.titles[page]}</h1>
      <p className="measure m-0">{dict.placeholder.body}</p>
      {page !== "home" && (
        <Link href={localizePath("/", lang)} className="text-link">
          {dict.nav.home} <span aria-hidden="true">→</span>
        </Link>
      )}
    </section>
  );
}
