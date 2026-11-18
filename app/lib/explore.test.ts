import { describe, expect, it } from "vitest";
import { countIfSelected, ExploreState, getFilterOptions, matches } from "./explore";
import { BERLIN_ID, ids, ITEMS } from "./explore-fixtures";

const EMPTY: ExploreState = {
  tab: null,
  area: null,
  subtype: null,
  filter: null,
  beenThereOnly: false,
};

const matching = (state: Partial<ExploreState>) =>
  ids(ITEMS.filter((item) => matches(item, { ...EMPTY, ...state })));

describe("matches", () => {
  it("lets every item through when nothing is selected", () => {
    expect(matching({})).toEqual([1, 2, 3, 4, 5]);
  });

  it("filters by tab", () => {
    expect(matching({ tab: "stay" })).toEqual([1, 2]);
  });

  it("filters by area", () => {
    expect(matching({ area: 2 })).toEqual([1, 4]);
  });

  it("filters by subtype slug", () => {
    expect(matching({ subtype: "italian" })).toEqual([3]);
  });

  it("filters by place filter slug", () => {
    expect(matching({ filter: "romantic" })).toEqual([1, 3]);
  });

  it("keeps only items we've been to when beenThereOnly is on", () => {
    expect(matching({ beenThereOnly: true })).toEqual([1, 3]);
  });

  it("combines all criteria (every one has to match)", () => {
    expect(matching({ area: 3, filter: "romantic" })).toEqual([3]);
    expect(matching({ tab: "stay", area: 3, filter: "romantic" })).toEqual([]);
  });
});

describe("getFilterOptions", () => {
  const options = getFilterOptions(ITEMS, BERLIN_ID);

  it("only offers tabs that have items, in config order", () => {
    expect(options.tabs.map((t) => t.id)).toEqual(["stay", "eat", "drink", "articles"]);
  });

  it("lists each area once and leaves out the current destination", () => {
    expect(options.areas.map((a) => a.slug)).toEqual(["mitte", "kreuzberg"]);
  });

  it("lists each filter once", () => {
    expect(options.filters.map((f) => f.slug)).toEqual(["romantic", "rooftop"]);
  });

  it("keeps the tab on each subtype, so they can be shown per tab", () => {
    expect(options.subtypes.find((s) => s.slug === "italian")?.tab).toBe("eat");
  });

  it("returns empty lists for no items", () => {
    expect(getFilterOptions([], BERLIN_ID)).toEqual({
      tabs: [],
      filters: [],
      areas: [],
      subtypes: [],
    });
  });
});

describe("countIfSelected", () => {
  it("counts what the result would be after the change", () => {
    const state = { ...EMPTY, area: 3 }; // Kreuzberg
    expect(countIfSelected(ITEMS, state, { tab: "stay" })).toBe(1);
    expect(countIfSelected(ITEMS, state, { tab: "drink" })).toBe(0);
  });

  it("keeps the other active selections", () => {
    const state = { ...EMPTY, filter: "romantic" };
    expect(countIfSelected(ITEMS, state, { area: 2 })).toBe(1);
  });

  it("does not change the state it gets", () => {
    const state = { ...EMPTY };
    countIfSelected(ITEMS, state, { tab: "eat" });
    expect(state).toEqual(EMPTY);
  });
});
