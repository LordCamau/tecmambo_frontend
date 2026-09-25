import type { MetadataRoute } from "next";
import { getAuthors, getIndexableArticles, getIndexableGlossaryTerms, getTags } from "@/lib/content";
import { articlePath, formats, siteUrl } from "@/lib/formats";
import { africanRegions, regionPath } from "@/lib/regions";
import { isArchiveIndexable, isAuthorIndexable } from "@/lib/content-quality";
import { latestArticleUpdatedAt } from "@/lib/sitemap-freshness";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, terms, authors, topics, brands] = await Promise.all([
    getIndexableArticles(),
    getIndexableGlossaryTerms(),
    getAuthors(),
    getTags("topic"),
    getTags("brand")
  ]);
  const qualifiedFormats = Object.entries(formats).filter(([key, format]) =>
    isArchiveIndexable(articles.filter((article) => article.format === key).length, format.description)
  ).map(([, format]) => format);
  const qualifiedAuthors = authors.filter((author) => isAuthorIndexable(author, articles.filter((article) => article.author.slug === author.slug).length));
  const qualifiedTopics = topics.filter((topic) => isArchiveIndexable(articles.filter((article) => article.tags.some((tag) => tag.slug === topic.slug)).length, `Stories, glossary entries, and explainers connected to ${topic.name.toLowerCase()}.`));
  const qualifiedBrands = brands.filter((brand) => isArchiveIndexable(articles.filter((article) => article.tags.some((tag) => tag.slug === brand.slug)).length, `Independent coverage, buying context, and practical explainers involving ${brand.name}.`));
  const qualifiedRegions = africanRegions.filter((region) => isArchiveIndexable(articles.filter((article) => article.regions?.some((item) => item.slug === region.slug)).length, region.description));
  const latestArticle = latestArticleUpdatedAt(articles);
  const latestAfricaArticle = latestArticleUpdatedAt(articles.filter((article) => article.regions?.some((region) => region.group === "Africa")));
  const latestTerm = terms.reduce((value, term) => Math.max(value, new Date(term.updatedAt).getTime()), 0);
  return [
    { url: `${siteUrl}/`, ...(latestArticle ? { lastModified: new Date(latestArticle) } : {}) },
    { url: `${siteUrl}/latest`, ...(latestArticle ? { lastModified: new Date(latestArticle) } : {}) },
    { url: `${siteUrl}/glossary`, ...(latestTerm ? { lastModified: new Date(latestTerm) } : {}) },
    { url: `${siteUrl}/africa`, ...(latestAfricaArticle ? { lastModified: new Date(latestAfricaArticle) } : {}) },
    ...["/about", "/authors", "/contact", "/editorial-policy", "/editorial-standards", "/corrections", "/terms", "/privacy", "/cookies", "/compare-phones"].map((path) => ({ url: `${siteUrl}${path}` })),
    ...qualifiedFormats.map((format) => {
      const formatKey = Object.entries(formats).find(([, candidate]) => candidate.path === format.path)?.[0];
      const lastModified = latestArticleUpdatedAt(articles.filter((article) => article.format === formatKey));
      return { url: `${siteUrl}${format.path}`, ...(lastModified ? { lastModified: new Date(lastModified) } : {}) };
    }),
    ...qualifiedRegions.map((region) => {
      const lastModified = latestArticleUpdatedAt(articles.filter((article) => article.regions?.some((item) => item.slug === region.slug)));
      return { url: `${siteUrl}${regionPath(region)}`, ...(lastModified ? { lastModified: new Date(lastModified) } : {}) };
    }),
    ...articles.map((article) => ({
      url: `${siteUrl}${articlePath(article.format, article.slug)}`,
      lastModified: new Date(article.updatedAt)
    })),
    ...terms.map((term) => ({ url: `${siteUrl}/glossary/${term.slug}`, lastModified: new Date(term.updatedAt) })),
    ...qualifiedAuthors.map((author) => ({ url: `${siteUrl}/authors/${author.slug}`, lastModified: new Date(latestArticleUpdatedAt(articles.filter((article) => article.author.slug === author.slug))!) })),
    ...qualifiedTopics.map((topic) => ({ url: `${siteUrl}/topics/${topic.slug}`, lastModified: new Date(latestArticleUpdatedAt(articles.filter((article) => article.tags.some((tag) => tag.slug === topic.slug)))!) })),
    ...qualifiedBrands.map((brand) => ({ url: `${siteUrl}/brands/${brand.slug}`, lastModified: new Date(latestArticleUpdatedAt(articles.filter((article) => article.tags.some((tag) => tag.slug === brand.slug)))!) }))
  ];
}
