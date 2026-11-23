import { WPImage } from "../wordpress/media";
import { WPTerm } from "../wordpress/place";
import { WPItemRef } from "../wordpress/post";
import { Experience } from "./experience";
import { Item } from "./item";
import { Itinerary } from "./itinerary";
import { Place, Term } from "./place";

export type Article = ArticleOf<Item, Place | Experience>;

export type CleanArticle = ArticleOf<WPItemRef>;

export type ArticleOf<TItem, TOption = TItem> = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  modifiedDate: Date | null;
  destination: WPItemRef | null;
  urlDestination: string;
  urlDestinationTitle: string;
  heroImage: WPImage | null;
  articleCategory: Term | null;
  articleTemplate: ArticleTemplate;
  sections: Section<TItem, TOption>[];
  quickPicks: QuickPick<TItem>[];
  itinerary: Itinerary | false;
  roomFeature: WPTerm | null;
  hotelStyle: HotelStyle | null;
  sectionsBy: string | null;
  featuredRelatedArticles: WPItemRef[];
};

export type Entry<TItem, TOption> = {
  item: TItem | null;
  editorialNote: string;
  groupLabel: string;
  options: TOption[];
  key: string;
};

export type QuickPick<T> = {
  label: string;
  reason: string;
  ctaText: string;
  item: T;
};

export type Section<TItem, TOption> = {
  title: string;
  introText: string;
  entries: Entry<TItem, TOption>[];
  key: string;
};

export const ARTICLE_TEMPLATES = [
  "list",
  "long-tail",
  "style",
  "neighborhood",
  "feature",
  "where-to-stay",
  "proximity",
  "itinerary",
] as const;
export type ArticleTemplate = (typeof ARTICLE_TEMPLATES)[number];

export const HOTEL_STYLES = ["boutique", "luxury", "family", "budget"] as const;
export type HotelStyle = (typeof HOTEL_STYLES)[number];
