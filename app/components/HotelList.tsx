import type { HotelWithSection } from "../types/wordpress";
import Hotel from "./Hotel";

type HotelSection = {
  section_title: string;
  hotels: HotelWithSection[];
};

export default function HotelList({ hotels }: { hotels: HotelWithSection[] }) {
  const sectionTitles = [
    ...new Set(hotels.map((hotel) => hotel.section_title)),
  ];
  const hotelSections: HotelSection[] = sectionTitles.map((title) => {
    const section = {
      section_title: title,
      hotels: hotels.filter((hotel) => hotel.section_title === title),
    };

    return section;
  });

  return hotelSections.map((list) => (
    <div key={list.section_title}>
      {list.section_title.length > 0 && (
        <h2 className="mb-4 md:mb-8 text-3xl">{list.section_title}</h2>
      )}
      <ul>
        {list.hotels.map((hotel) => (
          <Hotel key={hotel.name} hotel={hotel} />
        ))}
      </ul>
    </div>
  ));
}
