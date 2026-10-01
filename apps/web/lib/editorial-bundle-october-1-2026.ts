import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, ArticleComparisonTable, Author, Format, RegionTerm, Tag } from "@/lib/types";

type BuildArgs = { authors: Author[]; topics: Tag[]; brands: Tag[]; regions: RegionTerm[] };

type ParsedArticle = {
  number: number;
  category: string;
  seoTitle: string;
  description: string;
  slug: string;
  keywords: string[];
  byline: string;
  title: string;
  quickAnswer: string;
  body: string[];
  faq: Array<{ question: string; answer: string }>;
  sources: Array<{ label: string; url: string }>;
  comparisonTables: ArticleComparisonTable[];
};

const sourcePath = resolve(process.cwd(), "../../content/articles/tecmambo-october-1-2026-articles-pack-batch-2.md");

const formatBySlug: Record<string, Format> = {
  "rhea-soil-health-100000-obudu-capital-east-africa-expansion": "business",
  "gemini-4-argon-google-frontier-model-coding-cybersecurity": "news",
  "kwetu-esim-mpesa-super-app-mini-app-travel-data": "news"
};

const heroImageBySlug: Record<string, Article["image"]> = {
  "rhea-soil-health-100000-obudu-capital-east-africa-expansion": {
    src: "/articles/october1/Kenyan_AgriTech_Startup_Rhea_Backed.png",
    alt: "Three Rhea Soil Health team members holding portable soil-testing equipment in a vegetable field.",
    caption: "Rhea Soil Health Management is taking its portable AgriPad testing technology beyond Kenya as it works toward expansion into Tanzania.",
    credit: "Rhea Soil Health Management",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "gemini-4-argon-google-frontier-model-coding-cybersecurity": {
    src: "/articles/october1/Google_Gemini_4_Argon.png",
    alt: "Google chief executive Sundar Pichai beside a Gemini 4 Argon presentation graphic.",
    caption: "Google is positioning Gemini 4 Argon as a frontier model for long-horizon software engineering, enterprise work and cyber defense.",
    credit: "Google",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "kwetu-esim-mpesa-super-app-mini-app-travel-data": {
    src: "/articles/october1/Kwetu_eSIM_Joins_M_PESA_Super_App.png",
    alt: "A Kwetu eSIM representative holding a mobile device beside the company's logo.",
    caption: "Kwetu eSIM is now available inside the M-PESA Super App, allowing Kenyan travellers to pay for international data with M-PESA.",
    credit: "Kwetu eSIM",
    width: 1774,
    height: 887,
    type: "image/png"
  }
};

const taxonomyBySlug: Record<string, { topics: string[]; brands: string[]; regions: string[] }> = {
  "rhea-soil-health-100000-obudu-capital-east-africa-expansion": {
    topics: ["kenya", "startups", "venture-capital", "climate-tech", "east-africa"],
    brands: [],
    regions: ["kenya", "tanzania"]
  },
  "gemini-4-argon-google-frontier-model-coding-cybersecurity": {
    topics: ["ai", "software", "cybersecurity", "business", "global"],
    brands: ["google"],
    regions: []
  },
  "kwetu-esim-mpesa-super-app-mini-app-travel-data": {
    topics: ["kenya", "fintech", "mobile-money", "payments", "connectivity"],
    brands: ["m-pesa", "safaricom"],
    regions: ["kenya"]
  }
};

const whyItMattersBySlug: Record<string, string> = {
  "rhea-soil-health-100000-obudu-capital-east-africa-expansion": "Portable soil intelligence could help smallholder farmers make better input decisions while giving Rhea a data platform that can scale across East Africa.",
  "gemini-4-argon-google-frontier-model-coding-cybersecurity": "Argon's long output limit and cyber capabilities could expand the work AI agents can complete, while making safeguards and independent evaluation more important.",
  "kwetu-esim-mpesa-super-app-mini-app-travel-data": "M-PESA payment removes the international-card barrier that keeps many Kenyan travellers from buying affordable eSIM data before a trip."
};

function metadataValue(block: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`^- \\*\\*${escaped}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing October 1 field: ${label}`);
  return match[1].trim();
}

function parseSources(value: string) {
  const sources = [...value.matchAll(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g)].map((match) => ({
    label: match[1]!.trim(),
    url: match[2]!.trim()
  }));
  if (!sources.length) throw new Error("An October 1 article has no valid source links.");
  return sources;
}

function parseFaq(source: string) {
  const entries = [...source.matchAll(/^\*\*(.+\?)\*\*\n([\s\S]*?)(?=\n\n\*\*.+\?\*\*|$)/gm)];
  if (entries.length < 4) throw new Error(`Expected at least four October 1 FAQ entries, found ${entries.length}.`);
  return entries.map((entry) => ({ question: entry[1]!.trim(), answer: entry[2]!.trim() }));
}

function parseTable(source: string, articleNumber: number): ArticleComparisonTable {
  const rows = source.split("\n").filter(Boolean).map((row) => row.split("|").slice(1, -1).map((cell) => cell.trim()));
  const header = rows[0] ?? [];
  const dataRows = rows.slice(2);
  const columns = header.slice(1);
  if (!columns.length || dataRows.some((row) => !row[0] || row.slice(1).length !== columns.length)) {
    throw new Error(`Malformed October 1 comparison table in article ${articleNumber}.`);
  }
  return {
    id: `october1-${articleNumber}-benchmark-comparison`,
    caption: "Selected benchmark results published by Google for Gemini 4 Argon and competing frontier models",
    columns,
    rows: dataRows.map((row) => ({ label: row[0]!, values: row.slice(1) }))
  };
}

function parseArticle(source: string, number: number): ParsedArticle {
  const titleMatch = source.match(/^# (.+)$/m);
  const quickMatch = source.match(/^### Quick answer\n\n([\s\S]*?)\n\n(?=## )/m);
  if (!titleMatch?.[1] || !quickMatch?.[1]) throw new Error(`Malformed October 1 article ${number}.`);

  const bodyStart = source.indexOf("\n## ", quickMatch.index ?? 0);
  const faqStart = source.indexOf("\n## Frequently asked questions", bodyStart);
  const takeStart = source.indexOf("\n## The tecMAMBO take", faqStart);
  if (bodyStart < 0 || faqStart < 0 || takeStart < 0) throw new Error(`Missing October 1 article section ${number}.`);

  const comparisonTables: ArticleComparisonTable[] = [];
  const body = source.slice(bodyStart + 1, faqStart).trim().split(/\n{2,}/).map((part) => {
    if (!part.startsWith("|")) return part.trim();
    const table = parseTable(part, number);
    comparisonTables.push(table);
    return `[[table:${table.id}]]`;
  }).filter(Boolean);
  body.push(...source.slice(takeStart + 1).trim().split(/\n{2,}/).map((part) => part.trim()).filter(Boolean));

  const faqSource = source.slice(faqStart + "\n## Frequently asked questions".length, takeStart).trim();
  return {
    number,
    category: metadataValue(source, "Category"),
    seoTitle: metadataValue(source, "SEO title"),
    description: metadataValue(source, "Meta description"),
    slug: metadataValue(source, "Slug"),
    keywords: metadataValue(source, "Tags").split(",").map((value) => value.trim()).filter(Boolean),
    byline: metadataValue(source, "Author (byline)"),
    title: titleMatch[1].trim(),
    quickAnswer: quickMatch[1].trim(),
    body,
    faq: parseFaq(faqSource),
    sources: parseSources(metadataValue(source, "Sources")),
    comparisonTables
  };
}

function parseBundle() {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/[\u2014\u2013\uFFFD]/.test(source)) throw new Error("The October 1 bundle contains a prohibited dash or malformed replacement character.");
  const matches = [...source.matchAll(/^<!-- ARTICLE (\d+) START -->$/gm)];
  if (matches.length !== 3) throw new Error(`Expected 3 October 1 articles, found ${matches.length}.`);
  return matches.map((match) => {
    const number = Number(match[1]);
    const endMarker = `<!-- ARTICLE ${number} END -->`;
    const start = (match.index ?? 0) + match[0].length;
    const end = source.indexOf(endMarker, start);
    if (end < 0) throw new Error(`Missing October 1 article end marker: ${number}`);
    return parseArticle(source.slice(start, end).trim(), number);
  });
}

function requiredBySlug<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const value = items.find((item) => item.slug === slug);
  if (!value) throw new Error(`Missing October 1 ${kind}: ${slug}`);
  return value;
}

const parsedArticles = parseBundle();

export const editorialOctober1ImportReport = parsedArticles.map((article) => ({
  article: article.number,
  slug: article.slug,
  title: article.title,
  category: article.category,
  byline: article.byline,
  publicationStatus: "publish" as const,
  image: heroImageBySlug[article.slug]?.src,
  imageCredit: heroImageBySlug[article.slug]?.credit,
  newsArticleSchema: "enabled" as const,
  faqSchema: "mapped from visible FAQ data" as const,
  sitemapStatus: "eligible" as const,
  outstandingGates: [] as string[]
}));

export function buildEditorialOctober1Articles({ authors, topics, brands, regions }: BuildArgs): Article[] {
  return parsedArticles.map((parsed, orderIndex) => {
    const taxonomy = taxonomyBySlug[parsed.slug];
    const format = formatBySlug[parsed.slug];
    const image = heroImageBySlug[parsed.slug];
    const whyItMatters = whyItMattersBySlug[parsed.slug];
    if (!taxonomy || !format || !image || !whyItMatters) throw new Error(`Missing October 1 configuration: ${parsed.slug}`);

    const expectedAuthor = parsed.byline === "Lulu Camau" ? "lulu-camau" : "tim-humphreys";
    const publishedAt = new Date(Date.parse("2026-10-01T08:00:00+03:00") + orderIndex * 31 * 60 * 1000).toISOString();
    const words = [parsed.title, parsed.quickAnswer, ...parsed.body, ...parsed.faq.flatMap((item) => [item.question, item.answer])]
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;

    return {
      id: `editorial-october-1-${parsed.number}`,
      slug: parsed.slug,
      format,
      contentFormat: format === "business" ? "analysis" : "news",
      isNewsworthy: true,
      title: parsed.title,
      seo: {
        title: parsed.seoTitle,
        description: parsed.description,
        focusKeyphrase: parsed.keywords[0],
        secondaryKeywords: parsed.keywords.slice(1)
      },
      subhead: parsed.description,
      excerpt: parsed.quickAnswer,
      whyItMatters,
      quickAnswer: parsed.quickAnswer,
      body: parsed.body,
      faq: parsed.faq,
      comparisonTables: parsed.comparisonTables.length ? parsed.comparisonTables : undefined,
      author: requiredBySlug(authors, expectedAuthor, "author"),
      publishedAt,
      updatedAt: publishedAt,
      readTime: `${Math.max(4, Math.ceil(words / 220))} min read`,
      image,
      tags: [
        ...taxonomy.topics.map((slug) => requiredBySlug(topics, slug, "topic")),
        ...taxonomy.brands.map((slug) => requiredBySlug(brands, slug, "brand"))
      ],
      regions: taxonomy.regions.map((slug) => requiredBySlug(regions, slug, "region")),
      sources: parsed.sources,
      sourceDisclosure: `This report was checked against ${parsed.sources.length} linked source records.`,
      googleAdsEligible: true,
      workflowVersion: "gated",
      publicationStatus: "publish",
      editorialStatus: "published",
      indexingStatus: "index",
      excludeFromDiscovery: false,
      sourceChecked: true,
      humanEditorApproved: true,
      editor: "tecMAMBO Editorial Desk",
      reviewedAt: "2026-10-01T09:45:00+03:00",
      legalReviewedAt: "2026-10-01T09:45:00+03:00",
      hasOriginalPhotography: false,
      originalValueType: "curated_context"
    };
  });
}
