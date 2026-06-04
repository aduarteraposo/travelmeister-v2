import { WPImage } from "../wordpress/media";

export type Place = {
  id: number;
  slug: string;
  title: string;
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
    hotel_filters: string[];
    restaurant_filters: string[];
    tour_filters: string[];
    sight_filters: string[];
    show_in_table: boolean;
  };
};

export type LabeledPlace = {
  label: string;
  place: Place;
};

export type PlaceList = {
  section_title: string;
  section_intro: string;
  places: Place[];
};

export interface PlaceWithSection extends Place {
  section_title: string;
}
