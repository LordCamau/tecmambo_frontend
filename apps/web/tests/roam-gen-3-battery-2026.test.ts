import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { articleWordCount } from "../lib/article-quality";
import { articleQualityIssues, isArticleIndexable, isContentPubliclyEligible } from "../lib/content-quality";
import { articlePath } from "../lib/formats";
import { getRegion } from "../lib/regions";
import { buildRoamGen3BatteryArticle } from "../lib/roam-gen-3-battery-2026";
import { articles, authors, brands, topics } from "../lib/sample-data";
import { articleJsonLd } from "../lib/seo";

const kenya = getRegion("kenya");
if (!kenya) throw new Error("Missing Kenya region.");

const article = buildRoamGen3BatteryArticle({ authors, topics, brands, regions: [kenya] });
const canonicalPath = "/real-life/roam-gen-3-battery-working-boda-boda-riders";
const sourcePath = resolve(process.cwd(), "../../content/articles/roam-gen-3-battery-working-boda-boda-riders.md");
const sourceBlocks = readFileSync(sourcePath, "utf8")
  .replace(/\r\n/g, "\n")
  .trim()
  .split(/\n{2,}/)
  .map((block) => block.trim())
  .filter(Boolean);
const publicCopy = [
  article.title,
  article.seo?.title ?? "",
  article.seo?.description ?? "",
  article.subhead,
  article.excerpt,
  article.whyItMatters,
  ...article.body,
  ...(article.inlineImages?.flatMap((image) => [image.alt, image.credit]) ?? [])
].join("\n");

describe("Roam Gen-3 battery feature", () => {
  it("publishes the exact requested title, metadata and canonical path", () => {
    expect(article.title).toBe("Beyond Range: How Roam Engineered Its Gen-3 Battery Around the Working Boda-Boda Rider");
    expect(article.seo).toEqual({
      title: "Roam Gen-3 Battery: How It Was Engineered for Boda-Boda Riders",
      description: "Inside Roam’s Gen-3 battery: how fast charging, thermal management, safety, software and reliability were engineered around Kenya’s working boda-boda riders."
    });
    expect(articlePath(article.format, article.slug)).toBe(canonicalPath);
    expect(article.author.name).toBe("Tim Humphreys");
    expect(article.contentFormat).toBe("interview");
  });

  it("preserves every supplied article block while adding only source, link and media markup", () => {
    expect(sourceBlocks[0]).toBe(`# ${article.title}`);
    expect(sourceBlocks[1]).toBe(`**${article.subhead}**`);
    const preservedBody = article.body
      .filter((block) => !block.startsWith("tecMAMBO spoke with Ivy Magara"))
      .filter((block) => !/^\[\[image:[a-z0-9-]+\]\]$/.test(block))
      .map((block) => block.replace(/\[([^\]]+)\]\(\/[^)]+\)/g, "$1"));
    expect(preservedBody).toEqual(sourceBlocks.slice(2));
    expect(articleWordCount(article)).toBeGreaterThan(3600);
  });

  it("uses Ivy Magara as the 2:1 lead image and credits every authorised Roam image", () => {
    expect(article.image).toMatchObject({
      src: "/articles/roam-gen-3-battery/Roams_Battery_Engineer_Magara_Gen_3_Battery.png",
      credit: "Roam",
      width: 1774,
      height: 887
    });
    expect(article.inlineImages).toHaveLength(4);
    [article.image, ...(article.inlineImages ?? [])].forEach((image) => {
      expect(image.width! / image.height!).toBe(2);
      expect(image.credit).toBe("Roam");
      expect(image.alt.trim().length).toBeGreaterThan(30);
    });
  });

  it("keeps the article editorial, source-transparent and free of forbidden dashes", () => {
    expect(publicCopy).not.toContain("\u2014");
    expect(publicCopy).not.toMatch(/\bROAM\b/);
    expect(publicCopy).toContain("tecMAMBO spoke with Ivy Magara");
    expect(article.sponsored).toBe(false);
    expect(article.originalValueType).toBe("original_reporting");
    expect(article.sources?.every((source) => source.url.startsWith("https://www.roam-electric.com/"))).toBe(true);
  });

  it("uses real internal links and passes the publication gate", () => {
    expect(publicCopy.match(/\]\(\//g)).toHaveLength(3);
    expect(publicCopy).toContain("/opinion/why-electric-motorbikes-matter-more-than-flashy-ev-launches");
    expect(publicCopy).toContain("/business/evs-cheaper-than-petrol-africa-financing");
    expect(publicCopy).toContain("/explainers/the-real-test-for-ev-charging-isnt-speed-its-location");
    expect(articleQualityIssues(article)).toEqual([]);
    expect(isContentPubliclyEligible(article)).toBe(true);
    expect(isArticleIndexable(article)).toBe(true);
    expect(articles.some((item) => item.slug === article.slug)).toBe(true);
  });

  it("emits one canonical Article schema object", () => {
    const jsonLd = articleJsonLd(article) as unknown as Record<string, unknown>;
    expect(jsonLd["@type"]).toBe("Article");
    expect(jsonLd.url).toBe(`https://tecmambo.com${canonicalPath}`);
    expect(jsonLd.headline).toBe(article.title);
    expect(jsonLd.datePublished).toBe(article.publishedAt);
    expect(jsonLd.dateModified).toBe(article.updatedAt);
  });
});
