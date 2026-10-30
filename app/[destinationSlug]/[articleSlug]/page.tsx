import Breadcrumbs from "@/app/components/Breadcrumbs";
import FilterContainer from "@/app/components/FilterContainer";
import QuickPicks from "@/app/components/QuickPicks";
import { getAllArticleRouteParams } from "@/app/lib/wordpress/routes";
import Image from "next/image";
import type { Metadata } from "next";
import { getArticlePageData } from "@/app/lib/page-data/article-page";
import { getPostBySlug } from "@/app/lib/wordpress/post";
import { htmlToPlainText, toMetaDescription } from "@/app/lib/metadata";
import { ARTICLE_TYPES } from "@/app/lib/article-config";

type ArticlePageProps = {
  params: Promise<{
    destinationSlug: string;
    articleSlug: string;
  }>;
};

export async function generateStaticParams() {
  return await getAllArticleRouteParams();
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { destinationSlug, articleSlug } = await params;
  // Same request as in the page, so Next.js reuses the response.
  const post = await getPostBySlug(articleSlug);

  return {
    title: post ? htmlToPlainText(post.title.rendered) : undefined,
    description: toMetaDescription(post?.excerpt.rendered),
    // Query params like ?compare= or ?utm_source= point to the same content.
    alternates: { canonical: `/${destinationSlug}/${articleSlug}` },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { destinationSlug: urlDestinationSlug, articleSlug } = await params;
  const { canonicalDestination, article, sections, relatedArticles } =
    await getArticlePageData(urlDestinationSlug, articleSlug);

  const heroImage = article.heroImage;
  const config = ARTICLE_TYPES[article.articleTemplate];
  const neighborhoodLabels = article.sectionsBy !== "neighborhood";

  return (
    <>
      <header className="mb-6 md:mb-8">
        {heroImage && (
          <Image
            loading="eager"
            src={heroImage.url}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
          />
        )}
        <Breadcrumbs article={article} destination={canonicalDestination} />
      </header>
      <div className="mx-auto">
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
        <QuickPicks quickPicks={article.quickPicks} />
        <FilterContainer
          display={{
            neighborhoodLabels,
            grouped: config.grouped,
            showFilters: config.filters,
            showComparison: config.comparison,
            cardSize: config.cardSize,
          }}
          sections={sections}
          relatedArticles={relatedArticles}
          articleDestinationId={canonicalDestination.id}
        />
      </div>
    </>
  );
}
