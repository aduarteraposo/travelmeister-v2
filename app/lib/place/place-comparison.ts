import { Place } from "@/app/types/app/place";

export type PlaceAttributeValue = string | PlaceCTAObject;

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
  return tags
    .slice(0, amount)
    .map((tag) => tag.label)
    .join(", ");
}

function getPlaceCTA(place: Place) {
  return {
    label: "See details",
    url: place.acf.cta_links[0]?.url || "",
  };
}

function getPlaceHighlights(place: Place) {
  return getPlaceHighlightsFromTags(place.acf.editor_tags, 3);
}

export function getPlaceAttributesArray(places: Place[]) {
  const rows: PlaceRowDefinition[] = [
    {
      label: "Ideal for",
      getValue: (place) => place.acf.ideal_for?.join(", "),
    },
    { label: "Location", getValue: (place) => place.acf.location },
    { label: "Price", getValue: (place) => place.acf.budget },
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
