import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { articlePublicText, isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { articles } from "@/lib/sample-data";
import { startupGraveyardImportReport } from "@/lib/startup-graveyard-september-17-2026";

const article = articles.find((entry) => entry.slug === startupGraveyardImportReport.slug);

describe("September 17 startup graveyard corrected analysis", () => {
  it("publishes the corrected MAMBO Take through the gated workflow", () => {
    expect(article).toBeDefined();
    expect(article?.format).toBe("opinion");
    expect(article?.contentFormat).toBe("opinion");
    expect(article?.author.slug).toBe("tim-humphreys");
    expect(article?.publicationStatus).toBe("publish");
    expect(article?.editorialStatus).toBe("published");
    expect(article?.indexingStatus).toBe("index");
    expect(article?.excludeFromDiscovery).toBe(false);
    expect(article?.sourceChecked).toBe(true);
    expect(article?.humanEditorApproved).toBe(true);
    expect(article?.googleAdsEligible).toBe(true);
    expect(article?.editor).toBe("tecMAMBO Editorial Desk");
    expect(article?.reviewedAt).toBe("2026-09-18T22:12:07+03:00");
    expect(article?.legalReviewedAt).toBe("2026-09-18T22:12:07+03:00");
    expect(isContentPubliclyEligible(article!)).toBe(true);
    expect(isArticleIndexable(article!)).toBe(true);
    expect(articles.filter(isContentPubliclyEligible).some((entry) => entry.slug === article!.slug)).toBe(true);
    expect(startupGraveyardImportReport.outstandingGates).toHaveLength(0);
  });

  it("uses the supplied conceptual artwork with transparent metadata", () => {
    expect(article?.image).toMatchObject({
      src: "/articles/september18/kenya-startup-graveyard-tecmambo.webp",
      alt: "AI-generated illustration of weathered startup gravestones overlooking Nairobi at sunset.",
      caption: "An AI-generated editorial illustration of Kenya's startup funding reckoning. The scene is conceptual and is not a definitive list or legal characterization of the companies shown.",
      credit: "AI Generate Illustration for tecMAMBO",
      width: 1774,
      height: 887,
      type: "image/webp"
    });
    const imagePath = resolve(process.cwd(), "public", article!.image.src.slice(1));
    expect(existsSync(imagePath)).toBe(true);
    expect(statSync(imagePath).size).toBeLessThan(600_000);
  });

  it("keeps the rejected salary allegation out while preserving the corrected evidence", () => {
    const text = articlePublicText(article!);
    expect(text).not.toMatch(/\$15,?000\s+(?:to|[-–—])\s+\$35,?000/i);
    expect(text).not.toMatch(/[—–�]/);
    expect(text).toContain("Securities and Exchange Commission");
    expect(text).toContain("wrongful-termination lawsuit");
    expect(text).toContain("$84.1 million per Business Daily");
    expect(text).toContain("$42.5 million per an alternate source");
    expect(text).toContain("/explainers/twiga-foods-administration-gt-flow-kenya");
  });

  it("maps the complete approved taxonomy", () => {
    expect(article?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["startups", "kenya", "venture-capital", "business", "twiga-foods"]));
    expect(article?.regions?.map((region) => region.slug)).toEqual(["kenya"]);
    expect(startupGraveyardImportReport.mappedCategories).toEqual(["Startups", "Kenya", "Venture Capital", "Business"]);
    expect(startupGraveyardImportReport.requestedCategoriesPendingReview).toEqual([]);
  });

  it("adds the published record to feeds and Google News", () => {
    const eligible = articles.filter(isContentPubliclyEligible);
    expect(buildRssFeed(eligible)).toContain(article!.slug);
    expect(buildGoogleNewsSitemap(eligible)).toContain(article!.slug);
  });

  it("stores only the publishable corrected source", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-startup-graveyard-corrected-2026-09-17.md"), "utf8");
    expect(source).not.toMatch(/\$15,?000\s+(?:to|[-–—])\s+\$35,?000/i);
    expect(source).not.toMatch(/[—–�]/);
    expect(source).toContain("## The one case with real, documented accountability questions");
    expect(source).toContain("Kune, and Zumi");
    expect(source).not.toContain("Kune, and Bonto");
  });
});
