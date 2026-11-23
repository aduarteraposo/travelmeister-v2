import { Homepage } from "@/app/types/app/pages";
import { WPHomepage } from "@/app/types/wordpress/pages";

export function normalizeHomepage(page: WPHomepage): Homepage {
  const acf = page.acf;

  const homepage: Homepage = {
    heroTitle: acf.hero_title ?? "",
    heroText: acf.hero_text ?? "",
    heroImage: acf.hero_image ? acf.hero_image : null,
    trustPoints: Array.isArray(acf.trust_points) ? acf.trust_points : [],
    featuredDestinations: acf.featured_destinations
      ? acf.featured_destinations
      : [],
    comingSoon: Array.isArray(acf.coming_soon) ? acf.coming_soon : [],
    roomsArticles: Array.isArray(acf.rooms_articles) ? acf.rooms_articles : [],
    popularArticles: Array.isArray(acf.popular_articles)
      ? acf.popular_articles
      : [],
    aboutTitle: acf.about_title ?? "",
    aboutText: acf.about_text ?? "",
    aboutImage: acf.about_image ? acf.about_image : null,
  };

  return homepage;
}
