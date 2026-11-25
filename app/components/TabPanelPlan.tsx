import { TravelStyle } from "../types/app/destination";

export default function TabPanelPlan({
  plan,
  style,
}: {
  plan: TravelStyle["suggestedPlan"];
  style: TravelStyle["style"];
}) {
  return (
    <>
      <dl>
        {plan.map((day) => (
          <>
            <dt className="font-semibold text-gray-800">{day.title}</dt>
            <dd className="mb-3">{day.text}</dd>
          </>
        ))}
      </dl>
    </>
  );
}
