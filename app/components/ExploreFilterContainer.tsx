"use client";

import { ExploreItem } from "../types/app/explore";
import { Checkbox } from "@/components/ui/checkbox";
import useExploreFilters from "../hooks/useExploreFilters";
import ExploreCard from "./ExploreCard";
import ChipRow from "./ChipRow";

export default function ExploreFilterContainer({
  items,
  destinationId,
  destinationName,
}: {
  items: ExploreItem[];
  destinationId: number;
  destinationName: string;
}) {
  const {
    state,
    selectTab,
    selectArea,
    selectFilter,
    selectSubtype,
    toggleBeenThere,
    filteredItems,
    tabOptions,
    areaOptions,
    filterOptions,
    subtypeOptions,
    allTabsCount,
  } = useExploreFilters(items, destinationId);

  return (
    <>
      <div className="mb-12">
        <ChipRow
          options={tabOptions}
          selected={state.tab}
          selectAll={{
            label: "All",
            count: allTabsCount,
          }}
          onSelect={selectTab}
        />
        <ChipRow
          label="Neighborhoods:"
          options={areaOptions}
          selectAll={{ label: `All of ${destinationName}` }}
          selected={state.area}
          onSelect={selectArea}
        />
        <ChipRow
          label="Good for:"
          options={filterOptions}
          selected={state.filter}
          selectAll={{ label: "Anything" }}
          onSelect={selectFilter}
        />
        {state.tab && (
          <ChipRow
            label="Type:"
            options={subtypeOptions}
            selected={state.subtype}
            selectAll={{ label: "All" }}
            onSelect={selectSubtype}
          />
        )}
        <div>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={state.beenThereOnly}
              onCheckedChange={toggleBeenThere}
            />
            Only places we stayed or visited and experiences we tried
          </label>
        </div>
      </div>
      {filteredItems.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <li key={item.id} className="border rounded-xl">
              <ExploreCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}
    </>
  );
}
