import { Place, Term } from "../types/app/place";

export function getAvailableFilters(places: Place[]): Term[] {
  const filterMap = new Map<string, number>();
  const filters: Term[] = [];
  const travelStyles: Term[] = [];

  for (const place of places) {
    const countTerm = (term: Term, target: Term[]) => {
      const prevCount = filterMap.get(term.slug);

      if (prevCount === undefined) {
        filterMap.set(term.slug, 1);
        target.push(term);
      } else {
        filterMap.set(term.slug, prevCount + 1);
      }
    };
    for (const filter of place.filters) {
      countTerm(filter, filters);
    }

    for (const style of place.travelStyles) {
      countTerm(style, travelStyles);
    }
  }
  const availableFilters = [...filters, ...travelStyles].filter((filter) => {
    const count = filterMap.get(filter.slug);

    if (count && count < places.length) return filter;
  });

  return availableFilters;
}
