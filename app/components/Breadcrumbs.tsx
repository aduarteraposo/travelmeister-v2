import Link from "next/link";
import { getParentDestinations } from "../lib/wordpress/destination";
import { WPDestination } from "../types/wordpress/destination";
import { Destination } from "../types/app/destination";
import { Article } from "../types/app/article";

type Breadcrumb = {
  label: string;
  href?: string;
} | null;

type BreadcrumbsProps = {
  article?: Article;
  destination: WPDestination | Destination;
};

export default async function Breadcrumbs({
  article,
  destination,
}: BreadcrumbsProps) {
  const ancestorTree = await getParentDestinations(destination);

  const breadcrumbs: Breadcrumb[] = [
    {
      label: "Home",
      href: "/",
    },
    ...ancestorTree.map((parent) => ({
      label: parent.title.rendered,
      href: `/${parent.slug}`,
    })),
    article
      ? {
          label: article.title,
        }
      : null,
  ].filter(Boolean);

  return (
    <ul className="px-2 md:px-0 mt-2 md:mt-4 flex items-center gap-1 md:gap-2 text-xs md:text-sm md:pl-4">
      {breadcrumbs.map((item, index) => (
        <li
          key={index}
          className={`flex items-center gap-1 md:gap-2 ${
            index < breadcrumbs.length - 1
              ? "whitespace-nowrap"
              : "min-w-0 wrap-break-word"
          }`}
        >
          {index > 0 && <span className="text-gray-400">/</span>}

          {item &&
            (item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              item.label
            ))}
        </li>
      ))}
    </ul>
  );
}
