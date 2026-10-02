import { describe, expect, it } from "vitest";
import {
  DEFAULT_DESCRIPTION,
  htmlToPlainText,
  toMetaDescription,
} from "./metadata";

describe("htmlToPlainText", () => {
  it("removes tags and decodes entities", () => {
    expect(
      htmlToPlainText("<p>Paris&#8217;s best &amp; cosiest&nbsp;hotels</p>\n")
    ).toBe("Paris’s best & cosiest hotels");
  });

  it("decodes hex entities", () => {
    expect(htmlToPlainText("Caf&#xE9;")).toBe("Café");
  });
});

describe("toMetaDescription", () => {
  it("falls back to the default description for empty input", () => {
    expect(toMetaDescription("")).toBe(DEFAULT_DESCRIPTION);
    expect(toMetaDescription(undefined)).toBe(DEFAULT_DESCRIPTION);
    expect(toMetaDescription("<p></p>\n")).toBe(DEFAULT_DESCRIPTION);
  });

  it("removes the WordPress excerpt suffix", () => {
    expect(toMetaDescription("<p>Great hotels in Paris [&hellip;]</p>")).toBe(
      "Great hotels in Paris"
    );
  });

  it("truncates long text at a word boundary", () => {
    const description = toMetaDescription("word ".repeat(50));

    expect(description).toHaveLength(160);
    expect(description?.endsWith("word…")).toBe(true);
  });

  it("cuts a single overlong word to the limit", () => {
    expect(toMetaDescription("a".repeat(200))).toHaveLength(160);
  });
});
