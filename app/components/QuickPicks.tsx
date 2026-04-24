import Link from "next/link";
import type { QuickPick } from "../types/wordpress";
import Image from "next/image";

export default function QuickPicks({
  quickPicks,
}: {
  quickPicks: QuickPick[];
}) {
  return (
    <ul className="bg-green-300 rounded-md p-4 mb-32 flex flex-col gap-4">
      {quickPicks.map((pick, index) => (
        <li
          className="flex gap-4 items-center"
          key={`${pick.place.slug}-${index}`}
        >
          <div className="basis-1/5 shrink-0 min-w-32 min-h-24">
            {pick.place.acf.images.length && (
              <Image
                className="aspect-3/2"
                loading="eager"
                src={pick.place.acf.images[0].url}
                alt={
                  pick.place.acf.images[0].alt ||
                  pick.place.title.rendered ||
                  ""
                }
                width={pick.place.acf.images[0].width}
                height={pick.place.acf.images[0].height}
              />
            )}
          </div>

          <div className="basis-3/5">
            <p className="flex gap-2">
              <span className="font-bold">{pick.pick_label}:</span>{" "}
              {pick.place.title.rendered}
            </p>
            <p>{pick.reason}</p>
          </div>
          <Link
            className="bg-black text-white rounded-full py-2 px-4 min-w-30 text-center font-medium ml-auto mr-8"
            href={pick.place.acf.cta_links[0].url}
          >
            {pick.cta_text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
