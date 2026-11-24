import Link from "next/link";
import { Place } from "../types/app/place";
import Tags from "./Tags";
import MapLinkAndBudget from "./MapLinkAndBudget";
import ImageWithFallback from "./ImageWithFallback";
import { getHotelHref } from "../lib/links";

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
      {
        <ImageWithFallback
          image={hotel.images[0]}
          className="aspect-video md:aspect-auto md:w-2/5 shrink-0 rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
        />
      }
      <div className="md:flex-1 p-4 pr-5 pb-4.5 md:pb-6">
        <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
          {hotel.title}
        </h3>
        {hotel.editorTags && (
          <Tags
            tags={hotel.editorTags}
            stayed={typeof hotel.beenThere === "object"}
            count={2}
            size="medium"
          />
        )}
        <p className="mb-4">{note ? note : hotel.shortDescription}</p>
        <MapLinkAndBudget hotel={hotel} showNeighborhood={showNeighborhood} />
        {hotel.vibe && (
          <p className="mb-5">
            <span className="font-bold">Vibe: </span>
            {hotel.vibe}
          </p>
        )}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {hotel.ctaLinks?.length > 0 && (
            <Link
              className="bg-black text-white font-medium rounded-full py-2 px-5 w-full md:w-auto text-center"
              key={hotel.ctaLinks[0].label}
              href={hotel.ctaLinks[0].url}
            >
              {hotel.ctaLinks[0].label}
            </Link>
          )}
          {hotel.verdict && (
            <Link
              className="border border-black font-medium rounded-full py-2 px-5 w-full md:w-auto text-center"
              href={getHotelHref(hotel)}
            >
              See details
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}
