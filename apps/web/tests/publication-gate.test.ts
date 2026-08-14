import { describe, expect, it } from "vitest";
import { articleQualityIssues, isArticleIndexable, isContentPubliclyEligible } from "../lib/content-quality";
import { articles, glossaryTerms } from "../lib/sample-data";
import { isGlossaryTermIndexable } from "../lib/content-quality";

const quarantinedSlugs = [
  "we-tested-three-power-banks-on-a-real-boda-rider-s-full-shift",
  "fast-charging-claims-vs-reality-we-timed-every-30-minute-charge-promise",
  "can-a-budget-phone-survive-a-year-of-matatu-commutes-we-asked-five-people",
  "kenya-s-new-sim-registration-rules-explained-without-the-legal-jargon",
  "samsung-s-new-foldable-translated-into-what-it-means-for-you",
  "apple-just-changed-how-repairs-work-here-s-who-that-actually-affects",
  "whatsapp-s-new-feature-everyone-s-talking-about-explained-in-60-seconds",
  "the-cheapest-laptop-that-won-t-frustrate-a-university-student",
  "is-a-refurbished-phone-ever-worth-it-we-checked-three-sellers",
  "oraimo-s-cheapest-earbuds-tested-for-a-full-week-of-real-commutes",
  "three-ai-assistants-real-nairobi-week"
];

describe("central publication gate", () => {
  it("makes known unfinished and unsupported first-hand stories unavailable", () => {
    for (const slug of quarantinedSlugs) {
      const article = articles.find((item) => item.slug === slug);
      expect(article ? isContentPubliclyEligible(article) : false).toBe(false);
    }
  });

  it("uses the same eligible set for public and indexable discovery", () => {
    const publicArticles = articles.filter(isContentPubliclyEligible);
    const indexableArticles = articles.filter(isArticleIndexable);
    expect(indexableArticles.map((article) => article.id)).toEqual(publicArticles.map((article) => article.id));
    expect(publicArticles.every(isContentPubliclyEligible)).toBe(true);
  });

  it("does not leak high-confidence quality issues into public content", () => {
    const leaked = articles.filter(isContentPubliclyEligible).flatMap((article) =>
      articleQualityIssues(article)
        .filter((issue) => issue.confidence === "high")
        .map((issue) => `${article.slug}: ${issue.code}`)
    );
    expect(leaked).toEqual([]);
  });

  it("keeps every current glossary detail page out of the index", () => {
    expect(glossaryTerms.filter(isGlossaryTermIndexable)).toHaveLength(0);
  });
});
