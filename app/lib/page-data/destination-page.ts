import { notFound } from "next/navigation";
import {
  getTravelStylePlaceIDs,
  mapDestinationWithPlacesAndSubDestinationsAndPosts,
} from "../normalizers/destination";
import { mapById } from "../utils";
import { normalizePlace } from "../normalizers/place";
import { Destination } from "@/app/types/app/destination";
import {
  getDestinationBySlug,
  getDestinationsByIds,
} from "../wordpress/destination";
import { getPlacesByIds } from "../wordpress/place";
import { getPostsByIds } from "../wordpress/post";

export async function getDestinationPageData(destinationSlug: string) {
  const destination = await getDestinationBySlug(destinationSlug);
  if (!destination) {
    notFound();
  }

  const travelStylePlaceIDs = getTravelStylePlaceIDs(destination);

  const placesIds: number[] = [
    ...travelStylePlaceIDs,
    ...(destination.acf.featured_hotels
      ? destination.acf.featured_hotels.map((hotel) => hotel.place.ID)
      : []),
    ...(destination.acf.featured_restaurants
      ? destination.acf.featured_restaurants.map(
          (restaurant) => restaurant.place.ID
        )
      : []),
    ...(destination.acf.featured_tours
      ? destination.acf.featured_tours.map((tour) => tour.place.ID)
      : []),
    ...(destination.acf.featured_sights
      ? destination.acf.featured_sights.map((sight) => sight.place.ID)
      : []),
  ];

  const subdestinationsIds: number[] = [
    ...(Array.isArray(destination.acf.featured_subdestinations)
      ? destination.acf.featured_subdestinations.map(
          (subDestination) => subDestination.ID
        )
      : []),
  ];

  const postIds: number[] = [
    ...(destination.acf.travel_styles
      ? destination.acf.travel_styles.flatMap((style) => [
          ...(style.related_articles
            ? style.related_articles.map((article) => article.ID)
            : []),
        ])
      : []),
    ...(destination.acf.article_sections
      ? destination.acf.article_sections.flatMap((section) => [
          ...(section.manual_articles
            ? section.manual_articles.map((article) => article.ID)
            : []),
        ])
      : []),
  ];

  const uniquePlacesIds = Array.from(new Set(placesIds));
  const uniqueSubdestinationsIds = Array.from(new Set(subdestinationsIds));
  const uniquePostIds = Array.from(new Set(postIds));

  const subDestinations = await getDestinationsByIds(uniqueSubdestinationsIds);
  const places = await getPlacesByIds(uniquePlacesIds);
  const posts = await getPostsByIds(uniquePostIds);

  const normalizedPlaces = places.map(normalizePlace);

  const subdestinationsById = mapById(subDestinations);
  const placesById = mapById(normalizedPlaces);
  const postsById = mapById(posts);

  const normalizedDestination: Destination =
    mapDestinationWithPlacesAndSubDestinationsAndPosts(
      destination,
      placesById,
      subdestinationsById,
      postsById
    );

  return normalizedDestination;
}
