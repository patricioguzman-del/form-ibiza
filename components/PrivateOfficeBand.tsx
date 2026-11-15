import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n";

/** The quiet invitation: heading, one sentence, a text link. No lock icons. */
export function PrivateOfficeBand({ lang, dict }: { lang: Locale; dict: Dictionary["pages"]["privateOffice"] }) {
  return (
    <section className="column flex flex-col items-center gap-s3 py-20 text-center md:py-s7">
      <span aria-hidden="true" className="block h-px w-12 bg-ink opacity-35" />
      <h2 className="t-section m-0">{dict.title}</h2>
      <p className="m-0 max-w-[34rem]">{dict.body}</p>
      <Link href={localizePath("/private-office", lang)} className="text-link">
        {dict.link} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
