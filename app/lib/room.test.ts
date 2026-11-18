import { describe, expect, it } from "vitest";
import { getRoomEvidence } from "./room";
import { Room } from "../types/app/place";

const room1 = { evidence: ["Stayed here", "Guest photos"] } as Room;
const room2 = { evidence: ["Confirmed by hotel", "Guest photos"] } as Room;
const room3 = { evidence: [] as string[] } as Room;
const beenThere = new Date(2026, 8, 18);

describe("evidence", () => {
  it("returns 'Stayed here' over any other evidence", () => {
    expect(getRoomEvidence(room1, null)).toEqual("Stayed here");
  });

  it("returns the date in a new line when the evidence is 'Stayed here' and the date is set and valid", () => {
    expect(getRoomEvidence(room1, beenThere)).toEqual("Stayed here\nSep 26");
  });

  it("returns 'Confirmed by hotel' over 'Guest photos'", () => {
    expect(getRoomEvidence(room2, null)).toEqual("Confirmed by hotel");
  });

  it("returns no date if evidence is not 'Stayed here'", () => {
    expect(getRoomEvidence(room2, beenThere)).toEqual("Confirmed by hotel");
  });

  it("returns an empty string if evidence is empty", () => {
    expect(getRoomEvidence(room3, beenThere)).toEqual("");
  });
});
