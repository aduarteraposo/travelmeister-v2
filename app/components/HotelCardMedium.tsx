import Link from "next/link";
import { Place } from "../types/app/place";
import Tags from "./Tags";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

export default function HotelCardMedium({
  hotel,
  note,
  showNeighborhood,
}: {
  hotel: Place;
  note: string;
  showNeighborhood: boolean;
}) {
  return (
    <li className="last:mb-0 md:flex border rounded-xl mb-12 gap-2">
      <div className="relative h-60 md:h-auto md:min-h-48 md:w-2/5 shrink-0">
        {hotel.images?.length > 0 && (
          <Image
            className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
            src={hotel.images[0].url}
            alt={hotel.images[0].alt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        )}
      </div>
      <div className="md:flex-1 pt-4 px-4 pb-4">
        <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
          {hotel.title}
        </h3>
        {hotel.editorTags && (
          <Tags
            tags={hotel.editorTags}
            stayed={hotel.stayedHere}
            count={2}
            size="medium"
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

        <p className="mb-4">
          <span className="font-bold">Vibe: </span>
          {hotel.vibe}
        </p>
        {hotel.ctaLinks?.length > 0 && (
          <Link
            className="bg-black text-white font-medium rounded-full py-2.5 px-6 inline-block mt-6 w-full md:w-auto"
            key={hotel.ctaLinks[0].label}
            href={hotel.ctaLinks[0].url}
          >
            {hotel.ctaLinks[0].label}
          </Link>
        )}
      </div>
    </li>
  );
}
