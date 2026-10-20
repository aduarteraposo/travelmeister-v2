import {
  WPDestination,
  WPDestinationType,
} from "@/app/types/wordpress/destination";
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

function getParentDestinationId(
  destination: WPDestination | Destination
): number | null {
  const parent = destination.acf.parent_destination;
  const ref = Array.isArray(parent) ? parent[0] : parent;
  return ref ? ref.ID : null;
}

export async function getParentDestinations(
  destination: WPDestination | Destination
): Promise<(WPDestination | Destination)[]> {
  let ancestorTree: (WPDestination | Destination)[] = [destination];
  let parentId = getParentDestinationId(destination);

  while (parentId) {
    const directParent = await getDestinationById(parentId);
    ancestorTree = [directParent, ...ancestorTree];
    parentId = getParentDestinationId(directParent);
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

export async function getDestinationTypeBySlug(slug: string) {
  const data = await wordpressFetch<WPDestinationType[]>(
    `/destination_type?slug=${slug}`
  );

  return data;
}

export async function getDestinationsByType(typeId: number) {
  const data = await wordpressFetch<WPDestination[]>(
    `/destination?destination_type=${typeId}&acf_format=standard`
  );

  return data;
}
