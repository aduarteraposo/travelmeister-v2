import Image from "next/image";
import { FeaturedPlace } from "../types/wordpress";

export default function Recommendations({
  hotels,
  restaurants,
  tours,
  sights,
}: {
  hotels: FeaturedPlace[];
  restaurants: FeaturedPlace[];
  tours: FeaturedPlace[];
  sights: FeaturedPlace[];
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Our picks</h2>
      <div className="md:flex">
        <div>
          <h3 className="text-lg font-semibold text-stone-800 mb-2">Stay</h3>
          <ul>
            {hotels.map((hotel) => (
              <li key={hotel.place.slug} className="w-60 mb-6">
                <div className="rounded-xl border border-gray-300">
                  <div className="aspect-16/9 mb-1">
                    <Image
                      className="rounded-t-xl h-full object-cover"
                      src={hotel.place.acf.images[0].url}
                      alt={hotel.place.acf.images[0].alt}
                      width={hotel.place.acf.images[0].width}
                      height={hotel.place.acf.images[0].height}
                    />
                  </div>

                  <div className="px-3 pb-2">
                    <h4 className="font-semibold text-base mb-1">
                      {hotel.place.title.rendered}
                    </h4>
                    <p className="text-sm text-gray-700">
                      Elegant • Iconic • Pool
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-stone-800 mb-2">
            Experiences
          </h3>
          <ul>
            {tours.map((tour) => (
              <li key={tour.place.slug}>
                <div className="space-y-2">
                  <div className="aspect-3/2">
                    <Image
                      className="rounded-lg h-full object-cover"
                      src={tour.place.acf.images[0].url}
                      alt={tour.place.acf.images[0].alt}
                      width={tour.place.acf.images[0].width}
                      height={tour.place.acf.images[0].height}
                    />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-medium text-base">Molitor Paris</h4>
                    <p className="text-sm text-gray-500">
                      Elegant • Iconic • Pool
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
