import { WPImage } from "./media";
import { WPTerm } from "./place";
import { WPItemRef } from "./post";

export type WPExperience = {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    primary_destination: WPItemRef;
    short_description: string;
    images: WPImage[];
    experience_type: WPTerm;
    travel_styles: WPTerm;
    duration_minutes: number;
    default_slot_span: number;
    steps: WPExperienceStep[];
    cta_links: { label: string; url: string }[];
    done_it: boolean;
    price_from: string;
    price_checked: string | null;
    preferred_slot: string | false;
    meeting_point: string;
    map_link: string;
    coordinates: { lat: string; long: string } | null;
  };
};

export type WPExperienceStep = {
  place: WPItemRef | false;
  step_title: string;
  description: string;
  duration_in_minutes: number;
  options: WPItemRef | "";
};
