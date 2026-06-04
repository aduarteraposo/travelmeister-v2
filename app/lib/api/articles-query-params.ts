import { z } from "zod";

const articlesQueryParamsSchema = z.object({
  categoryId: z.coerce.number().int().positive(),
  destinationId: z.coerce.number().int().positive(),
  perPage: z.coerce.number().int().positive(),
  offset: z.coerce.number().int().min(0),
  exclude: z.string().optional().default(""),
});

export type ArticlesQueryParams = z.infer<typeof articlesQueryParamsSchema>;

export function parseArticlesQueryParams(
  searchParams: URLSearchParams
): ArticlesQueryParams | null {
  const rawParams = Object.fromEntries(searchParams.entries());

  const result = articlesQueryParamsSchema.safeParse(rawParams);

  if (!result.success) return null;

  return result.data;
}
