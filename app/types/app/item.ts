import { Experience } from "./experience";
import { Place } from "./place";

export type Item =
  | { kind: "hotel"; data: Place }
  | { kind: "place"; data: Place }
  | { kind: "experience"; data: Experience };
