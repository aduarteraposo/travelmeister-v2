import { Article } from "@/app/types/app/article";
import { getArticlePlaceIds, normalizeArticle } from "../normalizers/article";
import { mapById } from "../utils";
import { getDestinationBySlug } from "../wordpress/destination";
import { getPlacesByIds } from "../wordpress/place";
import { getPostBySlug } from "../wordpress/post";
import { normalizePlace } from "../normalizers/place";
import { PlaceWithSection } from "@/app/types/app/place";
import { notFound } from "next/navigation";

export async function getArticlePageData(
  destinationSlug: string,
  articleSlug: string
) {
  const canonicalDestination = await getDestinationBySlug(destinationSlug);
  const post = await getPostBySlug(articleSlug);

  if (canonicalDestination.id !== post.acf.primary_destination.ID) {
    notFound();
  }

  const heroImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const placeIds = getArticlePlaceIds(post);
  const places = await getPlacesByIds(placeIds);
  const normalizedPlaces = places.map(normalizePlace);
  const placesById = mapById(normalizedPlaces);
  const article: Article = normalizeArticle(post, placesById);

  const allPlacesWithSections: PlaceWithSection[] =
    article.acf.list_sections.flatMap((section) =>
      section.places.map((place) => ({
        ...place,
        section_title: section.section_title,
      }))
    );

  return { canonicalDestination, article, allPlacesWithSections, heroImage };
}
