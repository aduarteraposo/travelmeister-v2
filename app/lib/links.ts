import { Article } from "../types/app/article";
import { Destination } from "../types/app/destination";
import { Experience } from "../types/app/experience";
import { Place } from "../types/app/place";

export function getArticleHref(
  article: Pick<Article, "slug" | "urlDestination">
): string {
  return `/${article.urlDestination}/${article.slug}`;
}

export function getHotelHref(hotel: Pick<Place, "slug" | "urlDestination">) {
  return `/${hotel.urlDestination}/hotels/${hotel.slug}`;
}

export function getExperienceHref(exp: Experience) {
  return `/${exp.urlDestination}/experiences/${exp.slug}`;
}

export function getDestinationHref(dest: Pick<Destination, "slug">) {
  return `/${dest.slug}`;
}
