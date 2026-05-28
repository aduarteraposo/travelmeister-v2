import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ArticleLane from "./ArticleLane";
import { WPPost } from "../types/wordpress";
import "@testing-library/jest-dom";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

function renderWithQueryClient(ui: React.ReactNode) {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("ArticleLane", () => {
  it("renders both manual articles and fetched articles", () => {
    // arrange
    const manualArticles = [
      {
        slug: "manual_article",
        title: { rendered: "Manual Article" },
      } as WPPost,
    ];
    const fetchedArticles = [
      {
        slug: "fetched_article",
        title: { rendered: "Fetched Article" },
      } as WPPost,
    ];

    // act
    renderWithQueryClient(
      <ArticleLane
        title="Test-Lane"
        categoryId={1}
        destinationId={2}
        manualArticleIds={[1, 2, 3]}
        perPage={5}
        initialFetchedArticles={fetchedArticles}
        manualArticles={manualArticles}
        initialTotal={10}
      />
    );

    // assert
    expect(screen.getByText("Manual Article")).toBeInTheDocument();
    expect(screen.getByText("Fetched Article")).toBeInTheDocument();
  });
});

describe("ArticleLane", () => {
  it("renders the load more button when more articles are available", () => {
    // arrange
    const manualArticles = [
      { slug: "manual_article_1", title: { rendered: "Manual Article 1" } },
      { slug: "manual_article_2", title: { rendered: "Manual Article 2" } },
    ] as WPPost[];
    const fetchedArticles = [
      { slug: "fetched_article_1", title: { rendered: "Fetched Article 1" } },
      { slug: "fetched_article_2", title: { rendered: "Fetched Article 2" } },
      { slug: "fetched_article_3", title: { rendered: "Fetched Article 3" } },
    ] as WPPost[];

    // act
    renderWithQueryClient(
      <ArticleLane
        title="Test-Lane"
        categoryId={1}
        destinationId={2}
        manualArticleIds={[1, 2, 3]}
        perPage={5}
        initialFetchedArticles={fetchedArticles}
        manualArticles={manualArticles}
        initialTotal={10}
      />
    );

    // assert
    expect(
      screen.getByRole("button", { name: /load more/i })
    ).toBeInTheDocument();
  });
});

describe("ArticleLane", () => {
  it("does not render the load more button when no more articles are available", () => {
    // arrange
    const manualArticles = [
      { slug: "manual_article_1", title: { rendered: "Manual Article 1" } },
      { slug: "manual_article_2", title: { rendered: "Manual Article 2" } },
    ] as WPPost[];
    const fetchedArticles = [
      { slug: "fetched_article_1", title: { rendered: "Fetched Article 1" } },
      { slug: "fetched_article_2", title: { rendered: "Fetched Article 2" } },
      { slug: "fetched_article_3", title: { rendered: "Fetched Article 3" } },
    ] as WPPost[];

    // act
    renderWithQueryClient(
      <ArticleLane
        title="Test-Lane"
        categoryId={1}
        destinationId={2}
        manualArticleIds={[1, 2, 3]}
        perPage={5}
        initialFetchedArticles={fetchedArticles}
        manualArticles={manualArticles}
        initialTotal={3}
      />
    );

    // assert
    expect(
      screen.queryByRole("button", { name: /load more/i })
    ).not.toBeInTheDocument();
  });
});
