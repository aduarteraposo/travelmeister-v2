import { WPDestinationReference } from "../wordpress/destination";
import { WPImage } from "../wordpress/media";
import { WPItemRef } from "../wordpress/post";
import { Experience } from "./experience";
import { Place } from "./place";

export type Itinerary = {
  primary_destination: WPDestinationReference;
  durationDays: number;
  summary: string;
  heroImage: WPImage;
  travelStyle: WPItemRef;
};

export type ItineraryDay = {
  day_title: string;
  day_summary: string;
  items: ItineraryDayItem[];
};

export type ItineraryDayItem = {
  slot: "morning" | "afternoon" | "evening";
  slotSpan: number;
  title: string;
  text: string;
  main: Place | Experience;
  options: (Place | Experience)[];
};
