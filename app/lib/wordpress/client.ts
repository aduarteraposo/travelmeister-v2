import { notFound } from "next/navigation";

export const baseUrl = process.env.WORDPRESS_API_URL;
export const REVALIDATE = {
  day: 60 * 60 * 24,
};

type WordPressFetchOptions = {
  revalidate?: number;
  tags?: string[];
  throwNotFound?: boolean;
};

export async function wordpressFetch<T>(
  endpoint: string,
  { revalidate, tags, throwNotFound = true }: WordPressFetchOptions = {}
): Promise<T> {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    next: {
      revalidate,
      tags,
    },
  });

  if (!res.ok) {
    console.error("Failed on this endpoint: ", endpoint);

    if (throwNotFound) notFound();
    throw new Error(`WordPress ${res.status} on ${endpoint}`);
  }

  return res.json();
}

type PaginatedResponse<T> = {
  items: T[];
  total: number;
};

export async function wordpressFetchWithTotal<T>(
  endpoint: string,
  { revalidate, tags, throwNotFound = true }: WordPressFetchOptions = {}
): Promise<PaginatedResponse<T>> {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    next: {
      revalidate,
      tags,
    },
  });

  if (!res.ok) {
    console.error("Failed on this endpoint: ", endpoint);
    if (throwNotFound) notFound();
    throw new Error(`WordPress ${res.status} on ${endpoint}`);
  }

  const data = (await res.json()) as T[];
  const total = Number(res.headers.get("X-WP-Total") ?? 0);

  return {
    items: data,
    total,
  };
}
