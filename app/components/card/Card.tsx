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
      className={`rounded-xl group relative ${
        layout === "horizontal" ? "md:flex" : ""
      }`}
      data-layout={layout}
    >
      {children}
    </article>
  );
}
