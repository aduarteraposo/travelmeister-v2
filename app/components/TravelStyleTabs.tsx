"use client";

import { useEffect, useRef, useState } from "react";
import { NormalizedTravelStyle } from "./../types/wordpress";
import TabPanelContent from "./TabPanelContent";

export default function TravelStyleTabs({
  travelStyles,
}: {
  travelStyles: NormalizedTravelStyle[];
}) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeTabPosition, setActiveTabPosition] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      const activeTab = tabsRef.current[activeTabIndex];
      if (!activeTab) {
        return;
      }

      setActiveTabPosition({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => removeEventListener("resize", updatePosition);
  }, [activeTabIndex]);

  return (
    <section className="border border-gray-300 rounded-xl flex flex-col">
      <div className="flex gap-1 justify-center relative py-2 bg-black text-white rounded-t-xl -mx-px">
        {travelStyles.map((style, index) => (
          <button
            className={`p-1 md:px-4 cursor-pointer lg:text-lg`}
            key={style.style.slug}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            role="tab"
            id={`tab-${style.style.slug}`}
            aria-selected={activeTabIndex === index}
            aria-controls={`panel-${style.style.slug}`}
            onClick={() => setActiveTabIndex(index)}
          >
            {style.style.name}
          </button>
        ))}
        <span
          className={`bg-green-300 h-1 absolute bottom-0 transition-all duration-200 ease-in-out`}
          style={{
            left: `${activeTabPosition.left}px`,
            width: `${activeTabPosition.width}px`,
          }}
        ></span>
      </div>

      <div className="grid [grid-template-areas:'stack']">
        {travelStyles.map((style, index) => (
          <div
            key={style.style.slug}
            id={`panel-${style.style.slug}`}
            role="tabpanel"
            aria-labelledby={`tab-${style.style.slug}`}
            className={`py-6 px-8 rounded-b-xl [grid-area:stack] transition-opacity duration-300 ${
              activeTabIndex === index
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
          >
            <TabPanelContent style={style} />
          </div>
        ))}
      </div>
    </section>
  );
}
