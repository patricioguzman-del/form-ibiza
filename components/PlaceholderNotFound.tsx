"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { parsePublicPath, localizePath } from "@/lib/i18n/routes";

/** Minimal 404 that keeps the shell. The designed 404 page arrives in milestone 5. */
export function PlaceholderNotFound() {
  const { lang } = parsePublicPath(usePathname() || "/");
  const dict = getDictionary(lang);
  return (
    <section className="column flex flex-1 flex-col items-center gap-s3 py-s5 text-center md:py-s7">
      <h1 className="t-statement m-0">{dict.notFound.title}</h1>
      <p className="measure m-0">{dict.notFound.body}</p>
      <Link href={localizePath("/", lang)} className="text-link">
        {dict.notFound.link} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
