import { Experience } from "../types/app/experience";
import { Place } from "../types/app/place";

// lib/pages-rules.ts
export function hasHotelPage(h: Place) {
  return h.placeType === "hotel" && Boolean(h.verdict);
}
export function hasExperiencePage(e: Experience) {
  return e.steps.length > 0;
}
