import { CleanArticle } from "../app/article";

export type PaginatedArticlesResponse = {
  articles: CleanArticle[];
  total: number;
};
