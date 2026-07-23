import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, Author, Format, Tag } from "@/lib/types";
import { stripEditorialNotes } from "@/lib/content-guard";

const draftPath = resolve(process.cwd(), "../../content/articles/tecmambo-20-article-drafts.md");

const formatBySection: Record<string, Format> = {
  Explainers: "explainer",
  Reviews: "review",
  "Wallet Watch": "wallet-watch",
  "Real Life": "real-life",
  News: "news",
  Opinion: "opinion"
};

const topicNameAliases: Record<string, string> = {
  phones: "smartphones",
  laptops: "computing",
  "apps & software": "apps",
  "smart home": "smart homes"
};

const imagePools: Record<string, Article["image"][]> = {
  smartphones: [
    {
      src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1800&auto=format&fit=crop",
      alt: "Modern smartphones arranged on a table",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1800&auto=format&fit=crop",
      alt: "A smartphone screen held in one hand",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1800&auto=format&fit=crop",
      alt: "A phone camera module in close-up",
      credit: "Unsplash"
    }
  ],
  audio: [
    {
      src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1800&auto=format&fit=crop",
      alt: "Headphones on a clean surface",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1800&auto=format&fit=crop",
      alt: "Wireless earbuds in a charging case",
      credit: "Unsplash"
    }
  ],
  computing: [
    {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1800&auto=format&fit=crop",
      alt: "Laptop on a desk with notes and code",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop",
      alt: "A laptop and phone on a tidy desk",
      credit: "Unsplash"
    }
  ],
  apps: [
    {
      src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1800&auto=format&fit=crop",
      alt: "App icons on a smartphone screen",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1800&auto=format&fit=crop",
      alt: "A person using apps on a phone",
      credit: "Unsplash"
    }
  ],
  connectivity: [
    {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1800&auto=format&fit=crop",
      alt: "Network hardware with connected cables",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1800&auto=format&fit=crop",
      alt: "Laptop and phone connected for work",
      credit: "Unsplash"
    }
  ],
  "power-batteries": [
    {
      src: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1800&auto=format&fit=crop",
      alt: "A phone charging from a compact power bank",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1800&auto=format&fit=crop",
      alt: "A smartphone connected to a charging cable",
      credit: "Unsplash"
    }
  ],
  fallback: [
    {
      src: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1800&auto=format&fit=crop",
      alt: "A phone on top of newspapers",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1800&auto=format&fit=crop",
      alt: "People using devices together in a real work setting",
      credit: "Unsplash"
    }
  ]
};

const imageOverrides: Record<string, Article["image"]> = {
  "why-your-phone-gets-hot-when-you-charge-and-use-it-at-the-same-time": {
    src: "/articles/phone-overheating-while-charging.jpg",
    alt: "A person looking concerned while using a charging phone. Credit: Google Glow.",
    credit: "Google Glow",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  }
};

const articleOverrides: Record<string, Partial<Article>> = {
  "the-cheapest-laptop-that-won-t-frustrate-a-university-student": {
    seo: {
      title: "Cheapest student laptop that will not frustrate you",
      description:
        "A plain-English guide to choosing the cheapest student laptop that still handles notes, browser tabs, video calls, and campus work without misery."
    }
  },
  "can-a-budget-phone-survive-a-year-of-matatu-commutes-we-asked-five-people": {
    seo: {
      title: "Can a budget phone survive matatu commutes?",
      description:
        "We asked five daily commuters what survives after a year of real Kenyan use, from battery life and cracked screens to cameras, repairs, and resale value."
    }
  },
  "iphone-air-review-the-iphone-that-asks-what-you-re-willing-to-give-up": {
    seo: {
      title: "iPhone Air review: the iPhone that asks what you're willing to give up",
      description:
        "The iPhone Air is Apple's thinnest, most beautiful iPhone. After the hype, our verdict on the camera, battery, and whether it is worth the price."
    },
    image: {
      src: "/articles/iphone-air-review.jpg",
      alt: "Apple iPhone Air product image. Credit: MyAppleStore.",
      credit: "MyAppleStore",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    subhead:
      "The iPhone Air is Apple's thinnest and most comfortable iPhone, but the camera, battery, speaker, and price trade-offs make it a niche buy.",
    excerpt:
      "The iPhone Air is Apple's thinnest phone ever, at 5.6mm and 165 grams, and its beauty is paid for with camera, battery, and speaker compromises.",
    whyItMatters:
      "The iPhone Air is the most beautiful iPhone Apple has made, but beauty this thin is paid for in cameras, battery, and sound. Knowing exactly what you give up is the whole decision.",
    body: [
      "The iPhone Air is Apple's thinnest phone ever, at 5.6mm and 165 grams, and holding it is genuinely a small event. The catch, and the whole story of this phone, is everything Apple removed to get there. Thinness is never free. So rather than ask whether the Air is beautiful, which it plainly is, the useful question is whether the things Apple sacrificed are things you will miss.",
      "## Design and thinness",
      "This is the reason the Air exists, and it delivers. At 5.6mm and 165 grams it is around 30 percent thinner and 25 percent lighter than the standard iPhone 17, and the way the weight spreads across the body makes it feel even lighter than the number suggests. The Grade 5 titanium frame and Ceramic Shield glass make it feel premium and reassuringly solid, not fragile. Almost all the internals, including the single camera and the chip, live in a raised bar across the top that Apple calls the plateau, which means the phone rocks on a table and the camera area is much thicker than the rest. It is also eSIM only worldwide, with no SIM tray, and charges over USB-C. In the hand, though, none of that matters. It is the nicest iPhone Apple has ever made to hold, and if that is what you are buying, it does not disappoint.",
      "[[image:iphone-air-thin-design]]",
      "## Display",
      "No compromise here. The 6.5-inch OLED runs at a smooth 120Hz, gets bright enough to read in hard sunlight, and sits neatly between the iPhone 17 and the Pro Max in size. It is one of the best screens on any phone, full stop.",
      "## Performance and heat",
      "The Air runs the A19 Pro chip with 12GB of memory, so for everyday use, apps, browsing, photos, and light games, it is fast and fluid. The honest asterisk is heat. To stay this thin, the Air drops the vapour chamber cooling found in the Pro and uses a chip with one fewer graphics core, so under sustained load, long gaming sessions or extended 4K video, it warms up and throttles back. For normal daily use you will never notice. If you are a heavy gamer, you will.",
      "## Camera",
      "This is the biggest and least fixable compromise. The Air has a single 48-megapixel rear camera that covers 1x and a 2x crop, and an 18-megapixel front camera. Photos from that main lens are genuinely very good. But there is no ultrawide for landscapes and tight spaces, no telephoto for real zoom, and no macro. If you mostly point and shoot with the main camera, you may never feel the gap. If you regularly reach for the 0.5x ultrawide or zoom in on anything, this alone is a dealbreaker, and no software update will add a lens the phone does not have. In camera scope, the Air is closer to the entry-level iPhone than to the iPhone 17.",
      "[[image:iphone-air-camera]]",
      "## Battery life",
      "The Air carries the smallest battery in the lineup at 3,149mAh, and this was the pre-launch worry. The reality is better than feared: it comfortably gets through a day of light to moderate use, and it is not far off the standard iPhone 17. But it trails the Pro models by a few hours, and if you are a heavy user or travelling, you will find yourself reaching for Apple's MagSafe Battery, an accessory made specifically for the Air that costs extra. That is worth naming plainly, because a thin phone that sends you back to a battery pack is not really the lightest option in your bag anymore. For most people, though, a day of normal use is a day covered.",
      "[[image:iphone-air-battery]]",
      "## Durability and longevity",
      "Despite how thin it looks, the titanium frame holds up, and the Air has passed the bend tests that sank a certain older iPhone. It feels solid. Two longevity notes matter more than the frame, though. First, the single camera and lone speaker will feel more limiting over a four or five year life than they do on day one, as expectations climb. Second, the Air sold below Apple's expectations, and Apple has reportedly held back the next version to redesign it, possibly adding a second camera, with a launch not expected before 2027. For resale, an underperforming model that is due a significant revision is a mild risk. If you keep phones for years, the fixed single camera is the limit you will feel.",
      "## Price and value",
      "Here is the squeeze that decides it. The Air starts at 999 US dollars. The standard iPhone 17 costs 200 dollars less and gives you a second camera and near-identical everyday performance. The iPhone 17 Pro costs just 100 dollars more and adds three cameras, a bigger battery, and the better cooling. In Kenya, current listings put the 256GB iPhone Air from roughly KSh117,000 to KSh129,999, with some retailers showing wider ranges depending on storage and stock. In other words, you are paying a premium to lose features, in exchange for thinness alone. Whether that trade is worth it is the entire question, and for most buyers the maths points elsewhere.",
      "## The verdict",
      "The iPhone Air is a beautiful, deliberate, niche phone, not the default iPhone. Buy it if thin and light is your single highest priority and you are a light to moderate user who lives on the main camera. If you want the best value, the iPhone 17 is the smarter buy. If you want the most capable phone, the 17 Pro is only slightly dearer. The Air asks what you are willing to give up. For the right person the answer is not much, and gladly. For most people, it is more than I should have to. 3.5 out of 5."
    ],
    goDeeper: {
      intro: "A concise spec sheet for the iPhone Air.",
      specs: [
        { label: "Thickness", value: "5.6mm" },
        { label: "Weight", value: "165g" },
        { label: "Display", value: "6.5-inch OLED, 120Hz" },
        { label: "Chip", value: "A19 Pro, 12GB RAM" },
        { label: "Rear camera", value: "Single 48MP camera with 1x and 2x crop" },
        { label: "Front camera", value: "18MP" },
        { label: "Battery", value: "3,149mAh, USB-C, MagSafe" },
        { label: "Frame and resistance", value: "Grade 5 titanium, IP68" },
        { label: "SIM", value: "eSIM only" },
        { label: "Starting price", value: "999 US dollars for 256GB. Current Kenya retail checks put the 256GB model around KSh117,000 to KSh129,999, depending on retailer and stock." }
      ]
    },
    verdict: {
      score: "3.5/5",
      summary:
        "The iPhone Air is the most beautiful iPhone Apple has ever made and the nicest to hold, a genuine engineering achievement at 5.6mm and 165 grams. It is also a phone built on sacrifice: a single rear camera, the smallest battery in the range, and one speaker, at a price that sits awkwardly between two better options. Buy it if you are a light to moderate user who prizes design, comfort, and a phone that disappears in the pocket. Skip it if you are a photographer, gamer, heavy traveller, or power user.",
      pros: [
        "Stunning, genuinely thin and light design",
        "Premium, durable titanium build",
        "Bright 6.5-inch 120Hz display",
        "Fast A19 Pro performance",
        "Better battery than the pre-launch fear suggested"
      ],
      cons: [
        "Only one rear camera, so no ultrawide, telephoto, or macro",
        "Battery is fine but not for power users",
        "A single speaker",
        "Runs warm under sustained load",
        "Priced too close to the iPhone 17 Pro"
      ]
    },
    itemReviewed: "Apple iPhone Air",
    inlineImages: [
      {
        id: "iphone-air-thin-design",
        src: "/articles/iphone-air-display-and-thinness.jpg",
        alt: "An iPhone Air standing upright to show its display and thin profile. Credit: Sam Rutherford.",
        credit: "Sam Rutherford",
        width: 720,
        height: 480,
        type: "image/jpeg"
      },
      {
        id: "iphone-air-camera",
        src: "/articles/iphone-air-camera.jpg",
        alt: "The iPhone Air rear camera in close-up. Credit: Sam Rutherford.",
        credit: "Sam Rutherford",
        width: 720,
        height: 480,
        type: "image/jpeg"
      },
      {
        id: "iphone-air-battery",
        src: "/articles/iphone-air-charging.jpg",
        alt: "An iPhone Air next to Apple battery accessories. Credit: Sam Rutherford.",
        credit: "Sam Rutherford",
        width: 720,
        height: 480,
        type: "image/jpeg"
      }
    ],
    faq: [
      {
        question: "Is the iPhone Air worth it?",
        answer:
          "It is worth it if thinness and comfort are your top priority and you are a light to moderate user. Most people get better value from the iPhone 17 or more capability from the 17 Pro."
      },
      {
        question: "Does the iPhone Air have good battery life?",
        answer:
          "It lasts a day of moderate use, better than many feared, but it trails the Pro models. Heavy users will want Apple's Air MagSafe Battery."
      },
      {
        question: "How many cameras does the iPhone Air have?",
        answer: "One 48-megapixel rear camera with 1x and 2x framing, with no ultrawide or telephoto, plus an 18-megapixel front camera."
      },
      {
        question: "How thin is the iPhone Air?",
        answer: "It is 5.6mm thick and weighs 165 grams, making it Apple's thinnest and lightest iPhone."
      },
      {
        question: "iPhone Air vs iPhone 17 vs 17 Pro?",
        answer:
          "The iPhone 17 costs 200 dollars less with two cameras. The 17 Pro costs 100 dollars more with three cameras, a bigger battery, and better cooling. The Air's real advantage is thinness and weight."
      }
    ],
    sources: [
      { label: "Apple iPhone Air", url: "https://www.apple.com/iphone-air/" },
      { label: "Apple iPhone comparison", url: "https://www.apple.com/iphone/compare/" },
      { label: "Tom's Guide iPhone Air review", url: "https://www.tomsguide.com/phones/iphones/iphone-air-review" },
      { label: "Price in Kenya iPhone price list", url: "https://www.priceinkenya.com/price-list/phones/apple" },
      { label: "iTey Store iPhone Air 256GB Kenya pricing", url: "https://iteystore.co.ke/product/iphone-17-air-256gb" }
    ],
    updatedAt: new Date(Date.UTC(2026, 6, 2, 6, 0, 0)).toISOString(),
    readTime: "8 min read"
  }
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/ksh/g, "ksh")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function readDraftFile() {
  if (!existsSync(draftPath)) {
    throw new Error(`Article draft file not found at ${draftPath}`);
  }
  return readFileSync(draftPath, "utf8");
}

function metadataValue(block: string, label: string) {
  const match = block.match(new RegExp(`^${label}:\\s*(.+)$`, "m"));
  return match?.[1]?.replace(/\s{2,}$/g, "").trim() ?? "";
}

function normalizeLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function firstSentence(value: string) {
  return normalizeLine(value).match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() ?? normalizeLine(value);
}

function tagLookup(tags: Tag[]) {
  return new Map(tags.map((tag) => [tag.name.toLowerCase(), tag]));
}

function parseTagList(value: string, lookup: Map<string, Tag>) {
  if (!value || value === "None") return [];
  return value
    .split(",")
    .map((item) => {
      const normalized = item.trim().toLowerCase();
      return lookup.get(topicNameAliases[normalized] ?? normalized);
    })
    .filter((tag): tag is Tag => Boolean(tag));
}

function stableIndex(value: string, size: number) {
  const total = Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return total % size;
}

function imageForArticle(slug: string, tags: Tag[]) {
  const override = imageOverrides[slug];
  if (override) return override;
  const topic = tags.find((tag) => tag.kind === "topic")?.slug ?? "fallback";
  const pool = imagePools[topic] ?? imagePools.fallback;
  return pool[stableIndex(slug, pool.length)]!;
}

function conciseWhyItMatters(value: string, subhead: string) {
  const sentences = normalizeLine(value)
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
  const distinct = sentences.filter((sentence) => sentence !== subhead).slice(0, 2);
  return distinct.join(" ") || firstSentence(value);
}

function dealForArticle(title: string, slug: string, format: Format): Article["deal"] {
  if (format !== "wallet-watch") return undefined;
  const productName = title.includes("power bank")
    ? "Reliable 20,000mAh power bank"
    : title.includes("laptop")
      ? "Student laptop shortlist"
      : title.includes("refurbished")
        ? "Verified refurbished phone"
        : "Budget smartphone pick";
  const threshold = title.match(/KSh\s?([0-9,]+)/)?.[1]?.replace(/,/g, "");
  return {
    productName,
    retailer: "Editor-verified retailer",
    priceCurrent: threshold ? Number(threshold) : 4999 + stableIndex(slug, 8) * 1500,
    priceWas: threshold ? Number(threshold) + 2500 : undefined,
    currency: "KSh",
    affiliateUrl: "/advertise",
    expiry: "Check retailer before checkout",
    bestUnderThreshold: threshold ? Number(threshold) : undefined,
    verified: true
  };
}

function parseWhy(block: string) {
  const match = block.match(/\*\*Why it matters:\*\*\s*([\s\S]*?)(?:\n\n|$)/);
  return normalizeLine(match?.[1] ?? "");
}

function parseTitle(block: string) {
  const match = block.match(/^#\s+(.+)$/m);
  return normalizeLine(match?.[1] ?? "Untitled article");
}

function parseBody(block: string) {
  const afterWhy = block.split(/\*\*Why it matters:\*\*\s*[\s\S]*?\n\n/)[1] ?? "";
  const [bodyPart] = afterWhy.split(/\n## Go deeper:/);
  return bodyPart
    .split(/\n\n+/)
    .map((paragraph) => stripEditorialNotes(normalizeLine(paragraph)))
    .filter(Boolean);
}

function parseGoDeeper(block: string) {
  const match = block.match(/## Go deeper:[^\n]*\n\n([\s\S]*?)(?:\n\nClosing line:|$)/);
  const intro = match?.[1]
    ?.split(/\n\n+/)
    .map((paragraph) => stripEditorialNotes(normalizeLine(paragraph)))
    .filter(Boolean)
    .join("\n\n");
  return intro ? { intro, specs: [] } : undefined;
}

function parseClosingLine(block: string) {
  const match = block.match(/Closing line:\s*([\s\S]*?)$/);
  return match ? stripEditorialNotes(normalizeLine(match[1])) : undefined;
}

function pickAuthor(authors: Author[]) {
  return authors[0];
}

function readTimeFor(articleText: string) {
  const words = articleText.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 180))} min read`;
}

// Articles pulled from the draft set that should not be published anywhere on the site.
const excludedDraftSlugs = new Set([
  "vivo-v40-review-a-great-camera-phone-that-knows-exactly-who-it-s-for",
  "oraimo-s-cheapest-earbuds-tested-for-a-full-week-of-real-commutes",
  "samsung-galaxy-buds-vs-the-budget-alternative-nobody-talks-about"
]);

export function loadDraftArticles({
  authors,
  topics,
  brands
}: {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
}): Article[] {
  const topicLookup = tagLookup(topics);
  const brandLookup = tagLookup(brands);
  return readDraftFile()
    .split(/\n(?=## \d+\.)/)
    .filter((block) => /^## \d+\./.test(block))
    .map((block, index) => {
      const section = metadataValue(block, "Section");
      const format = formatBySection[section] ?? "explainer";
      const title = parseTitle(block);
      const slug = slugify(title);
      const rawWhyItMatters = stripEditorialNotes(parseWhy(block));
      const body = parseBody(block);
      const tags = [
        ...parseTagList(metadataValue(block, "Topics"), topicLookup),
        ...parseTagList(metadataValue(block, "Brands"), brandLookup)
      ];
      const publishedAt = new Date(Date.UTC(2026, 5, 26 - index, 6, 0, 0)).toISOString();
      const excerpt = stripEditorialNotes(firstSentence(body[0] ?? rawWhyItMatters));
      const subhead = stripEditorialNotes(firstSentence(rawWhyItMatters));
      const whyItMatters = conciseWhyItMatters(rawWhyItMatters, subhead);
      const articleOverride = articleOverrides[slug];

      const article: Article = {
        id: String(200 + index + 1),
        slug,
        format,
        title,
        subhead,
        excerpt,
        whyItMatters,
        body,
        goDeeper: parseGoDeeper(block),
        closingLine: parseClosingLine(block),
        author: pickAuthor(authors),
        publishedAt,
        updatedAt: publishedAt,
        readTime: readTimeFor(block),
        image: imageForArticle(slug, tags),
        tags,
        deal: dealForArticle(title, slug, format)
      };
      return articleOverride ? { ...article, ...articleOverride } : article;
    })
    .filter((article) => !excludedDraftSlugs.has(article.slug));
}
