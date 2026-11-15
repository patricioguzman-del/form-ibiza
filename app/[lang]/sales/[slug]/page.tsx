import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicProperties, getPublicProperty } from "@/lib/data/properties";
import { fill, formatPrice } from "@/lib/format";
import { getDictionary } from "@/lib/i18n";
import { locales } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/routes";
import { readLang } from "@/lib/page";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const properties = await getPublicProperties();
  return locales.flatMap((lang) => properties.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPublicProperty(slug);
  return property ? { title: property.name } : {};
}

/** Interim page so cards never lead to a dead end. The designed property page is milestone 4. */
export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const lang = await readLang(params);
  const property = await getPublicProperty(slug);
  if (!property) notFound();
  const dict = getDictionary(lang);

  return (
    <section className="column flex flex-1 flex-col items-center gap-s3 py-s5 text-center md:py-s7">
      <h1 className="t-statement m-0">{property.name}</h1>
      <p className="m-0 text-ink-soft">
        {property.area} ·{" "}
        {property.price === null ? dict.property.priceOnApplication : formatPrice(property.price, lang)} ·{" "}
        {fill(dict.property.bedrooms, { count: property.bedrooms })}
      </p>
      <p className="measure m-0">{dict.property.placeholderBody}</p>
      <Link href={localizePath("/sales", lang)} className="text-link">
        {dict.property.backToSales} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
