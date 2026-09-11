import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, ArticleComparisonTable, ArticleMediaSlot, Author, Format, Tag } from "@/lib/types";

type BuildSpecialIssueArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
};

type ParsedArticle = {
  number: number;
  source: string;
  slug: string;
  format: Format;
  title: string;
  seoTitle: string;
  metaDescription: string;
  originalValue: string;
  byline: string;
  quickAnswer: string;
  body: string[];
  faq: Array<{ question: string; answer: string }>;
  sources: Array<{ label: string; url: string }>;
  mediaSlots: ArticleMediaSlot[];
  comparisonTables: ArticleComparisonTable[];
};

const sourcePath = resolve(process.cwd(), "../../content/articles/tecmambo-special-issue-corrected-2026-09-11.md");

const formatByLabel: Record<string, Format> = {
  "MAMBO Explains": "explainer",
  "MAMBO Take": "opinion",
  "MAMBO Roundup": "news"
};

const scheduleBySlug: Record<string, string> = {
  "apple-surprise-and-shine-keynote-full-recap": "2026-09-11T09:41:00+03:00",
  "apple-iphone-18-pro-price-increase-memory-costs-2026": "2026-09-11T09:08:00+03:00",
  "anthropic-researcher-jacob-coxon-resignation-ai-safety": "2026-09-11T08:26:00+03:00",
  "iphone-duo-vs-galaxy-z-fold8-comparison": "2026-09-11T07:49:00+03:00",
  "apple-watch-series-12-audio-intelligence-siri-recap": "2026-09-11T07:13:00+03:00",
  "xiaomi-18-fold-iphone-duo-design-comparison": "2026-09-11T06:37:00+03:00"
};

const taxonomyBySlug: Record<string, { topics: string[]; brands: string[] }> = {
  "anthropic-researcher-jacob-coxon-resignation-ai-safety": {
    topics: ["ai-ethics", "global"],
    brands: ["anthropic", "openai"]
  },
  "xiaomi-18-fold-iphone-duo-design-comparison": {
    topics: ["business", "smartphones", "global", "smartphone-design"],
    brands: ["xiaomi", "apple"]
  },
  "iphone-duo-vs-galaxy-z-fold8-comparison": {
    topics: ["smartphones", "smartphone-design"],
    brands: ["apple", "samsung"]
  },
  "apple-iphone-18-pro-price-increase-memory-costs-2026": {
    topics: ["business", "smartphone-prices", "semiconductors"],
    brands: ["apple"]
  },
  "apple-watch-series-12-audio-intelligence-siri-recap": {
    topics: ["wearables", "ai"],
    brands: ["apple"]
  },
  "apple-surprise-and-shine-keynote-full-recap": {
    topics: ["smartphones", "wearables", "smartphone-prices"],
    brands: ["apple"]
  }
};

const internalLinksBySlug: Record<string, Array<{ text: string; href: string }>> = {
  "xiaomi-18-fold-iphone-duo-design-comparison": [
    { text: "iPhone Duo", href: "/opinion/iphone-duo-vs-galaxy-z-fold8-comparison" }
  ],
  "iphone-duo-vs-galaxy-z-fold8-comparison": [
    { text: "iPhone Duo", href: "/explainers/xiaomi-18-fold-iphone-duo-design-comparison" }
  ],
  "apple-surprise-and-shine-keynote-full-recap": [
    { text: "September hardware keynote", href: "/explainers/iphone-duo-official-price-specs-kenya" },
    { text: "iPhone Duo", href: "/explainers/xiaomi-18-fold-iphone-duo-design-comparison" },
    { text: "new Apple product category", href: "/opinion/iphone-duo-vs-galaxy-z-fold8-comparison" },
    { text: "price increases", href: "/explainers/apple-iphone-18-pro-price-increase-memory-costs-2026" },
    { text: "Audio Intelligence", href: "/explainers/apple-watch-series-12-audio-intelligence-siri-recap" }
  ]
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function publishingValue(source: string, label: string) {
  const match = source.match(new RegExp(`^\\*\\*${escapeRegExp(label)}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing September 11 publishing field: ${label}`);
  return match[1].trim().replace(/^`|`$/g, "");
}

function requiredBySlug<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const value = items.find((item) => item.slug === slug);
  if (!value) throw new Error(`Missing September 11 ${kind}: ${slug}`);
  return value;
}

function firstSentence(value: string) {
  return value.match(/^.+?[.!?](?:\s|$)/)?.[0]?.trim() ?? value;
}

function parseFaq(blocks: string[]) {
  const faqHeadingIndex = blocks.indexOf("## Frequently asked questions");
  if (faqHeadingIndex < 0) throw new Error("A September 11 article is missing its FAQ heading.");
  const faqBlocks = blocks.splice(faqHeadingIndex);
  return faqBlocks.slice(1).map((block, index) => {
    const [questionLine, ...answerLines] = block.split("\n");
    const question = questionLine?.match(/^\*\*(.+\?)\*\*$/)?.[1];
    const answer = answerLines.join(" ").trim();
    if (!question || !answer) throw new Error(`Malformed September 11 FAQ entry ${index + 1}.`);
    return { question, answer };
  });
}

function parseTable(block: string, articleNumber: number, tableNumber: number): ArticleComparisonTable {
  const lines = block.split("\n").filter(Boolean);
  const cells = lines.map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  const columns = cells[0]?.slice(1) ?? [];
  const rows = cells.slice(2).map(([label, ...values]) => ({ label: label ?? "", values }));
  if (!columns.length || rows.some((row) => !row.label || row.values.length !== columns.length)) {
    throw new Error(`Malformed September 11 comparison table in article ${articleNumber}.`);
  }
  return {
    id: `special-issue-${articleNumber}-table-${tableNumber}`,
    caption: `${columns.join(" and ")} specifications`,
    columns,
    rows
  };
}

function parseMediaMarker(marker: string, articleNumber: number, imageNumber: number): ArticleMediaSlot {
  const alt = marker.match(/Suggested alt text:\s*"([\s\S]*?)"\s+Caption:/)?.[1];
  const caption = marker.match(/Caption:\s*"([\s\S]*?)"/)?.[1];
  if (!alt || !caption) throw new Error(`Malformed image marker ${imageNumber} in September 11 article ${articleNumber}.`);
  return {
    id: `special-issue-${articleNumber}-image-${imageNumber}`,
    type: "image",
    status: "placeholder",
    placement: marker.match(/^\[([^:]+):/)?.[1] ?? `Image ${imageNumber}`,
    caption,
    alt,
    licensingNote: articleNumber === 2
      ? "Editorial must confirm Apple Newsroom and Xiaomi press-kit usage rights before release."
      : "Editorial must confirm Apple Newsroom press-kit usage rights before release.",
    aspectRatio: "16:9"
  };
}

function applyInternalLinks(slug: string, body: string[]) {
  const linked = [...body];
  for (const { text, href } of internalLinksBySlug[slug] ?? []) {
    const index = linked.findIndex((block) => !block.startsWith("#") && !block.startsWith("[[") && block.includes(text));
    if (index < 0) throw new Error(`Could not place September 11 internal link for ${slug}: ${text}`);
    linked[index] = linked[index]!.replace(text, `[${text}](${href})`);
  }
  return linked;
}

function parseArticleBlock(block: string, number: number): ParsedArticle {
  const title = publishingValue(block, "H1");
  const formatLabel = publishingValue(block, "Format");
  const format = formatByLabel[formatLabel];
  if (!format) throw new Error(`Unknown September 11 format: ${formatLabel}`);

  const bodyMatch = block.match(new RegExp(`^# ${escapeRegExp(title)}\\n\\n([\\s\\S]*?)\\n\\n## Sources\\n\\n([\\s\\S]*)$`, "m"));
  if (!bodyMatch?.[1] || !bodyMatch[2]) throw new Error(`Malformed September 11 article body: ${title}`);

  const bodyBlocks = bodyMatch[1].trim().split(/\n{2,}/).map((item) => item.trim());
  const quickAnswerBlock = bodyBlocks.shift();
  const quickAnswer = quickAnswerBlock?.match(/^\*\*Quick answer:\*\*\s*([\s\S]+)$/)?.[1]?.trim();
  if (!quickAnswer) throw new Error(`Missing September 11 quick answer: ${title}`);
  const faq = parseFaq(bodyBlocks);

  const mediaSlots: ArticleMediaSlot[] = [];
  const comparisonTables: ArticleComparisonTable[] = [];
  const structuredBody = bodyBlocks.map((item) => {
    if (/^\[IMAGE(?: COMPARISON)?\s+\d+/i.test(item)) {
      const slot = parseMediaMarker(item, number, mediaSlots.length + 1);
      mediaSlots.push(slot);
      return `[[media:${slot.id}]]`;
    }
    if (item.startsWith("|")) {
      const table = parseTable(item, number, comparisonTables.length + 1);
      comparisonTables.push(table);
      return `[[table:${table.id}]]`;
    }
    return item;
  });

  return {
    number,
    source: block,
    slug: publishingValue(block, "Suggested slug"),
    format,
    title,
    seoTitle: publishingValue(block, "SEO title"),
    metaDescription: publishingValue(block, "Meta description"),
    originalValue: publishingValue(block, "Original value"),
    byline: publishingValue(block, "Byline"),
    quickAnswer,
    body: applyInternalLinks(publishingValue(block, "Suggested slug"), structuredBody),
    faq,
    sources: bodyMatch[2].trim().split("\n").filter((line) => line.startsWith("- ")).map((line) => ({ label: line.slice(2), url: "" })),
    mediaSlots,
    comparisonTables
  };
}

function parseBundle() {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/[—–�]/.test(source)) throw new Error("The September 11 bundle contains a prohibited dash or malformed replacement character.");
  const articleBlocks = source.split(/^# ARTICLE \d+\s*$/m).slice(1).map((block) => block.trim().replace(/\n\n---[\s\S]*$/, "").trim());
  if (articleBlocks.length !== 6) throw new Error(`Expected 6 September 11 articles, found ${articleBlocks.length}.`);

  const parsed = articleBlocks.map((block, index) => parseArticleBlock(block, index + 1));
  const article2 = parsed[1]?.source ?? "";
  const article5 = parsed[4]?.source ?? "";
  if (!article2.includes("It is not evidence of stolen schematics") || !article2.includes("as proof of industrial espionage would be a serious, unsupported accusation")) {
    throw new Error("Article 2 no longer contains the approved explicit rejection of the unsupported allegation.");
  }
  if (/Neural Recall/i.test(article5)) throw new Error("Article 5 presents the rejected Neural Recall name in importable copy.");
  return parsed;
}

const parsedArticles = parseBundle();

export const editorialSeptember11ImportReport = parsedArticles.map((article) => ({
  article: article.number,
  slug: article.slug,
  byline: article.byline,
  categories: taxonomyBySlug[article.slug]?.topics ?? [],
  brands: taxonomyBySlug[article.slug]?.brands ?? [],
  internalLinks: internalLinksBySlug[article.slug] ?? [],
  publicationStatus: "draft_quarantine" as const,
  outstandingGates: [
    "Human source review against live URLs",
    article.mediaSlots.length ? `${article.mediaSlots.length} official press-kit image assets and licensing confirmation` : "Licensed hero image",
    ...(article.slug === "anthropic-researcher-jacob-coxon-resignation-ai-safety" ? ["AI & Ethics taxonomy editorial approval"] : [])
  ]
}));

export const comparisonTemplateRecommendation =
  "Adopt structured, position-specific official side-by-side media slots for future MAMBO Explains and MAMBO Take device comparisons.";

export function buildEditorialSeptember11Articles({ authors, topics, brands }: BuildSpecialIssueArgs): Article[] {
  return parsedArticles.map((parsed) => {
    const taxonomy = taxonomyBySlug[parsed.slug];
    if (!taxonomy) throw new Error(`Missing September 11 taxonomy mapping: ${parsed.slug}`);
    const authorSlug = parsed.byline === "Lulu Camau" ? "lulu-camau" : "tim-humphreys";
    const publishedAt = scheduleBySlug[parsed.slug];
    if (!publishedAt) throw new Error(`Missing September 11 staged timestamp: ${parsed.slug}`);
    const words = [parsed.title, parsed.quickAnswer, ...parsed.body, ...parsed.faq.flatMap((item) => [item.question, item.answer])]
      .join(" ").split(/\s+/).filter(Boolean).length;
    const leadSlot = parsed.mediaSlots[0];

    return {
      id: `special-issue-september-11-${parsed.number}`,
      slug: parsed.slug,
      format: parsed.format,
      contentFormat: parsed.format === "opinion" ? "analysis" : "news",
      isNewsworthy: true,
      title: parsed.title,
      seo: { title: parsed.seoTitle, description: parsed.metaDescription },
      subhead: parsed.metaDescription,
      excerpt: firstSentence(parsed.quickAnswer),
      whyItMatters: parsed.originalValue,
      quickAnswer: parsed.quickAnswer,
      body: parsed.body,
      faq: parsed.faq,
      author: requiredBySlug(authors, authorSlug, "author"),
      publishedAt,
      updatedAt: publishedAt,
      readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
      image: {
        src: "",
        alt: leadSlot?.alt ?? "Editorial hero image pending licensing approval.",
        caption: leadSlot?.caption,
        credit: ""
      },
      mediaSlots: parsed.mediaSlots,
      comparisonTables: parsed.comparisonTables.length ? parsed.comparisonTables : undefined,
      tags: [
        ...taxonomy.topics.map((slug) => requiredBySlug(topics, slug, "topic")),
        ...taxonomy.brands.map((slug) => requiredBySlug(brands, slug, "brand"))
      ],
      sources: parsed.sources,
      googleAdsEligible: false,
      workflowVersion: "gated",
      publicationStatus: "draft",
      editorialStatus: "draft_quarantine",
      indexingStatus: "noindex",
      excludeFromDiscovery: true,
      sourceChecked: false,
      humanEditorApproved: false,
      originalValueType: parsed.format === "opinion" ? "original_analysis" : "curated_context"
    };
  });
}
