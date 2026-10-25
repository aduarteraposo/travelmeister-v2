import { groupEntries } from "../lib/group-entries";
import { Section } from "../types/app/article";
import { Experience } from "../types/app/experience";
import { Item } from "../types/app/item";
import { Place } from "../types/app/place";
import EntryCard from "./EntryCard";

const GROUP_NAMES: Record<string, string> = {
  boutique: "Boutique",
  luxury: "Luxury",
  budget: "Budget",
  family: "Family",
};

export default function ArticleSection({
  section,
  articleDestinationId,
  display,
}: {
  section: Section<Item, Place | Experience>;
  articleDestinationId: number;
  display: {
    grouped: boolean;
    neighborhoodLabels: boolean;
    cardSize: string;
  };
}) {
  const groups = display.grouped
    ? groupEntries(section.entries)
    : [{ label: "", entries: section.entries }];

  return (
    <section key={section.title} className="first:mt-0 mt-28 last:mb-28 mb-0">
      {section.title.length > 0 && (
        <h2 className="mb-4 md:mb-8 text-3xl">{section.title}</h2>
      )}
      {section.introText.length > 0 && (
        <div
          className="prose mb-16"
          dangerouslySetInnerHTML={{ __html: section.introText }}
        ></div>
      )}

      {groups.map((group, index) => (
        <div
          className="mb-12 last:mb-0"
          key={group.label ? group.label : index}
        >
          {GROUP_NAMES[group.label] && (
            <h3 className="font-outdoor text-5xl mb-2">
              {GROUP_NAMES[group.label]}
            </h3>
          )}
          <ul
            className={`${
              display.cardSize === "small"
                ? "flex gap-3 overflow-x-auto snap-x no-scrollbar items-start"
                : ""
            }`}
          >
            {group.entries.map((entry) => (
              <EntryCard
                key={entry.key}
                entry={entry}
                neighborhoodLabels={display.neighborhoodLabels}
                articleDestinationId={articleDestinationId}
                cardSize={display.cardSize}
              />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
