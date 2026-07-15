import { NextResponse } from "next/server";
import { getArticles } from "@/lib/content";
import { buildGoogleNewsSitemap } from "@/content/feeds";
import { isSubstantialArticle } from "@/lib/article-quality";

export async function GET() {
  const articles = (await getArticles()).filter(isSubstantialArticle);
  return new NextResponse(buildGoogleNewsSitemap(articles), {
    headers: { "content-type": "application/xml; charset=utf-8" }
  });
}
