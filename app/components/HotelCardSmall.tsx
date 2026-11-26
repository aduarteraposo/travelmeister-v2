import { Place } from "../types/app/place";
import { IMAGE_SIZES } from "../lib/image-sizes";
import Tags from "./Tags";
import MapLinkAndBudget from "./MapLinkAndBudget";
import ImageWithFallback from "./ImageWithFallback";
import { getPlaceLinks, primaryLink, secondaryLink } from "../lib/item-links";
import LinkButton from "./LinkButton";

export default function HotelCardSmall({
  hotel,
  note,
  showNeighborhood,
}: {
  hotel: Place;
  note?: string;
  showNeighborhood: boolean;
}) {
  const links = getPlaceLinks(hotel);

  return (
    <article className="w-66 shrink-0 border rounded-xl mb-0">
      <ImageWithFallback
        sizes={IMAGE_SIZES.card}
        image={hotel.images[0]}
        className="rounded-t-xl aspect-video"
      />
      <div className="px-4 pt-3 pb-4.5 relative">
        <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
          {hotel.title}
        </h3>
        {hotel.editorTags.length > 0 && (
          <Tags
            tags={hotel.editorTags}
            stayed={typeof hotel.beenThere === "object"}
            count={1}
            size="small"
          />
        )}
        <p className="mb-4">{note ? note : hotel.shortDescription}</p>
        <MapLinkAndBudget hotel={hotel} showNeighborhood={showNeighborhood} />
        <div className="flex flex-col gap-4 mt-8">
          <LinkButton
            link={primaryLink(links)}
            variant={links.page ? "secondary" : "primary"}
          />
          {secondaryLink(links) && <LinkButton link={secondaryLink(links)} />}
        </div>
      </div>
    </article>
  );
}
