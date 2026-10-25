import { Section } from "../types/app/article";
import { Experience } from "../types/app/experience";
import { Item } from "../types/app/item";
import type { Place } from "../types/app/place";
import ArticleSection from "./ArticleSection";

export default function EntryList({
  sections,
  grouped,
}: {
  sections: Section<Item, Place | Experience>[];
  grouped: boolean;
}) {
  return ();
}
