import { getPostsByCategoryAndDestination } from "../lib/wordpress/post";
import { CleanArticle } from "../types/app/article";
import { ArticleSection } from "../types/app/destination";
import ArticleLane from "./ArticleLane";

export default async function ArticleSections({
  sections,
  destinationId,
  articlesById,
}: {
  sections: ArticleSection[];
  destinationId: number;
  articlesById: Record<number, CleanArticle>;
}) {
  const lanes = await Promise.all(
    sections.map(async (section) => {
      const manualIds: number[] = section.manualArticles.map(
        (article) => article.ID
      );
      const remainingSlots = Math.max(
        section.initialItemsCount - section.manualArticles.length,
        0
      );

      const fetchLimit = remainingSlots > 0 ? remainingSlots : 1;

      if (section.category === null) return;

      const fetchedCategoryData = await getPostsByCategoryAndDestination({
        categoryId: section.category.id,
        destinationId,
        perPage: fetchLimit,
        offset: 0,
        exclude: manualIds,
      });

      const initialFetchedArticles =
        remainingSlots > 0 ? fetchedCategoryData.articles : [];

      const manualArticles = section.manualArticles.map(
        (article) => articlesById[article.ID]
      );

      return (
        <ArticleLane
          key={section.category.slug}
          manualArticles={manualArticles}
          initialFetchedArticles={initialFetchedArticles}
          title={section.title}
          categoryId={section.category.id}
          destinationId={destinationId}
          manualArticleIds={manualIds}
          perPage={section.loadMoreCount}
          initialTotal={fetchedCategoryData.total}
        />
      );
    })
  );

  return (
    <section className="my-16">
      <h2 className="text-[3.375rem]/14 text-gray-800 font-outdoor mb-4">
        Related Articles
      </h2>
      {lanes}
    </section>
  );
}
