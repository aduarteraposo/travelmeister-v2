import Link from "next/link";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

import type { PlaceWithSection } from "../types/wordpress";
import HotelImageCarousel from "./HotelImageCarousel";
import Tags from "./Tags";

export default function Hotel({ hotel }: { hotel: PlaceWithSection }) {
  return (
    <li key={hotel.slug} className="mb-28 last:mb-0">
      <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
        {hotel.title.rendered}
        {hotel.acf.badge && (
          <span className="bg-green-300 py-1 px-3 rounded-full text-sm md:text-base flex-nowrap italic font-medium">
            {hotel.acf.badge}
          </span>
        )}
      </h3>
      {hotel.acf.images.length > 1 ? (
        <HotelImageCarousel images={hotel.acf.images} />
      ) : (
        <>
          {hotel.acf.images.length && (
            <>
              <Image
                src={hotel.acf.images[0].url}
                alt={hotel.acf.images[0].alt}
                width={hotel.acf.images[0].width}
                height={hotel.acf.images[0].height}
              />
              <p className="text-xs text-gray-500 mt-1">
                {hotel.acf.images[0].caption}
              </p>
            </>
          )}
        </>
      )}
      <Tags tags={hotel.acf.editor_tags} />
      <p className="mb-4">{hotel.acf.short_description}</p>
      <ul className="flex items-center gap-3 mb-4">
        <li className="flex items-center gap-1">
          <span>
            <FaLocationDot />
          </span>
          {hotel.acf.location}
        </li>
        <span>-</span>
        <li className="">{hotel.acf.budget}</li>
      </ul>
      <p className="mb-1">
        <span className="font-bold">Best if:</span> {hotel.acf.best_if}
      </p>
      <p>
        <span className="font-bold">Not ideal if:</span>{" "}
        {hotel.acf.not_ideal_if}
      </p>
      <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
        {hotel.acf.cta_links.map((item) => (
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
