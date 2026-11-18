import Image from "next/image";
import { Place } from "../types/app/place";
import {
  getRoomEvidence,
  getRoomFeatures,
  getRoomPrivacy,
  getRoomViews,
} from "../lib/room";
import ImageWithFallback from "./ImageWithFallback";

export default function RoomTable({ hotel }: { hotel: Place }) {
  return (
    <table className="text-sm">
      <thead className="bg-black text-white">
        <tr className="text-left rounded-t-xl">
          <th className="px-4 py-3 rounded-tl-xl">Image</th>
          <th className="px-4 py-3">Room</th>
          <th className="px-4 py-3">What you see</th>
          <th className="px-4 py-3">Ask for</th>
          <th className="px-4 py-3">Privacy</th>
          <th className="px-4 py-3">Features</th>
          <th className="px-4 py-3 rounded-tr-xl">How we know</th>
        </tr>
      </thead>
      <tbody>
        {hotel.rooms.map((room, index) => (
          <tr
            key={room.categoryName}
            className={index % 2 !== 0 ? "bg-gray-100" : ""}
          >
            <td
              className={`p-4 ${
                index === hotel.rooms.length - 1 ? "rounded-bl-xl" : ""
              }`}
            >
              <ImageWithFallback
                image={room.images?.[0]}
                imageClasses="w-32 aspect-16/10 rounded-xl"
                fallbackClasses={`
                  ${index % 2 !== 0 ? "bg-gray-200" : "bg-gray-100"} text-xs`}
              />
            </td>
            <td className="p-4">
              <h3 className="font-medium text-base mb-1">
                {room.categoryName}
              </h3>
              <p className="text-xs">{room.note}</p>
            </td>
            <td className="p-4">{getRoomViews(room)}</td>
            <td className="p-4">{room.askFor}</td>
            <td className="p-4">
              <p className="mb-1">{getRoomPrivacy(room)}</p>
              <p className="text-xs">{room.privacyNote}</p>
            </td>
            <td className="p-4">{getRoomFeatures(room)}</td>
            <td
              className={`p-4 ${
                index === hotel.rooms.length - 1 ? "rounded-br-xl" : ""
              }`}
            >
              <p className="whitespace-pre-line">
                {getRoomEvidence(room, hotel.beenThere)}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
