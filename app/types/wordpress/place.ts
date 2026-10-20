import { WPImage } from "./media";
import { WPItemRef } from "./post";

export type WPPlace = {
  id: number;
  slug: string;
  title: { rendered: string };
  place_type: number[];
  place_subtype: number[];
  place_filters: number[];
  travel_style: number[];
  acf: {
    primary_destination: WPItemRef;
    badge: string;
    images: WPImage[];
    short_description: string;
    editor_tags: { label: string }[];
    best_if: string;
    not_ideal_if: string;
    vibe: string;
    ideal_for: string[];
    map_link: string;
    budget: string;
    cta_links: { label: string; url: string }[];
    place_type: WPTerm;
    place_subtype: WPTerm;
    travel_styles: WPTerm[];
    filters: WPTerm[];
    reviews_pro: string;
    reviews_contra: string;
    good_to_know: string;
    visit_duration: string;
    visit_duration_minutes: number | "";
    coordinates: {
      lat: string;
      long: string;
    };
    stayed_here: boolean;
    last_reviewed: string | null;
    verdict: string;
    photo_honesty: string;
    booking_request: string;
    booking_notes: string[] | "";
    privacy_note: string;
    celebrations: string;
    night_view: string;
    sunset: string;
    noise: string;
    video: string | null;
    rooms: WPRoom[] | false;
    shared_views:
      | { space_name: string; view: WPTerm | false; amount: string }
      | false;
  };
};

export type WPPlaceList = {
  section_title: string;
  section_intro: string;
  places: WPItemRef[];
};

export type WPTerm = {
  term_id: number;
  name: string;
  slug: string;
};

export type WPRoom = {
  category_name: string;
  is_rest_row: boolean;
  views: WPView[];
  ask_for: string;
  privacy_level: string;
  features: WPTerm[] | false;
  evidence: string[];
  is_pick: boolean;
  photo: WPImage | false;
  note: string;
};

export type WPView = {
  view: WPTerm | false;
  amount: string;
  seen_from: string[];
};
