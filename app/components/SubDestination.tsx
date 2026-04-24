import Image from "next/image";
import { Destination, NormalizedPlace } from "../types/wordpress";
import Tags from "./Tags";

export default function SubDestination({
  parentDestinationType,
  destination,
}: {
  parentDestinationType: string;
  destination: Destination;
}) {
  return (
    <div className="w-72 lg:w-80 shrink-0 mb-4 rounded-xl border border-gray-300 text-center flex flex-col">
      <div className="aspect-2/3 flex justify-center overflow-hidden -z-1 relative">
        <Image
          src={destination.acf.hero_image.url}
          alt={destination.acf.hero_image.alt}
          width={destination.acf.hero_image.width}
          height={destination.acf.hero_image.height}
          className="h-full object-cover rounded-t-xl"
        />
      </div>
      <div className="p-4 md:p-6 pt-24 md:pt-28 bg-linear-to-b from-transparent from-0% to-50% to-white -mt-44 md:-mt-36 rounded-b-xl flex-1">
        <h3 className="font-bold text-lg md:text-xl mb-2 text-center">
          {destination.title.rendered}
        </h3>
        {destination.acf.card_description &&
          parentDestinationType === "city" && (
            <p>{destination.acf.card_description}</p>
          )}
        {/* <Tags tags={destination.acf.hero_tags} /> */}
      </div>
    </div>
  );
}
