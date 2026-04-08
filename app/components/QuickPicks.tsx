import Link from "next/link";
import type { WPHotel, QuickPick } from "../types/wordpress";
import Image from "next/image";

export default function QuickPicks({
  hotelsById,
  quickPicks,
}: {
  hotelsById: Record<string, WPHotel>;
  quickPicks: QuickPick[];
}) {
  return (
    <ul className="bg-green-300 rounded-md p-4 mb-32 flex flex-col gap-3">
      {quickPicks.map((pick) => (
        <li
          className="flex gap-4 items-center justify-between"
          key={pick.hotel_anchor}
        >
          <div className="basis-1/5 shrink-0 min-w-32 max-h">
            <Image
              className="aspect-3/2"
              loading="eager"
              src={hotelsById[pick.hotel_anchor].images[0].url}
              alt={
                hotelsById[pick.hotel_anchor].images[0].alt ||
                hotelsById[pick.hotel_anchor].name ||
                ""
              }
              width={hotelsById[pick.hotel_anchor].images[0].width}
              height={hotelsById[pick.hotel_anchor].images[0].height}
            />
          </div>

          <div>
            <p className="flex gap-2">
              <span className="font-bold">{pick.pick_label}:</span>{" "}
              {hotelsById[pick.hotel_anchor].name}
            </p>
            <p>{pick.reason}</p>
          </div>
          <Link
            className="bg-black text-white rounded-full py-2 px-4 min-w-30 text-center font-medium"
            href={hotelsById[pick.hotel_anchor].booking_links[0].link.url}
          >
            {pick.cta_text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
