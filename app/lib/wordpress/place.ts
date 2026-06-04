import { WPPlace } from "@/app/types/wordpress/place";
import { REVALIDATE, wordpressFetch } from "./client";

export async function getPlacesByIds(ids: number[]): Promise<WPPlace[]> {
  if (ids.length === 0) return [];

  const data = await wordpressFetch<WPPlace[]>(
    `/place?include=${ids.toString()}&acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`places:ids:${ids.join(",")}`, "places"],
    }
  );

  return data;
}
