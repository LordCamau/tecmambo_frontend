import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "../content/feeds";
import { articleToMarkdown } from "../content/markdown";
import { articleWordCount } from "../lib/article-quality";
import { assertArticleImageMetadata, assertArticleSeoMetadata, assertArticlesArePublishable } from "../lib/content-guard";
import { articlePath } from "../lib/formats";
import { curateHomeContent } from "../lib/home-curation";
import { articles, glossaryTerms } from "../lib/sample-data";
import { articleJsonLd, faqJsonLd } from "../lib/seo";

const slug = "google-pixel-11-series-tensor-g6-hilight-price-2026";
const article = articles.find((item) => item.slug === slug);

if (!article) throw new Error(`Missing Pixel 11 launch article: ${slug}`);

describe("Pixel 11 launch deep dive", () => {
  it("publishes a substantial, indexable news article with the required identity", () => {
    expect(article.format).toBe("news");
    expect(article.author.name).toBe("tecMAMBO Team");
    expect(article.publishedAt).toBe("2026-08-12T18:35:00+03:00");
    expect(article.seo?.title).toBe("Google Pixel 11 Series: Specs, HiLight, Prices and Release Date");
    expect(articleWordCount(article)).toBeGreaterThanOrEqual(1500);
    expect(article.publicationStatus).toBe("publish");
    expect(article.editorialStatus).toBe("published");
    expect(article.indexingStatus).toBe("index");
    assertArticlesArePublishable([article]);
    assertArticleSeoMetadata([article]);
    assertArticleImageMetadata([article]);
  });

  it("keeps the mandatory factual caveats beside the launch reporting", () => {
    const markdown = articleToMarkdown(article);
    expect(markdown).toMatch(/TSMC's 2nm process[\s\S]*Google has not publicly made the node part of its launch specification/i);
    expect(markdown).toMatch(/MediaTek M90-series modem[\s\S]*Google has only publicly confirmed new modem hardware/i);
    expect(markdown).toMatch(/normal Pixel 11 does not have HiLight/i);
    expect(markdown).toMatch(/40 percent reduction does not apply to the whole range/i);
    expect(markdown).toMatch(/not 120x optical zoom/i);
    expect(markdown).toMatch(/Kenya is not among the markets listed/i);
    expect(markdown).not.toMatch(/KSh\s?[\d,]+/i);
  });

  it("preserves all ten media provisions and resolves every ready asset", () => {
    const provisions = [article.image, ...(article.mediaSlots ?? [])];
    expect(provisions).toHaveLength(10);
    expect(article.mediaSlots?.filter((slot) => slot.status === "ready")).toHaveLength(4);
    expect(article.mediaSlots?.filter((slot) => slot.status === "placeholder")).toHaveLength(5);
    expect(existsSync(join(process.cwd(), "public", article.image.src))).toBe(true);
    article.mediaSlots?.filter((slot) => slot.status === "ready").forEach((slot) => {
      expect(slot.src).toBeTruthy();
      expect(existsSync(join(process.cwd(), "public", slot.src!))).toBe(true);
    });
  });

  it("renders a four-model comparison table and visible FAQ data", () => {
    expect(article.comparisonTables).toHaveLength(1);
    expect(article.comparisonTables?.[0].columns).toEqual(["Pixel 11", "Pixel 11 Pro", "Pixel 11 Pro XL", "Pixel 11 Pro Fold"]);
    expect(article.comparisonTables?.[0].rows).toHaveLength(16);
    expect(article.faq).toHaveLength(12);
    expect(faqJsonLd(article.faq ?? [])).toMatchObject({ "@type": "FAQPage" });
  });

  it("uses NewsArticle schema and production discovery systems", () => {
    const path = articlePath(article.format, article.slug);
    const schema = articleJsonLd(article) as unknown as Record<string, unknown>;
    expect(schema["@type"]).toBe("NewsArticle");
    expect(schema.mainEntityOfPage).toBe(`https://tecmambo.com${path}`);
    expect(schema.datePublished).toBe(article.publishedAt);
    expect(schema.dateModified).toBe(article.updatedAt);
    expect(schema.image).toBeTruthy();
    expect(buildRssFeed(articles)).toContain(`https://tecmambo.com${path}`);

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-12T20:00:00+03:00"));
    expect(buildGoogleNewsSitemap([{ ...article, workflowVersion: "gated", publicationStatus: "publish", editorialStatus: "published", sourceChecked: true, humanEditorApproved: true, editor: "Test Editor", reviewedAt: article.updatedAt }])).toContain(`https://tecmambo.com${path}`);
    vi.useRealTimers();

    const home = curateHomeContent(articles, glossaryTerms);
    expect(home.hero.slug).toBe(slug);
    expect(home.lanes.find((lane) => lane.key === "news")?.articles.some((item) => item.slug === slug)).toBe(true);
  });
});
