"use client";

import { useState } from "react";
import { ExploreItem, ExploreTab } from "../types/app/explore";
import { EXPLORE_TABS } from "../lib/explore-tabs-config";
import { Checkbox } from "@/components/ui/checkbox";
import { WPDestination } from "../types/wordpress/destination";
import Image from "next/image";

type ExploreState = {
  tab: ExploreTab["id"] | null;
  subtype: string | null;
  filter: string | null;
  area: number | null;
  beenThereOnly: boolean;
};

export default function ExploreFilterContainer({
  items,
  destinationId,
}: {
  items: ExploreItem[];
  destinationId: number;
}) {
  const [tab, setTab] = useState<ExploreState["tab"]>(null);
  const [area, setArea] = useState<ExploreState["area"]>(null);
  const [subtype, setSubtype] = useState<ExploreState["subtype"]>(null);
  const [filter, setFilter] = useState<ExploreState["filter"]>(null);
  const [beenThereOnly, setBeenThereOnly] =
    useState<ExploreState["beenThereOnly"]>(false);

  const currentState = { tab, area, subtype, filter, beenThereOnly };

  const filteredItems = items.filter((item) => matches(item, currentState));

  const tabs = EXPLORE_TABS.map((tab) => ({
    ...tab,
    count: countFor(tab.id),
  })).filter((tab) => items.some((item) => item.tab === tab.id));

  const filters = uniqueBy(
    items.flatMap((item) => item.filters),
    (filter) => filter.id
  );

  const areas = uniqueBy(
    items.flatMap((item) => (item.area ? [item.area] : [])),
    (area) => area.id
  ).filter((area) => area.id !== destinationId);

  const subtypes = uniqueBy(
    items.flatMap((item) =>
      item.subtype ? [{ ...item.subtype, tab: item.tab }] : []
    ),
    (subtype) => subtype.id
  );

  function uniqueBy<T>(list: T[], key: (item: T) => string | number): T[] {
    const seen = new Set<string | number>();
    return list.filter((item) => {
      const value = key(item);
      if (seen.has(value)) {
        return false;
      } else {
        seen.add(value);
        return true;
      }
    });
  }

  function matches(item: ExploreItem, state: ExploreState): boolean {
    return (
      (!state.tab || item.tab === state.tab) &&
      (!state.area || (item.area !== null && item.area.id === state.area)) &&
      (!state.subtype || item.subtype?.slug === state.subtype) &&
      (!state.filter ||
        item.filters.some((filter) => filter.slug === state.filter)) &&
      (!state.beenThereOnly || item.beenThere)
    );
  }

  function countFor(tab: ExploreTab["id"] | null) {
    const matchingItems = items.filter((item) =>
      matches(item, { ...currentState, tab, subtype: null })
    );

    return matchingItems.length;
  }

  return (
    <>
      <ul className="flex">
        <li
          className={`rounded-full border px-3 py-1.5 text-sm hover:border-gray-600 hover:cursor-pointer ${
            tab === null ? "bg-green-300" : ""
          }`}
          key="all"
          onClick={() => {
            setTab(null);
            setSubtype(null);
          }}
        >
          All {countFor(null)}
        </li>
        {tabs.map((t) => (
          <li
            key={t.id}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              t.id === tab ? "bg-green-300" : ""
            } ${
              t.count === 0
                ? "bg-gray-300 opacity-50 hover:cursor-auto pointer-events-none"
                : "hover:cursor-pointer hover:border-gray-500"
            }`}
            onClick={() => {
              setTab(t.id);
              setSubtype(null);
            }}
          >
            {t.label} {t.count}
          </li>
        ))}
      </ul>

      <ul className="flex text-sm">
        <li
          className={`rounded-full px-3 py-1.5 border ${
            area === null ? "bg-green-300" : ""
          }`}
          key="all"
          onClick={() => {
            setArea(null);
          }}
        >
          All
        </li>
        {areas.map((a) => (
          <li
            className={`rounded-full px-3 py-1.5 border ${
              a.id === area ? "bg-green-300" : ""
            }`}
            key={a.slug}
            onClick={() => {
              setArea(a.id);
            }}
          >
            {a.label}
          </li>
        ))}
      </ul>

      <ul className="flex text-sm">
        <li
          className={`rounded-full px-3 py-1.5 border ${
            filter === null ? "bg-green-300" : ""
          }`}
          key="all"
          onClick={() => {
            setFilter(null);
          }}
        >
          All
        </li>
        {filters.map((f) => (
          <li
            className={`rounded-full px-3 py-1.5 border ${
              f.slug === filter ? "bg-green-300" : ""
            }`}
            key={f.slug}
            onClick={() => {
              setFilter(f.slug);
            }}
          >
            {f.name}
          </li>
        ))}
      </ul>
      {tab && (
        <ul className="flex text-sm">
          <li
            className={`rounded-full px-3 py-1.5 border ${
              subtype === null ? "bg-green-300" : ""
            }`}
            onClick={() => {
              setSubtype(null);
            }}
          >
            All
          </li>
          {subtypes.map((type) =>
            type.tab && type.tab === tab ? (
              <li
                className={`rounded-full px-3 py-1.5 border ${
                  subtype === type.slug ? "bg-green-300" : ""
                }`}
                key={type.slug}
                onClick={() => {
                  setSubtype(type.slug);
                }}
              >
                {type.name}
              </li>
            ) : null
          )}
        </ul>
      )}
      <div>
        <label className="flex items-center gap-2">
          <Checkbox
            checked={beenThereOnly}
            onCheckedChange={() => setBeenThereOnly((current) => !current)}
          />
          Only places we stayed or visited and experiences we tried
        </label>
      </div>
      {filteredItems.length > 0 ? (
        <ul className="grid grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <li key={item.id} className="border rounded-xl">
              <Image
                className="h-44 object-cover rounded-t-xl"
                src={item.image?.url ? item.image.url : ""}
                alt={item.image?.alt ? item.image.alt : ""}
                width={item.image?.width}
                height={item.image?.height}
              />
              <div className="p-4">
                <h4>{item.title}</h4>
                <p>{item.tab}</p>
                {item.subtype && <p>{item.subtype.name}</p>}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}
    </>
  );
}
