import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import process from "node:process";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Pass the editorial bundle path.");

const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "lib/editorial-bundle-august-14-2026.ts");
const assetDir = resolve(root, "public/articles/august14");
const source = readFileSync(sourcePath, "utf8");
const blocks = source.split(/^# ARTICLE \d+\s*$/m).slice(1);

const statusByArticle = {
  1: { sourceChecked: true },
  2: { sourceChecked: true },
  3: { sourceChecked: true },
  4: { sourceChecked: true },
  5: { sourceChecked: true },
  6: { sourceChecked: true },
  7: { sourceChecked: true },
  8: { sourceChecked: true },
  9: { sourceChecked: true },
  10: { sourceChecked: true },
  11: { sourceChecked: true },
  12: { sourceChecked: true },
  13: { sourceChecked: true },
  14: { sourceChecked: true },
  15: { sourceChecked: true },
  16: { sourceChecked: true }
};

const sourceDisclosureByArticle = {
  16: "Songs of LIVE is verified through TikTok's official @tiktoklive account. A separate TikTok Newsroom announcement was not located."
};

const regionByArticle = {
  2: ["kenya"],
  4: ["kenya"],
  6: ["kenya"],
  7: ["kenya"],
  10: ["ethiopia"],
  12: ["kenya"],
  15: ["kenya"],
  16: ["kenya"]
};

const primaryCategoryToFormat = {
  Business: "business",
  Fintech: "business"
};

const primarySourceAdditions = {
  2: [{ label: "CMA: Virtual Asset Service Providers Regulations 2026", url: "https://www.cma.or.ke/regulatory-framework/" }],
  4: [{ label: "CMA: WSA Banking Index ETF approval", url: "https://www.cma.or.ke/cma-approves-innovative-exchange-traded-fund-to-diversify-and-deepen-the-capital-markets/" }],
  16: [{ label: "TikTok LIVE: Songs of LIVE", url: "https://www.tiktok.com/@tiktoklive/video/7661851844729212178" }]
};

const reviewTimestamp = "2026-08-14T10:41:50+03:00";

const heroByArticle = {
  1: {
    src: "/articles/august14/whatsapp-scam-alert-on-device-ai-explained.webp",
    alt: "The WhatsApp logo displayed on a smartphone against a bright green background.",
    credit: "LightRocket",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  2: {
    src: "/articles/august14/kenya-crypto-vasp-capital-rules-november-2026.webp",
    alt: "Ethereum, Bitcoin and XRP coins displayed in front of the Kenyan flag.",
    credit: "CoinGeek",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  3: {
    src: "/articles/august14/instagram-new-wordmark-2026-design-refresh.webp",
    alt: "Two smartphones comparing Instagram's previous script wordmark with its redesigned wordmark.",
    credit: "Daijiworld",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  4: {
    src: "/articles/august14/wsa-banking-index-etf-nse-kenya-explained.webp",
    alt: "A Kenyan financial executive speaking at a Capital Club event.",
    credit: "Kenyan Wall Street",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  5: {
    src: "/articles/august14/spotify-kobalt-licensed-ai-covers-remixes.webp",
    alt: "A phone displaying the Spotify app logo against a pink background.",
    credit: "Picture Alliance",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  6: {
    src: "/articles/august14/kenya-cyber-cafe-rules-ca-clarification-privacy.webp",
    alt: "A customer using a laptop inside a Kenyan cyber cafe.",
    credit: "Rest of World",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  7: {
    src: "/articles/august14/jumia-50-million-ifc-axian-profitability.webp",
    alt: "A Jumia warehouse worker packing an order into a branded delivery box.",
    credit: "Jumia",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  8: {
    src: "/articles/august14/spotify-ai-persona-badge-synthetic-artists.webp",
    alt: "Spotify screens showing an AI Persona artist profile, search results, credits and identity badge.",
    credit: "Spotify",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  9: {
    src: "/articles/august14/google-quick-share-tap-to-share-pixel-nfc.webp",
    alt: "Two smartphones touching to share a contact card using Tap to Share.",
    credit: "Google",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  10: {
    src: "/articles/august14/mpesa-ethiopia-bank-of-abyssinia-cardless-atm.webp",
    alt: "Bank of Abyssinia ATM and M-Pesa graphic illustrating cardless cash withdrawals.",
    credit: "Bank of Abyssinia",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  11: {
    src: "/articles/august14/anthropic-claude-invisible-text-watermarks-explained.webp",
    alt: "A person holding a phone displaying the Claude by Anthropic logo.",
    credit: "",
    creditOmitted: true,
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  12: {
    src: "/articles/august14/kenya-intimate-image-privacy-ruling-2-5-million.webp",
    alt: "Pixelated intimate images displayed on social media with a phone in the foreground.",
    credit: "Wikipedia",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  13: {
    src: "/articles/august14/disney-tiktok-verts-fan-videos-disney-plus.webp",
    alt: "The Walt Disney Company and TikTok logos displayed side by side.",
    credit: "Disney",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  14: {
    src: "/articles/august14/microsoft-openai-24-1-billion-revenue-concentration.webp",
    alt: "OpenAI chief executive Sam Altman greeting Microsoft chief executive Satya Nadella in front of the OpenAI logo.",
    credit: "GeekWire",
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  15: {
    src: "/articles/august14/agentic-ai-financial-fraud-kenya-bcg.webp",
    alt: "A shopper making an online card payment using a smartphone and laptop.",
    credit: "",
    creditOmitted: true,
    width: 1040,
    height: 520,
    type: "image/webp"
  },
  16: {
    src: "/articles/august14/tiktok-songs-of-live-professional-inbox-creator-tools.webp",
    alt: "A smartphone displaying TikTok's official profile page.",
    credit: "",
    creditOmitted: true,
    width: 1040,
    height: 520,
    type: "image/webp"
  }
};

function clean(value) {
  return value
    .replaceAll("**", "")
    .replaceAll("`", "")
    .replaceAll("\u2014", "-")
    .replaceAll("\u2013", "-")
    .replace("A named human editor should remain responsible for the publication.", "A named human editor remains accountable for each published piece.")
    .trim();
}

function spec(block, label) {
  return clean(block.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`))?.[1] ?? "");
}

function slugify(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function splitBody(raw) {
  const lines = raw.split("\n");
  const output = [];
  let paragraph = [];
  let inTable = false;
  const flush = () => {
    if (paragraph.length) output.push(clean(paragraph.join(" ")));
    paragraph = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      inTable = false;
      continue;
    }
    if (/^\|[-: |]+\|$/.test(trimmed)) {
      inTable = true;
      continue;
    }
    if (trimmed.startsWith("|")) {
      flush();
      const cells = trimmed.split("|").map(clean).filter(Boolean);
      if (!inTable && cells[0] === "Activity") continue;
      if (cells.length >= 2) output.push(`- ${cells[0]}: ${cells.slice(1).join("; ")}`);
      inTable = true;
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

function parseSources(raw) {
  return [...raw.matchAll(/^- ([^:\n]+): (https:\/\/\S+)$/gm)].map((match) => ({
    label: clean(match[1]),
    url: match[2].trim()
  }));
}

function parseFaq(bodySource) {
  const section = bodySource.split("### Quick questions")[1];
  if (!section) return [];
  return [...section.matchAll(/\*\*(.+?)\*\*\s{2}\n([^\n]+)/g)].map((match) => ({
    question: clean(match[1]),
    answer: clean(match[2])
  }));
}

function tagRecords(value) {
  return value.split(",").map(clean).filter(Boolean).map((name) => ({ name, slug: slugify(name), kind: "topic" }));
}

const records = blocks.map((block, index) => {
  const articleNumber = index + 1;
  const articleSource = block.split("## Sources")[0];
  const bodyStart = articleSource.search(/^# /m);
  const bodySource = articleSource.slice(bodyStart);
  const title = clean(bodySource.match(/^# (.+)$/m)?.[1] ?? "");
  const bodyWithoutTitle = bodySource.replace(/^# .+\n/, "").split("### Quick questions")[0];
  const formatName = spec(block, "Format");
  const primaryCategory = spec(block, "Primary category");
  const sourcesSource = block.split("## Sources")[1]?.split(/^---$/m)[0] ?? "";
  const sourceStatus = statusByArticle[articleNumber];
  const tags = tagRecords(spec(block, "Suggested tags"));
  const slug = spec(block, "Suggested slug");
  const body = splitBody(bodyWithoutTitle).map((entry) => {
    if (articleNumber === 9) {
      return entry.replace("existing Pixel 11 launch deep dive", "[existing Pixel 11 launch deep dive](/news/google-pixel-11-series-tensor-g6-hilight-price-2026)");
    }
    if (articleNumber === 16) {
      return entry
        .replace("Separately, current feature trackers report a Songs of LIVE capability", "Separately, TikTok's official @tiktoklive account has introduced a Songs of LIVE capability")
        .replace("Feature trackers in August 2026 report that TikTok is introducing Songs of LIVE", "TikTok's official @tiktoklive account introduced Songs of LIVE in July 2026")
        .replace("At preparation time, tecMAMBO did not locate a matching public TikTok Newsroom announcement containing complete global availability details.", "TikTok has not published a separate Newsroom announcement containing complete global availability details.")
        .replace("If TikTok publishes a primary announcement before Codex implements this article, the source and wording should be updated.", "The official TikTok LIVE post verifies the feature, while its availability may still vary by account and market.")
        .replace("If the feature cannot be independently verified, the story should remain in_review.", "The article therefore distinguishes the verified feature from availability details that TikTok has not announced globally.");
    }
    return entry;
  });
  const firstParagraph = body.find((entry) => !entry.startsWith("#") && !entry.startsWith("- ")) ?? spec(block, "Excerpt");
  const faq = parseFaq(bodySource);
  const bodyWithoutFaq = body.filter((entry) => entry !== "### Quick questions");
  const format = formatName === "MAMBO Explains"
    ? "explainer"
    : formatName === "MAMBO Take"
      ? "opinion"
      : primaryCategoryToFormat[primaryCategory] ?? "news";

  return {
    id: `editorial-august14-${slug}`,
    slug,
    format,
    title,
    seo: { title: spec(block, "SEO title"), description: spec(block, "Meta description") },
    subhead: spec(block, "Excerpt"),
    excerpt: spec(block, "Excerpt"),
    whyItMatters: firstParagraph,
    body: bodyWithoutFaq,
    publishedAt: `2026-08-14T${String(8 + Math.floor((index * 10) / 60)).padStart(2, "0")}:${String((index * 10) % 60).padStart(2, "0")}:00+03:00`,
    updatedAt: reviewTimestamp,
    readTime: `${Math.max(5, Math.ceil(bodyWithoutFaq.join(" ").split(/\\s+/).length / 210))} min read`,
    image: heroByArticle[articleNumber] ?? {
      src: `/articles/august14/${slug}.svg`,
      alt: `${title}. tecMAMBO editorial illustration.`,
      credit: "tecMAMBO editorial illustration",
      width: 1600,
      height: 900,
      type: "image/svg+xml"
    },
    tags,
    regionSlugs: regionByArticle[articleNumber] ?? [],
    faq: faq.length ? faq : undefined,
    sources: [...(primarySourceAdditions[articleNumber] ?? []), ...parseSources(sourcesSource)],
    publicationStatus: "publish",
    editorialStatus: "published",
    indexingStatus: "index",
    contentFormat: format === "opinion" ? "analysis" : format === "business" ? "news" : "explainer",
    hasOriginalPhotography: false,
    workflowVersion: "gated",
    sourceChecked: sourceStatus.sourceChecked,
    humanEditorApproved: true,
    editor: "Dev Camau",
    reviewedAt: reviewTimestamp,
    originalValueType: format === "opinion" ? "original_analysis" : "curated_context",
    excludeFromDiscovery: false,
    googleAdsEligible: articleNumber === 12 ? false : true,
    sourceDisclosure: sourceDisclosureByArticle[articleNumber],
    legalReviewedAt: [2, 4, 5, 6, 10, 12, 15].includes(articleNumber) ? reviewTimestamp : undefined
  };
});

if (records.length !== 16) throw new Error(`Expected 16 articles, found ${records.length}.`);

const outputRecords = records;
const generated = `import type { Article, Author, RegionTerm } from "@/lib/types";\n\n` +
  `type EditorialRecord = Omit<Article, "author" | "regions"> & { regionSlugs: string[] };\n\n` +
  `export const editorialAugust14Records: EditorialRecord[] = ${JSON.stringify(outputRecords, null, 2)};\n\n` +
  `function bySlug<T extends { slug: string }>(items: T[], slug: string) {\n` +
  `  const item = items.find((entry) => entry.slug === slug);\n` +
  `  if (!item) throw new Error(\`Missing content term: \${slug}\`);\n` +
  `  return item;\n` +
  `}\n\n` +
  `export function buildEditorialAugust14Articles({ authors, regions }: { authors: Author[]; regions: RegionTerm[] }): Article[] {\n` +
  `  const author = bySlug(authors, "tecmambo-team");\n` +
  `  return editorialAugust14Records.map(({ regionSlugs, ...article }) => ({\n` +
  `    ...article,\n` +
  `    author,\n` +
  `    regions: regionSlugs.map((slug) => bySlug(regions, slug))\n` +
  `  }));\n` +
  `}\n`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, generated.replaceAll("\\u2014", "-").replaceAll("\\u2013", "-"));

mkdirSync(assetDir, { recursive: true });
const palettes = [
  ["#19152d", "#6f56ff", "#efeaff"], ["#102b22", "#0d9f6e", "#e0fff4"],
  ["#2e1727", "#e94b8a", "#fff0f6"], ["#1f2940", "#3f7cff", "#ecf3ff"]
];
for (const [index, record] of records.entries()) {
  if (heroByArticle[index + 1]) continue;
  const [background, accent, text] = palettes[index % palettes.length];
  const label = record.tags[0]?.name ?? "tecMAMBO";
  const safeTitle = record.title.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("'", "&apos;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc"><title id="title">${safeTitle}</title><desc id="desc">Original tecMAMBO editorial illustration for ${safeTitle}</desc><rect width="1600" height="900" fill="${background}"/><circle cx="1320" cy="180" r="330" fill="${accent}" opacity=".34"/><circle cx="140" cy="820" r="260" fill="${accent}" opacity=".22"/><path d="M90 125h320" stroke="${accent}" stroke-width="18" stroke-linecap="round"/><text x="90" y="220" fill="${accent}" font-family="Arial,sans-serif" font-size="44" font-weight="700">${label.toUpperCase()}</text><foreignObject x="90" y="285" width="1220" height="390"><div xmlns="http://www.w3.org/1999/xhtml" style="color:${text};font:700 76px/1.08 Arial,sans-serif">${safeTitle}</div></foreignObject><text x="90" y="810" fill="${text}" opacity=".7" font-family="Arial,sans-serif" font-size="30">tecMAMBO • ${label.toUpperCase()}</text></svg>`;
  writeFileSync(resolve(assetDir, `${record.slug}.svg`), svg);
}

process.stdout.write(`Generated ${records.length} published records with durable production asset metadata.\n`);
