import { WPFeaturedMedia } from "./media";
import { WPPlaceReference } from "./place";

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
  acf: {
    primary_destination: { ID: number; post_name: string };
    hero_image: number;
    article_type: string;
    list_sections: WPPlaceSection[];
    quick_picks: WPQuickPick[];
  };
  _embedded: {
    "wp:featuredmedia"?: WPFeaturedMedia[] | undefined;
  };
};

export type WPQuickPick = {
  pick_label: string;
  reason: string;
  cta_text: string;
  place: WPPlaceReference;
};

export type WPPlaceSection = {
  section_title: string;
  section_intro: string;
  places: WPPlaceReference[];
};
