import type { PlaceWithSection } from "../types/wordpress";
import Hotel from "./Hotel";

type placesection = {
  section_title: string;
  places: PlaceWithSection[];
};

export default function HotelList({ places }: { places: PlaceWithSection[] }) {
  const sectionTitles = [
    ...new Set(places.map((place) => place.section_title)),
  ];
  const placesections: placesection[] = sectionTitles.map((title) => {
    const section = {
      section_title: title,
      places: places.filter((hotel) => hotel.section_title === title),
    };

    return section;
  });

  return placesections.map((list) => (
    <div key={list.section_title}>
      {list.section_title.length > 0 && (
        <h2 className="mb-4 md:mb-8 text-3xl">{list.section_title}</h2>
      )}
      <ul>
        {list.places.map((place, index) => (
          <Hotel key={`${place.slug}-${index}`} hotel={place} />
        ))}
      </ul>
    </div>
  ));
}
