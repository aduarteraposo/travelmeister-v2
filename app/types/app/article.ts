import { WPFeaturedMedia } from "../wordpress/media";
import { Place } from "./place";

export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  acf: {
    primary_destination: { ID: number };
    hero_image: number;
    article_type: string;
    list_sections: PlaceSection[];
    quick_picks: QuickPick[];
  };
  _embedded: {
    "wp:featuredmedia"?: WPFeaturedMedia[];
  };
};

export type PlaceSection = {
  section_title: string;
  section_intro: string;
  places: Place[];
};

export type QuickPick = {
  pick_label: string;
  reason: string;
  cta_text: string;
  place: Place;
};
