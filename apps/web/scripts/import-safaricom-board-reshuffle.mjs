import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Pass the Safaricom editorial package path.");

const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "lib/safaricom-board-reshuffle-2026.ts");
const source = readFileSync(sourcePath, "utf8");
const title = "Safaricom's new board appointments show what Vodacom's 55% control looks like in practice";
const storyStart = source.indexOf(`# ${title}`);
const faqStart = source.indexOf("## Frequently asked questions", storyStart);

if (storyStart < 0 || faqStart < 0) throw new Error("Could not locate the article body.");

function markdownBlocks(markdown) {
  return markdown
    .replace(/<!--[^]*?-->/g, "")
    .replace(/^# .+\n+/, "")
    .trim()
    .split(/\n{2,}/)
    .flatMap((block) => {
      const trimmed = block.trim();
      if (!trimmed) return [];
      if (/^#{2,3} /.test(trimmed)) return [trimmed];
      if (/^- /m.test(trimmed)) return trimmed.split("\n").map((line) => line.trim()).filter(Boolean);
      return [trimmed.replace(/\n/g, " ")];
    });
}

const body = markdownBlocks(source.slice(storyStart, faqStart));

function insertAfter(needle, value) {
  const index = body.findIndex((block) => block === needle);
  if (index < 0) throw new Error(`Missing insertion point: ${needle}`);
  body.splice(index + 1, 0, value);
}

insertAfter(
  "Vodacom has also made financial services one of the central pillars of its broader African growth strategy.",
  "[[media:mariam-cassim-vodacom-fintech-profile]]"
);
insertAfter(
  "Mbungela has spent much of his career dealing with exactly those questions.",
  "[[media:matimba-mbungela-vodacom-hr-profile]]"
);

const takeIndex = body.indexOf("## The tecMAMBO take");
if (takeIndex < 0) throw new Error("Missing tecMAMBO Take section.");
body.splice(takeIndex, 0, "[[media:safaricom-ownership-governance-2026]]");

insertAfter(
  "The appointments come weeks after Vodacom completed a transaction that lifted its effective Safaricom shareholding to approximately **55%**, giving the South African group majority ownership of a company that sits at the centre of Kenya's communications and mobile-money economy.",
  "For the transaction mechanics and immediate public-interest questions, read [our earlier explanation of Vodacom's majority control](/business/vodacom-safaricom-majority-control)."
);
insertAfter(
  "The appointments cannot be separated from Safaricom's July 31 AGM.",
  "Our earlier [Safaricom board and CEO governance analysis](/opinion/vodacom-safaricom-board-ceo-control) explains how those amended articles turn ownership into formal influence."
);
insertAfter(
  "M-Pesa is no longer simply a money-transfer product.",
  "The regional opportunity is already visible in products such as [M-Pesa Ethiopia's cardless ATM withdrawals](/opinion/mpesa-ethiopia-bank-of-abyssinia-cardless-atm), where partnerships extend a mobile wallet into existing banking infrastructure."
);
insertAfter(
  "Public investors continued to hold the remaining 25% through the Nairobi Securities Exchange.",
  "Those investors are also weighing capital returns against reinvestment after [Safaricom's KSh 80.13 billion dividend](/opinion/safaricom-80-billion-dividend-what-it-means)."
);

const reviewedAt = "2026-08-14T15:41:39+03:00";
const articleData = {
  id: "safaricom-board-reshuffle-vodacom-2026",
  slug: "safaricom-board-reshuffle-vodacom-mariam-cassim-matimba-mbungela",
  format: "business",
  contentFormat: "analysis",
  title,
  seo: {
    title: "Safaricom Board Reshuffle: Vodacom Adds Cassim and Mbungela",
    description: "Safaricom has appointed Vodacom executives Mariam Cassim and Matimba Mbungela as non-executive directors after Vodacom raised its stake to about 55%."
  },
  subhead: "Safaricom's appointment of two senior Vodacom executives is an early sign of how majority ownership is translating into governance, fintech oversight and organisational influence.",
  excerpt: "Safaricom's appointment of two senior Vodacom executives is more than a routine board refresh. It shows how the telco's new majority ownership is beginning to shape governance.",
  whyItMatters: "The Safaricom board reshuffle shows how Vodacom's approximately 55% holding is moving from transaction documents into board-level influence over fintech strategy, talent and future leadership.",
  body,
  publishedAt: reviewedAt,
  updatedAt: reviewedAt,
  readTime: "12 min read",
  image: {
    src: "/articles/safaricom-board/Vodacom_Mariam_Cassim_And_Matiba_Mbugela_Safaricom_Non_Executive_Directors_tecMAMBO.jpg",
    alt: "Matimba Mbungela and Mariam Cassim pictured as Safaricom non-executive directors with Safaricom and Vodacom branding.",
    credit: "",
    creditOmitted: true,
    width: 1040,
    height: 520,
    type: "image/jpeg"
  },
  mediaSlots: [
    {
      id: "mariam-cassim-vodacom-fintech-profile",
      type: "image",
      status: "ready",
      placement: "After the Mariam Cassim section introduction",
      src: "/articles/safaricom-board/Vodacom_Mariam_Cassim_Safaricom_Non_Executive_Director_tecMAMBO.jpg",
      alt: "Mariam Cassim executive profile card showing her Vodacom fintech and partnerships leadership credentials.",
      caption: "Mariam Cassim leads Vodacom's fintech strategy and joins Safaricom as a non-executive director, subject to regulatory approvals.",
      credit: "",
      licensingNote: "Image supplied by the publisher for use with this article.",
      aspectRatio: "2:1",
      width: 1040,
      height: 520
    },
    {
      id: "matimba-mbungela-vodacom-hr-profile",
      type: "image",
      status: "ready",
      placement: "After the Matimba Mbungela section introduction",
      src: "/articles/safaricom-board/Vodacom_Matiba_Mbugela_Safaricom_Non_Executive_Director_tecMAMBO.jpg",
      alt: "Matimba Mbungela executive profile card showing his Vodacom human resources leadership credentials.",
      caption: "Matimba Mbungela brings Vodacom and Vodafone talent and organisational-change experience to Safaricom's board, subject to regulatory approvals.",
      credit: "",
      licensingNote: "Image supplied by the publisher for use with this article.",
      aspectRatio: "2:1",
      width: 1040,
      height: 520
    },
    {
      id: "safaricom-ownership-governance-2026",
      type: "infographic",
      status: "ready",
      placement: "Before the final tecMAMBO Take",
      src: "/articles/safaricom-board/Safaricom_Ownership_and_Governance_tecMAMBO.jpg",
      alt: "Safaricom ownership graphic showing approximately 55 percent Vodacom, 20 percent Government of Kenya and 25 percent public investors.",
      caption: "Safaricom's revised governance framework links board nomination rights directly to major shareholdings.",
      credit: "",
      licensingNote: "Image supplied by the publisher for use with this article.",
      aspectRatio: "2:1",
      width: 1040,
      height: 520
    }
  ],
  faq: [
    {
      question: "Who are Safaricom's new board members?",
      answer: "Safaricom appointed Mariam Cassim and Matimba Mbungela as non-executive directors effective August 13, 2026, subject to regulatory approvals."
    },
    {
      question: "Who is Mariam Cassim?",
      answer: "Cassim is Chief Executive Officer: Vodacom Fintech Group & Group Partnerships and a member of the Vodacom Group Executive Committee."
    },
    {
      question: "Who is Matimba Mbungela?",
      answer: "Mbungela is Vodacom Group's Chief Officer: Human Resources and has worked across Vodacom and Vodafone in senior talent and organisational-change roles."
    },
    {
      question: "Which Safaricom directors left the board?",
      answer: "James Ludlow and Dr. John Kipngetich Mosonik resigned as non-executive directors effective August 13, 2026."
    },
    {
      question: "How much of Safaricom does Vodacom own?",
      answer: "Vodacom says its effective shareholding increased to approximately 55% after completing an additional 20% effective acquisition on June 30, 2026."
    },
    {
      question: "How much Safaricom does the Government of Kenya own?",
      answer: "The Government of Kenya retained a 20% stake after selling 15% as part of the June transaction."
    },
    {
      question: "How many Safaricom directors can Vodafone Kenya nominate?",
      answer: "The approved formula provides one director appointment right for every complete 10% shareholding. At approximately 55%, that implies five rights for Vodafone Kenya."
    },
    {
      question: "Does Vodacom choose Safaricom's CEO?",
      answer: "Safaricom's board formally appoints the CEO. While Vodafone Kenya holds more than 50%, the approved framework requires the board to choose from nominees submitted by Vodafone Kenya."
    }
  ],
  sources: [
    {
      label: "Vodacom Group: completion of the additional Safaricom acquisition",
      url: "https://www.vodacom.com/news-article.php?articleID=16911"
    },
    {
      label: "Vodacom Group: executive committee",
      url: "https://www.vodacom.com/executive-committee.php"
    },
    {
      label: "Safaricom: AGM and general notices",
      url: "https://www.safaricom.co.ke/investor-relations-landing/meetings"
    },
    {
      label: "The Kenyan Wall Street: 2026 AGM governance approvals",
      url: "https://kenyanwallstreet.com/safaricom-fy2026-agm"
    },
    {
      label: "People Daily: Safaricom board appointments",
      url: "https://peopledaily.digital/business/safaricom-appoints-mariam-cassim-and-matimba-mbungela-as-directors"
    }
  ],
  itemList: [
    "Mariam Cassim and Matimba Mbungela were appointed effective August 13, 2026, subject to regulatory approvals.",
    "James Ludlow and Dr. John Kipngetich Mosonik resigned effective August 13, 2026.",
    "Vodacom's approximately 55% holding comprises the earlier interest plus 15% from the Government of Kenya and an effective further 5% from Vodafone Group.",
    "The Government of Kenya retained 20%, while public investors hold 25%.",
    "Vodafone Kenya's approved board formula provides one appointment right per complete 10% holding.",
    "Safaricom's board formally appoints the CEO from Vodafone Kenya nominees while Vodafone Kenya remains above 50%."
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
  sourceDisclosure: "Appointment details are based on Safaricom's board notice as reported by People Daily. Ownership and executive roles were checked against Vodacom primary sources. AGM approval was checked against post-vote reporting from The Kenyan Wall Street.",
  legalReviewedAt: reviewedAt
};

const generated = `import type { Article, Author, RegionTerm, Tag } from "@/lib/types";\n\n` +
  `type BuildSafaricomBoardReshuffleArgs = { authors: Author[]; topics: Tag[]; brands: Tag[]; regions: RegionTerm[] };\n\n` +
  `const articleData: Omit<Article, "author" | "tags" | "regions"> = ${JSON.stringify(articleData, null, 2)};\n\n` +
  `function bySlug<T extends { slug: string }>(items: T[], slug: string) {\n  const item = items.find((entry) => entry.slug === slug);\n  if (!item) throw new Error(\`Missing content term: \${slug}\`);\n  return item;\n}\n\n` +
  `export function buildSafaricomBoardReshuffleArticle({ authors, topics, brands, regions }: BuildSafaricomBoardReshuffleArgs): Article {\n` +
  `  return {\n    ...articleData,\n    author: bySlug(authors, "tecmambo-team"),\n    tags: [\n      bySlug(brands, "safaricom"),\n      bySlug(brands, "vodacom"),\n      bySlug(brands, "m-pesa"),\n      bySlug(topics, "business"),\n      bySlug(topics, "fintech"),\n      bySlug(topics, "corporate-governance"),\n      bySlug(topics, "telecoms")\n    ],\n    regions: [bySlug(regions, "kenya")]\n  };\n}\n`;

if (generated.includes("\u2014")) throw new Error("Generated article contains a Unicode em dash.");
writeFileSync(outputPath, generated);
