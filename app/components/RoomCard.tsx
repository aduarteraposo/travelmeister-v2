import Image from "next/image";
import { Room } from "../types/app/place";
import ImageCarousel from "./ImageCarousel";
import {
  getRoomEvidence,
  getRoomFeatures,
  getRoomPrivacy,
  getRoomViews,
} from "../lib/room";
import RoomCardInfoBlock from "./RoomCardInfoPiece";
import ImageWithFallback from "./ImageWithFallback";

export default function RoomCard({
  room,
  hotelBeenThere,
}: {
  room: Room;
  hotelBeenThere: Date | null;
}) {
  return (
    <article className="rounded-xl border p-6 h-full">
      <div className="mb-3">
        {room.images && room.images.length > 1 ? (
          <div className="h-48">
            <ImageCarousel images={room.images} controls="bottom" />
          </div>
        ) : (
          <ImageWithFallback
            image={room.images?.[0]}
            className="rounded-xl w-full aspect-video"
          />
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-6 w-[calc(100%-6rem)]">
          {room.categoryName}
        </h3>
        {room.views.length > 0 && (
          <RoomCardInfoBlock title="What you see" text={getRoomViews(room)} />
        )}
        {room.askFor && (
          <RoomCardInfoBlock title="Ask for" text={room.askFor} />
        )}
        {room.privacyLevel && (
          <RoomCardInfoBlock title="Privacy" text={getRoomPrivacy(room)} />
        )}
        {room.features.length > 0 && (
          <RoomCardInfoBlock title="Features" text={getRoomFeatures(room)} />
        )}
        {room.evidence.length > 0 && (
          <RoomCardInfoBlock
            title="How we know"
            text={getRoomEvidence(room, hotelBeenThere)}
          />
        )}
      </div>
    </article>
  );
}
