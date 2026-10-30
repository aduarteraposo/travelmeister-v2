import { Place } from "../types/app/place";
import PlaceImageCarousel from "./PlaceImageCarousel";
import Tags from "./Tags";
import Link from "next/link";
import HotelImage from "./HotelImage";
import MapLinkAndBudget from "./MapLinkAndBudget";

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
          <span className="bg-green-300 py-1 px-3 rounded-full text-3xl flex-nowrap font-outdoor font-medium">
            {hotel.badge}
          </span>
        )}
      </h3>
      {hotel.images.length > 1 ? (
        <PlaceImageCarousel images={hotel.images} />
      ) : (
        hotel.images.length > 0 && <HotelImage image={hotel.images[0]} />
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
      <MapLinkAndBudget hotel={hotel} showNeighborhood={showNeighborhood} />
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
    </li>
  );
}
