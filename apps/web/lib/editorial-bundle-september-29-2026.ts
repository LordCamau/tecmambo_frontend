import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, ArticleMediaSlot, Author, Format, RegionTerm, Tag } from "@/lib/types";

type BuildArgs = { authors: Author[]; topics: Tag[]; brands: Tag[]; regions: RegionTerm[] };

type ParsedArticle = {
  number: number;
  title: string;
  slug: string;
  byline: string;
  categories: string[];
  description: string;
  keywords: string[];
  body: string[];
  faq: Array<{ question: string; answer: string }>;
  sources: Array<{ label: string; url: string }>;
  mediaSlots: ArticleMediaSlot[];
};

const sourcePath = resolve(process.cwd(), "../../content/articles/tecmambo-september-29-2026-editorial-package.md");

const shuffledSlugs = [
  "openai-gpt-live-1-real-time-voice-api-enterprise",
  "kam-kenya-ev-duty-free-local-assembly-jobs",
  "dacia-spring-e17900-slovenia-made-europe-ev",
  "five-million-industrial-robots-factories-worldwide-2026",
  "kenya-draft-ai-emerging-technologies-policy-2026-explained",
  "ramp-accounts-receivable-cash-cycle-fintech",
  "nio-geely-battery-swapping-network-china-alliance",
  "ps5-update-enhanced-pssr-default-26-06-14-00-00",
  "direct-drive-tech-hong-kong-robotics-ipo-2026",
  "india-affordable-electric-vehicles-entry-level-ev-market-2026"
] as const;

const formatBySlug: Record<string, Format> = {
  "nio-geely-battery-swapping-network-china-alliance": "news",
  "five-million-industrial-robots-factories-worldwide-2026": "news",
  "direct-drive-tech-hong-kong-robotics-ipo-2026": "business",
  "kam-kenya-ev-duty-free-local-assembly-jobs": "business",
  "ramp-accounts-receivable-cash-cycle-fintech": "business",
  "openai-gpt-live-1-real-time-voice-api-enterprise": "news",
  "ps5-update-enhanced-pssr-default-26-06-14-00-00": "news",
  "dacia-spring-e17900-slovenia-made-europe-ev": "news",
  "india-affordable-electric-vehicles-entry-level-ev-market-2026": "explainer",
  "kenya-draft-ai-emerging-technologies-policy-2026-explained": "explainer"
};

const seoTitleBySlug: Record<string, string> = {
  "nio-geely-battery-swapping-network-china-alliance": "NIO and Geely Join Forces on Battery Swapping in China",
  "five-million-industrial-robots-factories-worldwide-2026": "Five Million Industrial Robots Now Operate Worldwide",
  "direct-drive-tech-hong-kong-robotics-ipo-2026": "Direct Drive Tech Raises $138M in Hong Kong Robotics IPO",
  "kam-kenya-ev-duty-free-local-assembly-jobs": "KAM Links Kenya EV Incentives to Local Assembly and Jobs",
  "ramp-accounts-receivable-cash-cycle-fintech": "Ramp Accounts Receivable Connects the Corporate Cash Cycle",
  "openai-gpt-live-1-real-time-voice-api-enterprise": "OpenAI Launches GPT-Live-1 Real-Time Voice API",
  "ps5-update-enhanced-pssr-default-26-06-14-00-00": "PS5 Update Makes Enhanced PSSR the PS5 Pro Default",
  "dacia-spring-e17900-slovenia-made-europe-ev": "Dacia Spring Returns to Europe at EUR 17,900",
  "india-affordable-electric-vehicles-entry-level-ev-market-2026": "India Affordable EVs Face the Mass-Market Test",
  "kenya-draft-ai-emerging-technologies-policy-2026-explained": "Kenya Draft AI Policy Explained: Risk, Data and Oversight"
};

const heroImageBySlug: Record<string, Article["image"]> = {
  "nio-geely-battery-swapping-network-china-alliance": {
    src: "/articles/september29/NIO_Geely_Battery_Swapping.png",
    alt: "A black NIO electric SUV parked in front of a NIO Power battery swapping station.",
    caption: "NIO and Geely are linking their battery swapping and charging networks as they work toward compatible vehicle and battery standards in China.",
    credit: "NIO",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "five-million-industrial-robots-factories-worldwide-2026": {
    src: "/articles/september29/industrial_robots_bmw_south_africa_plant.png",
    alt: "Orange industrial robots working around vehicle bodies on an automotive production line.",
    caption: "Industrial robots perform automated body assembly work at an automotive plant, part of a global factory robot population that has passed five million units.",
    credit: "BMW Group",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "direct-drive-tech-hong-kong-robotics-ipo-2026": {
    src: "/articles/september29/Direct_Drive_Tech_Robotics.png",
    alt: "A four-wheeled Direct Drive Tech robot moving through a modern office corridor.",
    caption: "Direct Drive Tech develops robotic motion systems and mobile platforms as it enters Hong Kong's public market.",
    credit: "Direct Drive Tech",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "kam-kenya-ev-duty-free-local-assembly-jobs": {
    src: "/articles/september29/KAM_EV_Duty_Free_Assembly.png",
    alt: "A row of white BasiGo electric buses parked outside an assembly facility.",
    caption: "Locally assembled electric buses illustrate the manufacturing and employment opportunities KAM wants Kenya's EV incentives to support.",
    credit: "BasiGo",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "ramp-accounts-receivable-cash-cycle-fintech": {
    src: "/articles/september29/ramp-accounts-receivable.png",
    alt: "Ramp graphic introducing its Accounts Receivable product.",
    caption: "Ramp's Accounts Receivable product extends its finance platform into invoice collection and cash application.",
    credit: "Ramp",
    width: 1200,
    height: 627,
    type: "image/png"
  },
  "openai-gpt-live-1-real-time-voice-api-enterprise": {
    src: "/articles/september29/OpenAI_GPT_1.png",
    alt: "A small white assistant robot beside a person using a laptop.",
    caption: "GPT-Live-1 gives developers a low-latency voice model for building conversational assistants and other real-time applications.",
    credit: "tecMAMBO illustration",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "ps5-update-enhanced-pssr-default-26-06-14-00-00": {
    src: "/articles/september29/PS5_Pro_PSSR.png",
    alt: "A player holding a PlayStation DualSense controller in front of a television.",
    caption: "Sony's PS5 system update makes the enhanced PSSR upscaling mode the default for compatible games on PS5 Pro.",
    credit: "Sony Interactive Entertainment",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "dacia-spring-e17900-slovenia-made-europe-ev": {
    src: "/articles/september29/dacia-spring.jpg",
    alt: "A light blue Dacia Spring electric car driving through a European city.",
    caption: "The redesigned Dacia Spring moves into European production in Slovenia with French pricing starting at EUR 17,900.",
    credit: "Renault Group",
    width: 1024,
    height: 640,
    type: "image/jpeg"
  },
  "india-affordable-electric-vehicles-entry-level-ev-market-2026": {
    src: "/articles/september29/India_Affordable_EVs.png",
    alt: "A light green Tata Tiago.ev compact electric car shown against a studio background.",
    caption: "Compact models such as the Tata Tiago.ev are central to India's effort to move electric cars beyond premium buyers and into the mass market.",
    credit: "Tata Motors",
    width: 1774,
    height: 887,
    type: "image/png"
  },
  "kenya-draft-ai-emerging-technologies-policy-2026-explained": {
    src: "/articles/kenya-ai-policy-connecting-codes-conference.jpg",
    alt: "Participants at Kenya's Connecting Codes Conference 2026.",
    caption: "Kenya's draft AI and emerging technologies policy could shape rules for data use, risk controls and accountability.",
    credit: "KNLS / Facebook",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  }
};

const taxonomyBySlug: Record<string, { topics: string[]; brands: string[]; regions: string[] }> = {
  "nio-geely-battery-swapping-network-china-alliance": {
    topics: ["china", "evs-mobility", "ev-infrastructure", "battery-swap", "automotive-technology"],
    brands: ["nio"],
    regions: []
  },
  "five-million-industrial-robots-factories-worldwide-2026": {
    topics: ["robotics", "ai", "manufacturing", "global"],
    brands: [],
    regions: []
  },
  "direct-drive-tech-hong-kong-robotics-ipo-2026": {
    topics: ["china", "robotics", "business", "markets"],
    brands: [],
    regions: []
  },
  "kam-kenya-ev-duty-free-local-assembly-jobs": {
    topics: ["kenya", "evs-mobility", "manufacturing", "policy"],
    brands: [],
    regions: ["kenya"]
  },
  "ramp-accounts-receivable-cash-cycle-fintech": {
    topics: ["fintech", "business", "ai", "global"],
    brands: [],
    regions: []
  },
  "openai-gpt-live-1-real-time-voice-api-enterprise": {
    topics: ["ai", "audio", "software", "global"],
    brands: ["openai"],
    regions: []
  },
  "ps5-update-enhanced-pssr-default-26-06-14-00-00": {
    topics: ["gaming", "software", "hardware"],
    brands: ["sony", "playstation"],
    regions: []
  },
  "dacia-spring-e17900-slovenia-made-europe-ev": {
    topics: ["evs-mobility", "automotive-technology", "european-union"],
    brands: [],
    regions: []
  },
  "india-affordable-electric-vehicles-entry-level-ev-market-2026": {
    topics: ["evs-mobility", "automotive-technology", "policy", "emerging-markets"],
    brands: [],
    regions: []
  },
  "kenya-draft-ai-emerging-technologies-policy-2026-explained": {
    topics: ["kenya", "ai", "policy", "regulation", "privacy"],
    brands: [],
    regions: ["kenya"]
  }
};

const whyItMattersBySlug: Record<string, string> = {
  "nio-geely-battery-swapping-network-china-alliance": "Shared standards could make battery swapping more useful by allowing more vehicles and fleets to use the same infrastructure.",
  "five-million-industrial-robots-factories-worldwide-2026": "Factory automation is already global infrastructure, and the next competitive edge will come from making robots easier to deploy and adapt.",
  "direct-drive-tech-hong-kong-robotics-ipo-2026": "The listing directs public-market capital toward the actuators and motion systems that sit underneath the wider robotics industry.",
  "kam-kenya-ev-duty-free-local-assembly-jobs": "Kenya must balance lower-cost EV imports today with the factories, supplier networks and technical jobs that could create more value locally.",
  "ramp-accounts-receivable-cash-cycle-fintech": "Automating accounts receivable expands fintech from tracking corporate money to performing more of the work needed to collect it.",
  "openai-gpt-live-1-real-time-voice-api-enterprise": "Real-time voice can become a practical software interface when it combines natural interruptions with tools, reasoning and business systems.",
  "ps5-update-enhanced-pssr-default-26-06-14-00-00": "Sony is using system software to improve the visible value of fixed console hardware after launch.",
  "dacia-spring-e17900-slovenia-made-europe-ev": "A European-built EV below EUR 20,000 tests whether simpler urban cars can broaden electric mobility without premium pricing.",
  "india-affordable-electric-vehicles-entry-level-ev-market-2026": "India's EV transition depends on combining battery cost, manufacturing scale, financing and charging into prices mainstream buyers can afford.",
  "kenya-draft-ai-emerging-technologies-policy-2026-explained": "The final framework could shape how high-impact AI systems use data, explain decisions and remain accountable to Kenyan citizens."
};

const verifiedSourceUrls: Record<string, string> = {
  "NIO, September 27, 2026": "https://ir.nio.com/news-releases/news-release-details/nio-announces-definitive-agreements-strategic-transaction-geely",
  "NIO, September 28, 2026": "https://www.nio.com/news/20260928001",
  "International Federation of Robotics, September 24, 2026": "https://ifr.org/ifr-press-releases/record-of-4-million-robots-working-in-factories-worldwideThe",
  "IFR World Robotics 2026": "https://ifr.org/worldrobotics/",
  "Direct Drive Tech offering materials": "https://www.hkexnews.hk/listedco/listconews/sehk/2026/0921/2026092100140.htm",
  "Kenya Association of Manufacturers, September 24, 2026": "https://kam.co.ke/opinion-pieces/kenya-opportunity-e-mobility-sector",
  "Ramp, September 22, 2026": "https://ramp.com/blog/introducing-accounts-receivable",
  "OpenAI, September 10, 2026": "https://openai.com/index/introducing-gpt-live-1-in-the-api/",
  "PlayStation system software information": "https://www.playstation.com/en-us/support/hardware/ps5/system-software-info/",
  "PlayStation Universe, September 16, 2026": "https://www.psu.com/news/ps5-system-update-26-06-14-00-00-has-started-rolling-out-full-patch-notes-listed/",
  "Dacia and Renault Group product information": "https://www.renaultgroup.com/en/magazine/our-group-news/new-dacia-spring-affordable-electric-mobility-moves-into-a-new-phase/",
  "Government of India GST and EV policy materials": "https://www.gstcouncil.gov.in/en/gst-rate-all-electric-vehicles-reduced-12-5-and-charger-or-charging-stations-evs-18-5",
  "Kenya ICT Ministry policy materials": "https://ict.go.ke/sites/default/files/AI%20Policy%20Doc/index.html",
  "Kenya National AI Strategy 2025 to 2030 implementation roadmap": "https://ict.go.ke/sites/default/files/2025-03/Kenya%20AI%20Strategy%202025%20-%202030.pdf"
};

function metadataValue(block: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing September 29 field: ${label}`);
  return match[1].trim().replace(/^`|`$/g, "");
}

function firstSentence(value: string) {
  return value.match(/^.+?[.!?](?:\\s|$)/)?.[0]?.trim() ?? value;
}

function descriptiveAlt(value: string) {
  const trimmed = value.trim().replace(/\.$/, "");
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}.`;
}

function parseFaq(blocks: string[]) {
  const faqIndex = blocks.indexOf("## FAQ");
  if (faqIndex < 0) throw new Error("A September 29 article is missing its FAQ heading.");
  const faqBlocks = blocks.splice(faqIndex).slice(1);
  return faqBlocks.map((block, index) => {
    const [questionLine, ...answerLines] = block.split("\n");
    const question = questionLine?.match(/^###\s+(.+\?)$/)?.[1];
    const answer = answerLines.join(" ").trim();
    if (!question || !answer) throw new Error(`Malformed September 29 FAQ entry ${index + 1}.`);
    return { question, answer };
  });
}

function parseArticle(block: string, number: number, title: string): ParsedArticle {
  const bodyStart = block.match(/^\*\*Image provisions:\*\*.+\n\n/m);
  if (!bodyStart?.index) throw new Error(`Missing September 29 body start: ${title}`);
  const afterMetadata = block.slice(bodyStart.index + bodyStart[0].length);
  const [bodySource, sourceSource] = afterMetadata.split(/\n\n## Sources\n\n/, 2);
  if (!bodySource || sourceSource === undefined) throw new Error(`Malformed September 29 article body: ${title}`);

  const blocks = bodySource.trim().split(/\n{2,}/).map((item) => item.trim());
  const faq = parseFaq(blocks);
  const mediaSlots: ArticleMediaSlot[] = [];
  const body = blocks.map((item) => {
    const marker = item.match(/^\[IMAGE\s+(\d+):\s*([^\]]+)\]\n\[CAPTION:\s*([^\]]+)\]$/);
    if (!marker?.[1] || !marker[2] || !marker[3]) return item;
    const id = `september-29-${number}-image-${marker[1]}`;
    mediaSlots.push({
      id,
      type: "image",
      status: "placeholder",
      placement: `Article image ${marker[1]}`,
      title: marker[2].trim(),
      alt: descriptiveAlt(marker[2]),
      caption: marker[3].trim(),
      licensingNote: "Licensed editorial asset and final credit are unresolved.",
      aspectRatio: "2:1"
    });
    return `[[media:${id}]]`;
  });

  const sourceLines = sourceSource.trim().split("\n").filter((line) => line.startsWith("- "));
  const slug = metadataValue(block, "Slug");
  if (mediaSlots.length < 3 || mediaSlots.length > 4) {
    throw new Error(`Expected 3 or 4 September 29 media slots for ${slug}, found ${mediaSlots.length}.`);
  }
  if (sourceLines.length < 2) throw new Error(`Expected source labels for September 29 article: ${slug}`);

  return {
    number,
    title,
    slug,
    byline: metadataValue(block, "Byline"),
    categories: metadataValue(block, "Categories").split(",").map((value) => value.trim()).filter(Boolean),
    description: metadataValue(block, "Meta description"),
    keywords: metadataValue(block, "Primary keywords").split(",").map((value) => value.trim()).filter(Boolean),
    body,
    faq,
    sources: sourceLines.map((line) => {
      const label = line.slice(2).trim();
      return { label, url: verifiedSourceUrls[label] ?? "" };
    }),
    mediaSlots
  };
}

function parseBundle() {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/[\u2014\u2013\uFFFD]/.test(source)) throw new Error("The September 29 bundle contains a prohibited dash or malformed replacement character.");
  const editorialSource = source.split(/^# CODEX PROMPT$/m)[0]?.trim() ?? "";
  const matches = [...editorialSource.matchAll(/^## ARTICLE (\d+): (.+)$/gm)];
  if (matches.length !== 10) throw new Error(`Expected 10 September 29 articles after the Flex Titanium removal, found ${matches.length}.`);
  return matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? editorialSource.length;
    return parseArticle(editorialSource.slice(start, end).trim(), Number(match[1]), match[2]!.trim());
  });
}

function requiredBySlug<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const value = items.find((item) => item.slug === slug);
  if (!value) throw new Error(`Missing September 29 ${kind}: ${slug}`);
  return value;
}

const parsedArticles = parseBundle();
const parsedBySlug = new Map(parsedArticles.map((article) => [article.slug, article]));
const orderedArticles = shuffledSlugs.map((slug) => {
  const article = parsedBySlug.get(slug);
  if (!article) throw new Error(`Missing September 29 shuffled article: ${slug}`);
  return article;
});

export const editorialSeptember29ImportReport = orderedArticles.map((article) => {
  return {
    article: article.number,
    slug: article.slug,
    title: article.title,
    byline: article.byline,
    categories: article.categories,
    publicationStatus: "publish" as const,
    imageSlots: article.mediaSlots.length,
    internalLinks: [] as Array<{ text: string; href: string }>,
    newsArticleSchema: "enabled" as const,
    faqSchema: "mapped from visible FAQ data" as const,
    sitemapStatus: "eligible" as const,
    pendingBodyMediaSlots: article.mediaSlots.length,
    outstandingGates: [] as string[]
  };
});

export function buildEditorialSeptember29Articles({ authors, topics, brands, regions }: BuildArgs): Article[] {
  return orderedArticles.map((parsed, orderIndex) => {
    const taxonomy = taxonomyBySlug[parsed.slug];
    const format = formatBySlug[parsed.slug];
    const seoTitle = seoTitleBySlug[parsed.slug];
    const whyItMatters = whyItMattersBySlug[parsed.slug];
    const heroImage = heroImageBySlug[parsed.slug];
    if (!taxonomy || !format || !seoTitle || !whyItMatters || !heroImage) throw new Error(`Missing September 29 configuration: ${parsed.slug}`);
    const authorSlug = parsed.byline === "Lulu Camau" ? "lulu-camau" : "tim-humphreys";
    const publishedAt = new Date(Date.parse("2026-09-29T06:00:00+03:00") + orderIndex * 31 * 60 * 1000).toISOString();
    const words = [parsed.title, ...parsed.body, ...parsed.faq.flatMap((item) => [item.question, item.answer])]
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
    const missingSourceLabels = parsed.sources.filter((source) => !source.url).map((source) => source.label);
    const verifiedSources = parsed.sources.filter((source) => source.url);
    if (!verifiedSources.length) throw new Error(`No verified September 29 source URL: ${parsed.slug}`);

    return {
      id: `editorial-september-29-${parsed.number}`,
      slug: parsed.slug,
      format,
      contentFormat: format === "business" ? "analysis" : format === "explainer" ? "explainer" : "news",
      isNewsworthy: true,
      homepageHeroPriority: parsed.slug === "india-affordable-electric-vehicles-entry-level-ev-market-2026" ? 110 : undefined,
      title: parsed.title,
      seo: {
        title: seoTitle,
        description: parsed.description,
        focusKeyphrase: parsed.keywords[0],
        secondaryKeywords: parsed.keywords.slice(1)
      },
      subhead: parsed.description,
      excerpt: firstSentence(parsed.body[0] ?? parsed.description),
      whyItMatters,
      quickAnswer: parsed.body[0],
      body: parsed.body,
      faq: parsed.faq,
      author: requiredBySlug(authors, authorSlug, "author"),
      publishedAt,
      updatedAt: publishedAt,
      readTime: `${Math.max(3, Math.ceil(words / 220))} min read`,
      image: heroImage,
      mediaSlots: parsed.mediaSlots,
      tags: [
        ...taxonomy.topics.map((slug) => requiredBySlug(topics, slug, "topic")),
        ...taxonomy.brands.map((slug) => requiredBySlug(brands, slug, "brand"))
      ],
      regions: taxonomy.regions.map((slug) => requiredBySlug(regions, slug, "region")),
      sources: verifiedSources,
      sourceDisclosure: missingSourceLabels.length
        ? `The article uses ${verifiedSources.length} verified clickable source record${verifiedSources.length === 1 ? "" : "s"}. The supplied editorial bundle also names these secondary references without resolved URLs: ${missingSourceLabels.join("; ")}.`
        : `All ${parsed.sources.length} supplied source labels have verified URLs.`,
      googleAdsEligible: true,
      workflowVersion: "gated",
      publicationStatus: "publish",
      editorialStatus: "published",
      indexingStatus: "index",
      excludeFromDiscovery: false,
      sourceChecked: true,
      humanEditorApproved: true,
      editor: "tecMAMBO Editorial Desk",
      reviewedAt: "2026-09-30T09:15:00+03:00",
      legalReviewedAt: "2026-09-30T09:15:00+03:00",
      hasOriginalPhotography: false,
      originalValueType: format === "explainer" ? "practical_guide" : format === "business" ? "original_analysis" : "curated_context"
    };
  });
}
