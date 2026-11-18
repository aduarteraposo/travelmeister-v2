import { useMemo, useState } from "react";
import {
  countIfSelected,
  ExploreState,
  getFilterOptions,
  matches,
} from "../lib/explore";
import { ExploreItem, ExploreTab } from "../types/app/explore";

const INITIAL_STATE: ExploreState = {
  tab: null,
  area: null,
  subtype: null,
  filter: null,
  beenThereOnly: false,
};

export default function useExploreFilters(
  items: ExploreItem[],
  destinationId: number,
  initialState: Partial<ExploreState> = {}
) {
  const [state, setState] = useState({ ...INITIAL_STATE, ...initialState });

  const options = useMemo(
    () => getFilterOptions(items, destinationId),
    [items, destinationId]
  );

  const tabOptions = options.tabs.map((t) => ({
    id: t.id,
    label: t.label,
    count: countIfSelected(items, state, { tab: t.id, subtype: null }),
  }));

  const areaOptions = options.areas.map((a) => ({
    id: a.id,
    label: a.label,
    count: countIfSelected(items, state, { area: a.id }),
  }));

  const filterOptions = options.filters.map((f) => ({
    id: f.slug,
    label: f.name,
    count: countIfSelected(items, state, { filter: f.slug }),
  }));

  const subtypeOptions = options.subtypes
    .filter((s) => s.tab === state.tab)
    .map((s) => ({
      id: s.slug,
      label: s.name,
      count: countIfSelected(items, state, { subtype: s.slug }),
    }));

  const filteredItems = useMemo(
    () => items.filter((item) => matches(item, state)),
    [items, state]
  );

  const actions = {
    selectTab: (tab: ExploreTab["id"] | null) =>
      setState((s) => ({ ...s, tab, subtype: null })), // rule: tab change resets subtype
    selectArea: (area: number | null) => setState((s) => ({ ...s, area })),
    selectFilter: (filter: string | null) =>
      setState((s) => ({ ...s, filter })),
    selectSubtype: (subtype: string | null) =>
      setState((s) => ({ ...s, subtype })),
    toggleBeenThere: () =>
      setState((s) => ({ ...s, beenThereOnly: !s.beenThereOnly })),
  };

  const allTabsCount = countIfSelected(items, state, {
    tab: null,
    subtype: null,
  });

  return {
    state,
    ...actions,
    filteredItems,
    tabOptions,
    areaOptions,
    filterOptions,
    subtypeOptions,
    allTabsCount,
  };
}
