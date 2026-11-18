import { describe, expect, it, vi } from "vitest";
import { wordpressFetchAll } from "./client";

// same helper as in routes.test.ts (later: move it to a shared test-utils file)
function wpResponse(body: unknown, totalPages = 1): Response {
  return {
    ok: true,
    json: async () => body,
    headers: new Headers({ "X-WP-TotalPages": String(totalPages) }),
  } as Response;
}

describe("wordpressFetchAll", () => {
  it("uses ?page= for page 2 when the endpoint has no query string", async () => {
    // arrange: 2 pages
    global.fetch = vi.fn();
    vi.mocked(global.fetch)
      .mockResolvedValueOnce(wpResponse([{ id: 1 }], 2))
      .mockResolvedValueOnce(wpResponse([{ id: 2 }], 2));

    // act
    const result = await wordpressFetchAll("/destination");

    // assert: both pages merged, and the 2nd call used "?page=2"
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("/destination?page=2"),
      expect.any(Object)
    );
  });

  it("uses &page= for page 2 when the endpoint has already a query string", async () => {
    // arrange: 2 pages
    global.fetch = vi.fn();
    vi.mocked(global.fetch)
      .mockResolvedValueOnce(wpResponse([{ id: 1 }], 2))
      .mockResolvedValueOnce(wpResponse([{ id: 2 }], 2));

    // act
    const result = await wordpressFetchAll("/destination?per_page=100");

    // assert: both pages merged, and the 2nd call used "&page=2"
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("/destination?per_page=100&page=2"),
      expect.any(Object)
    );
  });
});
