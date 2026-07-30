import { NextResponse } from "next/server";
import { getIndexableGlossaryTerms, getSubstantialArticles } from "@/lib/content";
import { buildLlmsTxt } from "@/content/llms";

export async function GET() {
  const [articles, terms] = await Promise.all([getSubstantialArticles(), getIndexableGlossaryTerms()]);
  return new NextResponse(buildLlmsTxt(articles, terms), {
    headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex, follow" }
  });
}
