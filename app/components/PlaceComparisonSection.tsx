"use client";

import { Place, Term } from "../types/app/place";
import usePlaceSelection from "../hooks/usePlaceSelection";
import PlaceSelector from "./PlaceSelector";
import PlaceComparisonTable from "./PlaceComparisonTable";
import SocialEmbeds from "./SocialEmbeds";

export default function HotelComparisonSection({
  allHotels,
  filteredHotels,
  filters,
  setFilter,
  activeFilter,
}: {
  allHotels: Place[];
  filteredHotels: Place[];
  filters: Term[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  activeFilter: string;
}) {
  const {
    visiblePlaces,
    isSelected,
    isEligible,
    isVisible,
    handleCheckboxChange,
    selectAllHotels,
    clearAllHotels,
  } = usePlaceSelection({ allHotels, filteredHotels });

  const hotelSelector = (
    <PlaceSelector
      allPlaces={allHotels}
      isSelected={isSelected}
      isEligible={isEligible}
      handleCheckboxChange={handleCheckboxChange}
      selectAllPlaces={selectAllHotels}
      clearAllPlaces={clearAllHotels}
    />
  );

  return (
    <>
      {hotelSelector}
      <PlaceComparisonTable visibleHotels={visiblePlaces} />
      <SocialEmbeds
        allHotels={allHotels}
        isVisible={isVisible}
        hotelSelector={hotelSelector}
        filters={filters}
        setFilter={setFilter}
        activeFilter={activeFilter}
      />
    </>
  );
}
