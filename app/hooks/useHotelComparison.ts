import { useCallback, useEffect, useMemo, useState } from "react";
import { NormalizedPlace } from "../types/wordpress";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useHotelComparison({
  eligiblePlaces,
  allPlaces,
}: {
  eligiblePlaces: NormalizedPlace[];
  allPlaces: NormalizedPlace[];
}): {
  visibleComparisonPlaces: NormalizedPlace[];
  selectedPlaceIds: number[];
  clearAllPlaces: () => void;
  selectAllPlaces: () => void;
  handleCheckboxChange: (id: number, isChecked: boolean) => void;
  isEligible: (place: NormalizedPlace) => boolean;
} {
  const searchParams = useSearchParams();
  const URLHotelIds = searchParams.get("compare");
  const router = useRouter();
  const pathname = usePathname();
  const initialSelectedHotelIds: number[] = URLHotelIds
    ? URLHotelIds.split(",").map(Number).filter(Number.isFinite)
    : allPlaces.map((place) => place.id);
  const [selectedPlaceIds, setSelectedPlaceIds] = useState(
    initialSelectedHotelIds
  );
  const visibleComparisonPlaces = eligiblePlaces.filter((place) =>
    selectedPlaceIds.includes(place.id)
  );
  const eligiblePlaceIds = new Set(eligiblePlaces.map((place) => place.id));
  const allPlacesIds = useMemo(() => allPlaces.map((p) => p.id), [allPlaces]);

  function isEligible(place: NormalizedPlace) {
    return eligiblePlaceIds.has(place.id);
  }

  function handleCheckboxChange(id: number, isChecked: boolean) {
    setSelectedPlaceIds((prevIds) => {
      let updatedIds;
      if (isChecked) {
        if (prevIds.includes(id)) return prevIds;
        updatedIds = [...prevIds, id];
      } else {
        updatedIds = prevIds.filter((prevId) => prevId !== id);
      }

      return updatedIds;
    });
  }

  function selectAllPlaces() {
    setSelectedPlaceIds(allPlacesIds);
  }

  function clearAllPlaces() {
    setSelectedPlaceIds([]);
  }

  useEffect(() => {
    function setURLParams(ids: number[]) {
      const allHotelsSelected = ids.length === allPlacesIds.length;

      if (ids.length > 0 && !allHotelsSelected) {
        router.replace(`${pathname}?compare=${ids.join(",")}`, {
          scroll: false,
        });
      } else {
        router.replace(pathname, { scroll: false });
      }
    }
    setURLParams(selectedPlaceIds);
  }, [selectedPlaceIds, allPlacesIds.length, router, pathname]);

  return {
    visibleComparisonPlaces,
    selectedPlaceIds,
    clearAllPlaces,
    selectAllPlaces,
    handleCheckboxChange,
    isEligible,
  };
}
