import { describe, expect, it } from "vitest";
import { getAvailableFilters } from "./filters";
import { Place, Term } from "../types/app/place";

function term(slug: string): Term {
  return { id: slug.length, slug, name: slug };
}

function place(filters: string[], travelStyles: string[] = []): Place {
  return {
    filters: filters.map(term),
    travelStyles: travelStyles.map(term),
  } as Place;
}

describe("getAvailableFilters", () => {
  it("drops a filter every place has", () => {
    const places = [place(["rooftop", "quiet"]), place(["rooftop"])];

    // act
    const result = getAvailableFilters(places);

    // assert
    expect(result.map((t) => t.slug)).toEqual(["quiet"]);
  });

  it("returns an empty array when no places are there", () => {
    const places: Place[] = [];

    // act
    const result = getAvailableFilters(places);

    // assert
    expect(result).toEqual([]);
  });

  it("returns an empty array when any of the places has filters", () => {
    const places: Place[] = [place([]), place([])];

    // act
    const result = getAvailableFilters(places);

    // assert
    expect(result).toEqual([]);
  });

  it("collects and keeps a travel style that only some places have", () => {
    const places: Place[] = [
      place(["rooftop", "quiet"]),
      place(["rooftop"], ["foodie", "first-time"]),
      place([], ["foodie"]),
    ];

    // act
    const result = getAvailableFilters(places);

    // assert
    expect(result.map((t) => t.slug)).toContain("foodie");
  });

  it("drops a travel style all places have", () => {
    const places: Place[] = [
      place(["rooftop", "quiet"], ["foodie"]),
      place(["rooftop"], ["foodie", "first-time"]),
      place([], ["foodie"]),
    ];

    // act
    const result = getAvailableFilters(places);

    // assert
    expect(result.map((t) => t.slug)).not.toContain("foodie");
  });
});
