import { describe, expect, it } from "vitest";
import { getAvailableFilters } from "./filters";
import { Place, Term, WithSection } from "../types/app/place";
import { Entry, Section } from "../types/app/article";
import { Item } from "../types/app/item";
import { Experience } from "../types/app/experience";

function term(slug: string): Term {
  return { id: slug.length, slug, name: slug };
}

function section(
  filters: string[],
  travelStyles: string[] = []
): Section<Item, Place | Experience> {
  return {
    title: "Title",
    entries: [
      {
        item: {
          data: {
            filters: filters.map(term),
            travelStyles: travelStyles.map(term),
          } as Place,
          kind: "place",
        } as Item,
        editorialNote: "Test note",
      } as Entry<Item, Place | Experience>,
    ],
  } as Section<Item, Place | Experience>;
}

describe("getAvailableFilters", () => {
  it("drops a filter every place has", () => {
    const sections = [section(["rooftop", "quiet"]), section(["rooftop"])];

    // act
    const result = getAvailableFilters(sections);

    // assert
    expect(result.map((t) => t.slug)).toEqual(["quiet"]);
  });

  it("returns an empty array when no entries are there", () => {
    const sections: Section<Item, Place | Experience>[] = [];

    // act
    const result = getAvailableFilters(sections);

    // assert
    expect(result).toEqual([]);
  });

  it("returns an empty array when any of the entries has filters", () => {
    const sections: Section<Item, Place | Experience>[] = [
      section([]),
      section([]),
    ];

    // act
    const result = getAvailableFilters(sections);

    // assert
    expect(result).toEqual([]);
  });

  it("collects and keeps a travel style that only some entries have", () => {
    const sections: Section<Item, Place | Experience>[] = [
      section(["rooftop", "quiet"]),
      section(["rooftop"], ["foodie", "first-time"]),
      section([], ["foodie"]),
    ];

    // act
    const result = getAvailableFilters(sections);

    // assert
    expect(result.map((t) => t.slug)).toContain("foodie");
  });

  it("drops a travel style all entries have", () => {
    const sections: Section<Item, Place | Experience>[] = [
      section(["rooftop", "quiet"], ["foodie"]),
      section(["rooftop"], ["foodie", "first-time"]),
      section([], ["foodie"]),
    ];

    // act
    const result = getAvailableFilters(sections);

    // assert
    expect(result.map((t) => t.slug)).not.toContain("foodie");
  });
});
