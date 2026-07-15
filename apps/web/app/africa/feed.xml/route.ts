import { NextResponse } from "next/server";
import { buildRssFeed } from "@/content/feeds";
import { getSubstantialAfricanArticles } from "@/lib/content";

export async function GET() {
  const articles = await getSubstantialAfricanArticles();
  return new NextResponse(buildRssFeed(articles, "tecMAMBO African tech", "/africa/feed.xml"), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "x-robots-tag": "noindex, follow",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}
