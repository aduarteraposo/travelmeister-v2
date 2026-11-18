import Link from "next/link";
import { ReactNode } from "react";

export default function CardTitle({
  href,
  children,
}: {
  href: string | undefined;
  children: ReactNode;
}) {
  return (
    <h4 className="font-semibold text-lg leading-tight mb-2">
      {href ? (
        <Link className="after:inset-0 after:absolute" href={href}>
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </h4>
  );
}
