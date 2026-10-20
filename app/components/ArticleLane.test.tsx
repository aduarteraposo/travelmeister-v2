import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ArticleLane from "./ArticleLane";
import "@testing-library/jest-dom";
import { CleanArticle } from "../types/app/article";

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
        slug: "manual-article",
        title: "Manual Article",
        destination: { post_name: "test-destination" },
      } as CleanArticle,
    ];
    const fetchedArticles = [
      {
        slug: "fetched-article",
        title: "Fetched Article",
        destination: { post_name: "test-destination" },
      } as CleanArticle,
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
      {
        slug: "manual-article-1",
        title: "Manual Article 1",
        destination: { post_name: "test-destination" },
      },
      {
        slug: "manual-article-2",
        title: "Manual Article 2",
        destination: { post_name: "test-destination" },
      },
    ] as CleanArticle[];
    const fetchedArticles = [
      {
        slug: "fetched-article-1",
        title: "fetched Article 1",
        destination: { post_name: "test-destination" },
      },
      {
        slug: "fetched-article-2",
        title: "fetched Article 2",
        destination: { post_name: "test-destination" },
      },
      {
        slug: "fetched-article-3",
        title: "fetched Article 3",
        destination: { post_name: "test-destination" },
      },
    ] as CleanArticle[];

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
      {
        slug: "manual-article-1",
        title: "Manual Article 1",
        destination: { post_name: "test-destination" },
      },
      {
        slug: "manual-article-2",
        title: "Manual Article 2",
        destination: { post_name: "test-destination" },
      },
    ] as CleanArticle[];
    const fetchedArticles = [
      {
        slug: "fetched-article-1",
        title: "fetched Article 1",
        destination: { post_name: "test-destination" },
      },
      {
        slug: "fetched-article-2",
        title: "fetched Article 2",
        destination: { post_name: "test-destination" },
      },
      {
        slug: "fetched-article-3",
        title: "fetched Article 3",
        destination: { post_name: "test-destination" },
      },
    ] as CleanArticle[];

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
