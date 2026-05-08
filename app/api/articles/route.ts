import { NextResponse } from "next/server";
import { getArticlesByCategoryAndDestination } from "@/app/lib/wordpress";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const categoryId = Number(searchParams.get("categoryId"));
  const destinationId = Number(searchParams.get("destinationId"));
  const perPage = Number(searchParams.get("perPage"));
  const offset = Number(searchParams.get("offset"));
  const exclude = searchParams.get("exclude") ?? "";

  if (!categoryId || !destinationId || !perPage || Number.isNaN(offset)) {
    return NextResponse.json(
      { error: "Missing required params" },
      { status: 400 }
    );
  }

  const excludeParam = exclude ? `&exclude=${exclude}` : "";

  const data = await getArticlesByCategoryAndDestination(
    categoryId,
    destinationId,
    perPage,
    excludeParam,
    offset
  );

  return NextResponse.json(data);
}
