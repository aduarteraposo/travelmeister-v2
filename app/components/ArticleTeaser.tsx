import Image from "next/image";
import { WPPost } from "../types/wordpress/post";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ArticleTeaser({ article }: { article: WPPost }) {
  const featuredImage = article._embedded?.["wp:featuredmedia"]?.[0];

  const router = useRouter();

  const url = `/${article.acf.primary_destination.post_name}/${article.slug}`;

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
              src={featuredImage.source_url || ""}
              alt={featuredImage.alt_text || article.title.rendered}
              width={featuredImage.media_details.width}
              height={featuredImage.media_details.height}
            />
          ) : (
            <div className="bg-gray-100 aspect-video flex justify-center items-center text-sm text-gray-500 transition-transform duration-100 ease-in-out group-hover:scale-105">
              Image not available
            </div>
          )}
        </div>

        <h4 className="font-medium group-hover:font-semibold">
          {article.title.rendered}
        </h4>
      </article>
    </Link>
  );
}
