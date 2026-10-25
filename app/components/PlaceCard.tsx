import Link from "next/link";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

import type { Place } from "../types/app/place";
import PlaceImageCarousel from "./PlaceImageCarousel";
import Tags from "./Tags";
import { Entry } from "../types/app/article";
import { Item } from "../types/app/item";
import { Experience } from "../types/app/experience";

export default function PlaceCard({
  entry,
}: {
  entry: Entry<Item, Place | Experience>;
}) {
  const item = entry.item;

  if (!item) {
    return <li className="mb-28 last:mb-0">{entry.editorialNote}</li>;
  }

  const { data } = item;
  const place = item.kind !== "experience" ? item.data : null;

  return (
    <li className="mb-28 last:mb-0">
      <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
        {data.title}
        {place?.badge && (
          <span className="bg-green-300 py-1 px-3 rounded-full text-3xl flex-nowrap font-outdoor font-medium">
            {place.badge}
          </span>
        )}
      </h3>
      {data.images.length > 1 ? (
        <PlaceImageCarousel images={data.images} />
      ) : (
        data.images.length > 0 && (
          <>
            <Image
              src={data.images[0].url}
              alt={data.images[0].alt}
              width={data.images[0].width}
              height={data.images[0].height}
            />
            <p className="text-xs text-gray-500 mt-1">
              {data.images[0].caption}
            </p>
          </>
        )
      )}
      {place && <Tags tags={place.editorTags} size="full" stayed={false} />}
      <p className="mb-4">{data.shortDescription}</p>
      <ul className="flex items-center gap-3 mb-4">
        <li className="flex items-center gap-1">
          <span>
            <FaLocationDot />
          </span>
          <Link
            href={data.mapLink}
            className="hover:underline underline-offset-3"
          >
            View on Map
          </Link>
        </li>
        {place && (
          <>
            <span>-</span>
            <li>{place.budget}</li>
          </>
        )}
      </ul>
      {place?.bestIf && (
        <p className="mb-1">
          <span className="font-bold">Best if:</span> {place.bestIf}
        </p>
      )}
      {place?.notIdealIf && (
        <p>
          <span className="font-bold">Not ideal if:</span> {place.notIdealIf}
        </p>
      )}
      <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
        {data.ctaLinks?.map((link) => (
          <Link
            className="bg-black text-white font-medium rounded-full py-2.5 px-6 w-full md:w-auto"
            key={link.label}
            href={link.url}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </li>
  );
}
