import { TravelStyle } from "../types/app/destination";
import { Place } from "../types/app/place";
import HotelCardMini from "./HotelCardMini";
import MaybeLink from "./MaybeLink";
import { getPlaceLinks, primaryLink } from "../lib/item-links";

export default function TabPanelStay({
  whereToStay,
  style,
  placesById,
}: {
  whereToStay: TravelStyle["whereToStay"];
  style: TravelStyle["style"];
  placesById: Record<number, Place>;
}) {
  return (
    <>
      <dl className="mb-3">
        <dt className="font-semibold">
          Best areas{style ? ` for ${style?.name}:` : ""}
        </dt>
        <dd>{whereToStay?.stayNote}</dd>
      </dl>

      <dl className="mb-4">
        <dt className="font-semibold mb-2">Recommended Hotel:</dt>
        {whereToStay?.primaryPlace && (
          <dd>
            {<HotelCardMini hotel={placesById[whereToStay.primaryPlace.ID]} />}
          </dd>
        )}
      </dl>
      {whereToStay && (
        <dl>
          <dt className="font-semibold">Alternatives:</dt>
          <dd>
            <ul className="flex gap-1.5">
              {whereToStay.alternativePlaces.map((place, index) => {
                const hotel = placesById[place.ID];

                return (
                  <li key={place.post_name}>
                    <MaybeLink
                      className="underline"
                      link={primaryLink(getPlaceLinks(hotel))}
                    >
                      {place.post_title}
                    </MaybeLink>

                    {whereToStay &&
                    index === whereToStay.alternativePlaces.length - 1
                      ? ""
                      : ", "}
                  </li>
                );
              })}
            </ul>
          </dd>
        </dl>
      )}
    </>
  );
}
