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
    primary_destination: { ID: number };
    hero_image: number;
    article_type: string;
    list_sections: RawPlaceList[];
    quick_picks: RawQuickPick[];
  };
  _embedded: {
    "wp:featuredmedia"?: WPFeaturedMedia[];
  };
};

export type RawWPPost = {
  ID: number;
  post_name: string;
  post_title: string;
};

export type NormalizedPost = {
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
    primary_destination: { ID: number };
    hero_image: number;
    article_type: string;
    list_sections: PlaceList[];
    quick_picks: QuickPick[];
  };
  _embedded: {
    "wp:featuredmedia"?: WPFeaturedMedia[];
  };
};

export type RawQuickPick = {
  pick_label: string;
  reason: string;
  cta_text: string;
  place: RawPlace;
};

export type QuickPick = {
  pick_label: string;
  reason: string;
  cta_text: string;
  place: NormalizedPlace;
};

export type RawPlaceList = {
  section_title: string;
  section_intro: string;
  places: RawPlace[];
};

export type PlaceList = {
  section_title: string;
  section_intro: string;
  places: NormalizedPlace[];
};

export type RawPlace = {
  ID: number;
};

export type Place = {
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
    hotel_filters: Filter[];
    restaurant_filters: Filter[];
    tour_filters: Filter[];
    sight_filters: Filter[];
    show_in_table: boolean;
  };
};

export type NormalizedPlace = {
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
    hotel_filters: string[];
    restaurant_filters: string[];
    tour_filters: string[];
    sight_filters: string[];
    show_in_table: boolean;
  };
};

type Filter = {
  name: string;
  slug: string;
};

export interface PlaceWithSection extends NormalizedPlace {
  section_title: string;
}

export type WPImage = {
  id: number;
  url: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type WPLink = {
  link: {
    title: string;
    url: string;
    target: string;
  };
};

export type WPFeaturedMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
};

export type RawDestination = {
  ID: number;
};

export type Destination = {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    destination_type: string;
    parent_destination: RawDestination | false;
    hero_image: WPImage;
    hero_intro: string;
    card_description: string;
    hero_tags: { label: string }[];
    practical_info: PracticalInfo;
    travel_styles: TravelStyle[];
    featured_subdestinations: RawDestination[];
    featured_hotels: RawFeaturedPlace[];
    featured_restaurants: RawFeaturedPlace[];
    featured_tours: RawFeaturedPlace[];
    featured_sights: RawFeaturedPlace[];
  };
};

export type RawFeaturedPlace = {
  label: string;
  place: RawPlace;
};

export type FeaturedPlace = {
  label: string;
  place: NormalizedPlace;
};

export type NormalizedDestination = {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    destination_type: string;
    parent_destination: RawDestination | false;
    hero_image: WPImage;
    hero_intro: string;
    card_description: string;
    hero_tags: { label: string }[];
    practical_info: PracticalInfo;
    travel_styles: NormalizedTravelStyle[];
    featured_subdestinations: Destination[];
    featured_hotels: FeaturedPlace[];
    featured_restaurants: FeaturedPlace[];
    featured_tours: FeaturedPlace[];
    featured_sights: FeaturedPlace[];
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
    primary_place: RawPlace;
    alternative_places: RawPlace[];
  };
  focus: string;
  skip: string;
  featured_experiences: RawPlace[];
  suggested_itinerary: { label: string; value: string }[];
  related_articles: RawWPPost[];
};

export type NormalizedTravelStyle = {
  style: { term_id: number; name: string; slug: string };
  summary: string;
  where_to_stay: {
    stay_note: string;
    primary_place: NormalizedPlace;
    alternative_places: NormalizedPlace[];
  };
  focus: string;
  skip: string;
  featured_experiences: NormalizedPlace[];
  suggested_itinerary: { label: string; value: string }[];
  related_articles: WPPost[];
};

export type WPParent = {
  id: number;
  slug: string;
  name: string;
};
