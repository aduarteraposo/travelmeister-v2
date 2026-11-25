import { getPlaceLinks } from "../lib/item-links";
import { Place } from "../types/app/place";
import LinkButton from "./LinkButton";

export default function HotelVerdict({ hotel }: { hotel: Place }) {
  const links = getPlaceLinks(hotel);

  if (hotel.verdict || hotel.bestIf || hotel.notIdealIf) {
    return (
      <div className="lg:flex-1 rounded-xl p-6 flex-col md:flex-row lg:flex-col flex border md:items-center gap-6 md:gap-8 lg:gap-4">
        <div>
          <h3 className="font-semibold text-lg mb-1.5">Verdict:</h3>
          <p className="mb-4">{hotel.verdict}</p>
          {hotel.bestIf && (
            <p className="mb-3">
              <span className="font-semibold mr-1.5">Best if:</span>
              {hotel.bestIf}
            </p>
          )}

          {hotel.notIdealIf && (
            <p>
              <span className="font-semibold mr-1.5">Not ideal if:</span>
              {hotel.notIdealIf}
            </p>
          )}
        </div>
        {links.bookings && links.bookings.length > 0 && (
          <LinkButton link={links.bookings[0]} className="mt-auto" />
        )}
      </div>
    );
  } else return null;
}
