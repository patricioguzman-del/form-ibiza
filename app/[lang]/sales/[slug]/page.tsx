import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PhotoFrame } from "@/components/PhotoFrame";
import { PropertyCard } from "@/components/PropertyCard";
import { getPublicProperties, getPublicProperty, getRelatedProperties } from "@/lib/data/properties";
import { fill, formatNumber, formatPrice } from "@/lib/format";
import { getDictionary } from "@/lib/i18n";
import { locales } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/routes";
import { readLang } from "@/lib/page";
import { site } from "@/lib/site";

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

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const lang = await readLang(params);
  const property = await getPublicProperty(slug);
  if (!property) notFound();

  const dict = getDictionary(lang);
  const t = dict.property;
  const related = await getRelatedProperties(slug);
  const { content } = property;
  const placeLine = `${property.name}, ${property.area}`;

  const specs = [
    fill(t.specBedrooms, { count: property.bedrooms }),
    fill(t.specBathrooms, { count: property.bathrooms }),
    fill(t.specBuilt, { count: formatNumber(property.builtM2, lang) }),
    fill(t.specPlot, { count: formatNumber(property.plotM2, lang) }),
  ];

  return (
    <>
      <section className="column">
        <Link href={localizePath("/sales", lang)} className="t-label inline-flex min-h-[44px] items-center gap-3 text-ink-soft no-underline">
          <span aria-hidden="true">←</span> {t.backToAll}
        </Link>
      </section>

      {/* Hero, framed. The photo gallery link joins once the real photographs are in. */}
      <section className="column">
        <figure className="m-0 flex flex-col gap-3">
          <PhotoFrame
            description={fill(t.photoOf, { name: property.name })}
            text={t.photoToCome}
            className="aspect-[5/4] md:aspect-[19/10]"
          />
          <figcaption className="t-caption text-ink-soft">{placeLine}</figcaption>
        </figure>
      </section>

      <section className="column flex flex-col items-center gap-s3 pb-s5 pt-12 text-center md:pb-s6 md:pt-s5">
        <h1 className="t-statement m-0">{property.name}</h1>
        <p className="-mt-3 m-0 text-ink-soft">{property.area}</p>
        <p className="m-0 text-[18px] font-normal">
          {property.price === null ? t.priceOnApplication : formatPrice(property.price, lang)}
        </p>
        <ul className="m-0 flex w-full list-none flex-wrap justify-center gap-x-s4 gap-y-1 bg-sand px-s3 py-[14px] text-[15px] font-normal">
          {specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-center gap-x-s4 gap-y-s1 pt-s1">
          <a href="#enquiry" className="btn-primary">
            {t.requestInfo}
          </a>
          {/* "Download brochure" appears when a listing has a brochure file (milestone 2). */}
          <a href="#enquiry" className="text-link">
            {t.requestFloorPlans} <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="column pb-s5 md:pb-s6">
        <div className="border-t border-rule pt-s5 md:pt-s6">
          <div className="flex flex-col gap-s4 md:flex-row md:items-start md:gap-x-s6">
            <div className="min-w-0 md:flex-1">
              <h2 className="t-statement m-0 !text-[22px] !font-bold md:!text-[26px]">
                {content?.headline ?? t.headlineToCome}
              </h2>
            </div>
            <div className="flex min-w-0 flex-col gap-s3 md:flex-1">
              {content ? (
                content.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="measure m-0">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="measure m-0">{t.descriptionToCome}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="column pb-s5 md:pb-s6">
        <div className="grid grid-cols-1 gap-s4 md:grid-cols-2 md:gap-x-s2">
          <PhotoFrame description={fill(t.photoOf, { name: property.name })} text={t.photoPlaceholder} className="aspect-[3/2]" />
          <PhotoFrame description={fill(t.photoOf, { name: property.name })} text={t.photoPlaceholder} className="aspect-[3/2]" />
        </div>
      </section>

      <section className="column pb-s5 md:pb-s6">
        <div className="border-t border-rule pt-s5 md:pt-s6">
          <div className="flex flex-col gap-s4 md:flex-row md:items-center md:gap-x-s6">
            <div className="flex min-w-0 flex-col items-start gap-s3 md:flex-1">
              <h2 className="t-section m-0">{t.locationTitle}</h2>
              {content ? (
                <>
                  <p className="measure m-0">{content.locationIntro}</p>
                  <ul className="m-0 w-full list-none border-t border-rule p-0">
                    {content.travelTimes.map((item) => (
                      <li key={item.place} className="flex justify-between gap-s2 border-b border-rule py-3 text-[15px]">
                        <span className="font-normal">{item.place}</span>
                        <span className="text-ink-soft">{fill(t.minutes, { count: item.minutes })}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="measure m-0">{t.locationToCome}</p>
              )}
            </div>
            <div className="min-w-0 md:flex-1">
              <PhotoFrame description={t.mapAlt} text={t.mapText} className="aspect-square border border-rule px-s2" />
            </div>
          </div>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-s5 bg-sand px-5 py-s5 md:px-s3 md:py-s6">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-s4 md:flex-row md:items-start md:gap-x-s6">
          <div className="flex min-w-0 flex-col items-start gap-s2 md:flex-[1_1_300px]">
            <h2 className="t-statement m-0 !text-[22px] !font-bold md:!text-[26px]">{dict.enquiry.title}</h2>
            <p className="measure m-0">{dict.pages.enquiry.intro}</p>
            <div className="flex flex-col text-[15px] leading-[1.6]">
              <a href={site.phoneHref} className="inline-flex min-h-[44px] items-center no-underline">
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-[44px] items-center no-underline">
                {site.email}
              </a>
              {site.whatsappUrl ? (
                <a href={site.whatsappUrl} className="inline-flex min-h-[44px] items-center underline underline-offset-[6px]">
                  {dict.enquiry.whatsapp}
                </a>
              ) : (
                <span className="inline-flex min-h-[44px] items-center text-ink-soft">
                  {dict.enquiry.whatsapp} {dict.footer.whatsappSoon}
                </span>
              )}
            </div>
          </div>
          <div className="min-w-0 md:flex-[1.4_1_420px]">
            <EnquiryForm
              dict={dict.enquiry}
              consent={dict.pages.enquiry}
              privacyHref={localizePath("/legal/privacy", lang)}
              propertyLabel={placeLine}
              formType="property"
            />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="column pb-20 md:pb-s6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-s3 gap-y-s2 border-b border-rule pb-s2 pt-s5 md:pt-s6">
            <h2 className="t-section m-0">{t.featuredTitle}</h2>
            <Link href={localizePath("/sales", lang)} className="text-link">
              {t.viewAll} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="m-0 mt-s4 grid list-none grid-cols-1 gap-s4 p-0 md:grid-cols-2 md:gap-x-s2">
            {related.map((item) => (
              <li key={item.slug} className="min-w-0">
                <PropertyCard property={item} lang={lang} dict={t} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
