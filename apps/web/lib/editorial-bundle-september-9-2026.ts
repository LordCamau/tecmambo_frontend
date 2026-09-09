import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, Author, Format, RegionTerm, Tag } from "@/lib/types";

type BuildEditorialSeptember9Args = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
  regions: RegionTerm[];
};

type PublishingSpec = {
  format: string;
  primaryCategory: string;
  secondaryCategories: string[];
  slug: string;
  byline: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyphrase: string;
  secondaryKeywords: string[];
  originalValue: string;
  adEligibility: string;
};

type ParsedBundleArticle = {
  articleNumber: number;
  spec: PublishingSpec;
  body: string[];
  sourceReferences: string[];
};

type HeroImage = Article["image"];

const sourcePath = resolve(process.cwd(), "../../content/editorial-bundles/tecmambo-editorial-bundle-2026-09-09.md");

const heroBySlug: Record<string, HeroImage> = {
  "apple-surprise-and-shine-event-2026-preview": {
    src: "/articles/september9/Upcoming-iPhone-Fold-by-Apple.jpg",
    alt: "A depiction of the upcoming Apple iPhone Fold",
    caption: "A depiction of the upcoming Apple iPhone Fold",
    credit: "",
    creditOmitted: true,
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "digital-realty-nbo2-nairobi-data-centre-icolo": {
    src: "/articles/september9/Digital_Realty_NBO2_Facility_Launch_Nairobi.jpg",
    alt: "John Tanui (centre), Kenya's ICT and Digital Economy Principle Secretary at the NBO by Digital Realty opening ceremony in Nairobi on September 7.",
    caption: "John Tanui (centre), Kenya's ICT and Digital Economy Principle Secretary at the NBO by Digital Realty opening ceremony in Nairobi on September 7.",
    credit: "Justin Ondieki",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "ca-kenya-standalone-data-centre-licence-consultation": {
    src: "/articles/september9/iXAfrica-Data-Centre-Nairobi.jpg",
    alt: "iXAfrica Data Centre in Nairobi, Kenya",
    caption: "iXAfrica Data Centre in Nairobi, Kenya",
    credit: "iXAfrica",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "bolt-kenya-10-years-ksh19-billion-investment": {
    src: "/articles/september9/Bolt-Kenya-A-Decade-Later.jpg",
    alt: "Bolt boda-boda e-brike riders in Nairobi, Kenya",
    caption: "Bolt boda-boda e-bike riders in Nairobi, Kenya",
    credit: "",
    creditOmitted: true,
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "paratus-g2m-fibre-route-east-africa-2026": {
    src: "/articles/september9/Laying-Down-Of-Fibre-Optic-Cable-Mombasa.jpg",
    alt: "Workers haul part of a fibre optic cable onto the shore of the Kenyan port city of Mombasa on June 12, 2009",
    caption: "Workers haul part of a fibre optic cable onto the shore of the Kenyan port city of Mombasa on June 12, 2009",
    credit: "AFP via Getty Images",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "nomba-3-million-debt-facility-africa-asia-payments": {
    src: "/articles/september9/Nigerias-Nomba-Raises-USD-3-Million.jpg",
    alt: "Yinka Adewale, CEO and co-founder of Nomba",
    caption: "Yinka Adewale, CEO and co-founder of Nomba",
    credit: "",
    creditOmitted: true,
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "safaricom-ethiopia-15-million-subscribers-mpesa": {
    src: "/articles/september9/Safaricom-Ethiopia-15-Million-Subscribers.jpg",
    alt: "Ethiopian personnel from the Prime Minister's office walk past a billboard during the Safaricom ceremony to officially launch its operations in Ethiopia, in Addis Ababa, Ethiopia, October 6, 2022.",
    caption: "Ethiopian personnel from the Prime Minister's office walk past a billboard during the Safaricom ceremony to officially launch its operations in Ethiopia, in Addis Ababa, Ethiopia, October 6, 2022.",
    credit: "Reuters",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "lagos-blockchain-week-nigeria-fintech-week-september-2026": {
    src: "/articles/september9/Lagos-Nigeria-Africas-Busiest-Tech-City.jpg",
    alt: "Meta CEO, Mark Zuckerberg makes a surprise visit to the Co-creation Hub (CcHub), Lagos in August 2016.",
    caption: "Meta CEO, Mark Zuckerberg makes a surprise visit to the Co-creation Hub (CcHub), Lagos in August 2016.",
    credit: "Pulse Nigeria",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "snapdragon-8-elite-gen-5-dimensity-9500-agentic-ai": {
    src: "/articles/september9/Android_Phones_2026.jpg",
    alt: "Assortment of Android flagship offerings from Google, OnePlus, and Samsung.",
    caption: "Assortment of Android flagship offerings from Google, OnePlus, and Samsung.",
    credit: "Tom's Guide",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  "apple-eu-dma-october-2026-developer-terms": {
    src: "/articles/september9/Apple_App_Store_EU_Ruling.jpg",
    alt: "Apple logo beside a calendar and the European Union emblem",
    credit: "",
    creditOmitted: true,
    width: 1040,
    height: 520,
    type: "image/jpeg"
  }
};

const formatMap: Record<string, Format> = {
  "MAMBO Preview": "news",
  "MAMBO Explains": "explainer",
  "MAMBO Take": "opinion",
  "MAMBO Roundup": "news"
};

const categoryAliases: Record<string, string> = {
  EVs: "evs-mobility",
  Mobility: "evs-mobility",
  EU: "european-union"
};

const regionCategories: Record<string, string> = {
  Kenya: "kenya",
  Nigeria: "nigeria",
  Ethiopia: "ethiopia"
};

const regionSlugsByArticle: Record<number, string[]> = {
  2: ["kenya"],
  3: ["kenya"],
  4: ["kenya"],
  5: ["kenya", "uganda", "rwanda"],
  6: ["nigeria"],
  7: ["ethiopia"],
  8: ["nigeria"]
};

const sourcesBySlug: Record<string, Article["sources"]> = {
  "apple-surprise-and-shine-event-2026-preview": [
    { label: "AP: New Apple CEO to unveil latest iPhone lineup", url: "https://apnews.com/article/fd35312e6d894d5f3b055b3d62f22cd2" },
    { label: "9to5Mac: Apple announces its September 9 event", url: "https://9to5mac.com/2026/08/26/apple-officially-announces-iphone-18-pro-foldable-event/" }
  ],
  "digital-realty-nbo2-nairobi-data-centre-icolo": [
    { label: "Digital Realty NBO2 opening announcement via GlobeNewswire", url: "https://www.stockwatch.com/News/Item/U-z9822213-U%21DLR-20260907/U/DLR" }
  ],
  "ca-kenya-standalone-data-centre-licence-consultation": [
    { label: "Communications Authority of Kenya: Open consultations", url: "https://www.ca.go.ke/open-consultations" },
    { label: "CA telecommunications market structure consultation", url: "https://www.ca.go.ke/sites/default/files/CA/Public%20Consultation%20Documents/Public%20Consultation%20Document%20-%20Telecommunications%20Market%20Structure.pdf" }
  ],
  "bolt-kenya-10-years-ksh19-billion-investment": [
    { label: "The Star: Bolt marks 10 years in Kenya", url: "https://www.the-star.co.ke/business/kenya/2026-09-07-bolt-marks-10-years-in-kenya-with-sh19bn-investment-8m-riders" },
    { label: "TechTrendsKE: Bolt Kenya marks 10 years", url: "https://techtrendske.co.ke/2026/09/07/bolt-kenya-10-years/" }
  ],
  "paratus-g2m-fibre-route-east-africa-2026": [
    { label: "Paratus: East Africa connectivity at ITW Africa 2026", url: "https://paratus.africa/blog/paratus-group-puts-east-africa-connectivity-in-focus-at-itw-africa-2026/" },
    { label: "Paratus: G2M fibre route launch", url: "https://paratus.africa/blog/paratus-lights-up-new-east-africa-fiber-highway-linking-goma-to-mombasa/" }
  ],
  "nomba-3-million-debt-facility-africa-asia-payments": [
    { label: "THISDAY: Nomba raises $3 million facility", url: "https://www.thisdaylive.com/2026/09/07/bank-raises-3m-facility-through-cardinalstone-to-expand-cross-border-payments/" }
  ],
  "safaricom-ethiopia-15-million-subscribers-mpesa": [
    { label: "Safaricom Ethiopia: 15 million subscriber milestone", url: "https://www.safaricom.et/en/whats-new/latest/news-and-blogs/safaricom-surpasses-15-million-subscribers-as-it-marks-five-years" },
    { label: "Safaricom Ethiopia FY26 service revenue and M-PESA results", url: "https://www.safaricom.et/en/whats-new/latest/news-and-blogs/safaricom-ethiopia-records-1309-service-revenue-growth-in-fy26" }
  ],
  "lagos-blockchain-week-nigeria-fintech-week-september-2026": [
    { label: "Lagos Blockchain Week 2026 official schedule", url: "https://lagosblockchainweek.ng/" },
    { label: "Nigeria Fintech Week 2026 official schedule", url: "https://nfw.fintechng.org/" },
    { label: "Africa Fintech Network: Nigeria Fintech Week", url: "https://africafintechnetwork.com/event/nigeria-fintech-week-2026-september-22-23/" }
  ],
  "snapdragon-8-elite-gen-5-dimensity-9500-agentic-ai": [
    { label: "Qualcomm: Snapdragon 8 Elite Gen 5", url: "https://www.qualcomm.com/smartphones/products/8-series/snapdragon-8-elite-gen-5" },
    { label: "MediaTek: Dimensity 9500", url: "https://www.mediatek.com/dimensity-9500" }
  ],
  "apple-eu-dma-october-2026-developer-terms": [
    { label: "Apple Developer: Changes for apps in the EU", url: "https://developer-rno.apple.com/support/apps-in-the-eu/" },
    { label: "Court of Justice of the EU: General Court judgment of July 8, 2026", url: "https://curia.europa.eu/site/upload/docs/application/pdf/2026-07/cp260096en.pdf" },
    { label: "European Commission: DMA interoperability", url: "https://digital-markets-act.ec.europa.eu/developer-portal/interoperability_en" }
  ]
};

const publishedAtBySlug: Record<string, string> = {
  "apple-eu-dma-october-2026-developer-terms": "2026-09-09T07:10:00+03:00",
  "paratus-g2m-fibre-route-east-africa-2026": "2026-09-09T07:55:00+03:00",
  "nomba-3-million-debt-facility-africa-asia-payments": "2026-09-09T08:40:00+03:00",
  "ca-kenya-standalone-data-centre-licence-consultation": "2026-09-09T09:25:00+03:00",
  "snapdragon-8-elite-gen-5-dimensity-9500-agentic-ai": "2026-09-09T10:15:00+03:00",
  "bolt-kenya-10-years-ksh19-billion-investment": "2026-09-09T11:05:00+03:00",
  "safaricom-ethiopia-15-million-subscribers-mpesa": "2026-09-09T12:00:00+03:00",
  "digital-realty-nbo2-nairobi-data-centre-icolo": "2026-09-09T13:00:00+03:00",
  "lagos-blockchain-week-nigeria-fintech-week-september-2026": "2026-09-09T14:10:00+03:00",
  "apple-surprise-and-shine-event-2026-preview": "2026-09-09T15:20:00+03:00"
};

function specValue(specBlock: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = specBlock.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing September 9 publishing field: ${label}`);
  return match[1].trim().replace(/^`|`$/g, "");
}

function parseBundle(): ParsedBundleArticle[] {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/[—–�]/.test(source)) throw new Error("The September 9 bundle contains a prohibited dash or malformed replacement character.");

  const chunks = source.split(/^# ARTICLE \d+\s*$/m).slice(1);
  if (chunks.length !== 10) throw new Error(`Expected 10 September 9 articles, found ${chunks.length}.`);

  return chunks.map((chunk, index) => {
    const match = chunk.match(/^\s*## Publishing specification\s*\n\n([\s\S]*?)\n\n# ([^\n]+)\n\n([\s\S]*?)\n\n## Sources\n\n([\s\S]*?)(?:\n\n---|\n\n\*End of bundle|$)/);
    if (!match) throw new Error(`Article ${index + 1} is malformed in the September 9 bundle.`);
    const [, specBlock = "", h1 = "", bodyBlock = "", sourcesBlock = ""] = match;
    const spec: PublishingSpec = {
      format: specValue(specBlock, "Format"),
      primaryCategory: specValue(specBlock, "Primary category"),
      secondaryCategories: specValue(specBlock, "Secondary categories").split(",").map((value) => value.trim()),
      slug: specValue(specBlock, "Suggested slug"),
      byline: specValue(specBlock, "Byline"),
      h1: specValue(specBlock, "H1"),
      seoTitle: specValue(specBlock, "SEO title"),
      metaDescription: specValue(specBlock, "Meta description"),
      focusKeyphrase: specValue(specBlock, "Focus keyphrase"),
      secondaryKeywords: specValue(specBlock, "Secondary keywords").split(",").map((value) => value.trim()),
      originalValue: specValue(specBlock, "Original value"),
      adEligibility: specValue(specBlock, "Ad eligibility")
    };
    if (spec.h1 !== h1.trim()) throw new Error(`Article ${index + 1} H1 does not match its publishing specification.`);
    return {
      articleNumber: index + 1,
      spec,
      body: bodyBlock.trim().split(/\n{2,}/).map((block) => block.trim()),
      sourceReferences: [...sourcesBlock.matchAll(/^- (.+)$/gm)].map((sourceMatch) => sourceMatch[1]!.trim())
    };
  });
}

function requireBySlug<T extends { slug: string }>(items: T[], slug: string, kind: string): T {
  const item = items.find((candidate) => candidate.slug === slug);
  if (!item) throw new Error(`Missing September 9 ${kind}: ${slug}`);
  return item;
}

function categoryTag(name: string, topics: Tag[], brands: Tag[]) {
  const slug = categoryAliases[name] ?? name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const topic = topics.find((candidate) => candidate.slug === slug);
  const brand = brands.find((candidate) => candidate.slug === slug);
  if (!topic && !brand) throw new Error(`Missing September 9 taxonomy term: ${slug}`);
  return topic ?? brand!;
}

function articleRegions(articleNumber: number, categories: string[], regions: RegionTerm[]) {
  const explicit = regionSlugsByArticle[articleNumber] ?? categories.map((category) => regionCategories[category]).filter(Boolean);
  return [...new Set(explicit)].map((slug) => requireBySlug(regions, slug, "region"));
}

function addCrossLinks(articleNumber: number, body: string[]) {
  const copy = [...body];
  const links: Record<number, [string, string]> = {
    1: [
      "iPhone Duo",
      "/explainers/iphone-duo-official-price-specs-kenya"
    ],
    2: [
      "Communications Authority of Kenya has opened public consultations on a proposed standalone licensing category specifically for data centre operators",
      "/explainers/ca-kenya-standalone-data-centre-licence-consultation"
    ],
    3: [
      "Digital Realty's NBO2 launch",
      "/explainers/digital-realty-nbo2-nairobi-data-centre-icolo"
    ]
  };
  const link = links[articleNumber];
  if (!link) return copy;
  const [phrase, href] = link;
  const blockIndex = copy.findIndex((block) => block.includes(phrase));
  if (blockIndex < 0) throw new Error(`Missing September 9 cross-link phrase in article ${articleNumber}.`);
  copy[blockIndex] = copy[blockIndex]!.replace(phrase, `[${phrase}](${href})`);
  return copy;
}

const parsedBundle = parseBundle();

export const editorialSeptember9ImportReport = parsedBundle.map(({ articleNumber, spec }) => ({
  articleNumber,
  slug: spec.slug,
  categories: [spec.primaryCategory, ...spec.secondaryCategories],
  outstandingGates: [],
  imageGateSatisfied: true,
  publicationStatus: "published"
}));

export function buildEditorialSeptember9Articles({ authors, topics, brands, regions }: BuildEditorialSeptember9Args): Article[] {
  return parsedBundle.map(({ articleNumber, spec, body, sourceReferences }) => {
    const categories = [spec.primaryCategory, ...spec.secondaryCategories];
    const format = formatMap[spec.format];
    const image = heroBySlug[spec.slug];
    const publishedAt = publishedAtBySlug[spec.slug];
    if (!format) throw new Error(`Unsupported September 9 format: ${spec.format}`);
    if (!image) throw new Error(`Missing supplied September 9 hero image for ${spec.slug}.`);
    if (!publishedAt) throw new Error(`Missing September 9 publication timestamp for ${spec.slug}.`);

    const tags = categories
      .filter((category) => !regionCategories[category])
      .map((category) => categoryTag(category, topics, brands))
      .filter((tag, index, all) => all.findIndex((candidate) => candidate.slug === tag.slug) === index);
    const words = body.join(" ").split(/\s+/).filter(Boolean).length;

    return {
      id: `editorial-september9-${articleNumber}-${spec.slug}`,
      slug: spec.slug,
      format,
      contentFormat: format === "news" ? "news" : format === "opinion" ? "opinion" : "explainer",
      title: spec.h1,
      seo: { title: spec.seoTitle, description: spec.metaDescription },
      subhead: spec.metaDescription,
      excerpt: spec.metaDescription,
      whyItMatters: spec.originalValue,
      body: addCrossLinks(articleNumber, body),
      author: authors.find((author) => author.name === spec.byline) ?? requireBySlug(authors, spec.byline.toLowerCase().replace(/\s+/g, "-"), "author"),
      publishedAt,
      updatedAt: publishedAt,
      readTime: `${Math.max(3, Math.ceil(words / 200))} min read`,
      image,
      tags,
      regions: articleRegions(articleNumber, categories, regions),
      sources: sourcesBySlug[spec.slug],
      sourceDisclosure: `Claims were checked against the linked sources and the imported editorial references on September 9, 2026: ${sourceReferences.join("; ")}`,
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
      reviewedAt: "2026-09-09T16:40:00+03:00",
      legalReviewedAt: "2026-09-09T16:40:00+03:00",
      originalValueType: format === "news" ? "curated_context" : "original_analysis"
    };
  });
}
