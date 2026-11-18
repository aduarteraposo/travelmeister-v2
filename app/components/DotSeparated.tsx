import { htmlToPlainText } from "../lib/metadata";

export default function DotSeparated({
  items,
}: {
  items: (string | null | undefined)[];
}) {
  const realItems = items.filter((item): item is string => Boolean(item));
  return realItems.map((item, index) => (
    <span key={item}>
      {index > 0 && (
        <span aria-hidden="true" className="mx-1.5">
          ·
        </span>
      )}
      {htmlToPlainText(item)}
    </span>
  ));
}
