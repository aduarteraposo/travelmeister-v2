import { Article } from "@/app/types/app/article";
import { getArticlePlaceIds, normalizeArticle } from "../normalizers/article";
import { mapById } from "../utils";
import { getDestinationBySlug } from "../wordpress/destination";
import { getPlacesByIds } from "../wordpress/place";
import {
  getPostBySlug,
  getPostsByCategory,
  getPostsByCategoryAndDestination,
  getPostsByDestination,
} from "../wordpress/post";
import { normalizePlace } from "../normalizers/place";
import { PlaceWithSection } from "@/app/types/app/place";
import { notFound } from "next/navigation";
import { WPPost } from "@/app/types/wordpress/post";
import { PaginatedArticlesResponse } from "@/app/types/api/pagination";

const NUMBER_OF_RELATED_ARTICLES = 10;

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

  const relatedArticles = await getRelatedArticles(post);

  return {
    canonicalDestination,
    article,
    allPlacesWithSections,
    heroImage,
    relatedArticles,
  };
}

async function getRelatedArticles(post: WPPost): Promise<WPPost[]> {
  const destinationId = post.acf.primary_destination.ID;
  const categoryId = post.article_category[0];
  const strategies: RelatedStrategy[] = [];

  if (categoryId !== undefined) {
    strategies.push((excludeIds, perPage) =>
      getPostsByCategoryAndDestination({
        destinationId,
        categoryId,
        perPage,
        offset: 0,
        exclude: excludeIds,
      })
    );
  }

  strategies.push((excludeIds, perPage) =>
    getPostsByDestination({
      destinationId,
      perPage,
      offset: 0,
      exclude: excludeIds,
    })
  );

  if (categoryId !== undefined) {
    strategies.push((excludeIds, perPage) =>
      getPostsByCategory({
        categoryId,
        perPage,
        offset: 0,
        exclude: excludeIds,
      })
    );
  }

  try {
    return await collectRelatedArticles(
      strategies,
      post.id,
      NUMBER_OF_RELATED_ARTICLES
    );
  } catch (error) {
    console.warn(
      `Failed to load related articles for post "${post.slug}" (id: ${post.id}):`,
      error
    );
    return [];
  }
}

type RelatedStrategy = (
  excludeIds: number[],
  perPage: number
) => Promise<PaginatedArticlesResponse>;

async function collectRelatedArticles(
  strategies: RelatedStrategy[],
  excludeSelf: number,
  target: number
) {
  let collected: WPPost[] = [];
  const excludeIds = [excludeSelf];

  for (const strategy of strategies) {
    const remaining = target - collected.length;

    if (remaining <= 0) {
      break;
    }

    const { articles } = await strategy(excludeIds, remaining);
    collected = collected.concat(articles);
    excludeIds.push(...articles.map((a) => a.id));
  }

  return collected;
}
