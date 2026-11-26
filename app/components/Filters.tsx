import { useRef } from "react";
import { Term } from "../types/app/place";
import ScrollRow from "./ScrollRow";

export default function Filters({
  setFilter,
  filters,
  activeFilter,
  fixed = false,
}: {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filters: Term[];
  activeFilter: string;
  fixed?: boolean;
}) {
  const comparisonRef = useRef<HTMLDivElement | null>(null);

  function handleFilterClick(filter: string) {
    const before = comparisonRef.current?.getBoundingClientRect().top;

    setFilter(filter);

    if (fixed) {
      requestAnimationFrame(() => {
        const after = comparisonRef.current?.getBoundingClientRect().top;

        if (before == null || after == null) {
          return;
        }

        window.scrollBy({
          top: after - before,
        });
      });
    }
  }

  return (
    <div
      className={`${
        fixed ? "sticky top-8 bg-white pt-10 pb-4 z-40" : ""
      } mb-12`}
      ref={comparisonRef}
    >
      <ScrollRow listClassName="gap-2">
        <li key="all">
          <button
            onClick={() => handleFilterClick("all")}
            className={`rounded-full py-1 px-4 text-sm cursor-pointer font-medium whitespace-nowrap ${
              activeFilter === "all" ? "bg-green-300" : "bg-gray-300"
            }`}
          >
            All
          </button>
        </li>
        {filters.map((filter) => (
          <li key={filter.slug}>
            <button
              onClick={() => handleFilterClick(filter.slug)}
              className={`rounded-full py-1 px-4 text-sm cursor-pointer font-medium whitespace-nowrap ${
                activeFilter === filter.slug ? "bg-green-300" : "bg-gray-300"
              }`}
            >
              {filter.name}
            </button>
          </li>
        ))}
      </ScrollRow>
    </div>
  );
}
