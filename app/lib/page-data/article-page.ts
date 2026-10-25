import {
  getArticlePlaceIds,
  normalizeArticle,
  resolveArticle,
} from "../normalizers/article";
import { getDestinationBySlug } from "../wordpress/destination";
import { getPlacesByIds } from "../wordpress/place";
import { getPostBySlug } from "../wordpress/post";
import { normalizePlace } from "../normalizers/place";
import { notFound } from "next/navigation";
import { getExperiencesByIds } from "../wordpress/experience";
import { normalizeExperience } from "../normalizers/experience";
import { toItem } from "../normalizers/item";
import { Item } from "@/app/types/app/item";
import { getRelatedArticles } from "../related-articles";
import { Section } from "@/app/types/app/article";
import { Experience } from "@/app/types/app/experience";
import { Place } from "@/app/types/app/place";

export async function getArticlePageData(
  destinationSlug: string,
  articleSlug: string
) {
  const [canonicalDestination, post] = await Promise.all([
    getDestinationBySlug(destinationSlug),
    getPostBySlug(articleSlug),
  ]);

  if (!post) {
    notFound();
  }

  if (
    !canonicalDestination ||
    !post.acf.primary_destination ||
    canonicalDestination.id !== post.acf.primary_destination?.ID
  ) {
    notFound();
  }

  const cleanArticle = normalizeArticle(post);

  const { placeIds, experienceIds } = getArticlePlaceIds(cleanArticle);
  const [places, experiences] = await Promise.all([
    getPlacesByIds(placeIds),
    getExperiencesByIds(experienceIds),
  ]);

  // console.log(placeIds);

  const items: Item[] = [
    ...places.map(normalizePlace).map(toItem),
    ...experiences
      .map(normalizeExperience)
      .map((data) => ({ kind: "experience", data } as Item)),
  ];

  const itemsById = Object.fromEntries(
    items.map((item) => [item.data.id, item])
  );

  const article = resolveArticle(cleanArticle, itemsById);

  const sections: Section<Item, Place | Experience>[] = article.sections;

  const relatedArticles = await getRelatedArticles(
    article,
    canonicalDestination
  );

  return {
    canonicalDestination,
    article,
    sections,
    relatedArticles,
  };
}
