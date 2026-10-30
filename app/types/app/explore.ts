import { EXPLORE_TABS } from "@/app/lib/explore-tabs-config";
import { Term } from "./place";
import { WPImage } from "../wordpress/media";

export type ExploreItem = {
  id: number;
  tab: ExploreTab["id"] | null;
  subtype: Term | null;
  area: { id: number; slug: string; label: string } | null;
  filters: Term[];
  beenThere: boolean;
  title: string;
  link: { href: string; external: boolean; label: string } | null;
  image: WPImage | null;
};

export type ExploreTab = (typeof EXPLORE_TABS)[number];
