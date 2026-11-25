import { CleanArticle } from "../types/app/article";
import Card from "./card/Card";
import CardImage from "./card/CardImage";
import CardBody from "./card/CardBody";
import CardEyebrow from "./card/CardEyebrow";
import CardTitle from "./card/CardTitle";
import { getArticleHref } from "../lib/links";
import DotSeparated from "./DotSeparated";

export default function ArticleCardSmall({
  article,
  eyebrowItems = [],
}: {
  article: CleanArticle;
  eyebrowItems?: (string | null | undefined)[];
}) {
  return (
    <Card layout="vertical">
      <CardImage image={article.heroImage} />
      <CardBody>
        {eyebrowItems.some(Boolean) && (
          <CardEyebrow>
            <DotSeparated items={eyebrowItems} />
          </CardEyebrow>
        )}
        <CardTitle
          link={{
            href: getArticleHref(article),
            external: false,
            label: "Read article",
            kind: "page",
          }}
        >
          {article.title}
        </CardTitle>
      </CardBody>
    </Card>
  );
}
