import Image from "next/image";
import Link from "next/link";
import { CleanArticle } from "../types/app/article";
import { getArticleHref } from "../lib/links";
import ImageWithFallback from "./ImageWithFallback";

export default function ArticleTeaser({ article }: { article: CleanArticle }) {
  const featuredImage = article.heroImage;

  const url = getArticleHref(article);

  return (
    <Link href={url}>
      <article className="w-full cursor-pointer mb-4 group">
        <ImageWithFallback
          image={featuredImage}
          className="aspect-video object-cover rounded-xl mb-2"
        />

        <h4 className="font-medium group-hover:underline">{article.title}</h4>
      </article>
    </Link>
  );
}
