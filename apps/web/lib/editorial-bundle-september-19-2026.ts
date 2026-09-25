import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type BuildArgs = { authors: Author[]; topics: Tag[]; brands: Tag[]; regions: RegionTerm[] };
type Parsed = {
  number: number;
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  focusKeyphrase: string;
  secondaryKeywords: string[];
  byline: string;
  originalValue: string;
  quickAnswer: string;
  body: string[];
  faq: Array<{ question: string; answer: string }>;
};

const sourcePath = resolve(process.cwd(), "../../content/articles/tecmambo-sept19-digest-corrected-2026-09-19.md");

const scheduleBySlug: Record<string, string> = {
  "google-pixel-september-2026-feature-drop": "2026-09-19T08:40:00+03:00",
  "lg-smart-tv-privacy-investigation-gamers-nexus": "2026-09-19T09:00:00+03:00",
  "kenya-icta-nofbi-fiber-tender-2026": "2026-09-19T09:20:00+03:00"
};

const taxonomyBySlug: Record<string, { topics: string[]; brands: string[]; regions: string[] }> = {
  "lg-smart-tv-privacy-investigation-gamers-nexus": {
    topics: ["cybersecurity", "privacy", "hardware"],
    brands: ["lg"],
    regions: []
  },
  "kenya-icta-nofbi-fiber-tender-2026": {
    topics: ["infrastructure", "kenya", "policy"],
    brands: [],
    regions: ["kenya"]
  },
  "google-pixel-september-2026-feature-drop": {
    topics: ["ai", "smartphones", "security"],
    brands: ["google"],
    regions: []
  }
};

const imageBySlug: Record<string, Article["image"]> = {
  "lg-smart-tv-privacy-investigation-gamers-nexus": {
    src: "/articles/september19/LG_TVs_Audio_Monitoring.webp",
    alt: "Three LG OLED AI televisions displayed on illuminated platforms against a dark blue backdrop.",
    caption: "LG's OLED AI television lineup is under renewed scrutiny over network scanning and alleged standby audio behavior.",
    credit: "LG",
    width: 1774,
    height: 887,
    type: "image/webp"
  },
  "kenya-icta-nofbi-fiber-tender-2026": {
    src: "/articles/september19/Kenya_Fiber_Optic.webp",
    alt: "Telecommunications workers installing green fiber-optic conduit in a trench on a Nairobi street.",
    caption: "Workers install fiber-optic infrastructure in Nairobi as Kenya prepares another expansion of its national backbone and cross-border links.",
    credit: "NMG",
    width: 1774,
    height: 887,
    type: "image/webp"
  },
  "google-pixel-september-2026-feature-drop": {
    src: "/articles/september19/Google_Pixel_Drop.webp",
    alt: "A person holding a pale purple Google Pixel phone against a matching lavender background.",
    caption: "Google's September 2026 Pixel Drop brings new scam warnings and other features to Pixel 6 and newer phones.",
    credit: "Google",
    width: 1774,
    height: 887,
    type: "image/webp"
  }
};

const sourcesBySlug: Record<string, NonNullable<Article["sources"]>> = {
  "lg-smart-tv-privacy-investigation-gamers-nexus": [
    {
      label: "Gamers Nexus: 216,000,000 Spy TVs, The LG Smart TV Problem",
      url: "https://www.youtube.com/watch?v=6IFVTcM28KA"
    },
    {
      label: "Tom's Hardware: LG responds to smart TV tracking and audio allegations",
      url: "https://www.tomshardware.com/tech-industry/big-tech/lg-strongly-denies-tv-security-claims-says-tracking-and-snooping-concerns-not-true-online-investigation-claims-216-000-000-spy-tvs-record-audio"
    },
    {
      label: "TechRadar: LG's response and the remaining privacy questions",
      url: "https://www.techradar.com/televisions/lgs-denial-over-tv-spying-claims-does-not-address-the-full-privacy-picture-experts-say-after-report-accuses-it-of-making-216-000-000-spy-tvs"
    },
    {
      label: "UOL Tilt: retail LG OLED testing, standby audio, and local-network scanning",
      url: "https://www.uol.com.br/tilt/noticias/redacao/2026/09/09/tvs-lg-gravam-audio-em-espera-e-mapeiam-dispositivos-proximos.htm"
    }
  ],
  "kenya-icta-nofbi-fiber-tender-2026": [
    {
      label: "ICT Authority Kenya: open tender for national backbone and cross-border links",
      url: "https://www.icta.go.ke/tenders"
    },
    {
      label: "ICT Authority Kenya: official Request for Bids, KE-ICTA-538567-NC-RFB",
      url: "https://www.icta.go.ke/storage/tenders/mvLY8SauGos73NMInzM0Ox89ddABdCRrCR9WFSTJ.pdf"
    },
    {
      label: "World Bank: $390 million Kenya Digital Economy Acceleration Project",
      url: "https://www.worldbank.org/en/news/press-release/2023/04/05/kenya-afe-and-the-world-bank-group-provide-a-390-million-boost-the-digital-economy"
    },
    {
      label: "TechAfrica News: Kenya ICTA opens fiber and cross-border connectivity tender",
      url: "https://techafricanews.com/2026/09/16/kenya-icta-tender-national-fibre-cross-border-connectivity/"
    },
    {
      label: "TechTrendsKE: Kenya floats tender for national fiber backbone and cross-border links",
      url: "https://techtrendske.co.ke/2026/09/16/kenya-floats-tender-for-national-fibre-backbone-cross-border-links/"
    }
  ],
  "google-pixel-september-2026-feature-drop": [
    {
      label: "Google: September 2026 Pixel Drop",
      url: "https://blog.google/products-and-platforms/devices/pixel/september-2026-pixel-drop/"
    },
    {
      label: "Android Central: September Pixel Drop upgrades scam detection and VIP contacts",
      url: "https://www.androidcentral.com/phones/google-pixel/googles-september-pixel-drop-upgrades-vip-contacts-scam-detection-and-pixel-watch"
    },
    {
      label: "Android Authority: September 2026 Pixel Drop features",
      url: "https://www.androidauthority.com/pixel-drop-september-2026-all-new-features-3711242/"
    },
    {
      label: "Neowin: Google rolls out September Pixel Drop with scam defenses",
      url: "https://www.neowin.net/news/google-rolls-out-september-pixel-drop-with-scam-defenses/"
    }
  ]
};

function value(source: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing September 19 field: ${label}`);
  return match[1].trim().replace(/^`|`$/g, "");
}

function required<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing September 19 ${kind}: ${slug}`);
  return item;
}

function firstSentence(text: string) {
  return text.match(/^.+?[.!?](?:\s|$)/)?.[0]?.trim() ?? text;
}

function addInternalLinks(parsed: Parsed) {
  if (parsed.slug !== "kenya-icta-nofbi-fiber-tender-2026") return;
  parsed.body = parsed.body.map((part) => part
    .replace(
      "Paratus Group's 2,000km Mombasa-to-Goma corridor through Uganda and Rwanda",
      "[Paratus Group's 2,000km Mombasa-to-Goma corridor through Uganda and Rwanda](/explainers/paratus-g2m-fibre-route-east-africa-2026)"
    )
    .replace(
      "new data center capacity in Nairobi from operators like Digital Realty",
      "[new data center capacity in Nairobi from operators like Digital Realty](/explainers/digital-realty-nbo2-nairobi-data-centre-icolo)"
    ));
}

function parseBundle(): Parsed[] {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/[—–�]/.test(source)) throw new Error("The September 19 source contains a prohibited dash or malformed character.");
  if (/ngfts\.lge\.com|rdx2\.lge\.com|ad\.lgsmartad\.com/i.test(source)) {
    throw new Error("An unverified LG telemetry domain entered the September 19 publishable source.");
  }
  const blocks = source.split(/^# ARTICLE \d+\s*$/m).slice(1, 4).map((block) => block.trim().replace(/\n\n---[\s\S]*$/, "").trim());
  if (blocks.length !== 3) throw new Error(`Expected 3 September 19 articles, found ${blocks.length}.`);

  return blocks.map((block, index) => {
    const title = value(block, "H1");
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const bodyMatch = block.match(new RegExp(`^# ${escapedTitle}\\n\\n([\\s\\S]*?)\\n\\n## Sources\\n`, "m"));
    if (!bodyMatch?.[1]) throw new Error(`Malformed September 19 article: ${title}`);
    const parts = bodyMatch[1].trim().split(/\n{2,}/).map((part) => part.trim());
    const quickAnswer = parts.shift()?.match(/^\*\*Quick answer:\*\*\s*([\s\S]+)$/)?.[1]?.trim();
    if (!quickAnswer) throw new Error(`Missing September 19 quick answer: ${title}`);
    const faqIndex = parts.indexOf("## Frequently asked questions");
    if (faqIndex < 0) throw new Error(`Missing September 19 FAQ: ${title}`);
    const faqParts = parts.splice(faqIndex).slice(1);
    const faq = faqParts.map((part) => {
      const [questionLine, ...answerLines] = part.split("\n");
      const question = questionLine?.match(/^\*\*(.+\?)\*\*$/)?.[1];
      const answer = answerLines.join(" ").trim();
      if (!question || !answer) throw new Error(`Malformed September 19 FAQ: ${title}`);
      return { question, answer };
    });
    const parsed: Parsed = {
      number: index + 1,
      slug: value(block, "Suggested slug"),
      title,
      seoTitle: value(block, "SEO title"),
      description: value(block, "Meta description"),
      focusKeyphrase: value(block, "Focus keyphrase"),
      secondaryKeywords: value(block, "Secondary keywords").split(",").map((keyword) => keyword.trim()),
      byline: value(block, "Byline"),
      originalValue: value(block, "Original value"),
      quickAnswer,
      body: parts,
      faq
    };
    addInternalLinks(parsed);
    return parsed;
  });
}

const parsedArticles = parseBundle();

export const editorialSeptember19ImportReport = parsedArticles.map((article) => ({
  article: article.number,
  slug: article.slug,
  byline: article.byline,
  categories: taxonomyBySlug[article.slug]?.topics ?? [],
  internalLinks: article.body.flatMap((part) => [...part.matchAll(/\]\((\/[^)]+)\)/g)].map((match) => match[1]!)),
  publicationStatus: "published" as const,
  outstandingGates: []
}));

export function buildEditorialSeptember19Articles({ authors, topics, brands, regions }: BuildArgs): Article[] {
  return parsedArticles.map((parsed) => {
    const taxonomy = taxonomyBySlug[parsed.slug];
    const publishedAt = scheduleBySlug[parsed.slug];
    const image = imageBySlug[parsed.slug];
    const sources = sourcesBySlug[parsed.slug];
    if (!taxonomy || !publishedAt || !image || !sources?.length) throw new Error(`Incomplete September 19 article mapping: ${parsed.slug}`);
    const words = [parsed.title, parsed.quickAnswer, ...parsed.body, ...parsed.faq.flatMap((item) => [item.question, item.answer])]
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
    const authorSlug = parsed.byline === "Lulu Camau" ? "lulu-camau" : "tim-humphreys";

    return {
      id: `editorial-september19-${parsed.number}`,
      slug: parsed.slug,
      format: "explainer",
      contentFormat: "explainer",
      isNewsworthy: true,
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
      faq: parsed.faq,
      author: required(authors, authorSlug, "author"),
      publishedAt,
      updatedAt: "2026-09-19T10:05:00+03:00",
      readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
      image,
      tags: [
        ...taxonomy.topics.map((slug) => required(topics, slug, "topic")),
        ...taxonomy.brands.map((slug) => required(brands, slug, "brand"))
      ],
      regions: taxonomy.regions.map((slug) => required(regions, slug, "region")),
      sources,
      sourceDisclosure: "Claims and source URLs were checked against the linked primary and authoritative sources on September 19, 2026.",
      legalReviewedAt: "2026-09-19T10:05:00+03:00",
      googleAdsEligible: true,
      workflowVersion: "gated",
      publicationStatus: "publish",
      editorialStatus: "published",
      indexingStatus: "index",
      excludeFromDiscovery: false,
      sourceChecked: true,
      humanEditorApproved: true,
      editor: "tecMAMBO Editorial Desk",
      reviewedAt: "2026-09-19T10:05:00+03:00",
      hasOriginalPhotography: false,
      originalValueType: "curated_context"
    };
  });
}
