import { Article } from "../types/app/article";
import { getArticleHref } from "../lib/links";
import Card from "./card/Card";
import CardImage from "./card/CardImage";
import CardEyebrow from "./card/CardEyebrow";
import CardTitle from "./card/CardTitle";
import CardBody from "./card/CardBody";
import CardText from "./card/CardText";
import CardMeta from "./card/CardMeta";

export default function ArticleCard({
  article,
  eyebrow,
}: {
  article: Article;
  eyebrow?: string | undefined;
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
      <CardImage image={article.heroImage} />
      <CardBody>
        <CardEyebrow>{eyebrow}</CardEyebrow>
        <CardTitle href={getArticleHref(article)}>{article.title}</CardTitle>
        <CardText>{article.excerpt}</CardText>
        <CardMeta items={cardMeta} />
      </CardBody>
    </Card>
  );
}
