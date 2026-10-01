import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { editorialSeptember29ImportReport } from "@/lib/editorial-bundle-september-29-2026";
import { articlePublicText, isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { articles, editorialSeptember29Articles } from "@/lib/sample-data";
import { curateHomeContent } from "@/lib/home-curation";
import { isWithinGoogleNewsWindow } from "@/lib/newsworthiness";

const slugs = editorialSeptember29ImportReport.map((entry) => entry.slug);
const removedSamsungSlug = "samsung-flex-titanium-foldable-display-durability-crease";

const replacementImages = {
  "direct-drive-tech-hong-kong-robotics-ipo-2026": ["/articles/september29/Direct_Drive_Tech_Robotics.png", "Direct Drive Tech"],
  "india-affordable-electric-vehicles-entry-level-ev-market-2026": ["/articles/september29/India_Affordable_EVs.png", "Tata Motors"],
  "ps5-update-enhanced-pssr-default-26-06-14-00-00": ["/articles/september29/PS5_Pro_PSSR.png", "Sony Interactive Entertainment"],
  "nio-geely-battery-swapping-network-china-alliance": ["/articles/september29/NIO_Geely_Battery_Swapping.png", "NIO"],
  "five-million-industrial-robots-factories-worldwide-2026": ["/articles/september29/industrial_robots_bmw_south_africa_plant.png", "BMW Group"],
  "kam-kenya-ev-duty-free-local-assembly-jobs": ["/articles/september29/KAM_EV_Duty_Free_Assembly.png", "BasiGo"],
  "openai-gpt-live-1-real-time-voice-api-enterprise": ["/articles/september29/OpenAI_GPT_1.png", "tecMAMBO illustration"]
} as const;

describe("September 29 editorial bundle import", () => {
  it("imports the 10 retained articles in a deliberately shuffled order", () => {
    expect(editorialSeptember29Articles).toHaveLength(10);
    expect(new Set(slugs).size).toBe(10);
    expect(editorialSeptember29ImportReport.map((entry) => entry.article)).not.toEqual([1, 2, 3, 4, 5, 6, 8, 9, 10, 11]);
    expect(editorialSeptember29Articles.map((article) => article.slug)).toEqual(slugs);
  });

  it("preserves the supplied bylines and maps every article to a named author", () => {
    expect(editorialSeptember29Articles.filter((article) => article.author.slug === "lulu-camau")).toHaveLength(5);
    expect(editorialSeptember29Articles.filter((article) => article.author.slug === "tim-humphreys")).toHaveLength(5);
    expect(editorialSeptember29Articles.find((article) => article.slug === "nio-geely-battery-swapping-network-china-alliance")?.author.slug).toBe(
      "tim-humphreys"
    );
    for (const article of editorialSeptember29Articles) {
      const report = editorialSeptember29ImportReport.find((entry) => entry.slug === article.slug);
      expect(article.author.name).toBe(report?.byline);
    }
  });

  it("assigns complete lead-image metadata and preserves optional body-image slots", () => {
    expect(editorialSeptember29Articles.flatMap((article) => article.mediaSlots ?? [])).toHaveLength(38);
    for (const article of editorialSeptember29Articles) {
      expect(article.image.src).toMatch(/^\/articles\//);
      expect(article.image.alt).toBeTruthy();
      expect(article.image.caption).toBeTruthy();
      expect(article.image.credit).toBeTruthy();
      expect(article.image.width).toBeGreaterThanOrEqual(1024);
      expect(article.image.height).toBeGreaterThanOrEqual(520);
      expect(existsSync(resolve(process.cwd(), "public", article.image.src.slice(1)))).toBe(true);
      expect(article.mediaSlots?.length).toBeGreaterThanOrEqual(3);
      for (const slot of article.mediaSlots ?? []) {
        expect(slot.status).toBe("placeholder");
        expect(slot.src).toBeUndefined();
        expect(slot.credit).toBeUndefined();
        expect(slot.alt).toBeTruthy();
        expect(slot.caption).toBeTruthy();
        expect(article.body).toContain(`[[media:${slot.id}]]`);
      }
    }
  });

  it("uses the seven supplied replacement thumbnails with complete captions and credits", () => {
    for (const [slug, [src, credit]] of Object.entries(replacementImages)) {
      const article = editorialSeptember29Articles.find((entry) => entry.slug === slug)!;
      expect(article.image).toMatchObject({ src, credit, width: 1774, height: 887, type: "image/png" });
      expect(article.image.alt).toBeTruthy();
      expect(article.image.caption).toBeTruthy();
      expect(existsSync(resolve(process.cwd(), "public", src.slice(1)))).toBe(true);
    }
  });

  it("publishes every article into public discovery and RSS, with eligible recent stories in Google News", () => {
    const eligible = articles.filter(isContentPubliclyEligible);
    const rss = buildRssFeed(eligible);
    const news = buildGoogleNewsSitemap(eligible);
    for (const article of editorialSeptember29Articles) {
      expect(article.publicationStatus).toBe("publish");
      expect(article.editorialStatus).toBe("published");
      expect(article.indexingStatus).toBe("index");
      expect(article.excludeFromDiscovery).toBe(false);
      expect(article.sourceChecked).toBe(true);
      expect(article.humanEditorApproved).toBe(true);
      expect(article.googleAdsEligible).toBe(true);
      expect(isContentPubliclyEligible(article)).toBe(true);
      expect(isArticleIndexable(article)).toBe(true);
      expect(rss).toContain(article.slug);
      if (isWithinGoogleNewsWindow(article)) expect(news).toContain(article.slug);
      else expect(news).not.toContain(article.slug);
    }
  });

  it("maps each visible FAQ to the single FAQ data source used by structured data", () => {
    for (const article of editorialSeptember29Articles) {
      expect(article.faq).toHaveLength(4);
      expect(article.faq?.every((entry) => entry.question.endsWith("?") && Boolean(entry.answer))).toBe(true);
      expect(article.body).not.toContain("## FAQ");
      expect(editorialSeptember29ImportReport.find((entry) => entry.slug === article.slug)?.faqSchema).toBe("mapped from visible FAQ data");
    }
  });

  it("uses only verified clickable source records and records no remaining publication gates", () => {
    for (const article of editorialSeptember29Articles) {
      expect(article.sources?.length).toBeGreaterThanOrEqual(1);
      expect(article.sources?.every((source) => source.label && /^https:\/\//.test(source.url))).toBe(true);
      expect(article.sourceDisclosure).toContain("verified");
      const report = editorialSeptember29ImportReport.find((entry) => entry.slug === article.slug)!;
      expect(report.outstandingGates).toEqual([]);
      expect(report.publicationStatus).toBe("publish");
      expect(report.newsArticleSchema).toBe("enabled");
      expect(report.sitemapStatus).toBe("eligible");
      expect(report.imageSlots).toBe(article.mediaSlots?.length);
    }
  });

  it("removes the Flex Titanium article from public content, feeds and sitemaps", () => {
    const eligible = articles.filter(isContentPubliclyEligible);
    expect(editorialSeptember29Articles.some((article) => article.slug === removedSamsungSlug)).toBe(false);
    expect(articles.some((article) => article.slug === removedSamsungSlug)).toBe(false);
    expect(buildRssFeed(eligible)).not.toContain(removedSamsungSlug);
    expect(buildGoogleNewsSitemap(eligible)).not.toContain(removedSamsungSlug);
  });

  it("promotes the requested NIO and Geely article in the hero and its mobility lane only", () => {
    const home = curateHomeContent(articles, []);
    const heroSlug = "nio-geely-battery-swapping-network-china-alliance";
    const placements = [home.hero, ...home.supportingStories, ...home.latestRail, ...home.lanes.flatMap((lane) => lane.articles)];
    expect(home.hero.slug).toBe(heroSlug);
    expect(home.hero.homepageHeroPriority).toBe(110);
    expect(placements.filter((article) => article.slug === heroSlug)).toHaveLength(2);
    expect(home.lanes.find((lane) => lane.key === "mobility")?.articles.some((article) => article.slug === heroSlug)).toBe(true);
  });

  it("retains the verified factual corrections in public copy and metadata", () => {
    const india = editorialSeptember29Articles.find((article) => article.slug === "india-affordable-electric-vehicles-entry-level-ev-market-2026")!;
    const nio = editorialSeptember29Articles.find((article) => article.slug === "nio-geely-battery-swapping-network-china-alliance")!;
    expect(india.body.join(" ")).not.toMatch(/GST-driven sales resurgence/i);
    expect(nio.body.join(" ")).toContain("Geely also intends to develop compatible consumer models");
    expect(nio.body.join(" ")).toContain("not yet an industry-wide standard");
  });

  it("contains no Unicode em dash or en dash in the source or imported records", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-september-29-2026-editorial-package.md"), "utf8");
    expect(source).not.toMatch(/[\u2014\u2013]/);
    for (const article of editorialSeptember29Articles) {
      expect(articlePublicText(article)).not.toMatch(/[\u2014\u2013]/);
      expect(JSON.stringify(article)).not.toMatch(/[\u2014\u2013]/);
    }
  });
});
