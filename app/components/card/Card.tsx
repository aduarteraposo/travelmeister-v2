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
      className={`rounded-xl group relative h-full w-full flex flex-col ${
        layout === "horizontal" ? "md:flex-row" : ""
      }`}
      data-layout={layout}
    >
      {children}
    </article>
  );
}
