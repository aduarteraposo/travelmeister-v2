import { SpecialOccasion } from "../lib/hotel";
import InfoPair from "./InfoPair";

export default function SpecialOccasionBlock({
  adultsOnly,
  notes,
}: {
  adultsOnly: boolean;
  notes: SpecialOccasion;
}) {
  const { celebrations, nightView, sunset, noise } = notes;
  return (
    <>
      <ul className="">
        <li key={"adults-only"}>
          <InfoPair label="Adults only:" value={adultsOnly ? "Yes" : "No"} />
        </li>
        {celebrations && (
          <li key={"celebrations"}>
            <InfoPair label="Celebrations:" value={celebrations} />
          </li>
        )}
        {nightView && (
          <li key={"at-night"}>
            <InfoPair label="At night:" value={nightView} />
          </li>
        )}
        {sunset && (
          <li key={"sunset"}>
            <InfoPair label="Sunset:" value={sunset} />
          </li>
        )}
        {noise && (
          <li key={"noise"}>
            <InfoPair label="Noise:" value={noise} />
          </li>
        )}
      </ul>
    </>
  );
}
