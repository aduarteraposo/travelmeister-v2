import type { PracticalInfo } from "../types/app/destination";
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
  const { bestTime, tripPlanningNote, budgetNote, transportNote, foodTip } =
    info;

  const infoArray: { key: InfoKey; value: string }[] = [
    { key: "best_time", value: bestTime },
    { key: "ideal_stay", value: tripPlanningNote },
    { key: "budget", value: budgetNote },
    { key: "transport_note", value: transportNote },
    { key: "food_tip", value: foodTip },
  ];

  return (
    <div className="rounded-lg px-4 md:px-8 py-6 bg-green-300 mb-8">
      <ul className="flex flex-col md:flex-row justify-evenly gap-4">
        {infoArray.map((item) => (
          <li key={item.key} className={`px-2 text-center flex-1`}>
            <InfoPiece label={en_json[item.key]} value={item.value} />
          </li>
        ))}
      </ul>
    </div>
  );
}
