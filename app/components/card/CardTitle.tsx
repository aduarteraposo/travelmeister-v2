import { ItemLink } from "@/app/types/app/link";
import { ReactNode } from "react";
import MaybeLink from "../MaybeLink";

export default function CardTitle({
  link,
  children,
}: {
  link?: ItemLink | null;
  children: ReactNode;
}) {
  const titleLink = link ? link : null;

  return (
    <h4 className="font-semibold text-lg leading-tight mb-2">
      <MaybeLink
        className={link ? "after:inset-0 after:absolute" : ""}
        link={titleLink}
      >
        {children}
      </MaybeLink>
    </h4>
  );
}
