import { NextResponse } from "next/server";
import { getIndexableGlossaryTerms } from "@/lib/content";
import { siteUrl } from "@/lib/formats";
import { noIndexHeaders } from "@/lib/noindex-response";

export async function GET() {
  const terms = await getIndexableGlossaryTerms();
  const body = [
    "# tecMAMBO Glossary",
    "",
    "> Plain-English technology definitions designed for readers, search, and answer engines.",
    "",
    ...terms.map((term) => `- [${term.term}](${siteUrl}/glossary/${term.slug}) - ${term.oneLiner}`)
  ].join("\n");
  return new NextResponse(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      ...noIndexHeaders,
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}
