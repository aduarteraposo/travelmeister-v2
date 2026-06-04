import { WPImage } from "./media";

export type WPPlace = {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    badge: string;
    images: WPImage[];
    short_description: string;
    editor_tags: { label: string }[];
    best_if: string;
    not_ideal_if: string;
    ideal_for: string[];
    location: string;
    budget: string;
    cta_links: { label: string; url: string }[];
    hotel_filters: WPFilter[];
    restaurant_filters: WPFilter[];
    tour_filters: WPFilter[];
    sight_filters: WPFilter[];
    show_in_table: boolean;
  };
};

export type WPPlaceReference = {
  ID: number;
};

export type WPPlaceList = {
  section_title: string;
  section_intro: string;
  places: WPPlaceReference[];
};

export type WPFilter = {
  name: string;
  slug: string;
};
