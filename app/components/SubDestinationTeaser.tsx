import Link from "next/link";
import { Destination } from "../types/app/destination";
import DestinationTeaser from "./DestinationTeaser";
import Tags from "./Tags";

export default function SubDestinationTeaser({
  destination,
  parentDestination,
}: {
  destination: Destination;
  parentDestination: Destination;
}) {
  const title = destination.title;
  const isNeighborhood = parentDestination.destinationType?.slug === "city";

  return (
    <DestinationTeaser
      image={destination.heroImage}
      title={title}
      slug={destination.slug}
      description={
        isNeighborhood ? destination.cardDescription || undefined : undefined
      }
      details={
        isNeighborhood ? (
          <div className="pt-4">
            {destination.heroIntro && <p>{destination.heroIntro}</p>}
            {destination.heroTags && (
              <Tags tags={destination.heroTags} center />
            )}
            <Link
              href={`/${destination.slug}`}
              className="font-medium underline underline-offset-4"
            >
              Explore {title}
            </Link>
          </div>
        ) : undefined
      }
    />
  );
}
