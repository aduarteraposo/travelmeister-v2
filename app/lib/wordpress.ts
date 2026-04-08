import { notFound } from "next/navigation";
import { WPPost, WPDestination } from "../types/wordpress";

export const baseUrl = process.env.WORDPRESS_API_URL;

export async function getDestinationBySlug(slug: string) {
    const data = await wordpressFetch<WPDestination[]>(`/destination?slug=${slug}&_embed`);

    return data[0];
}

export async function getDestinationById(id: number) {
    const data = await wordpressFetch<WPDestination>(`/destination/${id}?_embed`);

    return data;
}

export async function getPostsByDestinationId(id: number): Promise<WPPost[]> {
    const data = await wordpressFetch<WPPost[]>(`/posts?destination=${id}&_embed`);

    return data;
}

export async function getArticleBySlug(slug: string): Promise<WPPost> {
    const data = await wordpressFetch<WPPost[]>(`/posts?slug=${slug}&_embed&acf_format=standard`);

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

export async function getParentDestinations(primaryDestinationSlug: string): Promise<WPDestination[]> {
    const primaryDestination = await getDestinationBySlug(primaryDestinationSlug);

    let ancestorTree = [primaryDestination];

    while (ancestorTree[0].parent) {
        const directParent = await getDestinationById(ancestorTree[0].parent);
        ancestorTree = [directParent, ...ancestorTree];
    }

    return ancestorTree;
}