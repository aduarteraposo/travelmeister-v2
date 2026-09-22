import { NextResponse } from "next/server";
import { getPostsByCategoryAndDestination } from "@/app/lib/wordpress/post";
import { parseArticlesQueryParams } from "@/app/lib/api/articles-query-params";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const params = parseArticlesQueryParams(searchParams);

  if (!params) {
    return NextResponse.json(
      { error: "Missing required params" },
      { status: 400 }
    );
  }

  const { categoryId, destinationId, perPage, offset } = params;

  const excludeIds = params.exclude.split(",").filter(Boolean).map(Number);

  const data = await getPostsByCategoryAndDestination({
    categoryId,
    destinationId,
    perPage,
    offset,
    exclude: excludeIds,
  });

  return NextResponse.json(data);
}
