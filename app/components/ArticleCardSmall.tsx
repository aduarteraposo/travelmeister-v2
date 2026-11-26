import { CleanArticle } from "../types/app/article";
import Card from "./card/Card";
import CardImage from "./card/CardImage";
import { IMAGE_SIZES } from "../lib/image-sizes";
import CardBody from "./card/CardBody";
import CardEyebrow from "./card/CardEyebrow";
import CardTitle from "./card/CardTitle";
import { getArticleHref } from "../lib/links";
import DotSeparated from "./DotSeparated";

export default function ArticleCardSmall({
  article,
  eyebrowItems = [],
  imageSizes = IMAGE_SIZES.grid3,
}: {
  article: CleanArticle;
  eyebrowItems?: (string | null | undefined)[];
  imageSizes?: string;
}) {
  return (
    <Card layout="vertical">
      <CardImage image={article.heroImage} sizes={imageSizes} />
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
