import { notFound } from "next/navigation";
import {
  WPPost,
  Destination,
  Place,
  NormalizedDestination,
} from "../types/wordpress";

export const baseUrl = process.env.WORDPRESS_API_URL;

export async function getDestinationBySlug(slug: string) {
  const data = await wordpressFetch<Destination[]>(
    `/destination?slug=${slug}&acf_format=standard`
  );

  return data[0];
}

export async function getDestinationById(id: number) {
  const data = await wordpressFetch<Destination>(`/destination/${id}`);

  return data;
}

export async function getPostsByDestinationId(id: number): Promise<WPPost[]> {
  const data = await wordpressFetch<WPPost[]>(`/posts?destination=${id}`);

  return data;
}

export async function getArticleBySlug(slug: string): Promise<WPPost> {
  const data = await wordpressFetch<WPPost[]>(
    `/posts?slug=${slug}&_embed&acf_format=standard`
  );

  return data[0];
}

async function wordpressFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${baseUrl}${endpoint}`);

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  return data;
}

export async function getParentDestinations(
  primaryDestination: Destination | NormalizedDestination
): Promise<(Destination | NormalizedDestination)[]> {
  if (!primaryDestination.acf.parent_destination) {
    return [primaryDestination];
  }

  const parentDestination = await getDestinationById(
    primaryDestination.acf.parent_destination.ID
  );

  let ancestorTree = [parentDestination, primaryDestination];

  while (ancestorTree[0] && ancestorTree[0].acf.parent_destination) {
    const directParent = await getDestinationById(
      ancestorTree[0].acf.parent_destination?.ID
    );
    ancestorTree = [directParent, ...ancestorTree];
  }

  return ancestorTree;
}

export async function getPlacesByIds(ids: number[]): Promise<Place[]> {
  const data = await wordpressFetch<Place[]>(
    `/place?include=${ids.toString()}&acf_format=standard`
  );

  return data;
}

export async function getDestinationsByIds(
  ids: number[]
): Promise<Destination[]> {
  const data = await wordpressFetch<Destination[]>(
    `/destination?include=${ids.toString()}&acf_format=standard`
  );

  return data;
}

export async function getArticlesByIds(ids: number[]): Promise<WPPost[]> {
  const data = await wordpressFetch<WPPost[]>(
    `/posts?include=${ids.toString()}&acf_format=standard&_embed`
  );

  return data;
}
