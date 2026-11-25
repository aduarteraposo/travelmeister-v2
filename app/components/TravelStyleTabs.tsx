"use client";

import { useState } from "react";
import { TravelStyle } from "./../types/app/destination";
import TabPanelStay from "./TabPanelStay";
import TabPanelDo from "./TabPanelDo";
import TabPanelPlan from "./TabPanelPlan";
import TabPanel from "./TabPanel";
import TabPanelHeadline from "./TabPanelHeadline";
import { Place } from "../types/app/place";
import { Experience } from "../types/app/experience";

export default function TravelStyleTabs({
  travelStyles,
  placesById,
  experiencesById,
}: {
  travelStyles: TravelStyle[];
  placesById: Record<number, Place>;
  experiencesById: Record<number, Experience>;
}) {
  const [activeTab, setActiveTab] = useState<string>(
    travelStyles.length > 0
      ? travelStyles[0].style
        ? travelStyles[0].style.slug
        : ""
      : ""
  );

  return (
    <section>
      <h2 className="font-outdoor text-6xl mb-3">Choose your style</h2>
      <ul className="flex gap-2 mb-3">
        {travelStyles.flatMap(({ style }) =>
          style
            ? [
                <li key={style.slug}>
                  <button
                    className={`rounded-full border px-3 py-1.5 font-medium cursor-pointer ${
                      activeTab === style.slug ? "bg-green-300" : ""
                    }`}
                    role="tab"
                    id={`tab-${style.slug}`}
                    aria-selected={activeTab === style.slug}
                    aria-controls={`panel-${style.slug}`}
                    onClick={() => setActiveTab(style.slug)}
                  >
                    {style.name}
                  </button>
                </li>,
              ]
            : []
        )}
      </ul>

      <div className="grid [grid-template-areas:'stack']">
        {travelStyles.flatMap(
          ({ style, summary, whereToStay, whatToDo, suggestedPlan }) =>
            style ? (
              <div
                key={style.slug}
                id={`panel-${style.slug}`}
                role="tabpanel"
                aria-labelledby={`tab-${style.slug}`}
                className={`[grid-area:stack] transition-opacity duration-300 ${
                  activeTab === style.slug
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                <p className="mb-3 p-4 rounded-xl border">{summary}</p>
                <div className="flex flex-col md:flex-row gap-4">
                  <TabPanel>
                    <TabPanelHeadline>Where to stay</TabPanelHeadline>
                    <TabPanelStay
                      style={style}
                      whereToStay={whereToStay}
                      placesById={placesById}
                    />
                  </TabPanel>
                  <TabPanel>
                    <TabPanelHeadline>What to do</TabPanelHeadline>
                    <TabPanelDo
                      whatToDo={whatToDo}
                      style={style}
                      experiencesById={experiencesById}
                    />
                  </TabPanel>
                  <TabPanel>
                    <TabPanelHeadline>Suggested plan</TabPanelHeadline>
                    <TabPanelPlan plan={suggestedPlan} style={style} />
                  </TabPanel>
                </div>
              </div>
            ) : (
              []
            )
        )}
      </div>
    </section>
  );
}
