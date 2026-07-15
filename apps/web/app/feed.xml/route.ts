import { NextResponse } from "next/server";
import { getSubstantialArticles } from "@/lib/content";
import { buildRssFeed } from "@/content/feeds";

export async function GET() {
  const articles = await getSubstantialArticles();
  return new NextResponse(buildRssFeed(articles), {
    headers: { "content-type": "application/rss+xml; charset=utf-8", "x-robots-tag": "noindex, follow" }
  });
}
