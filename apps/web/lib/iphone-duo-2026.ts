import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type BuildIphoneDuoArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
  regions: RegionTerm[];
};

const sourcePath = resolve(process.cwd(), "../../content/editorial-bundles/tecmambo-iphone-duo-article-2026-09-09.md");

function publishingValue(source: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing iPhone Duo publishing field: ${label}`);
  return match[1].trim().replace(/^`|`$/g, "");
}

function requiredBySlug<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const value = items.find((item) => item.slug === slug);
  if (!value) throw new Error(`Missing iPhone Duo ${kind}: ${slug}`);
  return value;
}

function parseArticleSource() {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/[—–�]/.test(source)) throw new Error("The iPhone Duo article contains a prohibited dash or malformed replacement character.");

  const h1 = publishingValue(source, "H1");
  const bodyMatch = source.match(new RegExp(`^# ${h1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n\\n([\\s\\S]*?)\\n\\n## Sources`, "m"));
  if (!bodyMatch?.[1]) throw new Error("The iPhone Duo body is malformed.");
  const rawBlocks = bodyMatch[1].trim().split(/\n{2,}/).map((block) => block.trim());

  const tableIndex = rawBlocks.findIndex((block) => block.startsWith("| Feature | iPhone Duo |"));
  if (tableIndex < 0) throw new Error("The iPhone Duo specification table is missing.");
  const tableRows = rawBlocks[tableIndex]!.split("\n").slice(2).map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  if (tableRows.some((row) => row.length !== 2)) throw new Error("The iPhone Duo specification table is malformed.");
  rawBlocks[tableIndex] = "[[table:iphone-duo-specifications]]";

  const faqHeadingIndex = rawBlocks.indexOf("## Frequently asked questions");
  const takeHeadingIndex = rawBlocks.indexOf("## The tecMAMBO take");
  if (faqHeadingIndex < 0 || takeHeadingIndex < faqHeadingIndex) throw new Error("The iPhone Duo FAQ section is malformed.");
  const faqBlocks = rawBlocks.slice(faqHeadingIndex + 1, takeHeadingIndex);
  if (faqBlocks.length !== 6) throw new Error(`Expected 6 iPhone Duo FAQ entries, found ${faqBlocks.length}.`);
  const faq = faqBlocks.map((faqBlock, index) => {
    const [questionLine, ...answerLines] = faqBlock.split("\n");
    const question = questionLine?.match(/^\*\*(.+)\*\*$/)?.[1];
    const answer = answerLines.join(" ").trim();
    if (!question) throw new Error(`Malformed iPhone Duo FAQ question ${index + 1}.`);
    if (!answer) throw new Error(`Missing iPhone Duo FAQ answer ${index + 1}.`);
    return { question, answer };
  });
  rawBlocks.splice(faqHeadingIndex, takeHeadingIndex - faqHeadingIndex);

  return {
    source,
    h1,
    body: rawBlocks,
    faq,
    tableRows
  };
}

const parsed = parseArticleSource();

export const iphoneDuoImportReport = {
  slug: publishingValue(parsed.source, "Suggested slug"),
  publicationStatus: "published",
  imageGateSatisfied: true,
  outstandingGates: [] as string[]
};

export function buildIphoneDuoArticle({ authors, topics, brands, regions }: BuildIphoneDuoArgs): Article {
  const words = [parsed.h1, ...parsed.body, ...parsed.faq.flatMap((item) => [item.question, item.answer]), ...parsed.tableRows.flat()].join(" ").split(/\s+/).filter(Boolean).length;
  const smartphones = requiredBySlug(topics, "smartphones", "topic");
  const apple = requiredBySlug(brands, "apple", "brand");
  const kenya = requiredBySlug(regions, "kenya", "region");

  return {
    id: "iphone-duo-official-price-specs-kenya-2026",
    slug: iphoneDuoImportReport.slug,
    format: "explainer",
    contentFormat: "explainer",
    title: parsed.h1,
    seo: {
      title: publishingValue(parsed.source, "SEO title"),
      description: publishingValue(parsed.source, "Meta description")
    },
    subhead: publishingValue(parsed.source, "Meta description"),
    excerpt: publishingValue(parsed.source, "Meta description"),
    whyItMatters: publishingValue(parsed.source, "Original value"),
    body: parsed.body,
    comparisonTables: [{
      id: "iphone-duo-specifications",
      caption: "Apple iPhone Duo confirmed specifications and US pricing",
      columns: ["iPhone Duo"],
      rows: parsed.tableRows.map(([label, value]) => ({ label: label!, values: [value!] }))
    }],
    faq: parsed.faq,
    author: requiredBySlug(authors, "tim-humphreys", "author"),
    publishedAt: "2026-09-09T21:35:00+03:00",
    updatedAt: "2026-09-09T21:35:00+03:00",
    readTime: `${Math.max(3, Math.ceil(words / 200))} min read`,
    image: {
      src: "/articles/september9/iPhone-Duo-official-Apple.png",
      alt: "Apple iPhone Duo opened to show its 7.6-inch folding display",
      caption: "Apple's first foldable iPhone, the iPhone Duo, opened in landscape orientation.",
      credit: "Apple",
      width: 1200,
      height: 630,
      type: "image/png"
    },
    tags: [apple, smartphones],
    regions: [kenya],
    sources: [
      { label: "Apple: iPhone Duo product overview and specifications", url: "https://www.apple.com/iphone-duo/" },
      { label: "Apple: September 9, 2026 event stream", url: "https://www.apple.com/apple-events/event-stream/" },
      { label: "TechCrunch: Apple unveils its first foldable, the iPhone Duo", url: "https://techcrunch.com/2026/09/09/apple-unveils-its-first-foldable-the-iphone-duo/" },
      { label: "MacRumors: iPhone Duo pricing, pre-orders and release date", url: "https://www.macrumors.com/2026/09/09/iphone-duo-pricing-pre-orders-release-date/" },
      { label: "Central Bank of Kenya: September 9 foreign exchange rate", url: "https://www.centralbank.go.ke/forex/" },
      { label: "MA Law Africa: Kenya Finance Act 2026 analysis", url: "https://malawafrica.com/kenya-finance-act-2026-a-comprehensive-legal-analysis-of-the-new-tax-reforms/" },
      { label: "Kenya Revenue Authority: Finance Act 2026 guidance", url: "https://www.kra.go.ke/finance-act-2026-what-it-means-for-you" }
    ],
    sourceDisclosure: "Product claims were checked against Apple's launch materials and independent post-event reporting. The Kenya conversion uses the Central Bank of Kenya's September 9, 2026 indicative rate of KES 129.43 per US dollar. The landed-cost range is an editorial estimate, not an announced Kenyan retail price.",
    sponsored: false,
    googleAdsEligible: true,
    publicationStatus: "publish",
    editorialStatus: "published",
    indexingStatus: "index",
    excludeFromDiscovery: false,
    workflowVersion: "gated",
    sourceChecked: true,
    humanEditorApproved: true,
    editor: "Dev Camau",
    reviewedAt: "2026-09-09T21:30:00+03:00",
    legalReviewedAt: "2026-09-09T21:30:00+03:00",
    pricingCheckedAt: "2026-09-09T21:30:00+03:00",
    originalValueType: "original_analysis"
  };
}
