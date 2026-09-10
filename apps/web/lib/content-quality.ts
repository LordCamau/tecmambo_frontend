import { articleWordCount } from "@/lib/article-quality";
import type { Article, Author, GlossaryTerm } from "@/lib/types";

export type QualityIssue = {
  code: string;
  message: string;
  confidence: "high" | "medium";
};

const placeholderPatterns: Array<{ code: string; pattern: RegExp }> = [
  { code: "editorial-marker", pattern: /\[(?:verify|todo|draft|tk|confirm|editor(?:ial)? note)\b[^\]]*\]|EDITOR VERIFY BEFORE PUBLISH/i },
  { code: "pre-publication-note", pattern: /before (?:this|the) (?:article|story|page) goes live|before publication/i },
  { code: "unfinished-draft", pattern: /this draft needs|draft (?:still )?(?:needs|requires)|not ready (?:to|for) publish/i },
  { code: "publication-instruction", pattern: /recommended table fields for publication|for the editor|editor should|publish only after/i },
  { code: "future-update", pattern: /\b(?:to be updated|update later|coming soon)\b/i },
  { code: "missing-input", pattern: /\b(?:insert|add|supply|replace)\s+(?:the\s+)?(?:source|image|link|quote|price|citation|data|evidence)\b/i },
  { code: "verification-needed", pattern: /\b(?:price check needed|needs testing|needs review|needs verification|verify (?:this|claim|price|source)|fact[- ]check)\b/i },
  { code: "dummy-copy", pattern: /\blorem ipsum\b/i },
  { code: "standalone-marker", pattern: /(?:^|\s)(?:TBD|TK|TODO|FIXME)(?:\s|$|[.:;,])/ }
];

const firstHandClaimPattern = /\b(?:we tested|we timed|we asked|we checked|we ran|tested for|hands[- ]on|review)\b/i;
const gatedWorkflowFields = ["sourceChecked", "humanEditorApproved", "editor", "reviewedAt"] as const;

export function articlePublicText(article: Article) {
  return [
    article.title,
    article.seo?.title ?? "",
    article.seo?.description ?? "",
    article.subhead,
    article.excerpt,
    article.whyItMatters,
    article.quickAnswer ?? "",
    ...article.body,
    ...(article.comparisonTables?.flatMap((table) => [table.caption, ...table.columns, ...table.rows.flatMap((row) => [row.label, ...row.values])]) ?? []),
    article.closingLine ?? "",
    article.goDeeper?.intro ?? "",
    ...(article.goDeeper?.specs.flatMap((row) => [row.label, row.value]) ?? []),
    article.verdict?.summary ?? "",
    ...(article.verdict?.pros ?? []),
    ...(article.verdict?.cons ?? []),
    ...(article.faq?.flatMap((item) => [item.question, item.answer]) ?? []),
    ...(article.corrections?.flatMap((item) => [item.date, item.description]) ?? []),
    ...(article.mediaSlots?.flatMap((slot) => [slot.caption, slot.alt ?? "", slot.credit ?? ""]) ?? [])
  ].join("\n");
}

export function findPlaceholderIssues(value: string): QualityIssue[] {
  return placeholderPatterns
    .filter(({ pattern }) => pattern.test(value))
    .map(({ code }) => ({ code, message: `Public copy contains ${code.replaceAll("-", " ")}.`, confidence: "high" }));
}

export function hasDocumentedFirstHandEvidence(article: Article) {
  return article.reviewMethod === "hands_on"
    && article.hasOriginalTesting === true
    && Boolean(article.testingMethodology?.trim())
    && Boolean(article.productSource?.trim())
    && Boolean(article.testingPeriod?.trim())
    && Boolean(article.testEvidence?.length)
    && Boolean(article.testStartedAt)
    && Boolean(article.testCompletedAt)
    && Boolean(article.editor?.trim());
}

export function isHandsOnReview(article: Article) {
  return article.format === "review" && hasDocumentedFirstHandEvidence(article);
}

export function reviewCanShowScore(article: Article) {
  return isHandsOnReview(article) && Boolean(article.verdict?.score);
}

export function articleQualityIssues(article: Article): QualityIssue[] {
  const issues = findPlaceholderIssues(articlePublicText(article));
  const add = (code: string, message: string, confidence: QualityIssue["confidence"] = "high") => issues.push({ code, message, confidence });
  if (article.publicationStatus !== "publish") add("not-published", `Publication status is ${article.publicationStatus ?? "missing"}.`);
  if (article.editorialStatus !== "published") add("not-editorially-ready", `Editorial status is ${article.editorialStatus ?? "missing"}.`);
  if (!article.workflowVersion) add("missing-workflow-version", "The article has no publication workflow version.");
  if (article.workflowVersion === "gated") {
    for (const field of gatedWorkflowFields) {
      if (!article[field]) add(`missing-${field.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, `The gated workflow is missing ${field}.`);
    }
  }
  if (article.excludeFromDiscovery) add("excluded-from-discovery", "The article is explicitly excluded from discovery.");
  if (!article.title.trim()) add("missing-title", "The article has no title.");
  if (!article.subhead.trim() || !article.excerpt.trim()) add("missing-summary", "The article is missing its subhead or excerpt.");
  if (!article.whyItMatters.trim()) add("missing-value", "The article has no why it matters explanation.");
  for (const correction of article.corrections ?? []) {
    if (!correction.description.trim()) add("invalid-correction", "A correction is missing its public description.");
    if (!Number.isFinite(new Date(correction.date).getTime())) add("invalid-correction-date", "A correction has an invalid date.");
  }
  if (!article.author?.name?.trim()) add("missing-author", "The article has no named author.");
  if (!article.image?.src?.trim() || !article.image?.alt?.trim() || (!article.image?.credit?.trim() && !article.image?.creditOmitted)) add("missing-image-metadata", "The lead image is missing a source, alt text, or credit decision.");
  if (article.body.length < 3 || articleWordCount(article) < 300) add("thin-article", "The article has less than 300 words or fewer than three body sections.", "medium");
  if (["news", "business"].includes(article.format) && !article.sources?.length) add("missing-sources", "Reported news or business analysis has no source list.");
  if (!article.originalValueType) add("missing-original-value", "The article has no original-value classification.", "medium");
  const claimsFirstHandExperience = firstHandClaimPattern.test([article.title, article.subhead, article.excerpt].join(" "));
  if (article.format === "review" && !isHandsOnReview(article)) add("review-without-hands-on-evidence", "Reviews are reserved for documented hands-on testing.");
  if (claimsFirstHandExperience && !hasDocumentedFirstHandEvidence(article)) {
    add("unsupported-first-hand-claim", "The title or summary makes a first-hand claim without the required evidence record.");
  }
  if (article.contentFormat === "field_test" && (!article.testEvidence?.length || !article.testingMethodology || !article.editor)) {
    add("field-test-evidence-missing", "The field test lacks evidence, methodology, or a named approving editor.");
  }
  if (article.workflowVersion === "gated" && (article.format === "wallet-watch" || article.contentFormat === "buying_guide") && (!article.sources?.length || !article.pricingCheckedAt)) {
    add("pricing-verification-missing", "Current buying guidance needs sources and a recorded price-check time.");
  }
  if (article.workflowVersion === "gated" && /\b(?:law|legal|regulation|regulator|licen[cs]e|tax|court|antitrust)\b/i.test(articlePublicText(article)) && (!article.sources?.length || !article.legalReviewedAt)) {
    add("legal-verification-missing", "Current legal or regulatory coverage needs sources and a recorded legal fact-check time.");
  }
  if (article.format === "wallet-watch" && article.contentFormat === "buying_guide" && (!article.sources?.length || article.deal?.verified !== true)) {
    add("unverified-buying-guide", "The buying guide lacks sufficient verification evidence.");
  }
  return issues;
}

export function isContentPubliclyEligible(article: Article) {
  return !articleQualityIssues(article).some((issue) => issue.confidence === "high" || issue.code === "thin-article");
}

export function isArticleIndexable(article: Article) {
  return isContentPubliclyEligible(article) && article.indexingStatus !== "noindex";
}

export function glossaryWordCount(term: GlossaryTerm) {
  return [term.oneLiner, term.analogy ?? "", term.fullExplanation, term.whyItMatters ?? "", ...(term.faqs?.flatMap((item) => [item.question, item.answer]) ?? [])]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function glossaryQualityScore(term: GlossaryTerm) {
  let score = 0;
  if (term.oneLiner.trim().length >= 45) score += 1;
  if (term.fullExplanation.trim().length >= 450) score += 2;
  if ((term.whyItMatters?.trim().length ?? 0) >= 120) score += 1;
  if ((term.analogy?.trim().length ?? 0) >= 80) score += 1;
  if ((term.faqs?.length ?? 0) >= 2) score += 1;
  if ((term.sources?.length ?? 0) >= 1) score += 1;
  if (term.relatedTerms.length >= 2) score += 1;
  return score;
}

export function isGlossaryTermIndexable(term: GlossaryTerm) {
  const text = [term.term, term.oneLiner, term.fullExplanation, term.whyItMatters ?? "", term.analogy ?? ""].join(" ");
  return findPlaceholderIssues(text).length === 0 && glossaryWordCount(term) >= 180 && glossaryQualityScore(term) >= 6;
}

export function isArchiveIndexable(articleCount: number, descriptiveCopy: string) {
  return articleCount >= 5 && descriptiveCopy.trim().length >= 80;
}

export function isAuthorIndexable(author: Author, articleCount: number) {
  return isArchiveIndexable(articleCount, author.bio);
}
