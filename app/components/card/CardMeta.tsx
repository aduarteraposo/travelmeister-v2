import DotSeparated from "../DotSeparated";

export default function CardMeta({ items }: { items: (string | null)[] }) {
  return (
    <p className="text-xs">
      <DotSeparated items={items} />
    </p>
  );
}
