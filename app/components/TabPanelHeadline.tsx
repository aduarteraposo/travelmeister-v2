import { ReactNode } from "react";

export default function TabPanelHeadline({
  children,
}: {
  children: ReactNode;
}) {
  return <h4 className="text-xl text-gray-700 font-bold mb-3">{children}</h4>;
}
