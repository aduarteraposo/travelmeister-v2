import { Destination, NormalizedDestination } from "../types/wordpress";
import SubDestination from "./SubDestination";

export default function SubDestinations({
  parentDestination,
  subdestinations,
}: {
  parentDestination: NormalizedDestination;
  subdestinations: Destination[];
}) {
  return (
    <section className="my-10">
      {parentDestination.acf.destination_type === "city" && (
        <h2 className="text-gray-800 mb-2 md:mb-3 font-outdoor text-6xl">
          Neighborhoods
        </h2>
      )}

      <ul className="flex  gap-4 overflow-auto">
        {subdestinations.map((subdestination) => (
          <SubDestination
            key={subdestination.slug}
            destination={subdestination}
            parentDestinationType={parentDestination.acf.destination_type}
          />
        ))}
      </ul>
    </section>
  );
}
