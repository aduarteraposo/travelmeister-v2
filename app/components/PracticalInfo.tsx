import type { PracticalInfo } from "../types/wordpress";
import InfoPiece from "./InfoPiece";

type InfoKey =
  | "ideal_stay"
  | "best_time"
  | "budget"
  | "transport_note"
  | "food_tip";

const en_json: Record<InfoKey, string> = {
  ideal_stay: "Ideal stay",
  best_time: "Best time to visit",
  budget: "Budget",
  transport_note: "Getting around",
  food_tip: "Local Tip",
};

export default function PracticalInfo({ info }: { info: PracticalInfo }) {
  const {
    best_time,
    trip_planning_note,
    budget_note,
    transport_note,
    food_tip,
  } = info;

  const infoArray: { key: InfoKey; value: string }[] = [
    { key: "best_time", value: best_time },
    { key: "ideal_stay", value: trip_planning_note },
    { key: "budget", value: budget_note },
    { key: "transport_note", value: transport_note },
    { key: "food_tip", value: food_tip },
  ];

  return (
    <ul className="flex flex-col flex-wrap md:flex-row md:flex-nowrap lg:flex-col justify-center gap-y-4">
      {infoArray.map((item) => (
        <li key={item.key} className={`px-2 text-center md:min-w-1/5`}>
          <InfoPiece label={en_json[item.key]} value={item.value} />
        </li>
      ))}
    </ul>
  );
}
