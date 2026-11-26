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
    `/experience?destination=${destinationId}&acf_format=standard&per_page=100&_fields=id,slug,title,meta.url_destination,acf`,
    {
      revalidate: REVALIDATE.day,
      tags: ["experiences", `experiences:destination:${destinationId}`],
    }
  );
}

export async function getExperienceBySlug(slug: string): Promise<WPExperience> {
  const data = await wordpressFetch<WPExperience[]>(
    `/experience?slug=${slug}&acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`experience:slug:${slug}`, "experiences"],
    }
  );

  return data[0];
}
