import { Entry, Section } from "../types/app/article";
import { Experience } from "../types/app/experience";
import { Item } from "../types/app/item";
import { Place, Term } from "../types/app/place";

export function getAvailableFilters(
  sections: Section<Item, Place | Experience>[]
): Term[] {
  const filterMap = new Map<string, number>();
  const filters: Term[] = [];
  const travelStyles: Term[] = [];

  const entries = sections.flatMap((section) => section.entries);

  for (const entry of entries) {
    const countTerm = (term: Term, target: Term[]) => {
      const prevCount = filterMap.get(term.slug);

      if (prevCount === undefined) {
        filterMap.set(term.slug, 1);
        target.push(term);
      } else {
        filterMap.set(term.slug, prevCount + 1);
      }
    };
    if (entry.item) {
      for (const filter of entry.item.data.filters) {
        countTerm(filter, filters);
      }
      for (const style of entry.item.data.travelStyles) {
        countTerm(style, travelStyles);
      }
    }
  }
  const availableFilters = [...filters, ...travelStyles].filter((filter) => {
    const count = filterMap.get(filter.slug);

    if (count && count < entries.length) return filter;
  });

  return availableFilters;
}

export function matchesFilter(
  entry: Entry<Item, Place | Experience>,
  activeFilter: string
): boolean | undefined {
  return (
    entry.item?.data?.filters.some((filter) => filter.slug === activeFilter) ||
    entry.item?.data.travelStyles.some((style) => style.slug === activeFilter)
  );
}
