import { Itinerary } from "../app/itinerary";
import { WPImage } from "./media";
import { WPTerm } from "./place";

export type WPPostReference = {
  ID: number;
  post_name: string;
  post_title: string;
  post_excerpt: string;
};

export type WPPost = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  article_category: number[];
  acf: {
    primary_destination: WPItemRef | "";
    article_category: WPTerm;
    article_template: string | false;
    hero_image: WPImage | false;
    list_sections: WPListSection[];
    quick_picks: WPQuickPick[];
    itinerary: Itinerary | false;
    room_feature: WPTerm | false;
    hotel_style: string | false;
    sections_by: string | false;
    featured_related_articles: WPItemRef[] | null;
  };
};

export type WPQuickPick = {
  label: string;
  reason: string;
  cta_text: string;
  item: WPItemRef | false | null | "";
};

export type WPListSection = {
  section_title: string;
  intro_text: string;
  entries: {
    item: WPItemRef;
    editorial_note: string;
    group_label: string;
    options: WPItemRef[] | "" | false | null;
  }[];
};

export type WPItemRef = {
  ID: number;
  post_title: string;
  post_name: string;
  post_type: string;
};
