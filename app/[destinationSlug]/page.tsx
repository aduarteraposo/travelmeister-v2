import {
  getDestinationBySlug,
  getPostsByDestinationId,
} from "@/app/lib/wordpress";
import type { WPPost } from "../types/wordpress";
import Link from "next/link";

type DestinationProps = {
  params: Promise<{
    destinationSlug: string;
  }>;
};

export default async function DestinationPage({ params }: DestinationProps) {
  const { destinationSlug } = await params;
  const destination = await getDestinationBySlug(destinationSlug);
  const posts: WPPost[] = await getPostsByDestinationId(destination.id);

  return (
    <>
      <h1 className="text-3xl mb-8">{destination.name}</h1>
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/${destinationSlug}/${post.slug}`}>
                {post.title.rendered}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
