import { describe, expect, it } from "vitest";
import {
  capitalizeFirstLetter,
  mapById,
  normalizePlace,
} from "../wordpress-utils";
import { WPImage, Filter, Place } from "@/app/types/wordpress";

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
    } as Place;

    // act
    const result = normalizePlace(input);

    // assert
    expect(result.acf.hotel_filters).toEqual(["romantic", "rooftop"]);
  });
});

describe("normalizePlace", () => {
  it("creates empty array for hotel_filters if missing in object", () => {
    // arrange
    const input = { id: 1, acf: {} } as Place;

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
        hotel_filters: [] as Place["acf"]["hotel_filters"],
      },
    } as Place;

    // act
    const result = normalizePlace(input);

    // assert
    expect(result.acf.hotel_filters).toEqual([]);
  });
});

describe("normalizePlace", () => {
  it("extracts title from title.rendered", () => {
    // arrange
    const input = { title: { rendered: "Test Place" } } as Place;
    // act
    const result = normalizePlace(input);
    // assert
    expect(result.title).toBe("Test Place");
  });
});

describe("normalizePlace", () => {
  it("returns empty string when title is missing", () => {
    // arrange
    const input = {} as Place;
    // act
    const result = normalizePlace(input);
    // assert
    expect(result.title).toBe("");
  });
});

describe("normalizePlace & mapById", () => {
  it("normalizes WPPlaces and then maps them keyed by id", () => {
    // arrange
    const places = [
      {
        id: 1,
        title: { rendered: "Item 1" },
        acf: { hotel_filters: [{ name: "Filter 1", slug: "filter_1" }] },
      },
      {
        id: 2,
        title: { rendered: "Item 2" },
        acf: {
          badge: "Test badge",
          hotel_filters: [{ name: "Filter 2", slug: "filter_2" }],
        },
      },
    ] as Place[];
    // act
    const normalizedPlaces = places.map(normalizePlace);
    const result = mapById(normalizedPlaces);
    // assert
    expect(result[1].acf.hotel_filters[0]).toEqual("filter_1");
    expect(result[2].title).toEqual("Item 2");
  });
});
