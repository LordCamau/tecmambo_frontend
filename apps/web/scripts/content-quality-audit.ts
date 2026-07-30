import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { articlePath } from "../lib/formats";
import { articleWordCount } from "../lib/article-quality";
import {
  articleQualityIssues,
  glossaryQualityScore,
  glossaryWordCount,
  isArticleIndexable,
  isContentPubliclyEligible,
  isGlossaryTermIndexable,
  isHandsOnReview
} from "../lib/content-quality";
import { articles, authors, brands, glossaryTerms, topics } from "../lib/sample-data";

type AuditItem = Record<string, unknown> & {
  id: string;
  title: string;
  slug: string;
  url: string;
  type: string;
  recommendedAction: string;
  reason: string;
};

const reportsDir = resolve(process.cwd(), "../../reports");
const internalLinkPattern = /\[[^\]]+\]\((\/[a-z0-9_/?#=&.-]+)\)/gi;
const externalLinkPattern = /https?:\/\/[^\s)\]]+/gi;

function countMatches(value: string, pattern: RegExp) {
  return [...value.matchAll(pattern)].length;
}

function clean(value: string) {
  return value.replace(/\u2014/g, " - ").replace(/&mdash;|&#8212;|&#x2014;/gi, " - ");
}

const articleItems: AuditItem[] = articles.map((article) => {
  const body = [article.subhead, article.excerpt, article.whyItMatters, ...article.body].join("\n");
  const issues = articleQualityIssues(article);
  const eligible = isContentPubliclyEligible(article);
  const indexable = isArticleIndexable(article);
  const externalLinks = new Set([...(body.match(externalLinkPattern) ?? []), ...(article.sources?.map((source) => source.url) ?? [])]);
  const internalLinks = countMatches(body, internalLinkPattern);
  const reason = issues.length ? issues.map((issue) => `${issue.code}: ${issue.message}`).join(" ") : "No blocking quality issue detected.";
  return {
    id: article.id,
    title: clean(article.title),
    slug: article.slug,
    url: articlePath(article.format, article.slug),
    type: "article",
    format: article.format,
    contentFormat: article.contentFormat ?? null,
    wordCount: articleWordCount(article),
    publicationStatus: article.publicationStatus ?? "publish",
    editorialStatus: article.editorialStatus ?? "published",
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    author: article.author.name,
    categories: [article.format],
    tags: article.tags.map((tag) => tag.name),
    leadImage: article.image.src,
    leadImageAlt: clean(article.image.alt),
    leadImageCredit: clean(article.image.credit),
    inlineImageCount: article.inlineImages?.length ?? 0,
    externalLinkCount: externalLinks.size,
    internalLinkCount: internalLinks,
    originalMedia: article.hasOriginalPhotography ?? false,
    reviewScore: article.verdict?.score ?? null,
    reviewMethod: article.reviewMethod ?? null,
    originalTesting: article.hasOriginalTesting ?? false,
    handsOnEvidenceComplete: isHandsOnReview(article),
    specificationRows: article.goDeeper?.specs.length ?? 0,
    placeholderIssues: issues.filter((issue) => issue.code.includes("marker") || issue.code.includes("draft") || issue.code.includes("instruction") || issue.code.includes("needed")),
    robots: indexable ? "index, follow" : "noindex, follow",
    sitemap: indexable,
    homepageEligible: eligible,
    archiveEligible: eligible,
    recommendedAction: eligible ? "keep" : "retain and revise outside discovery",
    reason: clean(reason),
    issues
  };
});

const glossaryItems: AuditItem[] = glossaryTerms.map((term) => {
  const indexable = isGlossaryTermIndexable(term);
  return {
    id: `glossary-${term.slug}`,
    title: clean(term.term),
    slug: term.slug,
    url: `/glossary/${term.slug}`,
    type: "glossary",
    wordCount: glossaryWordCount(term),
    qualityScore: glossaryQualityScore(term),
    publicationStatus: "publish",
    publishedAt: term.publishedAt,
    updatedAt: term.updatedAt,
    author: null,
    categories: term.topics,
    tags: term.aliases,
    leadImage: null,
    inlineImageCount: 0,
    externalLinkCount: term.sources?.length ?? 0,
    internalLinkCount: term.relatedTerms.length,
    originalMedia: false,
    placeholderIssues: [],
    robots: indexable ? "index, follow" : "noindex, follow",
    sitemap: indexable,
    homepageEligible: false,
    archiveEligible: true,
    recommendedAction: indexable ? "keep" : "expand with sourced explanation, reader value, and FAQs",
    reason: indexable ? "Meets the glossary quality threshold." : "Does not yet meet the configurable multi-signal glossary threshold."
  };
});

const staticPaths = ["/", "/latest", "/glossary", "/africa", "/about", "/contact", "/editorial-standards", "/privacy", "/terms", "/cookies", "/advertise", "/newsletter"];
const staticItems: AuditItem[] = staticPaths.map((url) => ({
  id: `page-${url === "/" ? "home" : url.slice(1)}`,
  title: url === "/" ? "Home" : url.slice(1).replaceAll("-", " "),
  slug: url === "/" ? "home" : url.slice(1),
  url,
  type: "page",
  robots: "index, follow",
  sitemap: true,
  homepageEligible: url === "/",
  archiveEligible: false,
  recommendedAction: "keep",
  reason: "Core utility, trust, or discovery page."
}));

const archiveItems: AuditItem[] = [
  ...authors.map((author) => ({ kind: "author", slug: author.slug, title: author.name })),
  ...topics.map((topic) => ({ kind: "topic", slug: topic.slug, title: topic.name })),
  ...brands.map((brand) => ({ kind: "brand", slug: brand.slug, title: brand.name }))
].map(({ kind, slug, title }) => {
  const count = kind === "author"
    ? articles.filter((article) => article.author.slug === slug && isArticleIndexable(article)).length
    : articles.filter((article) => article.tags.some((tag) => tag.slug === slug) && isArticleIndexable(article)).length;
  const indexable = count >= 3;
  return {
    id: `${kind}-${slug}`,
    title,
    slug,
    url: `/${kind === "author" ? "authors" : `${kind}s`}/${slug}`,
    type: "archive",
    eligibleArticleCount: count,
    robots: indexable ? "index, follow" : "noindex, follow",
    sitemap: indexable,
    homepageEligible: false,
    archiveEligible: indexable,
    recommendedAction: indexable ? "keep" : "retain with noindex until the archive has enough eligible stories",
    reason: indexable ? "Archive has at least three eligible stories." : "Archive has fewer than three eligible stories."
  } satisfies AuditItem;
});

const items = [...articleItems, ...glossaryItems, ...staticItems, ...archiveItems];
const summary = {
  generatedAt: new Date().toISOString(),
  source: "repository content model",
  totals: {
    items: items.length,
    articles: articleItems.length,
    publiclyEligibleArticles: articleItems.filter((item) => item.homepageEligible).length,
    excludedArticles: articleItems.filter((item) => !item.homepageEligible).length,
    indexableGlossaryTerms: glossaryItems.filter((item) => item.sitemap).length,
    noindexGlossaryTerms: glossaryItems.filter((item) => !item.sitemap).length
  }
};

mkdirSync(reportsDir, { recursive: true });
writeFileSync(resolve(reportsDir, "content-quality-audit.json"), `${JSON.stringify({ summary, items }, null, 2)}\n`);
const rows = items.map((item) => `| ${item.type} | ${clean(item.title)} | ${item.url} | ${String(item.robots)} | ${item.recommendedAction} | ${clean(item.reason)} |`);
const markdown = [
  "# tecMAMBO content quality audit",
  "",
  `Generated: ${summary.generatedAt}`,
  "",
  `Items audited: ${summary.totals.items}`,
  "",
  `Publicly eligible articles: ${summary.totals.publiclyEligibleArticles}`,
  "",
  `Articles retained outside discovery: ${summary.totals.excludedArticles}`,
  "",
  `Indexable glossary terms: ${summary.totals.indexableGlossaryTerms}`,
  "",
  "## Editorial action groups",
  "",
  `- Keep and index: ${items.filter((item) => item.recommendedAction === "keep" && item.robots === "index, follow").length}`,
  `- Keep but improve: ${glossaryItems.filter((item) => !item.sitemap).length}`,
  `- Noindex temporarily: ${items.filter((item) => item.robots === "noindex, follow").length}`,
  `- Unpublish immediately: ${articleItems.filter((item) => (item.issues as Array<{ code: string }>).some((issue) => issue.code === "not-published")).length}`,
  `- Requires editorial verification: ${articleItems.filter((item) => !item.homepageEligible).length}`,
  `- Requires original testing evidence: ${articleItems.filter((item) => item.format === "review" && item.handsOnEvidenceComplete === false).length}`,
  "- Requires broken-link repair: see `reports/link-audit.md`",
  "- Requires CMS changes: see `docs/cms-editorial-controls.md`",
  "",
  "| Type | Title | URL | Robots | Recommended action | Reason |",
  "| --- | --- | --- | --- | --- | --- |",
  ...rows,
  ""
].join("\n");
writeFileSync(resolve(reportsDir, "content-quality-audit.md"), markdown);

const leaked = articleItems.filter((item) => item.homepageEligible && (item.issues as Array<{ confidence: string }>).some((issue) => issue.confidence === "high"));
console.log(`Audited ${items.length} public content records. ${leaked.length} high-confidence discovery leaks found.`);
if (process.argv.includes("--ci") && leaked.length) process.exitCode = 1;
