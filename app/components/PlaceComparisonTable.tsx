"use client";

import Link from "next/link";
import { slugify } from "../lib/utils";
import { getPlaceAttributesArray } from "../lib/place/place-comparison";
import type { Place } from "../types/app/place";
import { useRef, useState } from "react";
import usePlaceComparison from "../hooks/usePlaceComparison";

export default function PlaceComparisonTable({
  eligiblePlaces,
  allPlaces,
}: {
  eligiblePlaces: Place[];
  allPlaces: Place[];
}) {
  const {
    selectedPlaceIds,
    visibleComparisonPlaces,
    selectAllPlaces,
    clearAllPlaces,
    handleCheckboxChange,
    isEligible,
  } = usePlaceComparison({
    allPlaces,
    eligiblePlaces,
  });

  const placeNameArray = visibleComparisonPlaces.map((place) => place.title);
  const placeAttributesArray = getPlaceAttributesArray(visibleComparisonPlaces);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScrollFade, setShowLeftScrollFade] = useState(false);
  const [showRightScrollFade, setShowRightScrollFade] = useState(false);

  function handleScroll() {
    const scrollContainerEl = scrollContainerRef.current;

    if (!scrollContainerEl || scrollContainerEl.childElementCount === 0) {
      return;
    }

    if (scrollContainerEl.scrollLeft > 0) {
      setShowLeftScrollFade(true);
    }

    if (scrollContainerEl.scrollLeft === 0) {
      setShowLeftScrollFade(false);
    }

    if (
      scrollContainerEl.clientWidth + scrollContainerEl.scrollLeft >=
      scrollContainerEl.scrollWidth - 1
    ) {
      setShowRightScrollFade(false);
    } else if (
      scrollContainerEl.clientWidth + scrollContainerEl.scrollLeft <
      scrollContainerEl.scrollWidth - 1
    ) {
      setShowRightScrollFade(true);
    }
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={selectAllPlaces}
          className="rounded-full px-3 py-1 bg-black text-white mr-4 mb-4 text-sm"
        >
          Select All
        </button>
        <button
          type="button"
          onClick={clearAllPlaces}
          className="rounded-full px-3 py-1 bg-black text-white text-sm"
        >
          Clear All
        </button>
        <ul className="flex flex-wrap gap-4">
          {allPlaces.map((place) => (
            <li key={place.slug} className="flex gap-2 items-center">
              <label htmlFor={place.slug}>
                <input
                  className="mr-2"
                  type="checkbox"
                  name={place.title}
                  id={place.slug}
                  checked={selectedPlaceIds.includes(place.id)}
                  onChange={(e) =>
                    handleCheckboxChange(place.id, e.currentTarget.checked)
                  }
                  disabled={!isEligible(place)}
                />
                {place.title}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative my-8">
        <div
          onScroll={handleScroll}
          ref={scrollContainerRef}
          className="overflow-x-scroll max-w-full no-scrollbar no-bouncing"
          id="scroll-container"
        >
          <table className=" w-full min-w-max">
            <thead className="bg-black text-white">
              <tr>
                <th className="bg-white sticky left-0 w-24 max-w-24"></th>
                {placeNameArray.map((name, index) => (
                  <th
                    key={`${name}_${index}`}
                    className="p-2 pr-8 w-70 max-w-70 truncate"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {placeAttributesArray.map((attribute, index) => (
                <tr key={`${attribute[0]}_${index}`} className="group">
                  <td className="sticky p-2 bg-black text-white border-b border-white left-0 w-24 max-w-24 text-center group-last:bg-white">
                    {attribute[0]}
                  </td>
                  {attribute[1].map((item, index) =>
                    typeof item === "string" ? (
                      <td
                        className="p-2 pr-8 border-b border-gray-300 text-center"
                        key={`${item}_${index}`}
                      >
                        {item}
                      </td>
                    ) : (
                      <td
                        className="py-4 pr-8 text-center"
                        key={`${item.url}_${index}`}
                      >
                        {item.url && (
                          <Link
                            className="rounded-full py-2 px-4 bg-green-300 font-medium"
                            href={item.url}
                          >
                            {item.label}
                          </Link>
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showLeftScrollFade && (
          <div className="pointer-events-none absolute left-24 top-0 h-full w-8 bg-linear-to-r from-white to-transparent" />
        )}
        {showRightScrollFade && (
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-linear-to-l from-white to-transparent" />
        )}
      </div>
      <div className="max-w-full overflow-scroll mt-16">
        <table className="table-auto border-collapse border border-gray-400 rounded-sm">
          <thead className="bg-black text-white">
            <tr className="text-left">
              <th className="p-2 border border-gray-600">place</th>
              <th className="p-2 border border-gray-600">Best for</th>
              <th className="p-2 border border-gray-600">Area</th>
              <th className="p-2 border border-gray-600">Price</th>
              <th className="p-2 border border-gray-600">Highlights</th>
              <th className="p-2 border border-gray-600">Link</th>
            </tr>
          </thead>
          <tbody>
            {visibleComparisonPlaces.map((place) =>
              place.acf.show_in_table ? (
                <tr className="" key={slugify(place.title)}>
                  <td className="p-2 border border-gray-300">{place.title}</td>
                  <td className="p-2 border border-gray-300">
                    {place.acf.best_if}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {place.acf.location}
                  </td>
                  <td className="p-2 border border-gray-300 text-center">
                    {place.acf.budget}
                  </td>
                  <td className="p-2 border border-gray-300">{`${place.acf.editor_tags[0].label}, ${place.acf.editor_tags[1]?.label}, ${place.acf.editor_tags[2]?.label}`}</td>
                  <td className="p-2 border border-gray-300">
                    <Link href={place.acf.cta_links[0].url}>
                      {place.acf.cta_links[0].label}
                    </Link>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
// Vertical Scroll Comparison Table
{
  /* <div className="max-w-full overflow-scroll mt-16">
  <table className="table-auto border-collapse border border-gray-400 rounded-sm">
    <thead className="bg-black text-white">
      <tr className="text-left">
        <th className="p-2 border border-gray-600">place</th>
        <th className="p-2 border border-gray-600">Best for</th>
        <th className="p-2 border border-gray-600">Area</th>
        <th className="p-2 border border-gray-600">Price</th>
        <th className="p-2 border border-gray-600">Highlights</th>
        <th className="p-2 border border-gray-600">Link</th>
      </tr>
    </thead>
    <tbody>
      {places.map((place) =>
        place.comparison.show_in_table ? (
          <tr className="" key={slugify(place.name)}>
            <td className="p-2 border border-gray-300">{place.name}</td>
            <td className="p-2 border border-gray-300">{place.best_if}</td>
            <td className="p-2 border border-gray-300">{place.area}</td>
            <td className="p-2 border border-gray-300 text-center">
              {place.price_level}
            </td>
            <td className="p-2 border border-gray-300">{`${place.tags[0].label}, ${place.tags[1]?.label}, ${place.tags[2]?.label}`}</td>
            <td className="p-2 border border-gray-300">
              <Link href={place.booking_links[0].link.url}>See details</Link>
            </td>
          </tr>
        ) : null
      )}
    </tbody>
  </table>
</div>; */
}
