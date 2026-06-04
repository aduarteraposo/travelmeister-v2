import { Destination } from "@/app/types/app/destination";
import { Place } from "@/app/types/app/place";
import { WPDestination } from "@/app/types/wordpress/destination";
import { WPPost } from "@/app/types/wordpress/post";

export function mapDestinationWithPlacesAndSubDestinationsAndPosts(
  destination: WPDestination,
  placesById: Record<number, Place>,
  subdestionationsByIds: Record<number, WPDestination>,
  postsByIds: Record<number, WPPost>
): Destination {
  const normalizedDestination = {
    ...destination,
    acf: {
      ...destination.acf,
      travel_styles: Array.isArray(destination.acf.travel_styles)
        ? destination.acf.travel_styles.map((style) => ({
            ...style,
            where_to_stay: {
              ...style.where_to_stay,
              primary_place: placesById[style.where_to_stay.primary_place.ID],
              alternative_places: Array.isArray(
                style.where_to_stay.alternative_places
              )
                ? style.where_to_stay.alternative_places.map(
                    (place) => placesById[place.ID]
                  )
                : [],
            },
            featured_experiences: Array.isArray(style.featured_experiences)
              ? style.featured_experiences.map((place) => placesById[place.ID])
              : [],
            related_articles: Array.isArray(style.related_articles)
              ? style.related_articles.map((article) => postsByIds[article.ID])
              : [],
          }))
        : [],
      featured_subdestinations: Array.isArray(
        destination.acf.featured_subdestinations
      )
        ? destination.acf.featured_subdestinations.map(
            (subdestination) => subdestionationsByIds[subdestination.ID]
          )
        : [],

      featured_hotels: Array.isArray(destination.acf.featured_hotels)
        ? destination.acf.featured_hotels.map((hotel) => ({
            ...hotel,
            place: placesById[hotel.place.ID],
          }))
        : [],
      featured_restaurants: Array.isArray(destination.acf.featured_restaurants)
        ? destination.acf.featured_restaurants.map((restaurant) => ({
            ...restaurant,
            place: placesById[restaurant.place.ID],
          }))
        : [],
      featured_tours: Array.isArray(destination.acf.featured_tours)
        ? destination.acf.featured_tours.map((tour) => ({
            ...tour,
            place: placesById[tour.place.ID],
          }))
        : [],
      featured_sights: Array.isArray(destination.acf.featured_sights)
        ? destination.acf.featured_sights.map((sight) => ({
            ...sight,
            place: placesById[sight.place.ID],
          }))
        : [],
      article_sections: Array.isArray(destination.acf.article_sections)
        ? destination.acf.article_sections.map((section) => ({
            ...section,
            manual_articles: section.manual_articles
              ? section.manual_articles.map((article) => postsByIds[article.ID])
              : [],
          }))
        : [],
    },
  };

  return normalizedDestination;
}

export function getTravelStylePlaceIDs(destination: WPDestination) {
  return Array.isArray(destination.acf.travel_styles)
    ? destination.acf.travel_styles.flatMap((style) => [
        ...(style.where_to_stay.primary_place
          ? [style.where_to_stay.primary_place.ID]
          : []),
        ...(style.where_to_stay.alternative_places
          ? style.where_to_stay.alternative_places.map((place) => place.ID)
          : []),
        ...(style.featured_experiences
          ? style.featured_experiences.map((place) => place.ID)
          : []),
      ])
    : [];
}
