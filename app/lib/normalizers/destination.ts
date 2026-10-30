import { Destination } from "@/app/types/app/destination";
import { WPDestination } from "@/app/types/wordpress/destination";
import { toTerm } from "./place";

export function mapDestinationWithPlacesAndSubDestinationsAndPosts(
  destination: WPDestination
): Destination {
  const acf = destination.acf;
  const normalizedDestination: Destination = {
    id: destination.id,
    slug: destination.slug,
    title: destination.title.rendered,
    parentDestination: acf.parent_destination ? acf.parent_destination : null,
    destinationType:
      acf.destination_type && typeof acf.destination_type === "object"
        ? toTerm(acf.destination_type)
        : null,
    heroImage:
      acf.hero_image && typeof acf.hero_image === "object"
        ? acf.hero_image
        : null,
    heroIntro: acf.hero_intro ?? "",
    cardDescription: acf.card_description ?? "",
    heroTags:
      acf.hero_tags && Array.isArray(acf.hero_tags)
        ? acf.hero_tags.flatMap((tag) => (tag ? [tag] : []))
        : [],
    practicalInfo:
      acf.practical_info && typeof acf.practical_info === "object"
        ? {
            bestTime: acf.practical_info.best_time ?? "",
            tripPlanningNote: acf.practical_info.trip_planning_note ?? "",
            budgetNote: acf.practical_info.budget_note ?? "",
            transportNote: acf.practical_info.transport_note ?? "",
            foodTip: acf.practical_info.food_tip ?? "",
          }
        : null,
    travelStyles:
      acf.travel_styles && Array.isArray(acf.travel_styles)
        ? acf.travel_styles.map((item) => ({
            style:
              item.style && typeof item.style === "object"
                ? toTerm(item.style)
                : null,
            summary: item.summary ?? "",
            whereToStay:
              item.where_to_stay && typeof item.where_to_stay === "object"
                ? {
                    stayNote: item.where_to_stay.stay_note ?? "",
                    primaryPlace:
                      item.where_to_stay.primary_place &&
                      typeof item.where_to_stay.primary_place === "object"
                        ? item.where_to_stay.primary_place
                        : null,
                    alternativePlaces:
                      item.where_to_stay.alternative_places &&
                      Array.isArray(item.where_to_stay.alternative_places)
                        ? item.where_to_stay.alternative_places
                        : [],
                  }
                : null,
            whatToDo:
              item.what_to_do && typeof item.what_to_do === "object"
                ? {
                    focus: item.what_to_do.focus ?? "",
                    skip: item.what_to_do.skip ?? "",
                    bestExperiences:
                      item.what_to_do.best_experiences &&
                      Array.isArray(item.what_to_do.best_experiences)
                        ? item.what_to_do.best_experiences
                        : [],
                  }
                : null,
            suggestedPlan:
              item.suggested_plan && Array.isArray(item.suggested_plan)
                ? item.suggested_plan.flatMap((day) =>
                    day
                      ? [{ title: day.title ?? "", text: day.text ?? "" }]
                      : []
                  )
                : [],
          }))
        : [],
    whichRegion:
      acf.which_region && Array.isArray(acf.which_region)
        ? acf.which_region.flatMap((item) =>
            item
              ? [
                  {
                    label: item.label ?? "",
                    destinations: Array.isArray(item.destinations)
                      ? item.destinations
                      : [],
                    why: item.why ?? "",
                  },
                ]
              : []
          )
        : null,
    featuredSubdestinations:
      acf.featured_subdestinations &&
      Array.isArray(acf.featured_subdestinations)
        ? acf.featured_subdestinations
        : [],
    picks: acf.picks && Array.isArray(acf.picks) ? acf.picks : [],
    articleSections:
      acf.article_sections && Array.isArray(acf.article_sections)
        ? acf.article_sections.flatMap((section) =>
            section && typeof section === "object"
              ? [
                  {
                    title: section.title ?? "",
                    category:
                      section.category && typeof section.category === "object"
                        ? toTerm(section.category)
                        : null,
                    manualArticles:
                      section.manual_articles &&
                      Array.isArray(section.manual_articles)
                        ? section.manual_articles
                        : [],
                    initialItemsCount: section.initial_items_count
                      ? section.initial_items_count
                      : 0,
                    loadMoreCount: section.load_more_count
                      ? section.load_more_count
                      : 0,
                  },
                ]
              : []
          )
        : [],
  };

  return normalizedDestination;
}

export function getTravelStylePlaceIDs(destination: WPDestination) {
  return Array.isArray(destination.acf.travel_styles)
    ? destination.acf.travel_styles.flatMap((style) => [
        ...(style.where_to_stay.primary_place
          ? [style.where_to_stay.primary_place.ID]
          : []),
        ...(style.where_to_stay.alternative_places
          ? style.where_to_stay.alternative_places.map((place) => place.ID)
          : []),
        ...(style.what_to_do.best_experiences
          ? style.what_to_do.best_experiences.map((place) => place.ID)
          : []),
      ])
    : [];
}
