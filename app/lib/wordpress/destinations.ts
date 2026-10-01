import { wordpressFetch } from "./client";

export async function getDestinationTypeBySlug(slug: string) {
  const data = await wordpressFetch(`/destination_type?=${slug}`);

  return data;
}
