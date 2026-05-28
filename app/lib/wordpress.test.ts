import { describe, expect, it, vi } from "vitest";
import {
  getAllArticleRouteParams,
  getAllDestinationRouteParams,
  REVALIDATE,
} from "./wordpress";
import { Destination, WPPost } from "../types/wordpress";

describe("getAllArticleRouteParams", () => {
  it("maps WP articles into route params", async () => {
    // arrange
    global.fetch = vi.fn();
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () =>
        [
          {
            slug: "article-1",
            acf: {
              primary_destination: {
                post_name: "destination-1",
              },
            },
          },
          {
            slug: "article-2",
            acf: {
              primary_destination: {
                post_name: "destination-2",
              },
            },
          },
        ] as WPPost[],
    } as Response);
    // act
    const result = await getAllArticleRouteParams();
    // assert
    expect(result).toEqual([
      { destinationSlug: "destination-1", articleSlug: "article-1" },
      { destinationSlug: "destination-2", articleSlug: "article-2" },
    ]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/posts?acf_format=standard"),
      expect.any(Object)
    );
  });
});

describe("getAllDestinationRouteParams", () => {
  it("maps WP destinations into route params", async () => {
    // arrange
    global.fetch = vi.fn();
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () =>
        [
          {
            slug: "destination-1",
          },
          {
            slug: "destination-2",
          },
        ] as Destination[],
    } as Response);
    // act
    const result = await getAllDestinationRouteParams();
    // assert
    expect(result).toEqual([
      { destinationSlug: "destination-1" },
      { destinationSlug: "destination-2" },
    ]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/destination"),
      expect.any(Object)
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        next: {
          revalidate: REVALIDATE.day,
          tags: ["destinations", "destination-routes"],
        },
      })
    );
  });
});

describe("getAllArticleRouteParams", () => {
  it("throws if fetch response is not ok", async () => {
    // arrange
    global.fetch = vi.fn();
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
    } as Response);
    // assert
    await expect(getAllArticleRouteParams()).rejects.toThrow();
  });
});
