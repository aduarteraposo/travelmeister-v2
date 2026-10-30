import { WPDestination } from "@/app/types/wordpress/destination";
import { REVALIDATE, wordpressFetch, wordpressFetchAll } from "./client";
import { WPPost } from "@/app/types/wordpress/post";

type DestinationRoutParams = {
  destinationSlug: string;
};

export async function getAllDestinationRouteParams(): Promise<
  DestinationRoutParams[]
> {
  const destinations = await wordpressFetch<WPDestination[]>("/destination", {
    revalidate: REVALIDATE.day,
    tags: ["destinations", "destination-routes"],
  });

  const destinationRouteParams = destinations.map((dest) => ({
    destinationSlug: dest.slug,
  }));

  return destinationRouteParams;
}

type ArticleRouteParams = {
  destinationSlug: string;
  articleSlug: string;
};

export async function getAllArticleRouteParams(): Promise<
  ArticleRouteParams[]
> {
  const articles = await wordpressFetchAll<WPPost>(
    "/posts?_fields=slug,meta.url_destination&per_page=100",
    {
      revalidate: REVALIDATE.day,
      tags: ["articles", "article-routes"],
    }
  );

  const routeParams: ArticleRouteParams[] = [];

  for (const article of articles) {
    const destinationSlug = article.meta?.url_destination
      ? article.meta.url_destination
      : "";

    if (!destinationSlug) {
      console.warn(
        `Skipping article "${article.slug}" (id: ${article.id}): missing or invalid url_destination.`
      );
      continue;
    }

    routeParams.push({ destinationSlug, articleSlug: article.slug });
  }

  return routeParams;
}
