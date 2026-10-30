import { WPImage } from "../wordpress/media";
import { WPItemRef } from "../wordpress/post";
import { Term } from "./place";

export type Destination = {
  id: number;
  slug: string;
  title: string;
  destinationType: Term | null;
  parentDestination: WPItemRef | null;
  heroImage: WPImage | null;
  heroIntro: string;
  cardDescription: string;
  heroTags: { label: string }[];
  practicalInfo: PracticalInfo | null;
  travelStyles: TravelStyle[];
  whichRegion:
    | { label: string; destinations: WPItemRef[]; why: string }[]
    | null;
  featuredSubdestinations: WPItemRef[];
  picks: WPItemRef[];
  articleSections: ArticleSection[];
};

export type PracticalInfo = {
  bestTime: string;
  tripPlanningNote: string;
  budgetNote: string;
  transportNote: string;
  foodTip: string;
};

export type TravelStyle = {
  style: Term | null;
  summary: string;
  whereToStay: {
    stayNote: string;
    primaryPlace: WPItemRef | null;
    alternativePlaces: WPItemRef[];
  } | null;
  whatToDo: {
    focus: string;
    skip: string;
    bestExperiences: WPItemRef[];
  } | null;
  suggestedPlan: { title: string; text: string }[];
};

export type ArticleSection = {
  title: string;
  category: Term | null;
  manualArticles: WPItemRef[];
  initialItemsCount: number;
  loadMoreCount: number;
};
