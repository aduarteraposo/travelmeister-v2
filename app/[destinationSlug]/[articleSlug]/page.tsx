import Breadcrumbs from "@/app/components/Breadcrumbs";
import FilterContainer from "@/app/components/FilterContainer";
import QuickPicks from "@/app/components/QuickPicks";
import {
  getArticleBySlug,
  getDestinationBySlug,
  getPlacesByIds,
} from "@/app/lib/wordpress";
import { mapPlacesById, mapPostWithPlaces } from "@/app/lib/wordpress-utils";
import { NormalizedPost, PlaceWithSection } from "@/app/types/wordpress";
import Image from "next/image";
import { notFound } from "next/navigation";

type ArticlePageProps = {
  params: Promise<{
    destinationSlug: string;
    articleSlug: string;
  }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { destinationSlug, articleSlug } = await params;
  const canonicalDestination = await getDestinationBySlug(destinationSlug);
  const post = await getArticleBySlug(articleSlug);
  const heroImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const listSections = post.acf.list_sections;

  if (canonicalDestination.id !== post.acf.primary_destination.ID) {
    notFound();
  }

  const placesIds = listSections.flatMap((section) =>
    section.places.map((place) => place.ID)
  );

  const places = await getPlacesByIds(placesIds);
  const placesById = mapPlacesById(places);
  const normalizedPost: NormalizedPost = mapPostWithPlaces(post, placesById);

  const allHotels: PlaceWithSection[] =
    normalizedPost.acf.list_sections.flatMap((section) =>
      section.places.map((hotel) => ({
        ...hotel,
        section_title: section.section_title,
      }))
    );

  return (
    <>
      <header className="mb-6 md:mb-8">
        {heroImage && (
          <Image
            loading="eager"
            src={heroImage.source_url}
            alt={heroImage.alt_text || post.title.rendered || ""}
            width={heroImage.media_details.width}
            height={heroImage.media_details.height}
          />
        )}
        <Breadcrumbs post={post} destination={canonicalDestination} />
      </header>
      <div className="mx-auto px-4 md:px-0">
        <div className="mb-20">
          <h1 className="text-center text-3xl :text-4xl font-bold mb-4">
            {post.title.rendered}
          </h1>
          <div
            className="md:max-w-3/4 mx-auto text-center"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        </div>
        <div
          className="prose mb-16"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        ></div>
        <QuickPicks quickPicks={normalizedPost.acf.quick_picks} />
        <FilterContainer places={allHotels} />
      </div>
    </>
  );
}
