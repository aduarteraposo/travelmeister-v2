import { Tag } from "../types/wordpress";

export default function Tags({ tags }: { tags: Tag[] }) {
  return (
    <ul className="flex flex-wrap gap-3 my-6">
      {tags.map((tag) => (
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
