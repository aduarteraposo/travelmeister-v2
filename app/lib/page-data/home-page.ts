import { notFound } from "next/navigation";
import { getHomepage } from "../wordpress/pages";
import { normalizeHomepage } from "../normalizers/homepage";
import { getRoomsBlock, RoomFeature, RoomsBlock } from "../rooms";
import { getPostsByIds } from "../wordpress/post";
import { mapById } from "../utils";
import { normalizeArticle } from "../normalizers/article";
import {
  getDestinationsByIds,
  getPostNumberForDestination,
} from "../wordpress/destination";
import { normalizeDestination } from "../normalizers/destination";
import { WPImage } from "@/app/types/wordpress/media";
import { CleanArticle } from "@/app/types/app/article";
import { Destination } from "@/app/types/app/destination";
import { REVALIDATE, wordpressFetch } from "../wordpress/client";

type FeaturedDestination = Destination & {
  articleCount: string;
};

type HomePageData = {
  heroSection: { title: string; text: string; image: WPImage | null };
  trustPoints: { title: string; text: string }[];
  featuredDestinations: FeaturedDestination[];
  comingSoon: { name: string; image: WPImage }[];
  roomsBlock: RoomsBlock;
  popularArticles: CleanArticle[];
  aboutSection: { image: WPImage | null; title: string; text: string };
  labelsById: Record<number, RoomFeature>;
};

async function getPostCounts(
  destinationIds: number[]
): Promise<Record<number, number>> {
  return Object.fromEntries(
    await Promise.all(
      destinationIds.map(async (id) => [
        id,
        await getPostNumberForDestination(id),
      ])
    )
  );
}

export async function getHomepageData(): Promise<HomePageData> {
  const wpHomepage = await getHomepage();

  if (!wpHomepage) {
    notFound();
  }

  const homepage = normalizeHomepage(wpHomepage);

  const heroSection = {
    title: homepage.heroTitle,
    text: homepage.heroText,
    image: homepage.heroImage,
  };

  const [
    wpDestinations,
    roomsPosts,
    popularPosts,
    articleNumberPerDestination,
    roomFeatures,
  ] = await Promise.all([
    getDestinationsByIds(homepage.featuredDestinations),
    getPostsByIds(homepage.roomsArticles),
    getPostsByIds(homepage.popularArticles),
    getPostCounts(homepage.featuredDestinations),
    wordpressFetch<RoomFeature[]>(`/room_feature?per_page=100&_fields=id,acf`, {
      revalidate: REVALIDATE.day,
      tags: ["room_features"],
    }),
  ]);

  const featuredDestinations = wpDestinations.map(normalizeDestination);

  const destinationsWithArticleCount = featuredDestinations.map((d) => ({
    ...d,
    articleCount: `${articleNumberPerDestination[d.id]} ${
      articleNumberPerDestination[d.id] === 1 ? "article" : "articles"
    }`,
  }));

  const popularArticles = popularPosts.map(normalizeArticle);
  const roomArticlesById = mapById(roomsPosts);
  const roomsBlock = await getRoomsBlock(roomArticlesById);
  const labelsById = mapById(roomFeatures);

  const aboutSection = {
    title: homepage.aboutTitle,
    text: homepage.aboutText,
    image: homepage.aboutImage,
  };

  return {
    heroSection,
    trustPoints: homepage.trustPoints,
    featuredDestinations: destinationsWithArticleCount,
    comingSoon: homepage.comingSoon,
    roomsBlock,
    popularArticles,
    aboutSection,
    labelsById,
  };
}
