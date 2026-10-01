import Link from "next/link";
import { Destination } from "../types/app/destination";
import { WPDestination } from "../types/wordpress/destination";
import DestinationTeaser from "./DestinationTeaser";
import Tags from "./Tags";

export default function SubDestinationTeaser({
  destination,
  parentDestination,
}: {
  destination: WPDestination;
  parentDestination: Destination;
}) {
  const title = destination.title.rendered;
  const isNeighborhood = parentDestination.acf.destination_type.slug === "city";

  return (
    <DestinationTeaser
      image={destination.acf.hero_image}
      title={title}
      slug={destination.slug}
      description={
        isNeighborhood
          ? destination.acf.card_description || undefined
          : undefined
      }
      details={
        isNeighborhood ? (
          <div className="pt-4">
            {destination.acf.hero_intro && <p>{destination.acf.hero_intro}</p>}
            <Tags tags={destination.acf.hero_tags} center />
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
