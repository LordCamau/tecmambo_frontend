import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { articlePath, formats, siteUrl } from "../lib/formats";
import { articles, authors, brands, glossaryTerms, topics } from "../lib/sample-data";
import { articleQualityIssues, glossaryQualityScore, glossaryWordCount, isArchiveIndexable, isArticleIndexable, isContentPubliclyEligible, isGlossaryTermIndexable } from "../lib/content-quality";
import { articleWordCount } from "../lib/article-quality";
import { adsenseEnabled, isArticleMonetizationEligible, isNeverMonetizedPath } from "../lib/monetization";
import { africanRegions, regionPath } from "../lib/regions";
import { filterArticlesByCanonicalTopic, topicArchives } from "../lib/site-structure";

type AuditRow = {
  url: string;
  type: string;
  title: string;
  publicationStatus: string;
  editorialStatus: string;
  indexingStatus: string;
  publiclyDiscoverable: boolean;
  sitemapIncluded: boolean;
  rssIncluded: boolean;
  newsSitemapIncluded: boolean;
  adEligible: boolean;
  canonical: string;
  robotsDecision: string;
  wordCount?: number;
  originalValueType?: string;
  reviewMethod?: string;
  warnings: string[];
  recommendedActions: string[];
};

const reportDir = resolve(process.cwd(), "../../reports");
const now = Date.now();

function articleRow(article: (typeof articles)[number]): AuditRow {
  const path = articlePath(article.format, article.slug);
  const issues = articleQualityIssues(article);
  const publiclyDiscoverable = isContentPubliclyEligible(article);
  const indexable = isArticleIndexable(article);
  const newsSitemapIncluded = indexable
    && ["news", "business"].includes(article.format)
    && article.workflowVersion === "gated"
    && article.sourceChecked === true
    && article.humanEditorApproved === true
    && Boolean(article.editor)
    && Boolean(article.reviewedAt)
    && now - new Date(article.publishedAt).getTime() < 48 * 60 * 60 * 1000;
  return {
    url: `${siteUrl}${path}`,
    type: "article",
    title: article.title,
    publicationStatus: article.publicationStatus ?? "missing",
    editorialStatus: article.editorialStatus ?? "missing",
    indexingStatus: indexable ? "index" : "noindex_or_unavailable",
    publiclyDiscoverable,
    sitemapIncluded: indexable,
    rssIncluded: indexable,
    newsSitemapIncluded,
    adEligible: isArticleMonetizationEligible(article),
    canonical: `${siteUrl}${path}`,
    robotsDecision: indexable ? "index, follow" : "unavailable or noindex, follow",
    wordCount: articleWordCount(article),
    originalValueType: article.originalValueType ?? "missing",
    reviewMethod: article.reviewMethod ?? "not_applicable",
    warnings: issues.map((issue) => `${issue.code}: ${issue.message}`),
    recommendedActions: publiclyDiscoverable
      ? article.workflowVersion === "legacy"
        ? ["Backfill the gated human approval record during routine editorial review."]
        : []
      : ["Keep out of public discovery until every high-confidence quality issue is resolved and a human editor approves publication."]
  };
}

function glossaryRows(): AuditRow[] {
  return glossaryTerms.map((term) => {
    const indexable = isGlossaryTermIndexable(term);
    const path = `/glossary/${term.slug}`;
    const warnings = indexable ? [] : [`Thin glossary page: ${glossaryWordCount(term)} words, quality score ${glossaryQualityScore(term)}.`];
    return {
      url: `${siteUrl}${path}`,
      type: "glossary_detail",
      title: term.term,
      publicationStatus: "published",
      editorialStatus: "legacy",
      indexingStatus: indexable ? "index" : "noindex",
      publiclyDiscoverable: true,
      sitemapIncluded: indexable,
      rssIncluded: false,
      newsSitemapIncluded: false,
      adEligible: false,
      canonical: `${siteUrl}${path}`,
      robotsDecision: indexable ? "index, follow" : "noindex, follow",
      wordCount: glossaryWordCount(term),
      originalValueType: "reference",
      reviewMethod: "not_applicable",
      warnings,
      recommendedActions: indexable ? [] : ["Keep noindex, follow and ad-free until substantially expanded with useful original explanation and sources."]
    };
  });
}

function archiveRows(): AuditRow[] {
  const publicArticles = articles.filter(isContentPubliclyEligible);
  const rows: AuditRow[] = [];
  const add = (path: string, title: string, count: number, description: string) => {
    const indexable = isArchiveIndexable(count, description);
    rows.push({
      url: `${siteUrl}${path}`,
      type: "archive",
      title,
      publicationStatus: "published",
      editorialStatus: "generated",
      indexingStatus: indexable ? "index" : "noindex",
      publiclyDiscoverable: true,
      sitemapIncluded: indexable,
      rssIncluded: false,
      newsSitemapIncluded: false,
      adEligible: false,
      canonical: `${siteUrl}${path}`,
      robotsDecision: indexable ? "index, follow" : "noindex, follow",
      warnings: indexable ? [] : [`Archive has ${count} eligible articles. The minimum is 5.`],
      recommendedActions: indexable ? [] : ["Keep ad-free and noindex until the archive has at least five substantive articles and a useful unique introduction."]
    });
  };
  for (const [key, format] of Object.entries(formats)) add(format.path, format.section, publicArticles.filter((article) => article.format === key).length, format.description);
  for (const topic of topics) add(`/topics/${topic.slug}`, topic.name, publicArticles.filter((article) => article.tags.some((tag) => tag.slug === topic.slug)).length, `Stories, glossary entries, and explainers connected to ${topic.name.toLowerCase()}.`);
  for (const brand of brands) add(`/brands/${brand.slug}`, brand.name, publicArticles.filter((article) => article.tags.some((tag) => tag.slug === brand.slug)).length, `Independent coverage, buying context, and practical explainers involving ${brand.name}.`);
  for (const author of authors) add(`/authors/${author.slug}`, author.name, publicArticles.filter((article) => article.author.slug === author.slug).length, author.bio);
  for (const region of africanRegions) add(regionPath(region), region.name, publicArticles.filter((article) => article.regions?.some((item) => item.slug === region.slug)).length, region.description);
  for (const [section, archives] of Object.entries(topicArchives)) {
    const formatKey = Object.entries(formats).find(([, format]) => format.path === `/${section}`)?.[0];
    if (!formatKey) continue;
    for (const archive of archives) {
      const count = filterArticlesByCanonicalTopic(publicArticles.filter((article) => article.format === formatKey), archive.canonicalTopic).length;
      add(`/${section}/${archive.slug}`, `${archive.label} ${section}`, count, archive.description);
    }
  }
  const glossaryTopics = Array.from(new Set(glossaryTerms.flatMap((term) => term.topics)));
  for (const topic of glossaryTopics) {
    const slug = topic.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const count = glossaryTerms.filter((term) => term.topics.includes(topic) && isGlossaryTermIndexable(term)).length;
    add(`/glossary/topic/${slug}`, `${topic} glossary`, count, "Plain-English technology definitions grouped by topic.");
  }
  return rows;
}

function staticRows(): AuditRow[] {
  const paths = ["/", "/latest", "/glossary", "/africa", "/about", "/authors", "/contact", "/editorial-policy", "/editorial-standards", "/corrections", "/terms", "/privacy", "/cookies", "/compare-phones", "/advertise", "/newsletter", "/search"];
  const sitemapPaths = new Set(["/", "/latest", "/glossary", "/africa", "/about", "/authors", "/contact", "/editorial-policy", "/editorial-standards", "/corrections", "/terms", "/privacy", "/cookies", "/compare-phones"]);
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    type: "static_or_utility",
    title: path === "/" ? "Home" : path.slice(1),
    publicationStatus: "published",
    editorialStatus: "not_applicable",
    indexingStatus: path === "/search" ? "noindex" : "index",
    publiclyDiscoverable: true,
    sitemapIncluded: sitemapPaths.has(path),
    rssIncluded: false,
    newsSitemapIncluded: false,
    adEligible: !isNeverMonetizedPath(path) && false,
    canonical: `${siteUrl}${path}`,
    robotsDecision: path === "/search" ? "noindex, follow" : "index, follow",
    originalValueType: "utility_or_trust",
    reviewMethod: "not_applicable",
    warnings: [],
    recommendedActions: []
  }));
}

const rows = [...articles.map(articleRow), ...glossaryRows(), ...archiveRows(), ...staticRows()];
const summary = {
  generatedAt: new Date().toISOString(),
  adsenseEnabled,
  totals: {
    urls: rows.length,
    articles: articles.length,
    publicArticles: articles.filter(isContentPubliclyEligible).length,
    quarantinedArticles: articles.filter((article) => !isContentPubliclyEligible(article)).length,
    indexableGlossaryDetails: glossaryTerms.filter(isGlossaryTermIndexable).length,
    noindexGlossaryDetails: glossaryTerms.filter((term) => !isGlossaryTermIndexable(term)).length,
    adEligibleNow: rows.filter((row) => row.adEligible).length
  }
};

mkdirSync(reportDir, { recursive: true });
writeFileSync(resolve(reportDir, "adsense-content-audit.json"), `${JSON.stringify({ summary, rows }, null, 2)}\n`);

const markdown = [
  "# tecMAMBO AdSense content audit",
  "",
  `Generated: ${summary.generatedAt}`,
  "",
  "## Summary",
  "",
  `- URL records: ${summary.totals.urls}`,
  `- Articles: ${summary.totals.articles}`,
  `- Publicly eligible articles: ${summary.totals.publicArticles}`,
  `- Quarantined articles: ${summary.totals.quarantinedArticles}`,
  `- Noindex glossary details: ${summary.totals.noindexGlossaryDetails}`,
  `- AdSense enabled: ${summary.adsenseEnabled}`,
  `- Ad-eligible URLs in this environment: ${summary.totals.adEligibleNow}`,
  "",
  "## Quarantined articles",
  "",
  ...rows.filter((row) => row.type === "article" && !row.publiclyDiscoverable).map((row) => `- ${row.title}: ${row.warnings.map((warning) => warning.split(":")[0]).join(", ")}`),
  "",
  "## Noindex archives",
  "",
  ...rows.filter((row) => row.type === "archive" && row.indexingStatus === "noindex").map((row) => `- ${row.url}`),
  "",
  "The JSON report contains the complete URL-level record, including canonical, robots, sitemap, RSS, News sitemap, monetization, workflow, warnings, and recommended actions."
].join("\n");
writeFileSync(resolve(reportDir, "adsense-content-audit.md"), `${markdown}\n`);

console.log(JSON.stringify(summary, null, 2));

if (process.argv.includes("--ci")) {
  const unsafePublic = rows.filter((row) => row.type === "article" && row.publiclyDiscoverable && row.warnings.some((warning) => /editorial-marker|unfinished-draft|pre-publication-note|unsupported-first-hand-claim|review-without-hands-on-evidence/.test(warning)));
  if (unsafePublic.length) process.exitCode = 1;
}
