import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  comparisonTemplateRecommendation,
  editorialSeptember11ImportReport
} from "@/lib/editorial-bundle-september-11-2026";
import { isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { assertArticleImageMetadata } from "@/lib/content-guard";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { articles, quarantinedTopics, topics } from "@/lib/sample-data";

const slugs = editorialSeptember11ImportReport.map((entry) => entry.slug);
const imported = slugs.map((slug) => articles.find((article) => article.slug === slug));

describe("September 11 special issue publication", () => {
  it("publishes six unique records through every publication and discovery gate", () => {
    expect(imported).toHaveLength(6);
    expect(new Set(slugs).size).toBe(6);
    for (const article of imported) {
      expect(article).toBeDefined();
      expect(article?.publicationStatus).toBe("publish");
      expect(article?.editorialStatus).toBe("published");
      expect(article?.indexingStatus).toBe("index");
      expect(article?.excludeFromDiscovery).toBe(false);
      expect(article?.sourceChecked).toBe(true);
      expect(article?.humanEditorApproved).toBe(true);
      expect(article?.googleAdsEligible).toBe(true);
      expect(article?.isNewsworthy).toBe(true);
      expect(article?.editor).toBe("tecMAMBO Editorial Desk");
      expect(article?.reviewedAt).toBeTruthy();
      expect(article?.sources?.every((source) => source.url.startsWith("https://"))).toBe(true);
      expect(isContentPubliclyEligible(article!)).toBe(true);
      expect(isArticleIndexable(article!)).toBe(true);
    }
  });

  it("keeps the approved bylines and creates the distinct AI & Ethics taxonomy", () => {
    expect(imported.filter((article) => article?.author.slug === "lulu-camau")).toHaveLength(2);
    expect(imported.filter((article) => article?.author.slug === "tim-humphreys")).toHaveLength(4);
    expect(imported[0]?.author.slug).toBe("lulu-camau");
    expect(imported[4]?.author.slug).toBe("lulu-camau");
    expect(topics.find((topic) => topic.slug === "ai-ethics")?.name).toBe("AI & Ethics");
    expect(quarantinedTopics).toHaveLength(0);
    expect(imported[0]?.tags.some((tag) => tag.slug === "ai-ethics")).toBe(true);
    expect(editorialSeptember11ImportReport.every((entry) => entry.outstandingGates.length === 0)).toBe(true);
  });

  it("passes punctuation validation and only rejects the old claims semantically", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-special-issue-corrected-2026-09-11.md"), "utf8");
    expect(source).not.toMatch(/[—–�]/);
    expect(imported[1]?.body.join(" ")).toContain("It is not evidence of stolen schematics");
    expect(imported[1]?.body.join(" ")).toContain("as proof of industrial espionage would be a serious, unsupported accusation");
    expect([imported[0]?.body, imported[2]?.body, imported[3]?.body, imported[4]?.body, imported[5]?.body].flat().join(" ")).not.toMatch(/industrial espionage|stolen schematics/i);
    expect(imported[4]?.body.join(" ")).not.toMatch(/Neural Recall/i);
  });

  it("preserves article prose while converting only links, media markers, tables, and FAQ structure", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-special-issue-corrected-2026-09-11.md"), "utf8");
    const chunks = source.split(/^# ARTICLE \d+\s*$/m).slice(1);
    expect(chunks).toHaveLength(6);
    chunks.forEach((chunk, index) => {
      const title = chunk.match(/^\*\*H1:\*\*\s*(.+)$/m)?.[1];
      expect(title).toBeTruthy();
      const rawBody = chunk.match(new RegExp(`^# ${title!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n\\n([\\s\\S]*?)\\n\\n## Sources`, "m"))?.[1];
      expect(rawBody).toBeTruthy();
      const sourceBlocks = rawBody!.trim().split(/\n{2,}/).map((block) => block.trim());
      const quickAnswer = sourceBlocks.shift()?.replace(/^\*\*Quick answer:\*\*\s*/, "");
      const faqIndex = sourceBlocks.indexOf("## Frequently asked questions");
      expect(faqIndex).toBeGreaterThan(-1);
      const sourceProse = sourceBlocks.slice(0, faqIndex)
        .filter((block) => !/^\[IMAGE(?::|(?: COMPARISON)?\s+\d+)/i.test(block) && !block.startsWith("|"))
        .join("\n\n");
      const importedProse = imported[index]!.body
        .filter((block) => !/^\[\[(?:media|table):/.test(block))
        .join("\n\n")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      expect(imported[index]?.quickAnswer).toBe(quickAnswer);
      expect(importedProse).toBe(sourceProse);
    });
  });

  it("maps FAQ and NewsArticle eligibility metadata for all six stories", () => {
    for (const article of imported) {
      expect(article?.faq?.length).toBeGreaterThanOrEqual(2);
      expect(article?.faq?.every((item) => item.question && item.answer)).toBe(true);
      expect(article?.isNewsworthy).toBe(true);
    }
  });

  it("places every required official press-kit image with complete credit metadata", () => {
    expect(imported[1]?.mediaSlots).toHaveLength(4);
    expect(imported[2]?.mediaSlots).toHaveLength(1);
    expect(imported[5]?.mediaSlots).toHaveLength(5);
    expect(imported[5]?.comparisonTables).toHaveLength(4);
    for (const article of [imported[1], imported[2], imported[5]]) {
      for (const slot of article?.mediaSlots ?? []) {
        expect(slot.status).toBe("ready");
        expect(slot.src).toMatch(/^\/articles\/september11\/.+\.webp$/);
        expect(slot.alt).toBeTruthy();
        expect(slot.caption).toBeTruthy();
        expect(slot.credit).toMatch(/Apple|Samsung/);
        expect(slot.licensingNote).toContain("confirmed by the publisher");
        expect(slot.width).toBe(1040);
        expect(slot.height).toBe(520);
        expect(article?.body).toContain(`[[media:${slot.id}]]`);
      }
    }
    expect(comparisonTemplateRecommendation).toContain("MAMBO Explains");
    expect(comparisonTemplateRecommendation).toContain("MAMBO Take");
    expect(() => assertArticleImageMetadata(imported.map((article) => article!))).not.toThrow();
    expect(imported.filter((article) => article?.image.credit === "Apple")).toHaveLength(3);
    expect(imported[1]?.image.credit).toBe("Apple and Xiaomi");
    expect(imported[2]?.image.credit).toBe("Apple and Samsung");
    expect(imported[2]?.image.alt).toContain("iPhone Duo and Samsung Galaxy Z Fold8");
    expect(imported[0]?.image).toMatchObject({
      src: "/articles/september11/Jacob_Coxon_AI_Whistleblower.jpg",
      credit: "Financial Times"
    });
  });

  it("updates the indexed comparison article's editorial metadata and modified time", () => {
    const article = imported[2]!;
    expect(article.slug).toBe("iphone-duo-vs-galaxy-z-fold8-comparison");
    expect(article.title).toBe("iPhone Duo vs Samsung Galaxy Z Fold8: What Apple Actually Got Right, and What It Didn't");
    expect(article.seo).toEqual({
      title: "iPhone Duo vs Samsung Galaxy Z Fold8: Honest Comparison",
      description: "Apple's iPhone Duo goes up against the Samsung Galaxy Z Fold8 on display quality, software maturity, and price. Neither wins cleanly.",
      focusKeyphrase: "iPhone Duo vs Samsung Galaxy Z Fold8",
      secondaryKeywords: ["best foldable phone 2026", "iPhone Duo crease", "Samsung Galaxy Z Fold8 comparison"]
    });
    expect(article.publishedAt).toBe("2026-09-11T07:49:00+03:00");
    expect(article.updatedAt).toBe("2026-09-12T12:01:47+03:00");
  });

  it("uses the supplied John Ternus iPhone Duo photo after the recap lead without changing publication time", () => {
    const article = imported[5]!;
    expect(article.slug).toBe("apple-surprise-and-shine-keynote-full-recap");
    expect(article.publishedAt).toBe("2026-09-11T09:41:00+03:00");
    expect(article.updatedAt).toBe("2026-09-12T17:17:43+03:00");
    expect(article.mediaSlots?.[0]).toMatchObject({
      id: "special-issue-6-image-1",
      src: "/articles/september11/john-ternus-holding-iphone-duo-apple-launch-event.webp",
      alt: "John Ternus holding the iPhone Duo during Apple's September 2026 launch event.",
      caption: "John Ternus holds the iPhone Duo during Apple's September 2026 launch event.",
      credit: "Apple",
      width: 1040,
      height: 520
    });
  });

  it("applies the cross-links and hub-and-spoke links without changing visible wording", () => {
    expect(editorialSeptember11ImportReport[1]?.internalLinks).toHaveLength(1);
    expect(editorialSeptember11ImportReport[2]?.internalLinks).toHaveLength(1);
    expect(editorialSeptember11ImportReport[5]?.internalLinks).toHaveLength(5);
    for (const entry of editorialSeptember11ImportReport) {
      const article = imported[entry.article - 1];
      for (const link of entry.internalLinks) {
        expect(article?.body.join("\n")).toContain(`[${link.text}](${link.href})`);
      }
    }
  });

  it("includes published records in RSS and Google News", () => {
    const eligible = articles.filter(isContentPubliclyEligible);
    const rss = buildRssFeed(eligible);
    const news = buildGoogleNewsSitemap(eligible);
    for (const slug of slugs) {
      expect(rss).toContain(slug);
      expect(news).toContain(slug);
    }
  });
});
