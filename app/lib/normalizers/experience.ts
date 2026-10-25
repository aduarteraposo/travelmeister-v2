import { Experience } from "@/app/types/app/experience";
import { WPExperience } from "@/app/types/wordpress/experience";
import { toTerm } from "./place";

export function normalizeExperience(place: WPExperience): Experience {
  const acf = place.acf ?? {};

  const normalizedExperience: Experience = {
    id: place.id,
    slug: place.slug,
    title: place.title ? place.title.rendered : "",
    destination: acf.primary_destination ? acf.primary_destination : null,
    images: Array.isArray(acf.images)
      ? acf.images.flatMap((image) =>
          image && typeof image === "object"
            ? [
                {
                  id: image.id ?? "",
                  url: image.url ?? "",
                  alt: image.alt ?? "",
                  caption: image.caption ?? "",
                  width: image.width ?? "",
                  height: image.height ?? "",
                },
              ]
            : []
        )
      : [],
    shortDescription: acf.short_description ?? "",
    ctaLinks: Array.isArray(acf.cta_links)
      ? acf.cta_links.map((link) => ({
          label: link.label ?? "",
          url: link.url ?? "",
        }))
      : [],
    isBookable: Array.isArray(acf.cta_links) ? true : false,
    filters: Array.isArray(acf.filters)
      ? acf.filters
          .map((filter) =>
            filter && typeof filter === "object" ? toTerm(filter) : null
          )
          .filter((filter) => filter !== null)
      : [],
    experienceType:
      acf.experience_type && typeof acf.experience_type === "object"
        ? acf.experience_type.slug ?? ""
        : "",
    travelStyles: Array.isArray(acf.travel_styles)
      ? acf.travel_styles.flatMap((style) =>
          style && typeof style === "object" ? [toTerm(style)] : []
        )
      : [],
    durationInMinutes: acf.duration_minutes ?? null,
    defaultSlotSpan: acf.default_slot_span ?? null,
    mapLink: acf.map_link ?? "",
    coordinates:
      acf.coordinates && typeof acf.coordinates === "object"
        ? {
            lat: acf.coordinates.lat ?? null,
            long: acf.coordinates.long ?? null,
          }
        : null,
    steps: Array.isArray(acf.steps)
      ? acf.steps.map((step) => ({
          place: step.place || null,
          title: step.step_title ?? "",
          description: step.description ?? "",
          durationInMinutes: step.duration_in_minutes ?? null,
          options: Array.isArray(step.options) ? step.options : [],
        }))
      : [],
    doneIt: acf.done_it,
    priceFrom: acf.price_from,
    priceChecked: acf.price_checked ? new Date(acf.price_checked) : null,
    preferredSlot: acf.preferred_slot ? acf.preferred_slot : "",
    meetingPoint: acf.meeting_point,
  };

  return normalizedExperience;
}
