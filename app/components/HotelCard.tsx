import Image from "next/image";
import { Place } from "../types/app/place";
import PlaceImageCarousel from "./PlaceImageCarousel";
import Tags from "./Tags";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import HotelCardFull from "./HotelCardFull";
import HotelCardMedium from "./HotelCardMedium";
import HotelCardSmall from "./HotelCardSmall";

export default function HotelCard({
  hotel,
  size,
  showNeighborhood,
  note,
}: {
  hotel: Place;
  size: string;
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
  }

  return hotelCard;
}
