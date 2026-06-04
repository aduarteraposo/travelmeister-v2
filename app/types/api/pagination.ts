import { WPPost } from "../wordpress/post";

export type PaginatedArticlesResponse = {
  articles: WPPost[];
  total: number;
};
