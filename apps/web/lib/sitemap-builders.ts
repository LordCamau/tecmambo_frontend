import { getAuthors, getIndexableArticles, getTags } from "@/lib/content";
import { articlePath, formats, siteUrl } from "@/lib/formats";
import { africanRegions, regionPath } from "@/lib/regions";
import type { Article } from "@/lib/types";
import { isArchiveIndexable, isAuthorIndexable } from "@/lib/content-quality";

export type UrlSitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isoDate(value?: string | Date) {
  return (value ? new Date(value) : new Date()).toISOString();
}

function uniquePaths(paths: string[]) {
  return paths.filter((path, index, all) => all.indexOf(path) === index);
}

function glossaryTopicPaths(articles: Article[]) {
  return uniquePaths(
    articles.flatMap((article) =>
      article.tags
        .filter((tag) => tag.kind === "topic")
        .map((tag) => `/topics/${tag.slug}`)
    )
  );
}

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600"
    }
  });
}

export function buildSitemapIndex(paths: string[]) {
  const urls = paths
    .map(
      (path) => `<sitemap><loc>${escapeXml(`${siteUrl}${path}`)}</loc><lastmod>${isoDate()}</lastmod></sitemap>`
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</sitemapindex>`;
}

export function buildUrlSitemap(entries: UrlSitemapEntry[]) {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "";
      const changefreq = entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : "";
      const priority = typeof entry.priority === "number" ? `<priority>${entry.priority.toFixed(1)}</priority>` : "";
      return `<url><loc>${escapeXml(entry.loc)}</loc>${lastmod}${changefreq}${priority}</url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

export async function pageSitemapEntries(): Promise<UrlSitemapEntry[]> {
  const paths = [
    "/",
    "/latest",
    "/glossary",
    "/africa",
    "/about",
    "/terms",
    "/editorial-standards",
    "/privacy",
    "/cookies",
    "/compare-phones"
  ];
  return paths.map((path) => ({
    loc: `${siteUrl}${path}`,
    lastmod: isoDate(),
    changefreq: path === "/" || path === "/latest" ? "daily" : "monthly",
    priority: path === "/" ? 1 : 0.7
  }));
}

export async function hubSitemapEntries(): Promise<UrlSitemapEntry[]> {
  const [articles, authors, topics, brands] = await Promise.all([
    getIndexableArticles(),
    getAuthors(),
    getTags("topic"),
    getTags("brand")
  ]);
  const qualifiedAuthors = authors.filter((author) => isAuthorIndexable(author, articles.filter((article) => article.author.slug === author.slug).length));
  const qualifiedTopics = topics.filter((topic) => isArchiveIndexable(articles.filter((article) => article.tags.some((tag) => tag.slug === topic.slug)).length, `Stories, glossary entries, and explainers connected to ${topic.name.toLowerCase()}.`));
  const qualifiedBrands = brands.filter((brand) => isArchiveIndexable(articles.filter((article) => article.tags.some((tag) => tag.slug === brand.slug)).length, `Independent coverage, buying context, and practical explainers involving ${brand.name}.`));
  const qualifiedRegions = africanRegions.filter((region) => isArchiveIndexable(articles.filter((article) => article.regions?.some((item) => item.slug === region.slug)).length, region.description));
  const qualifiedFormats = Object.entries(formats).filter(([key, format]) =>
    isArchiveIndexable(articles.filter((article) => article.format === key).length, format.description)
  ).map(([, format]) => format);
  const paths = [
    ...qualifiedFormats.map((format) => format.path),
    ...glossaryTopicPaths(articles),
    ...qualifiedRegions.map((region) => regionPath(region)),
    ...qualifiedAuthors.map((author) => `/authors/${author.slug}`),
    ...qualifiedTopics.map((topic) => `/topics/${topic.slug}`),
    ...qualifiedBrands.map((brand) => `/brands/${brand.slug}`)
  ];
  return uniquePaths(paths).map((path) => ({
    loc: `${siteUrl}${path}`,
    lastmod: isoDate(),
    changefreq: "weekly",
    priority: 0.6
  }));
}

export async function articleSitemapEntries(): Promise<UrlSitemapEntry[]> {
  const articles = await getIndexableArticles();
  return articles.map((article) => ({
    loc: `${siteUrl}${articlePath(article.format, article.slug)}`,
    lastmod: isoDate(article.updatedAt),
    changefreq: article.format === "news" || article.format === "business" ? "weekly" : "monthly",
    priority: 0.8
  }));
}

export async function imageSitemapXml() {
  const articles = await getIndexableArticles();
  const urls = articles
    .map((article) => {
      const pageUrl = `${siteUrl}${articlePath(article.format, article.slug)}`;
      const mediaImages = (article.mediaSlots ?? [])
        .filter((slot) => slot.status === "ready" && slot.type !== "youtube" && slot.src && slot.alt)
        .map((slot) => ({
          src: slot.src!,
          alt: slot.alt!,
          credit: slot.credit ?? "tecMAMBO",
          width: slot.width,
          height: slot.height
        }));
      const images = [article.image, ...(article.inlineImages ?? []), ...mediaImages]
        .filter((image, index, all) => all.findIndex((candidate) => candidate.src === image.src) === index);
      const imageEntries = images
        .map((image) => {
          const caption = image.credit.trim() ? `<image:caption>${escapeXml(image.credit)}</image:caption>` : "";
          return `<image:image><image:loc>${escapeXml(new URL(image.src, siteUrl).toString())}</image:loc>${caption}<image:title>${escapeXml(image.alt)}</image:title></image:image>`;
        })
        .join("");
      return `<url><loc>${escapeXml(pageUrl)}</loc>${imageEntries}</url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}</urlset>`;
}
