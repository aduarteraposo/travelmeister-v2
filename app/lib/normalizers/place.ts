import { Place } from "@/app/types/app/place";
import { WPPlace } from "@/app/types/wordpress/place";

export function normalizePlace(place: WPPlace): Place {
  const acf = place.acf ?? {};

  const normalizedPlace = {
    ...place,
    title: place.title ? place.title.rendered : "",
    acf: {
      ...acf,
      hotel_filters: Array.isArray(acf.hotel_filters)
        ? acf.hotel_filters.map((filter) => filter.slug)
        : [],
      restaurant_filters: Array.isArray(acf.restaurant_filters)
        ? acf.restaurant_filters.map((filter) => filter.slug)
        : [],
      tour_filters: Array.isArray(acf.tour_filters)
        ? acf.tour_filters.map((filter) => filter.slug)
        : [],
      sight_filters: Array.isArray(acf.sight_filters)
        ? acf.sight_filters.map((filter) => filter.slug)
        : [],
    },
  };

  return normalizedPlace;
}
