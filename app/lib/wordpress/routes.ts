import { WPDestination } from "@/app/types/wordpress/destination";
import { REVALIDATE, wordpressFetch } from "./client";
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
  const articles = await wordpressFetch<WPPost[]>(
    "/posts?acf_format=standard",
    {
      revalidate: REVALIDATE.day,
      tags: ["articles", "article-routes"],
    }
  );

  const routeParams = articles.map((article) => ({
    destinationSlug: article.acf.primary_destination.post_name,
    articleSlug: article.slug,
  }));

  return routeParams;
}
