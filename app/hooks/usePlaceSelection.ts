import { useEffect, useState } from "react";
import { Place } from "../types/app/place";
import { usePathname, useRouter } from "next/navigation";

export default function usePlaceSelection({
  filteredHotels,
  allHotels,
}: {
  filteredHotels: Place[];
  allHotels: Place[];
}): {
  visiblePlaces: Place[];
  isSelected: (place: Place) => boolean;
  clearAllHotels: () => void;
  selectAllHotels: () => void;
  handleCheckboxChange: (id: number, isChecked: boolean) => void;
  isEligible: (place: Place) => boolean;
  isVisible: (place: Place) => boolean;
} {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    () => new Set(allHotels.map((place) => place.id))
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
  const visiblePlaces = filteredHotels.filter((place) =>
    selectedIds.has(place.id)
  );
  const eligiblePlaceIds = new Set(filteredHotels.map((place) => place.id));

  function updateSelection(updatedIds: Set<number>) {
    setSelectedIds(updatedIds);

    const allHotelsSelected = updatedIds.size === allHotels.length;
    if (updatedIds.size > 0 && !allHotelsSelected) {
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

  function selectAllHotels() {
    updateSelection(new Set(allHotels.map((place) => place.id)));
  }

  function clearAllHotels() {
    updateSelection(new Set());
  }

  return {
    visiblePlaces,
    isSelected,
    clearAllHotels,
    selectAllHotels,
    handleCheckboxChange,
    isEligible,
    isVisible,
  };
}
