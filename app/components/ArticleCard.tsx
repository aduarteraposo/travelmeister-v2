import { Article } from "../types/app/article";
import { getArticleHref } from "../lib/links";
import Card from "./card/Card";
import CardImage from "./card/CardImage";
import { IMAGE_SIZES } from "../lib/image-sizes";
import CardEyebrow from "./card/CardEyebrow";
import CardTitle from "./card/CardTitle";
import CardBody from "./card/CardBody";
import CardText from "./card/CardText";
import CardMeta from "./card/CardMeta";

export default function ArticleCard({
  article,
  eyebrow,
  imageSizes = IMAGE_SIZES.horizontalCard,
}: {
  article: Article;
  eyebrow?: string | undefined;
  imageSizes?: string;
}) {
  const hotels = article.sections
    .flatMap((s) => s.entries)
    .flatMap((e) => (e.item?.kind === "hotel" ? [e.item.data] : []));
  const stayed = hotels.filter((h) => h.beenThere).length;

  const updatedText =
    article.modifiedDate &&
    "Updated " +
      article.modifiedDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

  const cardMeta = [
    `${hotels.length} hotels`,
    stayed > 0 ? `We stayed in ${stayed}` : null,
    updatedText,
  ];

  return (
    <Card layout="horizontal">
      <CardImage image={article.heroImage} sizes={imageSizes} />
      <CardBody>
        <CardEyebrow>{eyebrow}</CardEyebrow>
        <CardTitle
          link={{
            href: getArticleHref(article),
            label: article.title,
            external: false,
            kind: "page",
          }}
        >
          {article.title}
        </CardTitle>
        <CardText>{article.excerpt}</CardText>
        <CardMeta items={cardMeta} />
      </CardBody>
    </Card>
  );
}
