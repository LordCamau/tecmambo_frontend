import { isSubstantialArticle } from "@/lib/article-quality";
import { getArticles, getAuthors, getGlossaryTerms, getTags } from "@/lib/content";
import { articlePath, formats, siteUrl } from "@/lib/formats";
import { africanRegions, regionPath } from "@/lib/regions";
import { allSectionTopicPaths, wearableFilters, wearableFilterPath } from "@/lib/site-structure";
import type { Article } from "@/lib/types";

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
    "/advertise",
    "/newsletter",
    "/contact",
    "/editorial-standards",
    "/privacy",
    "/cookies",
    "/compare-phones",
    "/search"
  ];
  return paths.map((path) => ({
    loc: `${siteUrl}${path}`,
    lastmod: isoDate(),
    changefreq: path === "/" || path === "/latest" ? "daily" : "monthly",
    priority: path === "/" ? 1 : 0.7
  }));
}

export async function hubSitemapEntries(): Promise<UrlSitemapEntry[]> {
  const [articles, terms, authors, topics, brands] = await Promise.all([
    getArticles(),
    getGlossaryTerms(),
    getAuthors(),
    getTags("topic"),
    getTags("brand")
  ]);
  const termTopicPaths = uniquePaths(
    terms.flatMap((term) =>
      term.topics.map((topic) => `/glossary/topic/${topic.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`)
    )
  );
  const archivePaths = uniquePaths([...allSectionTopicPaths(), ...wearableFilters.map((filter) => wearableFilterPath(filter.slug))]);
  const paths = [
    ...Object.values(formats).map((format) => format.path),
    ...archivePaths,
    ...termTopicPaths,
    ...glossaryTopicPaths(articles),
    ...africanRegions.map((region) => regionPath(region)),
    ...authors.map((author) => `/authors/${author.slug}`),
    ...topics.map((topic) => `/topics/${topic.slug}`),
    ...brands.map((brand) => `/brands/${brand.slug}`)
  ];
  return uniquePaths(paths).map((path) => ({
    loc: `${siteUrl}${path}`,
    lastmod: isoDate(),
    changefreq: "weekly",
    priority: 0.6
  }));
}

export async function articleSitemapEntries(): Promise<UrlSitemapEntry[]> {
  const articles = await getArticles();
  return articles.filter(isSubstantialArticle).map((article) => ({
    loc: `${siteUrl}${articlePath(article.format, article.slug)}`,
    lastmod: isoDate(article.updatedAt),
    changefreq: article.format === "news" || article.format === "business" ? "weekly" : "monthly",
    priority: 0.8
  }));
}

export async function imageSitemapXml() {
  const articles = (await getArticles()).filter(isSubstantialArticle);
  const urls = articles
    .map((article) => {
      const pageUrl = `${siteUrl}${articlePath(article.format, article.slug)}`;
      const images = [article.image, ...(article.inlineImages ?? [])];
      const imageEntries = images
        .map(
          (image) =>
            `<image:image><image:loc>${escapeXml(new URL(image.src, siteUrl).toString())}</image:loc><image:caption>${escapeXml(image.credit)}</image:caption><image:title>${escapeXml(image.alt)}</image:title></image:image>`
        )
        .join("");
      return `<url><loc>${escapeXml(pageUrl)}</loc>${imageEntries}</url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}</urlset>`;
}
