"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import PlaceComparisonTable from "./PlaceComparisonTable";
import PlaceList from "./PlaceList";
import Filters from "./Filters";
import { PlaceWithSection } from "../types/app/place";
import { WPPost } from "../types/wordpress/post";
import ArticleTeaser from "./ArticleTeaser";
import SocialEmbeds from "./SocialEmbeds";

export default function FilterContainer({
  places,
  relatedArticles,
}: {
  places: PlaceWithSection[];
  relatedArticles: WPPost[];
}) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const filteredPlaces = useMemo(() => {
    return activeFilter === "all"
      ? places
      : places.filter((place) =>
          place.acf.hotel_filters.includes(activeFilter)
        );
  }, [activeFilter, places]);

  const availableFilters = [
    "all",
    ...new Set(places.flatMap((place) => place.acf.hotel_filters)),
  ];

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        <div className="lg:col-span-3">
          <div>
            <Filters
              filters={availableFilters}
              setFilter={setActiveFilter}
              activeFilter={activeFilter}
            />
            <PlaceList places={filteredPlaces} />
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-1 sticky top-20 h-[calc(100dvh-130px)]">
          <h3 className="text-5xl mb-2 font-outdoor">Related Articles</h3>
          <div className="h-full overflow-y-auto">
            {relatedArticles.map((article) => (
              <ArticleTeaser key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-4 mt-12 lg:mt-40">
        <h2 className="font-outdoor text-5xl md:text-6xl mb-1">
          Compare your favorites
        </h2>
        <p className="mb-8">
          Select all or check the boxes of the stays you want to see
          side-by-side.
        </p>
        <Filters
          filters={availableFilters}
          setFilter={setActiveFilter}
          activeFilter={activeFilter}
          fixed={true}
        />
        <Suspense fallback={null}>
          <PlaceComparisonTable
            eligiblePlaces={filteredPlaces}
            allPlaces={places}
          />
        </Suspense>
      </div>
      <SocialEmbeds places={filteredPlaces} />
      <div className="lg:hidden mt-12">
        <h3 className="text-5xl mb-2 font-outdoor">Related Articles</h3>
        <div>
          {relatedArticles.map((article) => (
            <ArticleTeaser key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}
