"use client";

import { WPPost } from "../types/wordpress";
import ArticleTeaser from "./ArticleTeaser";
import { useInfiniteQuery } from "@tanstack/react-query";

type ArticleLaneProps = {
  title: string;
  categoryId: number;
  destinationId: number;
  manualArticlesIds: number[];
  perPage: number;
  initialFetchedArticles: WPPost[];
  manualArticles: WPPost[];
  initialTotal: number;
};

export default function ArticleLane({
  title,
  categoryId,
  destinationId,
  manualArticlesIds,
  perPage,
  initialFetchedArticles,
  manualArticles,
  initialTotal,
}: ArticleLaneProps) {
  const query = useInfiniteQuery({
    queryKey: [
      "articles",
      categoryId,
      destinationId,
      manualArticlesIds,
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
        exclude: String(manualArticlesIds.join(",")),
      });

      const res = await fetch(`/api/articles?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch articles");
        return;
      }

      return res.json();
    },

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextOffset = lastPageParam + lastPage.articles.length;

      if (nextOffset >= lastPage.total) {
        return undefined;
      }

      return nextOffset;
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
            <>
              <li key={article.slug}>
                <ArticleTeaser article={article} />
              </li>
            </>
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
