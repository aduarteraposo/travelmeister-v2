import { WPItemRef } from "../types/wordpress/post";

export default function Recommendations({ picks }: { picks: WPItemRef[] }) {
  return (
    <section>
      <h2 className="text-[3.375rem]/14 mb-4 font-outdoor text-gray-800">
        Our picks
      </h2>
      <div className="md:flex">
        <div>
          <h3 className="text-lg font-semibold text-stone-800 mb-2">Stay</h3>
          <ul>
            {/* {hotels.map((hotel, index) => (
              <li key={`${hotel.place.slug}_${index}`} className="w-60 mb-6">
                <div className="rounded-xl border border-gray-300">
                  <div className="aspect-video mb-1">
                    <Image
                      className="rounded-t-xl h-full object-cover"
                      src={hotel.place.images[0].url}
                      alt={hotel.place.images[0].alt}
                      width={hotel.place.images[0].width}
                      height={hotel.place.images[0].height}
                    />
                  </div>

                  <div className="px-3 pb-2">
                    <h4 className="font-semibold text-base mb-1">
                      {hotel.place.title}
                    </h4>
                    <p className="text-sm text-gray-700">
                      Elegant • Iconic • Pool
                    </p>
                  </div>
                </div>
              </li>
            ))} */}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-stone-800 mb-2">
            Experiences
          </h3>
        </div>
      </div>
    </section>
  );
}
