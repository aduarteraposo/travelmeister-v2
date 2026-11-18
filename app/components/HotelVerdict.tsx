import { Place } from "../types/app/place";

export default function HotelVerdict({ hotel }: { hotel: Place }) {
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
        {hotel.ctaLinks.length > 0 && (
          <a
            href={hotel.ctaLinks[0].url}
            target="_blank"
            rel="sponsored noopener"
            className="lg:w-full rounded-full py-4 px-8 mb-1 bg-black text-white font-medium lg:mt-auto text-center shrink-0"
          >
            {hotel.ctaLinks[0].label}
          </a>
        )}
      </div>
    );
  } else return null;
}
