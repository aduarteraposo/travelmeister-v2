import { WPImage } from "../wordpress/media";
import { WPItemRef } from "../wordpress/post";
import { Term } from "./place";

export type Experience = {
  id: number;
  slug: string;
  title: string;
  destination: WPItemRef | null;
  urlDestination: string;
  shortDescription: string;
  images: WPImage[];
  experienceType: Term | null;
  travelStyles: Term[];
  filters: Term[];
  durationInMinutes: number | null;
  defaultSlotSpan: number | null;
  steps: ExperienceStep[];
  ctaLinks: { label: string; url: string }[];
  isBookable: boolean;
  mapLink: string;
  coordinates: { lat: string | null; long: string | null } | null;
  doneIt: boolean;
  priceFrom: string;
  priceChecked: Date | null;
  preferredSlot: string;
  meetingPoint: string;
};

export type ExperienceStep = {
  place: WPItemRef | null;
  title: string;
  description: string;
  durationInMinutes: number;
  options: WPItemRef[];
};
