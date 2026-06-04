import Link from "next/link";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

import type { PlaceWithSection } from "../types/app/place";
import PlaceImageCarousel from "./PlaceImageCarousel";
import Tags from "./Tags";

export default function PlaceCard({ place }: { place: PlaceWithSection }) {
  return (
    <li key={place.slug} className="mb-28 last:mb-0">
      <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
        {place.title}
        {place.acf.badge && (
          <span className="bg-green-300 py-1 px-3 rounded-full text-sm md:text-base flex-nowrap italic font-medium">
            {place.acf.badge}
          </span>
        )}
      </h3>
      {place.acf.images.length > 1 ? (
        <PlaceImageCarousel images={place.acf.images} />
      ) : (
        <>
          {place.acf.images.length && (
            <>
              <Image
                src={place.acf.images[0].url}
                alt={place.acf.images[0].alt}
                width={place.acf.images[0].width}
                height={place.acf.images[0].height}
              />
              <p className="text-xs text-gray-500 mt-1">
                {place.acf.images[0].caption}
              </p>
            </>
          )}
        </>
      )}
      <Tags tags={place.acf.editor_tags} />
      <p className="mb-4">{place.acf.short_description}</p>
      <ul className="flex items-center gap-3 mb-4">
        <li className="flex items-center gap-1">
          <span>
            <FaLocationDot />
          </span>
          {place.acf.location}
        </li>
        <span>-</span>
        <li className="">{place.acf.budget}</li>
      </ul>
      <p className="mb-1">
        <span className="font-bold">Best if:</span> {place.acf.best_if}
      </p>
      <p>
        <span className="font-bold">Not ideal if:</span>{" "}
        {place.acf.not_ideal_if}
      </p>
      <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
        {place.acf.cta_links.map((item) => (
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
