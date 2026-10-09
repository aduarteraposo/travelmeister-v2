import { WPDestinationReference, WPTravelStylereference } from "./destination";
import { WPExperienceReference } from "./experience";
import { WPImage } from "./media";
import { WPPlaceReference } from "./place";

export type WPItinerary = {
  primary_destination: WPDestinationReference;
  duration_days: number;
  summary: string;
  hero_image: WPImage;
  travel_style: WPTravelStylereference;
};

export type WPItineraryDay = {
  day_title: string;
  day_summary: string;
  items: ItineraryDayItem[];
};

export type ItineraryDayItem = {
  slot: "morning" | "afternoon" | "evening";
  slot_span: number;
  title: string;
  text: string;
  main: WPPlaceReference | WPExperienceReference;
  options: (WPPlaceReference | WPExperienceReference)[];
};
