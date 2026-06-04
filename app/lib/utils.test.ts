import { describe, expect, it } from "vitest";
import { capitalizeFirstLetter, mapById } from "./utils";
import { WPPlace } from "@/app/types/wordpress/place";

describe("capitalizeFirstLetter", () => {
  it("capitalizes a lowercase word", () => {
    expect(capitalizeFirstLetter("paris")).toBe("Paris");
  });

  it("returns empty string when input is empty", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("keeps an already capitalized word unchanged", () => {
    expect(capitalizeFirstLetter("Paris")).toBe("Paris");
  });
});

describe("mapById", () => {
  it("maps an array to an object keyed by id", () => {
    // arrange
    const input = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];

    // act
    const result = mapById(input);

    // assert
    expect(result).toEqual({
      1: { id: 1, name: "Item 1" },
      2: { id: 2, name: "Item 2" },
    });
  });
});

describe("mapById", () => {
  it("returns an empty object when input array is empty", () => {
    // arrange
    const input: { id: number; name: string }[] = [];

    // act
    const result = mapById(input);

    // assert
    expect(result).toEqual({});
  });
});

describe("mapById", () => {
  it("keeps the last item when duplicate ids are present", () => {
    // arrange
    const input = [
      { id: 1, name: "Item 1" },
      { id: 1, name: "Item 2" },
    ];

    // act
    const result = mapById(input);

    // assert
    expect(result).toEqual({
      1: { id: 1, name: "Item 2" },
    });
  });
});

describe("mapById", () => {
  it("preserves all properties of each object", () => {
    // arrange
    const input = [
      { id: 1, name: "Item 1", slug: "item_1", meta: { rating: 4 } },
      { id: 2, name: "Item 2", slug: "item_2", meta: { rating: 2 } },
    ];

    // act
    const result = mapById(input);

    // assert
    expect(result).toEqual({
      1: { id: 1, name: "Item 1", slug: "item_1", meta: { rating: 4 } },
      2: { id: 2, name: "Item 2", slug: "item_2", meta: { rating: 2 } },
    });
  });
});
