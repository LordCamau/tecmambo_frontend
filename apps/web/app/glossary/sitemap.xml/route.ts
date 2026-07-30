import { NextResponse } from "next/server";
import { getIndexableGlossaryTerms } from "@/lib/content";
import { siteUrl } from "@/lib/formats";
import { noIndexHeaders } from "@/lib/noindex-response";

export async function GET() {
  const terms = await getIndexableGlossaryTerms();
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...terms.map(
      (term) =>
        `<url><loc>${siteUrl}/glossary/${term.slug}</loc><lastmod>${term.updatedAt}</lastmod><changefreq>monthly</changefreq></url>`
    ),
    "</urlset>"
  ].join("");
  return new NextResponse(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      ...noIndexHeaders,
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}
