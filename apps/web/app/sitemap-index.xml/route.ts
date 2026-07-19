import { buildSitemapIndex, xmlResponse } from "@/lib/sitemap-builders";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(
    buildSitemapIndex([
      "/sitemap.xml",
      "/pages-sitemap.xml",
      "/hubs-sitemap.xml",
      "/articles-sitemap.xml",
      "/image-sitemap.xml",
      "/news-sitemap.xml",
      "/glossary/sitemap.xml"
    ])
  );
}
