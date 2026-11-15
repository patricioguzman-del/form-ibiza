import type { Metadata } from "next";
import Link from "next/link";
import { Lines } from "@/components/Lines";
import { PhotoFrame } from "@/components/PhotoFrame";
import { PrivateOfficeBand } from "@/components/PrivateOfficeBand";
import { SalesBrowser } from "@/components/SalesBrowser";
import { getPublicProperties } from "@/lib/data/properties";
import { getDictionary } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n/routes";
import { readLang, type LangParams } from "@/lib/page";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await readLang(params);
  return { title: getDictionary(lang).nav.sales };
}

export default async function SalesPage({ params }: LangParams) {
  const lang = await readLang(params);
  const dict = getDictionary(lang);
  const sales = dict.pages.sales;
  const properties = await getPublicProperties();

  return (
    <>
      <section className="column">
        <figure className="m-0 flex flex-col gap-3">
          <PhotoFrame
            description={sales.heroAlt}
            text={dict.property.photoToCome}
            className="aspect-[5/4] md:aspect-[19/10]"
          />
          <figcaption className="t-caption text-ink-soft">{sales.heroCaption}</figcaption>
        </figure>
      </section>

      <section className="column flex flex-col items-center gap-s3 pb-s5 pt-20 text-center md:pb-s6 md:pt-s7">
        <h1 className="t-statement m-0">
          <Lines text={sales.title} />
        </h1>
        <p className="measure m-0">{sales.intro}</p>
        <Link href={localizePath("/private-office", lang)} className="text-link">
          {sales.accessLink} <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="column">
        <SalesBrowser properties={properties} lang={lang} dict={dict.sales} propertyDict={dict.property} />
      </section>

      <div className="mt-s5 md:mt-s6">
        <PrivateOfficeBand lang={lang} dict={dict.pages.privateOffice} />
      </div>

      <section className="flex flex-col items-center gap-s3 bg-sand px-5 py-s5 text-center md:px-s3 md:py-s6">
        <h2 className="t-statement m-0 max-w-[40rem] !text-[22px] !font-bold md:!text-[26px]">{sales.sellTitle}</h2>
        <p className="measure m-0">{sales.sellBody}</p>
        <Link href={localizePath("/sell", lang)} className="text-link">
          {sales.sellLink} <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
