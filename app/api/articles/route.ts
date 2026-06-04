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

  const excludeParam = params.exclude ? `&exclude=${params.exclude}` : "";

  const data = await getPostsByCategoryAndDestination(
    params.categoryId,
    params.destinationId,
    params.perPage,
    excludeParam,
    params.offset
  );

  return NextResponse.json(data);
}
