import { ReactNode } from "react";

export default function Card({
  layout,
  children,
}: {
  layout: "horizontal" | "vertical" | "mini";
  children: ReactNode;
}) {
  return (
    <article
      className={`rounded-lg group relative ${
        layout === "horizontal" ? "flex" : ""
      }`}
      data-layout={layout}
    >
      {children}
    </article>
  );
}
