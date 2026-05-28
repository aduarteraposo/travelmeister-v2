import Image from "next/image";
import { WPPost } from "../types/wordpress";
import { useRouter } from "next/navigation";

export default function ArticleTeaser({ article }: { article: WPPost }) {
  const featuredImage = article._embedded?.["wp:featuredmedia"]?.[0];

  const router = useRouter();

  function goToPost() {
    router.push(
      `/${article.acf.primary_destination.post_name}/${article.slug}`
    );
  }

  return (
    <article className="w-60 cursor-pointer" onClick={goToPost}>
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
