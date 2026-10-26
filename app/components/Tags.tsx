import Tag from "./Tag";

export default function Tags({
  tags,
  center,
  stayed,
  count,
  size,
}: {
  tags: { label: string }[];
  center?: boolean;
  stayed?: boolean;
  count?: number;
  size?: string;
}) {
  if (stayed && count) count--;

  return (
    <ul
      className={`flex flex-wrap gap-3 ${
        size === "small"
          ? "mt-3 mb-4 md:mt-3 md:my-4"
          : size === "medium"
          ? "my-4"
          : "mt-5 mb-4 md:mt-6 md:my-5"
      } ${center ? "justify-center" : ""}`}
    >
      {stayed && <Tag key="stayed">Stayed here</Tag>}
      {tags &&
        tags.flatMap((tag, index) =>
          count && index >= count
            ? []
            : [<Tag key={tag.label}>{tag.label}</Tag>]
        )}
    </ul>
  );
}
