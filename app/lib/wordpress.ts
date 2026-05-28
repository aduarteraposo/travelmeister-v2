import { notFound } from "next/navigation";
import {
  WPPost,
  Destination,
  Place,
  NormalizedDestination,
  PaginatedArticlesResponse,
} from "../types/wordpress";

export const baseUrl = process.env.WORDPRESS_API_URL;
export const REVALIDATE = {
  day: 60 * 60 * 24,
};

type WordPressFetchOptions = {
  revalidate?: number;
  tags?: string[];
};

async function wordpressFetch<T>(
  endpoint: string,
  options: WordPressFetchOptions = {}
): Promise<T> {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    next: {
      revalidate: options.revalidate,
      tags: options.tags,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export async function getDestinationBySlug(slug: string) {
  const data = await wordpressFetch<Destination[]>(
    `/destination?slug=${slug}&acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`destination:${slug}`, "destinations"],
    }
  );

  return data[0];
}

export async function getDestinationById(id: number) {
  const data = await wordpressFetch<Destination>(
    `/destination/${id}?acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`destination:${id}`, "destinations"],
    }
  );

  return data;
}

export async function getPostsByDestinationId(id: number): Promise<WPPost[]> {
  const data = await wordpressFetch<WPPost[]>(`/posts?destination=${id}`);

  return data;
}

export async function getArticleBySlug(slug: string): Promise<WPPost> {
  const data = await wordpressFetch<WPPost[]>(
    `/posts?slug=${slug}&_embed&acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`article:${slug}`, "articles"],
    }
  );

  return data[0];
}

type PaginatedResponse<T> = {
  items: T[];
  total: number;
};

async function wordpressFetchWithTotal<T>(
  endpoint: string,
  options: WordPressFetchOptions
): Promise<PaginatedResponse<T>> {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    next: {
      revalidate: options.revalidate,
      tags: options.tags,
    },
  });

  if (!res.ok) {
    notFound();
  }

  const data = (await res.json()) as T[];
  const total = Number(res.headers.get("X-WP-Total") ?? 0);

  return {
    items: data,
    total,
  };
}

export async function getParentDestinations(
  destination: Destination | NormalizedDestination
): Promise<(Destination | NormalizedDestination)[]> {
  if (!destination.acf.parent_destination) {
    return [destination];
  }

  const parentDestination = await getDestinationById(
    destination.acf.parent_destination.ID
  );

  let ancestorTree = [parentDestination, destination];

  while (ancestorTree[0] && ancestorTree[0].acf.parent_destination) {
    const directParent = await getDestinationById(
      ancestorTree[0].acf.parent_destination?.ID
    );
    ancestorTree = [directParent, ...ancestorTree];
  }

  return ancestorTree;
}

export async function getPlacesByIds(ids: number[]): Promise<Place[]> {
  const data = await wordpressFetch<Place[]>(
    `/place?include=${ids.toString()}&acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`places:ids:${ids.join(",")}`, "places"],
    }
  );

  return data;
}

export async function getDestinationsByIds(
  ids: number[]
): Promise<Destination[]> {
  const data = await wordpressFetch<Destination[]>(
    `/destination?include=${ids.toString()}&acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`destinations:ids:${ids.join(",")}`, "destinations"],
    }
  );

  return data;
}

export async function getArticlesByIds(ids: number[]): Promise<WPPost[]> {
  const endpoint = `/posts?include=${ids.toString()}&acf_format=standard&_embed`;

  const data = await wordpressFetch<WPPost[]>(endpoint, {
    revalidate: REVALIDATE.day,
    tags: [`articles:ids:${ids.join(",")}`, "articles"],
  });

  return data;
}

export async function getArticlesByCategoryAndDestination(
  categoryId: number,
  destinationId: number,
  perPage: number,
  exclude: string,
  offset: number
): Promise<PaginatedArticlesResponse> {
  const endpoint = `/posts?destination=${destinationId}&article_category=${categoryId}&per_page=${perPage}&offset=${offset}${exclude}&_embed&acf_format=standard`;

  const response = await wordpressFetchWithTotal<WPPost>(endpoint, {
    revalidate: REVALIDATE.day,
    tags: [
      "articles",
      `articles:destination:${destinationId}`,
      `articles:category:${categoryId}`,
      `articles:destination:${destinationId}:category:${categoryId}`,
    ],
  });

  return {
    articles: response.items,
    total: response.total,
  };
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

type DestinationRoutParams = {
  destinationSlug: string;
};

export async function getAllDestinationRouteParams(): Promise<
  DestinationRoutParams[]
> {
  const destinations = await wordpressFetch<Destination[]>("/destination", {
    revalidate: REVALIDATE.day,
    tags: ["destinations", "destination-routes"],
  });

  const destinationRouteParams = destinations.map((dest) => ({
    destinationSlug: dest.slug,
  }));

  return destinationRouteParams;
}
