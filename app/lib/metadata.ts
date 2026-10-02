const MAX_DESCRIPTION_LENGTH = 160;

export const DEFAULT_DESCRIPTION =
  "Hand-picked hotels, hostels and travel guides to help you find the right place to stay.";

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

// WordPress returns titles and excerpts as HTML with entities (e.g. &#8217;),
// but meta tags need plain text.
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, 16))
    )
    .replace(/&([a-z]+);/gi, (entity, name) => NAMED_ENTITIES[name] ?? entity)
    .replace(/\s+/g, " ")
    .trim();
}

// Falls back to the site-wide description for empty text. Returning undefined
// would remove the description tag instead of inheriting it from the layout.
export function toMetaDescription(html: string | undefined) {
  const text = htmlToPlainText(html ?? "")
    // WordPress appends " […]" to automatically generated excerpts
    .replace(/\s*\[…\]$/, "");

  if (!text) return DEFAULT_DESCRIPTION;
  if (text.length <= MAX_DESCRIPTION_LENGTH) return text;

  // Cut at the last space within the limit, leaving room for the "…".
  const truncated = text.slice(0, MAX_DESCRIPTION_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");
  const cutAt = lastSpace > 0 ? lastSpace : MAX_DESCRIPTION_LENGTH - 1;
  return `${truncated.slice(0, cutAt).trimEnd()}…`;
}
