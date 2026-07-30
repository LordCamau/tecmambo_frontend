import { NextResponse } from "next/server";
import { getIndexableArticles } from "@/lib/content";
import { buildGoogleNewsSitemap } from "@/content/feeds";

export async function GET() {
  const articles = await getIndexableArticles();
  return new NextResponse(buildGoogleNewsSitemap(articles), {
    headers: { "content-type": "application/xml; charset=utf-8" }
  });
}
