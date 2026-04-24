"use client";

import Link from "next/link";
import { getPlaceAttributesArray } from "../lib/wordpress-utils";
import type { NormalizedPlace } from "../types/wordpress";
import { useRef, useState } from "react";

export default function HotelComparisonTable({
  places,
}: {
  places: NormalizedPlace[];
}) {
  const placesNameArray = places.map((place) => place.title.rendered);
  const placeAttributesArray = getPlaceAttributesArray(places);
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
    <div className="relative mt-28">
      <div
        onScroll={handleScroll}
        ref={scrollContainerRef}
        className="overflow-x-scroll my-16 max-w-full no-scrollbar no-bouncing"
        id="scroll-container"
      >
        <table className=" w-full min-w-max">
          <thead className="bg-black text-white">
            <tr>
              <th className="bg-white sticky left-0 w-24 max-w-24"></th>
              {placesNameArray.map((name, index) => (
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
  );
}

{
  /* <div className="max-w-full overflow-scroll mt-16">
  <table className="table-auto border-collapse border border-gray-400 rounded-sm">
    <thead className="bg-black text-white">
      <tr className="text-left">
        <th className="p-2 border border-gray-600">Hotel</th>
        <th className="p-2 border border-gray-600">Best for</th>
        <th className="p-2 border border-gray-600">Area</th>
        <th className="p-2 border border-gray-600">Price</th>
        <th className="p-2 border border-gray-600">Highlights</th>
        <th className="p-2 border border-gray-600">Link</th>
      </tr>
    </thead>
    <tbody>
      {hotels.map((hotel) =>
        hotel.comparison.show_in_table ? (
          <tr className="" key={slugify(hotel.name)}>
            <td className="p-2 border border-gray-300">{hotel.name}</td>
            <td className="p-2 border border-gray-300">{hotel.best_if}</td>
            <td className="p-2 border border-gray-300">{hotel.area}</td>
            <td className="p-2 border border-gray-300 text-center">
              {hotel.price_level}
            </td>
            <td className="p-2 border border-gray-300">{`${hotel.tags[0].label}, ${hotel.tags[1]?.label}, ${hotel.tags[2]?.label}`}</td>
            <td className="p-2 border border-gray-300">
              <Link href={hotel.booking_links[0].link.url}>See details</Link>
            </td>
          </tr>
        ) : null
      )}
    </tbody>
  </table>
</div>; */
}
