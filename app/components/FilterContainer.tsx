"use client";
import { useMemo, useState } from "react";
import PlaceComparisonSection from "./PlaceComparisonSection";
import Filters from "./Filters";
import { Place } from "../types/app/place";
import { CleanArticle, Section } from "../types/app/article";
import ArticleTeaser from "./ArticleTeaser";
import { getAvailableFilters, matchesFilter } from "../lib/filters";
import { Experience } from "../types/app/experience";
import { Item } from "../types/app/item";
import ArticleSection from "./ArticleSection";

export default function FilterContainer({
  sections,
  relatedArticles,
  display,
  articleDestinationId,
}: {
  sections: Section<Item, Place | Experience>[];
  relatedArticles: CleanArticle[];
  articleDestinationId: number;
  display: {
    showComparison: boolean;
    showFilters: boolean;
    grouped: boolean;
    neighborhoodLabels: boolean;
    cardSize: string;
  };
}) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const filteredSections: Section<Item, Place | Experience>[] = useMemo(() => {
    return activeFilter === "all"
      ? sections
      : sections
          .map((section) => ({
            ...section,
            entries: section.entries.filter((entry) =>
              matchesFilter(entry, activeFilter)
            ),
          }))
          .filter((section) => section.entries.length > 0);
  }, [activeFilter, sections]);

  const availableFilters = useMemo(() => {
    return getAvailableFilters(sections);
  }, [sections]);

  const hotels = useMemo(() => getHotels(sections), [sections]);
  const filteredHotels = useMemo(
    () => getHotels(filteredSections),
    [filteredSections]
  );

  function getHotels(sections: Section<Item, Place | Experience>[]): Place[] {
    return sections.flatMap((section) =>
      section.entries.flatMap((entry) =>
        entry.item?.kind === "hotel" ? [entry.item.data] : []
      )
    );
  }
  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        <div className="lg:col-span-3">
          <div>
            {display.showFilters && (
              <Filters
                filters={availableFilters}
                setFilter={setActiveFilter}
                activeFilter={activeFilter}
              />
            )}
            <div>
              {filteredSections.map((section) => (
                <ArticleSection
                  key={section.key}
                  section={section}
                  display={display}
                  articleDestinationId={articleDestinationId}
                />
              ))}
            </div>
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
      {display.showComparison && (
        <div className="lg:col-span-4 mt-12 lg:mt-40">
          <h2 className="font-outdoor text-5xl md:text-6xl mb-1">
            Compare your favorites
          </h2>
          <p className="mb-8">
            Select all or check the boxes of the stays you want to see
            side-by-side.
          </p>
          {display.showFilters && (
            <Filters
              filters={availableFilters}
              setFilter={setActiveFilter}
              activeFilter={activeFilter}
              fixed={true}
            />
          )}
          <PlaceComparisonSection
            allHotels={hotels}
            filteredHotels={filteredHotels}
            filters={availableFilters}
            setFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
        </div>
      )}
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
