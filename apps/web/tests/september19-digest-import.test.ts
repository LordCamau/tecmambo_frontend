import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { articlePublicText, isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { curateHomeContent } from "@/lib/home-curation";
import { editorialSeptember19ImportReport } from "@/lib/editorial-bundle-september-19-2026";
import { articles } from "@/lib/sample-data";

const slugs = editorialSeptember19ImportReport.map((entry) => entry.slug);
const imported = slugs.map((slug) => articles.find((article) => article.slug === slug)!);

describe("September 19 corrected digest", () => {
  it("publishes exactly three approved articles through the gated workflow", () => {
    expect(imported).toHaveLength(3);
    for (const article of imported) {
      expect(article).toBeDefined();
      expect(article.format).toBe("explainer");
      expect(article.contentFormat).toBe("explainer");
      expect(article.isNewsworthy).toBe(true);
      expect(article.publicationStatus).toBe("publish");
      expect(article.editorialStatus).toBe("published");
      expect(article.indexingStatus).toBe("index");
      expect(article.excludeFromDiscovery).toBe(false);
      expect(article.sourceChecked).toBe(true);
      expect(article.humanEditorApproved).toBe(true);
      expect(article.googleAdsEligible).toBe(true);
      expect(isContentPubliclyEligible(article)).toBe(true);
      expect(isArticleIndexable(article)).toBe(true);
    }
    expect(editorialSeptember19ImportReport.every((entry) => entry.outstandingGates.length === 0)).toBe(true);
  });

  it("uses the publisher-supplied optimized images with the requested credits", () => {
    const expected = [
      ["lg-smart-tv-privacy-investigation-gamers-nexus", "/articles/september19/LG_TVs_Audio_Monitoring.webp", "LG"],
      ["kenya-icta-nofbi-fiber-tender-2026", "/articles/september19/Kenya_Fiber_Optic.webp", "NMG"],
      ["google-pixel-september-2026-feature-drop", "/articles/september19/Google_Pixel_Drop.webp", "Google"]
    ] as const;
    for (const [slug, src, credit] of expected) {
      const article = articles.find((entry) => entry.slug === slug)!;
      expect(article.image).toMatchObject({ src, credit, width: 1774, height: 887, type: "image/webp" });
      expect(article.image.alt.endsWith(".")).toBe(true);
      expect(article.image.caption?.endsWith(".")).toBe(true);
      const imagePath = resolve(process.cwd(), "public", src.slice(1));
      expect(existsSync(imagePath)).toBe(true);
      expect(statSync(imagePath).size).toBeLessThan(500_000);
    }
  });

  it("keeps the LG story accurate and excludes the rejected telemetry advice", () => {
    const lg = imported.find((article) => article.slug === "lg-smart-tv-privacy-investigation-gamers-nexus")!;
    const text = articlePublicText(lg);
    expect(text).not.toMatch(/ngfts\.lge\.com|rdx2\.lge\.com|ad\.lgsmartad\.com/i);
    expect(text).not.toMatch(/[—–�]/);
    expect(text).toContain("standard, unmodified retail");
    expect(text).toContain("LG strongly denies");
    expect(text).toContain("detailed public response");
  });

  it("maps bylines, taxonomy, device eligibility, and approved internal links", () => {
    const lg = imported.find((article) => article.slug === "lg-smart-tv-privacy-investigation-gamers-nexus")!;
    const kenya = imported.find((article) => article.slug === "kenya-icta-nofbi-fiber-tender-2026")!;
    const pixel = imported.find((article) => article.slug === "google-pixel-september-2026-feature-drop")!;
    expect(lg.author.slug).toBe("tim-humphreys");
    expect(kenya.author.slug).toBe("tim-humphreys");
    expect(pixel.author.slug).toBe("lulu-camau");
    expect(lg.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["cybersecurity", "privacy", "hardware", "lg"]));
    expect(kenya.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["infrastructure", "kenya", "policy"]));
    expect(kenya.regions?.map((region) => region.slug)).toEqual(["kenya"]);
    expect(pixel.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["ai", "smartphones", "security", "google"]));
    expect(articlePublicText(pixel)).toContain("Pixel 6 and newer");
    expect(articlePublicText(pixel)).not.toContain("Pixel 8, 9, and 10");
    expect(kenya.body.join("\n")).toContain("/explainers/paratus-g2m-fibre-route-east-africa-2026");
    expect(kenya.body.join("\n")).toContain("/explainers/digital-realty-nbo2-nairobi-data-centre-icolo");
  });

  it("keeps the startup graveyard analysis as the main homepage hero", () => {
    const home = curateHomeContent(articles, []);
    expect(home.hero.slug).toBe("kenya-startup-graveyard-twiga-foods-failures");
    expect(home.hero.image.src).toBe("/articles/september19/New_Kenya_Startup_Graveyard.webp");
    const placements = [home.hero, ...home.supportingStories, ...home.latestRail, ...home.lanes.flatMap((lane) => lane.articles)];
    expect(placements.filter((article) => article.slug === home.hero.slug)).toHaveLength(2);
  });

  it("adds all three records to RSS and Google News", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-19T11:00:00+03:00"));
    const eligible = articles.filter(isContentPubliclyEligible);
    const rss = buildRssFeed(eligible);
    const news = buildGoogleNewsSitemap(eligible);
    for (const slug of slugs) {
      expect(rss).toContain(slug);
      expect(news).toContain(slug);
    }
    vi.useRealTimers();
  });

  it("stores only the corrected source with clean punctuation", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-sept19-digest-corrected-2026-09-19.md"), "utf8");
    expect(source).not.toMatch(/[—–�]/);
    expect(source).not.toMatch(/ngfts\.lge\.com|rdx2\.lge\.com|ad\.lgsmartad\.com/i);
    expect(source).toContain("LG strongly denies the audio-upload and ambient-recording claims");
    expect(source).toContain("Pixel 6 and newer");
  });
});
