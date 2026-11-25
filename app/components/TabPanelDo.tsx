import { TravelStyle } from "../types/app/destination";
import { Experience } from "../types/app/experience";
import MaybeLink from "./MaybeLink";
import { getExperienceLinks, primaryLink } from "../lib/item-links";

export default function TabPanelDo({
  style,
  whatToDo,
  experiencesById,
}: {
  style: TravelStyle["style"];
  whatToDo: TravelStyle["whatToDo"];
  experiencesById: Record<number, Experience>;
}) {
  const bestExperiences: Experience[] = whatToDo
    ? whatToDo.bestExperiences
        .flatMap((e) => (e.ID ? [experiencesById[e.ID]] : []))
        .filter(Boolean)
    : [];
  return (
    <>
      <dl className="mb-3">
        <dt className="font-semibold text-gray-800">Focus on:</dt>
        <dd>{whatToDo?.focus}</dd>
      </dl>
      <dl className="mb-3">
        <dt className="font-semibold text-gray-800">Skip:</dt>
        <dd>{whatToDo?.skip}</dd>
      </dl>
      <dl>
        <dt className="font-semibold text-gray-800 mb-1">Best experiences:</dt>
        <dd>
          <ul className="flex gap-1 pl-4">
            {bestExperiences.map((exp) => {
              return (
                <li key={exp.slug} className="list-disc underline">
                  <MaybeLink link={primaryLink(getExperienceLinks(exp))}>
                    {exp.title}
                  </MaybeLink>
                </li>
              );
            })}
          </ul>
        </dd>
      </dl>
    </>
  );
}
