import { ArticleTemplate } from "../types/app/article";

export type ArticleConfig = {
  cardSize: "full" | "medium" | "small";
  filters: boolean;
  comparison: boolean;
  grouped: boolean;
};

export const ARTICLE_TYPES: Record<ArticleTemplate, ArticleConfig> = {
  "long-tail": {
    cardSize: "full",
    filters: true,
    comparison: true,
    grouped: false,
  },
  style: {
    cardSize: "small",
    filters: true,
    comparison: false,
    grouped: false,
  },
  neighborhood: {
    cardSize: "medium",
    filters: true,
    comparison: false,
    grouped: false,
  },
  "where-to-stay": {
    cardSize: "small",
    filters: false,
    comparison: false,
    grouped: true,
  },
  view: { cardSize: "full", filters: true, comparison: true, grouped: false },
  feature: {
    cardSize: "full",
    filters: true,
    comparison: true,
    grouped: false,
  },
  proximity: {
    cardSize: "full",
    filters: true,
    comparison: true,
    grouped: false,
  },
  list: {
    cardSize: "full",
    filters: true,
    comparison: false,
    grouped: false,
  },
};
