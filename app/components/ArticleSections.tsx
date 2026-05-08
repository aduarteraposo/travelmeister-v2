import { getArticlesByCategoryAndDestination } from "../lib/wordpress";
import { NormalizedArticleSection } from "../types/wordpress";
import ArticleLane from "./ArticlesLane";

export default async function ArticleSections({
  sections,
  destinationId,
}: {
  sections: NormalizedArticleSection[];
  destinationId: number;
}) {
  const lanes = await Promise.all(
    sections.map(async (section) => {
      const manualIds: number[] = section.manual_articles.map(
        (article) => article.id
      );
      const remainingSlots = Math.max(
        section.initial_items_count - section.manual_articles.length,
        0
      );

      const fetchLimit = remainingSlots > 0 ? remainingSlots : 1;

      const excludeParam = manualIds.length
        ? `&exclude=${manualIds.join(",")}`
        : "";

      const fetchedCategoryData = await getArticlesByCategoryAndDestination(
        section.category.term_id,
        destinationId,
        fetchLimit,
        excludeParam,
        0
      );

      const initialFetchedArticles =
        remainingSlots > 0 ? fetchedCategoryData.articles : [];

      return (
        <ArticleLane
          key={section.category.slug}
          manualArticles={section.manual_articles}
          initialFetchedArticles={initialFetchedArticles}
          title={section.title}
          categoryId={section.category.term_id}
          destinationId={destinationId}
          manualArticlesIds={manualIds}
          perPage={section.initial_items_count}
          initialTotal={fetchedCategoryData.total}
        />
      );
    })
  );

  return (
    <section className="my-8">
      <h2 className="font-semibold text-2xl">Related Articles</h2>
      {lanes}
    </section>
  );
}
