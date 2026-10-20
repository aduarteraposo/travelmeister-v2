import { WPExperience } from "@/app/types/wordpress/experience";
import { REVALIDATE, wordpressFetch } from "./client";

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
