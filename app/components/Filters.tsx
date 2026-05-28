import { useRef } from "react";
import { capitalizeFirstLetter } from "../lib/wordpress-utils";

export default function Filters({
  setFilter,
  filters,
  activeFilter,
  fixed = false,
}: {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filters: string[];
  activeFilter: string;
  fixed?: boolean;
}) {
  const comparisonRef = useRef<HTMLUListElement | null>(null);

  function handleFilterClick(filter: string) {
    const before = comparisonRef.current?.getBoundingClientRect().top;

    setFilter(filter);

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

  return (
    <ul className="flex gap-3 mb-12" ref={comparisonRef}>
      {filters.map((filter) => (
        <li key={filter}>
          <button
            onClick={() => handleFilterClick(filter)}
            className={`rounded-full py-1 px-4 text-sm cursor-pointer font-medium ${
              activeFilter === filter ? "bg-green-300" : "bg-gray-300"
            }`}
          >
            {capitalizeFirstLetter(filter)}
          </button>
        </li>
      ))}
    </ul>
  );
}
