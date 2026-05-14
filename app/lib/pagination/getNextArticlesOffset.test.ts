import { describe, it, expect } from "vitest";
import { getNextArticlesOffset } from "./getNextArticleOffset";
import { PaginatedArticlesResponse } from "@/app/types/wordpress";

describe("getNextArticleOffset", () => {
  it("returns the next offset when more articles are available", () => {
    // arrange
    const input = {
      articles: [{}, {}, {}, {}],
      total: 10,
    } as PaginatedArticlesResponse;

    // act
    const result = getNextArticlesOffset(input, 0);

    // assert
    expect(result).toBe(4);
  });
});

describe("getNextArticleOffset", () => {
  it("stops the query because no more articles are available", () => {
    // arrange
    const input = {
      articles: [{}, {}],
      total: 10,
    } as PaginatedArticlesResponse;

    // act
    const result = getNextArticlesOffset(input, 8);

    // assert
    expect(result).toBeUndefined();
  });
});

describe("getNextArticleOffset", () => {
  it("returns undefined when the last page contains no articles", () => {
    // arrange
    const input = {
      articles: [],
      total: 10,
    } as PaginatedArticlesResponse;

    // act
    const result = getNextArticlesOffset(input, 4);

    // assert
    expect(result).toBeUndefined();
  });
});
