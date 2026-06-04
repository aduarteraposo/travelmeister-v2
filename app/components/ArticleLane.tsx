"use client";

import { getNextArticlesOffset } from "../lib/pagination/getNextArticleOffset";
import { PaginatedArticlesResponse } from "../types/api/pagination";
import { WPPost } from "../types/wordpress/post";
import ArticleTeaser from "./ArticleTeaser";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

type ArticleLaneProps = {
  title: string;
  categoryId: number;
  destinationId: number;
  manualArticleIds: number[];
  perPage: number;
  initialFetchedArticles: WPPost[];
  manualArticles: WPPost[];
  initialTotal: number;
};

export default function ArticleLane({
  title,
  categoryId,
  destinationId,
  manualArticleIds,
  perPage,
  initialFetchedArticles,
  manualArticles,
  initialTotal,
}: ArticleLaneProps) {
  const query = useInfiniteQuery<
    PaginatedArticlesResponse,
    Error,
    InfiniteData<PaginatedArticlesResponse, number>,
    readonly unknown[],
    number
  >({
    queryKey: [
      "articles",
      categoryId,
      destinationId,
      manualArticleIds.join(","),
      perPage,
    ],
    initialPageParam: 0,
    initialData: {
      pages: [
        {
          articles: initialFetchedArticles,
          total: initialTotal,
        },
      ],
      pageParams: [0],
    },

    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        categoryId: String(categoryId),
        destinationId: String(destinationId),
        perPage: String(perPage),
        offset: String(pageParam),
        exclude: String(manualArticleIds.join(",")),
      });

      const res = await fetch(`/api/articles?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch articles");
      }

      return res.json() as Promise<PaginatedArticlesResponse>;
    },

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return getNextArticlesOffset(lastPage, lastPageParam);
    },
  });

  const articlesFromQuery =
    query.data?.pages.flatMap((page) => page.articles) ?? [];

  const allArticles = [...manualArticles, ...articlesFromQuery];

  return (
    <>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="w-full overflow-x-auto flex gap-6 pb-6 mb-4">
        {allArticles.map((article) => {
          return (
            <li key={article.slug}>
              <ArticleTeaser article={article} />
            </li>
          );
        })}
      </ul>
      {query.hasNextPage && (
        <button
          onClick={() => query.fetchNextPage()}
          disabled={query.isFetchingNextPage}
        >
          Load More
        </button>
      )}
    </>
  );
}
