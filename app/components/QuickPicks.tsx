import Link from "next/link";
import type { QuickPick } from "../types/app/article";
import Image from "next/image";
import { Place } from "../types/app/place";
import { Experience } from "../types/app/experience";

export default function QuickPicks({
  quickPicks,
}: {
  quickPicks: QuickPick<Place | Experience>[];
}) {
  return (
    <>
      <h2 className="text-5xl md:text-6xl font-outdoor mb-2">
        The Long Story Short
      </h2>
      <ul className="border-3 border-green-300 rounded-xl p-4 mb-32 flex flex-col gap-4">
        {quickPicks.map((pick, index) =>
          pick.item && typeof pick.item === "object" ? (
            <li
              className="flex flex-col md:flex-row gap-4 items-center"
              key={`${pick.item.slug}-${index}`}
            >
              <div className="basis-1/5 shrink-0 min-w-32 min-h-24">
                {pick.item.images.length > 0 && (
                  <Image
                    className="aspect-3/2"
                    loading="eager"
                    src={pick.item.images[0].url}
                    alt={pick.item.images[0].alt || pick.item.title || ""}
                    width={pick.item.images[0].width}
                    height={pick.item.images[0].height}
                  />
                )}
              </div>

              <div className="basis-3/5">
                <p className="flex gap-2">
                  <span className="font-bold">{pick.label}:</span>{" "}
                  {pick.item.title}
                </p>
                <p>{pick.reason}</p>
              </div>
              {pick.item.ctaLinks.length > 0 && (
                <Link
                  className="bg-green-300 rounded-full py-2 px-4 min-w-30 text-center font-medium ml-auto mr-8"
                  href={pick.item.ctaLinks[0].url}
                >
                  {pick.ctaText}
                </Link>
              )}
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </>
  );
}
