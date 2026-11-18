import { WPDestination } from "@/app/types/wordpress/destination";
import { REVALIDATE, wordpressFetchAll } from "./client";
import { WPPost } from "@/app/types/wordpress/post";
import { WPPlace } from "@/app/types/wordpress/place";
import { isPlaceType } from "@/app/types/app/place";

type DestinationRoutParams = {
  destinationSlug: string;
};

export async function getAllDestinationRouteParams(): Promise<
  DestinationRoutParams[]
> {
  const destinations = await wordpressFetchAll<WPDestination>(
    "/destination?per_page=100&_fields=slug",
    {
      revalidate: REVALIDATE.day,
      tags: ["destinations", "destination-routes"],
    }
  );

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

type HotelRouteParams = {
  destinationSlug: string;
  hotelSlug: string;
};

export async function getAllHotelRouteParams(): Promise<HotelRouteParams[]> {
  const places = await wordpressFetchAll<WPPlace>(
    "/place?_fields=id,slug,meta.url_destination,acf.place_type&per_page=100",
    {
      revalidate: REVALIDATE.day,
      tags: ["places", "place-routes"],
    }
  );

  const routeParams: HotelRouteParams[] = [];

  for (const place of places) {
    const destinationSlug = place.meta?.url_destination
      ? place.meta.url_destination
      : "";

    if (!destinationSlug) {
      console.warn(
        `Skipping place "${place.slug}" (id: ${place.id}): missing or invalid url_destination.`
      );
      continue;
    }

    if (
      isPlaceType(place.acf?.place_type?.slug) &&
      place.acf?.place_type?.slug !== "hotel"
    ) {
      console.warn(
        `Skipping place "${place.slug}" (id: ${place.id}): missing or invalid place_type.`
      );
      continue;
    }

    routeParams.push({ destinationSlug, hotelSlug: place.slug });
  }

  return routeParams;
}
