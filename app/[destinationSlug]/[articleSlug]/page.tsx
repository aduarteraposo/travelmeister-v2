import Breadcrumbs from "@/app/components/Breadcrumbs";
import FilterContainer from "@/app/components/FilterContainer";
import QuickPicks from "@/app/components/QuickPicks";
import { getArticleBySlug, getDestinationBySlug } from "@/app/lib/wordpress";
import { mapHotelsById } from "@/app/lib/wordpress-utils";
import { HotelWithSection } from "@/app/types/wordpress";
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
  const hotelSections = post.acf.hotel_sections;

  if (canonicalDestination.id !== post.acf.primary_destination) {
    notFound();
  }

  const allHotels: HotelWithSection[] = hotelSections.flatMap((section) =>
    section.hotels.map((hotel) => ({
      ...hotel,
      section_title: section.section_title,
    }))
  );

  const hotelsById = mapHotelsById(allHotels);

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
        <Breadcrumbs post={post} destinationSlug={destinationSlug} />
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
        <div className="w-full lg:flex gap-8">
          <div className="basis-1 max-w-full lg:basis-2/3 lg:max-w-2/3">
            <QuickPicks
              hotelsById={hotelsById}
              quickPicks={post.acf.quick_picks}
            />
            <FilterContainer hotels={allHotels} />
          </div>
          <div className="basis-1/3 hidden lg:block">
            <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
            <div className="bg-gray-300 w-full h-48"></div>
          </div>
        </div>
      </div>
    </>
  );
}
