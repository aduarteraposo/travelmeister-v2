"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import PlaceComparisonTable from "./PlaceComparisonTable";
import PlaceList from "./PlaceList";
import Filters from "./Filters";
import { PlaceWithSection } from "../types/app/place";

export default function FilterContainer({
  places,
}: {
  places: PlaceWithSection[];
}) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
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
            <Filters
              filters={availableFilters}
              setFilter={setActiveFilter}
              activeFilter={activeFilter}
            />
            <PlaceList places={filteredPlaces} />
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
            {/* Temporary placeholders */}

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
      <div className="mt-40">
        <Filters
          filters={availableFilters}
          setFilter={setActiveFilter}
          activeFilter={activeFilter}
          fixed={true}
        />
        <Suspense fallback={null}>
          <PlaceComparisonTable
            eligiblePlaces={filteredPlaces}
            allPlaces={places}
          />
        </Suspense>
      </div>
    </>
  );
}
