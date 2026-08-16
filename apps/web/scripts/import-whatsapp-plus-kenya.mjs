import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Pass the WhatsApp Plus editorial package path.");

const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "lib/whatsapp-plus-kenya-2026.ts");
const source = readFileSync(sourcePath, "utf8");
const title = "WhatsApp Plus is official: what KSh 119 gets Kenyan users and what stays free";
const storyStart = source.indexOf(`# ${title}`);
const faqStart = source.indexOf("## Frequently asked questions", storyStart);
const sourcesStart = source.indexOf("## Sources and further reading", faqStart);

if (storyStart < 0 || faqStart < 0 || sourcesStart < 0) throw new Error("Could not locate the article sections.");

function cleanEmphasis(value) {
  return value.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}

function markdownBlocks(markdown) {
  return markdown
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^# .+\n+/, "")
    .trim()
    .split(/\n{2,}/)
    .flatMap((block) => {
      const trimmed = cleanEmphasis(block.trim());
      if (!trimmed) return [];
      if (/^#{2,3} /.test(trimmed)) return [trimmed];
      if (/^- /m.test(trimmed)) return trimmed.split("\n").map((line) => line.trim()).filter(Boolean);
      if (/^\d+\. /m.test(trimmed)) return trimmed.split("\n").map((line) => line.trim()).filter(Boolean);
      return [trimmed.replace(/\n/g, " ")];
    });
}

const storyWithoutTable = source.slice(storyStart, faqStart).replace(
  /## Free WhatsApp vs WhatsApp Plus[\s\S]*?(?=## What about the 18 themes and 14 app icons\?)/,
  "## Free WhatsApp vs WhatsApp Plus\n\n[[table:whatsapp-free-vs-plus]]\n\n[[media:whatsapp-plus-free-vs-plus-graphic]]\n\n"
);
const body = markdownBlocks(storyWithoutTable);

for (let index = 0; index < body.length; index += 1) {
  body[index] = body[index]
    .replace(
      "That means tecMAMBO should treat 18 themes and 14 icons as the current observed feature set rather than promise that the numbers can never change.",
      "Those figures are best treated as the current observed feature set rather than a promise that the numbers can never change."
    )
    .replace(
      "That should not be presented as a confirmed strategy.",
      "It is therefore not a confirmed strategy."
    );
}

function insertAfter(needle, value) {
  const index = body.findIndex((block) => block === needle);
  if (index < 0) throw new Error(`Missing insertion point: ${needle}`);
  body.splice(index + 1, 0, value);
}

insertAfter(
  "WhatsApp is evolving from one chronological message list into a more configurable communication dashboard.",
  "That wider reinvention also includes [WhatsApp usernames, which can let people connect without sharing a phone number](/news/whatsapp-usernames-reserve-now)."
);
insertAfter(
  "On iPhone, billing follows Apple's App Store subscription and payment system.",
  "[[media:whatsapp-plus-kenya-price-payment]]"
);
insertAfter(
  "Using unsupported versions can also lead to account restrictions.",
  "For a separate security feature built into the supported app, read [how WhatsApp's Scam Alert checks suspicious messages on the device](/explainers/whatsapp-scam-alert-on-device-ai-explained)."
);
body.push("[[media:whatsapp-plus-kenyan-power-user]]");

const faqSource = source.slice(faqStart, sourcesStart);
const faqMatches = [...faqSource.matchAll(/^### (.+)\n\n([\s\S]*?)(?=\n\n### |\n\n## |$)/gm)];
const faq = faqMatches.map((match) => ({
  question: cleanEmphasis(match[1].trim()),
  answer: cleanEmphasis(match[2].trim().replace(/\n/g, " "))
}));

if (faq.length !== 11) throw new Error(`Expected 11 FAQ entries, found ${faq.length}.`);

const reviewedAt = "2026-08-15T21:17:28+03:00";
const articleData = {
  id: "whatsapp-plus-kenya-2026",
  slug: "whatsapp-plus-kenya-ksh-119-features-worth-it",
  format: "explainer",
  contentFormat: "explainer",
  title,
  seo: {
    title: "WhatsApp Plus Kenya: KSh 119 Price, Features and Free vs Plus",
    description: "WhatsApp Plus adds extra pinned chats, custom themes, icons, ringtones and special-effect stickers. Here is what Kenyan users get for KSh 119 a month."
  },
  subhead: "WhatsApp Plus is Meta's optional paid tier for personal WhatsApp Messenger. Kenyan rollout reporting has shown KSh 119 a month, while ordinary messages, calls and encryption remain free.",
  excerpt: "WhatsApp Plus is Meta's optional paid tier for personal WhatsApp Messenger. Kenyan users have seen pricing around KSh 119 a month, with extra chat pins, themes, icons, ringtones and stickers while core messaging remains free.",
  whyItMatters: "WhatsApp is central to work, family, business and community life in Kenya. This guide separates the practical value of 20 pinned chats from cosmetic extras, and explains the local price and payment caveats before anyone subscribes.",
  body,
  publishedAt: reviewedAt,
  updatedAt: reviewedAt,
  readTime: "14 min read",
  image: {
    src: "/articles/whatsapp-plus/whatsapp-plus-kenya-hero.webp",
    alt: "Original concept showing a premium messaging interface with pinned chats, themes, app icons, ringtones and sticker effects.",
    credit: "WhatsApp",
    width: 1672,
    height: 941,
    type: "image/webp"
  },
  mediaSlots: [
    {
      id: "whatsapp-plus-free-vs-plus-graphic",
      type: "infographic",
      status: "ready",
      placement: "After the Free versus Plus comparison",
      src: "/articles/whatsapp-plus/whatsapp-plus-free-vs-plus.svg",
      alt: "Comparison of free WhatsApp and WhatsApp Plus showing three versus twenty pinned chats and optional premium customization features.",
      caption: "WhatsApp Plus adds organization and personalization rather than charging for ordinary messages and calls.",
      credit: "tecMAMBO",
      licensingNote: "Original tecMAMBO infographic.",
      aspectRatio: "16:9",
      width: 1600,
      height: 900
    },
    {
      id: "whatsapp-plus-kenya-price-payment",
      type: "infographic",
      status: "ready",
      placement: "After the Kenya pricing and payment discussion",
      src: "/articles/whatsapp-plus/whatsapp-plus-kenya-price-payment.svg",
      alt: "WhatsApp Plus Kenya pricing graphic showing KSh 119 per month and local app store payment caveats.",
      caption: "Kenyan rollout reporting has shown KSh 119 per month. Confirm the exact price, trial and payment method inside your own subscription screen.",
      credit: "tecMAMBO",
      licensingNote: "Original tecMAMBO infographic.",
      aspectRatio: "16:9",
      width: 1600,
      height: 900
    },
    {
      id: "whatsapp-plus-kenyan-power-user",
      type: "image",
      status: "ready",
      placement: "Before the FAQ",
      src: "/articles/whatsapp-plus/whatsapp-plus-kenyan-power-user.webp",
      alt: "Kenyan messaging power user organizing work, family, clients, chama, church and community conversations.",
      caption: "The strongest case for WhatsApp Plus in Kenya may be organization rather than visual customization.",
      credit: "tecMAMBO original illustration created with AI assistance",
      licensingNote: "Original tecMAMBO illustration created with AI assistance.",
      aspectRatio: "16:9",
      width: 1672,
      height: 941
    }
  ],
  comparisonTables: [
    {
      id: "whatsapp-free-vs-plus",
      caption: "Free WhatsApp compared with WhatsApp Plus",
      columns: ["Free WhatsApp", "WhatsApp Plus"],
      rows: [
        { label: "Personal messages", values: ["Included", "Included"] },
        { label: "Voice and video calls", values: ["Included", "Included"] },
        { label: "End-to-end encryption", values: ["Included", "Included"] },
        { label: "Pinned chats", values: ["Up to 3", "Up to 20"] },
        { label: "Standard app appearance", values: ["Included", "Included"] },
        { label: "Premium app themes", values: ["No", "Yes"] },
        { label: "Alternate app icons", values: ["No", "Yes"] },
        { label: "Exclusive ringtones", values: ["No", "Yes"] },
        { label: "Special-effect stickers", values: ["No", "Yes"] },
        { label: "Custom chat list controls", values: ["Standard controls", "Expanded Plus controls"] },
        { label: "Subscription fee", values: ["None", "Market-dependent monthly fee"] }
      ]
    }
  ],
  faq,
  sources: [
    { label: "WhatsApp: WhatsApp Plus product page", url: "https://www.whatsapp.com/whatsapp-plus" },
    { label: "WhatsApp Help Center: WhatsApp Plus benefits", url: "https://faq.whatsapp.com/1288717426659143" },
    { label: "WhatsApp Help Center: subscribing to WhatsApp Plus", url: "https://faq.whatsapp.com/1442805697640853" },
    { label: "WhatsApp Help Center: unofficial apps", url: "https://faq.whatsapp.com/1217634902127718" },
    { label: "WhatsApp Help Center: pinned chats", url: "https://faq.whatsapp.com/645907560577342" },
    { label: "WhatsApp: monetization in Updates", url: "https://blog.whatsapp.com/helping-you-find-more-channels-and-businesses-on-whatsapp" },
    { label: "Google Play: accepted payment methods in Kenya", url: "https://support.google.com/googleplay/answer/2651410?co=GENIE.CountryCode%3DKE&hl=en" },
    { label: "Tech-ish: WhatsApp Plus Kenya rollout price", url: "https://tech-ish.com/2026/06/23/poll-have-you-subscribed-to-whatsapp-plus/" },
    { label: "9to5Mac: WhatsApp Plus US launch price", url: "https://9to5mac.com/2026/05/27/whatsapp-plus-subscription-launches-for-2-99-month-details-here/" },
    { label: "MacRumors: launch-period themes and icons", url: "https://www.macrumors.com/2026/05/11/whatsapp-plus-lands-on-iphone/" }
  ],
  itemList: [
    "WhatsApp Plus is optional and ordinary WhatsApp messaging and calls remain free.",
    "Free WhatsApp supports up to three pinned chats, while Plus supports up to 20.",
    "Kenyan rollout reporting has shown KSh 119 per month, but price and trial availability can vary.",
    "Google Play lists M-PESA Xpress in Kenya, but subscription availability depends on the account and billing setup.",
    "WhatsApp Plus applies to personal WhatsApp Messenger and is not a WhatsApp Business subscription.",
    "GB WhatsApp and similar modified clients remain unsupported third-party apps."
  ],
  publicationStatus: "publish",
  editorialStatus: "published",
  indexingStatus: "index",
  workflowVersion: "gated",
  sourceChecked: true,
  humanEditorApproved: true,
  editor: "Dev Camau",
  reviewedAt,
  originalValueType: "original_analysis",
  excludeFromDiscovery: false,
  googleAdsEligible: true,
  hasOriginalPhotography: false,
  sourceDisclosure: "Product features were checked against WhatsApp primary sources. Kenyan pricing is attributed to local rollout reporting, US pricing and launch counts are attributed to launch-period reporting, and M-PESA availability is based on Google's Kenya payment documentation.",
  pricingCheckedAt: reviewedAt
};

const generated = `import type { Article, Author, RegionTerm, Tag } from "@/lib/types";\n\n` +
  `type BuildWhatsAppPlusKenyaArgs = { authors: Author[]; topics: Tag[]; brands: Tag[]; regions: RegionTerm[] };\n\n` +
  `const articleData: Omit<Article, "author" | "tags" | "regions"> = ${JSON.stringify(articleData, null, 2)};\n\n` +
  `function bySlug<T extends { slug: string }>(items: T[], slug: string) {\n  const item = items.find((entry) => entry.slug === slug);\n  if (!item) throw new Error(\`Missing content term: \${slug}\`);\n  return item;\n}\n\n` +
  `export function buildWhatsAppPlusKenyaArticle({ authors, topics, brands, regions }: BuildWhatsAppPlusKenyaArgs): Article {\n` +
  `  return {\n    ...articleData,\n    author: bySlug(authors, "tecmambo-team"),\n    tags: [\n      bySlug(brands, "whatsapp"),\n      bySlug(brands, "meta"),\n      bySlug(topics, "apps"),\n      bySlug(topics, "social-media"),\n      bySlug(topics, "privacy")\n    ],\n    regions: [bySlug(regions, "kenya")]\n  };\n}\n`;

if (generated.includes("\u2014")) throw new Error("Generated article contains a Unicode em dash.");
if (generated.includes("\u2013")) throw new Error("Generated article contains a Unicode en dash.");
if (generated.includes("**")) throw new Error("Generated article contains unresolved emphasis markers.");
writeFileSync(outputPath, generated);
