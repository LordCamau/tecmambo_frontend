import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildRssFeed } from "@/content/feeds";
import { isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { articlePath } from "@/lib/formats";
import { articles } from "@/lib/sample-data";
import { articleJsonLd, faqJsonLd } from "@/lib/seo";

const slug = "iphone-duo-official-price-specs-kenya";
const article = articles.find((candidate) => candidate.slug === slug);

describe("iPhone Duo September 9 publication", () => {
  it("publishes the fact-checked article with the requested metadata and byline", () => {
    expect(article).toBeDefined();
    expect(article?.author.slug).toBe("tim-humphreys");
    expect(article?.seo?.title).toBe("iPhone Duo Price, Specs and Kenya Cost: Everything Confirmed");
    expect(article?.publicationStatus).toBe("publish");
    expect(article?.editorialStatus).toBe("published");
    expect(article?.indexingStatus).toBe("index");
    expect(article?.sourceChecked).toBe(true);
    expect(article?.humanEditorApproved).toBe(true);
    expect(isContentPubliclyEligible(article!)).toBe(true);
    expect(isArticleIndexable(article!)).toBe(true);
  });

  it("uses official Apple artwork and a rendered specification table", () => {
    expect(article?.image).toMatchObject({
      src: "/articles/september9/iPhone-Duo-official-Apple.png",
      credit: "Apple",
      width: 1200,
      height: 630
    });
    expect(existsSync(resolve(process.cwd(), "public/articles/september9/iPhone-Duo-official-Apple.png"))).toBe(true);
    expect(article?.body).toContain("[[table:iphone-duo-specifications]]");
    expect(article?.comparisonTables?.[0]?.rows).toHaveLength(18);
    expect(article?.comparisonTables?.[0]?.rows).toContainEqual({ label: "Top-tier price", values: ["$3,199"] });
    expect(article?.comparisonTables?.[0]?.rows).toContainEqual({ label: "Colors", values: ["Star White and Night Sky"] });
  });

  it("emits NewsArticle and FAQPage structured data and enters RSS", () => {
    expect(article?.faq).toHaveLength(6);
    expect(faqJsonLd(article?.faq ?? [])).toMatchObject({ "@type": "FAQPage" });
    expect(articleJsonLd(article!)).toMatchObject({
      "@type": "NewsArticle",
      headline: article?.title,
      author: { name: "Tim Humphreys" }
    });
    expect(buildRssFeed([article!])).toContain(slug);
    expect(articlePath(article!.format, slug)).toBe(`/explainers/${slug}`);
  });

  it("keeps the September 9 cadence unique and links the preview to the confirmed launch", () => {
    const september9 = articles.filter((candidate) => candidate.publishedAt.startsWith("2026-09-09"));
    expect(september9).toHaveLength(11);
    expect(new Set(september9.map((candidate) => candidate.publishedAt))).toHaveLength(11);
    expect(article?.publishedAt).toBe("2026-09-09T21:35:00+03:00");
    const preview = september9.find((candidate) => candidate.slug === "apple-surprise-and-shine-event-2026-preview");
    expect(preview?.body.join("\n")).toContain(`](/explainers/${slug})`);
  });

  it("keeps the article free of malformed punctuation while preserving the full-length analysis", () => {
    const publicText = [article?.title, ...article!.body, ...(article?.faq?.flatMap((item) => [item.question, item.answer]) ?? [])].join(" ");
    expect(publicText).not.toMatch(/[—–�]/);
    expect(publicText.split(/\s+/).filter(Boolean).length).toBeGreaterThan(1800);
    expect(article?.sources?.length).toBeGreaterThanOrEqual(7);
  });
});
