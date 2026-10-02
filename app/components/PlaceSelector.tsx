"use client";

import { useId } from "react";
import type { Place } from "../types/app/place";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "cn";

export default function PlaceSelector({
  allPlaces,
  isSelected,
  isEligible,
  handleCheckboxChange,
  selectAllPlaces,
  clearAllPlaces,
}: {
  allPlaces: Place[];
  isSelected: (place: Place) => boolean;
  isEligible: (place: Place) => boolean;
  handleCheckboxChange: (id: number, isChecked: boolean) => void;
  selectAllPlaces: () => void;
  clearAllPlaces: () => void;
}) {
  // Each PlaceSelector instance needs unique checkbox ids, otherwise the
  // labels of the second instance would toggle the first one's checkboxes.
  const idPrefix = useId();

  return (
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
            <label
              htmlFor={`${idPrefix}-${place.slug}`}
              className={cn(
                "flex items-center",
                isEligible(place)
                  ? "cursor-pointer"
                  : "cursor-not-allowed text-gray-400"
              )}
            >
              <Checkbox
                checked={isSelected(place)}
                id={`${idPrefix}-${place.slug}`}
                onCheckedChange={(e) => handleCheckboxChange(place.id, e)}
                disabled={!isEligible(place)}
                className="mr-2"
              />
              {place.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
