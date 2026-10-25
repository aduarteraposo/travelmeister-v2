import { describe, expect, it } from "vitest";
import { groupEntries } from "./group-entries";

function entry(id: number, groupLabel: string) {
  return { id, groupLabel };
}

function summary(groups: { label: string; entries: { id: number }[] }[]) {
  return groups.map((g) => [g.label, g.entries.map((e) => e.id)]);
}

describe("groupEntries", () => {
  it("puts entries with the same label into one group", () => {
    const result = groupEntries([
      entry(1, "Luxury"),
      entry(2, "Luxury"),
      entry(3, "Boutique"),
    ]);

    expect(summary(result)).toEqual([
      ["Luxury", [1, 2]],
      ["Boutique", [3]],
    ]);
  });

  it("orders groups by the first appearance of their label", () => {
    const result = groupEntries([
      entry(1, "Budget"),
      entry(2, "Luxury"),
      entry(3, "Boutique"),
    ]);

    expect(result.map((g) => g.label)).toEqual([
      "Budget",
      "Luxury",
      "Boutique",
    ]);
  });

  it("merges labels that are not next to each other and keeps entry order", () => {
    const result = groupEntries([
      entry(1, "Luxury"),
      entry(2, "Boutique"),
      entry(3, "Luxury"),
    ]);

    expect(summary(result)).toEqual([
      ["Luxury", [1, 3]],
      ["Boutique", [2]],
    ]);
  });

  it("keeps entries without a label as their own group", () => {
    const result = groupEntries([
      entry(1, ""),
      entry(2, "Luxury"),
      entry(3, ""),
    ]);

    expect(summary(result)).toEqual([
      ["", [1, 3]],
      ["Luxury", [2]],
    ]);
  });

  it("returns an empty array for no entries", () => {
    expect(groupEntries([])).toEqual([]);
  });
});
