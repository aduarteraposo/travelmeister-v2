import { Destination } from "../types/app/destination";
import { WPDestination } from "../types/wordpress/destination";
import SubDestinationTeaser from "./SubDestinationTeaser";

export default function SubDestinations({
  subdestinations,
  parentDestination,
}: {
  subdestinations: WPDestination[];
  parentDestination: Destination;
}) {
  return (
    <section className="my-10">
      {
        <h2 className="font-outdoor text-[3.375rem]/14 mb-2 text-gray-800">
          {parentDestination.acf.destination_type.slug === "city"
            ? "Neighborhoods"
            : "Top Destinations"}
        </h2>
      }
      <ul className="flex  gap-4 overflow-auto">
        {subdestinations.map((subdestination) => (
          <SubDestinationTeaser
            key={subdestination.slug}
            destination={subdestination}
            parentDestination={parentDestination}
          />
        ))}
      </ul>
    </section>
  );
}
