import Image from "next/image";
import { WPPost } from "../types/wordpress";

export default function ArticleTeaser({ article }: { article: WPPost }) {
  const featuredImage = article._embedded?.["wp:featuredmedia"]?.[0];

  return (
    <article className="w-60">
      <div className="aspect-video flex justify-center overflow-hidden mb-2">
        {featuredImage ? (
          <Image
            className="h-full object-cover"
            src={featuredImage.source_url || ""}
            alt={featuredImage.alt_text || article.title.rendered}
            width={featuredImage.media_details.width}
            height={featuredImage.media_details.height}
          />
        ) : (
          <div className="bg-gray-100 aspect-video flex justify-center items-center text-sm text-gray-500">
            Image not available
          </div>
        )}
      </div>

      <h4 className="font-medium">{article.title.rendered}</h4>
    </article>
  );
}
