import { WPImage } from "./media";
import { WPTerm } from "./place";
import { WPItemRef, WPPostReference } from "./post";
import { WPArticleCategory } from "./taxonomy";

export type WPDestinationReference = {
  ID: number;
};

export type WPDestination = {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    destination_type: WPTerm | false;
    parent_destination: WPItemRef | false;
    hero_image: WPImage;
    hero_intro: string;
    card_description: string;
    hero_tags: { label: string }[] | false;
    practical_info: WPPracticalInfo;
    travel_styles: WPTravelStyle[] | false;
    which_region:
      | { label: string; destinations: WPItemRef[]; why: string }[]
      | false;
    featured_subdestinations: WPItemRef[] | "";
    picks: WPItemRef[] | false;
    article_sections: WPPostSection[] | false;
  };
};

export type WPTravelStyle = {
  style: WPTerm;
  summary: string;
  where_to_stay: {
    stay_note: string;
    primary_place: WPItemRef | false;
    alternative_places: WPItemRef[] | false;
  };
  what_to_do: {
    focus: string;
    skip: string;
    best_experiences: WPItemRef[] | null;
  };
  suggested_plan: { title: string; text: string; items: WPItemRef[] }[] | false;
};

export type WPLabeledPlace = {
  label: string;
  place: WPItemRef;
};

export type WPPostSection = {
  title: string;
  category: WPTerm;
  manual_articles: WPItemRef[];
  initial_items_count: number;
  load_more_count: number;
};

export type WPPracticalInfo = {
  best_time: string;
  trip_planning_note: string;
  budget_note: string;
  transport_note: string;
  food_tip: string;
};

export type WPDestinationType = {
  id: number;
  slug: string;
};
