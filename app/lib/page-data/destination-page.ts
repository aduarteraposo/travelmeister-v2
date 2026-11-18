import { notFound } from "next/navigation";
import {
  getPicksItemIds,
  getTravelStyleItemIds,
  normalizeDestination,
} from "../normalizers/destination";
import { mapById } from "../utils";
import { normalizePlace } from "../normalizers/place";
import {
  getDestinationBySlug,
  getDestinationsByIds,
} from "../wordpress/destination";
import { getPlacesByIds } from "../wordpress/place";
import { getExperiencesByIds } from "../wordpress/experience";
import { normalizeArticle } from "../normalizers/article";
import { normalizeExperience } from "../normalizers/experience";
import {
  REVALIDATE,
  wordpressFetch,
  wordpressFetchAll,
} from "../wordpress/client";
import { WPPost } from "@/app/types/wordpress/post";
import { getRoomsBlock, RoomFeature } from "../rooms";
import {
  experienceToExploreItem,
  placeToExploreItem,
} from "../normalizers/explore-item";

export async function getDestinationPageData(destinationSlug: string) {
  const wpDestination = await getDestinationBySlug(destinationSlug);
  if (!wpDestination) {
    notFound();
  }

  const destination = normalizeDestination(wpDestination);

  const travelStyleItemIds = getTravelStyleItemIds(destination);
  const picksItemIds = getPicksItemIds(destination);

  const placesIds: number[] = [
    ...travelStyleItemIds.places,
    ...picksItemIds.placeIds,
  ];

  const experienceIds: number[] = picksItemIds.experienceIds;

  const subdestinationsIds: number[] = [
    ...destination.featuredSubdestinations.map(
      (subDestination) => subDestination.ID
    ),
  ];

  const uniquePlacesIds = Array.from(new Set(placesIds));
  const uniqueExperienceIds = Array.from(new Set(experienceIds));
  const uniqueSubdestinationsIds = Array.from(new Set(subdestinationsIds));

  const [subDestinations, places, experiences, posts, roomFeatures] =
    await Promise.all([
      getDestinationsByIds(uniqueSubdestinationsIds),
      getPlacesByIds(uniquePlacesIds),
      getExperiencesByIds(uniqueExperienceIds),
      wordpressFetchAll<WPPost>(
        `/posts?destination=${destination.id}&perPage=100&acf_format=standard&_fields=id,title,slug,meta.url_destination,acf.hero_image,acf.article_template,acf.primary_destination,acf.room_feature`,
        {
          revalidate: REVALIDATE.day,
          tags: ["articles", `articles:destination:${destination.id}`],
        }
      ),
      wordpressFetch<RoomFeature[]>(
        `/room_feature?per_page=100&_fields=id,acf`
      ),
    ]);

  const normalizedPlaces = places.map(normalizePlace);
  const normalizedArticles = posts.map(normalizeArticle);
  const normalizedExperiences = experiences.map(normalizeExperience);
  const normalizedSubDestinations = subDestinations.map(normalizeDestination);

  const subdestinationsById = mapById(normalizedSubDestinations);
  const placesById = mapById(normalizedPlaces);
  const articlesById = mapById(normalizedArticles);
  const experiencesById = mapById(normalizedExperiences);
  const labelsById = mapById(roomFeatures);

  const roomsBlock = await getRoomsBlock(mapById(posts));
  const picks = [
    ...picksItemIds.placeIds
      .flatMap((placeId) => placesById[placeId] ?? [])
      .map(placeToExploreItem),
    ...picksItemIds.experienceIds
      .flatMap((expId) => experiencesById[expId] ?? [])
      .map(experienceToExploreItem),
  ];

  return {
    destination,
    articlesById,
    placesById,
    experiencesById,
    subdestinationsById,
    labelsById,
    roomsBlock,
    picks,
  };
}
