import { WPImage } from "../wordpress/media";
import { WPTerm } from "../wordpress/place";
import { WPItemRef } from "../wordpress/post";
import { Experience } from "./experience";
import { Item } from "./item";
import { Itinerary } from "./itinerary";
import { Place } from "./place";

export type Article = ArticleOf<Place | Experience>;

export type CleanArticle = ArticleOf<WPItemRef>;

export type ArticleOf<T> = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  destination: WPItemRef | null;
  heroImage: WPImage | null;
  articleCategory: WPTerm | null;
  articleTemplate: string;
  sections: Section<T>[];
  quickPicks: QuickPick<T>[];
  itinerary: Itinerary | false;
  roomFeature: string;
  hotelStyle: string | null;
  featuredRelatedArticles: WPItemRef[];
};

export type QuickPick<T> = {
  label: string;
  reason: string;
  ctaText: string;
  item: T;
};

export type Section<T> = {
  title: string;
  intro_text: string;
  entries: {
    item: T | null;
    editorial_note: string;
    group_label: string;
    options: T[];
  }[];
};
