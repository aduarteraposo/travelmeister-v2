import { Place } from "../types/app/place";
import { IMAGE_SIZES } from "../lib/image-sizes";
import ImageCarousel from "./ImageCarousel";
import Tags from "./Tags";
import MapLinkAndBudget from "./MapLinkAndBudget";
import ImageWithFallback from "./ImageWithFallback";
import LinkButton from "./LinkButton";
import { getPlaceLinks, primaryLink, secondaryLink } from "../lib/item-links";

export default function HotelCardFull({
  hotel,
  note,
  showNeighborhood,
}: {
  hotel: Place;
  note: string;
  showNeighborhood: boolean;
}) {
  const links = getPlaceLinks(hotel);

  return (
    <article className="last:mb-0 mb-28">
      <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
        {hotel.title}
        {hotel?.badge && (
          <span className="bg-green-300 py-1 px-4 rounded-full text-3xl flex-nowrap font-outdoor font-medium">
            {hotel.badge}
          </span>
        )}
      </h3>
      {hotel.images.length > 1 ? (
        <div className="h-48 md:h-80 lg:h-96">
          <ImageCarousel images={hotel.images} />
        </div>
      ) : (
        hotel.images.length > 0 && (
          <ImageWithFallback
            sizes={IMAGE_SIZES.articleColumn}
            image={hotel.images[0]}
            className="rounded-xl aspect-16/10 w-full"
          />
        )
      )}
      {hotel.editorTags && (
        <Tags
          tags={hotel.editorTags}
          stayed={hotel.beenThere !== null}
          count={0}
          size="full"
        />
      )}
      <p className="mb-4">{note ? note : hotel.shortDescription}</p>
      <MapLinkAndBudget hotel={hotel} showNeighborhood={showNeighborhood} />
      {hotel.goodToKnow && (
        <p className="mb-4">
          <span className="font-bold">Heads-up: </span>
          {hotel.goodToKnow}
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <LinkButton
          link={primaryLink(links)}
          variant={links.page ? "secondary" : "primary"}
        />
        {secondaryLink(links) && <LinkButton link={secondaryLink(links)} />}
      </div>
    </article>
  );
}
