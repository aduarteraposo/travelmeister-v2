import {
  WPDestination,
  WPDestinationReference,
} from "../wordpress/destination";
import { WPImage } from "../wordpress/media";
import { WPPost } from "../wordpress/post";
import { WPCategory } from "../wordpress/taxonomy";
import { LabeledPlace, Place } from "./place";

export type Destination = {
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
    practical_info: PracticalInfo;
    travel_styles: TravelStyle[];
    featured_subdestinations: WPDestination[];
    featured_hotels: LabeledPlace[];
    featured_restaurants: LabeledPlace[];
    featured_tours: LabeledPlace[];
    featured_sights: LabeledPlace[];
    article_sections: ArticleSection[];
  };
};

export type PracticalInfo = {
  best_time: string;
  trip_planning_note: string;
  budget_note: string;
  transport_note: string;
  food_tip: string;
};

export type TravelStyle = {
  style: { term_id: number; name: string; slug: string };
  summary: string;
  where_to_stay: {
    stay_note: string;
    primary_place: Place;
    alternative_places: Place[];
  };
  focus: string;
  skip: string;
  featured_experiences: Place[];
  suggested_itinerary: { label: string; value: string }[];
  related_articles: WPPost[];
};

export type ArticleSection = {
  title: string;
  category: WPCategory;
  manual_articles: WPPost[];
  initial_items_count: number;
  load_more_count: number;
};
