"use client";

import { InstagramEmbed, TikTokEmbed } from "react-social-media-embed";
import { Place, PlaceWithSection } from "../types/app/place";
import { useInView } from "react-intersection-observer";
import PlaceSocialEmbedCard from "./PlaceSocialEmbedCard";
import Filters from "./Filters";
import { cn } from "cn";

export default function SocialEmbeds({
  allPlaces,
  isVisible,
  placeSelector,
  filters,
  setFilter,
  activeFilter,
}: {
  allPlaces: PlaceWithSection[];
  isVisible: (place: Place) => boolean;
  placeSelector: React.ReactNode;
  filters: string[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  activeFilter: string;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px 0px",
  });
  return (
    <div className="mt-12" ref={ref}>
      <h3 className="font-outdoor text-5xl mb-2">
        Real Guest Perspective: Inside the Rooms
      </h3>
      <p className="mb-8">
        We love standard room photos, but nothing beats seeing a hotel in
        real-time motion. Check out these quick, unfiltered video tours from
        real guests on TikTok and Instagram to see exactly how the rooms look,
        how much space you actually get, and what those skyline views look like
        without a professional lens.
      </p>
      {inView ? (
        <>
          <Filters
            filters={filters}
            setFilter={setFilter}
            activeFilter={activeFilter}
          />
          {placeSelector}

          {/* Hidden instead of unmounted, so the embeds don't reload on toggle */}
          <ul className="flex gap-8 items-start overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mt-8">
            {allPlaces.map((place) => (
              <li
                key={place.slug}
                className={cn(
                  "max-w-[calc(100dvw-2rem)] min-w-[calc(100dvw-2rem)] md:min-w-auto min-h-137.5 md:min-h-auto md:max-w-auto shrink-0",
                  !isVisible(place) && "hidden"
                )}
              >
                <PlaceSocialEmbedCard place={place} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>Loading Real Guest Opinions</div>
      )}
    </div>
  );
}
