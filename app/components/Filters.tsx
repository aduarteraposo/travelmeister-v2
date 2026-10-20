import { useRef } from "react";
import { Term } from "../types/app/place";

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
  const comparisonRef = useRef<HTMLUListElement | null>(null);

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
    <ul
      className="flex gap-3 mb-12 overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      ref={comparisonRef}
    >
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
    </ul>
  );
}
