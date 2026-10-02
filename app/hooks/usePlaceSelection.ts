import { useEffect, useState } from "react";
import { Place, PlaceWithSection } from "../types/app/place";
import { usePathname, useRouter } from "next/navigation";

export default function usePlaceSelection({
  filteredPlaces,
  allPlaces,
}: {
  filteredPlaces: PlaceWithSection[];
  allPlaces: PlaceWithSection[];
}): {
  visiblePlaces: PlaceWithSection[];
  isSelected: (place: Place) => boolean;
  clearAllPlaces: () => void;
  selectAllPlaces: () => void;
  handleCheckboxChange: (id: number, isChecked: boolean) => void;
  isEligible: (place: Place) => boolean;
  isVisible: (place: Place) => boolean;
} {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    () => new Set(allPlaces.map((place) => place.id))
  );

  // Read the URL only after mount, so the static HTML always contains all
  // places. Using useSearchParams instead would require a Suspense boundary,
  // which would remove the whole section from the static HTML.
  useEffect(() => {
    const URLPlaceIds = new URLSearchParams(window.location.search).get(
      "compare"
    );
    if (URLPlaceIds) {
      // Syncing from the URL (outside React) after hydration is intended here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIds(
        new Set(URLPlaceIds.split(",").map(Number).filter(Number.isFinite))
      );
    }
  }, []);
  const visiblePlaces = filteredPlaces.filter((place) =>
    selectedIds.has(place.id)
  );
  const eligiblePlaceIds = new Set(filteredPlaces.map((place) => place.id));

  function updateSelection(updatedIds: Set<number>) {
    setSelectedIds(updatedIds);

    const allPlacesSelected = updatedIds.size === allPlaces.length;
    if (updatedIds.size > 0 && !allPlacesSelected) {
      router.replace(`${pathname}?compare=${[...updatedIds].join(",")}`, {
        scroll: false,
      });
    } else {
      router.replace(pathname, { scroll: false });
    }
  }

  function isSelected(place: Place) {
    return selectedIds.has(place.id);
  }

  function isEligible(place: Place) {
    return eligiblePlaceIds.has(place.id);
  }

  function isVisible(place: Place) {
    return isEligible(place) && isSelected(place);
  }

  function handleCheckboxChange(id: number, isChecked: boolean) {
    const updatedIds = new Set(selectedIds);
    if (isChecked) {
      updatedIds.add(id);
    } else {
      updatedIds.delete(id);
    }
    updateSelection(updatedIds);
  }

  function selectAllPlaces() {
    updateSelection(new Set(allPlaces.map((place) => place.id)));
  }

  function clearAllPlaces() {
    updateSelection(new Set());
  }

  return {
    visiblePlaces,
    isSelected,
    clearAllPlaces,
    selectAllPlaces,
    handleCheckboxChange,
    isEligible,
    isVisible,
  };
}
