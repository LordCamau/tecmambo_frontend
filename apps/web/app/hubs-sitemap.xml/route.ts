import { buildUrlSitemap, hubSitemapEntries, xmlResponse } from "@/lib/sitemap-builders";

export const revalidate = 3600;

export async function GET() {
  return xmlResponse(buildUrlSitemap(await hubSitemapEntries()));
}
