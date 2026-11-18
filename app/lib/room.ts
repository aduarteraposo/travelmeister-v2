import { Room } from "../types/app/place";

const EVIDENCE_ORDER = [
  "Stayed here",
  "Confirmed by hotel",
  "Guest photos",
  "Satellite images",
] as const;

export function getRoomPrivacy(room: Room): string {
  const privacy = room.privacyLevel
    ? `${room.privacyLevel.value} - ${room.privacyLevel.label}`
    : "Not specified";

  return privacy;
}

export function getRoomViews(room: Room): string {
  return room.views
    .map((v) => v.view?.name)
    .filter(Boolean)
    .join(", ");
}

export function getRoomFeatures(room: Room): string {
  return room.features
    .map((f) => f.name)
    .filter(Boolean)
    .join(", ");
}

export function getRoomEvidence(room: Room, date: Date | null): string {
  const evidence = EVIDENCE_ORDER.find((item) =>
    room.evidence.some((e) => e === item)
  );

  return [
    evidence,
    evidence === "Stayed here" && date
      ? `${date?.toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        })}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}
