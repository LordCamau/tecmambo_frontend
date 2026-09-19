import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type BuildArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
  regions: RegionTerm[];
};

const sourcePath = resolve(process.cwd(), "../../content/articles/tecmambo-startup-graveyard-corrected-2026-09-17.md");
const tableMarker = "[[table:kenya-startup-funding-cohort]]";

function value(source: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing startup graveyard field: ${label}`);
  return match[1].trim().replace(/^`|`$/g, "");
}

function required<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing startup graveyard ${kind}: ${slug}`);
  return item;
}

function firstSentence(text: string) {
  return text.match(/^.+?[.!?](?:\s|$)/)?.[0]?.trim() ?? text;
}

function parseSource() {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/[—–�]/.test(source)) throw new Error("The startup graveyard source contains a prohibited dash or malformed character.");
  if (/\$15,?000\s+(?:to|[-–—])\s+\$35,?000/i.test(source)) {
    throw new Error("The rejected executive salary allegation entered the publishable startup graveyard source.");
  }

  const title = value(source, "H1");
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const bodyMatch = source.match(new RegExp(`^# ${escapedTitle}\\n\\n([\\s\\S]*?)\\n\\n## Sources\\n`, "m"));
  if (!bodyMatch?.[1]) throw new Error("Malformed startup graveyard article body.");

  const parts = bodyMatch[1].trim().split(/\n{2,}/).map((part) => part.trim());
  const quickAnswer = parts.shift()?.match(/^\*\*Quick answer:\*\*\s*([\s\S]+)$/)?.[1]?.trim();
  if (!quickAnswer) throw new Error("Missing startup graveyard quick answer.");

  const faqIndex = parts.indexOf("## Frequently asked questions");
  if (faqIndex < 0) throw new Error("Missing startup graveyard FAQ.");
  const faqParts = parts.splice(faqIndex).slice(1);
  const faq = faqParts.map((part) => {
    const [questionLine, ...answerLines] = part.split("\n");
    const question = questionLine?.match(/^\*\*(.+\?)\*\*$/)?.[1];
    const answer = answerLines.join(" ").trim();
    if (!question || !answer) throw new Error("Malformed startup graveyard FAQ.");
    return { question, answer };
  });

  const tableIndex = parts.findIndex((part) => part.startsWith("| Startup | Sector | Funding Raised | Outcome |"));
  if (tableIndex < 0) throw new Error("Missing startup graveyard funding table.");
  parts[tableIndex] = tableMarker;

  const body = parts.map((part) => part.replace(
    "When GT Flow Limited, Twiga Foods' operating entity, entered statutory administration this month",
    "When [GT Flow Limited, Twiga Foods' operating entity, entered statutory administration this month](/explainers/twiga-foods-administration-gt-flow-kenya)"
  ));

  return {
    slug: value(source, "Suggested slug"),
    title,
    seoTitle: value(source, "SEO title"),
    description: value(source, "Meta description"),
    focusKeyphrase: value(source, "Focus keyphrase"),
    secondaryKeywords: value(source, "Secondary keywords").split(",").map((keyword) => keyword.trim()),
    byline: value(source, "Byline"),
    originalValue: value(source, "Original value"),
    quickAnswer,
    body,
    faq
  };
}

const parsed = parseSource();

export const startupGraveyardImportReport = {
  slug: parsed.slug,
  byline: parsed.byline,
  mappedCategories: ["Startups", "Kenya", "Venture Capital", "Business"],
  requestedCategoriesPendingReview: [],
  publicationStatus: "publish" as const,
  editorialStatus: "published" as const,
  outstandingGates: []
};

export function buildStartupGraveyardArticle({ authors, topics, brands, regions }: BuildArgs): Article {
  const words = [parsed.title, parsed.quickAnswer, ...parsed.body, ...parsed.faq.flatMap((item) => [item.question, item.answer])]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    id: "editorial-september17-startup-graveyard",
    slug: parsed.slug,
    format: "opinion",
    contentFormat: "opinion",
    isNewsworthy: true,
    homepageHeroPriority: 100,
    title: parsed.title,
    seo: {
      title: parsed.seoTitle,
      description: parsed.description,
      focusKeyphrase: parsed.focusKeyphrase,
      secondaryKeywords: parsed.secondaryKeywords
    },
    subhead: parsed.description,
    excerpt: firstSentence(parsed.quickAnswer),
    whyItMatters: parsed.originalValue,
    quickAnswer: parsed.quickAnswer,
    body: parsed.body,
    comparisonTables: [
      {
        id: "kenya-startup-funding-cohort",
        caption: "Funding and outcomes reported for seven companies in the wider 13-startup cohort.",
        columns: ["Sector", "Funding raised", "Outcome"],
        rows: [
          { label: "Twiga Foods", values: ["Agritech / B2B distribution", "More than $180 million", "Statutory administration, September 2026"] },
          { label: "Copia Global", values: ["E-commerce / rural retail", "$123 million", "Administration, May 2024"] },
          { label: "Gro Intelligence", values: ["Agri-climate data", "$117.7 million", "Shutdown, mid-2024, after 60% layoffs"] },
          { label: "MarketForce", values: ["B2B FMCG distribution", "$84.1 million per Business Daily; $42.5 million per an alternate source citing a $40 million Series A", "Wound down, April 2024"] },
          { label: "Sendy", values: ["On-demand logistics", "$24.7 million", "Shutdown, 2023"] },
          { label: "Lipa Later", values: ["Buy-now-pay-later fintech", "Over $16 million", "Administration, March 2025"] },
          { label: "iProcure", values: ["Agri-input distribution", "$17.1 million", "Administration, April 2024"] }
        ]
      }
    ],
    faq: parsed.faq,
    author: required(authors, "tim-humphreys", "author"),
    publishedAt: "2026-09-18T22:12:07+03:00",
    updatedAt: "2026-09-19T10:05:00+03:00",
    readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
    image: {
      src: "/articles/september19/New_Kenya_Startup_Graveyard.webp",
      alt: "AI-generated illustration of weathered startup gravestones overlooking Nairobi at sunset.",
      caption: "An AI-generated editorial illustration of Kenya's startup funding reckoning. The scene is conceptual and is not a definitive list or legal characterization of the companies shown.",
      credit: "AI Generate Illustration for tecMAMBO",
      width: 1774,
      height: 887,
      type: "image/webp"
    },
    tags: [
      required(topics, "startups", "topic"),
      required(topics, "kenya", "topic"),
      required(topics, "venture-capital", "topic"),
      required(topics, "business", "topic"),
      required(brands, "twiga-foods", "brand")
    ],
    regions: [required(regions, "kenya", "region")],
    sources: [
      {
        label: "Business Daily Africa: Investors lose Sh93bn in Kenya startup failures",
        url: "https://www.businessdailyafrica.com/bd/corporate/companies/investors-lose-sh93-billion-in-kenya-start-up-failures-5597634"
      },
      {
        label: "WeeTracker: Kenya Startup Failures Worsened By Flameout Of Once-Celebrated B2B Star",
        url: "https://weetracker.com/2026/09/16/kenya-startup-failures-twiga-foods-administration/"
      },
      {
        label: "Business Tech Africa: These Kenyan startups raised millions before shutting down",
        url: "https://www.businesstechafrica.co.za/article/kenyas-startup-market-has-produced-some-big-funding-rounds-it-has-also-produced-some-expensive-failures"
      },
      {
        label: "Semafor: A Kenyan agri-data startup tipped to underpin global food security shuts down",
        url: "https://www.semafor.com/article/06/04/2024/kenyan-ai-data-gro-intelligence-startup-shuts-down"
      },
      {
        label: "CIO Africa: Kenyan Startup Gro Intelligence Shuts Down",
        url: "https://cioafrica.co/kenyan-startup-gro-intelligence-shuts-down/"
      },
      {
        label: "U.S. District Court docket: Bielefeldt et al v. Gro Intelligence, Inc.",
        url: "https://dockets.justia.com/docket/new-york/nysdce/1%3A2024cv02472/618699"
      }
    ],
    sourceDisclosure: "Claims and source URLs were checked against the linked reporting and court record on September 18, 2026.",
    legalReviewedAt: "2026-09-18T22:12:07+03:00",
    googleAdsEligible: true,
    workflowVersion: "gated",
    publicationStatus: "publish",
    editorialStatus: "published",
    indexingStatus: "index",
    excludeFromDiscovery: false,
    sourceChecked: true,
    humanEditorApproved: true,
    editor: "tecMAMBO Editorial Desk",
    reviewedAt: "2026-09-18T22:12:07+03:00",
    hasOriginalPhotography: false,
    originalValueType: "original_analysis"
  };
}
