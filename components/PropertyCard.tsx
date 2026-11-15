import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n";
import { fill, formatPrice } from "@/lib/format";
import type { Property } from "@/lib/types";
import { PhotoFrame } from "./PhotoFrame";

/** Card: 3:2 photo, name and price, area and bedrooms, optional feature line, hairline underneath. */
export function PropertyCard({
  property,
  lang,
  dict,
  showFeatures = false,
}: {
  property: Property;
  lang: Locale;
  dict: Dictionary["property"];
  showFeatures?: boolean;
}) {
  const bedrooms =
    property.bedrooms === 1 ? dict.bedroomsOne : fill(dict.bedrooms, { count: property.bedrooms });
  const features = property.features.map((id) => dict.features[id]).join(" · ");

  return (
    <Link
      href={localizePath(`/sales/${property.slug}`, lang)}
      className="flex h-full min-w-0 flex-col text-ink no-underline"
    >
      <PhotoFrame
        description={fill(dict.photoOf, { name: property.name })}
        text={dict.photoToCome}
        className="aspect-[3/2]"
      />
      <span className="grid flex-1 grid-cols-[1fr_auto] content-start gap-x-s2 gap-y-[2px] border-b border-rule pb-[18px] pt-s2 text-[14px] leading-[1.6]">
        <span className="t-ui text-[15px]">{property.name}</span>
        <span className="t-ui text-right text-[15px] tabular-nums">
          {property.price === null ? dict.priceOnApplication : formatPrice(property.price, lang)}
        </span>
        <span className="text-ink-soft">{property.area}</span>
        <span className="text-right text-ink-soft">{bedrooms}</span>
        {showFeatures && features && (
          <span className="t-caption col-span-2 pt-[6px] text-ink-soft">{features}</span>
        )}
      </span>
    </Link>
  );
}
