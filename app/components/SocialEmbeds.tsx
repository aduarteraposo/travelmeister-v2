"use client";

import { InstagramEmbed, TikTokEmbed } from "react-social-media-embed";
import { PlaceWithSection } from "../types/app/place";
import { useInView } from "react-intersection-observer";

export default function SocialEmbeds({
  places,
}: {
  places: PlaceWithSection[];
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
        <div className="flex gap-8 items-start overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="max-w-[calc(100dvw-2rem)] min-w-[calc(100dvw-2rem)] md:min-w-auto min-h-137.5 md:min-h-auto md:max-w-auto shrink-0 border-gray-300 border rounded-xl">
            <h3 className="text-lg font-bold px-6 py-4 bg-black text-white text-center rounded-t-xl">
              Motto Hotel Chelsea New York
            </h3>
            <div className="flex items-start justify-end md:justify-normal relative p-3 md:p-6 md:gap-4">
              <div className="min-w-81.5 absolute md:relative top-3 left-3 md:top-0 md:left-0 scale-60 md:scale-100 origin-top-left">
                <TikTokEmbed url="https://www.tiktok.com/@j_exploress/video/7676610810998836494" />
              </div>
              <div className="shrink-0 w-2/5 md:w-auto max-w-60 text-sm md:text-base">
                <h4 className="text-base md:text-lg font-semibold mb-4">
                  What travelers say:
                </h4>
                <p className="mb-4">
                  <span className="font-semibold block">Choose for: </span>
                  Guests praise the hotel&apos;s exceptional Chelsea location,
                  immaculate cleanliness, and stunning upper-floor skyline
                  views.
                </p>
                <p className="mb-4">
                  <span className="font-semibold block">Skip if: </span>
                  Reviewers criticize the strictly micro-sized rooms and the
                  mandatory $30 daily urban destination fee.
                </p>
                <p>
                  <span className="font-semibold block">Favorite room: </span>
                  Landmark City View
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-[calc(100dvw-2rem)] min-w-[calc(100dvw-2rem)] md:min-w-auto min-h-137.5 md:min-h-auto md:max-w-auto shrink-0 border-gray-300 border rounded-xl">
            <h3 className="text-lg font-bold px-6 py-4 bg-black text-white text-center rounded-t-xl">
              Motto Hotel Chelsea New York
            </h3>
            <div className="flex items-start justify-end md:justify-normal relative p-3 md:p-6 md:gap-4">
              <div className="min-w-81.5 absolute md:relative top-3 left-3 md:top-0 md:left-0 scale-60 md:scale-100 origin-top-left">
                <InstagramEmbed
                  url="https://www.instagram.com/reel/DdDpNzUobD0/?utm_source=ig_embed&amp;utm_campaign=loading"
                  captioned
                />
              </div>
              <div className="shrink-0 w-2/5 md:w-auto max-w-60 text-sm md:text-base">
                <h4 className="text-base md:text-lg font-semibold mb-4">
                  What travelers say:
                </h4>
                <p className="mb-4">
                  <span className="font-semibold block">Choose for: </span>
                  Guests praise the hotel&apos;s exceptional Chelsea location,
                  immaculate cleanliness, and stunning upper-floor skyline
                  views.
                </p>
                <p className="mb-4">
                  <span className="font-semibold block">Skip if: </span>
                  Reviewers criticize the strictly micro-sized rooms and the
                  mandatory $30 daily urban destination fee.
                </p>
                <p>
                  <span className="font-semibold block">Favorite room: </span>
                  Landmark City View
                </p>
              </div>
            </div>
          </div>
          <div className="shrink-0 flex items-center">
            <InstagramEmbed url="https://www.instagram.com/reel/Ddc6ZtrRRCS/" />
          </div>
          <div className="shrink-0 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">
              Motto Hotel Chelsea New York
            </h3>
          </div>
          <div className="shrink-0 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">Terrass Hotel</h3>
            <InstagramEmbed
              url="https://www.instagram.com/reel/DdDpNzUobD0/?utm_source=ig_embed&amp;utm_campaign=loading"
              captioned
            />
          </div>
        </div>
      ) : (
        <div>Loading Real Guest Opinions</div>
      )}
    </div>
  );
}
