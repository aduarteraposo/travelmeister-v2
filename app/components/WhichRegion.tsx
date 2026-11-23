import { RegionStyle } from "../types/app/destination";
import Link from "next/link";

export default function WhichRegion({ styles }: { styles: RegionStyle[] }) {
  return (
    <ul className="border rounded-lg">
      {styles.map((style) => (
        <li
          key={style.label}
          className="flex flex-col md:flex-row gap-2 md:gap-12 px-6 py-4 not-last:border-b md:items-center"
        >
          <h4 className="font-bold">{style.label}</h4>
          <div className="text-sm">
            <ul className="flex gap-4 mb-2">
              {style.destinations.map((d) => (
                <Link key={d.post_name} href={`/${d.post_name}`}>
                  <li className="rounded-full px-3 py-1 border-black border font-medium">
                    {d.post_title}
                  </li>
                </Link>
              ))}
            </ul>
            <p>{style.why}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
