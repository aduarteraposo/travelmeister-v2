import DestinationScroller from "../components/DestinationScroller";
import DestinationTeaser from "../components/DestinationTeaser";
import { getDestinationsPageData } from "../lib/page-data/destinations-page";

export default async function DestinationsPage() {
  const { countries } = await getDestinationsPageData();

  return (
    <DestinationScroller>
      {countries.map((c) => (
        <DestinationTeaser
          key={c.slug}
          image={c.acf.hero_image}
          title={c.title.rendered}
          slug={c.slug}
        />
      ))}
    </DestinationScroller>
  );
}
