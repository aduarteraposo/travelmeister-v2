import { getDestinationById } from "../wordpress/destination";
import { getPostBySlug } from "../wordpress/post";
import { notFound } from "next/navigation";
import { Item } from "@/app/types/app/item";
import { getRelatedArticles } from "../related-articles";
import { Section } from "@/app/types/app/article";
import { Experience } from "@/app/types/app/experience";
import { Place } from "@/app/types/app/place";
import { normalizeDestination } from "../normalizers/destination";
import { loadResolvedArticle } from "../load-article";

export async function getArticlePageData(
  destinationSlug: string,
  articleSlug: string
) {
  const post = await getPostBySlug(articleSlug);
  const urlDestinationSlug = destinationSlug;

  if (!post) {
    notFound();
  }

  if (
    !urlDestinationSlug ||
    !post.meta.url_destination ||
    !post.acf.primary_destination ||
    urlDestinationSlug !== post.meta.url_destination
  ) {
    notFound();
  }

  const [canonicalDestination, article] = await Promise.all([
    getDestinationById(post.acf.primary_destination.ID),
    loadResolvedArticle(post),
  ]);

  const normalizedDestination = normalizeDestination(canonicalDestination);
  const sections: Section<Item, Place | Experience>[] = article.sections;
  const relatedArticles = await getRelatedArticles(
    article,
    normalizedDestination,
    5
  );

  return {
    normalizedDestination,
    article,
    sections,
    relatedArticles,
  };
}
