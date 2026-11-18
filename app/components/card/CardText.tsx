import { ReactNode } from "react";

const CLAMP = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
} as const;

export default function CardText({
  children,
  lines,
}: {
  children: ReactNode;
  lines?: keyof typeof CLAMP;
}) {
  return (
    <p className={`not-last:mb-4 ${lines ? CLAMP[lines] : ""}`}>{children}</p>
  );
}
