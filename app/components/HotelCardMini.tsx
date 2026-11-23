import { IoIosArrowForward } from "react-icons/io";
import { Place } from "../types/app/place";
import Link from "next/link";
import { getHotelHref } from "../lib/links";
import HotelImage from "./ImageWithFallback";
import ImageWithFallback from "./ImageWithFallback";

export default function HotelCardMini({ hotel }: { hotel: Place }) {
  return (
    <li className="w-60 shrink-0 border rounded-xl mb-0">
      <Link href={getHotelHref(hotel)}>
        <ImageWithFallback
          image={hotel.images[0]}
          className="aspect-video rounded-t-xl"
        />
        <div className="p-3 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{hotel.title}</h3>
          <IoIosArrowForward />
        </div>
      </Link>
    </li>
  );
}
