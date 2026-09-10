import { afterEach, describe, expect, it, vi } from "vitest";
import { buildGoogleNewsSitemap } from "@/content/feeds";
import { articleJsonLd, faqJsonLd } from "@/lib/seo";
import { articles } from "@/lib/sample-data";
import { buildSitemapIndex, latestArticleUpdatedAt } from "@/lib/sitemap-freshness";
import type { Article } from "@/lib/types";

const now = new Date("2026-09-10T12:00:00Z");

function gatedArticle(overrides: Partial<Article> = {}): Article {
  return {
    ...articles[0]!,
    id: "seo-hardening-fixture",
    slug: "seo-hardening-fixture",
    format: "explainer",
    publishedAt: "2026-09-10T06:00:00Z",
    updatedAt: "2026-09-10T06:00:00Z",
    publicationStatus: "publish",
    editorialStatus: "published",
    indexingStatus: "index",
    workflowVersion: "gated",
    sourceChecked: true,
    humanEditorApproved: true,
    editor: "Test Editor",
    reviewedAt: "2026-09-10T07:00:00Z",
    ...overrides
  };
}

afterEach(() => vi.useRealTimers());

describe("Google News eligibility", () => {
  it("includes timely flagged explainers and excludes old, future, and unflagged explainers", () => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
    const recent = gatedArticle({ isNewsworthy: true });
    const old = gatedArticle({ id: "old", slug: "old", isNewsworthy: true, publishedAt: "2026-09-08T11:59:59Z" });
    const future = gatedArticle({ id: "future", slug: "future", isNewsworthy: true, publishedAt: "2026-09-10T12:00:01Z" });
    const evergreen = gatedArticle({ id: "evergreen", slug: "evergreen", isNewsworthy: false });
    const sitemap = buildGoogleNewsSitemap([recent, old, future, evergreen]);

    expect(sitemap).toContain(recent.slug);
    expect(sitemap).not.toContain(`<loc>https://tecmambo.com/explainers/${old.slug}</loc>`);
    expect(sitemap).not.toContain(`<loc>https://tecmambo.com/explainers/${future.slug}</loc>`);
    expect(sitemap).not.toContain(`<loc>https://tecmambo.com/explainers/${evergreen.slug}</loc>`);
  });
});

describe("article structured data", () => {
  it.each([
    [gatedArticle({ isNewsworthy: true }), "NewsArticle"],
    [gatedArticle({ id: "evergreen", slug: "evergreen", isNewsworthy: false }), "Article"],
    [gatedArticle({ id: "opinion", slug: "opinion", format: "opinion", isNewsworthy: true }), "OpinionNewsArticle"]
  ] as const)("uses the expected article subtype with required publisher fields", (article, expectedType) => {
    const schema = articleJsonLd(article) as unknown as Record<string, unknown>;
    expect(schema).toMatchObject({
      "@type": expectedType,
      headline: article.title,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      mainEntityOfPage: expect.stringContaining(article.slug),
      author: { "@type": "Person", name: article.author.name, url: expect.stringContaining(article.author.slug) },
      publisher: { "@type": "NewsMediaOrganization", name: "tecMAMBO" }
    });
  });

  it("keeps visible FAQ copy and FAQPage schema sourced from the same values", () => {
    const faqs = [
      { question: "What changed?", answer: "The eligibility decision is now explicit." },
      { question: "Does format decide it?", answer: "Not by itself." }
    ];
    const schema = faqJsonLd(faqs) as unknown as { mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }> };
    expect(schema.mainEntity.map((item) => ({ question: item.name, answer: item.acceptedAnswer.text }))).toEqual(faqs);
  });
});

describe("sitemap freshness", () => {
  it("derives hub freshness from content and never stamps the sitemap index with request time", () => {
    expect(latestArticleUpdatedAt([
      gatedArticle({ updatedAt: "2026-09-08T08:00:00Z" }),
      gatedArticle({ id: "newer", slug: "newer", updatedAt: "2026-09-09T09:30:00Z" })
    ])).toBe("2026-09-09T09:30:00.000Z");
    expect(buildSitemapIndex(["/sitemaps/pages.xml", "/sitemaps/articles.xml"])).not.toContain("<lastmod>");
  });
});
