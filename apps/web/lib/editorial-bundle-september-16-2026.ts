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

const sourcePath = resolve(process.cwd(), "../../content/articles/tecmambo-special-edition-corrected-2026-09-16.md");

const scheduleBySlug: Record<string, string> = {
  "high-court-voids-safaricom-vodacom-share-sale": "2026-09-16T10:55:00+03:00",
  "apple-icloud-plus-apple-tv-arcade-kenya-bundle": "2026-09-16T11:35:00+03:00"
};

const taxonomyBySlug: Record<string, { topics: string[]; brands: string[]; regions: string[] }> = {
  "apple-icloud-plus-apple-tv-arcade-kenya-bundle": {
    topics: ["business", "kenya", "streaming"],
    brands: ["apple"],
    regions: ["kenya"]
  },
  "high-court-voids-safaricom-vodacom-share-sale": {
    topics: ["business", "kenya", "policy", "telecoms"],
    brands: ["safaricom", "vodacom"],
    regions: ["kenya"]
  }
};

const heroBySlug: Record<string, Article["image"]> = {
  "apple-icloud-plus-apple-tv-arcade-kenya-bundle": {
    src: "/articles/september16/Apple_TV_Now_Available_in_Kenya.jpg",
    alt: "Apple TV showing Chief of War on a television above an Apple TV box and remote, with a Kenyan flag in the corner.",
    caption: "Apple TV is now available in Kenya through paid iCloud+ plans, alongside Apple Arcade and Apple Music Select.",
    credit: "Apple",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "high-court-voids-safaricom-vodacom-share-sale": {
    src: "/articles/september16/Safaricom_Sale_Voided_by_Kenyan_Court.jpg",
    alt: "A Safaricom advertising display outside a retail location.",
    caption: "Kenya's High Court voided the completed sale of a 15% Safaricom stake to Vodacom and ordered the shares restored to the government.",
    credit: "",
    creditOmitted: true,
    width: 1040,
    height: 520,
    type: "image/jpeg"
  }
};

const sourcesBySlug: Record<string, NonNullable<Article["sources"]>> = {
  "apple-icloud-plus-apple-tv-arcade-kenya-bundle": [
    {
      label: "Apple Kenya Newsroom: Apple expands iCloud+ to include Apple TV and Apple Arcade in Kenya",
      url: "https://www.apple.com/ke/newsroom/2026/09/icloud-plus-expands-to-include-apple-tv-and-apple-arcade/"
    },
    {
      label: "Apple Support: iCloud+ plans and pricing",
      url: "https://support.apple.com/en-ke/108047"
    },
    {
      label: "tech-ish: Apple adds Apple TV and Apple Arcade to iCloud+ in Kenya",
      url: "https://tech-ish.com/2026/09/15/apple-is-adding-apple-tv-and-apple-arcade-to-icloud-in-kenya-at-no-extra-cost/"
    }
  ],
  "high-court-voids-safaricom-vodacom-share-sale": [
    {
      label: "Vodacom Group: update on the acquisition of a controlling interest in Safaricom",
      url: "https://vodacom.com/pdf/sens/2026/update-on-the-acquisition-of-a-controlling-interest-in-safaricomplc.pdf"
    },
    {
      label: "Vodacom Group: June 30 closing announcement",
      url: "https://vodacom.com/pdf/sens/2026/marble-closing-announcement-final-30-june-2026.pdf"
    },
    {
      label: "Business Daily: Treasury's sale of 15% Safaricom stake nullified",
      url: "https://www.businessdailyafrica.com/bd/economy/treasury-s-sale-of-15pc-safaricom-stake-nullified-5596556"
    },
    {
      label: "tech-ish: High Court declares the Safaricom sale null and void",
      url: "https://tech-ish.com/2026/09/15/high-court-declares-the-kes-244-5-billion-safaricom-sale-to-vodacom-null-and-void/"
    }
  ]
};

const mediaBySlug: Partial<Record<string, NonNullable<Article["mediaSlots"]>>> = {
  "apple-icloud-plus-apple-tv-arcade-kenya-bundle": [
    {
      id: "september16-icloud-plus-expansion",
      type: "image",
      status: "ready",
      placement: "Immediately below What actually changed, and what the price actually is",
      src: "/articles/september16/Apple_iCloud_Plus_expansion_hero.jpg",
      alt: "Three iPhones showing Apple Arcade, iCloud+, and Apple TV as included services.",
      caption: "iCloud+ subscribers in Kenya will gain access to Apple TV and Apple Arcade as part of their iCloud+ subscription starting this month.",
      credit: "Apple",
      licensingNote: "Publisher-supplied Apple promotional image.",
      aspectRatio: "2:1",
      width: 1040,
      height: 520
    }
  ]
};

const originalValueBySlug: Record<string, string> = {
  "apple-icloud-plus-apple-tv-arcade-kenya-bundle": "Explains what Kenyan subscribers actually receive, corrects the local price, and places the launch in Apple's wider 102-market services strategy.",
  "high-court-voids-safaricom-vodacom-share-sale": "Reconstructs the transaction and court timeline so the final judgment is not mistaken for the earlier temporary freeze."
};

function value(source: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing September 16 field: ${label}`);
  return match[1].trim().replace(/^`|`$/g, "");
}

function required<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing September 16 ${kind}: ${slug}`);
  return item;
}

function firstSentence(text: string) {
  return text.match(/^.+?[.!?](?:\s|$)/)?.[0]?.trim() ?? text;
}

function addInternalLinks(parsed: Parsed) {
  if (parsed.slug === "apple-icloud-plus-apple-tv-arcade-kenya-bundle") {
    parsed.body = parsed.body.map((part) => part.replace(
      "Apple is using a utility product millions of Kenyans already pay for",
      "Following its [September product announcements](/news/apple-surprise-and-shine-keynote-full-recap), Apple is using a utility product millions of Kenyans already pay for"
    ));
  }
  if (parsed.slug === "high-court-voids-safaricom-vodacom-share-sale") {
    parsed.body = parsed.body.map((part) => part.replace(
      "Safaricom's board subsequently added two Vodacom-linked executives, Mariam Cassim and Matimba Mbungela",
      "[Safaricom's board subsequently added two Vodacom-linked executives, Mariam Cassim and Matimba Mbungela](/business/safaricom-board-reshuffle-vodacom-mariam-cassim-matimba-mbungela)"
    ));
  }
}

function parseBundle(): Parsed[] {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/[—–�]/.test(source)) throw new Error("The September 16 source contains a prohibited dash or malformed character.");
  const blocks = source.split(/^# ARTICLE \d+\s*$/m).slice(1, 3).map((block) => block.trim().replace(/\n\n---[\s\S]*$/, "").trim());
  if (blocks.length !== 2) throw new Error(`Expected 2 September 16 articles, found ${blocks.length}.`);
  return blocks.map((block, index) => {
    const title = value(block, "H1");
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const bodyMatch = block.match(new RegExp(`^# ${escapedTitle}\\n\\n([\\s\\S]*?)\\n\\n## Sources\\n`, "m"));
    if (!bodyMatch?.[1]) throw new Error(`Malformed September 16 article: ${title}`);
    const parts = bodyMatch[1].trim().split(/\n{2,}/).map((part) => part.trim());
    const quickAnswer = parts.shift()?.match(/^\*\*Quick answer:\*\*\s*([\s\S]+)$/)?.[1]?.trim();
    if (!quickAnswer) throw new Error(`Missing September 16 quick answer: ${title}`);
    const faqIndex = parts.indexOf("## Frequently asked questions");
    if (faqIndex < 0) throw new Error(`Missing September 16 FAQ: ${title}`);
    const faqParts = parts.splice(faqIndex).slice(1);
    const faq = faqParts.map((part) => {
      const [questionLine, ...answerLines] = part.split("\n");
      const question = questionLine?.match(/^\*\*(.+\?)\*\*$/)?.[1];
      const answer = answerLines.join(" ").trim();
      if (!question || !answer) throw new Error(`Malformed September 16 FAQ: ${title}`);
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

export const editorialSeptember16ImportReport = parsedArticles.map((article) => ({
  article: article.number,
  slug: article.slug,
  byline: article.byline,
  categories: taxonomyBySlug[article.slug]?.topics ?? [],
  publicationStatus: "published" as const,
  outstandingGates: []
}));

export function buildEditorialSeptember16Articles({ authors, topics, brands, regions }: BuildArgs): Article[] {
  return parsedArticles.map((parsed) => {
    const taxonomy = taxonomyBySlug[parsed.slug];
    const publishedAt = scheduleBySlug[parsed.slug];
    const image = heroBySlug[parsed.slug];
    const sources = sourcesBySlug[parsed.slug];
    const mediaSlots = mediaBySlug[parsed.slug] ?? [];
    if (!taxonomy || !publishedAt || !image || !sources?.length) throw new Error(`Incomplete September 16 article mapping: ${parsed.slug}`);
    const body = [...parsed.body];
    if (mediaSlots.length) {
      const headingIndex = body.indexOf("## What actually changed, and what the price actually is");
      if (headingIndex < 0) throw new Error(`Missing September 16 media placement heading: ${parsed.slug}`);
      body.splice(headingIndex + 1, 0, `[[media:${mediaSlots[0]!.id}]]`);
    }
    const words = [parsed.title, parsed.quickAnswer, ...body, ...parsed.faq.flatMap((item) => [item.question, item.answer])].join(" ").split(/\s+/).filter(Boolean).length;
    return {
      id: `editorial-september16-${parsed.number}`,
      slug: parsed.slug,
      format: parsed.format,
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
      whyItMatters: originalValueBySlug[parsed.slug]!,
      quickAnswer: parsed.quickAnswer,
      body,
      faq: parsed.faq,
      author: required(authors, "tim-humphreys", "author"),
      publishedAt,
      updatedAt: "2026-09-16T11:43:00+03:00",
      readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
      image,
      mediaSlots: mediaSlots.length ? mediaSlots : undefined,
      tags: [
        ...taxonomy.topics.map((slug) => required(topics, slug, "topic")),
        ...taxonomy.brands.map((slug) => required(brands, slug, "brand"))
      ],
      regions: taxonomy.regions.map((slug) => required(regions, slug, "region")),
      sources,
      sourceDisclosure: "Claims were checked against the linked primary and authoritative sources on September 16, 2026.",
      legalReviewedAt: "2026-09-16T11:43:00+03:00",
      googleAdsEligible: true,
      workflowVersion: "gated",
      publicationStatus: "publish",
      editorialStatus: "published",
      indexingStatus: "index",
      excludeFromDiscovery: false,
      sourceChecked: true,
      humanEditorApproved: true,
      editor: "tecMAMBO Editorial Desk",
      reviewedAt: "2026-09-16T11:43:00+03:00",
      hasOriginalPhotography: false,
      originalValueType: "curated_context"
    };
  });
}
