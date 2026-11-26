import { ReactNode } from "react";

export default function CardBody({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 flex-1 flex flex-col items-baseline">{children}</div>
  );
}
