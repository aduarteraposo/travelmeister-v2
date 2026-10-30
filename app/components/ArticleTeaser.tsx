import Image from "next/image";
import Link from "next/link";
import { CleanArticle } from "../types/app/article";
import { getArticleHref } from "../lib/links";

export default function ArticleTeaser({ article }: { article: CleanArticle }) {
  const featuredImage = article.heroImage;

  const url = getArticleHref(article);

  return (
    <Link href={url}>
      <article className="w-60 cursor-pointer mb-4 group">
        <div className="aspect-video flex justify-center overflow-hidden mb-2">
          {featuredImage ? (
            <Image
              className="h-full object-cover transition-transform duration-100 ease-in-out"
              src={featuredImage.url || ""}
              alt={featuredImage.alt || article.title}
              width={featuredImage.width}
              height={featuredImage.height}
            />
          ) : (
            <div className="bg-gray-100 aspect-video flex justify-center items-center text-sm text-gray-500 transition-transform duration-100 ease-in-out">
              Image not available
            </div>
          )}
        </div>

        <h4 className="font-medium group-hover:underline">{article.title}</h4>
      </article>
    </Link>
  );
}
