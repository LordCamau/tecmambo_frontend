import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { articlePublicText, isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { articles } from "@/lib/sample-data";
import { startupGraveyardImportReport } from "@/lib/startup-graveyard-september-17-2026";

const article = articles.find((entry) => entry.slug === startupGraveyardImportReport.slug);

describe("September 17 startup graveyard corrected analysis", () => {
  it("imports the corrected MAMBO Take into a strict editorial quarantine", () => {
    expect(article).toBeDefined();
    expect(article?.format).toBe("opinion");
    expect(article?.contentFormat).toBe("opinion");
    expect(article?.author.slug).toBe("tim-humphreys");
    expect(article?.publicationStatus).toBe("draft");
    expect(article?.editorialStatus).toBe("draft_quarantine");
    expect(article?.indexingStatus).toBe("noindex");
    expect(article?.excludeFromDiscovery).toBe(true);
    expect(article?.sourceChecked).toBe(false);
    expect(article?.humanEditorApproved).toBe(false);
    expect(article?.googleAdsEligible).toBe(false);
    expect(isContentPubliclyEligible(article!)).toBe(false);
    expect(isArticleIndexable(article!)).toBe(false);
    expect(articles.filter(isContentPubliclyEligible).some((entry) => entry.slug === article!.slug)).toBe(false);
    expect(startupGraveyardImportReport.outstandingGates).toHaveLength(3);
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

  it("maps existing taxonomy and flags Venture Capital for review", () => {
    expect(article?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["startups", "kenya", "business", "twiga-foods"]));
    expect(article?.regions?.map((region) => region.slug)).toEqual(["kenya"]);
    expect(startupGraveyardImportReport.mappedCategories).toEqual(["Startups", "Kenya", "Business"]);
    expect(startupGraveyardImportReport.requestedCategoriesPendingReview).toEqual(["Venture Capital"]);
  });

  it("keeps the quarantined record out of feeds and Google News", () => {
    const eligible = articles.filter(isContentPubliclyEligible);
    expect(buildRssFeed(eligible)).not.toContain(article!.slug);
    expect(buildGoogleNewsSitemap(eligible)).not.toContain(article!.slug);
  });

  it("stores only the publishable corrected source", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-startup-graveyard-corrected-2026-09-17.md"), "utf8");
    expect(source).not.toMatch(/\$15,?000\s+(?:to|[-–—])\s+\$35,?000/i);
    expect(source).not.toMatch(/[—–�]/);
    expect(source).toContain("## The one case with real, documented accountability questions");
  });
});
