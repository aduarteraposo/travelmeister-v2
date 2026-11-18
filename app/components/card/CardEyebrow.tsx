import { ReactNode } from "react";

export default function CardEyebrow({
  children,
}: {
  children: ReactNode | null;
}) {
  if (!children) return null;

  return <p className="text-xs mb-2">{children}</p>;
}
