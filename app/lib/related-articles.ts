import { Article, CleanArticle } from "../types/app/article";
import { WPDestination } from "../types/wordpress/destination";
import { normalizeArticle } from "./normalizers/article";
import { getRelatedCandidates } from "./wordpress/post";

export async function getRelatedArticles(
  article: Article,
  destination: WPDestination
): Promise<CleanArticle[]> {
  const destinationId = destination.id;
  const categoryId = article.articleCategory?.term_id;
  const hotelStyle = article.hotelStyle;
  const parentDestination = Array.isArray(destination.acf.parent_destination)
    ? destination.acf.parent_destination[0]
    : destination.acf.parent_destination;
  const parentDestinationId =
    typeof parentDestination === "object" ? parentDestination.ID : null;
  let scopeId = null;

  if (destination.acf.destination_type.slug === "neighborhood") {
    scopeId = parentDestinationId ?? destinationId;
  } else {
    scopeId = destinationId;
  }

  const destinationIsNeighborhood = scopeId !== destinationId;
  let relatedCandidates = [];

  try {
    relatedCandidates = scopeId
      ? await getRelatedCandidates(scopeId, article.id)
      : [];
  } catch (error) {
    console.warn(
      `Failed to load related articles for post "${article.slug}" (id: ${article.id}):`,
      error
    );
    return [];
  }

  return rankArticles(
    relatedCandidates.map(normalizeArticle),
    destinationId,
    destinationIsNeighborhood,
    categoryId,
    parentDestinationId,
    hotelStyle
  );
}

export function rankArticles(
  relatedArticles: CleanArticle[],
  destinationId: number,
  destinationIsNeighborhood: boolean,
  categoryId: number | undefined,
  parentId: number | null,
  hotelStyle: string | null
) {
  const rankedArticleList = relatedArticles.map((rel) => {
    let points = 0;
    const relCategoryId = rel.articleCategory?.term_id;
    const relDestinationId = rel.destination?.ID;
    const relHotelStyle = rel.hotelStyle;

    if (relDestinationId === destinationId) {
      points = points + 4;
    } else {
      if (destinationIsNeighborhood) {
        if (relDestinationId === parentId) {
          points = points + 3;
        } else {
          points = points + 1;
        }
      } else {
        points = points + 2;
      }
    }
    if (relHotelStyle && relHotelStyle === hotelStyle) {
      points = points + 3;
    }
    if (relCategoryId && relCategoryId === categoryId) {
      points = points + 2;
    }
    if (relHotelStyle && hotelStyle && hotelStyle !== relHotelStyle) {
      points = points - 2;
    }

    return { points: points, article: rel };
  });

  const sortedArticles = rankedArticleList.sort((a, b) => b.points - a.points);
  const rankedArticles = sortedArticles.map((a) => a.article);

  return rankedArticles;
}
