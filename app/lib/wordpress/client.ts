import { notFound } from "next/navigation";

export const baseUrl = process.env.WORDPRESS_API_URL;
export const REVALIDATE = {
  day: 60 * 60 * 24,
};

type WordPressFetchOptions = {
  revalidate?: number;
  tags?: string[];
};

export async function wordpressFetch<T>(
  endpoint: string,
  options: WordPressFetchOptions = {}
): Promise<T> {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    next: {
      revalidate: options.revalidate,
      tags: options.tags,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

type PaginatedResponse<T> = {
  items: T[];
  total: number;
};

export async function wordpressFetchWithTotal<T>(
  endpoint: string,
  options: WordPressFetchOptions
): Promise<PaginatedResponse<T>> {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    next: {
      revalidate: options.revalidate,
      tags: options.tags,
    },
  });

  if (!res.ok) {
    notFound();
  }

  const data = (await res.json()) as T[];
  const total = Number(res.headers.get("X-WP-Total") ?? 0);

  return {
    items: data,
    total,
  };
}
