import { describe, expect, it } from "vitest";
import { rankArticles } from "./related-articles";
import { CleanArticle } from "../types/app/article";

const PARIS = 1;
const MONTMARTRE = 2;
const MARAIS = 3;
const FRANCE = 4;

function article(
  id: number,
  destinationId: number,
  { categoryId, hotelStyle }: { categoryId?: number; hotelStyle?: string } = {}
): CleanArticle {
  return {
    id,
    destination: { ID: destinationId },
    articleCategory: categoryId ? { term_id: categoryId } : null,
    hotelStyle: hotelStyle ?? null,
  } as CleanArticle;
}

describe("rankArticles", () => {
  it("on a neighborhood, ranks the parent above a sibling", () => {
    const sibling = article(10, MARAIS);
    const parent = article(11, PARIS);

    const result = rankArticles(
      [sibling, parent],
      MONTMARTRE,
      true,
      undefined,
      PARIS,
      null
    );

    expect(result.map((a) => a.id)).toEqual([11, 10]);
  });
  it("an article with the same destination ranks first", () => {
    const sibling = article(10, MARAIS);
    const parent = article(11, PARIS);
    const same = article(12, MONTMARTRE);

    const result = rankArticles(
      [sibling, parent, same],
      MONTMARTRE,
      true,
      undefined,
      PARIS,
      null
    );

    expect(result.map((a) => a.id)).toEqual([12, 11, 10]);
  });
  it("on a city, the same destination ranks above a child", () => {
    const child = article(10, MARAIS);
    const same = article(12, PARIS);

    const destinationIsNeighborhood = false;

    const result = rankArticles(
      [same, child],
      PARIS,
      destinationIsNeighborhood,
      undefined,
      FRANCE,
      null
    );

    expect(result.map((a) => a.id)).toEqual([12, 10]);
  });
  it("a child with matching style and category beats a same-destination article with a different style", () => {
    const same = article(12, PARIS, {
      categoryId: 1,
      hotelStyle: "boutique",
    });
    const child = article(10, MARAIS, {
      categoryId: 1,
      hotelStyle: "luxury",
    });

    const destinationIsNeighborhood = false;

    const result = rankArticles(
      [same, child],
      PARIS,
      destinationIsNeighborhood,
      1,
      FRANCE,
      "luxury"
    );

    expect(result.map((a) => a.id)).toEqual([10, 12]);
  });
  it("if one of the articles has no style, there’s no penalty.", () => {
    const child1 = article(12, MONTMARTRE, {
      categoryId: 1,
      hotelStyle: "boutique",
    });
    const child2 = article(10, MARAIS, {
      categoryId: 1,
    });

    const destinationIsNeighborhood = false;

    const result = rankArticles(
      [child1, child2],
      PARIS,
      destinationIsNeighborhood,
      1,
      FRANCE,
      "luxury"
    );

    expect(result.map((a) => a.id)).toEqual([10, 12]);
  });
});
