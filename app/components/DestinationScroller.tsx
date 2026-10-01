import { ReactNode } from "react";
import DestinationTeaser from "./DestinationTeaser";

export default function DestinationScroller({
  children,
}: {
  children: ReactNode;
}) {
  return <ul className="flex  gap-4 overflow-auto">{children}</ul>;
}
