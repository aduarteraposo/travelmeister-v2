import { ReactNode } from "react";
import { ItemLink } from "../types/app/link";
import MaybeLink from "./MaybeLink";

const VARIANTS = {
  primary: "bg-black text-white border border-black",
  secondary: "border border-black",
} as const;

const SHORT_LABELS = { page: "Details", booking: "Book", map: "Map" } as const;

export default function LinkButton({
  link,
  variant = "primary",
  short,
  className = "",
  children,
}: {
  link: ItemLink | null;
  variant?: keyof typeof VARIANTS;
  short?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  if (!link) return null;
  return (
    <MaybeLink
      link={link}
      className={`inline-block rounded-full py-3 px-6 font-medium text-center ${VARIANTS[variant]} ${className}`}
    >
      {children ?? (short ? SHORT_LABELS[link.kind] : link.label)}
    </MaybeLink>
  );
}
