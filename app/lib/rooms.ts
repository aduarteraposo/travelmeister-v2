import { Article, CleanArticle } from "../types/app/article";
import { Place } from "../types/app/place";
import { WPTerm } from "../types/wordpress/place";
import { WPPost } from "../types/wordpress/post";
import { loadResolvedArticle } from "./load-article";
import { normalizeArticle } from "./normalizers/article";
import { uniqueBy } from "./utils";
import { getPostBySlug } from "./wordpress/post";

type TopHotel = { hotel: Place; label: string | null };
export type RoomFeature = { id: number; acf: { card_label: string } };

export function getTopHotels(article: Article): TopHotel[] {
  const hotels = article.quickPicks.flatMap((pick) =>
    pick.item.kind === "hotel"
      ? [{ hotel: pick.item.data, label: pick.label ? pick.label : null }]
      : []
  );

  for (const section of article.sections) {
    for (const entry of section.entries) {
      if (entry.item && entry.item.kind === "hotel") {
        hotels.push({
          hotel: entry.item.data,
          label: entry.item.data.badge ? entry.item.data.badge : null,
        });
      }
    }
  }

  return uniqueBy(hotels, (hotel) => hotel.hotel.id).slice(0, 3);
}

export type RoomsBlock =
  | { kind: "none" }
  | { kind: "list"; articles: CleanArticle[] }
  | {
      kind: "single";
      article: Article;
      hotels: { hotel: Place; label: string | null }[];
    };

export async function getRoomsBlock(
  postsById: Record<number, WPPost>
): Promise<RoomsBlock> {
  const roomArticles = Object.values(postsById).filter(
    (post) =>
      post.acf.article_template === "list" ||
      post.acf.article_template === "feature"
  );

  if (roomArticles.length === 0) return { kind: "none" };

  if (roomArticles.length === 1) {
    const post = await getPostBySlug(roomArticles[0].slug);
    const article = await loadResolvedArticle(post);
    const hotels = getTopHotels(article);

    return { kind: "single", article, hotels };
  }

  return { kind: "list", articles: roomArticles.map(normalizeArticle) };
}

export function getRoomLabel(
  feature: WPTerm | null | undefined,
  labelsById: Record<number, RoomFeature>
): string | undefined {
  if (!feature) return undefined; // article has no room feature
  return labelsById[feature.term_id]?.acf.card_label || feature.name;
}
