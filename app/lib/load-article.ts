import { Article } from "../types/app/article";
import { Item } from "../types/app/item";
import { WPPost } from "../types/wordpress/post";
import {
  getArticlePlaceIds,
  normalizeArticle,
  resolveArticle,
} from "./normalizers/article";
import { normalizeExperience } from "./normalizers/experience";
import { toItem } from "./normalizers/item";
import { normalizePlace } from "./normalizers/place";
import { getExperiencesByIds } from "./wordpress/experience";
import { getPlacesByIds } from "./wordpress/place";

export async function loadResolvedArticle(post: WPPost): Promise<Article> {
  const cleanArticle = normalizeArticle(post);

  const { placeIds, experienceIds } = getArticlePlaceIds(cleanArticle);
  const [places, experiences] = await Promise.all([
    getPlacesByIds(placeIds),
    getExperiencesByIds(experienceIds),
  ]);

  const items: Item[] = [
    ...places.map(normalizePlace).map(toItem),
    ...experiences
      .map(normalizeExperience)
      .map((data) => ({ kind: "experience" as const, data })),
  ];

  const itemsById = Object.fromEntries(
    items.map((item) => [item.data.id, item])
  );

  const article = resolveArticle(cleanArticle, itemsById);

  return article;
}
