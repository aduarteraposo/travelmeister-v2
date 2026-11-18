import { PlaceType, WPPlace } from "@/app/types/wordpress/place";
import { REVALIDATE, wordpressFetch, wordpressFetchAll } from "./client";

export async function getPlacesByIds(ids: number[]): Promise<WPPlace[]> {
  if (ids.length === 0) return [];

  const data = await wordpressFetch<WPPlace[]>(
    `/place?include=${ids.toString()}&acf_format=standard&per_page=${
      ids.length
    }`,
    {
      revalidate: REVALIDATE.day,
      tags: [`places:ids:${ids.join(",")}`, "places"],
    }
  );

  return data;
}

export async function getPlaceBySlug(slug: string): Promise<WPPlace> {
  const data = await wordpressFetch<WPPlace[]>(
    `/place?slug=${slug}&acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`places:slug:${slug}`, "places"],
    }
  );

  return data[0];
}

export function getPlaceSummariesByDestination(
  destinationId: number
): Promise<WPPlace[]> {
  return wordpressFetchAll<WPPlace>(
    `/place?destination=${destinationId}&acf_format=standard&per_page=100&_fields=id,slug,title,meta.url_destination,acf.primary_destination,acf.place_type,acf.place_subtype,acf.images,acf.map_link,acf.filters,acf.stayed_here`,
    {
      revalidate: REVALIDATE.day,
      tags: ["places", `places:destination:${destinationId}`],
    }
  );
}
