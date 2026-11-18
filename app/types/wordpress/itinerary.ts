import { WPImage } from "./media";
import { WPTerm } from "./place";
import { WPItemRef } from "./post";

export type WPItinerary = {
  primary_destination: WPItemRef;
  meta: { url_destination: string; url_destination_title: string };
  duration_days: number;
  summary: string;
  hero_image: WPImage;
  travel_style: WPTerm;
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
  main: WPItemRef;
  options: WPItemRef[];
};
