"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// A horizontally scrolling <ul> that shows a fade and an arrow button on each
// side where there is more to see. Both disappear at the start/end.
// Pass <li> elements as children.
export default function ScrollRow({
  children,
  className = "",
  listClassName = "gap-3",
  fadeFrom = "from-white", // the background colour the row sits on
}: {
  children: ReactNode;
  className?: string;
  listClassName?: string;
  fadeFrom?: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // 1px tolerance: browsers report fractional scroll positions.
    const update = () => {
      setCanScrollLeft(list.scrollLeft > 1);
      setCanScrollRight(
        list.scrollLeft + list.clientWidth < list.scrollWidth - 1
      );
    };

    update();
    list.addEventListener("scroll", update, { passive: true });
    // Re-check when the row changes size (window resize, layout changes).
    const observer = new ResizeObserver(update);
    observer.observe(list);

    return () => {
      list.removeEventListener("scroll", update);
      observer.disconnect();
    };
    // children: re-check when the items change (e.g. other filters).
  }, [children]);

  function scrollByPage(direction: 1 | -1) {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({
      left: direction * list.clientWidth * 0.7,
      behavior: "smooth",
    });
  }

  const buttonClasses =
    "absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black text-white shadow flex items-center justify-center cursor-pointer";

  return (
    <div className={`relative ${className}`}>
      <ul
        ref={listRef}
        className={`flex overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${listClassName}`}
      >
        {children}
      </ul>

      {canScrollLeft && (
        <>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-4 w-12 bg-linear-to-r ${fadeFrom} to-transparent`}
          />
          {/* Mouse helper only: keyboard users reach every item with Tab. */}
          <button
            type="button"
            tabIndex={-1}
            aria-label="Scroll left"
            onClick={() => scrollByPage(-1)}
            className={`${buttonClasses} -left-2`}
          >
            <IoIosArrowBack aria-hidden="true" />
          </button>
        </>
      )}

      {canScrollRight && (
        <>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-4 w-16 bg-linear-to-l ${fadeFrom} to-transparent`}
          />
          <button
            type="button"
            tabIndex={-1}
            aria-label="Scroll right"
            onClick={() => scrollByPage(1)}
            className={`${buttonClasses} -right-2`}
          >
            <IoIosArrowForward aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
