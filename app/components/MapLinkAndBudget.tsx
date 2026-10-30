import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { Place } from "../types/app/place";

export default function MapLinkAndBudget({
  hotel,
  showNeighborhood,
}: {
  hotel: Place;
  showNeighborhood: boolean;
}) {
  return (
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
  );
}
