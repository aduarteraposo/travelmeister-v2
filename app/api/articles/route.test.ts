import { describe, it, expect } from "vitest";
import { GET } from "./route";
import * as wordpress from "../../lib/wordpress/post";
import { vi } from "vitest";
import { PaginatedArticlesResponse } from "@/app/types/api/pagination";

vi.mock("../../lib/wordpress/post");

describe("GET /api/articles", () => {
  it("returns 400 when required params are missing", async () => {
    // arrange
    const request = new Request("http://localhost/api/articles");

    // act
    const response = await GET(request);
    const body = await response.json();

    // assert
    expect(response.status).toBe(400);
    expect(body.error).toBe("Missing required params");
  });
});

describe("GET /api/articles", () => {
  it("returns 200 and data if all params are passed", async () => {
    // arrange
    vi.mocked(wordpress.getPostsByCategoryAndDestination).mockResolvedValue({
      articles: [{ id: 1, slug: "test-article" }],
      total: 1,
    } as PaginatedArticlesResponse);
    const request = new Request(
      "http://localhost/api/articles?categoryId=1&destinationId=2&perPage=3&offset=0"
    );

    // act
    const response = await GET(request);
    const body = await response.json();

    // assert
    expect(response.status).toBe(200);
    expect(body.total).toBe(1);
    expect(wordpress.getPostsByCategoryAndDestination).toHaveBeenCalledWith(
      1,
      2,
      3,
      "",
      0
    );
  });
});

describe("GET /api/articles", () => {
  it("is called with correct exclude params if param is passed", async () => {
    // arrange
    vi.mocked(wordpress.getPostsByCategoryAndDestination).mockResolvedValue({
      articles: [{ id: 1, slug: "test-article" }],
      total: 1,
    } as PaginatedArticlesResponse);
    const request = new Request(
      "http://localhost/api/articles?categoryId=1&destinationId=2&perPage=3&offset=0&exclude=1,2,3"
    );

    // act
    const response = await GET(request);
    const body = await response.json();

    // assert
    expect(response.status).toBe(200);
    expect(body.total).toBe(1);
    expect(wordpress.getPostsByCategoryAndDestination).toHaveBeenCalledWith(
      1,
      2,
      3,
      "&exclude=1,2,3",
      0
    );
  });
});
