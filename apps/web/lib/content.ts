import { articles, authors, brands, glossaryTerms, topics } from "@/lib/sample-data";
import type { Article, Format } from "@/lib/types";
import { africanRegions, getAfricaArticles, getArticlesByRegion, getRegion } from "@/lib/regions";
import { isArticleIndexable, isContentPubliclyEligible, isGlossaryTermIndexable } from "@/lib/content-quality";
import { shouldUseWordPress } from "@/lib/cms/env";
import {
  getCmsAfricanArticles,
  getCmsArticleBySlug,
  getCmsArticles,
  getCmsArticlesByFormat,
  getCmsArticlesByTag,
  getCmsArticlesForGlossaryTerm,
  getCmsArticlesForRegion,
  getCmsAuthor,
  getCmsAuthors,
  getCmsGlossaryTerm,
  getCmsGlossaryTerms,
  getCmsGlossaryTermsByTopic,
  getCmsRegionBySlug,
  getCmsRegions,
  getCmsRelatedArticles,
  getCmsRelatedGlossaryTerms,
  getCmsTags,
  withCmsFallback
} from "@/lib/cms/source";

export async function getArticles() {
  return (await getAllArticles()).filter(isContentPubliclyEligible);
}

export async function getAllArticles() {
  if (shouldUseWordPress()) return withCmsFallback("getArticles", getCmsArticles, () => articles);
  return articles;
}

export async function getSubstantialArticles() {
  return (await getArticles()).filter(isArticleIndexable);
}

export async function getIndexableArticles() {
  return (await getAllArticles()).filter(isArticleIndexable);
}

export async function getArticleBySlug(slug: string) {
  const found = shouldUseWordPress()
    ? await withCmsFallback("getArticleBySlug", () => getCmsArticleBySlug(slug), () => articles.find((article) => article.slug === slug) ?? null)
    : articles.find((article) => article.slug === slug) ?? null;
  return found && isContentPubliclyEligible(found) ? found : null;
}

export async function getArticlesByFormat(format: Format) {
  const found = shouldUseWordPress()
    ? await withCmsFallback("getArticlesByFormat", () => getCmsArticlesByFormat(format), () => articles.filter((article) => article.format === format))
    : articles.filter((article) => article.format === format);
  return found.filter(isContentPubliclyEligible);
}

export async function getRegions() {
  if (shouldUseWordPress()) return withCmsFallback("getRegions", getCmsRegions, () => africanRegions);
  return africanRegions;
}

export async function getRegionBySlug(slug: string) {
  if (shouldUseWordPress()) return withCmsFallback("getRegionBySlug", () => getCmsRegionBySlug(slug), () => getRegion(slug));
  return getRegion(slug);
}

export async function getAfricanArticles() {
  const found = shouldUseWordPress() ? await withCmsFallback("getAfricanArticles", getCmsAfricanArticles, () => getAfricaArticles(articles)) : getAfricaArticles(articles);
  return found.filter(isContentPubliclyEligible);
}

export async function getSubstantialAfricanArticles() {
  return (await getAfricanArticles()).filter(isArticleIndexable);
}

export async function getArticlesForRegion(regionSlug: string) {
  const found = shouldUseWordPress()
    ? await withCmsFallback("getArticlesForRegion", () => getCmsArticlesForRegion(regionSlug), () => getArticlesByRegion(articles, regionSlug))
    : getArticlesByRegion(articles, regionSlug);
  return found.filter(isContentPubliclyEligible);
}

export async function getSubstantialArticlesForRegion(regionSlug: string) {
  return (await getArticlesForRegion(regionSlug)).filter(isArticleIndexable);
}

export async function getRelatedArticles(article: Article, limit = 3) {
  if (shouldUseWordPress()) return withCmsFallback("getRelatedArticles", () => getCmsRelatedArticles(article, limit), () => localRelatedArticles(article, limit));
  return localRelatedArticles(article, limit);
}

function localRelatedArticles(article: Article, limit = 3) {
  const tagSlugs = new Set(article.tags.map((tag) => tag.slug));
  return articles
    .filter((candidate) => candidate.id !== article.id && isContentPubliclyEligible(candidate))
    .sort((a, b) => {
      const aScore = a.tags.filter((tag) => tagSlugs.has(tag.slug)).length;
      const bScore = b.tags.filter((tag) => tagSlugs.has(tag.slug)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export async function getGlossaryTerms() {
  if (shouldUseWordPress()) return withCmsFallback("getGlossaryTerms", getCmsGlossaryTerms, () => glossaryTerms);
  return glossaryTerms;
}

export async function getIndexableGlossaryTerms() {
  return (await getGlossaryTerms()).filter(isGlossaryTermIndexable);
}

export async function getGlossaryTerm(slug: string) {
  if (shouldUseWordPress()) return withCmsFallback("getGlossaryTerm", () => getCmsGlossaryTerm(slug), () => glossaryTerms.find((term) => term.slug === slug) ?? null);
  return glossaryTerms.find((term) => term.slug === slug) ?? null;
}

export async function getGlossaryTermsByTopic(topicSlug: string) {
  if (shouldUseWordPress()) {
    return withCmsFallback("getGlossaryTermsByTopic", () => getCmsGlossaryTermsByTopic(topicSlug), () =>
      glossaryTerms.filter((term) =>
        term.topics.some((topic) => topic.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === topicSlug)
      )
    );
  }
  return glossaryTerms.filter((term) => term.topics.some((topic) => topic.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === topicSlug));
}

export async function getRelatedGlossaryTerms(slugs: string[]) {
  if (shouldUseWordPress()) return withCmsFallback("getRelatedGlossaryTerms", () => getCmsRelatedGlossaryTerms(slugs), () => glossaryTerms.filter((term) => new Set(slugs).has(term.slug)));
  const wanted = new Set(slugs);
  return glossaryTerms.filter((term) => wanted.has(term.slug));
}

export async function getArticlesForGlossaryTerm(slug: string) {
  if (shouldUseWordPress()) return withCmsFallback("getArticlesForGlossaryTerm", () => getCmsArticlesForGlossaryTerm(slug), () => localArticlesForGlossaryTerm(slug));
  return localArticlesForGlossaryTerm(slug);
}

function localArticlesForGlossaryTerm(slug: string) {
  const term = glossaryTerms.find((item) => item.slug === slug);
  if (!term) return [];
  const needles = [term.term, ...term.aliases].map((item) => item.toLowerCase());
  return articles
    .filter(isContentPubliclyEligible)
    .filter((article) => {
      const haystack = [article.title, article.subhead, article.excerpt, article.whyItMatters, ...article.body].join(" ").toLowerCase();
      return needles.some((needle) => haystack.includes(needle));
    })
    .slice(0, 4);
}

export async function getAuthors() {
  if (shouldUseWordPress()) return withCmsFallback("getAuthors", getCmsAuthors, () => authors);
  return authors;
}

export async function getAuthor(slug: string) {
  if (shouldUseWordPress()) return withCmsFallback("getAuthor", () => getCmsAuthor(slug), () => authors.find((author) => author.slug === slug) ?? null);
  return authors.find((author) => author.slug === slug) ?? null;
}

export async function getTags(kind: "topic" | "brand") {
  if (shouldUseWordPress()) return withCmsFallback("getTags", () => getCmsTags(kind), () => (kind === "topic" ? topics : brands));
  return kind === "topic" ? topics : brands;
}

export async function getArticlesByTag(slug: string) {
  const found = shouldUseWordPress()
    ? await withCmsFallback("getArticlesByTag", () => getCmsArticlesByTag(slug), () => articles.filter((article) => article.tags.some((tag) => tag.slug === slug)))
    : articles.filter((article) => article.tags.some((tag) => tag.slug === slug));
  return found.filter(isContentPubliclyEligible);
}
