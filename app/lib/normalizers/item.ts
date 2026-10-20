import { Item } from "@/app/types/app/item";
import { Place } from "@/app/types/app/place";

export function toItem(place: Place): Item {
  return place.placeType === "hotel"
    ? { kind: "hotel", data: place }
    : { kind: "place", data: place };
}
