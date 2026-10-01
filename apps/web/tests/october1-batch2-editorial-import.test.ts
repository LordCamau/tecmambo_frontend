import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { articlePublicText, isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { editorialOctober1ImportReport } from "@/lib/editorial-bundle-october-1-2026";
import { articles, editorialOctober1Articles } from "@/lib/sample-data";

const requestedImages = {
  "rhea-soil-health-100000-obudu-capital-east-africa-expansion": [
    "/articles/october1/Kenyan_AgriTech_Startup_Rhea_Backed.png",
    "Rhea Soil Health Management"
  ],
  "gemini-4-argon-google-frontier-model-coding-cybersecurity": [
    "/articles/october1/Google_Gemini_4_Argon.png",
    "Google"
  ],
  "kwetu-esim-mpesa-super-app-mini-app-travel-data": [
    "/articles/october1/Kwetu_eSIM_Joins_M_PESA_Super_App.png",
    "Kwetu eSIM"
  ]
} as const;

describe("October 1 batch 2 editorial import", () => {
  it("imports the three supplied articles in their prepared order", () => {
    expect(editorialOctober1Articles).toHaveLength(3);
    expect(editorialOctober1ImportReport.map((entry) => entry.article)).toEqual([1, 2, 3]);
    expect(editorialOctober1Articles.map((article) => article.slug)).toEqual(Object.keys(requestedImages));
  });

  it("uses each requested thumbnail with complete accessible metadata", () => {
    for (const [slug, [src, credit]] of Object.entries(requestedImages)) {
      const article = editorialOctober1Articles.find((entry) => entry.slug === slug)!;
      expect(article.image).toMatchObject({ src, credit, width: 1774, height: 887, type: "image/png" });
      expect(article.image.alt).toBeTruthy();
      expect(article.image.caption).toBeTruthy();
      expect(existsSync(resolve(process.cwd(), "public", src.slice(1)))).toBe(true);
      expect(article.inlineImages ?? []).toHaveLength(0);
      expect(article.mediaSlots ?? []).toHaveLength(0);
    }
  });

  it("preserves the named bylines and the Gemini benchmark table", () => {
    const [rhea, gemini, kwetu] = editorialOctober1Articles;
    expect(rhea.author.slug).toBe("tim-humphreys");
    expect(gemini.author.slug).toBe("lulu-camau");
    expect(kwetu.author.slug).toBe("tim-humphreys");
    expect(gemini.comparisonTables).toHaveLength(1);
    expect(gemini.comparisonTables?.[0]?.rows).toHaveLength(4);
    expect(rhea.comparisonTables).toBeUndefined();
    expect(kwetu.comparisonTables).toBeUndefined();
  });

  it("preserves visible FAQs, source records and the closing tecMAMBO take", () => {
    for (const article of editorialOctober1Articles) {
      expect(article.faq).toHaveLength(5);
      expect(article.sources?.length).toBeGreaterThanOrEqual(5);
      expect(article.sources?.every((source) => source.label && /^https:\/\//.test(source.url))).toBe(true);
      expect(article.body.at(-2)).toBe("## The tecMAMBO take");
      expect(article.body.at(-1)).toBeTruthy();
      expect(article.body.join("\n")).not.toContain("## Frequently asked questions");
    }
  });

  it("publishes all three articles into discovery, RSS and the news sitemap", () => {
    const eligible = articles.filter(isContentPubliclyEligible);
    const rss = buildRssFeed(eligible);
    const news = buildGoogleNewsSitemap(eligible);
    for (const article of editorialOctober1Articles) {
      expect(isContentPubliclyEligible(article)).toBe(true);
      expect(isArticleIndexable(article)).toBe(true);
      expect(rss).toContain(article.slug);
      expect(news).toContain(article.slug);
      expect(article.publicationStatus).toBe("publish");
      expect(article.editorialStatus).toBe("published");
      expect(article.indexingStatus).toBe("index");
    }
  });

  it("contains no prohibited dashes and adds no Kenyan angle to Gemini", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-october-1-2026-articles-pack-batch-2.md"), "utf8");
    expect(source).not.toMatch(/[\u2014\u2013]/);
    for (const article of editorialOctober1Articles) {
      expect(articlePublicText(article)).not.toMatch(/[\u2014\u2013]/);
      expect(JSON.stringify(article)).not.toMatch(/[\u2014\u2013]/);
    }
    const gemini = editorialOctober1Articles.find((article) => article.slug.startsWith("gemini-4-argon"))!;
    expect(articlePublicText(gemini)).not.toMatch(/\bKenya(?:n)?\b/i);
  });
});
