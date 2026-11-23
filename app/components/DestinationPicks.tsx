"use client";

import useExploreFilters from "../hooks/useExploreFilters";
import { ExploreItem } from "../types/app/explore";
import ChipRow from "./ChipRow";
import ExploreCard from "./ExploreCard";

export default function DestinationPicks({
  picks,
  destinationId,
}: {
  picks: ExploreItem[];
  destinationId: number;
}) {
  const { state, tabOptions, filteredItems, selectTab } = useExploreFilters(
    picks,
    destinationId,
    { tab: "stay" }
  );

  return (
    <section className="mb-16">
      <h2 className="font-outdoor text-6xl mb-3">Our Picks</h2>
      <ChipRow options={tabOptions} selected={state.tab} onSelect={selectTab} />
      <ul className="flex overflow-x-auto snap-x gap-4 md:grid md:grid-cols-3">
        {filteredItems.map((item) => (
          <li
            key={item.id}
            className="border rounded-xl w-72 shrink-0 md:w-auto"
          >
            <ExploreCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
