import { ExploreItem } from "../types/app/explore";
import Card from "./card/Card";
import CardEyebrow from "./card/CardEyebrow";
import CardImage from "./card/CardImage";
import { IMAGE_SIZES } from "../lib/image-sizes";
import CardText from "./card/CardText";
import CardTitle from "./card/CardTitle";
import DotSeparated from "./DotSeparated";
import CardBody from "./card/CardBody";
import { htmlToPlainText } from "../lib/metadata";
import LinkButton from "./LinkButton";

export default function ExploreCard({
  item,
  imageSizes = IMAGE_SIZES.grid4,
}: {
  item: ExploreItem;
  imageSizes?: string;
}) {
  const eyebrowItems = [item.subtype?.name, item.area?.label];
  return (
    <Card layout="vertical">
      <CardImage image={item.image} sizes={imageSizes} />
      <CardBody>
        <CardEyebrow>
          {eyebrowItems.some(Boolean) && <DotSeparated items={eyebrowItems} />}
        </CardEyebrow>
        <CardTitle>{htmlToPlainText(item.title)}</CardTitle>
        <CardText lines={2}>{item.text}</CardText>
        <LinkButton
          link={item.link}
          variant="secondary"
          className="after:inset-0 after:absolute mt-auto"
          size="sm"
        />
      </CardBody>
    </Card>
  );
}
