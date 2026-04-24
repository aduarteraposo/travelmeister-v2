import {
  getArticlesByIds,
  getDestinationBySlug,
  getDestinationsByIds,
  getPlacesByIds,
} from "@/app/lib/wordpress";
import type { NormalizedDestination } from "../types/wordpress";
import Image from "next/image";
import {
  mapDestinationsById,
  mapDestinationWithPlacesAndSubDestinationsAndPosts,
  mapPlacesById,
  mapPostsById,
} from "../lib/wordpress-utils";
import Tags from "../components/Tags";
import TravelStyleTabs from "../components/TravelStyleTabs";
import SubDestinations from "../components/SubDestinations";
import PracticalInfo from "../components/PracticalInfo";
import Breadcrumbs from "../components/Breadcrumbs";
import Recommendations from "../components/Recommendations";

type DestinationProps = {
  params: Promise<{
    destinationSlug: string;
  }>;
};

export default async function DestinationPage({ params }: DestinationProps) {
  const { destinationSlug } = await params;
  const destination = await getDestinationBySlug(destinationSlug);
  const travelStylePlaceIDs = destination.acf.travel_styles.flatMap((style) => [
    ...(style.where_to_stay.primary_place
      ? [style.where_to_stay.primary_place.ID]
      : []),
    ...(style.where_to_stay.alternative_places
      ? style.where_to_stay.alternative_places.map((place) => place.ID)
      : []),
    ...(style.featured_experiences
      ? style.featured_experiences.map((place) => place.ID)
      : []),
  ]);

  const placesIds: number[] = [
    ...travelStylePlaceIDs,
    ...(destination.acf.featured_hotels
      ? destination.acf.featured_hotels.map((hotel) => hotel.place.ID)
      : []),
    ...(destination.acf.featured_restaurants
      ? destination.acf.featured_restaurants.map(
          (restaurant) => restaurant.place.ID
        )
      : []),
    ...(destination.acf.featured_tours
      ? destination.acf.featured_tours.map((tour) => tour.place.ID)
      : []),
    ...(destination.acf.featured_sights
      ? destination.acf.featured_sights.map((sight) => sight.place.ID)
      : []),
  ];

  const subdestinationsIds: number[] = [
    ...(Array.isArray(destination.acf.featured_subdestinations)
      ? destination.acf.featured_subdestinations.map(
          (subDestination) => subDestination.ID
        )
      : []),
  ];

  const postIds: number[] = destination.acf.travel_styles.flatMap((style) => [
    ...(style.related_articles
      ? style.related_articles.map((article) => article.ID)
      : []),
  ]);

  const uniquePlacesIds = Array.from(new Set(placesIds));
  const uniqueSubdestinationsIds = Array.from(new Set(subdestinationsIds));
  const uniquePostIds = Array.from(new Set(postIds));

  const subDestinations = await getDestinationsByIds(uniqueSubdestinationsIds);
  const places = await getPlacesByIds(uniquePlacesIds);
  const posts = await getArticlesByIds(uniquePostIds);

  const subdestinationsById = mapDestinationsById(subDestinations);
  const placesById = mapPlacesById(places);
  const postsById = mapPostsById(posts);

  const normalizedDestination: NormalizedDestination =
    mapDestinationWithPlacesAndSubDestinationsAndPosts(
      destination,
      placesById,
      subdestinationsById,
      postsById
    );

  return (
    <>
      <header>
        <Image
          loading="eager"
          alt={normalizedDestination.acf.hero_image.alt}
          src={normalizedDestination.acf.hero_image.url}
          width={normalizedDestination.acf.hero_image.width}
          height={normalizedDestination.acf.hero_image.height}
        />
        <Breadcrumbs destination={normalizedDestination} />
        <div className="text-center mb-8 mx-auto w-10/12">
          <h1 className="mb-4 text-4xl text-center font-semibold">
            {normalizedDestination.title.rendered}
          </h1>
          <p>{normalizedDestination.acf.hero_intro}</p>
          <Tags tags={normalizedDestination.acf.hero_tags} center />
        </div>
      </header>
      <main className="px-4 mt-16">
        <div className="lg:flex flex-row-reverse gap-4">
          <div className="rounded-xl px-8 py-6 bg-green-300 lg:max-w-56 mb-8 lg:mb-0">
            <PracticalInfo info={normalizedDestination.acf.practical_info} />
          </div>
          <TravelStyleTabs
            travelStyles={normalizedDestination.acf.travel_styles}
          />
        </div>
        <SubDestinations
          parentDestination={normalizedDestination}
          subdestinations={normalizedDestination.acf.featured_subdestinations}
        />

        <Recommendations
          hotels={normalizedDestination.acf.featured_hotels}
          restaurants={normalizedDestination.acf.featured_restaurants}
          tours={normalizedDestination.acf.featured_tours}
          sights={normalizedDestination.acf.featured_sights}
        />
      </main>
    </>
  );
}
