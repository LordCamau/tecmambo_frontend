import { NextResponse } from "next/server";
import { getSubstantialArticles } from "@/lib/content";
import { buildJsonFeed } from "@/content/feeds";

export async function GET() {
  const articles = await getSubstantialArticles();
  return NextResponse.json(buildJsonFeed(articles), {
    headers: { "x-robots-tag": "noindex, follow" }
  });
}
