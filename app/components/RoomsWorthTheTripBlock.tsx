import { getHotelHref } from "../lib/links";
import { getRoomLabel, RoomFeature, RoomsBlock } from "../lib/rooms";
import { Destination } from "../types/app/destination";
import ArticleCard from "./ArticleCard";
import Card from "./card/Card";
import CardBody from "./card/CardBody";
import CardEyebrow from "./card/CardEyebrow";
import CardImage from "./card/CardImage";
import CardMeta from "./card/CardMeta";
import CardText from "./card/CardText";
import CardTitle from "./card/CardTitle";
import ArticleCardSmall from "./ArticleCardSmall";

export default async function RoomsWorthTheTripBlock({
  roomsBlock,
  destination,
  labelsById,
}: {
  roomsBlock: RoomsBlock;
  destination?: Destination;
  labelsById: Record<number, RoomFeature>;
}) {
  if (roomsBlock.kind === "none") return null;

  if (roomsBlock.kind === "single") {
    const article = roomsBlock.article;
    const hotels = roomsBlock.hotels;
    const label = getRoomLabel(article.roomFeature, labelsById);

    return (
      <div className="bg-green-300 rounded-lg pt-5 p-6 md:pt-6 my-16">
        <h2 className="font-outdoor text-6xl mb-5">
          Rooms worth the trip{destination ? ` in ${destination.title}` : ""}
        </h2>
        <div className="bg-[rgba(255,255,255,.6)] rounded-xl">
          <ArticleCard article={article} eyebrow={label} />
        </div>
        {hotels.length > 0 && (
          <>
            <h3 className="font-bold text-xl mt-8 mb-4">
              Top Rooms from the guide
            </h3>
            <ul className="flex gap-8 justify-center flex-wrap">
              {hotels.map((item) => (
                <li
                  key={item.hotel.slug}
                  className="bg-[rgba(255,255,255,.6)] min-w-66 flex-1 shrink-0 rounded-xl"
                >
                  <Card layout="vertical">
                    <CardImage image={item.hotel.images[0] ?? null} />
                    <CardBody>
                      <CardEyebrow>{item.label}</CardEyebrow>
                      <CardTitle href={getHotelHref(item.hotel)}>
                        {item.hotel.title}
                      </CardTitle>
                      {item.hotel.rooms.find((r) => r.isPick) && (
                        <CardText>
                          <span className="font-semibold">Best Room: </span>
                          {item.hotel.rooms.find((r) => r.isPick)?.categoryName}
                        </CardText>
                      )}

                      <CardMeta
                        items={[
                          item.hotel.destination?.post_title ?? null,
                          item.hotel.lastReviewed
                            ? `Last review: ${item.hotel.lastReviewed.toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  year: "numeric",
                                }
                              )}`
                            : null,
                        ]}
                      />
                    </CardBody>
                  </Card>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }

  if (roomsBlock.kind === "list") {
    const articles = roomsBlock.articles;

    return (
      <div className="bg-green-300 border rounded-lg py-10 px-6 my-16">
        <h2 className="font-outdoor text-5xl mb-4">
          Rooms worth the trip{destination ? ` in ${destination.title}` : ""}
        </h2>
        <ul className="flex flex-col md:flex-row gap-4">
          {articles.slice(0, 3).map((a) => (
            <li
              key={a.slug}
              className="bg-[rgba(255,255,255,.6)] rounded-lg w-full md:w-auto flex-1"
            >
              <ArticleCardSmall
                article={a}
                eyebrowItems={[
                  a.destination?.post_title,
                  getRoomLabel(a.roomFeature, labelsById),
                ]}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
