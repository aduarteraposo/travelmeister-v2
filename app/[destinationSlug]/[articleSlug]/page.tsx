import Breadcrumbs from "@/app/components/Breadcrumbs";
import { IMAGE_SIZES } from "@/app/lib/image-sizes";
import ArticleFilterContainer from "@/app/components/ArticleFilterContainer";
import QuickPicks from "@/app/components/QuickPicks";
import { getAllArticleRouteParams } from "@/app/lib/wordpress/routes";
import Image from "next/image";
import type { Metadata } from "next";
import { getArticlePageData } from "@/app/lib/page-data/article-page";
import { getPostBySlug } from "@/app/lib/wordpress/post";
import { htmlToPlainText, toMetaDescription } from "@/app/lib/metadata";
import { ARTICLE_TYPES } from "@/app/lib/article-config";
import ImageWithFallback from "@/app/components/ImageWithFallback";

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
  const {
    normalizedDestination: destination,
    article,
    sections,
    relatedArticles,
  } = await getArticlePageData(urlDestinationSlug, articleSlug);

  const heroImage = article.heroImage;
  const config = ARTICLE_TYPES[article.articleTemplate];
  const neighborhoodLabels = article.sectionsBy !== "neighborhood";

  return (
    <>
      <header className="mb-6 md:mb-8">
        <ImageWithFallback
        sizes={IMAGE_SIZES.full}
        preload image={heroImage} className="aspect-video" />
        <Breadcrumbs article={article} destination={destination} />
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
        {article.quickPicks.length > 0 && (
          <QuickPicks quickPicks={article.quickPicks} />
        )}
        <ArticleFilterContainer
          display={{
            neighborhoodLabels,
            grouped: config.grouped,
            showFilters: config.filters,
            showComparison: config.comparison,
            cardSize: config.cardSize,
          }}
          sections={sections}
          relatedArticles={relatedArticles}
          articleDestinationId={destination.id}
        />
      </div>
    </>
  );
}
