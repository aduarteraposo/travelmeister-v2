import { ExploreItem, ExploreTab } from "../types/app/explore";
import { EXPLORE_TABS } from "./explore-tabs-config";
import { uniqueBy } from "./utils";

export type ExploreState = {
  tab: ExploreTab["id"] | null;
  subtype: string | null;
  filter: string | null;
  area: number | null;
  beenThereOnly: boolean;
};

export function matches(item: ExploreItem, state: ExploreState): boolean {
  return (
    (!state.tab || item.tab === state.tab) &&
    (!state.area || (item.area !== null && item.area.id === state.area)) &&
    (!state.subtype || item.subtype?.slug === state.subtype) &&
    (!state.filter ||
      item.filters.some((filter) => filter.slug === state.filter)) &&
    (!state.beenThereOnly || item.beenThere)
  );
}

export function getFilterOptions(items: ExploreItem[], destinationId: number) {
  const tabs = EXPLORE_TABS.filter((tab) =>
    items.some((item) => item.tab === tab.id)
  );

  const filters = uniqueBy(
    items.flatMap((item) => item.filters),
    (filter) => filter.id
  );

  const areas = uniqueBy(
    items.flatMap((item) => (item.area ? [item.area] : [])),
    (area) => area.id
  ).filter((area) => area.id !== destinationId);

  const subtypes = uniqueBy(
    items.flatMap((item) =>
      item.subtype ? [{ ...item.subtype, tab: item.tab }] : []
    ),
    (subtype) => subtype.id
  );

  return { tabs, filters, areas, subtypes };
}

export function countIfSelected(
  items: ExploreItem[],
  state: ExploreState,
  change: Partial<ExploreState>
): number {
  const nextState = { ...state, ...change };
  return items.filter((item) => matches(item, nextState)).length;
}
