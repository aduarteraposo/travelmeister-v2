import Image from "next/image";
import { WPPost } from "../types/wordpress";

export default function ArticleTeaser({ article }: { article: WPPost }) {
  return (
    <article className="w-60">
      <div className="aspect-video flex justify-center overflow-hidden mb-2">
        <Image
          className="h-full object-cover"
          src={article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""}
          alt={
            article._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
            article.title.rendered
          }
          width={
            article._embedded["wp:featuredmedia"]?.[0]?.media_details.width
          }
          height={
            article._embedded["wp:featuredmedia"]?.[0]?.media_details.height
          }
        />
      </div>

      <h4 className="font-medium">{article.title.rendered}</h4>
    </article>
  );
}
