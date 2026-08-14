import type { MetadataRoute } from "next";
import { getAuthors, getIndexableArticles, getIndexableGlossaryTerms, getTags } from "@/lib/content";
import { articlePath, formats, siteUrl } from "@/lib/formats";
import { africanRegions, regionPath } from "@/lib/regions";
import { isArchiveIndexable, isAuthorIndexable } from "@/lib/content-quality";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, terms, authors, topics, brands] = await Promise.all([
    getIndexableArticles(),
    getIndexableGlossaryTerms(),
    getAuthors(),
    getTags("topic"),
    getTags("brand")
  ]);
  const staticPaths = [
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
  const qualifiedFormats = Object.entries(formats).filter(([key, format]) =>
    isArchiveIndexable(articles.filter((article) => article.format === key).length, format.description)
  ).map(([, format]) => format);
  const qualifiedAuthors = authors.filter((author) => isAuthorIndexable(author, articles.filter((article) => article.author.slug === author.slug).length));
  const qualifiedTopics = topics.filter((topic) => isArchiveIndexable(articles.filter((article) => article.tags.some((tag) => tag.slug === topic.slug)).length, `Stories, glossary entries, and explainers connected to ${topic.name.toLowerCase()}.`));
  const qualifiedBrands = brands.filter((brand) => isArchiveIndexable(articles.filter((article) => article.tags.some((tag) => tag.slug === brand.slug)).length, `Independent coverage, buying context, and practical explainers involving ${brand.name}.`));
  const qualifiedRegions = africanRegions.filter((region) => isArchiveIndexable(articles.filter((article) => article.regions?.some((item) => item.slug === region.slug)).length, region.description));
  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() })),
    ...qualifiedFormats.map((format) => ({ url: `${siteUrl}${format.path}`, lastModified: new Date() })),
    ...qualifiedRegions.map((region) => ({ url: `${siteUrl}${regionPath(region)}`, lastModified: new Date() })),
    ...articles.map((article) => ({
      url: `${siteUrl}${articlePath(article.format, article.slug)}`,
      lastModified: new Date(article.updatedAt)
    })),
    ...terms.map((term) => ({ url: `${siteUrl}/glossary/${term.slug}`, lastModified: new Date() })),
    ...qualifiedAuthors.map((author) => ({ url: `${siteUrl}/authors/${author.slug}`, lastModified: new Date() })),
    ...qualifiedTopics.map((topic) => ({ url: `${siteUrl}/topics/${topic.slug}`, lastModified: new Date() })),
    ...qualifiedBrands.map((brand) => ({ url: `${siteUrl}/brands/${brand.slug}`, lastModified: new Date() }))
  ];
}
