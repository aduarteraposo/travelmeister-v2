import Link from "next/link";
import { Place } from "../types/app/place";
import Tags from "./Tags";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import HotelImage from "./HotelImage";
import MapLinkAndBudget from "./MapLinkAndBudget";

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
        {hotel.images.length > 0 && <HotelImage image={hotel.images[0]} />}
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
        <MapLinkAndBudget hotel={hotel} showNeighborhood={showNeighborhood} />
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
