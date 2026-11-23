import Breadcrumbs from "@/app/components/Breadcrumbs";
import DotSeparated from "@/app/components/DotSeparated";
import ImageCarousel from "@/app/components/ImageCarousel";
import Image from "next/image";
import BookingRequest from "@/app/components/BookingRequest";
import SpecialOccasionBlock from "@/app/components/SpecialOccasionBlock";
import RoomCard from "@/app/components/RoomCard";
import { getHotelPageData } from "@/app/lib/page-data/hotel-page";
import RoomTable from "@/app/components/RoomTable";
import HotelInfoBlock from "@/app/components/HotelInfoBlock";
import HotelVerdict from "@/app/components/HotelVerdict";
import { getAllHotelRouteParams } from "@/app/lib/wordpress/routes";
import { Metadata } from "next";
import { getPlaceBySlug } from "@/app/lib/wordpress/place";
import { htmlToPlainText, toMetaDescription } from "@/app/lib/metadata";
import { normalizePlace } from "@/app/lib/normalizers/place";
import { getHotelHref } from "@/app/lib/links";
import { getHotelDestinationString } from "@/app/lib/hotel";
import ImageWithFallback from "@/app/components/ImageWithFallback";

type HotelPageProps = {
  params: Promise<{ hotelSlug: string; destinationSlug: string }>;
};

export async function generateStaticParams() {
  return getAllHotelRouteParams();
}

export async function generateMetadata({
  params,
}: HotelPageProps): Promise<Metadata> {
  const { hotelSlug } = await params;
  const wpHotel = await getPlaceBySlug(hotelSlug);

  if (!wpHotel) return {};

  const hotel = normalizePlace(wpHotel);

  return {
    title: [htmlToPlainText(hotel.title), getHotelDestinationString(hotel)]
      .filter(Boolean)
      .join(", "),
    description: toMetaDescription(hotel.shortDescription || hotel.verdict),
    openGraph: { images: [hotel.images[0]?.url] },
    alternates: {
      canonical: getHotelHref(hotel),
    },
  };
}

export default async function HotelPage({ params }: HotelPageProps) {
  const { hotelSlug, destinationSlug } = await params;

  const { hotel, destination, hotelFacts, hotelTrust, specialOccasion } =
    await getHotelPageData(hotelSlug, destinationSlug);

  return (
    <>
      <Breadcrumbs destination={destination} place={hotel} />
      <h1 className="text-4xl font-bold my-4">{hotel.title}</h1>
      {hotel.headline && (
        <p className="text-xl font-semibold my-4">{hotel.headline}</p>
      )}
      <p className="text-sm my-3">
        <DotSeparated items={hotelFacts} />
      </p>
      <p className="text-sm mb-6">{<DotSeparated items={hotelTrust} />}</p>
      <section className="lg:flex gap-4 mb-12">
        <div className="lg:w-3/5 mb-4 lg:mb-0 h-60 md:h-96">
          {hotel.images.length > 1 ? (
            <ImageCarousel images={hotel.images} controls="overlay" />
          ) : hotel.images.length > 0 ? (
            <ImageWithFallback
              image={hotel.images[0]}
              className="rounded-xl object-cover h-full"
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-gray-100 flex justify-center items-center">
              No image found
            </div>
          )}
        </div>
        <HotelVerdict hotel={hotel} />
      </section>
      {hotel.rooms.length > 0 && (
        <section className="mb-12">
          <h2 className="font-outdoor text-5xl mb-2">Room by Room</h2>
          <div className="hidden lg:block">
            <RoomTable hotel={hotel} />
          </div>
          <div className="block lg:hidden">
            <ul className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {hotel.rooms.map((room, i) => (
                <li key={`${room.categoryName}-${i}`}>
                  <RoomCard room={room} hotelBeenThere={hotel.beenThere} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        {Object.values(specialOccasion).some(Boolean) && (
          <HotelInfoBlock title="For a special occasion">
            <SpecialOccasionBlock
              adultsOnly={hotel.filters.some((f) => f.slug === "adults-only")}
              notes={specialOccasion}
            />
          </HotelInfoBlock>
        )}

        {(hotel.bookingRequest || hotel.bookingNotes.length > 0) && (
          <HotelInfoBlock title="How to book the right room">
            <BookingRequest
              text={hotel.bookingRequest}
              notes={hotel.bookingNotes}
            />
          </HotelInfoBlock>
        )}
        {hotel.photoHonesty && (
          <HotelInfoBlock title="Are the official photos honest?">
            <p>{hotel.photoHonesty}</p>
          </HotelInfoBlock>
        )}
      </div>
    </>
  );
}
