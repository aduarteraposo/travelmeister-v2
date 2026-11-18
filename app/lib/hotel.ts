import { Place } from "../types/app/place";
import { WPUser } from "../types/wordpress/user";
import { getUserById } from "./wordpress/user";

export function getHotelDestinationString(hotel: Place): string | undefined {
  if (hotel.urlDestination !== hotel.destination?.post_name)
    return [hotel.destination?.post_title, hotel.urlDestinationTitle]
      .filter(Boolean)
      .join(", ");

  return hotel.destination?.post_title;
}

export type SpecialOccasion = {
  celebrations?: string | undefined;
  nightView?: string | undefined;
  sunset?: string | undefined;
  noise?: string | undefined;
};

export function getHotelSpecialOccasionTexts(hotel: Place): SpecialOccasion {
  const specialOccasion: SpecialOccasion = {
    celebrations: hotel.celebrations,
    nightView: hotel.nightView,
    sunset: hotel.sunset,
    noise: hotel.noise,
  };

  return specialOccasion;
}

export async function getHotelTrustItems(
  hotel: Place
): Promise<(string | null)[]> {
  const hotelReviewer = await getHotelReviewer(hotel);

  const hotelTrust = [
    hotel.beenThere
      ? `We stayed here ${hotel.beenThere.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}`
      : null,
    hotel.lastReviewed
      ? `Reviewed ${hotel.lastReviewed.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })} by ${hotelReviewer}`
      : null,
  ];

  return hotelTrust;
}

export async function getHotelReviewer(hotel: Place): Promise<string> {
  if (!hotel.reviewedBy) return "Travelmeister";
  try {
    return (await getUserById<WPUser>(hotel.reviewedBy)).name;
  } catch {
    return "Travelmeister";
  }
}

export function getHotelFacts(hotel: Place): (string | null | undefined)[] {
  const hotelFacts = [
    getHotelDestinationString(hotel),
    hotel.placeSubtype?.name,
    hotel.numberOfRooms ? `${hotel.numberOfRooms} rooms` : null,
    hotel.filters.some((f) => f.slug === "adults-only") ? "Adults only" : null,
  ].filter(Boolean);

  return hotelFacts;
}
