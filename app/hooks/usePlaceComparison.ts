import { useEffect, useMemo, useState } from "react";
import { Place } from "../types/app/place";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function usePlaceComparison({
  eligiblePlaces,
  allPlaces,
}: {
  eligiblePlaces: Place[];
  allPlaces: Place[];
}): {
  visibleComparisonPlaces: Place[];
  selectedPlaceIds: number[];
  clearAllPlaces: () => void;
  selectAllPlaces: () => void;
  handleCheckboxChange: (id: number, isChecked: boolean) => void;
  isEligible: (place: Place) => boolean;
} {
  const searchParams = useSearchParams();
  const URLPlaceIds = searchParams.get("compare");
  const router = useRouter();
  const pathname = usePathname();
  const initialSelectedPlaceIds: number[] = URLPlaceIds
    ? URLPlaceIds.split(",").map(Number).filter(Number.isFinite)
    : allPlaces.map((place) => place.id);
  const [selectedPlaceIds, setSelectedPlaceIds] = useState(
    initialSelectedPlaceIds
  );
  const visibleComparisonPlaces = eligiblePlaces.filter((place) =>
    selectedPlaceIds.includes(place.id)
  );
  const eligiblePlaceIds = new Set(eligiblePlaces.map((place) => place.id));
  const allPlacesIds = useMemo(() => allPlaces.map((p) => p.id), [allPlaces]);

  function isEligible(place: Place) {
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
      const allPlacesSelected = ids.length === allPlacesIds.length;

      if (ids.length > 0 && !allPlacesSelected) {
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
