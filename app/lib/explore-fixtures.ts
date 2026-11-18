import { ExploreItem } from "../types/app/explore";

// Shared test data for lib/explore.ts and useExploreFilters.
// Destination = Berlin (id 1) with two neighbourhoods: Mitte (2), Kreuzberg (3).

export const BERLIN_ID = 1;

const BERLIN = { id: 1, slug: "berlin", label: "Berlin" };
const MITTE = { id: 2, slug: "mitte", label: "Mitte" };
const KREUZBERG = { id: 3, slug: "kreuzberg", label: "Kreuzberg" };

const term = (id: number, slug: string) => ({ id, slug, name: slug });

const ROMANTIC = term(20, "romantic");
const ROOFTOP = term(21, "rooftop");

function item(overrides: Partial<ExploreItem> & { id: number }): ExploreItem {
  return {
    tab: null,
    subtype: null,
    area: null,
    filters: [],
    beenThere: false,
    title: `Item ${overrides.id}`,
    link: null,
    image: null,
    ...overrides,
  } as ExploreItem;
}

export const ITEMS: ExploreItem[] = [
  item({ id: 1, tab: "stay", area: MITTE, subtype: term(10, "boutique"), filters: [ROMANTIC], beenThere: true }),
  item({ id: 2, tab: "stay", area: KREUZBERG, subtype: term(11, "design") }),
  item({ id: 3, tab: "eat", area: KREUZBERG, subtype: term(12, "italian"), filters: [ROMANTIC], beenThere: true }),
  item({ id: 4, tab: "drink", area: MITTE, subtype: term(13, "cocktail-bar"), filters: [ROOFTOP] }),
  item({ id: 5, tab: "articles", area: BERLIN, subtype: term(14, "stay") }),
];

export const ids = (items: ExploreItem[]) => items.map((i) => i.id);
