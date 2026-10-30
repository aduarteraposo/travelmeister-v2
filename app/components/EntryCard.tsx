import { ArticleConfig } from "../lib/article-config";
import { Entry } from "../types/app/article";
import { Experience } from "../types/app/experience";
import { Item } from "../types/app/item";
import { Place } from "../types/app/place";
import ExperienceCard from "./ExperienceCard";
import HotelCard from "./HotelCard";
import PlaceCard from "./PlaceCard";

export default function EntryCard({
  entry,
  neighborhoodLabels,
  articleDestinationId,
  cardSize,
}: {
  entry: Entry<Item, Place | Experience>;
  neighborhoodLabels: boolean;
  articleDestinationId: number;
  cardSize: ArticleConfig["cardSize"];
}) {
  const item = entry.item;

  if (!item) {
    return (
      <li className="mb-28 last:mb-0">
        <h3 className="text-2xl font-bold">Test Title</h3>
        <p>{entry.editorialNote}</p>
        {cardSize === "full" && entry.options.length > 0 && (
          <ul className="flex overflow-x-auto snax-x">
            {entry.options.map((option) => (
              <li key={option.slug}>{option.title}</li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  const showNeighborhood =
    neighborhoodLabels && articleDestinationId !== item.data.destination?.ID;

  return (
    <>
      {entry.item?.kind === "place" && <PlaceCard entry={entry} />}
      {entry.item?.kind === "hotel" && (
        <HotelCard
          hotel={entry.item.data}
          size={cardSize}
          showNeighborhood={showNeighborhood}
          note={entry.editorialNote}
        />
      )}
      {entry.item?.kind === "experience" && (
        <ExperienceCard experience={entry.item.data} />
      )}
    </>
  );
}
