import Link from "next/link";
import { ExploreItem } from "../types/app/explore";
import Card from "./card/Card";
import CardEyebrow from "./card/CardEyebrow";
import CardImage from "./card/CardImage";
import CardText from "./card/CardText";
import CardTitle from "./card/CardTitle";
import DotSeparated from "./DotSeparated";
import CardBody from "./card/CardBody";

export default function ExploreCard({ item }: { item: ExploreItem }) {
  const eyebrowItems = [item.subtype?.name, item.area?.label];
  return (
    <Card layout="vertical">
      <CardImage image={item.image} />
      <CardBody>
        <CardEyebrow>
          {eyebrowItems.some(Boolean) && <DotSeparated items={eyebrowItems} />}
        </CardEyebrow>
        <CardTitle href={item.link?.href}>{item.title}</CardTitle>
        <CardText>{item.title}</CardText>
      </CardBody>
    </Card>
  );
}
