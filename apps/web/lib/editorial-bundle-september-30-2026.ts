import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, Author, Format, RegionTerm, Tag } from "@/lib/types";

type BuildArgs = { authors: Author[]; topics: Tag[]; brands: Tag[]; regions: RegionTerm[] };

type ParsedArticle = {
  number: number;
  category: string;
  seoTitle: string;
  description: string;
  slug: string;
  keywords: string[];
  title: string;
  quickAnswer: string;
  body: string[];
  faq: Array<{ question: string; answer: string }>;
};

const sourcePath = resolve(process.cwd(), "../../content/articles/tecmambo-september-30-2026-articles-pack.md");

const formatBySlug: Record<string, Format> = {
  "sony-japan-ps5-pro-activity-verified-lottery": "news",
  "copia-kenya-liquidation-high-court-ecommerce": "business",
  "nuran-infratel-starlink-rural-backhaul-nigeria": "news",
  "njoroge-proposal-mpesa-airtel-money-interest-wallet-balances": "business",
  "qualcomm-snapdragon-sound-elite-gen-2-smart-headphones": "news",
  "cbk-licenses-29-digital-credit-providers-total-281": "business",
  "openai-dots-personal-ai-agents-gpt-6-1-sol": "news",
  "south-africa-enterprises-ai-workloads-private-infrastructure": "business",
  "uk-tribunal-antitrust-suit-apple-amazon-revived": "business",
  "gsma-5g-ghana-nigeria-south-africa-ntn-satellite": "news",
  "mortgagemarket-ai-agent-south-africa-home-loans": "business"
};

const aiStorySlugs = new Set([
  "qualcomm-snapdragon-sound-elite-gen-2-smart-headphones",
  "openai-dots-personal-ai-agents-gpt-6-1-sol",
  "south-africa-enterprises-ai-workloads-private-infrastructure",
  "mortgagemarket-ai-agent-south-africa-home-loans"
]);

const heroImageBySlug: Record<string, Article["image"]> = {
  "sony-japan-ps5-pro-activity-verified-lottery": {
    src: "/articles/september30/PS5_Japan_Activity_Verified_Lottery.png",
    alt: "A PlayStation 5 Pro console and DualSense controller on a white studio background.",
    caption: "Sony Store Japan is using verified PlayStation activity and a lottery to allocate PS5 Pro stock during shortages.",
    credit: "Sony Interactive Entertainment",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "copia-kenya-liquidation-high-court-ecommerce": {
    src: "/articles/september30/Copia_Kenya_Liquidation_After_Two_Years_of_Administration.png",
    alt: "Two Copia Kenya agents carrying a blue delivery container outside a branded shop.",
    caption: "Copia's agent network was built to reach rural and peri-urban shoppers, but the Kenyan company has now entered liquidation.",
    credit: "Copia Kenya",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "nuran-infratel-starlink-rural-backhaul-nigeria": {
    src: "/articles/september30/NuRan_Infratel_Starlink_Nigeria.png",
    alt: "NuRAN Wireless branding above a remote mountain landscape with a person using a laptop.",
    caption: "NuRAN Wireless and Infratel are piloting Starlink satellite backhaul for rural mobile infrastructure in Nigeria.",
    credit: "tecMAMBO illustration",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "njoroge-proposal-mpesa-airtel-money-interest-wallet-balances": {
    src: "/articles/september30/Patrick_Njoroge_M_PESA_Wallet_Gain_Interest.png",
    alt: "Former Central Bank of Kenya governor Patrick Njoroge seated beside M-Pesa branding.",
    caption: "Former CBK governor Patrick Njoroge argues that mobile money wallet balances should generate returns for users.",
    credit: "tecMAMBO illustration",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "qualcomm-snapdragon-sound-elite-gen-2-smart-headphones": {
    src: "/articles/september30/Qualcomm_Snapdragon_Sound_Elite.png",
    alt: "A Snapdragon Sound Elite Gen 2 chip shown in a red illuminated product render.",
    caption: "Snapdragon Sound Elite Gen 2 is designed to bring on-device AI and direct cloud connectivity to smart headphones.",
    credit: "Qualcomm",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "cbk-licenses-29-digital-credit-providers-total-281": {
    src: "/articles/september30/CBK_Digital_Credit_Lenders.png",
    alt: "The Central Bank of Kenya name displayed on the front of its headquarters.",
    caption: "The Central Bank of Kenya has licensed 29 additional digital credit providers, bringing the regulated total to 281.",
    credit: "Central Bank of Kenya",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "openai-dots-personal-ai-agents-gpt-6-1-sol": {
    src: "/articles/september30/OpenAI_Dots_Personal_AI_Agents.png",
    alt: "A conference audience watching a stage presentation for colorful Dots AI agents.",
    caption: "OpenAI introduced Dots as persistent personal AI agents alongside the cost-optimized GPT-6.1 Sol model.",
    credit: "tecMAMBO illustration",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "south-africa-enterprises-ai-workloads-private-infrastructure": {
    src: "/articles/september30/South_African_Enterprises_Shift_AI_Workloads_From_Public_Cloud.png",
    alt: "The letters AI styled with the South African flag and rising from a cracked surface.",
    caption: "South African enterprises are moving some AI workloads to private infrastructure for greater control over cost, data and performance.",
    credit: "tecMAMBO illustration",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "uk-tribunal-antitrust-suit-apple-amazon-revived": {
    src: "/articles/september30/Apple_Amazon_UK_Antitrust_Lawsuit.png",
    alt: "An Apple Store entrance with an Apple flag outside an ornate stone building.",
    caption: "A UK tribunal has allowed part of an antitrust lawsuit concerning Apple products sold through Amazon's marketplace to proceed.",
    credit: "tecMAMBO illustration",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "gsma-5g-ghana-nigeria-south-africa-ntn-satellite": {
    src: "/articles/september30/5G_Rollout_Speeds_Up_Across_Ghana_Nigeria_and_South_Africa.png",
    alt: "A speaker presenting on a brightly lit stage at a Ghana 5G launch event.",
    caption: "Ghana's 5G launch reflects accelerating next-generation mobile deployment across major African markets.",
    credit: "GSMA",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "mortgagemarket-ai-agent-south-africa-home-loans": {
    src: "/articles/september30/MortgageMarket_Launches_AI_Agent_to_Automate_South_African_Home_Loan_Applications.png",
    alt: "Two MortgageMarket representatives standing in front of the company's purple branding.",
    caption: "MortgageMarket's ZeroCapture AI agent is designed to automate document processing in South African home-loan applications.",
    credit: "MortgageMarket",
    width: 1774,
    height: 887,
    type: "image/png"
  }
};

const taxonomyBySlug: Record<string, { topics: string[]; brands: string[]; regions: string[] }> = {
  "sony-japan-ps5-pro-activity-verified-lottery": {
    topics: ["gaming", "hardware", "consumer-tech"],
    brands: ["sony", "playstation"],
    regions: []
  },
  "copia-kenya-liquidation-high-court-ecommerce": {
    topics: ["kenya", "startups", "e-commerce", "business", "venture-capital"],
    brands: [],
    regions: ["kenya"]
  },
  "nuran-infratel-starlink-rural-backhaul-nigeria": {
    topics: ["telecoms", "connectivity", "infrastructure"],
    brands: ["starlink", "spacex"],
    regions: ["nigeria"]
  },
  "njoroge-proposal-mpesa-airtel-money-interest-wallet-balances": {
    topics: ["kenya", "fintech", "mobile-money", "payments", "policy"],
    brands: ["m-pesa", "airtel", "safaricom"],
    regions: ["kenya"]
  },
  "qualcomm-snapdragon-sound-elite-gen-2-smart-headphones": {
    topics: ["audio", "wearables", "ai", "consumer-tech"],
    brands: ["qualcomm", "snapdragon", "meta"],
    regions: []
  },
  "cbk-licenses-29-digital-credit-providers-total-281": {
    topics: ["kenya", "fintech", "regulation", "banking"],
    brands: [],
    regions: ["kenya"]
  },
  "openai-dots-personal-ai-agents-gpt-6-1-sol": {
    topics: ["ai", "agentic-ai", "software"],
    brands: ["openai"],
    regions: []
  },
  "south-africa-enterprises-ai-workloads-private-infrastructure": {
    topics: ["ai", "cloud", "infrastructure", "business"],
    brands: [],
    regions: ["south-africa"]
  },
  "uk-tribunal-antitrust-suit-apple-amazon-revived": {
    topics: ["big-tech", "business", "regulation"],
    brands: ["apple", "amazon"],
    regions: []
  },
  "gsma-5g-ghana-nigeria-south-africa-ntn-satellite": {
    topics: ["connectivity", "telecoms", "infrastructure"],
    brands: [],
    regions: ["ghana", "nigeria", "south-africa"]
  },
  "mortgagemarket-ai-agent-south-africa-home-loans": {
    topics: ["fintech", "ai", "business"],
    brands: [],
    regions: ["south-africa"]
  }
};

const whyItMattersBySlug: Record<string, string> = {
  "sony-japan-ps5-pro-activity-verified-lottery": "The lottery tests whether verified account activity can put scarce consoles in the hands of players instead of automated resellers.",
  "copia-kenya-liquidation-high-court-ecommerce": "Copia's liquidation shows how quickly a capital-intensive e-commerce model can fail when logistics costs remain high and new funding disappears.",
  "nuran-infratel-starlink-rural-backhaul-nigeria": "Satellite backhaul could make rural mobile sites viable where terrestrial links are unavailable or too expensive.",
  "njoroge-proposal-mpesa-airtel-money-interest-wallet-balances": "Sharing trust income with wallet holders would change who benefits from the money stored across Kenya's mobile payment system.",
  "qualcomm-snapdragon-sound-elite-gen-2-smart-headphones": "Qualcomm is positioning headphones as an always-available interface for AI agents, not only as audio accessories.",
  "cbk-licenses-29-digital-credit-providers-total-281": "The additional licenses bring more digital lending under formal consumer-protection and data-use oversight.",
  "openai-dots-personal-ai-agents-gpt-6-1-sol": "Persistent agents and a lower-cost model could move AI from individual prompts toward work that continues in the background.",
  "south-africa-enterprises-ai-workloads-private-infrastructure": "Private and hybrid infrastructure can give enterprises more control over sensitive data and unpredictable AI computing costs.",
  "uk-tribunal-antitrust-suit-apple-amazon-revived": "The case could test whether marketplace agreements between large technology companies restricted seller competition and raised consumer prices.",
  "gsma-5g-ghana-nigeria-south-africa-ntn-satellite": "Africa's next connectivity phase depends on pairing urban 5G investment with affordable ways to close rural coverage gaps.",
  "mortgagemarket-ai-agent-south-africa-home-loans": "Automating document capture could shorten home-loan processing, provided lenders preserve accuracy, privacy and human oversight."
};

const sourcesBySlug: Record<string, Array<{ label: string; url: string }>> = {
  "sony-japan-ps5-pro-activity-verified-lottery": [
    { label: "PlayStation Japan purchase registration", url: "https://www.playstation.com/ja-jp/local/campaigns/ps5-pro-register-to-buy/" }
  ],
  "copia-kenya-liquidation-high-court-ecommerce": [
    { label: "High Court of Kenya liquidation judgment", url: "https://sheriahub.com/cases/ke/caselaw/copia-kenya-ltd-v-tuffsteel-ltd-another-2026-kehc-13879-klr" }
  ],
  "nuran-infratel-starlink-rural-backhaul-nigeria": [
    { label: "NuRAN Wireless press release filed with the SEC", url: "https://www.sec.gov/Archives/edgar/data/1680637/000175392626001845/g085961_ex99-1.htm" }
  ],
  "njoroge-proposal-mpesa-airtel-money-interest-wallet-balances": [
    { label: "Tech-ish report on Patrick Njoroge's mobile-money proposal", url: "https://tech-ish.com/2026/09/29/patrick-njoroge-says-m-pesa-and-airtel-money-should-pay-users-interest-on-wallets/" }
  ],
  "qualcomm-snapdragon-sound-elite-gen-2-smart-headphones": [
    { label: "Qualcomm Snapdragon Sound Elite Gen 2 announcement", url: "https://www.qualcomm.com/news/releases/2026/09/snapdragon-sound-elite-gen-2-advances-intelligent-audio-wearable" }
  ],
  "cbk-licenses-29-digital-credit-providers-total-281": [
    { label: "Central Bank of Kenya licensing announcement", url: "https://www.centralbank.go.ke/uploads/press_releases/366319113_Press%20Release%20-%20Licensing%20of%2029%20Additional%20Digital%20Credit%20Providers.pdf" }
  ],
  "openai-dots-personal-ai-agents-gpt-6-1-sol": [
    { label: "OpenAI DevDay 2026 developer resources", url: "https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006" },
    { label: "OpenAI GPT-6.1 Sol model documentation", url: "https://developers.openai.com/api/docs/models/gpt-6.1-sol" }
  ],
  "south-africa-enterprises-ai-workloads-private-infrastructure": [
    { label: "ETCIO report on South African private AI infrastructure", url: "https://ciome.economictimes.indiatimes.com/news/strategy-and-management/south-african-firms-begin-shifting-ai-workloads-into-private-infrastructure/134557618" }
  ],
  "uk-tribunal-antitrust-suit-apple-amazon-revived": [
    { label: "UK Competition Appeal Tribunal case record", url: "https://www.catribunal.org.uk/cases/17597725-jlp-aa-class-representative-limited" },
    { label: "9to5Mac report on the renewed lawsuit", url: "https://9to5mac.com/2026/09/28/apple-and-amazon-face-renewed-uk-antitrust-lawsuit/" }
  ],
  "gsma-5g-ghana-nigeria-south-africa-ntn-satellite": [
    { label: "GSMA Africa digital connectivity roadmap", url: "https://www.gsma.com/newsroom/press-release/gsma-and-pdaa-unveil-roadmap-to-close-africas-mobile-internet-usage-gap-and-connect-one-billion-people-by-2030/" },
    { label: "GSMA satellite interoperability update", url: "https://www.gsma.com/newsroom/article/scaling-satellite-connectivity-why-interoperability-matters-for-ntns-next-phase/" }
  ],
  "mortgagemarket-ai-agent-south-africa-home-loans": [
    { label: "BusinessTech report on MortgageMarket ZeroCapture", url: "https://businesstech.co.za/news/industry-news/877285/mortgagemarket-launches-ai-agent-to-eliminate-data-capturing-in-south-africa/" },
    { label: "Property Professional report on ZeroCapture", url: "https://propertyprofessional.co.za/2026/09/28/how-mortgagemarkets-new-ai-agent-zero-capture-just-solved-the-industrys-biggest-problem-data-capture/" }
  ]
};

function metadataValue(block: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`^- \\*\\*${escaped}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing September 30 field: ${label}`);
  return match[1].trim();
}

function parseFaq(source: string) {
  const entries = [...source.matchAll(/^\*\*(.+\?)\*\*\n([\s\S]*?)(?=\n\n\*\*.+\?\*\*|$)/gm)];
  if (entries.length < 4) throw new Error(`Expected at least four September 30 FAQ entries, found ${entries.length}.`);
  return entries.map((entry) => ({ question: entry[1]!.trim(), answer: entry[2]!.trim() }));
}

function parseArticle(source: string, number: number): ParsedArticle {
  const titleMatch = source.match(/^# (.+)$/m);
  const quickMatch = source.match(/^### Quick answer\n\n([\s\S]*?)\n\n(?=## )/m);
  if (!titleMatch?.[1] || !quickMatch?.[1]) throw new Error(`Malformed September 30 article ${number}.`);

  const bodyStart = source.indexOf("\n## ", quickMatch.index ?? 0);
  const faqStart = source.indexOf("\n## Frequently asked questions", bodyStart);
  const takeStart = source.indexOf("\n## The tecMAMBO take", faqStart);
  if (bodyStart < 0 || faqStart < 0 || takeStart < 0) throw new Error(`Missing September 30 article section ${number}.`);

  const editorialBody = `${source.slice(bodyStart + 1, faqStart).trim()}\n\n${source.slice(takeStart + 1).trim()}`;
  const faqSource = source.slice(faqStart + "\n## Frequently asked questions".length, takeStart).trim();

  return {
    number,
    category: metadataValue(source, "Category"),
    seoTitle: metadataValue(source, "SEO title"),
    description: metadataValue(source, "Meta description"),
    slug: metadataValue(source, "Slug"),
    keywords: metadataValue(source, "Tags").split(",").map((value) => value.trim()).filter(Boolean),
    title: titleMatch[1].trim(),
    quickAnswer: quickMatch[1].trim(),
    body: editorialBody.split(/\n{2,}/).map((value) => value.trim()).filter(Boolean),
    faq: parseFaq(faqSource)
  };
}

function parseBundle() {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/[\u2014\u2013\uFFFD]/.test(source)) throw new Error("The September 30 bundle contains a prohibited dash or malformed replacement character.");
  const matches = [...source.matchAll(/^<!-- ARTICLE (\d+) START -->$/gm)];
  if (matches.length !== 11) throw new Error(`Expected 11 September 30 articles, found ${matches.length}.`);
  return matches.map((match) => {
    const number = Number(match[1]);
    const endMarker = `<!-- ARTICLE ${number} END -->`;
    const start = (match.index ?? 0) + match[0].length;
    const end = source.indexOf(endMarker, start);
    if (end < 0) throw new Error(`Missing September 30 article end marker: ${number}`);
    return parseArticle(source.slice(start, end).trim(), number);
  });
}

function requiredBySlug<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const value = items.find((item) => item.slug === slug);
  if (!value) throw new Error(`Missing September 30 ${kind}: ${slug}`);
  return value;
}

const parsedArticles = parseBundle();

export const editorialSeptember30ImportReport = parsedArticles.map((article) => ({
  article: article.number,
  slug: article.slug,
  title: article.title,
  category: article.category,
  publicationStatus: "publish" as const,
  image: heroImageBySlug[article.slug]?.src,
  imageCredit: heroImageBySlug[article.slug]?.credit,
  newsArticleSchema: "enabled" as const,
  faqSchema: "mapped from visible FAQ data" as const,
  sitemapStatus: "eligible" as const,
  outstandingGates: [] as string[]
}));

export function buildEditorialSeptember30Articles({ authors, topics, brands, regions }: BuildArgs): Article[] {
  return parsedArticles.map((parsed, orderIndex) => {
    const taxonomy = taxonomyBySlug[parsed.slug];
    const format = formatBySlug[parsed.slug];
    const heroImage = heroImageBySlug[parsed.slug];
    const whyItMatters = whyItMattersBySlug[parsed.slug];
    const sources = sourcesBySlug[parsed.slug];
    if (!taxonomy || !format || !heroImage || !whyItMatters || !sources?.length) {
      throw new Error(`Missing September 30 configuration: ${parsed.slug}`);
    }

    const publishedAt = new Date(Date.parse("2026-09-30T08:00:00+03:00") + orderIndex * 31 * 60 * 1000).toISOString();
    const words = [parsed.title, parsed.quickAnswer, ...parsed.body, ...parsed.faq.flatMap((item) => [item.question, item.answer])]
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;

    return {
      id: `editorial-september-30-${parsed.number}`,
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
      author: requiredBySlug(authors, aiStorySlugs.has(parsed.slug) ? "lulu-camau" : "tim-humphreys", "author"),
      publishedAt,
      updatedAt: publishedAt,
      readTime: `${Math.max(4, Math.ceil(words / 220))} min read`,
      image: heroImage,
      tags: [
        ...taxonomy.topics.map((slug) => requiredBySlug(topics, slug, "topic")),
        ...taxonomy.brands.map((slug) => requiredBySlug(brands, slug, "brand"))
      ],
      regions: taxonomy.regions.map((slug) => requiredBySlug(regions, slug, "region")),
      sources,
      sourceDisclosure: `This report was checked against ${sources.length} linked source record${sources.length === 1 ? "" : "s"}.`,
      googleAdsEligible: true,
      workflowVersion: "gated",
      publicationStatus: "publish",
      editorialStatus: "published",
      indexingStatus: "index",
      excludeFromDiscovery: false,
      sourceChecked: true,
      humanEditorApproved: true,
      editor: "tecMAMBO Editorial Desk",
      reviewedAt: "2026-09-30T16:30:00+03:00",
      legalReviewedAt: "2026-09-30T16:30:00+03:00",
      hasOriginalPhotography: false,
      originalValueType: format === "business" ? "original_analysis" : "curated_context"
    };
  });
}
