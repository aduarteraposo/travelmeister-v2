"use client";
import { useState } from "react";
import { HotelWithSection } from "../types/wordpress";
import HotelComparisonTable from "./HotelComparisonTable";
import HotelList from "./HotelList";
import { firstCapitalLetter } from "../lib/wordpress-utils";

export default function FilterContainer({
  hotels,
}: {
  hotels: HotelWithSection[];
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredHotels =
    activeFilter === "all"
      ? hotels
      : hotels.filter((hotel) =>
          hotel.filter_categories.includes(activeFilter)
        );

  const availableFilters = [
    "all",
    ...new Set(hotels.flatMap((hotel) => hotel.filter_categories)),
  ];

  function handleFilterClick(filter: string) {
    setActiveFilter(filter);
  }

  return (
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
              {firstCapitalLetter(filter)}
            </button>
          </li>
        ))}
      </ul>
      <HotelList hotels={filteredHotels} />
      <HotelComparisonTable hotels={filteredHotels} />
    </div>
  );
}
