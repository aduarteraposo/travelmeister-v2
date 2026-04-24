import Image from "next/image";
import { WPPost } from "../types/wordpress";

export default function SmallArticleCard({ post }: { post: WPPost }) {
  console.log("Full Post: ", post);
  return (
    <article className="bg-gray-200 rounded-xl p-4 w-72">
      {post._embedded["wp:featuredmedia"] && (
        <div className="aspect-21/9 flex justify-center overflow-hidden mb-2">
          <Image
            className="object-cover h-full"
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post._embedded["wp:featuredmedia"][0].alt_text}
            width={post._embedded["wp:featuredmedia"][0].media_details.width}
            height={post._embedded["wp:featuredmedia"][0].media_details.height}
          />
        </div>
      )}
      <h4>{post.title.rendered}</h4>
    </article>
  );
}
