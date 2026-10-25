"use client";

import { Place, Term, WithSection } from "../types/app/place";
import { useInView } from "react-intersection-observer";
import PlaceSocialEmbedCard from "./PlaceSocialEmbedCard";
import Filters from "./Filters";
import { cn } from "cn";

export default function SocialEmbeds({
  allHotels,
  isVisible,
  hotelSelector,
  filters,
  setFilter,
  activeFilter,
}: {
  allHotels: Place[];
  isVisible: (place: Place) => boolean;
  hotelSelector: React.ReactNode;
  filters: Term[];
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
          {hotelSelector}

          {/* Hidden instead of unmounted, so the embeds don't reload on toggle */}
          <ul className="flex gap-8 items-start overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mt-8">
            {allHotels.map((hotel) => (
              <li
                key={hotel.slug}
                className={cn(
                  "max-w-[calc(100dvw-2rem)] min-w-[calc(100dvw-2rem)] md:min-w-auto min-h-137.5 md:min-h-auto md:max-w-auto shrink-0",
                  !isVisible(hotel) && "hidden"
                )}
              >
                <PlaceSocialEmbedCard hotel={hotel} />
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
