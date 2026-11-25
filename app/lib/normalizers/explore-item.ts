import { ExploreItem, ExploreTab } from "@/app/types/app/explore";
import { getArticleHref } from "../links";
import { Place } from "@/app/types/app/place";
import { Experience } from "@/app/types/app/experience";
import { CleanArticle } from "@/app/types/app/article";
import { getExperienceLinks, getPlaceLinks, primaryLink } from "../item-links";

export function placeToExploreItem(place: Place): ExploreItem {
  const exploreItem: ExploreItem = {
    id: place.id,
    tab: getTabByPlaceType(place),
    subtype: place.placeSubtype ?? null,
    area: place.destination
      ? {
          id: place.destination.ID,
          slug: place.destination.post_name,
          label: place.destination.post_title,
        }
      : null,
    beenThere: typeof place.beenThere === "object" ? true : false,
    title: place.title,
    text: place.shortDescription,
    link: primaryLink(getPlaceLinks(place)),
    image: Array.isArray(place.images)
      ? place.images[0] && typeof place.images[0] === "object"
        ? place.images[0]
        : null
      : null,
    filters: place.filters,
  };

  return exploreItem;
}

function getTabByPlaceType(place: Place): ExploreTab["id"] | null {
  if (place.placeType === "hotel") {
    return "stay";
  } else if (place.placeType === "restaurant" || place.placeType === "cafe") {
    return "eat";
  } else if (place.placeType === "shop" || place.placeType === "sight") {
    return "see";
  } else if (place.placeType === "bar") {
    return "drink";
  }

  return null;
}

export function experienceToExploreItem(exp: Experience): ExploreItem {
  const exploreItem: ExploreItem = {
    id: exp.id,
    tab: "do",
    subtype: exp.experienceType ?? null,
    area: exp.destination
      ? {
          id: exp.destination.ID,
          slug: exp.destination.post_name,
          label: exp.destination.post_title,
        }
      : null,
    beenThere: typeof exp.doneIt === "object" ? true : false,
    title: exp.title,
    text: exp.shortDescription,
    link: primaryLink(getExperienceLinks(exp)),
    image: Array.isArray(exp.images)
      ? exp.images[0] && typeof exp.images[0] === "object"
        ? exp.images[0]
        : null
      : null,
    filters: exp.filters,
  };

  return exploreItem;
}

export function articleToExploreItem(article: CleanArticle): ExploreItem {
  const exploreItem: ExploreItem = {
    id: article.id,
    tab: "articles",
    subtype: article.articleCategory ?? null,
    area: article.destination
      ? {
          id: article.destination.ID,
          slug: article.destination.post_name,
          label: article.destination.post_title,
        }
      : null,
    beenThere: false,
    title: article.title,
    text: article.excerpt,
    link: {
      href: getArticleHref(article),
      external: false,
      label: "Read article",
      kind: "page",
    },
    image: article.heroImage,
    filters: [],
  };

  return exploreItem;
}
