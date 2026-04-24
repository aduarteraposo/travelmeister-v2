"use client";

import { useEffect, useRef, useState } from "react";
import { NormalizedTravelStyle } from "./../types/wordpress";
import SmallArticleCard from "./SmallArticleCard";

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
    const activeTab = tabsRef.current[activeTabIndex];
    if (!activeTab) {
      return;
    }

    setActiveTabPosition({
      left: activeTab.offsetLeft,
      width: activeTab.offsetWidth,
    });
  }, [activeTabIndex]);

  return (
    <section className="border border-gray-300 rounded-xl flex flex-col">
      <div className="flex gap-1 justify-center relative py-2 bg-gray-100">
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
            <p className="mb-10 md:text-lg leading-relaxed text-gray-700">
              {style.summary}
            </p>
            <div className="md:flex">
              <div className="md:basis-2/3 md:border-r md:border-gray-300">
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-2 text-gray-700">
                    Where to stay
                  </h4>
                  <dl className="md:flex gap-2">
                    <dt className="font-medium shrink-0">Best areas:</dt>
                    <dd>{style.where_to_stay.stay_note}</dd>
                  </dl>

                  <dl className="md:flex gap-2">
                    <dt className="font-medium">Recommended Hotel:</dt>
                    {style.where_to_stay.primary_place && (
                      <dd>
                        {style.where_to_stay.primary_place.title.rendered}
                      </dd>
                    )}
                  </dl>
                  <dl className="md:flex gap-2">
                    <dt className="font-medium">Alternatives:</dt>
                    {style.where_to_stay.alternative_places.map(
                      (place, index) => (
                        <dd key={place.slug}>{`${place.title.rendered}${
                          index ===
                          style.where_to_stay.alternative_places.length - 1
                            ? ""
                            : ", "
                        }`}</dd>
                      )
                    )}
                  </dl>
                </div>
                <div className="mb-8">
                  <h4 className="font-semibold text-xl mb-2 text-gray-700">
                    What to do
                  </h4>
                  <dl className="md:flex gap-2">
                    <dt className="font-medium text-gray-800">Focus on:</dt>
                    <dd>{style.focus}</dd>
                  </dl>
                  <dl className="md:flex gap-2">
                    <dt className="font-medium text-gray-800">Skip:</dt>
                    <dd>{style.skip}</dd>
                  </dl>
                  <dl className="md:flex gap-2">
                    <dt className="font-medium text-gray-800">
                      Best experiences:
                    </dt>
                    <dd>
                      <ul className="flex gap-1">
                        {style.featured_experiences.map((place, index) => (
                          <li key={place.slug}>{`${place.title.rendered}${
                            index === style.featured_experiences.length - 1
                              ? ""
                              : ", "
                          }`}</li>
                        ))}
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="basis-1/3 md:pl-12">
                <h4 className="text-xl text-gray-700 font-semibold mb-2">
                  Suggested plan
                </h4>
                <dl>
                  <dt className="font-medium text-gray-800">Day: 1</dt>
                  <dd>Eiffel Tower, Seine walk, dinner in Saint-Germain</dd>
                  <dt className="font-medium text-gray-800">Day: 2</dt>
                  <dd>Louvre, Le Marais, sunset in Montmartre</dd>
                  <dt className="font-medium text-gray-800">Day: 3</dt>
                  <dd>Latin Quarter, Notre-Dame, relaxed café hopping</dd>
                </dl>
              </div>
            </div>

            {/* {style.related_articles && style.related_articles.length > 0 && (
              <div className="overflow-auto mt-6">
                <h4 className="text-lg font-semibold">Plan your trip</h4>
                <ul className="flex gap- mt-2">
                  {style.related_articles.map((article) => (
                    <li key={article.slug}>
                      <SmallArticleCard post={article} />
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </section>
  );
}
