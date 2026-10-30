import Breadcrumbs from "@/app/components/Breadcrumbs";
import ExploreFilterContainer from "@/app/components/ExploreFilterContainer";
import { normalizeArticle } from "@/app/lib/normalizers/article";
import { normalizeExperience } from "@/app/lib/normalizers/experience";
import {
  articleToExploreItem,
  experienceToExploreItem,
  placeToExploreItem,
} from "@/app/lib/normalizers/explore-item";
import { normalizePlace } from "@/app/lib/normalizers/place";
import { REVALIDATE, wordpressFetchAll } from "@/app/lib/wordpress/client";
import { getDestinationBySlug } from "@/app/lib/wordpress/destination";
import { WPExperience } from "@/app/types/wordpress/experience";
import { WPPlace } from "@/app/types/wordpress/place";
import { WPPost } from "@/app/types/wordpress/post";
import { notFound } from "next/navigation";

type ExplorePageProps = {
  params: Promise<{ destinationSlug: string }>;
};

export default async function ExplorePage({ params }: ExplorePageProps) {
  const { destinationSlug } = await params;
  const destination = await getDestinationBySlug(destinationSlug);

  if (!destination) {
    notFound();
  }

  const [posts, wpPlaces, wpExperiences] = await Promise.all([
    wordpressFetchAll<WPPost>(
      `/posts?destination=${destination.id}&acf_format=standard&per_page=100&_fields=id,slug,title,meta.url_destination,acf.primary_destination,acf.article_category,acf.hero_image`,
      {
        revalidate: REVALIDATE.day,
        tags: ["articles", `articles:destination:${destination.id}`],
      }
    ),
    wordpressFetchAll<WPPlace>(
      `/place?destination=${destination.id}&acf_format=standard&per_page=100&_fields=id,slug,title,meta.url_destination,acf.primary_destination,acf.place_type,acf.place_subtype,acf.images,acf.map_link,acf.filters,acf.stayed_here`,
      {
        revalidate: REVALIDATE.day,
        tags: ["places", `places:destination:${destination.id}`],
      }
    ),
    wordpressFetchAll<WPExperience>(
      `/experience?destination=${destination.id}&acf_format=standard&per_page=100&_fields=id,slug,title,meta.url_destination,acf.primary_destination,acf.experience_type,acf.images,acf.filters,acf.done_it,acf.cta_links`,
      {
        revalidate: REVALIDATE.day,
        tags: ["experiences", `experiences:destination:${destination.id}`],
      }
    ),
  ]);

  const places = wpPlaces.map(normalizePlace);
  const experiences = wpExperiences.map(normalizeExperience);
  const articles = posts.map(normalizeArticle);

  const placeItems = places.map(placeToExploreItem);
  const experienceItems = experiences.map(experienceToExploreItem);
  const articleItems = articles.map(articleToExploreItem);

  const exploreItems = [...placeItems, ...experienceItems, ...articleItems];

  return (
    <>
      <Breadcrumbs destination={destination} />
      <h1>Explore {destination.title.rendered}</h1>
      <ExploreFilterContainer
        items={exploreItems}
        destinationId={destination.id}
      />
    </>
  );
}
