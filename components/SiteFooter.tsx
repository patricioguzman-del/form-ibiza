import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";
import { Wordmark } from "./Wordmark";
import { getMenuItems } from "./nav";

const footerLink =
  "inline-flex min-h-[44px] items-center text-paper no-underline hover:text-rule md:min-h-0";

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const nav = getMenuItems(dict).filter((item) => item.path !== "/");

  return (
    <footer className="flex flex-col items-center gap-12 bg-ink px-5 pb-8 pt-s5 text-paper md:gap-s5 md:px-s3 md:pb-s4 md:pt-s6">
      <Wordmark bold className="!text-[20px] md:!text-[22px]" />

      <NewsletterForm dict={dict.footer} privacyHref={localizePath("/legal/privacy", lang)} />

      <div className="flex w-full max-w-[1100px] flex-col justify-between gap-s3 border-t border-ink-soft pt-12 text-[15px] leading-[1.6] md:flex-row md:gap-s4 md:pt-s5 md:leading-[2]">
        <div className="flex flex-1 flex-col">
          <a href={site.phoneHref} className={footerLink}>
            {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className={footerLink}>
            {site.email}
          </a>
          {site.whatsappUrl ? (
            <a href={site.whatsappUrl} className={footerLink}>
              {dict.footer.whatsapp}
            </a>
          ) : (
            <span className="inline-flex min-h-[44px] items-center text-rule md:min-h-0">
              {dict.footer.whatsapp} {dict.footer.whatsappSoon}
            </span>
          )}
        </div>

        <nav aria-label={dict.footer.label} className="flex flex-1 flex-col">
          {nav.map((item) => (
            <Link key={item.path} href={localizePath(item.path, lang)} className={footerLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 flex-col">
          <Link href={localizePath("/private-office", lang)} className={footerLink}>
            {dict.menuExtras.privateOffice}
          </Link>
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className={footerLink}>
            {dict.menuExtras.instagram}
          </a>
        </div>
      </div>

      <div className="t-caption flex w-full max-w-[1100px] flex-wrap justify-between gap-x-8 gap-y-2 text-rule">
        <span>
          © {site.year} {site.name} · {site.legalCompanyName} · {site.nif}
        </span>
        <span className="flex flex-wrap gap-x-6">
          <Link href={localizePath("/legal/privacy", lang)} className="inline-flex min-h-[44px] items-center text-rule underline md:min-h-0">
            {dict.footer.privacy}
          </Link>
          <Link href={localizePath("/legal/cookies", lang)} className="inline-flex min-h-[44px] items-center text-rule underline md:min-h-0">
            {dict.footer.cookies}
          </Link>
          <Link href={localizePath("/legal/legal-notice", lang)} className="inline-flex min-h-[44px] items-center text-rule underline md:min-h-0">
            {dict.footer.legalNotice}
          </Link>
        </span>
      </div>
    </footer>
  );
}
