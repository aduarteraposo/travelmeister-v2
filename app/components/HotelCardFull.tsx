import { Place } from "../types/app/place";
import ImageCarousel from "./ImageCarousel";
import Tags from "./Tags";
import Link from "next/link";
import MapLinkAndBudget from "./MapLinkAndBudget";
import ImageWithFallback from "./ImageWithFallback";
import { getHotelHref } from "../lib/links";

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
      <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
        {hotel.title}
        {hotel?.badge && (
          <span className="bg-green-300 py-1 px-4 rounded-full text-3xl flex-nowrap font-outdoor font-medium">
            {hotel.badge}
          </span>
        )}
      </h3>
      {hotel.images.length > 1 ? (
        <div className="h-48 md:h-80 lg:h-96">
          <ImageCarousel images={hotel.images} />
        </div>
      ) : (
        hotel.images.length > 0 && (
          <ImageWithFallback
            image={hotel.images[0]}
            className="rounded-xl aspect-16/10 w-full"
          />
        )
      )}
      {hotel.editorTags && (
        <Tags
          tags={hotel.editorTags}
          stayed={hotel.beenThere !== null}
          count={0}
          size="full"
        />
      )}
      <p className="mb-4">{note ? note : hotel.shortDescription}</p>
      <MapLinkAndBudget hotel={hotel} showNeighborhood={showNeighborhood} />
      {hotel.goodToKnow && (
        <p className="mb-4">
          <span className="font-bold">Heads-up: </span>
          {hotel.goodToKnow}
        </p>
      )}

      {hotel.ctaLinks?.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4">
          {hotel.ctaLinks?.map((link) => (
            <Link
              className="bg-black text-white font-medium rounded-full py-2 px-6 w-full md:w-auto text-center"
              key={link.label}
              href={link.url}
            >
              {link.label}
            </Link>
          ))}
          {hotel.verdict && (
            <Link
              className="border border-black font-medium rounded-full py-2 px-6 w-full md:w-auto text-center"
              href={getHotelHref(hotel)}
            >
              See details
            </Link>
          )}
        </div>
      )}
    </li>
  );
}
