import { WPExperience } from "@/app/types/wordpress/experience";
import { REVALIDATE, wordpressFetch, wordpressFetchAll } from "./client";

export async function getExperiencesByIds(
  ids: number[]
): Promise<WPExperience[]> {
  if (ids.length === 0) return [];

  const data = await wordpressFetch<WPExperience[]>(
    `/experience?include=${ids.toString()}&acf_format=standard&per_page=${
      ids.length
    }`,
    {
      revalidate: REVALIDATE.day,
      tags: [`experience:ids:${ids.join(",")}`, "experiences"],
    }
  );

  return data;
}

export function getExperienceSummariesByDestination(
  destinationId: number
): Promise<WPExperience[]> {
  return wordpressFetchAll<WPExperience>(
    `/experience?destination=${destinationId}&acf_format=standard&per_page=100&_fields=id,slug,title,meta.url_destination,acf.primary_destination,acf.experience_type,acf.images,acf.filters,acf.done_it,acf.cta_links`,
    {
      revalidate: REVALIDATE.day,
      tags: ["experiences", `experiences:destination:${destinationId}`],
    }
  );
}
