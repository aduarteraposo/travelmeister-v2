import { describe, expect, it, vi } from "vitest";
import { REVALIDATE } from "./client";
import {
  getAllArticleRouteParams,
  getAllDestinationRouteParams,
} from "./routes";
import { WPPost } from "../../types/wordpress/post";
import { WPDestination } from "../../types/wordpress/destination";

// A fake fetch response. wordpressFetchAll reads the X-WP-TotalPages header,
// so every list response needs headers.
function wpResponse(body: unknown, totalPages = 1): Response {
  return {
    ok: true,
    json: async () => body,
    headers: new Headers({ "X-WP-TotalPages": String(totalPages) }),
  } as Response;
}

describe("getAllArticleRouteParams", () => {
  it("maps WP articles into route params using url_destination", async () => {
    // arrange
    global.fetch = vi.fn();
    vi.mocked(global.fetch).mockResolvedValue(
      wpResponse([
        { slug: "article-1", meta: { url_destination: "paris" } },
        { slug: "article-2", meta: { url_destination: "berlin" } },
      ] as WPPost[])
    );
    // act
    const result = await getAllArticleRouteParams();
    // assert
    expect(result).toEqual([
      { destinationSlug: "paris", articleSlug: "article-1" },
      { destinationSlug: "berlin", articleSlug: "article-2" },
    ]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/posts?"),
      expect.any(Object)
    );
  });

  it("skips articles without a url_destination", async () => {
    // arrange
    global.fetch = vi.fn();
    vi.mocked(global.fetch).mockResolvedValue(
      wpResponse([
        { id: 1, slug: "article-1", meta: { url_destination: "paris" } },
        { id: 2, slug: "article-2", meta: { url_destination: "" } },
        { id: 3, slug: "article-3" },
      ] as unknown as WPPost[])
    );
    vi.spyOn(console, "warn").mockImplementation(() => {});
    // act
    const result = await getAllArticleRouteParams();
    // assert
    expect(result).toEqual([
      { destinationSlug: "paris", articleSlug: "article-1" },
    ]);
  });

  it("fetches every page when WordPress reports more than one", async () => {
    // arrange: page 1 says there are 2 pages, page 2 has the rest
    global.fetch = vi.fn();
    vi.mocked(global.fetch)
      .mockResolvedValueOnce(
        wpResponse([{ slug: "article-1", meta: { url_destination: "paris" } }], 2)
      )
      .mockResolvedValueOnce(
        wpResponse([{ slug: "article-2", meta: { url_destination: "berlin" } }], 2)
      );
    // act
    const result = await getAllArticleRouteParams();
    // assert
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("&page=2"),
      expect.any(Object)
    );
    expect(result.map((r) => r.articleSlug)).toEqual(["article-1", "article-2"]);
  });

  it("throws if fetch response is not ok", async () => {
    // arrange
    global.fetch = vi.fn();
    vi.mocked(global.fetch).mockResolvedValue({ ok: false } as Response);
    vi.spyOn(console, "error").mockImplementation(() => {});
    // assert
    await expect(getAllArticleRouteParams()).rejects.toThrow();
  });
});

describe("getAllDestinationRouteParams", () => {
  it("maps WP destinations into route params", async () => {
    // arrange
    global.fetch = vi.fn();
    vi.mocked(global.fetch).mockResolvedValue(
      wpResponse([
        { slug: "destination-1" },
        { slug: "destination-2" },
      ] as WPDestination[])
    );
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
      expect.objectContaining({
        next: {
          revalidate: REVALIDATE.day,
          tags: ["destinations", "destination-routes"],
        },
      })
    );
  });
});
