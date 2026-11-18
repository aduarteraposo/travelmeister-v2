export default function ChipRow<T extends string | number>({
  label,
  options,
  selectAll,
  selected,
  onSelect,
}: {
  label?: string | undefined;
  options: {
    id: T;
    label: string;
    count?: number | undefined;
  }[];
  selectAll?: { label: string; count?: number | undefined } | undefined;
  selected: T | null;
  onSelect: (id: T | null) => void;
}) {
  return (
    <div className="flex mb-4 items-center">
      {label && <p className="font-medium mr-4">{label}</p>}
      <ul className="flex gap-2">
        {selectAll && (
          <li key={selectAll.label}>
            <button
              className={`rounded-full border px-3 py-1.5 text-sm hover:border-gray-600 hover:cursor-pointer ${
                selected === null ? "bg-green-300" : ""
              }`}
              type="button"
              onClick={() => {
                onSelect(null);
              }}
            >
              {selectAll.label}{" "}
              {typeof selectAll.count === "number" && selectAll.count}
            </button>
          </li>
        )}
        {options.map((o) => (
          <li key={o.id}>
            <button
              onClick={() => onSelect(o.id)}
              disabled={o.count === 0}
              type="button"
              className={`rounded-full border px-3 py-1.5 text-sm not-disabled:hover:border-gray-600 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                selected === o.id ? "bg-green-300" : ""
              }`}
            >
              {o.label} {typeof o.count === "number" && o.count}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
