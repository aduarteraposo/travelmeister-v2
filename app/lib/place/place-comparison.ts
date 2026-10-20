import { Place } from "@/app/types/app/place";

export type PlaceAttributeValue = string | PlaceCTAObject | null;

export type PlaceAttributeRow = [string, PlaceAttributeValue[]];

export type PlaceRowDefinition = {
  label: string;
  getValue: (place: Place) => PlaceAttributeValue;
};

export type PlaceCTAObject = {
  label: string;
  url: string;
};

function getPlaceHighlightsFromTags(
  tags: { label: string }[],
  amount: number = tags.length
) {
  const preparedTags =
    tags.length > 0
      ? tags
          .slice(0, amount)
          .map((tag) => tag.label)
          .join(", ")
      : "";
  return preparedTags;
}

function getPlaceCTA(place: Place) {
  if (place.ctaLinks.length > 0) {
    return {
      label: "See details",
      url: place.ctaLinks[0]?.url || "",
    };
  }

  return null;
}

function getPlaceHighlights(place: Place) {
  return getPlaceHighlightsFromTags(place.editorTags, 3);
}

export function getPlaceAttributesArray(places: Place[]) {
  const rows: PlaceRowDefinition[] = [
    {
      label: "Ideal for",
      getValue: (place) => place.idealFor?.join(", "),
    },
    { label: "Price", getValue: (place) => place.budget },
    {
      label: "Highlights",
      getValue: (place) => getPlaceHighlights(place),
    },
    { label: "", getValue: (place) => getPlaceCTA(place) },
  ];

  const placeAttributesArray: PlaceAttributeRow[] = rows.map((row) => [
    row.label,
    places.map(row.getValue),
  ]);

  return placeAttributesArray;
}
