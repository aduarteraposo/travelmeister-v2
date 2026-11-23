import { WPHomepage } from "@/app/types/wordpress/pages";
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
