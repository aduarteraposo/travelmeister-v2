import { notFound, permanentRedirect } from "next/navigation";
import { getDestinationBySlug } from "../wordpress/destination";
import { getPlaceBySlug } from "../wordpress/place";
import { normalizePlace } from "../normalizers/place";
import { normalizeDestination } from "../normalizers/destination";
import {
  getHotelFacts,
  getHotelSpecialOccasionTexts,
  getHotelTrustItems,
} from "../hotel";
import { getHotelHref } from "../links";
import { hasHotelPage } from "../pages-rules";

export async function getHotelPageData(
  hotelSlug: string,
  destinationSlug: string
) {
  const [wpHotel, wpDestination] = await Promise.all([
    getPlaceBySlug(hotelSlug),
    getDestinationBySlug(destinationSlug),
  ]);

  if (!wpHotel) {
    notFound();
  }

  const hotel = normalizePlace(wpHotel);

  if (!hasHotelPage(hotel) || hotel.placeType !== "hotel") {
    notFound();
  }

  if (destinationSlug !== hotel.urlDestination) {
    permanentRedirect(getHotelHref(hotel));
  }

  if (!wpDestination) {
    notFound();
  }

  const destination = normalizeDestination(wpDestination);
  const hotelFacts = getHotelFacts(hotel);
  const hotelTrust = await getHotelTrustItems(hotel);
  const specialOccasion = getHotelSpecialOccasionTexts(hotel);

  return {
    hotel,
    destination,
    hotelFacts,
    hotelTrust,
    specialOccasion,
  };
}
