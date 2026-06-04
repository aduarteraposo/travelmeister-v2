import { describe, expect, it } from "vitest";
import { WPPlace } from "@/app/types/wordpress/place";
import { normalizePlace } from "./place";

describe("normalizePlace", () => {
  it("normalizes filter objects into filter strings", () => {
    // arrange
    const input = {
      id: 1,
      acf: {
        hotel_filters: [
          { name: "Romantic", slug: "romantic" },
          { name: "Rooftop", slug: "rooftop" },
        ],
      },
    } as WPPlace;

    // act
    const result = normalizePlace(input);

    // assert
    expect(result.acf.hotel_filters).toEqual(["romantic", "rooftop"]);
  });
});

describe("normalizePlace", () => {
  it("creates empty array for hotel_filters if missing in object", () => {
    // arrange
    const input = { id: 1, acf: {} } as WPPlace;

    // act
    const result = normalizePlace(input);

    // assert
    expect(result.acf.hotel_filters).toEqual([]);
  });
});

describe("normalizePlace", () => {
  it("creates empty array for hotel_filters if empty", () => {
    // arrange
    const input = {
      id: 1,
      acf: {
        hotel_filters: [] as WPPlace["acf"]["hotel_filters"],
      },
    } as WPPlace;

    // act
    const result = normalizePlace(input);

    // assert
    expect(result.acf.hotel_filters).toEqual([]);
  });
});

describe("normalizePlace", () => {
  it("extracts title from title.rendered", () => {
    // arrange
    const input = { title: { rendered: "Test Place" } } as WPPlace;
    // act
    const result = normalizePlace(input);
    // assert
    expect(result.title).toBe("Test Place");
  });
});

describe("normalizePlace", () => {
  it("returns empty string when title is missing", () => {
    // arrange
    const input = {} as WPPlace;
    // act
    const result = normalizePlace(input);
    // assert
    expect(result.title).toBe("");
  });
});
