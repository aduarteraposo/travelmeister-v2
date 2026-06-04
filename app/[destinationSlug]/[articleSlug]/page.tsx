import Breadcrumbs from "@/app/components/Breadcrumbs";
import FilterContainer from "@/app/components/FilterContainer";
import QuickPicks from "@/app/components/QuickPicks";
import { getAllArticleRouteParams } from "@/app/lib/wordpress/routes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticlePageData } from "@/app/lib/page-data/article-page";

type ArticlePageProps = {
  params: Promise<{
    destinationSlug: string;
    articleSlug: string;
  }>;
};

export async function generateStaticParams() {
  return await getAllArticleRouteParams();
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { destinationSlug, articleSlug } = await params;
  const { canonicalDestination, article, heroImage, allPlacesWithSections } =
    await getArticlePageData(destinationSlug, articleSlug);

  return (
    <>
      <header className="mb-6 md:mb-8">
        {heroImage && (
          <Image
            loading="eager"
            src={heroImage.source_url}
            alt={heroImage.alt_text || article.title || ""}
            width={heroImage.media_details.width}
            height={heroImage.media_details.height}
          />
        )}
        <Breadcrumbs article={article} destination={canonicalDestination} />
      </header>
      <div className="mx-auto px-4 md:px-0">
        <div className="mb-20">
          <h1 className="text-center text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>
          <div
            className="md:max-w-3/4 mx-auto text-center"
            dangerouslySetInnerHTML={{ __html: article.excerpt }}
          />
        </div>
        <div
          className="prose mb-16"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
        <QuickPicks quickPicks={article.acf.quick_picks} />
        <FilterContainer places={allPlacesWithSections} />
      </div>
    </>
  );
}
