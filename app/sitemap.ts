import { MetadataRoute } from "next";
import { getArticleHref, getDestinationHref, getHotelHref } from "./lib/links";
import {
  getAllArticleRouteParams,
  getAllDestinationRouteParams,
  getAllHotelRouteParams,
  getHomePageRouteParams,
} from "./lib/wordpress/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, destinations, hotels, homepage] = await Promise.all([
    getAllArticleRouteParams(),
    getAllDestinationRouteParams(),
    getAllHotelRouteParams(),
    getHomePageRouteParams(),
  ]);
  const baseUrl = process.env.SITE_URL;

  const sitemapArticles = articles.map((a) => ({
    url: `${baseUrl}${getArticleHref({
      slug: a.articleSlug,
      urlDestination: a.destinationSlug,
    })}`,
    lastModified: `${a.lastModified}Z`,
  }));

  const sitemapDestinations = destinations.map((d) => ({
    url: `${baseUrl}${getDestinationHref({
      slug: d.destinationSlug,
    })}`,
    lastModified: `${d.lastModified}Z`,
  }));

  const sitemapHotels = hotels.map((h) => ({
    url: `${baseUrl}${getHotelHref({
      slug: h.hotelSlug,
      urlDestination: h.destinationSlug,
    })}`,
    lastModified: `${h.lastModified}Z`,
  }));

  console.log([
    ...sitemapArticles,
    ...sitemapDestinations,
    ...sitemapHotels,
    homepage,
  ]);

  return [
    ...sitemapArticles,
    ...sitemapDestinations,
    ...sitemapHotels,
    homepage,
  ];
}
