import { WPDestinationReference, WPTravelStylereference } from "./destination";
import { WPImage } from "./media";
import { WPPlaceReference } from "./place";

export type WPExperience = {
  id: number;
  slug: string;
  acf: {
    primary_destination: WPDestinationReference;
    short_description: string;
    images: WPImage[];
    experience_type: WPExperienceTypeReference;
    travel_style: WPTravelStylereference;
    duration_in_minutes: number;
    default_slot_span: number;
    steps: WPExperienceStep[];
    cta_links: { label: string; url: string }[];
  };
};

export type WPExperienceReference = {
  term_id: number;
  name: string;
  slug: string;
};

export type WPExperienceTypeReference = {
  term_id: number;
  name: string;
  slug: string;
};

export type WPExperienceStep = {
  place: WPPlaceReference;
  step_title: string;
  description: string;
  duration_in_minutes: number;
};
