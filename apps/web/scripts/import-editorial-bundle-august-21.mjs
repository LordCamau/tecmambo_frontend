import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import process from "node:process";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Pass the August 21 editorial bundle path.");

const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "lib/editorial-bundle-august-21-2026.ts");
const assetDir = resolve(root, "public/articles/august21");
const source = readFileSync(sourcePath, "utf8");
const blocks = source.split(/^# ARTICLE \d+\s*$/m).slice(1);

const reviewTimestamp = "2026-08-21T13:20:00+03:00";
const publicationTimes = [
  "12:02", "12:08", "12:14", "12:20", "12:26", "12:32", "12:38",
  "12:44", "12:50", "12:56", "13:02", "13:08", "13:14", "13:18"
];

const authorByArticle = {
  1: "tim-humphreys",
  2: "tim-humphreys",
  3: "tim-humphreys",
  4: "lulu-camau",
  5: "tim-humphreys",
  6: "tim-humphreys",
  7: "tim-humphreys",
  8: "tim-humphreys",
  9: "tim-humphreys",
  10: "tim-humphreys",
  11: "tim-humphreys",
  12: "tim-humphreys",
  13: "tim-humphreys",
  14: "lulu-camau"
};

const regionByArticle = {
  2: ["kenya"],
  3: ["kenya", "nigeria"],
  5: ["kenya", "nigeria", "south-africa"],
  6: ["kenya"],
  7: ["kenya", "nigeria"],
  9: ["kenya"],
  10: ["kenya"],
  11: ["kenya"],
  12: ["kenya"]
};

const formatByArticle = {
  1: "opinion",
  2: "explainer",
  3: "business",
  4: "explainer",
  5: "business",
  6: "business",
  7: "business",
  8: "explainer",
  9: "opinion",
  10: "explainer",
  11: "opinion",
  12: "explainer",
  13: "opinion",
  14: "explainer"
};

const originalValueByArticle = {
  1: "original_analysis",
  2: "practical_guide",
  3: "original_analysis",
  4: "original_analysis",
  5: "original_analysis",
  6: "data_analysis",
  7: "original_analysis",
  8: "practical_guide",
  9: "original_analysis",
  10: "original_analysis",
  11: "original_analysis",
  12: "practical_guide",
  13: "data_analysis",
  14: "practical_guide"
};

const sourcesByArticle = {
  1: [
    ["The Verge: camera-equipped AirPods demo leak", "https://www.theverge.com/tech/981326/apple-airpods-with-cameras-demo-video-leak"],
    ["SoundGuys: macOS Tahoe 26.7 AirPods evidence", "https://www.soundguys.com/apple-camera-airpods-first-video-161609/"]
  ],
  2: [
    ["NCBA Group", "https://ncbagroup.com/"],
    ["PesaLink", "https://pesalink.co.ke/"],
    ["Tech-ish: Kenya PesaLink pricing comparison", "https://tech-ish.com/2026/07/22/pesalink-19-banks-flat-kes-20-transfers/"],
    ["Nipashe Biz: NCBA PesaLink tariff change", "https://nipashebiz.co.ke/ncba-cuts-pesalink-fees-making-interbank-transfers-more-affordable/"]
  ],
  3: [
    ["Airtel Africa Q1 2027 results", "https://www.airtel.africa/results-and-presentations"],
    ["Bloomberg Law: OPay IPO preparations", "https://news.bloomberglaw.com/securities-law/softbank-backed-opay-hires-citi-deutsche-jpmorgan-for-us-ipo"],
    ["Semafor via Yahoo Finance: PalmPay Hong Kong plans", "https://finance.yahoo.com/markets/stocks/articles/tecno-palmpay-seek-hong-kong-185017267.html"]
  ],
  4: [
    ["Qualcomm: native agentic AI on Snapdragon X Series", "https://www.qualcomm.com/news/onq/2026/08/agentic-ai-apps-snapdragon-x-series"],
    ["Qualcomm: mobile AI platform", "https://www.qualcomm.com/smartphones/features/mobile-ai"],
    ["MediaTek: MWC 2026", "https://www.mediatek.com/mediatek-mwc-2026"],
    ["MediaTek: making AI agents work for users", "https://www.mediatek.com/tek-talk-blogs/from-smart-into-intelligent.-making-ai-agents-work-for-you"]
  ],
  5: [
    ["Transsion announcements and reports", "https://www.transsion.com/en/report/announcements-and-reports"],
    ["HKEX new-listing progress reports", "https://www2.hkexnews.hk/New-Listings/Progress-Report-for-New-Listing-Applications/Main-Board?sc_lang=en"],
    ["Semafor via Yahoo Finance: Transsion listing progress", "https://finance.yahoo.com/markets/stocks/articles/tecno-palmpay-seek-hong-kong-185017267.html"]
  ],
  6: [
    ["Equity Group investor relations", "https://equitygroupholdings.com/investor-relation/?cat=financial-press-release"],
    ["Citizen Digital: Equity H1 2026 results", "https://www.citizen.digital/article/equity-group-half-year-profit-hits-ksh45b-as-digital-regional-expansion-drive-record-growth-n388586"],
    ["Absa Bank Kenya investor relations", "https://www.absabank.co.ke/investor-relations/"],
    ["Maudhui House: Absa H1 2026 results", "https://newsroom.maudhui.co.ke/markets/absa-kenya-posts-sh105bn-h1-profit-doubles-interim-dividend-41889"]
  ],
  7: [
    ["Yellow official company update", "https://www.linkedin.com/company/yellow-africa"],
    ["Yellow", "https://www.yellow.africa/"],
    ["AVCA: Yellow impact case study", "https://www.avca.africa/data-intelligence/research-publications/impact-case-study-yellow/"]
  ],
  8: [
    ["European Commission: Google AI interoperability measures", "https://digital-markets-act.ec.europa.eu/commission-provides-guidance-google-ai-interoperability-android-and-sharing-google-search-data-under-2026-07-16_en"],
    ["European Commission: DMA interoperability portal", "https://digital-markets-act.ec.europa.eu/developer-portal/interoperability_en"],
    ["European Commission: Android AI interoperability proceeding", "https://digital-markets-act.ec.europa.eu/developer-portal/interoperability/alphabet-specification-proceedings-interoperability-ai-services_en"]
  ],
  9: [
    ["ZaKenya: Anker Kenya expansion", "https://www.zakenya.com/business/anker-kenya-launchpad-seven-counties-1-million-08180819.html"],
    ["Anker product ecosystem", "https://www.anker.com/"],
    ["Anker support", "https://service.anker.com/"]
  ],
  10: [
    ["TechCrier: Kenya innovation intelligence platform", "https://www.techcrier.com/2026/08/new-digital-intelligence-platform.html"],
    ["Kenya Innovation Ecosystem Intelligence Platform", "https://kenya-innovation-ecosystem.base44.app/"]
  ],
  11: [
    ["Bolt Kenya: Bolt Send parcel requirements", "https://bolt.eu/en/support/articles/46797/"],
    ["NewsDay Kenya: Bolt Send motorbikes in Mombasa", "https://newsday.co.ke/bolt-expands-bolt-send-to-motorbikes-in-mombasa/"],
    ["Africa Business Communities: Bolt Send Mombasa", "https://africabusinesscommunities.com/tech-24/bolt-adds-motorbikes-to-send-delivery-service-in-mombasa/"]
  ],
  12: [
    ["UnionPay International and Standard Bank announcement", "https://www.prnewswire.com/news-releases/unionpay-and-standard-bank-unlock-cross-border-e-commerce-opportunities-for-merchants-across-nine-african-markets-302855089.html"],
    ["Standard Bank Group", "https://www.standardbank.com/"]
  ],
  13: [
    ["Reuters via Investing.com: July 2026 China car sales and exports", "https://www.investing.com/news/stock-market-news/chinas-car-sales-extend-slide-as-shift-accelerates-to-overseas-markets-4851105"],
    ["Reuters via Yahoo Finance: Geely EU driver-assistance certification", "https://uk.finance.yahoo.com/news/geely-says-driver-assistance-system-112753457.html"],
    ["XPENG", "https://www.xpeng.com/news"]
  ],
  14: [
    ["Netskope Threat Labs Report: Europe 2026", "https://www.netskope.com/resources/threat-labs-reports/threat-labs-report-europe-2026"],
    ["CERT-EU Cyber Brief 26-08", "https://cert.europa.eu/publications/threat-intelligence/cb26-08/"]
  ]
};

const heroByArticle = {
  1: { kicker: "CONCEPT BASED ON SOFTWARE EVIDENCE", left: "VISUAL SENSOR", right: "SIRI CONTEXT", accent: "#84d8ff", background: "#071926" },
  2: { kicker: "KENYA BANK TRANSFERS", left: "KSh 0", right: "KSh 20", accent: "#67e8a5", background: "#09241c" },
  3: { kicker: "AFRICAN FINTECH CAPITAL", left: "AFRICA", right: "GLOBAL EXCHANGES", accent: "#ffcf66", background: "#271807" },
  4: { kicker: "ON-DEVICE AGENTIC AI", left: "LOCAL NPU", right: "SELECTIVE CLOUD", accent: "#9f8cff", background: "#17102d" },
  5: { kicker: "TRANSSION H-SHARE PROCESS", left: "AFRICA DEMAND", right: "HONG KONG", accent: "#ff8d70", background: "#2b1110" },
  6: { kicker: "KENYA BANKS H1 2026", left: "EQUITY +32%", right: "ABSA -10%", accent: "#6ee7b7", background: "#09231f" },
  7: { kicker: "ASSET FINANCE", left: "SMARTPHONE", right: "SOLAR", accent: "#ffe16b", background: "#2b2508" },
  8: { kicker: "EU DMA INTEROPERABILITY", left: "PLATFORM", right: "RIVAL SERVICES", accent: "#66a3ff", background: "#0b1b38" },
  9: { kicker: "ANKER KENYA", left: "POWER + AUDIO", right: "SERVICE + WARRANTY", accent: "#65e6ff", background: "#08252b" },
  10: { kicker: "KENYA STARTUP INTELLIGENCE", left: "FRAGMENTED DATA", right: "VERIFIED MAP", accent: "#d6a0ff", background: "#21122b" },
  11: { kicker: "BOLT SEND MOMBASA", left: "SMALL PARCEL", right: "MOTORBIKE", accent: "#69e69c", background: "#0b2619" },
  12: { kicker: "CROSS-BORDER E-COMMERCE", left: "9 MARKETS", right: "ABOUT 900 MERCHANTS", accent: "#ffcc63", background: "#282007" },
  13: { kicker: "CHINA AUTO EXPORTS", left: "+88.2%", right: "923,000 VEHICLES", accent: "#ff7d7d", background: "#2a0d12" },
  14: { kicker: "TRUSTED CLOUD ABUSE", left: "FAMILIAR PLATFORM", right: "SECURITY GATEWAY", accent: "#74b8ff", background: "#071b30" }
};

const replacePublicEditorialNotes = new Map([
  ["The round amount was not publicly disclosed in the source material reviewed for this article.", "Yellow did not disclose the round amount in its announcement."],
  ["The supplied roundup described Yellow as using AI-driven credit scoring.", "Some coverage has described Yellow as using AI-driven credit scoring."],
  ["The sources reviewed for this package did not provide enough primary detail to support a strong claim that the new Series C is specifically an AI-credit-scoring story.", "Yellow's Series C announcement does not provide enough detail to support a strong claim that the financing round is specifically an AI-credit-scoring story."],
  ["tecMAMBO should not turn generic fintech automation into an AI headline without evidence.", "Generic fintech automation should not be turned into an AI claim without evidence."],
  ["## Price still matters, but the supplied $30,000 claim needs caution", "## Price still matters, but sub-$30,000 claims need market context"],
  ["tecMAMBO should keep that distinction visible whenever manufacturers use ambitious terms such as intelligent driving or autonomous capability.", "That distinction must remain visible whenever manufacturers use ambitious terms such as intelligent driving or autonomous capability."]
]);

function clean(value) {
  let output = value
    .replaceAll("**", "")
    .replaceAll("`", "")
    .replaceAll("\u2014", "-")
    .replaceAll("\u2013", "-")
    .trim();
  for (const [from, to] of replacePublicEditorialNotes) output = output.replaceAll(from, to);
  return output;
}

function spec(block, label) {
  return clean(block.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`))?.[1] ?? "");
}

function slugify(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function splitBody(raw) {
  const output = [];
  let paragraph = [];
  const flush = () => {
    if (paragraph.length) output.push(clean(paragraph.join(" ")));
    paragraph = [];
  };
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      continue;
    }
    if (/^(?:##|###) /.test(trimmed) || /^- /.test(trimmed) || /^\d+\. /.test(trimmed)) {
      flush();
      output.push(clean(trimmed));
      continue;
    }
    paragraph.push(trimmed);
  }
  flush();
  return output.filter(Boolean);
}

function tagRecords(primary, secondary) {
  return [primary, ...secondary.split(",")]
    .map(clean)
    .filter(Boolean)
    .map((name) => ({ name, slug: slugify(name), kind: "topic" }));
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("'", "&apos;").replaceAll('"', "&quot;");
}

function makeHero(record, articleNumber) {
  const hero = heroByArticle[articleNumber];
  const title = escapeXml(record.title);
  const kicker = escapeXml(hero.kicker);
  const left = escapeXml(hero.left);
  const right = escapeXml(hero.right);
  const concept = articleNumber === 1 ? "CONCEPT ILLUSTRATION - NOT OFFICIAL PRODUCT PHOTOGRAPHY" : "ORIGINAL TECMAMBO ANALYSIS GRAPHIC";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc"><title id="title">${title}</title><desc id="desc">Original tecMAMBO editorial illustration for ${title}</desc><defs><pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M64 0H0V64" fill="none" stroke="${hero.accent}" stroke-opacity=".08"/></pattern></defs><rect width="1600" height="900" rx="34" fill="${hero.background}"/><rect width="1600" height="900" rx="34" fill="url(#grid)"/><circle cx="800" cy="465" r="138" fill="none" stroke="${hero.accent}" stroke-width="18"/><circle cx="800" cy="465" r="68" fill="${hero.accent}" fill-opacity=".2" stroke="${hero.accent}" stroke-width="8"/><path d="M475 465H650M950 465h175" stroke="${hero.accent}" stroke-width="14" stroke-linecap="round"/><path d="m625 437 42 28-42 28M975 437l-42 28 42 28" fill="none" stroke="${hero.accent}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><rect x="110" y="320" width="365" height="290" rx="42" fill="${hero.accent}" fill-opacity=".12" stroke="${hero.accent}" stroke-width="5"/><rect x="1125" y="320" width="365" height="290" rx="42" fill="${hero.accent}" fill-opacity=".12" stroke="${hero.accent}" stroke-width="5"/><text x="292" y="470" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="46" font-weight="700">${left}</text><text x="1308" y="470" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="42" font-weight="700">${right}</text><text x="110" y="120" fill="${hero.accent}" font-family="Arial,sans-serif" font-size="34" font-weight="700" letter-spacing="5">${kicker}</text><foreignObject x="110" y="665" width="1380" height="125"><div xmlns="http://www.w3.org/1999/xhtml" style="color:#fff;font:700 48px/1.08 Arial,sans-serif">${title}</div></foreignObject><text x="110" y="845" fill="#fff" fill-opacity=".58" font-family="Arial,sans-serif" font-size="23" letter-spacing="2">${concept}</text></svg>`;
}

if (blocks.length !== 14) throw new Error(`Expected 14 articles, found ${blocks.length}.`);

const records = blocks.map((block, index) => {
  const articleNumber = index + 1;
  const articleSource = block.split("## Sources")[0];
  const bodyStart = articleSource.search(/^# /m);
  const bodySource = articleSource.slice(bodyStart);
  const title = clean(bodySource.match(/^# (.+)$/m)?.[1] ?? "");
  const body = splitBody(bodySource.replace(/^# .+\n/, ""));
  const firstParagraph = body.find((entry) => !entry.startsWith("#") && !entry.startsWith("- ")) ?? spec(block, "Meta description");
  const slug = spec(block, "Suggested slug");
  const format = formatByArticle[articleNumber];
  const hero = heroByArticle[articleNumber];
  const alt = articleNumber === 1
    ? "Concept illustration of camera-equipped AirPods sending visual context to Siri, based on leaked software evidence and not official product photography."
    : `${hero.kicker.toLowerCase()} shown as an original tecMAMBO analysis graphic linking ${hero.left.toLowerCase()} with ${hero.right.toLowerCase()}.`;
  return {
    id: `editorial-august21-${slug}`,
    slug,
    format,
    title,
    seo: { title: spec(block, "SEO title"), description: spec(block, "Meta description") },
    subhead: spec(block, "Meta description"),
    excerpt: spec(block, "Meta description"),
    whyItMatters: firstParagraph,
    body,
    publishedAt: `2026-08-21T${publicationTimes[index]}:00+03:00`,
    updatedAt: reviewTimestamp,
    readTime: `${Math.max(5, Math.ceil(body.join(" ").split(/\s+/).length / 210))} min read`,
    image: {
      src: `/articles/august21/${slug}.svg`,
      alt,
      credit: "tecMAMBO original illustration",
      width: 1600,
      height: 900,
      type: "image/svg+xml"
    },
    tags: tagRecords(spec(block, "Primary category"), spec(block, "Secondary categories")),
    regionSlugs: regionByArticle[articleNumber] ?? [],
    sources: sourcesByArticle[articleNumber].map(([label, url]) => ({ label, url })),
    publicationStatus: "publish",
    editorialStatus: "published",
    indexingStatus: "index",
    contentFormat: format === "business" ? "news" : format === "opinion" ? "analysis" : "explainer",
    hasOriginalPhotography: false,
    workflowVersion: "gated",
    sourceChecked: true,
    humanEditorApproved: true,
    editor: "Dev Camau",
    reviewedAt: reviewTimestamp,
    originalValueType: originalValueByArticle[articleNumber],
    excludeFromDiscovery: false,
    googleAdsEligible: true,
    sourceDisclosure: articleNumber === 1
      ? "The product remains unannounced. The story separates evidence found in prerelease software from unconfirmed retail details and labels privacy analysis as inference."
      : "Claims were checked against the listed primary material and attributed reporting on August 21, 2026.",
    pricingCheckedAt: articleNumber === 2 ? reviewTimestamp : undefined,
    legalReviewedAt: reviewTimestamp,
    authorSlug: authorByArticle[articleNumber],
    articleNumber
  };
});

const generated = `import type { Article, Author, RegionTerm } from "@/lib/types";\n\n` +
  `type EditorialRecord = Omit<Article, "author" | "regions"> & { regionSlugs: string[]; authorSlug: string; articleNumber: number };\n\n` +
  `export const editorialAugust21Records: EditorialRecord[] = ${JSON.stringify(records, null, 2)};\n\n` +
  `function bySlug<T extends { slug: string }>(items: T[], slug: string) {\n` +
  `  const item = items.find((entry) => entry.slug === slug);\n` +
  `  if (!item) throw new Error(\`Missing content term: \${slug}\`);\n` +
  `  return item;\n` +
  `}\n\n` +
  `export function buildEditorialAugust21Articles({ authors, regions, existingEuDmaArticle }: { authors: Author[]; regions: RegionTerm[]; existingEuDmaArticle: Article }): Article[] {\n` +
  `  return editorialAugust21Records.map(({ regionSlugs, authorSlug, articleNumber, ...record }) => {\n` +
  `    const article = articleNumber === 8\n` +
  `      ? { ...record, id: existingEuDmaArticle.id, slug: existingEuDmaArticle.slug, format: existingEuDmaArticle.format, publishedAt: existingEuDmaArticle.publishedAt, faq: record.faq ?? existingEuDmaArticle.faq }\n` +
  `      : record;\n` +
  `    return { ...article, author: bySlug(authors, authorSlug), regions: regionSlugs.map((slug) => bySlug(regions, slug)) };\n` +
  `  });\n` +
  `}\n`;

writeFileSync(outputPath, generated.replaceAll("\\u2014", "-").replaceAll("\\u2013", "-"));
mkdirSync(dirname(assetDir), { recursive: true });
mkdirSync(assetDir, { recursive: true });
for (const record of records) {
  writeFileSync(resolve(assetDir, `${record.slug}.svg`), makeHero(record, record.articleNumber));
}

process.stdout.write(`Generated ${records.length} verified August 21 records and ${records.length} original hero assets.\n`);
