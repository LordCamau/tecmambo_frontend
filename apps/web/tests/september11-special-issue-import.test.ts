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

describe("September 11 special issue quarantine import", () => {
  it("imports six unique records behind every publication and discovery gate", () => {
    expect(imported).toHaveLength(6);
    expect(new Set(slugs).size).toBe(6);
    for (const article of imported) {
      expect(article).toBeDefined();
      expect(article?.publicationStatus).toBe("draft");
      expect(article?.editorialStatus).toBe("draft_quarantine");
      expect(article?.indexingStatus).toBe("noindex");
      expect(article?.excludeFromDiscovery).toBe(true);
      expect(article?.sourceChecked).toBe(false);
      expect(article?.humanEditorApproved).toBe(false);
      expect(article?.googleAdsEligible).toBe(false);
      expect(article?.isNewsworthy).toBe(true);
      expect(isContentPubliclyEligible(article!)).toBe(false);
      expect(isArticleIndexable(article!)).toBe(false);
    }
  });

  it("keeps the approved bylines and creates the distinct AI & Ethics taxonomy", () => {
    expect(imported.filter((article) => article?.author.slug === "lulu-camau")).toHaveLength(2);
    expect(imported.filter((article) => article?.author.slug === "tim-humphreys")).toHaveLength(4);
    expect(imported[0]?.author.slug).toBe("lulu-camau");
    expect(imported[4]?.author.slug).toBe("lulu-camau");
    expect(topics.some((topic) => topic.slug === "ai-ethics")).toBe(false);
    expect(quarantinedTopics.find((topic) => topic.slug === "ai-ethics")?.name).toBe("AI & Ethics");
    expect(imported[0]?.tags.some((tag) => tag.slug === "ai-ethics")).toBe(true);
    expect(editorialSeptember11ImportReport[0]?.outstandingGates).toContain("AI & Ethics taxonomy editorial approval");
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
        .filter((block) => !/^\[IMAGE(?: COMPARISON)?\s+\d+/i.test(block) && !block.startsWith("|"))
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

  it("structures every required press-kit image marker without inventing an asset", () => {
    expect(imported[1]?.mediaSlots).toHaveLength(4);
    expect(imported[5]?.mediaSlots).toHaveLength(5);
    expect(imported[5]?.comparisonTables).toHaveLength(4);
    for (const article of [imported[1], imported[5]]) {
      for (const slot of article?.mediaSlots ?? []) {
        expect(slot.status).toBe("placeholder");
        expect(slot.src).toBeUndefined();
        expect(slot.alt).toBeTruthy();
        expect(slot.caption).toBeTruthy();
        expect(slot.licensingNote).toContain("confirm");
        expect(article?.body).toContain(`[[media:${slot.id}]]`);
      }
    }
    expect(comparisonTemplateRecommendation).toContain("MAMBO Explains");
    expect(comparisonTemplateRecommendation).toContain("MAMBO Take");
    expect(() => assertArticleImageMetadata(imported.map((article) => article!))).not.toThrow();
    expect(() => assertArticleImageMetadata([{ ...imported[0]!, editorialStatus: "published" }])).toThrow(/missing src/);
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

  it("keeps quarantined records out of RSS and Google News", () => {
    const eligible = articles.filter(isContentPubliclyEligible);
    const rss = buildRssFeed(eligible);
    const news = buildGoogleNewsSitemap(eligible);
    for (const slug of slugs) {
      expect(rss).not.toContain(slug);
      expect(news).not.toContain(slug);
    }
  });
});
