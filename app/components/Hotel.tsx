import Link from "next/link";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

import type { HotelWithSection } from "../types/wordpress";
import HotelImageCarousel from "./HotelImageCarousel";
import Tags from "./Tags";

export default function Hotel({ hotel }: { hotel: HotelWithSection }) {
  return (
    <li key={hotel.name} className="mb-28">
      <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
        {hotel.name}
        <span className="bg-green-300 py-1 px-3 rounded-full text-sm md:text-base flex-nowrap italic font-medium">
          {hotel.badge}
        </span>
      </h3>
      {hotel.images.length > 0 ? (
        <HotelImageCarousel images={hotel.images} />
      ) : (
        <>
          <Image
            src={hotel.images[0].url}
            alt={hotel.images[0].alt}
            width={hotel.images[0].width}
            height={hotel.images[0].height}
          />
          <p className="text-xs text-gray-500 mt-1">
            {hotel.images[0].caption}
          </p>
        </>
      )}
      <Tags tags={hotel.tags} />
      <p className="mb-4">{hotel.description}</p>
      <ul className="flex items-center gap-3 mb-4">
        <li className="flex items-center gap-1">
          <span>
            <FaLocationDot />
          </span>
          {hotel.area}
        </li>
        <span>-</span>
        <li className="">{hotel.price_level}</li>
      </ul>
      <p className="mb-1">
        <span className="font-bold">Best if:</span> {hotel.best_if}
      </p>
      <p>
        <span className="font-bold">Not ideal if:</span> {hotel.not_ideal_if}
      </p>
      <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
        {hotel.booking_links.map((item) => (
          <Link
            className="bg-black text-white font-medium rounded-full py-2.5 px-6 w-full md:w-auto"
            key={item.link.title}
            href={item.link.url}
          >
            {item.link.title}
          </Link>
        ))}
      </div>
    </li>
  );
}
