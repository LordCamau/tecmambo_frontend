import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { articlePath } from "@/lib/formats";
import { articlePublicText, isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { editorialSeptember24ImportReport } from "@/lib/editorial-bundle-september-24-2026";
import { curateHomeContent } from "@/lib/home-curation";
import { articles } from "@/lib/sample-data";
import { articleJsonLd } from "@/lib/seo";

const slugs = editorialSeptember24ImportReport.map((entry) => entry.slug);
const imported = slugs.map((slug) => articles.find((article) => article.slug === slug)!);

describe("September 24 editorial package", () => {
  it("publishes all six complete articles through the gated workflow", () => {
    expect(imported).toHaveLength(6);
    expect(new Set(imported.map((article) => article.id)).size).toBe(6);
    expect(new Set(imported.map((article) => article.slug)).size).toBe(6);
    expect(imported.map((article) => article.format)).toEqual([
      "explainer",
      "explainer",
      "news",
      "news",
      "explainer",
      "business"
    ]);
    for (const article of imported) {
      expect(article).toBeDefined();
      expect(article.author.slug).toBe("tecmambo-team");
      expect(article.publishedAt.startsWith("2026-09-24T")).toBe(true);
      expect(article.publicationStatus).toBe("publish");
      expect(article.editorialStatus).toBe("published");
      expect(article.indexingStatus).toBe("index");
      expect(article.sourceChecked).toBe(true);
      expect(article.humanEditorApproved).toBe(true);
      expect(article.googleAdsEligible).toBe(true);
      expect(article.sources?.length).toBeGreaterThanOrEqual(2);
      expect(isContentPubliclyEligible(article)).toBe(true);
      expect(isArticleIndexable(article)).toBe(true);
    }
  });

  it("uses only the hero thumbnail on every article", () => {
    expect(editorialSeptember24ImportReport.map((entry) => entry.mediaPlaceholders)).toEqual([0, 0, 0, 0, 0, 0]);
    expect(editorialSeptember24ImportReport.every((entry) => entry.youtubePlaceholders === 0)).toBe(true);
    for (const article of imported) {
      expect(article.mediaSlots ?? []).toHaveLength(0);
      expect(article.body.some((part) => part.startsWith("[[media:"))).toBe(false);
      expect(article.image.alt.endsWith(".")).toBe(true);
      expect(article.image.caption?.endsWith(".")).toBe(true);
    }
  });

  it("keeps the Galaxy S27 reporting explicitly unconfirmed and renders its table", () => {
    const samsung = imported.find((article) => article.slug === "samsung-galaxy-s27-ram-storage-configurations-leak")!;
    const text = articlePublicText(samsung);
    expect(text).toContain("These details remain unconfirmed.");
    expect(text).toContain("Not confirmed");
    expect(samsung.comparisonTables).toHaveLength(1);
    expect(samsung.comparisonTables?.[0]?.rows).toHaveLength(4);
    expect(samsung.image.caption).toContain("shown for illustration");
  });

  it("adds verified internal links only to routes in the article collection", () => {
    const routes = new Set(articles.map((article) => articlePath(article.format, article.slug)));
    for (const report of editorialSeptember24ImportReport) {
      expect(report.internalLinks.length).toBeGreaterThan(0);
      for (const href of report.internalLinks) expect(routes.has(href)).toBe(true);
    }
  });

  it("inherits complete NewsArticle metadata from the shared SEO system", () => {
    for (const article of imported) {
      const schema = articleJsonLd(article) as unknown as Record<string, unknown>;
      expect(schema.headline).toBe(article.title);
      expect(schema.datePublished).toBe(article.publishedAt);
      expect(schema.dateModified).toBe(article.updatedAt);
      expect(schema.mainEntityOfPage).toContain(article.slug);
      expect(schema.author).toBeTruthy();
      expect(schema.publisher).toBeTruthy();
      expect(schema.image).toBeTruthy();
    }
  });

  it("includes every article in RSS and the Google News sitemap", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-24T10:30:00+03:00"));
    const eligible = articles.filter(isContentPubliclyEligible);
    const rss = buildRssFeed(eligible);
    const news = buildGoogleNewsSitemap(eligible);
    for (const slug of slugs) {
      expect(rss).toContain(slug);
      expect(news).toContain(slug);
    }
    vi.useRealTimers();
  });

  it("keeps the Pixel story as the homepage hero and follows the duplicate-placement rule", () => {
    const home = curateHomeContent(articles, []);
    expect(home.hero.slug).toBe("google-pixel-september-2026-feature-drop");
    const placements = [home.hero, ...home.supportingStories, ...home.latestRail, ...home.lanes.flatMap((lane) => lane.articles)];
    const counts = new Map<string, number>();
    for (const article of placements) counts.set(article.slug, (counts.get(article.slug) ?? 0) + 1);
    expect(Math.max(...counts.values())).toBeLessThanOrEqual(2);
  });

  it("contains no em dash in the imported source, metadata or rendered article text", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-september-24-2026-editorial-package.md"), "utf8");
    expect(source).not.toContain("—");
    for (const article of imported) expect(articlePublicText(article)).not.toContain("—");
  });
});
