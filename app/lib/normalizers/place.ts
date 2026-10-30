import { isPlaceType, Place, Term } from "@/app/types/app/place";
import { WPPlace, WPTerm } from "@/app/types/wordpress/place";

export function normalizePlace(place: WPPlace): Place {
  const acf = place.acf ?? {};

  const normalizedPlace: Place = {
    id: place.id,
    slug: place.slug,
    title: place.title ? place.title.rendered : "",
    badge: acf.badge ?? "",
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
    destination: acf.primary_destination ? acf.primary_destination : null,
    urlDestination: place.meta?.url_destination
      ? place.meta.url_destination
      : "",
    editorTags: Array.isArray(acf.editor_tags)
      ? acf.editor_tags.map((tag) => ({ label: tag.label ?? "" }))
      : [],
    bestIf: acf.best_if ?? "",
    notIdealIf: acf.not_ideal_if ?? "",
    vibe: acf.vibe ?? "",
    idealFor: Array.isArray(acf.ideal_for)
      ? acf.ideal_for.filter((group) => group.length > 0)
      : [],
    budget: acf.budget ?? "",
    ctaLinks: Array.isArray(acf.cta_links)
      ? acf.cta_links.map((link) => ({
          label: link.label ?? "",
          url: link.url ?? "",
        }))
      : [],
    filters: Array.isArray(acf.filters)
      ? acf.filters
          .map((filter) =>
            filter && typeof filter === "object" ? toTerm(filter) : null
          )
          .filter((filter) => filter !== null)
      : [],
    placeType:
      acf.place_type && typeof acf.place_type === "object"
        ? isPlaceType(acf.place_type.slug)
          ? acf.place_type.slug
          : null
        : null,
    placeSubtype:
      acf.place_subtype && typeof acf.place_subtype === "object"
        ? toTerm(acf.place_subtype)
        : null,
    travelStyles: Array.isArray(acf.travel_styles)
      ? acf.travel_styles.flatMap((style) =>
          style && typeof style === "object" ? [toTerm(style)] : []
        )
      : [],
    goodToKnow: acf.good_to_know ?? "",
    reviewsPro: acf.reviews_pro ?? "",
    reviewsContra: acf.reviews_contra ?? "",
    visitDuration: acf.visit_duration ?? "",
    visitDurationMinutes: acf.visit_duration ?? "",
    mapLink: acf.map_link ?? "",
    coordinates:
      acf.coordinates && typeof acf.coordinates === "object"
        ? {
            lat: acf.coordinates.lat ?? null,
            long: acf.coordinates.long ?? null,
          }
        : null,
    stayedHere: acf.stayed_here ?? false,
    lastReviewed: acf.last_reviewed ? new Date(acf.last_reviewed) : null,
    verdict: acf.verdict ?? "",
    photoHonesty: acf.photo_honesty ?? "",
    bookingRequest: acf.booking_request ?? "",
    bookingNotes: Array.isArray(acf.booking_notes) ? acf.booking_notes : [],
    privacyNote: acf.privacy_note ?? "",
    celebrations: acf.celebrations ?? "",
    nightView: acf.night_view ?? "",
    sunset: acf.sunset ?? "",
    noise: acf.noise ?? "",
    video: acf.video ?? "",
    rooms: Array.isArray(acf.rooms)
      ? acf.rooms.map((room) => ({
          categoryName: room.category_name ?? "",
          isRestRow: room.is_rest_row ?? false,
          views: Array.isArray(room.views)
            ? room.views.map((v) => ({
                view: v.view && typeof v.view === "object" ? v.view : null,
                amount: v.amount ?? "",
                seenFrom: v.seen_from,
              }))
            : [],
          askFor: room.ask_for ?? "",
          privacyLevel: room.privacy_level ?? "",
          features: Array.isArray(room.features)
            ? room.features.flatMap((f) =>
                f && typeof f === "object" ? [f] : []
              )
            : [],
          evidence: Array.isArray(room.evidence) ? room.evidence : [],
          isPick: room.is_pick ?? false,
          photo:
            room.photo && typeof room.photo === "object" ? room.photo : null,
          note: room.note ?? "",
        }))
      : [],
    sharedViews:
      acf.shared_views && typeof acf.shared_views === "object"
        ? {
            spaceName: acf.shared_views.space_name,
            view:
              acf.shared_views.view && typeof acf.shared_views.view === "object"
                ? acf.shared_views.view
                : null,
            amount: acf.shared_views.amount ?? "",
          }
        : false,
  };

  return normalizedPlace;
}

export function toTerm(wpTerm: WPTerm): Term {
  return {
    id: wpTerm.term_id,
    slug: wpTerm.slug ?? "",
    name: wpTerm.name ?? "",
  };
}
