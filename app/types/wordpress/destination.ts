import { WPImage } from "./media";
import { WPPlaceReference } from "./place";
import { WPPostReference } from "./post";
import { WPCategory } from "./taxonomy";

export type WPDestinationReference = {
  ID: number;
};

export type WPDestination = {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    destination_type: string;
    parent_destination: WPDestinationReference | false;
    hero_image: WPImage;
    hero_intro: string;
    card_description: string;
    hero_tags: { label: string }[];
    practical_info: WPPracticalInfo;
    travel_styles: WPTravelStyle[];
    featured_subdestinations: WPDestinationReference[];
    featured_hotels: WPLabeledPlace[];
    featured_restaurants: WPLabeledPlace[];
    featured_tours: WPLabeledPlace[];
    featured_sights: WPLabeledPlace[];
    article_sections: WPPostSection[];
  };
};

export type WPTravelStyle = {
  style: { term_id: number; name: string; slug: string };
  summary: string;
  where_to_stay: {
    stay_note: string;
    primary_place: WPPlaceReference;
    alternative_places: WPPlaceReference[];
  };
  focus: string;
  skip: string;
  featured_experiences: WPPlaceReference[];
  suggested_itinerary: { label: string; value: string }[];
  related_articles: WPPostReference[];
};

export type WPLabeledPlace = {
  label: string;
  place: WPPlaceReference;
};

export type WPPostSection = {
  title: string;
  category: WPCategory;
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
