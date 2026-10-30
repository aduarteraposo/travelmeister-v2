import { IoIosArrowForward } from "react-icons/io";
import { Place } from "../types/app/place";
import Link from "next/link";
import { getHotelHref } from "../lib/links";
import HotelImage from "./HotelImage";

export default function HotelCardMini({ hotel }: { hotel: Place }) {
  return (
    <li className="w-60 shrink-0 border rounded-xl mb-0">
      <Link href={getHotelHref(hotel)}>
        {hotel.images?.length > 0 && <HotelImage image={hotel.images[0]} />}
        <div className="p-3 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{hotel.title}</h3>
          <IoIosArrowForward />
        </div>
      </Link>
    </li>
  );
}
