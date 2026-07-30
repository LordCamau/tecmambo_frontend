import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { articleToMarkdown } from "@/content/markdown";
import { getArticleBySlug } from "@/lib/content";
import { formats } from "@/lib/formats";
import { noIndexHeaders } from "@/lib/noindex-response";
import { isContentPubliclyEligible } from "@/lib/content-quality";

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section") ?? "";
  const slug = request.nextUrl.searchParams.get("slug") ?? "";
  const article = await getArticleBySlug(slug);
  if (!article || !isContentPubliclyEligible(article) || formats[article.format].path.slice(1) !== section) notFound();

  return new NextResponse(articleToMarkdown(article), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      ...noIndexHeaders,
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}

export async function HEAD(request: NextRequest) {
  const response = await GET(request);
  return new NextResponse(null, {
    status: response.status,
    headers: response.headers
  });
}
