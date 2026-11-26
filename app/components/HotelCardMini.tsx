import { IoIosArrowForward } from "react-icons/io";
import { IMAGE_SIZES } from "../lib/image-sizes";
import { Place } from "../types/app/place";
import ImageWithFallback from "./ImageWithFallback";
import MaybeLink from "./MaybeLink";
import { getPlaceLinks, primaryLink } from "../lib/item-links";

export default function HotelCardMini({ hotel }: { hotel: Place }) {
  return (
    <article className="w-60 shrink-0 border rounded-xl mb-0">
      <ImageWithFallback
        sizes={IMAGE_SIZES.card}
        image={hotel.images[0]}
        className="aspect-video rounded-t-xl"
      />
      <div className="p-3 flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          <MaybeLink link={primaryLink(getPlaceLinks(hotel))}>
            {hotel.title}
          </MaybeLink>
        </h3>
        <IoIosArrowForward />
      </div>
    </article>
  );
}
