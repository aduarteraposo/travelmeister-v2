import Link from "next/link";
import { CleanArticle } from "../types/app/article";
import { getArticleHref } from "../lib/links";
import ImageWithFallback from "./ImageWithFallback";
import { IMAGE_SIZES } from "../lib/image-sizes";

export default function ArticleTeaser({
  article,
  imageSizes = IMAGE_SIZES.grid4,
}: {
  article: CleanArticle;
  imageSizes?: string;
}) {
  const featuredImage = article.heroImage;

  const url = getArticleHref(article);

  return (
    <Link href={url}>
      <article className="w-full cursor-pointer mb-4 group">
        <ImageWithFallback
          image={featuredImage}
          sizes={imageSizes}
          className="aspect-video object-cover rounded-xl mb-2"
        />

        <h4 className="pl-0.5 font-medium group-hover:underline">
          {article.title}
        </h4>
      </article>
    </Link>
  );
}
