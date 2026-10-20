import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CleanArticle } from "../types/app/article";

export default function ArticleTeaser({ article }: { article: CleanArticle }) {
  const featuredImage = article.heroImage;

  const router = useRouter();

  console.log(article.destination);

  const url = `/${article.destination?.post_name}/${article.slug}`;

  function goToPost() {
    router.push(url);
  }

  return (
    <Link href={url}>
      <article className="w-60 cursor-pointer mb-4 group" onClick={goToPost}>
        <div className="aspect-video flex justify-center overflow-hidden mb-2">
          {featuredImage ? (
            <Image
              className="h-full object-cover transition-transform duration-100 ease-in-out group-hover:scale-105"
              src={featuredImage.url || ""}
              alt={featuredImage.alt || article.title}
              width={featuredImage.width}
              height={featuredImage.height}
            />
          ) : (
            <div className="bg-gray-100 aspect-video flex justify-center items-center text-sm text-gray-500 transition-transform duration-100 ease-in-out group-hover:scale-105">
              Image not available
            </div>
          )}
        </div>

        <h4 className="font-medium group-hover:font-semibold">
          {article.title}
        </h4>
      </article>
    </Link>
  );
}
