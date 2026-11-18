import { Article, CleanArticle } from "../types/app/article";
import { Destination } from "../types/app/destination";
import { Experience } from "../types/app/experience";
import { Place } from "../types/app/place";

export function getArticleHref(article: Article | CleanArticle): string {
  return `/${article.urlDestination}/${article.slug}`;
}

export function getHotelHref(hotel: Place) {
  return `/${hotel.urlDestination}/hotels/${hotel.slug}`;
}

export function getExperienceHref(exp: Experience) {
  return `/${exp.urlDestination}/experiences/${exp.slug}`;
}

export function getDestinationHref(dest: Destination) {
  return `/${dest.slug}`;
}
