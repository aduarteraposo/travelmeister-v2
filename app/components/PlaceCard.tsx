import Link from "next/link";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

import type { Place, WithSection } from "../types/app/place";
import PlaceImageCarousel from "./PlaceImageCarousel";
import Tags from "./Tags";

export default function PlaceCard({ place }: { place: WithSection<Place> }) {
  return (
    <li key={place.slug} className="mb-28 last:mb-0">
      <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
        {place.title}
        {place.badge && (
          <span className="bg-green-300 py-1 px-3 rounded-full text-sm md:text-base flex-nowrap italic font-medium">
            {place.badge}
          </span>
        )}
      </h3>
      {place.images.length > 1 ? (
        <PlaceImageCarousel images={place.images} />
      ) : (
        <>
          {place.images.length && (
            <>
              <Image
                src={place.images[0].url}
                alt={place.images[0].alt}
                width={place.images[0].width}
                height={place.images[0].height}
              />
              <p className="text-xs text-gray-500 mt-1">
                {place.images[0].caption}
              </p>
            </>
          )}
        </>
      )}
      <Tags tags={place.editorTags} />
      <p className="mb-4">{place.shortDescription}</p>
      <ul className="flex items-center gap-3 mb-4">
        <li className="flex items-center gap-1">
          <span>
            <FaLocationDot />
          </span>
          <Link
            href={place.mapLink}
            className="hover:underline underline-offset-3"
          >
            View on Map
          </Link>
        </li>
        <span>-</span>
        <li className="">{place.budget}</li>
      </ul>
      <p className="mb-1">
        <span className="font-bold">Best if:</span> {place.bestIf}
      </p>
      <p>
        <span className="font-bold">Not ideal if:</span> {place.notIdealIf}
      </p>
      <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
        {place.ctaLinks &&
          place.ctaLinks.map((item) => (
            <Link
              className="bg-black text-white font-medium rounded-full py-2.5 px-6 w-full md:w-auto"
              key={item.label}
              href={item.url}
            >
              {item.label}
            </Link>
          ))}
      </div>
    </li>
  );
}
