import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, Author, Format, RegionTerm, Tag } from "@/lib/types";

type BuildArgs = { authors: Author[]; topics: Tag[]; brands: Tag[]; regions: RegionTerm[] };
type Parsed = {
  number: number;
  slug: string;
  format: Format;
  title: string;
  seoTitle: string;
  description: string;
  focusKeyphrase: string;
  secondaryKeywords: string[];
  byline: string;
  quickAnswer: string;
  body: string[];
  faq: Array<{ question: string; answer: string }>;
};

const sourcePath = resolve(process.cwd(), "../../content/articles/tecmambo-sept14-15-roundup-final-2026-09-15.md");

const scheduleBySlug: Record<string, string> = {
  "amodei-altman-musk-ai-slowdown-markets": "2026-09-15T10:27:00+03:00",
  "iphone-18-pro-max-us-qualcomm-modem-c2": "2026-09-15T10:55:00+03:00",
  "altman-two-ai-scenarios-china-trump-reaction": "2026-09-15T11:23:00+03:00",
  "valve-steam-frame-vr-headset-launch": "2026-09-15T11:51:00+03:00",
  "nairobi-e-mobility-week-2026-kicc": "2026-09-15T12:19:00+03:00",
  "twiga-foods-administration-gt-flow-kenya": "2026-09-15T12:47:00+03:00",
  "ios-27-release-siri-ai-overhaul-explained": "2026-09-15T13:15:00+03:00"
};

const taxonomyBySlug: Record<string, { topics: string[]; brands: string[]; regions?: string[] }> = {
  "iphone-18-pro-max-us-qualcomm-modem-c2": { topics: ["smartphones", "global", "connectivity"], brands: ["apple", "qualcomm"] },
  "ios-27-release-siri-ai-overhaul-explained": { topics: ["ai", "apps", "global"], brands: ["apple", "google"] },
  "nairobi-e-mobility-week-2026-kicc": { topics: ["evs-mobility", "kenya", "policy"], brands: ["kenya-power", "roam"], regions: ["kenya"] },
  "twiga-foods-administration-gt-flow-kenya": { topics: ["startups", "kenya", "fintech"], brands: ["twiga-foods"], regions: ["kenya"] },
  "amodei-altman-musk-ai-slowdown-markets": { topics: ["ai", "markets", "global"], brands: ["anthropic", "openai", "xai", "nvidia"] },
  "valve-steam-frame-vr-headset-launch": { topics: ["gaming", "vr-ar", "consumer-tech"], brands: ["valve", "qualcomm"] },
  "altman-two-ai-scenarios-china-trump-reaction": { topics: ["ai", "global", "politics"], brands: ["openai", "anthropic"] }
};

const heroBySlug: Record<string, Article["image"]> = {
  "iphone-18-pro-max-us-qualcomm-modem-c2": {
    src: "/articles/september15/Apple_iPhone_18_Max_Worldwide_C2_Modem.jpg",
    alt: "A purple iPhone 18 Pro Max held up in an Apple retail setting.",
    caption: "The iPhone 18 Pro Max uses different modem hardware in the United States than it does in other markets.",
    credit: "David Paul Morris/Bloomberg",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "ios-27-release-siri-ai-overhaul-explained": {
    src: "/articles/september15/Apple_Rollsout_iOS_27_Worldwide.jpg",
    alt: "Apple's iOS 27 icon against a flowing metallic background.",
    caption: "Apple released iOS 27 worldwide with a rebuilt Siri AI assistant at the centre of the update.",
    credit: "Apple",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "nairobi-e-mobility-week-2026-kicc": {
    src: "/articles/september15/Nairobi_Emobility_Week_KICC.jpg",
    alt: "Electric vehicles, motorcycles, buses and exhibitor stands inside Nairobi E-Mobility Week at KICC.",
    caption: "Nairobi E-Mobility Week brought electric cars, buses, motorcycles and charging companies together at KICC.",
    credit: "Kenya Power/Facebook",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "twiga-foods-administration-gt-flow-kenya": {
    src: "/articles/september15/Twiga_Foods_Placed_Under_Administration.jpg",
    alt: "A row of Twiga Foods delivery trucks outside a distribution facility.",
    caption: "Twiga Foods entered administration through its operating entity, GT Flow Limited, after years of restructuring and financial pressure.",
    credit: "Twiga Foods",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "amodei-altman-musk-ai-slowdown-markets": {
    src: "/articles/september15/Anthropic_OpenAI_xAI_CEOs_Slowdown_on_AI.jpg",
    alt: "Dario Amodei, Sam Altman and Elon Musk pictured side by side beneath their companies' logos.",
    caption: "Dario Amodei, Sam Altman and Elon Musk backed calls to slow the pace of frontier AI development.",
    credit: "",
    creditOmitted: true,
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "valve-steam-frame-vr-headset-launch": {
    src: "/articles/september15/Valve_Steam_Frame_Now_Available.jpg",
    alt: "Valve Steam Frame virtual reality headset with two handheld controllers.",
    caption: "Valve's Steam Frame is a standalone and wireless PC streaming headset with two motion controllers.",
    credit: "Valve",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "altman-two-ai-scenarios-china-trump-reaction": {
    src: "/articles/september15/OpenAI_CEO_Sam_Altman.jpg",
    alt: "OpenAI CEO Sam Altman speaking in front of the OpenAI logo.",
    caption: "OpenAI CEO Sam Altman warned about losing human control of AI and concentrating too much power in one person, company or country.",
    credit: "Getty Images",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  }
};

const sourcesBySlug: Record<string, Article["sources"]> = {
  "iphone-18-pro-max-us-qualcomm-modem-c2": [
    { label: "Apple: iPhone 18 Pro and iPhone 18 Pro Max technical specifications", url: "https://www.apple.com/iphone-18-pro/specs/" },
    { label: "MacRumors: iPhone 18 Pro Max sold in the US differs in one way", url: "https://www.macrumors.com/2026/09/12/iphone-18-pro-max-us-model-difference/" }
  ],
  "ios-27-release-siri-ai-overhaul-explained": [
    { label: "Apple: next generation of Apple Intelligence and Siri AI", url: "https://www.apple.com/newsroom/2026/06/apple-unveils-next-generation-of-apple-intelligence-siri-ai-and-more/" },
    { label: "Apple: Apple Intelligence and Google Gemini collaboration", url: "https://www.apple.com/newsroom/2026/06/apple-intelligence-brings-powerful-ai-capabilities-into-everyday-experiences/" },
    { label: "Apple Support: about iOS 27 updates", url: "https://support.apple.com/en-ae/149076" }
  ],
  "nairobi-e-mobility-week-2026-kicc": [
    { label: "Electric KE: Nairobi E-Mobility Week 2026", url: "https://electric.ke/events/nairobi-e-mobility-week-2026/" },
    { label: "UNEP: Africa Clean Mobility Week", url: "https://www.unep.org/events/conference/africa-clean-mobility-week" }
  ],
  "twiga-foods-administration-gt-flow-kenya": [
    { label: "tech-ish: GT Flow entered administration", url: "https://tech-ish.com/2026/09/14/twiga-foods-is-in-administration-16-months-after-the-leaked-plan-we-published/" },
    { label: "Capital FM Kenya: GT Flow placed under administration", url: "https://capitalfm.africa/gt-flow-formerly-twiga-foods-placed-under-administration-for-debt-recovery/" },
    { label: "Kenya Law: Insolvency Act", url: "https://new.kenyalaw.org/akn/ke/act/2015/18/eng@2022-12-31" }
  ],
  "amodei-altman-musk-ai-slowdown-markets": [
    { label: "Dario Amodei: We Must Pace the Frontier", url: "https://darioamodei.com/post/we-must-pace-the-frontier" },
    { label: "AP: Trump responds to AI leaders' pacing calls", url: "https://apnews.com/article/b85df16775ff7e9611a456b061a0e4b9" },
    { label: "Washington Post: AI leaders discuss a safety body", url: "https://www.washingtonpost.com/technology/2026/09/14/anthropic-openai-google-discussed-creating-new-ai-safety-body/" }
  ],
  "valve-steam-frame-vr-headset-launch": [
    { label: "Valve: Steam Frame", url: "https://store.steampowered.com/sale/steamframe" },
    { label: "Road to VR: Steam Frame price, release and accessories", url: "https://roadtovr.com/valve-steam-frame-price-release-pre-orders/" },
    { label: "PC Gamer: Valve explains Steam Frame pricing", url: "https://www.pcgamer.com/hardware/vr-hardware/valve-targeted-a-lower-price-for-the-steam-frame-then-the-memory-crisis-happened-i-wish-we-could-have-shipped-it-at-the-price-that-we-were-at-last-year/" }
  ],
  "altman-two-ai-scenarios-china-trump-reaction": [
    { label: "Axios: Sam Altman's two AI risk scenarios", url: "https://www.axios.com/2026/09/14/openai-sam-altman-ai-threat-doom-doomerism" },
    { label: "AP: Trump responds to AI leaders' pacing calls", url: "https://apnews.com/article/b85df16775ff7e9611a456b061a0e4b9" },
    { label: "Dario Amodei: We Must Pace the Frontier", url: "https://darioamodei.com/post/we-must-pace-the-frontier" }
  ]
};

const originalValueBySlug: Record<string, string> = {
  "iphone-18-pro-max-us-qualcomm-modem-c2": "Explains the exact regional modem split and separates confirmed specifications from likely contractual reasoning.",
  "ios-27-release-siri-ai-overhaul-explained": "Explains how hardware and regional restrictions create different iOS 27 experiences despite one shared version number.",
  "nairobi-e-mobility-week-2026-kicc": "Connects the event programme to Kenya's electric two-wheeler growth and battery swapping market.",
  "twiga-foods-administration-gt-flow-kenya": "Separates statutory administration from liquidation and reconstructs the operating company's longer restructuring timeline.",
  "amodei-altman-musk-ai-slowdown-markets": "Connects the AI pacing proposal to company commitments, market pricing and Anthropic's IPO tension.",
  "valve-steam-frame-vr-headset-launch": "Explains why memory costs shaped Steam Frame pricing and distinguishes confirmed launch specifications from earlier reporting errors.",
  "altman-two-ai-scenarios-china-trump-reaction": "Separates Altman's two risk scenarios from the competing diplomatic and domestic political responses around them."
};

function value(source: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing September 15 field: ${label}`);
  return match[1].trim().replace(/^`|`$/g, "");
}

function required<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing September 15 ${kind}: ${slug}`);
  return item;
}

function firstSentence(text: string) {
  return text.match(/^.+?[.!?](?:\s|$)/)?.[0]?.trim() ?? text;
}

function addInternalLinks(parsed: Parsed) {
  if (parsed.slug === "amodei-altman-musk-ai-slowdown-markets") {
    parsed.quickAnswer = parsed.quickAnswer.replace(
      "see our companion deep-dive.",
      "see our [companion geopolitical deep-dive](/explainers/altman-two-ai-scenarios-china-trump-reaction)."
    );
  }
  if (parsed.slug === "altman-two-ai-scenarios-china-trump-reaction") {
    parsed.quickAnswer += " For the market reaction and Anthropic's IPO tension, see our [companion business analysis](/explainers/amodei-altman-musk-ai-slowdown-markets).";
  }
  if (parsed.slug === "valve-steam-frame-vr-headset-launch") {
    parsed.body = parsed.body.map((part) => part.replace(
      "Apple raised iPhone prices $100 across multiple models this month",
      "[Apple raised iPhone prices $100 across multiple models this month](/explainers/iphone-18-pro-max-us-qualcomm-modem-c2)"
    ));
  }
  if (parsed.slug === "nairobi-e-mobility-week-2026-kicc") {
    parsed.body = parsed.body.map((part) => part.replace(
      "Roam, a Kenyan electric motorcycle manufacturer whose Gen 3 battery cuts charging time to under 40 minutes",
      "[Roam, a Kenyan electric motorcycle manufacturer whose Gen 3 battery cuts charging time to under 40 minutes](/real-life/roam-gen-3-battery-working-boda-boda-riders)"
    ));
  }
}

function parseBundle(): Parsed[] {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/[—–�]/.test(source)) throw new Error("The September 15 source contains a prohibited dash or malformed character.");
  const blocks = source.split(/^# ARTICLE \d+(?: \(HERO\))?\s*$/m).slice(1, 8).map((block) => block.trim().replace(/\n\n---[\s\S]*$/, "").trim());
  if (blocks.length !== 7) throw new Error(`Expected 7 September 15 articles, found ${blocks.length}.`);
  return blocks.map((block, index) => {
    const title = value(block, "H1");
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const bodyMatch = block.match(new RegExp(`^# ${escapedTitle}\\n\\n([\\s\\S]*?)\\n\\n## Sources\\n`, "m"));
    if (!bodyMatch?.[1]) throw new Error(`Malformed September 15 article: ${title}`);
    const parts = bodyMatch[1].trim().split(/\n{2,}/).map((part) => part.trim());
    const quickAnswer = parts.shift()?.match(/^\*\*Quick answer:\*\*\s*([\s\S]+)$/)?.[1]?.trim();
    if (!quickAnswer) throw new Error(`Missing September 15 quick answer: ${title}`);
    const faqIndex = parts.indexOf("## Frequently asked questions");
    if (faqIndex < 0) throw new Error(`Missing September 15 FAQ: ${title}`);
    const faqParts = parts.splice(faqIndex).slice(1);
    const faq = faqParts.map((part) => {
      const [questionLine, ...answerLines] = part.split("\n");
      const question = questionLine?.match(/^\*\*(.+\?)\*\*$/)?.[1];
      const answer = answerLines.join(" ").trim();
      if (!question || !answer) throw new Error(`Malformed September 15 FAQ: ${title}`);
      return { question, answer };
    });
    const parsed: Parsed = {
      number: index + 1,
      slug: value(block, "Suggested slug"),
      format: "explainer",
      title,
      seoTitle: value(block, "SEO title"),
      description: value(block, "Meta description"),
      focusKeyphrase: value(block, "Focus keyphrase"),
      secondaryKeywords: value(block, "Secondary keywords").split(",").map((keyword) => keyword.trim()),
      byline: value(block, "Byline"),
      quickAnswer,
      body: parts,
      faq
    };
    addInternalLinks(parsed);
    return parsed;
  });
}

const parsedArticles = parseBundle();

export const editorialSeptember15ImportReport = parsedArticles.map((article) => ({
  article: article.number,
  slug: article.slug,
  byline: article.byline,
  categories: taxonomyBySlug[article.slug]?.topics ?? [],
  publicationStatus: "published" as const,
  outstandingGates: []
}));

export function buildEditorialSeptember15Articles({ authors, topics, brands, regions }: BuildArgs): Article[] {
  return parsedArticles.map((parsed) => {
    const taxonomy = taxonomyBySlug[parsed.slug];
    const publishedAt = scheduleBySlug[parsed.slug];
    const image = heroBySlug[parsed.slug];
    const sources = sourcesBySlug[parsed.slug];
    if (!taxonomy || !publishedAt || !image || !sources?.length) throw new Error(`Incomplete September 15 article mapping: ${parsed.slug}`);
    const words = [parsed.title, parsed.quickAnswer, ...parsed.body, ...parsed.faq.flatMap((item) => [item.question, item.answer])].join(" ").split(/\s+/).filter(Boolean).length;
    return {
      id: `editorial-september15-${parsed.number}`,
      slug: parsed.slug,
      format: parsed.format,
      contentFormat: "explainer",
      isNewsworthy: true,
      title: parsed.title,
      seo: { title: parsed.seoTitle, description: parsed.description, focusKeyphrase: parsed.focusKeyphrase, secondaryKeywords: parsed.secondaryKeywords },
      subhead: parsed.description,
      excerpt: firstSentence(parsed.quickAnswer),
      whyItMatters: originalValueBySlug[parsed.slug]!,
      quickAnswer: parsed.quickAnswer,
      body: parsed.body,
      faq: parsed.faq,
      author: required(authors, parsed.byline === "Lulu Camau" ? "lulu-camau" : "tim-humphreys", "author"),
      publishedAt,
      updatedAt: "2026-09-15T13:45:00+03:00",
      readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
      image,
      tags: [...taxonomy.topics.map((slug) => required(topics, slug, "topic")), ...taxonomy.brands.map((slug) => required(brands, slug, "brand"))],
      regions: taxonomy.regions?.map((slug) => required(regions, slug, "region")),
      sources,
      sourceDisclosure: "Claims were checked against the linked primary and authoritative sources on September 15, 2026.",
      legalReviewedAt: "2026-09-15T13:50:00+03:00",
      googleAdsEligible: true,
      workflowVersion: "gated",
      publicationStatus: "publish",
      editorialStatus: "published",
      indexingStatus: "index",
      excludeFromDiscovery: false,
      sourceChecked: true,
      humanEditorApproved: true,
      editor: "tecMAMBO Editorial Desk",
      reviewedAt: "2026-09-15T13:50:00+03:00",
      hasOriginalPhotography: false,
      originalValueType: "curated_context"
    };
  });
}
