import { WPImage } from "../wordpress/media";

export type Homepage = {
  heroTitle: string;
  heroText: string;
  heroImage: WPImage | null;
  trustPoints: { title: string; text: string }[];
  featuredDestinations: number[];
  comingSoon: { name: string; image: WPImage }[];
  roomsArticles: number[];
  popularArticles: number[];
  aboutTitle: string;
  aboutText: string;
  aboutImage: WPImage | null;
};
