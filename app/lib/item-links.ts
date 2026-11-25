import { Experience } from "../types/app/experience";
import { ItemLink, ItemLinks } from "../types/app/link";
import { Place } from "../types/app/place";
import { getExperienceHref, getHotelHref } from "./links";
import { hasExperiencePage, hasHotelPage } from "./pages-rules";

// The single place that knows which links a place or experience has.
// Components never build these themselves: they call this and pick.

function bookingLinks(
  ctaLinks: { label: string; url: string }[]
): ItemLink[] | null {
  return ctaLinks.flatMap((l) =>
    l.url
      ? [
          {
            href: l.url,
            label: l.label,
            external: true,
            sponsored: true,
            kind: "booking",
          },
        ]
      : []
  );
}

function mapLink(url: string): ItemLink | null {
  return url
    ? { href: url, label: "View on map", external: true, kind: "map" }
    : null;
}

export function getPlaceLinks(place: Place): ItemLinks {
  return {
    page: hasHotelPage(place)
      ? {
          href: getHotelHref(place),
          label: "See rooms",
          external: false,
          kind: "page",
        }
      : null,
    bookings: bookingLinks(place.ctaLinks),
    map: mapLink(place.mapLink),
  };
}

export function getExperienceLinks(exp: Experience): ItemLinks {
  return {
    page: hasExperiencePage(exp)
      ? {
          href: getExperienceHref(exp),
          label: "See the route",
          external: false,
          kind: "page",
        }
      : null,
    bookings: bookingLinks(exp.ctaLinks),
    map: mapLink(exp.mapLink),
  };
}

// For a single link (a title, a whole clickable card): our page first,
// then booking, then the map.
export function primaryLink(links: ItemLinks): ItemLink | null {
  return links.page ?? links.bookings?.[0] ?? links.map;
}

// For a second button next to the title: booking, but only when the title
// already goes to our page. Otherwise both would point to the same place.
export function secondaryLink(links: ItemLinks): ItemLink | null {
  return links.page ? links.bookings?.[0] ?? null : null;
}
