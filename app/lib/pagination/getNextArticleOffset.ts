import { PaginatedArticlesResponse } from "@/app/types/api/pagination";

export function getNextArticlesOffset(
  lastPage: PaginatedArticlesResponse,
  lastPageParam: number
) {
  if (lastPage.articles.length === 0) {
    return undefined;
  }

  const nextOffset = lastPageParam + lastPage.articles.length;

  if (nextOffset >= lastPage.total) {
    return undefined;
  }

  return nextOffset;
}
