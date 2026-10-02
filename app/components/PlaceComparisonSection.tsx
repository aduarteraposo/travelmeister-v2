"use client";

import { PlaceWithSection } from "../types/app/place";
import usePlaceSelection from "../hooks/usePlaceSelection";
import PlaceSelector from "./PlaceSelector";
import PlaceComparisonTable from "./PlaceComparisonTable";
import SocialEmbeds from "./SocialEmbeds";

export default function PlaceComparisonSection({
  allPlaces,
  filteredPlaces,
  filters,
  setFilter,
  activeFilter,
}: {
  allPlaces: PlaceWithSection[];
  filteredPlaces: PlaceWithSection[];
  filters: string[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  activeFilter: string;
}) {
  const {
    visiblePlaces,
    isSelected,
    isEligible,
    isVisible,
    handleCheckboxChange,
    selectAllPlaces,
    clearAllPlaces,
  } = usePlaceSelection({ allPlaces, filteredPlaces });

  const placeSelector = (
    <PlaceSelector
      allPlaces={allPlaces}
      isSelected={isSelected}
      isEligible={isEligible}
      handleCheckboxChange={handleCheckboxChange}
      selectAllPlaces={selectAllPlaces}
      clearAllPlaces={clearAllPlaces}
    />
  );

  return (
    <>
      {placeSelector}
      <PlaceComparisonTable visiblePlaces={visiblePlaces} />
      <SocialEmbeds
        allPlaces={allPlaces}
        isVisible={isVisible}
        placeSelector={placeSelector}
        filters={filters}
        setFilter={setFilter}
        activeFilter={activeFilter}
      />
    </>
  );
}
