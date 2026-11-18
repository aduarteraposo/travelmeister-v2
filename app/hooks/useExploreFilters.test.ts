import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useExploreFilters from "./useExploreFilters";
import { BERLIN_ID, ids, ITEMS } from "../lib/explore-fixtures";

function setup() {
  return renderHook(() => useExploreFilters(ITEMS, BERLIN_ID));
}

describe("useExploreFilters", () => {
  it("starts with everything visible and no subtype row", () => {
    const { result } = setup();

    expect(ids(result.current.filteredItems)).toEqual([1, 2, 3, 4, 5]);
    expect(result.current.allTabsCount).toBe(5);
    expect(result.current.subtypeOptions).toEqual([]);
  });

  it("shows only the subtypes of the selected tab", () => {
    const { result } = setup();

    act(() => result.current.selectTab("stay"));

    expect(ids(result.current.filteredItems)).toEqual([1, 2]);
    expect(result.current.subtypeOptions.map((s) => s.id)).toEqual(["boutique", "design"]);
  });

  it("resets the subtype when the tab changes", () => {
    const { result } = setup();

    act(() => result.current.selectTab("stay"));
    act(() => result.current.selectSubtype("boutique"));
    act(() => result.current.selectTab("eat"));

    expect(result.current.state.subtype).toBeNull();
    expect(ids(result.current.filteredItems)).toEqual([3]);
  });

  it("keeps area, filter and been-there when the tab changes", () => {
    const { result } = setup();

    act(() => result.current.selectArea(2));
    act(() => result.current.selectFilter("romantic"));
    act(() => result.current.toggleBeenThere());
    act(() => result.current.selectTab("stay"));

    expect(result.current.state).toMatchObject({
      area: 2,
      filter: "romantic",
      beenThereOnly: true,
    });
    expect(ids(result.current.filteredItems)).toEqual([1]);
  });

  it("updates the tab counts when another filter is active", () => {
    const { result } = setup();

    act(() => result.current.selectArea(2)); // Mitte

    const counts = Object.fromEntries(result.current.tabOptions.map((t) => [t.id, t.count]));
    expect(counts).toEqual({ stay: 1, eat: 0, drink: 1, articles: 0 });
    expect(result.current.allTabsCount).toBe(2);
  });

  it("toggles been-there on and off", () => {
    const { result } = setup();

    act(() => result.current.toggleBeenThere());
    expect(ids(result.current.filteredItems)).toEqual([1, 3]);

    act(() => result.current.toggleBeenThere());
    expect(ids(result.current.filteredItems)).toEqual([1, 2, 3, 4, 5]);
  });

  // The most important promise of the chips: the number on a chip is exactly
  // what you get after clicking it.
  it("shows on every chip the number of results you get after clicking it", () => {
    const { result } = setup();
    act(() => result.current.selectFilter("romantic"));

    for (const tab of result.current.tabOptions) {
      const { result: clicked } = setup();
      act(() => clicked.current.selectFilter("romantic"));
      act(() => clicked.current.selectTab(tab.id));
      expect(clicked.current.filteredItems.length).toBe(tab.count);
    }

    for (const area of result.current.areaOptions) {
      const { result: clicked } = setup();
      act(() => clicked.current.selectFilter("romantic"));
      act(() => clicked.current.selectArea(area.id));
      expect(clicked.current.filteredItems.length).toBe(area.count);
    }
  });
});
