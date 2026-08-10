import { describe, expect, it } from "vitest";
import { articles, glossaryTerms } from "../lib/sample-data";
import {
  findPlaceholderIssues,
  isArticleIndexable,
  isContentPubliclyEligible,
  isGlossaryTermIndexable,
  isHandsOnReview,
  reviewCanShowScore
} from "../lib/content-quality";
import { curateHomeContent } from "../lib/home-curation";
import { articleJsonLd } from "../lib/seo";

const unfinishedSlugs = [
  "best-smartphones-under-ksh-15-000-right-now",
  "five-power-banks-that-actually-last-a-full-day-ranked-by-price",
  "is-a-refurbished-phone-ever-worth-it-we-checked-three-sellers"
];

describe("public content eligibility", () => {
  it("detects high-confidence editorial placeholder language", () => {
    expect(findPlaceholderIssues("Before this article goes live, add source and price check needed.").map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["pre-publication-note", "missing-input", "verification-needed"])
    );
  });

  it("retains unfinished buying guides outside every discovery surface", () => {
    const drafts = articles.filter((article) => unfinishedSlugs.includes(article.slug));
    expect(drafts).toHaveLength(3);
    expect(drafts.every((article) => !isContentPubliclyEligible(article) && !isArticleIndexable(article))).toBe(true);
    const home = curateHomeContent(articles, glossaryTerms);
    const discovered = [
      home.hero,
      ...home.supportingStories,
      ...home.latestRail,
      ...home.lanes.flatMap((lane) => lane.articles)
    ].map((article) => article.slug);
    expect(discovered).not.toEqual(expect.arrayContaining(unfinishedSlugs));
  });

  it("requires explicit hands-on evidence before a score or Review schema is allowed", () => {
    const reviews = articles.filter((article) => article.format === "review");
    const researchBased = reviews.filter((article) => article.reviewMethod !== "hands_on");
    expect(researchBased.length).toBeGreaterThan(0);
    for (const article of researchBased) {
      expect(isHandsOnReview(article)).toBe(false);
      expect(reviewCanShowScore(article)).toBe(false);
      expect(articleJsonLd(article)["@type"]).toBe("Article");
    }
  });

  it("uses multiple quality signals for glossary indexing", () => {
    const thinExamples = glossaryTerms.filter((term) => ["1080p", "4g-lte"].includes(term.slug));
    expect(thinExamples).toHaveLength(2);
    expect(thinExamples.every((term) => !isGlossaryTermIndexable(term))).toBe(true);
  });
});
