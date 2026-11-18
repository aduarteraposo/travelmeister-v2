import { WPDestination } from "@/app/types/wordpress/destination";
import { normalizeDestination } from "../normalizers/destination";
import { REVALIDATE, wordpressFetchAll } from "../wordpress/client";
import { WPExperience } from "@/app/types/wordpress/experience";
import { notFound } from "next/navigation";
import { normalizePlace } from "../normalizers/place";
import { normalizeExperience } from "../normalizers/experience";
import { normalizeArticle } from "../normalizers/article";
import {
  articleToExploreItem,
  experienceToExploreItem,
  placeToExploreItem,
} from "../normalizers/explore-item";
import { Destination } from "@/app/types/app/destination";
import { ExploreItem } from "@/app/types/app/explore";
import { getPostSummariesByDestination } from "../wordpress/post";
import { getPlaceSummariesByDestination } from "../wordpress/place";
import { getExperienceSummariesByDestination } from "../wordpress/experience";

export async function getExplorePageData(
  wpDestination: WPDestination
): Promise<{ destination: Destination; exploreItems: ExploreItem[] }> {
  if (!wpDestination) {
    notFound();
  }

  const destination = normalizeDestination(wpDestination);

  const [posts, wpPlaces, wpExperiences] = await Promise.all([
    getPostSummariesByDestination(destination.id),
    getPlaceSummariesByDestination(destination.id),
    getExperienceSummariesByDestination(destination.id),
  ]);

  const places = wpPlaces.map(normalizePlace);
  const experiences = wpExperiences.map(normalizeExperience);
  const articles = posts.map(normalizeArticle);

  const placeItems = places.map(placeToExploreItem);
  const experienceItems = experiences.map(experienceToExploreItem);
  const articleItems = articles.map(articleToExploreItem);

  const exploreItems = [...placeItems, ...experienceItems, ...articleItems];

  return { destination, exploreItems };
}
