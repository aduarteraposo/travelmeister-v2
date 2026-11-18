import { normalizeDestination } from "../lib/normalizers/destination";
import { getDestinationsByIds } from "../lib/wordpress/destination";
import { Destination } from "../types/app/destination";
import { WPItemRef } from "../types/wordpress/post";
import SubDestinationTeaser from "./SubDestinationTeaser";

export default async function SubDestinations({
  subdestinations,
  parentDestination,
}: {
  subdestinations: WPItemRef[];
  parentDestination: Destination;
}) {
  const fetchedSubdestinations = await getDestinationsByIds(
    subdestinations.map((d) => d.ID)
  );
  const normalizedSubdesinations =
    fetchedSubdestinations.map(normalizeDestination);
  return (
    <section className="my-10">
      {
        <h2 className="font-outdoor text-[3.375rem]/14 mb-2 text-gray-800">
          {parentDestination.destinationType?.slug === "city"
            ? "Neighborhoods"
            : "Top Destinations"}
        </h2>
      }
      <ul className="flex  gap-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {normalizedSubdesinations.map((subdestination) => (
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
