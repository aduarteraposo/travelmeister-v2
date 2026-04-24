import {
  NormalizedPost,
  Place,
  NormalizedPlace,
  WPPost,
  Destination,
  NormalizedDestination,
} from "../types/wordpress";

export function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function mapPlacesById(
  places: Place[]
): Record<number, NormalizedPlace> {
  const placesById = Object.fromEntries(
    places.map((place) => [
      place.id,
      {
        ...place,
        acf: {
          ...place.acf,
          hotel_filters: Array.isArray(place.acf.hotel_filters)
            ? place.acf.hotel_filters.map((filter) => filter.slug)
            : [],
          restaurant_filters: Array.isArray(place.acf.restaurant_filters)
            ? place.acf.hotel_filters.map((filter) => filter.slug)
            : [],
          tour_filters: Array.isArray(place.acf.tour_filters)
            ? place.acf.hotel_filters.map((filter) => filter.slug)
            : [],
          sight_filters: Array.isArray(place.acf.sight_filters)
            ? place.acf.hotel_filters.map((filter) => filter.slug)
            : [],
        },
      },
    ])
  );

  return placesById;
}

export function mapDestinationsById(
  destinations: Destination[]
): Record<number, Destination> {
  const destinationsById = Object.fromEntries(
    destinations.map((destination) => [
      destination.id,
      {
        ...destination,
      },
    ])
  );

  return destinationsById;
}

export function mapPostsById(posts: WPPost[]): Record<number, WPPost> {
  const postsById = Object.fromEntries(
    posts.map((post) => [
      post.id,
      {
        ...post,
      },
    ])
  );

  return postsById;
}

function getPlaceHighlightsFromTags(
  tags: { label: string }[],
  amount: number = tags.length
) {
  return tags
    .slice(0, amount)
    .map((tag) => tag.label)
    .join(", ");
}

function getPlaceCTA(place: NormalizedPlace) {
  return {
    label: "See details",
    url: place.acf.cta_links[0]?.url || "",
  };
}

function getPlaceHighlights(place: NormalizedPlace) {
  return getPlaceHighlightsFromTags(place.acf.editor_tags, 3);
}

export function getPlaceAttributesArray(places: NormalizedPlace[]) {
  const rows: RowDefinition[] = [
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

  const hotelAttributesArray: PlaceAttributeRow[] = rows.map((row) => [
    row.label,
    places.map(row.getValue),
  ]);

  return hotelAttributesArray;
}

export function capitalizeFirstLetter(str: string) {
  const firstLetter = str.charAt(0);
  const restWord = str.slice(1);

  return `${firstLetter.toUpperCase()}${restWord}`;
}

type PlaceAttributeValue = string | CTAObject;
type PlaceAttributeRow = [string, PlaceAttributeValue[]];
type RowDefinition = {
  label: string;
  getValue: (place: NormalizedPlace) => PlaceAttributeValue;
};
type CTAObject = {
  label: string;
  url: string;
};

export function mapPostWithPlaces(
  post: WPPost,
  placesById: Record<number, NormalizedPlace>
): NormalizedPost {
  const normalizedPost = {
    ...post,
    acf: {
      ...post.acf,
      list_sections: Array.isArray(post.acf.list_sections)
        ? post.acf.list_sections.map((section) => ({
            ...section,
            places: Array.isArray(section.places)
              ? section.places.map((place) => placesById[place.ID])
              : [],
          }))
        : [],
      quick_picks: Array.isArray(post.acf.quick_picks)
        ? post.acf.quick_picks.map((pick) => ({
            ...pick,
            place: placesById[pick.place.ID],
          }))
        : [],
    },
  };

  return normalizedPost;
}

export function mapDestinationWithPlacesAndSubDestinationsAndPosts(
  destination: Destination,
  placesById: Record<number, NormalizedPlace>,
  subdestionationsByIds: Record<number, Destination>,
  postsByIds: Record<number, WPPost>
): NormalizedDestination {
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
    },
  };

  return normalizedDestination;
}
