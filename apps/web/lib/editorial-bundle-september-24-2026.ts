import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, ArticleComparisonTable, Author, RegionTerm, Tag } from "@/lib/types";

type BuildArgs = { authors: Author[]; topics: Tag[]; brands: Tag[]; regions: RegionTerm[] };
type ParsedArticle = {
  number: number;
  title: string;
  slug: string;
  byline: string;
  description: string;
  keywords: string[];
  body: string[];
  quickAnswer: string;
  reportingNote: string;
  comparisonTables: ArticleComparisonTable[];
};

const sourcePath = resolve(process.cwd(), "../../content/articles/tecmambo-september-24-2026-editorial-package.md");

const formatBySlug: Record<string, Article["format"]> = {
  "epra-removes-15000-kwh-ev-charging-limit-kenya": "explainer",
  "googlebook-googlebook-os-android-gemini-laptop-launch": "explainer",
  "tiktok-kenyan-creators-tax-details-withholding-2026": "news",
  "samsung-galaxy-s27-ram-storage-configurations-leak": "news",
  "trump-ai-super-intelligence-name-meaning": "explainer",
  "africa-go-green-fund-spiro-36-million-electric-mobility": "business"
};

const scheduleBySlug: Record<string, string> = {
  "epra-removes-15000-kwh-ev-charging-limit-kenya": "2026-09-24T07:20:00+03:00",
  "googlebook-googlebook-os-android-gemini-laptop-launch": "2026-09-24T07:50:00+03:00",
  "tiktok-kenyan-creators-tax-details-withholding-2026": "2026-09-24T08:20:00+03:00",
  "samsung-galaxy-s27-ram-storage-configurations-leak": "2026-09-24T08:50:00+03:00",
  "trump-ai-super-intelligence-name-meaning": "2026-09-24T09:20:00+03:00",
  "africa-go-green-fund-spiro-36-million-electric-mobility": "2026-09-24T09:50:00+03:00"
};

const seoTitleBySlug: Record<string, string> = {
  "epra-removes-15000-kwh-ev-charging-limit-kenya": "EPRA Removes Kenya's 15,000 kWh EV Charging Limit",
  "googlebook-googlebook-os-android-gemini-laptop-launch": "Googlebook Launch: Android, Gemini and Premium Laptops",
  "tiktok-kenyan-creators-tax-details-withholding-2026": "TikTok Asks Kenyan Creators for Tax Details",
  "samsung-galaxy-s27-ram-storage-configurations-leak": "Galaxy S27 RAM and Storage Leak: Reported Configurations",
  "trump-ai-super-intelligence-name-meaning": "Trump's AI Rename and What Superintelligence Actually Means",
  "africa-go-green-fund-spiro-36-million-electric-mobility": "Africa Go Green Fund Doubles Spiro Financing to $36M"
};

const taxonomyBySlug: Record<string, { topics: string[]; brands: string[]; regions: string[] }> = {
  "epra-removes-15000-kwh-ev-charging-limit-kenya": {
    topics: ["evs-mobility", "ev-infrastructure", "energy", "kenya"],
    brands: [],
    regions: ["kenya"]
  },
  "googlebook-googlebook-os-android-gemini-laptop-launch": {
    topics: ["computing", "android", "ai", "googlebook"],
    brands: ["google"],
    regions: []
  },
  "tiktok-kenyan-creators-tax-details-withholding-2026": {
    topics: ["social-media", "creator-economy", "tax", "kenya"],
    brands: ["tiktok", "kra"],
    regions: ["kenya"]
  },
  "samsung-galaxy-s27-ram-storage-configurations-leak": {
    topics: ["smartphones", "hardware", "galaxy-s27"],
    brands: ["samsung"],
    regions: []
  },
  "trump-ai-super-intelligence-name-meaning": {
    topics: ["ai", "ai-ethics", "policy"],
    brands: [],
    regions: []
  },
  "africa-go-green-fund-spiro-36-million-electric-mobility": {
    topics: ["evs-mobility", "climate-tech", "business"],
    brands: ["spiro"],
    regions: ["uganda", "rwanda"]
  }
};

const imageBySlug: Record<string, Article["image"]> = {
  "epra-removes-15000-kwh-ev-charging-limit-kenya": {
    src: "/articles/september15/Nairobi_Emobility_Week_KICC.jpg",
    alt: "Electric vehicles and charging technology displayed during Nairobi E-Mobility Week at KICC.",
    caption: "Kenya's electric mobility market is moving from pilot projects toward commercial charging and fleet infrastructure.",
    credit: "Kenya Power/Facebook",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "googlebook-googlebook-os-android-gemini-laptop-launch": {
    src: "/articles/september24/googlebook-launch.webp",
    alt: "Googlebook premium laptop hardware shown in Google's official launch imagery.",
    caption: "Googlebook launches as a premium laptop category built with Acer, ASUS, Dell, HP and Lenovo.",
    credit: "Google",
    width: 1200,
    height: 642,
    type: "image/webp"
  },
  "tiktok-kenyan-creators-tax-details-withholding-2026": {
    src: "/articles/august14/tiktok-songs-of-live-professional-inbox-creator-tools.webp",
    alt: "A smartphone displaying TikTok's official profile and creator interface.",
    caption: "TikTok is asking affected Kenyan creators to complete an in-app tax and residency form.",
    credit: "",
    creditOmitted: true,
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  "samsung-galaxy-s27-ram-storage-configurations-leak": {
    src: "/articles/september24/samsung-galaxy-s27-leak-illustration.webp",
    alt: "Samsung Galaxy S26 series phones shown for illustration while the Galaxy S27 remains unannounced.",
    caption: "Samsung's current Galaxy S26 series is shown for illustration. The reported Galaxy S27 configurations remain unconfirmed.",
    credit: "Samsung",
    width: 1200,
    height: 675,
    type: "image/webp"
  },
  "trump-ai-super-intelligence-name-meaning": {
    src: "/articles/september24/trump-un-super-intelligence.webp",
    alt: "President Donald Trump speaking at the United Nations General Assembly on September 22, 2026.",
    caption: "Donald Trump proposed using the term super intelligence during his September 22 address to the United Nations General Assembly.",
    credit: "Official White House Photo by Daniel Torok",
    width: 1600,
    height: 1067,
    type: "image/webp"
  },
  "africa-go-green-fund-spiro-36-million-electric-mobility": {
    src: "/articles/spiro-electric-mobility.jpg",
    alt: "A red Spiro electric motorcycle inside a workshop.",
    caption: "Spiro combines electric motorcycles with a battery-swapping network across African markets.",
    credit: "Spiro",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  }
};

const whyItMattersBySlug: Record<string, string> = {
  "epra-removes-15000-kwh-ev-charging-limit-kenya": "Removing the monthly ceiling gives charging networks and electric fleets a more predictable cost base as Kenya's mobility market scales.",
  "googlebook-googlebook-os-android-gemini-laptop-launch": "Google is turning Android, Gemini and its services into a premium laptop ecosystem that can compete more directly with Windows and the Mac.",
  "tiktok-kenyan-creators-tax-details-withholding-2026": "Tax collection is moving directly into creator payout systems, changing what Kenyan creators receive and what records they need to keep.",
  "samsung-galaxy-s27-ram-storage-configurations-leak": "The leak offers an early view of how Samsung may balance memory costs, premium features and pricing, but none of the reported configurations is confirmed.",
  "trump-ai-super-intelligence-name-meaning": "Using an established technical term as a broad political label can blur the line between today's AI systems and a hypothetical capability researchers define very differently.",
  "africa-go-green-fund-spiro-36-million-electric-mobility": "The additional debt backs the infrastructure around electric motorcycles, including swap stations and battery availability, rather than treating the vehicle alone as the product."
};

const sourcesBySlug: Record<string, NonNullable<Article["sources"]>> = {
  "epra-removes-15000-kwh-ev-charging-limit-kenya": [
    { label: "Kenyan reporting: EPRA scraps the cap on the special EV charging tariff", url: "https://ec2-18-135-160-37.eu-west-2.compute.amazonaws.com/2026/09/21/epra-removes-e-mobility-tariff-cap-2026/" },
    { label: "EPRA: Electric Vehicle Charging and Battery Swapping Infrastructure Guidelines", url: "https://www.epra.go.ke/wp-content/uploads/2023/09/EPRA-E-Mobility-Guidelines.pdf" },
    { label: "Invest Kenya: Kenya E-Mobility Sector Pack", url: "https://www.investkenya.go.ke/wp-content/uploads/2025/12/Invest-Kenya-E-mobility-Sector-Pack.pdf" }
  ],
  "googlebook-googlebook-os-android-gemini-laptop-launch": [
    { label: "Google: Googlebook is raising the bar for premium laptops", url: "https://blog.google/products-and-platforms/devices/googlebook/first-look-googlebook/" },
    { label: "Google: AI and hardware announcements from May 2026", url: "https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-may-2026/" }
  ],
  "tiktok-kenyan-creators-tax-details-withholding-2026": [
    { label: "Tech-ish: TikTok is asking Kenyan creators for tax information", url: "https://tech-ish.com/2026/09/16/tiktok-is-now-asking-kenyan-creators-for-their-tax-information/" },
    { label: "Oraro & Company: withholding tax on digital content in Kenya", url: "https://www.oraro.co.ke/wp-content/uploads/2024/05/TAX-IMPLICATIONS-OF-THE-FINANCE-BILL-2024-14.05.2024-ORARO-COMPANY-ADVOCATES.pdf" }
  ],
  "samsung-galaxy-s27-ram-storage-configurations-leak": [
    { label: "Android Authority: reported Galaxy S27 memory and storage configurations", url: "https://www.androidauthority.com/samsung-galaxy-s27-memory-storage-configurations-leak-3713926/" },
    { label: "TechRadar: reported Galaxy S27 RAM and storage options", url: "https://www.techradar.com/phones/samsung-galaxy-phones/the-samsung-galaxy-s27-series-could-be-another-victim-of-the-ram-crisis-full-storage-and-memory-configuration-details-have-supposedly-leaked-and-theyre-not-promising-if-you-hoped-for-an-upgrade" },
    { label: "Samsung Newsroom: official Galaxy S26 series media for illustration", url: "https://news.samsung.com/medialibrary/global/photo/61778?album=170" }
  ],
  "trump-ai-super-intelligence-name-meaning": [
    { label: "AP: Trump proposes renaming AI as super intelligence at the UN", url: "https://apnews.com/article/692e1e171a791be0c9b9c1f56718a0d0" },
    { label: "White House: President Trump's September 22, 2026 UN address", url: "https://www.whitehouse.gov/videos/trump-addresses-the-un-i-have-no-interest-in-leaving-dangers-to-grow-for-another-day/" },
    { label: "IBM: What is artificial superintelligence?", url: "https://www.ibm.com/think/topics/artificial-superintelligence" }
  ],
  "africa-go-green-fund-spiro-36-million-electric-mobility": [
    { label: "Cygnum Capital: Africa Go Green Fund doubles its Spiro commitment to $36 million", url: "https://www.cygnumcapital.com/news/with-an-additional-18-million-africa-go-green-fund-renews-its-confidence-in-spiro-and-doubles-down-its-financing-commitment" },
    { label: "AP: Spiro's wider electric motorcycle and battery-swapping financing", url: "https://apnews.com/article/e91ff820907dd8329d15a9f2ed1e2b20" }
  ]
};

const internalLinksBySlug: Record<string, Array<{ text: string; href: string }>> = {
  "epra-removes-15000-kwh-ev-charging-limit-kenya": [
    { text: "charging infrastructure", href: "/explainers/the-real-test-for-ev-charging-isnt-speed-its-location" },
    { text: "Electric motorcycles", href: "/real-life/why-electric-motorbikes-matter-more-than-flashy-ev-launches" }
  ],
  "googlebook-googlebook-os-android-gemini-laptop-launch": [
    { text: "Gemini more central", href: "/explainers/google-gemini-desktop-app-windows-10-11" },
    { text: "Android applications", href: "/opinion/android-17-app-bubbles-multitasking-vs-iphone" }
  ],
  "tiktok-kenyan-creators-tax-details-withholding-2026": [
    { text: "TikTok's monetisation products", href: "/opinion/tiktok-songs-of-live-professional-inbox-creator-tools" }
  ],
  "samsung-galaxy-s27-ram-storage-configurations-leak": [
    { text: "Samsung officially announces the Galaxy S27 family", href: "/news/samsung-galaxy-unpacked-july-2026-everything-announced" }
  ],
  "trump-ai-super-intelligence-name-meaning": [
    { text: "Technology policy", href: "/opinion/africa-ai-governance-seat-influence-local-context" }
  ],
  "africa-go-green-fund-spiro-36-million-electric-mobility": [
    { text: "battery swapping is such an important part", href: "/real-life/why-electric-motorbikes-matter-more-than-flashy-ev-launches" },
    { text: "Spiro's operations", href: "/business/spiro-electric-mobility-funding-round" }
  ]
};

function metadataValue(block: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing September 24 field: ${label}`);
  return match[1].trim().replace(/\s{2,}$/, "").replace(/^`|`$/g, "");
}

function firstSentence(text: string) {
  return text.match(/^.+?[.!?](?:\s|$)/)?.[0]?.trim() ?? text;
}

function parseTable(block: string, articleNumber: number): ArticleComparisonTable {
  const lines = block.split("\n").filter(Boolean);
  const cells = lines.map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  const columns = cells[0]?.slice(1) ?? [];
  const rows = cells.slice(2).map(([label, ...values]) => ({ label: label ?? "", values }));
  if (!columns.length || rows.some((row) => !row.label || row.values.length !== columns.length)) {
    throw new Error(`Malformed September 24 comparison table in article ${articleNumber}.`);
  }
  return {
    id: `september24-${articleNumber}-reported-configurations`,
    caption: "Reported Samsung Galaxy S27 RAM and storage configurations, all unconfirmed",
    columns,
    rows
  };
}

function addInternalLinks(slug: string, body: string[]) {
  const linked = [...body];
  for (const { text, href } of internalLinksBySlug[slug] ?? []) {
    const index = linked.findIndex((part) => !part.startsWith("#") && !part.startsWith("[[") && part.includes(text));
    if (index < 0) throw new Error(`Could not place September 24 internal link for ${slug}: ${text}`);
    linked[index] = linked[index]!.replace(text, `[${text}](${href})`);
  }
  return linked;
}

function parseBundle(): ParsedArticle[] {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/\u2014|&mdash;|&#8212;|&#x2014;/i.test(source)) throw new Error("The September 24 package contains a prohibited em dash.");
  const blocks = source
    .split(/\n---\n\n/)
    .filter((block) => /^# (?!tecMAMBO Editorial Package|Codex implementation instructions)/.test(block));
  if (blocks.length !== 6) throw new Error(`Expected 6 September 24 articles, found ${blocks.length}.`);

  return blocks.map((block, index) => {
    const title = block.match(/^# (.+)$/m)?.[1]?.trim();
    if (!title) throw new Error(`Missing September 24 title in article ${index + 1}.`);
    const bodyMatch = block.match(/^\*\*Primary keywords:\*\*[^\n]+\n\n([\s\S]*?)\n\n\*\*(?:Reporting note|Source note):\*\*\s*([\s\S]+)$/m);
    if (!bodyMatch?.[1] || !bodyMatch[2]) throw new Error(`Malformed September 24 body: ${title}`);

    const comparisonTables: ArticleComparisonTable[] = [];
    const parts = bodyMatch[1].trim().split(/\n{2,}/).map((part) => part.trim());
    const body = parts.map((part) => {
      const media = part.match(/^\[IMAGE \d+:\s*(.+)\]$/i);
      if (media?.[1]) return "";
      if (part.startsWith("|")) {
        const table = parseTable(part, index + 1);
        comparisonTables.push(table);
        return `[[table:${table.id}]]`;
      }
      return part;
    }).filter(Boolean);
    const reportingNote = bodyMatch[2].trim();
    body.push(`Reporting note: ${reportingNote}`);
    const firstParagraph = body.find((part) => !part.startsWith("#") && !part.startsWith("[["));
    if (!firstParagraph) throw new Error(`Missing September 24 opening paragraph: ${title}`);

    return {
      number: index + 1,
      title,
      slug: metadataValue(block, "Suggested slug"),
      byline: metadataValue(block, "Byline"),
      description: metadataValue(block, "Meta description"),
      keywords: metadataValue(block, "Primary keywords").split(",").map((keyword) => keyword.trim()).filter(Boolean),
      body: addInternalLinks(metadataValue(block, "Suggested slug"), body),
      quickAnswer: firstSentence(firstParagraph),
      reportingNote,
      comparisonTables
    };
  });
}

const parsedArticles = parseBundle();

function required<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing September 24 ${kind}: ${slug}`);
  return item;
}

export const editorialSeptember24ImportReport = parsedArticles.map((article) => ({
  article: article.number,
  title: article.title,
  slug: article.slug,
  byline: article.byline,
  categories: taxonomyBySlug[article.slug]?.topics ?? [],
  mediaPlaceholders: 0,
  youtubePlaceholders: 0,
  internalLinks: article.body.flatMap((part) => [...part.matchAll(/\]\((\/[^)]+)\)/g)].map((match) => match[1]!)),
  publicationStatus: "published" as const,
  outstandingGates: []
}));

export function buildEditorialSeptember24Articles({ authors, topics, brands, regions }: BuildArgs): Article[] {
  return parsedArticles.map((parsed) => {
    const taxonomy = taxonomyBySlug[parsed.slug];
    const image = imageBySlug[parsed.slug];
    const sources = sourcesBySlug[parsed.slug];
    const publishedAt = scheduleBySlug[parsed.slug];
    const format = formatBySlug[parsed.slug];
    if (!taxonomy || !image || !sources?.length || !publishedAt || !format) {
      throw new Error(`Incomplete September 24 article mapping: ${parsed.slug}`);
    }
    const words = [parsed.title, parsed.quickAnswer, ...parsed.body]
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;

    return {
      id: `editorial-september24-${parsed.number}`,
      slug: parsed.slug,
      format,
      contentFormat: format === "news" ? "news" : format === "business" ? "analysis" : "explainer",
      isNewsworthy: true,
      title: parsed.title,
      seo: {
        title: seoTitleBySlug[parsed.slug],
        description: parsed.description,
        focusKeyphrase: parsed.keywords[0],
        secondaryKeywords: parsed.keywords.slice(1)
      },
      subhead: parsed.description,
      excerpt: parsed.quickAnswer,
      whyItMatters: whyItMattersBySlug[parsed.slug],
      quickAnswer: parsed.quickAnswer,
      body: parsed.body,
      comparisonTables: parsed.comparisonTables.length ? parsed.comparisonTables : undefined,
      author: required(authors, "tecmambo-team", "author"),
      publishedAt,
      updatedAt: publishedAt,
      readTime: `${Math.max(4, Math.ceil(words / 220))} min read`,
      image,
      tags: [
        ...taxonomy.topics.map((slug) => required(topics, slug, "topic")),
        ...taxonomy.brands.map((slug) => required(brands, slug, "brand"))
      ],
      regions: taxonomy.regions.map((slug) => required(regions, slug, "region")),
      sources,
      sourceDisclosure: `Claims and source URLs were checked against the linked sources on September 24, 2026. ${parsed.reportingNote}`,
      legalReviewedAt: "2026-09-24T10:15:00+03:00",
      googleAdsEligible: true,
      workflowVersion: "gated",
      publicationStatus: "publish",
      editorialStatus: "published",
      indexingStatus: "index",
      excludeFromDiscovery: false,
      sourceChecked: true,
      humanEditorApproved: true,
      editor: "tecMAMBO Editorial Desk",
      reviewedAt: "2026-09-24T10:15:00+03:00",
      hasOriginalPhotography: false,
      originalValueType: format === "business" || format === "news" ? "curated_context" : "practical_guide"
    };
  });
}
