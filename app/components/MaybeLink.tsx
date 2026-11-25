import Link from "next/link";
import { ReactNode } from "react";
import { ItemLink } from "../types/app/link";

// Renders the right element for a link: next/link for our pages,
// <a target="_blank"> for other sites, plain text when there is no link.
export default function MaybeLink({
  link,
  className,
  children,
}: {
  link: ItemLink | null;
  className?: string;
  children: ReactNode;
}) {
  if (!link) return <span className={className}>{children}</span>;

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel={link.sponsored ? "sponsored noopener" : "noopener"}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {children}
    </Link>
  );
}
