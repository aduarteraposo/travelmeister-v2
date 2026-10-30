import {
  Article,
  ARTICLE_TEMPLATES,
  ArticleTemplate,
  CleanArticle,
  HOTEL_STYLES,
  HotelStyle,
} from "@/app/types/app/article";
import { Item } from "@/app/types/app/item";
import { WPPost } from "@/app/types/wordpress/post";
import { toTerm } from "./place";

export function normalizeArticle(post: WPPost): CleanArticle {
  const article: CleanArticle = {
    id: post.id,
    slug: post.slug,
    title: post.title ? post.title.rendered : "",
    excerpt: post.excerpt ? post.excerpt.rendered : "",
    content: post.content ? post.content.rendered : "",
    destination:
      post.acf.primary_destination &&
      typeof post.acf.primary_destination === "object"
        ? post.acf.primary_destination
        : null,
    urlDestination: post.meta?.url_destination ? post.meta.url_destination : "",
    heroImage:
      post.acf.hero_image && typeof post.acf.hero_image === "object"
        ? {
            id: post.acf.hero_image.id,
            url: post.acf.hero_image.url,
            alt: post.acf.hero_image.alt,
            caption: post.acf.hero_image.caption,
            width: post.acf.hero_image.width,
            height: post.acf.hero_image.height,
          }
        : null,
    articleCategory:
      post.acf.article_category && typeof post.acf.article_category === "object"
        ? toTerm(post.acf.article_category)
        : null,
    articleTemplate: isArticleTemplate(post.acf.article_template)
      ? post.acf.article_template
      : "list",
    sections: Array.isArray(post.acf.list_sections)
      ? post.acf.list_sections.map((section, sIndex) => ({
          title: section.section_title,
          introText: section.intro_text,
          entries: Array.isArray(section.entries)
            ? section.entries.flatMap((entry, eIndex) => {
                if (!entry) return [];
                if (entry.item && typeof entry.item !== "object") return [];

                return [
                  {
                    item:
                      entry.item && typeof entry.item === "object"
                        ? entry.item
                        : null,
                    editorialNote: entry.editorial_note,
                    groupLabel: entry.group_label,
                    options: Array.isArray(entry.options) ? entry.options : [],
                    key: `${sIndex}-${eIndex}`,
                  },
                ];
              })
            : [],
          key: `section-${sIndex}`,
        }))
      : [],
    quickPicks: Array.isArray(post.acf.quick_picks)
      ? post.acf.quick_picks.flatMap((pick) => {
          if (!pick?.item || typeof pick.item !== "object") return [];

          return [
            {
              label: pick.label ?? "",
              reason: pick.reason ?? "",
              ctaText: pick.cta_text || "Check prices",
              item: pick.item,
            },
          ];
        })
      : [],
    itinerary: post.acf.itinerary,
    roomFeature:
      post.acf.room_feature && typeof post.acf.room_feature === "object"
        ? post.acf.room_feature.name
        : "",
    hotelStyle: isHotelStyle(post.acf.hotel_style)
      ? post.acf.hotel_style
      : null,
    sectionsBy: post.acf.sections_by
      ? post.acf.sections_by === "none"
        ? null
        : post.acf.sections_by
      : null,
    featuredRelatedArticles: Array.isArray(post.acf.featured_related_articles)
      ? post.acf.featured_related_articles
      : [],
  };

  return article;
}

export function resolveArticle(
  cleanArticle: CleanArticle,
  itemsById: Record<number, Item>
): Article {
  const article: Article = {
    ...cleanArticle,
    sections: cleanArticle.sections.map((section) => ({
      ...section,
      entries: section.entries.map((entry) => ({
        ...entry,
        item: entry.item ? itemsById[entry.item.ID] ?? null : null,
        options: entry.options.flatMap((option) =>
          itemsById[option.ID]?.data ? [itemsById[option.ID].data] : []
        ),
      })),
    })),
    quickPicks: cleanArticle.quickPicks.flatMap((pick) => {
      const item = itemsById[pick.item.ID]?.data;
      return item
        ? [
            {
              ...pick,
              item,
            },
          ]
        : [];
    }),
  };

  return article;
}

function isArticleTemplate(value: unknown): value is ArticleTemplate {
  return ARTICLE_TEMPLATES.includes(value as ArticleTemplate);
}

function isHotelStyle(value: unknown): value is HotelStyle {
  return HOTEL_STYLES.includes(value as HotelStyle);
}

export function getArticlePlaceIds(article: CleanArticle) {
  const listSectionItems = article.sections.flatMap((section) =>
    section.entries.flatMap((entry) => {
      return [...(entry.item ? [entry.item] : []), ...entry.options];
    })
  );

  const quickPickItems = article.quickPicks.map((pick) => pick.item);

  const articleItems = [...new Set([...listSectionItems, ...quickPickItems])];

  const idsOf = (type: string) => {
    return articleItems.filter((item) => item.post_type === type);
  };

  return {
    placeIds: idsOf("place").map((p) => p.ID),
    experienceIds: idsOf("experience").map((e) => e.ID),
  };
}
