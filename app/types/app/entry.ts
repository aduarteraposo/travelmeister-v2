import { Place } from "./place";
import { Item } from "./item";
import { Experience } from "./experience";

export type Entry = {
  item: Item | null;
  editorial_note: string;
  group_label: string;
  options: (Place | Experience)[];
};
