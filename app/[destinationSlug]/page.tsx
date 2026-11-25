import { getAllDestinationRouteParams } from "@/app/lib/wordpress/routes";
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
import RoomsWorthTheTripBlock from "../components/RoomsWorthTheTripBlock";
import DestinationPicks from "../components/DestinationPicks";
import ImageWithFallback from "../components/ImageWithFallback";

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
        <ImageWithFallback
          image={destination.heroImage}
          className="aspect-video"
        />

        <Breadcrumbs destination={destination} />
        <div className="text-center mb-8 mx-auto w-10/12">
          <h1 className="my-1 md:mb-6 text-7xl text-center font-outdoor">
            {destination.title}
          </h1>
          <p>{destination.heroIntro}</p>
          <Tags tags={destination.heroTags} center />
        </div>
      </header>
      {destination.practicalInfo && destination.pageLayout === "trip" && (
        <PracticalInfo info={destination.practicalInfo} />
      )}

      {destination.travelStyles.length > 0 &&
        destination.pageLayout === "trip" && (
          <TravelStyleTabs
            travelStyles={destination.travelStyles}
            placesById={placesById}
            experiencesById={experiencesById}
          />
        )}
      {destination.whichRegion &&
        destination.whichRegion.length > 0 &&
        destination.pageLayout === "hub" && (
          <WhichRegion styles={destination.whichRegion} />
        )}
      <SubDestinations
        parentDestination={destination}
        subdestinations={destination.featuredSubdestinations}
        subdestinationsById={subdestinationsById}
      />
      {roomsBlock.kind !== "none" && (
        <section>
          <RoomsWorthTheTripBlock
            destination={destination}
            roomsBlock={roomsBlock}
            labelsById={labelsById}
          />
        </section>
      )}
      {/* <Recommendations picks={destination.picks} /> */}
      {picks && destination.pageLayout === "trip" && (
        <DestinationPicks picks={picks} destinationId={destination.id} />
      )}
      <ArticleSections
        sections={destination.articleSections}
        articlesById={articlesById}
        destinationId={destination.id}
      />
    </>
  );
}
