import { getAuthors, getIndexableArticles, getIndexableGlossaryTerms, getTags } from "@/lib/content";
import { articlePath, formats, siteUrl } from "@/lib/formats";
import { africanRegions, regionPath } from "@/lib/regions";
import { isArchiveIndexable, isAuthorIndexable } from "@/lib/content-quality";
export { buildSitemapIndex } from "@/lib/sitemap-freshness";
import { latestArticleUpdatedAt } from "@/lib/sitemap-freshness";

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

function isoDate(value: string | Date) {
  return new Date(value).toISOString();
}

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600"
    }
  });
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
  const [articles, terms] = await Promise.all([getIndexableArticles(), getIndexableGlossaryTerms()]);
  const latestArticle = latestArticleUpdatedAt(articles);
  const latestAfricaArticle = latestArticleUpdatedAt(articles.filter((article) => article.regions?.some((region) => region.group === "Africa")));
  const latestTerm = terms.reduce((value, term) => Math.max(value, new Date(term.updatedAt).getTime()), 0);
  return [
    { loc: `${siteUrl}/`, lastmod: latestArticle, changefreq: "daily", priority: 1 },
    { loc: `${siteUrl}/latest`, lastmod: latestArticle, changefreq: "daily", priority: 0.7 },
    { loc: `${siteUrl}/glossary`, lastmod: latestTerm ? new Date(latestTerm).toISOString() : undefined, changefreq: "monthly", priority: 0.7 },
    { loc: `${siteUrl}/africa`, lastmod: latestAfricaArticle, changefreq: "monthly", priority: 0.7 },
    ...["/about", "/terms", "/editorial-standards", "/privacy", "/cookies", "/compare-phones"].map((path) => ({
      loc: `${siteUrl}${path}`,
      changefreq: "monthly" as const,
      priority: 0.7
    }))
  ];
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
  ).map(([key, format]) => ({ key, format }));
  const entries = [
    ...qualifiedFormats.map(({ key, format }) => ({ path: format.path, articles: articles.filter((article) => article.format === key) })),
    ...qualifiedRegions.map((region) => ({ path: regionPath(region), articles: articles.filter((article) => article.regions?.some((item) => item.slug === region.slug)) })),
    ...qualifiedAuthors.map((author) => ({ path: `/authors/${author.slug}`, articles: articles.filter((article) => article.author.slug === author.slug) })),
    ...qualifiedTopics.map((topic) => ({ path: `/topics/${topic.slug}`, articles: articles.filter((article) => article.tags.some((tag) => tag.slug === topic.slug)) })),
    ...qualifiedBrands.map((brand) => ({ path: `/brands/${brand.slug}`, articles: articles.filter((article) => article.tags.some((tag) => tag.slug === brand.slug)) }))
  ];
  return entries.filter((entry, index, all) => all.findIndex((candidate) => candidate.path === entry.path) === index).map(({ path, articles: hubArticles }) => ({
    loc: `${siteUrl}${path}`,
    lastmod: latestArticleUpdatedAt(hubArticles),
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
          const captionText = "caption" in image && image.caption?.trim() ? image.caption : image.credit;
          const caption = captionText.trim() ? `<image:caption>${escapeXml(captionText)}</image:caption>` : "";
          return `<image:image><image:loc>${escapeXml(new URL(image.src, siteUrl).toString())}</image:loc>${caption}<image:title>${escapeXml(image.alt)}</image:title></image:image>`;
        })
        .join("");
      return `<url><loc>${escapeXml(pageUrl)}</loc>${imageEntries}</url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}</urlset>`;
}
