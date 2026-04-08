import { WPHotel, Tag } from "../types/wordpress";

export function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function mapHotelsById(hotels: WPHotel[]): Record<string, WPHotel> {
  return Object.fromEntries(
    hotels.map((hotel) => [slugify(hotel.name), hotel])
  );
}

function getHotelHighlightsFromTags(tags: Tag[], amount: number = tags.length) {
  return tags
    .slice(0, amount)
    .map((tag) => tag.label)
    .join(", ");
}

function getHotelCTA(hotel: WPHotel) {
  return {
    label: "See details",
    url: hotel.booking_links[0]?.link.url || "",
  };
}

function getHotelHighlights(hotel: WPHotel) {
  return getHotelHighlightsFromTags(hotel.tags, 3);
}

export function getHotelAttributesArray(hotels: WPHotel[]) {
  const rows: RowDefinition[] = [
    {
      label: "Ideal for",
      getValue: (hotel: WPHotel) => hotel.ideal_for?.join(", "),
    },
    { label: "Area", getValue: (hotel: WPHotel) => hotel.area },
    { label: "Price", getValue: (hotel: WPHotel) => hotel.price_level },
    {
      label: "Highlights",
      getValue: (hotel: WPHotel) => getHotelHighlights(hotel),
    },
    { label: "", getValue: (hotel: WPHotel) => getHotelCTA(hotel) },
  ];

  const hotelAttributesArray: HotelAttributeRow[] = rows.map((row) => [
    row.label,
    hotels.map(row.getValue),
  ]);

  return hotelAttributesArray;
}

export function firstCapitalLetter(str: string) {
  const firstLetter = str.charAt(0);
  const restWord = str.slice(1);

  return `${firstLetter.toUpperCase()}${restWord}`;
}

type HotelAttributeValue = string | CTAObject;
type HotelAttributeRow = [string, HotelAttributeValue[]];
type RowDefinition = {
  label: string;
  getValue: (hotel: WPHotel) => HotelAttributeValue;
};
type CTAObject = {
  label: string;
  url: string;
};
