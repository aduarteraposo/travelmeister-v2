import { getPlaceBySlug } from "@/app/lib/wordpress/place";
import { normalizePlace } from "@/app/lib/normalizers/place";
import { notFound } from "next/navigation";

type HotelPageProps = {
  params: Promise<{ hotelSlug: string; destinationSlug: string }>;
};

export default async function HotelPage({ params }: HotelPageProps) {
  const { hotelSlug, destinationSlug } = await params;
  const wpHotel = await getPlaceBySlug(hotelSlug);

  if (!wpHotel || destinationSlug !== wpHotel.meta?.url_destination) {
    notFound();
  }

  const hotel = normalizePlace(wpHotel);

  return <h1>{hotel.title}</h1>;
}
