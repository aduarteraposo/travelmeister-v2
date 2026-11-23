import { notFound } from "next/navigation";
import { getPageBySlug } from "../lib/wordpress/pages";
import { htmlToPlainText } from "../lib/metadata";

// Renders a WordPress page by slug: used for About and the legal pages.
export default async function ContentPage({ slug }: { slug: string }) {
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  // modified_gmt is UTC without an offset, so add the "Z".
  const updated = new Date(`${page.modified_gmt}Z`).toLocaleDateString(
    "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        {htmlToPlainText(page.title.rendered)}
      </h1>
      <p className="text-sm text-gray-600 mb-10">Last updated {updated}</p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </article>
  );
}
