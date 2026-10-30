import { ArticleConfig } from "../lib/article-config";
import { Place } from "../types/app/place";
import HotelCardFull from "./HotelCardFull";
import HotelCardMedium from "./HotelCardMedium";
import HotelCardMini from "./HotelCardMini";
import HotelCardSmall from "./HotelCardSmall";

export default function HotelCard({
  hotel,
  size,
  showNeighborhood,
  note,
}: {
  hotel: Place;
  size: ArticleConfig["cardSize"];
  showNeighborhood: boolean;
  note: string;
}) {
  let hotelCard = null;

  switch (size) {
    case "full":
      hotelCard = (
        <HotelCardFull
          hotel={hotel}
          note={note}
          showNeighborhood={showNeighborhood}
        />
      );
      break;
    case "medium":
      hotelCard = (
        <HotelCardMedium
          hotel={hotel}
          note={note}
          showNeighborhood={showNeighborhood}
        />
      );
      break;
    case "small":
      hotelCard = (
        <HotelCardSmall
          hotel={hotel}
          note={note}
          showNeighborhood={showNeighborhood}
        />
      );
      break;
    case "mini":
      hotelCard = <HotelCardMini hotel={hotel} />;
      break;

    default:
      const _exhaustiveCheck: never = size;
      console.warn(`Unhandled size: ${_exhaustiveCheck}`);
  }

  return hotelCard;
}
