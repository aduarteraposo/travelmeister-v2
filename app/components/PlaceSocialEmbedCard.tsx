import { TikTokEmbed } from "react-social-media-embed";
import { PlaceWithSection } from "../types/app/place";

export default function PlaceSocialEmbedCard({
  place,
}: {
  place: PlaceWithSection;
}) {
  return (
    <div className="border-gray-300 border rounded-xl">
      <h3 className="text-lg font-bold px-6 py-4 bg-black text-white text-center rounded-t-xl">
        {place.title}
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
            immaculate cleanliness, and stunning upper-floor skyline views.
          </p>
          <p className="mb-4">
            <span className="font-semibold block">Skip if: </span>
            Reviewers criticize the strictly micro-sized rooms and the mandatory
            $30 daily urban destination fee.
          </p>
          <p>
            <span className="font-semibold block">Favorite room: </span>
            Landmark City View
          </p>
        </div>
      </div>
    </div>
  );
}
