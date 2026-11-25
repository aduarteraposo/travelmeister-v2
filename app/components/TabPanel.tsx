import { ReactNode } from "react";

export default function TabPanel({ children }: { children: ReactNode }) {
  return <div className="flex-1 p-4 border rounded-xl">{children}</div>;
}
