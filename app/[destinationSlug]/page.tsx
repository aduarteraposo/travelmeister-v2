import { getAllDestinationRouteParams } from "@/app/lib/wordpress/routes";
import Image from "next/image";
import type { Metadata } from "next";
import Tags from "../components/Tags";
import TravelStyleTabs from "../components/TravelStyleTabs";
import PracticalInfo from "../components/PracticalInfo";
import Breadcrumbs from "../components/Breadcrumbs";
import ArticleSections from "../components/RelatedArticleSections";
import { getDestinationPageData } from "../lib/page-data/destination-page";
import SubDestinations from "../components/SubDestinations";
import { getDestinationBySlug } from "../lib/wordpress/destination";
import { htmlToPlainText, toMetaDescription } from "../lib/metadata";
import WhichRegion from "../components/WhichRegion";
import RoomsWorthTheTripSection from "../components/RoomsWorthTheTripSection";
import DestinationPicks from "../components/DestinationPicks";

type DestinationProps = {
  params: Promise<{
    destinationSlug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllDestinationRouteParams();
}

export async function generateMetadata({
  params,
}: DestinationProps): Promise<Metadata> {
  const { destinationSlug } = await params;
  const destination = await getDestinationBySlug(destinationSlug);

  return {
    title: destination
      ? htmlToPlainText(destination.title.rendered)
      : undefined,
    description: toMetaDescription(
      destination?.acf.card_description || destination?.acf.hero_intro
    ),
    alternates: { canonical: `/${destinationSlug}` },
  };
}

export default async function DestinationPage({ params }: DestinationProps) {
  const { destinationSlug } = await params;
  const {
    destination,
    articlesById,
    experiencesById,
    placesById,
    subdestinationsById,
    labelsById,
    roomsBlock,
    picks,
  } = await getDestinationPageData(destinationSlug);

  return (
    <>
      <header>
        {destination.heroImage && (
          <Image
            loading="eager"
            alt={destination.heroImage.alt}
            src={destination.heroImage.url}
            width={destination.heroImage.width}
            height={destination.heroImage.height}
          />
        )}

        <Breadcrumbs destination={destination} />
        <div className="text-center mb-8 mx-auto w-10/12">
          <h1 className="my-1 md:mb-6 text-7xl text-center font-outdoor">
            {destination.title}
          </h1>
          <p>{destination.heroIntro}</p>
          <Tags tags={destination.heroTags} center />
        </div>
      </header>
      <h2 className="font-outdoor text-[3.375rem]/14 mb-2 text-gray-800">
        Choose your style
      </h2>
      {destination.practicalInfo && (
        <PracticalInfo info={destination.practicalInfo} />
      )}
      {destination.travelStyles.length > 0 && (
        <TravelStyleTabs travelStyles={destination.travelStyles} />
      )}
      {destination.whichRegion && destination.whichRegion.length > 0 && (
        <WhichRegion styles={destination.whichRegion} />
      )}
      <SubDestinations
        parentDestination={destination}
        subdestinations={destination.featuredSubdestinations}
      />
      <RoomsWorthTheTripSection
        destination={destination}
        roomsBlock={roomsBlock}
        labelsById={labelsById}
      />
      {/* <Recommendations picks={destination.picks} /> */}
      <DestinationPicks picks={picks} destinationId={destination.id} />
      <ArticleSections
        sections={destination.articleSections}
        articlesById={articlesById}
        destinationId={destination.id}
      />
    </>
  );
}
