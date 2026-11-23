import { WPImage } from "./media";

export type WPHomepage = {
  id: number;
  slug: string;
  modified_gmt: string;
  acf: {
    hero_title: string;
    hero_text: string;
    hero_image: WPImage | false;
    trust_points: { title: string; text: string }[] | false;
    featured_destinations: number[] | "";
    coming_soon: { name: string; image: WPImage }[] | false;
    rooms_articles: number[] | "";
    popular_articles: number[] | "";
    about_title: string;
    about_text: string;
    about_image: WPImage | false;
  };
};
