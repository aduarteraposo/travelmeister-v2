import { WPHomepage, WPPage } from "@/app/types/wordpress/pages";
import { REVALIDATE, wordpressFetch } from "./client";

export async function getHomepage(): Promise<WPHomepage> {
  const data = await wordpressFetch<WPHomepage[]>(
    "/pages?slug=home&_fields=acf&acf_format=standard",
    {
      revalidate: REVALIDATE.day,
      tags: ["pages", "pages:homepage"],
    }
  );

  return data[0];
}

// Content pages (about, privacy, legal-notice, cookies, how-we-earn-money).
// Returns null when the page doesn't exist, so the route can show a 404.
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const data = await wordpressFetch<WPPage[]>(
    `/pages?slug=${slug}&_fields=id,slug,modified_gmt,title,content`,
    {
      revalidate: REVALIDATE.day,
      tags: ["pages", `pages:${slug}`],
    }
  );

  return data[0] ?? null;
}
