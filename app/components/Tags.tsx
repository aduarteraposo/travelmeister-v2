export default function Tags({
  tags,
  center,
}: {
  tags: { label: string }[];
  center?: boolean;
}) {
  return (
    <ul
      className={`flex flex-wrap gap-3 my-6 ${center ? "justify-center" : ""}`}
    >
      {tags &&
        tags.map((tag) => (
          <li
            className="rounded-full border-2 py-1 px-4 text-sm font-medium"
            key={tag.label}
          >
            {tag.label}
          </li>
        ))}
    </ul>
  );
}
