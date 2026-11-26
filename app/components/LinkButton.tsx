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
  size = "md",
}: {
  link: ItemLink | null;
  variant?: keyof typeof VARIANTS;
  short?: boolean;
  className?: string;
  children?: ReactNode;
  size?: "sm" | "md";
}) {
  if (!link) return null;
  return (
    <MaybeLink
      link={link}
      className={`rounded-full font-medium text-center ${
        size === "md"
          ? "py-2.5 px-5"
          : size === "sm"
          ? "text-sm py-1.5 px-4"
          : ""
      } ${VARIANTS[variant]} ${className}`}
    >
      {children ?? (short ? SHORT_LABELS[link.kind] : link.label)}
    </MaybeLink>
  );
}
