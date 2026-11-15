import Link from "next/link";
import { Lines } from "@/components/Lines";
import { PhotoFrame } from "@/components/PhotoFrame";
import { PrivateOfficeBand } from "@/components/PrivateOfficeBand";
import { PropertyCard } from "@/components/PropertyCard";
import { getFeaturedProperties } from "@/lib/data/properties";
import { getDictionary } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n/routes";
import { readLang, type LangParams } from "@/lib/page";
import { site } from "@/lib/site";

export default async function HomePage({ params }: LangParams) {
  const lang = await readLang(params);
  const dict = getDictionary(lang);
  const home = dict.pages.home;
  const featured = await getFeaturedProperties();

  return (
    <>
      {/* Framed hero. The black-and-white Es Vedrà photograph arrives with the real photos. */}
      <section className="column">
        <PhotoFrame
          description={home.heroAlt}
          text={`${dict.property.photoToCome}`}
          className="aspect-[5/4] md:aspect-[19/10]"
        />
      </section>

      <section className="column flex flex-col items-center gap-s3 py-20 text-center md:py-s7">
        <h1 className="t-statement m-0">
          <Lines text={home.title} />
        </h1>
        <p className="measure m-0">{home.intro}</p>
        <Link href={localizePath("/sales", lang)} className="btn-primary mt-1 md:mt-s2">
          {home.explore}
        </Link>
      </section>

      <section className="column flex flex-col gap-8 pb-s5 md:gap-s4 md:pb-s6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-s3 gap-y-s2 border-y border-rule pb-3 pt-s5 md:pb-s2 md:pt-s6">
          <h2 className="t-section m-0">{home.featuredTitle}</h2>
          <Link href={localizePath("/sales", lang)} className="text-link">
            <span className="md:hidden">{home.viewAllShort}</span>
            <span className="hidden md:inline">{home.viewAll}</span> <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="m-0 flex list-none flex-col gap-s4 p-0 md:flex-row md:gap-s2">
          {featured.slice(0, 2).map((property) => (
            <li key={property.slug} className="min-w-0 md:flex-1">
              <PropertyCard property={property} lang={lang} dict={dict.property} />
            </li>
          ))}
        </ul>
      </section>

      {/* The one full-width band on the page. */}
      <figure className="m-0 flex flex-col gap-[10px] md:gap-3">
        <PhotoFrame description={home.bandAlt} text={dict.property.photoToCome} className="h-[300px] md:h-[520px]" />
        <figcaption className="column t-caption text-ink-soft">{home.bandCaption}</figcaption>
      </figure>

      <section className="mt-s5 flex flex-col items-center gap-s3 bg-sand px-5 py-s5 text-center md:mt-s6 md:px-s3 md:py-s6">
        <h2 className="t-statement m-0 max-w-[40rem] !text-[22px] !font-bold md:!text-[26px]">{home.approachTitle}</h2>
        <p className="measure m-0">{home.approachBody}</p>
        <p className="m-0 font-normal">{home.approachLine}</p>
        <Link href={localizePath("/contact", lang)} className="btn-primary mt-1 md:mt-s2">
          {home.getInTouch}
        </Link>
      </section>

      <PrivateOfficeBand lang={lang} dict={dict.pages.privateOffice} />

      <section className="column pb-20 md:pb-s7">
        <div className="flex flex-col gap-s1 border-t border-rule pt-8 md:flex-row md:flex-wrap md:items-baseline md:justify-between md:gap-x-s4 md:gap-y-s2 md:pt-s4">
          <p className="t-name m-0 hidden md:block">{site.team.join(" · ")}</p>
          <div className="flex flex-col gap-s1 md:hidden">
            {site.team.map((name) => (
              <p key={name} className="t-name m-0">
                {name}
              </p>
            ))}
          </div>
          <div>
            <Link href={localizePath("/about", lang)} className="text-link">
              {home.meetTheTeam} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
