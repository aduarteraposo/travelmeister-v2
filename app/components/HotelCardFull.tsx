import { Place } from "../types/app/place";
import Image from "next/image";
import PlaceImageCarousel from "./PlaceImageCarousel";
import Tags from "./Tags";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

export default function HotelCardFull({
  hotel,
  note,
  showNeighborhood,
}: {
  hotel: Place;
  note: string;
  showNeighborhood: boolean;
}) {
  return (
    <li className="last:mb-0 mb-28">
      <div className="px-4 pb-4 relative">
        <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
          {hotel.title}
          {hotel?.badge && (
            <span className="bg-green-300 py-1 px-3 rounded-full text-3xl flex-nowrap font-outdoor font-medium">
              {hotel.badge}
            </span>
          )}
        </h3>
        {hotel.images.length > 1 ? (
          <PlaceImageCarousel images={hotel.images} />
        ) : (
          hotel.images.length > 0 && (
            <>
              <Image
                src={hotel.images[0].url}
                alt={hotel.images[0].alt}
                width={hotel.images[0].width}
                height={hotel.images[0].height}
              />
              <p className="text-xs text-gray-500 mt-1">
                {hotel.images[0].caption}
              </p>
            </>
          )
        )}
        {hotel.editorTags && (
          <Tags
            tags={hotel.editorTags}
            stayed={hotel.stayedHere}
            count={0}
            size="full"
          />
        )}
        <p className="mb-4">{note ? note : hotel.shortDescription}</p>
        <ul className="flex items-center gap-3 mb-4">
          <li className="flex items-center gap-1">
            <span>
              <FaLocationDot />
            </span>
            <Link
              href={hotel.mapLink}
              className="hover:underline underline-offset-3"
            >
              {showNeighborhood
                ? `${hotel.destination?.post_title} - View on Map`
                : "View on Map"}
            </Link>
          </li>
          {hotel.budget && (
            <>
              <span>-</span>
              <li>{hotel.budget}</li>
            </>
          )}
        </ul>
        {hotel.goodToKnow && (
          <p className="mb-4">
            <span className="font-bold">Heads-up: </span>
            {hotel.goodToKnow}
          </p>
        )}

        {hotel.ctaLinks?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
            {hotel.ctaLinks?.map((link) => (
              <Link
                className="bg-black text-white font-medium rounded-full py-2.5 px-6 w-full md:w-auto"
                key={link.label}
                href={link.url}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
