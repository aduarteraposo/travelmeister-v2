import { WPDestination } from "@/app/types/wordpress/destination";
import { REVALIDATE, wordpressFetch } from "./client";
import { Destination } from "@/app/types/app/destination";

export async function getDestinationBySlug(slug: string) {
  const data = await wordpressFetch<WPDestination[]>(
    `/destination?slug=${slug}&acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`destination:${slug}`, "destinations"],
    }
  );

  return data[0];
}

export async function getDestinationById(id: number) {
  const data = await wordpressFetch<WPDestination>(
    `/destination/${id}?acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`destination:${id}`, "destinations"],
    }
  );

  return data;
}

export async function getParentDestinations(
  destination: WPDestination | Destination
): Promise<(WPDestination | Destination)[]> {
  if (!destination.acf.parent_destination) {
    return [destination];
  }

  const parentDestination = await getDestinationById(
    destination.acf.parent_destination.ID
  );

  let ancestorTree = [parentDestination, destination];

  while (ancestorTree[0] && ancestorTree[0].acf.parent_destination) {
    const directParent = await getDestinationById(
      ancestorTree[0].acf.parent_destination?.ID
    );
    ancestorTree = [directParent, ...ancestorTree];
  }

  return ancestorTree;
}

export async function getDestinationsByIds(
  ids: number[]
): Promise<WPDestination[]> {
  if (ids.length === 0) return [];

  const data = await wordpressFetch<WPDestination[]>(
    `/destination?include=${ids.toString()}&acf_format=standard`,
    {
      revalidate: REVALIDATE.day,
      tags: [`destinations:ids:${ids.join(",")}`, "destinations"],
    }
  );

  return data;
}
