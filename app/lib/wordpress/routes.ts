import { WPDestination } from "@/app/types/wordpress/destination";
import { REVALIDATE, wordpressFetch, wordpressFetchAll } from "./client";
import { WPPost } from "@/app/types/wordpress/post";
import { WPPlace } from "@/app/types/wordpress/place";
import { WPHomepage } from "@/app/types/wordpress/pages";

type DestinationRouteParams = {
  destinationSlug: string;
  lastModified: string;
};

export async function getAllDestinationRouteParams(): Promise<
  DestinationRouteParams[]
> {
  const destinations = await wordpressFetchAll<WPDestination>(
    "/destination?per_page=100&_fields=id,slug,modified_gmt,acf.destination_type&acf_format=standard",
    {
      revalidate: REVALIDATE.day,
      tags: ["destinations", "destination-routes"],
    }
  );

  const destinationRouteParams: DestinationRouteParams[] = [];

  for (const dest of destinations) {
    if (
      dest.acf.destination_type &&
      dest.acf.destination_type.slug === "neighborhood"
    ) {
      console.warn(
        `Skipping destination "${dest.slug}" (id: ${dest.id}): destination is neighborhood`
      );
      continue;
    }

    destinationRouteParams.push({
      destinationSlug: dest.slug,
      lastModified: dest.modified_gmt,
    });
  }

  return destinationRouteParams;
}

type ArticleRouteParams = {
  destinationSlug: string;
  articleSlug: string;
  lastModified: string;
};

export async function getAllArticleRouteParams(): Promise<
  ArticleRouteParams[]
> {
  const articles = await wordpressFetchAll<WPPost>(
    "/posts?_fields=slug,meta.url_destination,modified_gmt&per_page=100&acf_format=standard",
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

    routeParams.push({
      destinationSlug,
      articleSlug: article.slug,
      lastModified: article.modified_gmt,
    });
  }

  return routeParams;
}

type HotelRouteParams = {
  id: number;
  destinationSlug: string;
  hotelSlug: string;
  lastModified: string;
};

export async function getAllHotelRouteParams(): Promise<HotelRouteParams[]> {
  const places = await wordpressFetchAll<WPPlace>(
    "/place?_fields=id,slug,meta.url_destination,acf.place_type,acf.verdict,modified_gmt&per_page=100&acf_format=standard",
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

    if (place.acf?.place_type?.slug !== "hotel") {
      console.warn(
        `Skipping place "${place.slug}" (id: ${place.id}): missing or invalid place_type`
      );
      continue;
    }

    if (!place.acf.verdict) {
      console.warn(
        `Skipping place "${place.slug}" (id: ${place.id}): hotel hass no verdict (no page)`
      );
      continue;
    }

    routeParams.push({
      id: place.id,
      destinationSlug,
      hotelSlug: place.slug,
      lastModified: place.modified_gmt,
    });
  }

  return routeParams;
}

export async function getHomePageRouteParams() {
  const data = await wordpressFetch<WPHomepage[]>(
    "/pages?slug=home&_fields=id,slug,modified_gmt",
    {
      revalidate: REVALIDATE.day,
      tags: ["pages", "pages:homepage"],
    }
  );

  return {
    url: `${process.env.SITE_URL}/`,
    lastModified: `${data[0].modified_gmt}Z`,
  };
}
