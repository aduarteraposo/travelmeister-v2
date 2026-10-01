import { ReactNode } from "react";
import DestinationTeaser from "./DestinationTeaser";

export default function DestinationScroller({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ul className="flex  gap-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </ul>
  );
}
