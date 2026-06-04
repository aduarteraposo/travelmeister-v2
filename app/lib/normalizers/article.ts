import { Article } from "@/app/types/app/article";
import { Place } from "@/app/types/app/place";
import { WPPost } from "@/app/types/wordpress/post";

export function normalizeArticle(
  post: WPPost,
  placesById: Record<number, Place>
): Article {
  const article = {
    ...post,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
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

  return article;
}

export function getArticlePlaceIds(post: WPPost): number[] {
  const listSectionPlaceIds = Array.isArray(post.acf.list_sections)
    ? post.acf.list_sections.flatMap((section) =>
        Array.isArray(section.places)
          ? section.places.map((place) => place.ID)
          : []
      )
    : [];

  const quickPickPlaceIds = Array.isArray(post.acf.quick_picks)
    ? post.acf.quick_picks.map((pick) => pick.place.ID)
    : [];

  return [...new Set([...listSectionPlaceIds, ...quickPickPlaceIds])];
}
