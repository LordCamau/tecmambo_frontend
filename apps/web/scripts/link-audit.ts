import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import allowlist from "../config/content-quality-allowlist.json" with { type: "json" };
import { articlePath, formats } from "../lib/formats";
import { articles, authors, brands, glossaryTerms, topics } from "../lib/sample-data";
import { allSectionTopicPaths } from "../lib/site-structure";

const allowedBrokenLinks = new Set<string>(allowlist.brokenLinks);

type LinkIssue = { source: string; target: string; kind: string; confidence: "high" | "medium" };
const reportsDir = resolve(process.cwd(), "../../reports");
const validPaths = new Set([
  "/", "/latest", "/glossary", "/africa", "/about", "/contact", "/editorial-standards", "/privacy", "/terms", "/cookies", "/advertise", "/newsletter", "/search", "/compare-phones",
  "/opinion/why-electric-motorbikes-matter-more-than-flashy-ev-launches",
  ...Object.values(formats).map((format) => format.path),
  ...allSectionTopicPaths(),
  ...articles.map((article) => articlePath(article.format, article.slug)),
  ...glossaryTerms.map((term) => `/glossary/${term.slug}`),
  ...authors.map((author) => `/authors/${author.slug}`),
  ...topics.map((topic) => `/topics/${topic.slug}`),
  ...brands.map((brand) => `/brands/${brand.slug}`)
]);
const issues: LinkIssue[] = [];
const markdownLinkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
const rawPathPattern = /(?:^|\s)(\/(?:news|business|reviews|explainers|wallet-watch|real-life|opinion|topics|brands|authors|glossary)\/[a-z0-9][a-z0-9/_-]*)(?=\s|$|[.,;:!?])/gi;

for (const article of articles) {
  const source = articlePath(article.format, article.slug);
  const text = [article.subhead, article.excerpt, article.whyItMatters, ...article.body, article.closingLine ?? ""].join("\n");
  for (const match of text.matchAll(markdownLinkPattern)) {
    const target = match[1].trim();
    if (/localhost|127\.0\.0\.1|\.vercel\.app/i.test(target)) issues.push({ source, target, kind: "environment URL in public copy", confidence: "high" });
    if (target.startsWith("/")) {
      const pathname = target.split(/[?#]/)[0] || "/";
      if (!validPaths.has(pathname) && !allowedBrokenLinks.has(target)) issues.push({ source, target, kind: "missing internal target", confidence: "high" });
    }
  }
  for (const match of text.matchAll(rawPathPattern)) {
    const target = match[1];
    if (!allowedBrokenLinks.has(target)) issues.push({ source, target, kind: "raw internal path is not a clickable link", confidence: "high" });
  }
  for (const sourceLink of article.sources ?? []) {
    if (/localhost|127\.0\.0\.1|\.vercel\.app/i.test(sourceLink.url)) issues.push({ source, target: sourceLink.url, kind: "environment URL in source", confidence: "high" });
  }
}

mkdirSync(reportsDir, { recursive: true });
const summary = { generatedAt: new Date().toISOString(), checkedArticles: articles.length, issueCount: issues.length };
writeFileSync(resolve(reportsDir, "link-audit.json"), `${JSON.stringify({ summary, issues }, null, 2)}\n`);
writeFileSync(resolve(reportsDir, "link-audit.md"), [
  "# tecMAMBO internal link audit",
  "",
  `Generated: ${summary.generatedAt}`,
  "",
  `Articles checked: ${summary.checkedArticles}`,
  "",
  `Issues: ${summary.issueCount}`,
  "",
  "| Source | Target | Issue | Confidence |",
  "| --- | --- | --- | --- |",
  ...issues.map((issue) => `| ${issue.source} | ${issue.target} | ${issue.kind} | ${issue.confidence} |`),
  ""
].join("\n"));
console.log(`Checked ${articles.length} articles. ${issues.length} link issues found.`);
if (process.argv.includes("--ci") && issues.some((issue) => issue.confidence === "high")) process.exitCode = 1;
