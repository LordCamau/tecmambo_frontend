import { siteUrl } from "@/lib/formats";
import type { Article } from "@/lib/types";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function latestArticleUpdatedAt(articles: Article[]) {
  const latest = articles.reduce((value, article) => Math.max(value, new Date(article.updatedAt).getTime()), 0);
  return latest > 0 ? new Date(latest).toISOString() : undefined;
}

export function buildSitemapIndex(paths: string[]) {
  const urls = paths.map((path) => `<sitemap><loc>${escapeXml(`${siteUrl}${path}`)}</loc></sitemap>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</sitemapindex>`;
}
