import { WPPost } from "@/app/types/wordpress/post";
import { REVALIDATE, wordpressFetch, wordpressFetchWithTotal } from "./client";
import { PaginatedArticlesResponse } from "@/app/types/api/pagination";

export async function getPostsByDestinationId(id: number): Promise<WPPost[]> {
  const data = await wordpressFetch<WPPost[]>(`/posts?destination=${id}`);

  return data;
}

export async function getPostBySlug(slug: string): Promise<WPPost> {
  const data = await wordpressFetch<WPPost[]>(
    `/posts?slug=${slug}&_embed&acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`article:${slug}`, "articles"],
    }
  );

  return data[0];
}

export async function getPostsByIds(ids: number[]): Promise<WPPost[]> {
  if (ids.length === 0) return [];

  const endpoint = `/posts?include=${ids.toString()}&acf_format=standard&_embed`;

  const data = await wordpressFetch<WPPost[]>(endpoint, {
    revalidate: REVALIDATE.day,
    tags: [`articles:ids:${ids.join(",")}`, "articles"],
  });

  return data;
}

export async function getPostsByCategoryAndDestination(
  categoryId: number,
  destinationId: number,
  perPage: number,
  exclude: string,
  offset: number
): Promise<PaginatedArticlesResponse> {
  const endpoint = `/posts?destination=${destinationId}&article_category=${categoryId}&per_page=${perPage}&offset=${offset}${exclude}&_embed&acf_format=standard`;

  const response = await wordpressFetchWithTotal<WPPost>(endpoint, {
    revalidate: REVALIDATE.day,
    tags: [
      "articles",
      `articles:destination:${destinationId}`,
      `articles:category:${categoryId}`,
      `articles:destination:${destinationId}:category:${categoryId}`,
    ],
  });

  return {
    articles: response.items,
    total: response.total,
  };
}
