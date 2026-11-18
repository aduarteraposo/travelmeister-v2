import Breadcrumbs from "@/app/components/Breadcrumbs";
import ExploreFilterContainer from "@/app/components/ExploreFilterContainer";
import { getExplorePageData } from "@/app/lib/page-data/explore-page";
import { getDestinationBySlug } from "@/app/lib/wordpress/destination";

type ExplorePageProps = {
  params: Promise<{ destinationSlug: string }>;
};

export default async function ExplorePage({ params }: ExplorePageProps) {
  const { destinationSlug } = await params;
  const wpDestination = await getDestinationBySlug(destinationSlug);

  const { destination, exploreItems } = await getExplorePageData(wpDestination);

  return (
    <>
      <Breadcrumbs destination={destination} />
      <h1 className="font-outdoor text-6xl text-center my-6">
        Explore {destination.title}
      </h1>
      <ExploreFilterContainer
        items={exploreItems}
        destinationId={destination.id}
        destinationName={destination.title}
      />
    </>
  );
}
