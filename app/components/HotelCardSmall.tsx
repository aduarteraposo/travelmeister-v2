import Link from "next/link";
import { Place } from "../types/app/place";
import Image from "next/image";
import Tags from "./Tags";
import { FaLocationDot } from "react-icons/fa6";

export default function HotelCardSmall({
  hotel,
  note,
  showNeighborhood,
}: {
  hotel: Place;
  note: string;
  showNeighborhood: boolean;
}) {
  return (
    <li className="w-66 shrink-0 border rounded-xl mb-0">
      {hotel.images?.length > 0 && (
        <Image
          className="object-cover h-44 mb-2 rounded-t-xl"
          src={hotel.images[0].url}
          alt={hotel.images[0].alt}
          width={hotel.images[0].width}
          height={hotel.images[0].height}
        />
      )}
      <div className="pb-16 px-4 relative">
        <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
          {hotel.title}
        </h3>
        {hotel.editorTags && (
          <Tags
            tags={hotel.editorTags}
            stayed={hotel.stayedHere}
            count={1}
            size="small"
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
                ? `${hotel.destination?.post_title}`
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
        {hotel.ctaLinks?.length > 0 && (
          <Link
            className="bg-black text-white font-medium rounded-full py-2.5 px-6 inline-block mt-6 absolute bottom-4"
            key={hotel.ctaLinks[0].label}
            href={hotel.ctaLinks[0].url}
          >
            Prices
          </Link>
        )}
      </div>
    </li>
  );
}
