import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: { default: site.name, template: `%s · ${site.name}` },
    description: dict.meta.description,
    // Not listed by search engines until launch (milestone 9). Spanish stays unlisted until it is switched on (milestone 10).
    robots: site.isLive && lang === "en" ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="t-ui absolute left-s2 top-s2 z-50 -translate-y-[200%] border border-ink bg-paper px-s2 py-s1 text-ink no-underline focus:translate-y-0"
        >
          {dict.skipToContent}
        </a>
        <SiteHeader lang={lang} dict={dict} />
        <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
          {children}
        </main>
        <SiteFooter lang={lang} dict={dict} />
      </body>
    </html>
  );
}
