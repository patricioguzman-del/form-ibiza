import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderPage, type PlaceholderKey } from "@/components/PlaceholderPage";
import { locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { readLang } from "@/lib/page";

type Props = { params: Promise<{ lang: string; slug: string }> };

const pages: Record<string, PlaceholderKey> = {
  privacy: "privacy",
  cookies: "cookies",
  "legal-notice": "legalNotice",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => Object.keys(pages).map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = await readLang(params);
  const page = pages[slug];
  return page ? { title: getDictionary(lang).placeholder.titles[page] } : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const lang = await readLang(params);
  const page = pages[slug];
  if (!page) notFound();
  return <PlaceholderPage lang={lang} page={page} />;
}
