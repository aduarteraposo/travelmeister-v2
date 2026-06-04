import { getAllDestinationRouteParams } from "@/app/lib/wordpress/routes";
import Image from "next/image";
import Tags from "../components/Tags";
import TravelStyleTabs from "../components/TravelStyleTabs";
import SubDestinations from "../components/SubDestinations";
import PracticalInfo from "../components/PracticalInfo";
import Breadcrumbs from "../components/Breadcrumbs";
import Recommendations from "../components/Recommendations";
import ArticleSections from "../components/RelatedArticleSections";
import { getDestinationPageData } from "../lib/page-data/destination-page";

type DestinationProps = {
  params: Promise<{
    destinationSlug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllDestinationRouteParams();
}

export default async function DestinationPage({ params }: DestinationProps) {
  const { destinationSlug } = await params;
  const destination = await getDestinationPageData(destinationSlug);

  return (
    <>
      <header>
        <Image
          loading="eager"
          alt={destination.acf.hero_image.alt}
          src={destination.acf.hero_image.url}
          width={destination.acf.hero_image.width}
          height={destination.acf.hero_image.height}
        />
        <Breadcrumbs destination={destination} />
        <div className="text-center mb-8 mx-auto w-10/12">
          <h1 className="mb-6 text-7xl text-center font-outdoor">
            {destination.title.rendered}
          </h1>
          <p>{destination.acf.hero_intro}</p>
          <Tags tags={destination.acf.hero_tags} center />
        </div>
      </header>
      <h2 className="font-outdoor text-[3.375rem]/14 mb-2 text-gray-800">
        Choose your style
      </h2>
      <div className="lg:flex flex-row-reverse gap-4">
        <PracticalInfo info={destination.acf.practical_info} />
        <TravelStyleTabs travelStyles={destination.acf.travel_styles} />
      </div>
      <SubDestinations
        parentDestination={destination}
        subdestinations={destination.acf.featured_subdestinations}
      />

      <Recommendations
        hotels={destination.acf.featured_hotels}
        restaurants={destination.acf.featured_restaurants}
        tours={destination.acf.featured_tours}
        sights={destination.acf.featured_sights}
      />
      <ArticleSections
        sections={destination.acf.article_sections}
        destinationId={destination.id}
      />
    </>
  );
}
