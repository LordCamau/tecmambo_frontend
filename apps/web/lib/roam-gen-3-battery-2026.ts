import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type BuildRoamGen3BatteryArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
  regions: RegionTerm[];
};

const sourcePath = resolve(process.cwd(), "../../content/articles/roam-gen-3-battery-working-boda-boda-riders.md");
const expectedTitle = "Beyond Range: How Roam Engineered Its Gen-3 Battery Around the Working Boda-Boda Rider";

function bySlug<T extends { slug: string }>(items: T[], slug: string): T {
  const item = items.find((candidate) => candidate.slug === slug);
  if (!item) throw new Error(`Missing Roam article dependency: ${slug}`);
  return item;
}

function loadArticleBody() {
  const blocks = readFileSync(sourcePath, "utf8")
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  const sourceTitle = blocks.shift()?.replace(/^#\s+/, "") ?? "";
  const sourceSubhead = blocks.shift()?.replace(/^\*\*/, "").replace(/\*\*$/, "") ?? "";
  if (sourceTitle !== expectedTitle) throw new Error("The Roam article source title changed unexpectedly.");
  if (!sourceSubhead) throw new Error("The Roam article source is missing its subhead.");

  const body = [
    "tecMAMBO spoke with Ivy Magara, the battery engineer who led the development of Roam's Gen-3 battery from conception through deployment.",
    ...blocks
  ];

  function linkFirst(phrase: string, href: string) {
    const index = body.findIndex((block) => block.includes(phrase));
    if (index < 0) throw new Error(`Missing internal-link phrase in Roam article: ${phrase}`);
    body[index] = body[index].replace(phrase, `[${phrase}](${href})`);
  }

  function insertBefore(heading: string, mediaId: string) {
    const index = body.indexOf(heading);
    if (index < 0) throw new Error(`Missing media placement heading in Roam article: ${heading}`);
    body.splice(index, 0, `[[image:${mediaId}]]`);
  }

  linkFirst("commercial boda-boda rider", "/opinion/why-electric-motorbikes-matter-more-than-flashy-ev-launches");
  linkFirst("highly price-sensitive market", "/business/evs-cheaper-than-petrol-africa-financing");
  linkFirst("charging infrastructure", "/explainers/the-real-test-for-ev-charging-isnt-speed-its-location");

  insertBefore("## Safety beat capacity", "roam-gen-3-battery-carried-by-rider");
  insertBefore("## Why temperature may matter more than rough roads", "roam-gen-3-battery-close-up");
  insertBefore("## For a boda-boda rider, downtime has a price", "roam-gen-3-battery-home-charger");
  insertBefore("## The battery may be built for Kenya before it is built in Kenya", "roam-air-gen-3-motorcycle");

  return { body, subhead: sourceSubhead };
}

export function buildRoamGen3BatteryArticle({ authors, topics, brands, regions }: BuildRoamGen3BatteryArgs): Article {
  const { body, subhead } = loadArticleBody();

  return {
    id: "roam-gen-3-battery-working-boda-boda-riders-2026",
    slug: "roam-gen-3-battery-working-boda-boda-riders",
    format: "real-life",
    contentFormat: "interview",
    title: expectedTitle,
    seo: {
      title: "Roam Gen-3 Battery: How It Was Engineered for Boda-Boda Riders",
      description: "Inside Roam’s Gen-3 battery: how fast charging, thermal management, safety, software and reliability were engineered around Kenya’s working boda-boda riders."
    },
    subhead,
    excerpt: subhead,
    whyItMatters: "For a commercial boda-boda rider, a motorcycle is an income-generating asset. Roam's Gen-3 battery shows why reliability, charging uptime and long-term availability can matter more than winning the range race.",
    body,
    author: bySlug(authors, "tim-humphreys"),
    publishedAt: "2026-09-04T16:24:58+03:00",
    updatedAt: "2026-09-04T16:24:58+03:00",
    readTime: "17 min read",
    image: {
      src: "/articles/roam-gen-3-battery/Roams_Battery_Engineer_Magara_Gen_3_Battery.png",
      alt: "Roam battery engineer Ivy Magara seated beside the Gen-3 battery she led from conception to deployment in Kenya",
      credit: "Roam",
      width: 1774,
      height: 887,
      type: "image/png"
    },
    inlineImages: [
      {
        id: "roam-gen-3-battery-carried-by-rider",
        src: "/articles/roam-gen-3-battery/Roam_Gen_3_Battery_Carried_By_Boda_Boda_Rider_tecMAMBO.jpg",
        alt: "Boda-boda rider carrying a Roam Gen-3 battery up an apartment stairwell",
        credit: "Roam",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      {
        id: "roam-gen-3-battery-close-up",
        src: "/articles/roam-gen-3-battery/Roam_Gen_3_Battery_tecMAMBO.jpg",
        alt: "Roam Gen-3 battery and portable charger against an orange studio background",
        credit: "Roam",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      {
        id: "roam-gen-3-battery-home-charger",
        src: "/articles/roam-gen-3-battery/Roam_Gen_3_Battery_Home_Charger_tecMAMBO.jpg",
        alt: "Roam Gen-3 battery connected to its portable home charger and a wall socket",
        credit: "Roam",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      {
        id: "roam-air-gen-3-motorcycle",
        src: "/articles/roam-gen-3-battery/Roam_Air_Bike_Fitted_With_Gen_3_Battery_tecMAMBO.jpg",
        alt: "Orange Roam Air electric motorcycle fitted with a Gen-3 battery beside a Roam fast charger",
        credit: "Roam",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      }
    ],
    tags: [
      bySlug(brands, "roam"),
      bySlug(topics, "evs-mobility"),
      bySlug(topics, "power-batteries"),
      bySlug(topics, "charging"),
      bySlug(topics, "battery-swap"),
      bySlug(topics, "ev-infrastructure")
    ],
    regions,
    sources: [
      {
        label: "Roam: Gen-3 fast-charging battery launch",
        url: "https://www.roam-electric.com/africas-first-fast-charging-battery-adding-more-than-1-km-per-minute-with-a-100-000-km-guarantee"
      },
      {
        label: "Roam: Putting the Air Gen-3 battery to the test",
        url: "https://www.roam-electric.com/putting-gen-3-to-the-test"
      },
      {
        label: "Roam: Charging options",
        url: "https://www.roam-electric.com/charging"
      }
    ],
    sourceDisclosure: "This feature is based on tecMAMBO's interview with Ivy Magara and supporting technical information published by Roam.",
    sponsored: false,
    googleAdsEligible: true,
    publicationStatus: "publish",
    editorialStatus: "published",
    indexingStatus: "index",
    workflowVersion: "gated",
    sourceChecked: true,
    humanEditorApproved: true,
    editor: "Dev Camau",
    reviewedAt: "2026-09-04T16:24:58+03:00",
    originalValueType: "original_reporting",
    hasOriginalPhotography: true
  };
}
