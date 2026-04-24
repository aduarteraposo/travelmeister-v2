"use client";
import { useEffect, useRef, useState } from "react";
import { PlaceWithSection } from "../types/wordpress";
import HotelComparisonTable from "./HotelComparisonTable";
import HotelList from "./HotelList";
import { capitalizeFirstLetter } from "../lib/wordpress-utils";

export default function FilterContainer({
  places,
}: {
  places: PlaceWithSection[];
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredPlaces =
    activeFilter === "all"
      ? places
      : places.filter((place) =>
          place.acf.hotel_filters.includes(activeFilter)
        );

  const availableFilters = [
    "all",
    ...new Set(places.flatMap((place) => place.acf.hotel_filters)),
  ];

  function handleFilterClick(filter: string) {
    setActiveFilter(filter);
  }

  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const rightColumnRef = useRef<HTMLDivElement | null>(null);
  const [rightColumnAbsolute, setRightColumnAbsolute] = useState(false);

  useEffect(() => {
    const leftCol = leftColumnRef.current;
    const rightCol = rightColumnRef.current;

    if (!leftCol || !rightCol) return;

    const updateSticky = () => {
      if (leftCol.clientHeight <= rightCol.clientHeight) {
        setRightColumnAbsolute(true);
      }
    };

    updateSticky();

    const resizeObserver = new ResizeObserver(() => {
      updateSticky();
    });

    resizeObserver.observe(leftCol);
    window.addEventListener("resize", updateSticky);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSticky);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full lg:flex gap-12 relative ${
          rightColumnAbsolute ? "items-stretch" : "items-start"
        }`}
        ref={leftColumnRef}
      >
        <div className="basis-1 lg:basis-3/4 lg:max-w-3/4 shrink-0">
          <div>
            <ul className="flex gap-3 mb-12">
              {availableFilters.map((filter) => (
                <li key={filter}>
                  <button
                    onClick={() => handleFilterClick(filter)}
                    className={`rounded-full py-1 px-4 text-sm cursor-pointer font-medium ${
                      activeFilter === filter ? "bg-green-300" : "bg-gray-300"
                    }`}
                  >
                    {capitalizeFirstLetter(filter)}
                  </button>
                </li>
              ))}
            </ul>
            <HotelList places={filteredPlaces} />
          </div>
        </div>
        <div
          ref={rightColumnRef}
          className={`basis-1/4 top-8 ${
            rightColumnAbsolute ? "relative" : "sticky"
          }`}
        >
          <div
            className={`h-full right-0 top 0 max-h-full min-h-full w-full overflow-y-auto ${
              rightColumnAbsolute ? "absolute" : ""
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
            <div className="bg-gray-300 w-full h-48 mb-8"></div>
            <div className="bg-gray-300 w-full h-48 mb-8"></div>
            <div className="bg-gray-300 w-full h-48 mb-8"></div>
            <div className="bg-gray-300 w-full h-48 mb-8"></div>
            <div className="bg-gray-300 w-full h-48 mb-8"></div>
            <div className="bg-gray-300 w-full h-48 mb-8"></div>
            <div className="bg-gray-300 w-full h-48 mb-8"></div>
            <div className="bg-gray-300 w-full h-48 mb-8"></div>
            <div className="bg-gray-300 w-full h-48 mb-8"></div>
            <div className="bg-gray-300 w-full h-48 mb-8"></div>
            <div className="bg-gray-300 w-full h-48 mb-8"></div>
          </div>
        </div>
      </div>
      <HotelComparisonTable places={filteredPlaces} />
    </>
  );
}
