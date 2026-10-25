import Image from "next/image";
import { WPPost } from "../types/wordpress/post";

export default function SmallArticleCard({ post }: { post: WPPost }) {
  return (
    <article className="bg-gray-200 rounded-xl p-4 w-72">
      {post.acf?.hero_image && (
        <div className="aspect-21/9 flex justify-center overflow-hidden mb-2">
          <Image
            className="object-cover h-full"
            src={post.acf.hero_image.url}
            alt={post.acf.hero_image.alt}
            width={post.acf.hero_image.width}
            height={post.acf.hero_image.height}
          />
        </div>
      )}
      <h4>{post.title.rendered}</h4>
    </article>
  );
}
