"use client";

import { ReactNode, useId, useState } from "react";

export default function ExpandableTeaserContent({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <>
      <div className="relative shrink-0">
        {header}
        {/* after: stretches the click target over the whole header */}
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-sm font-medium cursor-pointer hover:underline underline-offset-4 after:absolute after:inset-0"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      </div>
      {/* Animating 0fr -> 1fr grows the box upwards, pushing the header up */}
      <div
        id={detailsId}
        inert={!expanded}
        className={`grid min-h-0 transition-[grid-template-rows] duration-300 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
