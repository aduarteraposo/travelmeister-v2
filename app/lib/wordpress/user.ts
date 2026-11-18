import { REVALIDATE, wordpressFetch } from "./client";

export async function getUserById<T>(id: number): Promise<T> {
  const endpoint = `/users/${id}?acf_standard`;

  const data = await wordpressFetch<T>(endpoint, {
    revalidate: REVALIDATE.day,
    tags: [`user:${id}`, "users"],
    throwNotFound: false,
  });

  return data;
}
