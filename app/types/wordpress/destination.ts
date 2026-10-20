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
    destination_type: WPTerm;
    parent_destination: WPItemRef | WPItemRef[] | "";
    hero_image: WPImage;
    hero_intro: string;
    card_description: string;
    hero_tags: { label: string }[];
    practical_info: WPPracticalInfo;
    travel_styles: WPTravelStyle[];
    featured_subdestinations: WPItemRef[];
    featured_hotels: WPLabeledPlace[];
    featured_restaurants: WPLabeledPlace[];
    featured_tours: WPLabeledPlace[];
    featured_sights: WPLabeledPlace[];
    article_sections: WPPostSection[];
  };
};

export type WPTravelStyle = {
  style: WPTerm;
  summary: string;
  where_to_stay: {
    stay_note: string;
    primary_place: WPItemRef;
    alternative_places: WPItemRef[];
  };
  focus: string;
  skip: string;
  featured_experiences: WPItemRef[];
  suggested_itinerary: { label: string; value: string }[];
  related_articles: WPPostReference[];
};

export type WPLabeledPlace = {
  label: string;
  place: WPItemRef;
};

export type WPPostSection = {
  title: string;
  category: WPArticleCategory;
  manual_articles: WPPostReference[];
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
