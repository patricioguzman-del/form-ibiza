"use client";

import { useId, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { fill, formatPrice } from "@/lib/format";
import {
  bedroomOptions,
  emptyFilters,
  filterAndSort,
  hasActiveFilters,
  type Filters,
  type SortKey,
} from "@/lib/filter";
import type { FeatureId, Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";

const PAGE_SIZE = 8;
type Group = "area" | "price" | "bedrooms" | "features" | "sort";
const groups: Group[] = ["area", "price", "bedrooms", "features", "sort"];

function Chevron() {
  return (
    <svg aria-hidden="true" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

const barButton =
  "t-ui min-h-[44px] cursor-pointer items-center gap-2 border-0 border-b bg-transparent p-0 text-ink";

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  const id = useId();
  return (
    <div className="t-ui flex min-h-[44px] items-center gap-3 font-light">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="m-0 h-5 w-5 accent-ink" />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export function SalesBrowser({
  properties,
  lang,
  dict,
  propertyDict,
}: {
  properties: Property[];
  lang: Locale;
  dict: Dictionary["sales"];
  propertyDict: Dictionary["property"];
}) {
  const [applied, setApplied] = useState<Filters>(emptyFilters);
  const [draft, setDraft] = useState<Filters>(emptyFilters);
  const [desktopPanel, setDesktopPanel] = useState<Group | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const panelId = useId();

  const results = useMemo(() => filterAndSort(properties, applied), [properties, applied]);
  const shown = results.slice(0, visible);

  // Option lists come from the data, so a filter never offers something that returns nothing.
  const municipalities = useMemo(() => {
    const counts = new Map<string, number>();
    properties.forEach((p) => counts.set(p.municipality, (counts.get(p.municipality) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [properties]);
  const featureIds = useMemo(() => {
    const ids = new Set<FeatureId>();
    properties.forEach((p) => p.features.forEach((id) => ids.add(id)));
    return [...ids];
  }, [properties]);

  const closePanels = () => {
    setDesktopPanel(null);
    setMobileOpen(false);
  };
  const commit = (next: Filters) => {
    setApplied(next);
    setDraft(next);
    setVisible(PAGE_SIZE);
    closePanels();
  };

  const groupLabel: Record<Group, string> = {
    area: dict.area,
    price: dict.price,
    bedrooms: dict.bedrooms,
    features: dict.features,
    sort: `${dict.sortPrefix}${dict.sortOptions[applied.sort]}`,
  };

  const bedroomLabel = (value: string) =>
    value === "7" ? fill(dict.bedroomsOrMore, { count: 7 }) : fill(dict.bedroomsOption, { count: value });

  // Active filters, shown as plain text with a small ×.
  const chips: { key: string; label: string; remove: Filters }[] = [];
  applied.areas.forEach((area) =>
    chips.push({ key: `a-${area}`, label: area, remove: { ...applied, areas: applied.areas.filter((x) => x !== area) } }),
  );
  if (applied.minPrice || applied.maxPrice) {
    const min = applied.minPrice ? formatPrice(Number(applied.minPrice), lang) : "";
    const max = applied.maxPrice ? formatPrice(Number(applied.maxPrice), lang) : "";
    const label =
      min && max
        ? fill(dict.priceBetween, { min, max })
        : min
          ? fill(dict.priceFrom, { amount: min })
          : fill(dict.priceUpTo, { amount: max });
    chips.push({ key: "price", label, remove: { ...applied, minPrice: "", maxPrice: "" } });
  }
  applied.bedrooms.forEach((b) =>
    chips.push({ key: `b-${b}`, label: bedroomLabel(b), remove: { ...applied, bedrooms: applied.bedrooms.filter((x) => x !== b) } }),
  );
  applied.features.forEach((id) =>
    chips.push({ key: `f-${id}`, label: propertyDict.features[id], remove: { ...applied, features: applied.features.filter((x) => x !== id) } }),
  );

  const count = results.length === 1 ? dict.countOne : dict.countMany;

  return (
    <div
      onKeyDown={(event) => {
        if (event.key === "Escape") closePanels();
      }}
    >
      <div className="relative">
        {/* The bar: count, four filters and sort on desktop; one button on phones. */}
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-s2 border-y border-rule py-s1">
          <span role="status" className="t-label text-ink-soft">
            {fill(count, { count: results.length })}
          </span>

          <div className="hidden flex-wrap gap-x-10 md:flex">
            {(["area", "price", "bedrooms", "features"] as Group[]).map((group) => (
              <button
                key={group}
                type="button"
                aria-expanded={desktopPanel === group}
                aria-controls={panelId}
                onClick={() => {
                  setDraft(applied);
                  setDesktopPanel(desktopPanel === group ? null : group);
                }}
                className={`${barButton} inline-flex ${desktopPanel === group ? "border-ink" : "border-transparent"}`}
              >
                {groupLabel[group]} <Chevron />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-expanded={desktopPanel === "sort"}
            aria-controls={panelId}
            onClick={() => {
              setDraft(applied);
              setDesktopPanel(desktopPanel === "sort" ? null : "sort");
            }}
            className={`${barButton} hidden md:inline-flex ${desktopPanel === "sort" ? "border-ink" : "border-transparent"}`}
          >
            {groupLabel.sort} <Chevron />
          </button>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={panelId}
            onClick={() => {
              setDraft(applied);
              setMobileOpen(!mobileOpen);
            }}
            className={`${barButton} inline-flex md:hidden ${mobileOpen ? "border-ink" : "border-transparent"}`}
          >
            {dict.filterAndSort} <Chevron />
          </button>
        </div>

        {/* The panel: hairline frame, plain checkboxes and two number fields. No pills, no sliders. */}
        <div
          id={panelId}
          className={`mt-s2 flex-col items-stretch justify-between gap-x-10 gap-y-s3 border border-rule px-5 py-s3 md:flex-row md:flex-wrap md:items-center md:px-8 ${
            mobileOpen ? "flex" : "hidden"
          } ${desktopPanel ? "md:flex" : "md:hidden"}`}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-s3 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-0">
            {groups.map((group) => (
              <fieldset
                key={group}
                className={`m-0 min-w-0 border-0 p-0 ${mobileOpen ? "block" : "hidden"} ${
                  desktopPanel === group ? "md:block" : "md:hidden"
                }`}
              >
                <legend className={`t-label mb-1 text-ink-soft md:sr-only`}>
                  {group === "sort" ? dict.sortLabel : groupLabel[group]}
                </legend>

                {group === "area" &&
                  municipalities.map(([name, total]) => (
                    <Check
                      key={name}
                      label={`${name} (${total})`}
                      checked={draft.areas.includes(name)}
                      onChange={() => setDraft({ ...draft, areas: toggle(draft.areas, name) })}
                    />
                  ))}

                {group === "price" && (
                  <div className="flex flex-wrap gap-x-s2 gap-y-s1 pb-1">
                    {(["minPrice", "maxPrice"] as const).map((field) => (
                      <label key={field} className="t-label flex flex-col gap-1">
                        {field === "minPrice" ? dict.minPrice : dict.maxPrice}
                        <input
                          type="number"
                          inputMode="numeric"
                          min={0}
                          step={250000}
                          value={draft[field]}
                          onChange={(event) => setDraft({ ...draft, [field]: event.target.value })}
                          className="t-body min-h-[48px] w-[220px] max-w-full rounded-none border border-line-control bg-transparent px-s2 text-ink"
                        />
                      </label>
                    ))}
                  </div>
                )}

                {group === "bedrooms" &&
                  bedroomOptions.map((value) => (
                    <Check
                      key={value}
                      label={bedroomLabel(value)}
                      checked={draft.bedrooms.includes(value)}
                      onChange={() => setDraft({ ...draft, bedrooms: toggle(draft.bedrooms, value) })}
                    />
                  ))}

                {group === "features" &&
                  featureIds.map((id) => (
                    <Check
                      key={id}
                      label={propertyDict.features[id]}
                      checked={draft.features.includes(id)}
                      onChange={() => setDraft({ ...draft, features: toggle(draft.features, id) })}
                    />
                  ))}

                {group === "sort" &&
                  (Object.keys(dict.sortOptions) as SortKey[]).map((key) => (
                    <div key={key} className="t-ui flex min-h-[44px] items-center gap-3 font-light">
                      <input
                        id={`${panelId}-sort-${key}`}
                        type="radio"
                        name={`${panelId}-sort`}
                        checked={draft.sort === key}
                        onChange={() => setDraft({ ...draft, sort: key })}
                        className="m-0 h-5 w-5 accent-ink"
                      />
                      <label htmlFor={`${panelId}-sort-${key}`}>{dict.sortOptions[key]}</label>
                    </div>
                  ))}
              </fieldset>
            ))}
          </div>

          <div className="flex items-center gap-s3">
            <button
              type="button"
              onClick={() => commit({ ...emptyFilters, sort: draft.sort })}
              className="text-link cursor-pointer border-0 bg-transparent p-0 text-ink"
            >
              {dict.clear} <span aria-hidden="true">→</span>
            </button>
            <button type="button" onClick={() => commit(draft)} className="btn-primary">
              {dict.apply}
            </button>
          </div>
        </div>

        {chips.length > 0 && (
          <div role="group" aria-label={dict.activeFilters} className="t-label mt-s2 flex flex-wrap items-center gap-x-s3 gap-y-1 text-ink-soft">
            {chips.map((chip) => (
              <span key={chip.key} className="inline-flex items-center gap-2 text-ink">
                {chip.label}
                <button
                  type="button"
                  aria-label={fill(dict.removeFilter, { name: chip.label })}
                  onClick={() => commit(chip.remove)}
                  className="inline-flex h-[44px] min-w-[24px] cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-ink"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </span>
            ))}
            {hasActiveFilters(applied) && (
              <button
                type="button"
                onClick={() => commit({ ...emptyFilters, sort: applied.sort })}
                className="inline-flex min-h-[44px] cursor-pointer items-center border-0 bg-transparent p-0 font-normal text-ink underline decoration-1 underline-offset-[6px]"
              >
                {dict.clearAll}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-s4">
        {shown.length === 0 ? (
          <p className="measure m-0 py-s5 text-center">{dict.noResults}</p>
        ) : (
          <ul className="m-0 grid list-none grid-cols-1 gap-x-s2 gap-y-s4 p-0 md:grid-cols-2">
            {shown.map((property) => (
              <li key={property.slug} className="min-w-0">
                <PropertyCard property={property} lang={lang} dict={propertyDict} showFeatures />
              </li>
            ))}
          </ul>
        )}
      </div>

      {results.length > PAGE_SIZE && (
        <div className="flex flex-col items-center gap-s2 pt-s5">
          <span className="t-label text-ink-soft">
            {fill(dict.showing, { shown: shown.length, total: results.length })}
          </span>
          {shown.length < results.length && (
            <button type="button" onClick={() => setVisible(visible + PAGE_SIZE)} className="btn-outline">
              {dict.showMore}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
