import { WPImage } from "../wordpress/media";
import { WPTerm } from "../wordpress/place";
import { WPItemRef } from "../wordpress/post";

export type Place = {
  id: number;
  slug: string;
  title: string;
  badge: string;
  images: WPImage[];
  shortDescription: string;
  destination: WPItemRef | null;
  urlDestination: string;
  editorTags: { label: string }[];
  bestIf: string;
  notIdealIf: string;
  vibe: string;
  idealFor: string[];
  budget: string;
  ctaLinks: { label: string; url: string }[];
  filters: Term[];
  placeType: PlaceType | null;
  placeSubtype: Term | null;
  travelStyles: Term[];
  goodToKnow: string;
  reviewsPro: string;
  reviewsContra: string;
  visitDuration: string;
  visitDurationMinutes: string;
  mapLink: string;
  coordinates: { lat: string | null; long: string | null } | null;
  stayedHere: boolean;
  lastReviewed: Date | null;
  verdict: string;
  photoHonesty: string;
  bookingRequest: string;
  bookingNotes: string[];
  privacyNote: string;
  celebrations: string;
  nightView: string;
  sunset: string;
  noise: string;
  video: string;
  rooms: Room[];
  sharedViews:
    | { spaceName: string; view: WPTerm | null; amount: string }
    | false;
};

export type LabeledPlace = {
  label: string;
  place: Place;
};

export type PlaceList = {
  section_title: string;
  section_intro: string;
  places: Place[];
};

export type WithSection<T> = T & { section_title: string };

export type Term = {
  id: number;
  name: string;
  slug: string;
};

export const PLACE_TYPES = [
  "hotel",
  "restaurant",
  "cafe",
  "bar",
  "sight",
  "shop",
] as const;

export type PlaceType = (typeof PLACE_TYPES)[number];

export function isPlaceType(value: unknown): value is PlaceType {
  return (
    typeof value === "string" &&
    (PLACE_TYPES as readonly string[]).includes(value)
  );
}

export type Room = {
  categoryName: string;
  isRestRow: boolean;
  views: View[];
  askFor: string;
  privacyLevel: string;
  features: WPTerm[];
  evidence: string[];
  isPick: boolean;
  photo: WPImage | null;
  note: string;
};

export type View = {
  view: WPTerm | null;
  amount: string;
  seenFrom: string[];
};
