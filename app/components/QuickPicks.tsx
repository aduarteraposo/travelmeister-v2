import Link from "next/link";
import type { QuickPick } from "../types/app/article";
import Image from "next/image";
import { Item } from "../types/app/item";
import ImageWithFallback from "./ImageWithFallback";

export default function QuickPicks({
  quickPicks,
}: {
  quickPicks: QuickPick<Item>[];
}) {
  return (
    <>
      <h2 className="text-5xl md:text-6xl font-outdoor mb-2">
        The Long Story Short
      </h2>
      <ul className="border-3 border-green-300 rounded-xl p-4 mb-32 flex flex-col gap-6 md:gap-4">
        {quickPicks.map((pick, index) =>
          pick.item && typeof pick.item === "object" ? (
            <li
              className="flex flex-col md:flex-row gap-4 items-center"
              key={`${pick.item.data.slug}-${index}`}
            >
              <div className="w-full md:w-1/5">
                <ImageWithFallback
                  className="aspect-3/2 w-full rounded-xl"
                  image={pick.item.data.images[0]}
                />
              </div>

              <div className="md:basis-3/5 flex flex-col gap-1 text-center md:text-left">
                <div className="flex flex-col gap-3 md:flex-row items-center">
                  {pick.label && (
                    <p className="font-outdoor text-3xl rounded-full py-1 px-4 bg-green-300">
                      {pick.label}
                    </p>
                  )}
                  <h3 className="font-semibold">{pick.item.data.title}</h3>
                </div>

                <p>{pick.reason}</p>
              </div>
              {pick.item.data.ctaLinks.length > 0 && (
                <Link
                  className="border border-black rounded-full py-2 px-4 min-w-30 text-center font-medium md:ml-auto md:mr-8 md:flex-1"
                  href={pick.item.data.ctaLinks[0].url}
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
